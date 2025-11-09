/**
 * Converts Confluence XML/XHTML content to TipTap/ProseMirror JSON format
 *
 * Note: Confluence uses a custom XML storage format (XHTML-based) for its content.
 * - body.storage.value contains the raw Confluence storage format (XHTML)
 * - body.view.value contains the rendered HTML view
 *
 * This parser:
 * 1. Uses txml to parse the XML string into a structured format
 * 2. Preprocesses the parsed structure (custom transformations)
 * 3. Directly converts to TipTap/ProseMirror JSON format
 */
// @ts-expect-error - txml has type definition issues with package.json exports
import { parse as parseXml } from 'txml';
import type { JSONContent } from '@tiptap/react';

// txml node types
type INode = string | IXmlNode;

interface IXmlNode {
  tagName: string;
  attributes?: Record<string, string>;
  children?: INode[];
}

/**
 * Decodes HTML entities in text content
 */
function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&'); // Must be last to avoid double-decoding
}

/**
 * Recursively decodes HTML entities in all text nodes
 */
function decodeEntitiesInNodes(nodes: INode[]): INode[] {
  return nodes.map(node => {
    if (typeof node === 'string') {
      return decodeHtmlEntities(node);
    }
    if (typeof node === 'object' && node.children) {
      return {
        ...node,
        children: decodeEntitiesInNodes(node.children),
      };
    }
    return node;
  });
}

/**
 * Preprocesses the parsed XML structure before converting to TipTap JSON
 * This is where custom transformations for Confluence-specific elements can be applied
 */
function preprocessConfluenceXml(nodes: INode[]): INode[] {
  // Decode HTML entities (e.g., &quot; -> ", &amp; -> &)
  return decodeEntitiesInNodes(nodes);
}

/**
 * Converts txml nodes directly to TipTap/ProseMirror JSON format
 */
function xmlNodesToTipTapJson(nodes: INode[]): JSONContent[] {
  if (!Array.isArray(nodes)) {
    return [];
  }

  const result: JSONContent[] = [];

  for (const node of nodes) {
    // Handle text nodes
    if (typeof node === 'string') {
      // Preserve all whitespace including spaces - don't skip them
      if (node.length > 0) {
        result.push({
          type: 'text',
          text: node,
        });
      }
      continue;
    }

    // Handle element nodes
    if (typeof node === 'object' && node.tagName) {
      // Special handling for spans - process children inline
      if (node.tagName.toLowerCase() === 'span') {
        const spanChildren = xmlNodesToTipTapJson(node.children || []);
        result.push(...spanChildren);
        continue;
      }

      const converted = convertXmlNodeToTipTap(node);
      if (converted) {
        result.push(converted);
      }
    }
  }

  return result;
}

/**
 * Converts a single XML node to TipTap JSON format
 */
function convertXmlNodeToTipTap(node: IXmlNode): JSONContent | null {
  const tagName = node.tagName.toLowerCase();
  const children = node.children || [];

  // Map HTML tags to TipTap node types
  switch (tagName) {
    case 'p':
      return {
        type: 'paragraph',
        content: xmlNodesToTipTapJson(children),
      };

    case 'h1':
      return {
        type: 'heading',
        attrs: { level: 1 },
        content: xmlNodesToTipTapJson(children),
      };

    case 'h2':
      return {
        type: 'heading',
        attrs: { level: 2 },
        content: xmlNodesToTipTapJson(children),
      };

    case 'h3':
      return {
        type: 'heading',
        attrs: { level: 3 },
        content: xmlNodesToTipTapJson(children),
      };

    case 'h4':
      return {
        type: 'heading',
        attrs: { level: 4 },
        content: xmlNodesToTipTapJson(children),
      };

    case 'h5':
      return {
        type: 'heading',
        attrs: { level: 5 },
        content: xmlNodesToTipTapJson(children),
      };

    case 'h6':
      return {
        type: 'heading',
        attrs: { level: 6 },
        content: xmlNodesToTipTapJson(children),
      };

    case 'ul':
      return {
        type: 'bulletList',
        content: xmlNodesToTipTapJson(children),
      };

    case 'ol':
      return {
        type: 'orderedList',
        content: xmlNodesToTipTapJson(children),
      };

    case 'li':
      return {
        type: 'listItem',
        content: xmlNodesToTipTapJson(children),
      };

    case 'blockquote':
      return {
        type: 'blockquote',
        content: xmlNodesToTipTapJson(children),
      };

    case 'code':
      // Inline code
      const codeText = extractTextContent(children);
      return {
        type: 'text',
        marks: [{ type: 'code' }],
        text: codeText,
      };

    case 'pre':
      return {
        type: 'codeBlock',
        content: xmlNodesToTipTapJson(children),
      };

    case 'strong':
    case 'b':
      return {
        type: 'text',
        marks: [{ type: 'bold' }],
        text: extractTextContent(children),
      };

    case 'em':
    case 'i':
      return {
        type: 'text',
        marks: [{ type: 'italic' }],
        text: extractTextContent(children),
      };

    case 'a':
      return {
        type: 'text',
        marks: [
          {
            type: 'link',
            attrs: {
              href: node.attributes?.href || '',
              target: node.attributes?.target,
            },
          },
        ],
        text: extractTextContent(children),
      };

    case 'br':
      return {
        type: 'hardBreak',
      };

    case 'hr':
      return {
        type: 'horizontalRule',
      };

    default:
      // For unknown tags, try to process children
      console.warn(`Unknown tag: ${tagName}, processing children`);
      const childContent = xmlNodesToTipTapJson(children);
      // Return children wrapped in paragraph if there's content
      if (childContent.length > 0) {
        return {
          type: 'paragraph',
          content: childContent,
        };
      }
      return null;
  }
}

/**
 * Extracts plain text content from nodes (for marks like bold, italic, etc.)
 */
function extractTextContent(nodes: INode[]): string {
  return nodes
    .map(node => {
      if (typeof node === 'string') {
        return node;
      }
      if (typeof node === 'object' && node.children) {
        return extractTextContent(node.children);
      }
      return '';
    })
    .join('');
}

/**
 * Converts Confluence XML/XHTML string to TipTap JSON format
 * @param confluenceXMLString The XML/XHTML string from Confluence API (body.storage.value or body.view.value)
 * @returns TipTap/ProseMirror JSON content
 */
export function confluenceXmlToTipTapJson(confluenceXMLString: string): JSONContent {
  try {
    // Step 1: Parse XML string using txml with keepWhitespace to preserve spaces in spans
    const parsedXml = parseXml(confluenceXMLString, { keepWhitespace: true });

    // Step 2: Preprocess the parsed structure
    const preprocessed = preprocessConfluenceXml(parsedXml);

    // Step 3: Convert directly to TipTap JSON
    const content = xmlNodesToTipTapJson(preprocessed);

    // Return the document structure
    return {
      type: 'doc',
      content,
    };
  } catch (error) {
    console.error('Failed to convert Confluence XML to TipTap JSON:', error);
    // Return a fallback document structure with an error message
    return {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Error: Failed to parse content',
            },
          ],
        },
      ],
    };
  }
}

// Export alias for backward compatibility
export { confluenceXmlToTipTapJson as confluenceHtmlToTipTapJson };
