import { test, expect, describe } from 'bun:test';
import { confluenceXmlToTipTapJson } from './confluence-to-tiptap';

describe('confluenceXmlToTipTapJson', () => {
  describe('Basic HTML Elements', () => {
    test('converts simple paragraph', () => {
      const xml = '<p>Hello World</p>';
      const result = confluenceXmlToTipTapJson(xml);

      expect(result).toEqual({
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Hello World',
              },
            ],
          },
        ],
      });
    });

    test('converts multiple paragraphs', () => {
      const xml = '<p>First paragraph</p><p>Second paragraph</p>';
      const result = confluenceXmlToTipTapJson(xml);

      expect(result).toEqual({
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'First paragraph' }],
          },
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'Second paragraph' }],
          },
        ],
      });
    });

    test('converts headings h1-h6', () => {
      const xml = '<h1>H1</h1><h2>H2</h2><h3>H3</h3><h4>H4</h4><h5>H5</h5><h6>H6</h6>';
      const result = confluenceXmlToTipTapJson(xml);

      expect(result.content).toHaveLength(6);
      expect(result.content?.[0]).toEqual({
        type: 'heading',
        attrs: { level: 1 },
        content: [{ type: 'text', text: 'H1' }],
      });
      expect(result.content?.[1]).toEqual({
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: 'H2' }],
      });
      expect(result.content?.[5]).toEqual({
        type: 'heading',
        attrs: { level: 6 },
        content: [{ type: 'text', text: 'H6' }],
      });
    });

    test('converts blockquote', () => {
      const xml = '<blockquote><p>Quoted text</p></blockquote>';
      const result = confluenceXmlToTipTapJson(xml);

      expect(result).toEqual({
        type: 'doc',
        content: [
          {
            type: 'blockquote',
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'Quoted text' }],
              },
            ],
          },
        ],
      });
    });

    test('converts horizontal rule', () => {
      const xml = '<p>Before</p><hr /><p>After</p>';
      const result = confluenceXmlToTipTapJson(xml);

      expect(result.content).toHaveLength(3);
      expect(result.content?.[1]).toEqual({
        type: 'horizontalRule',
      });
    });

    test('converts hard break', () => {
      const xml = '<p>Line one<br />Line two</p>';
      const result = confluenceXmlToTipTapJson(xml);

      expect(result).toEqual({
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              { type: 'text', text: 'Line one' },
              { type: 'hardBreak' },
              { type: 'text', text: 'Line two' },
            ],
          },
        ],
      });
    });
  });

  describe('Text Formatting', () => {
    test('converts bold text', () => {
      const xml = '<p><strong>Bold text</strong></p>';
      const result = confluenceXmlToTipTapJson(xml);

      expect(result).toEqual({
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                marks: [{ type: 'bold' }],
                text: 'Bold text',
              },
            ],
          },
        ],
      });
    });

    test('converts bold text using <b> tag', () => {
      const xml = '<p><b>Bold text</b></p>';
      const result = confluenceXmlToTipTapJson(xml);

      expect(result.content?.[0]).toMatchObject({
        type: 'paragraph',
        content: [
          {
            type: 'text',
            marks: [{ type: 'bold' }],
            text: 'Bold text',
          },
        ],
      });
    });

    test('converts italic text', () => {
      const xml = '<p><em>Italic text</em></p>';
      const result = confluenceXmlToTipTapJson(xml);

      expect(result).toEqual({
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                marks: [{ type: 'italic' }],
                text: 'Italic text',
              },
            ],
          },
        ],
      });
    });

    test('converts italic text using <i> tag', () => {
      const xml = '<p><i>Italic text</i></p>';
      const result = confluenceXmlToTipTapJson(xml);

      expect(result.content?.[0]).toMatchObject({
        type: 'paragraph',
        content: [
          {
            type: 'text',
            marks: [{ type: 'italic' }],
            text: 'Italic text',
          },
        ],
      });
    });

    test('converts inline code', () => {
      const xml = '<p><code>code snippet</code></p>';
      const result = confluenceXmlToTipTapJson(xml);

      expect(result).toEqual({
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                marks: [{ type: 'code' }],
                text: 'code snippet',
              },
            ],
          },
        ],
      });
    });

    test('converts code block', () => {
      const xml = '<pre><code>function test() {\n  return true;\n}</code></pre>';
      const result = confluenceXmlToTipTapJson(xml);

      expect(result).toEqual({
        type: 'doc',
        content: [
          {
            type: 'codeBlock',
            content: [
              {
                type: 'text',
                marks: [{ type: 'code' }],
                text: 'function test() {\n  return true;\n}',
              },
            ],
          },
        ],
      });
    });

    test('converts links', () => {
      const xml = '<p><a href="https://example.com">Link text</a></p>';
      const result = confluenceXmlToTipTapJson(xml);

      expect(result).toEqual({
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                marks: [
                  {
                    type: 'link',
                    attrs: {
                      href: 'https://example.com',
                      target: undefined,
                    },
                  },
                ],
                text: 'Link text',
              },
            ],
          },
        ],
      });
    });

    test('converts links with target attribute', () => {
      const xml = '<p><a href="https://example.com" target="_blank">Link text</a></p>';
      const result = confluenceXmlToTipTapJson(xml);

      expect(result.content?.[0]).toMatchObject({
        type: 'paragraph',
        content: [
          {
            type: 'text',
            marks: [
              {
                type: 'link',
                attrs: {
                  href: 'https://example.com',
                  target: '_blank',
                },
              },
            ],
            text: 'Link text',
          },
        ],
      });
    });
  });

  describe('Lists', () => {
    test('converts bullet list', () => {
      const xml = '<ul><li><p>Item 1</p></li><li><p>Item 2</p></li></ul>';
      const result = confluenceXmlToTipTapJson(xml);

      expect(result).toEqual({
        type: 'doc',
        content: [
          {
            type: 'bulletList',
            content: [
              {
                type: 'listItem',
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: 'Item 1' }],
                  },
                ],
              },
              {
                type: 'listItem',
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: 'Item 2' }],
                  },
                ],
              },
            ],
          },
        ],
      });
    });

    test('converts ordered list', () => {
      const xml = '<ol><li><p>First</p></li><li><p>Second</p></li></ol>';
      const result = confluenceXmlToTipTapJson(xml);

      expect(result).toEqual({
        type: 'doc',
        content: [
          {
            type: 'orderedList',
            content: [
              {
                type: 'listItem',
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: 'First' }],
                  },
                ],
              },
              {
                type: 'listItem',
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: 'Second' }],
                  },
                ],
              },
            ],
          },
        ],
      });
    });

    test('converts nested lists', () => {
      const xml = '<ul><li><p>Item 1</p><ul><li><p>Nested item</p></li></ul></li></ul>';
      const result = confluenceXmlToTipTapJson(xml);

      expect(result.content?.[0]).toMatchObject({
        type: 'bulletList',
        content: [
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'Item 1' }],
              },
              {
                type: 'bulletList',
                content: [
                  {
                    type: 'listItem',
                    content: [
                      {
                        type: 'paragraph',
                        content: [{ type: 'text', text: 'Nested item' }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });
    });
  });

  describe('Edge Cases', () => {
    test('handles empty string', () => {
      const xml = '';
      const result = confluenceXmlToTipTapJson(xml);

      expect(result).toEqual({
        type: 'doc',
        content: [],
      });
    });

    test('handles whitespace-only text nodes', () => {
      const xml = '<p>   </p>';
      const result = confluenceXmlToTipTapJson(xml);

      // With keepWhitespace: true, whitespace is preserved
      expect(result).toEqual({
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: '   ',
              },
            ],
          },
        ],
      });
    });

    test('handles unknown tags by wrapping in paragraph', () => {
      const xml = '<custom-tag>Custom content</custom-tag>';
      const result = confluenceXmlToTipTapJson(xml);

      expect(result).toEqual({
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'Custom content' }],
          },
        ],
      });
    });

    test('handles mixed content', () => {
      const xml = '<p>Normal <strong>bold</strong> and <em>italic</em> text</p>';
      const result = confluenceXmlToTipTapJson(xml);

      // With keepWhitespace: true, spaces are preserved exactly
      expect(result).toEqual({
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              { type: 'text', text: 'Normal ' },
              { type: 'text', marks: [{ type: 'bold' }], text: 'bold' },
              { type: 'text', text: ' and ' },
              { type: 'text', marks: [{ type: 'italic' }], text: 'italic' },
              { type: 'text', text: ' text' },
            ],
          },
        ],
      });
    });

    test('handles malformed XML gracefully', () => {
      // txml is lenient and doesn't throw errors for unclosed tags
      // It just parses what it can
      const result = confluenceXmlToTipTapJson('<p>Unclosed tag');

      expect(result).toEqual({
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Unclosed tag',
              },
            ],
          },
        ],
      });
    });
  });

  describe('HTML Entity Decoding', () => {
    test('decodes &quot; to double quotes', () => {
      const xml = '<p>She said &quot;Hello&quot;</p>';
      const result = confluenceXmlToTipTapJson(xml);

      expect(result).toEqual({
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'She said "Hello"',
              },
            ],
          },
        ],
      });
    });

    test('decodes &apos; to single quotes', () => {
      const xml = "<p>It&apos;s working</p>";
      const result = confluenceXmlToTipTapJson(xml);

      expect(result).toEqual({
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: "It's working",
              },
            ],
          },
        ],
      });
    });

    test('decodes &lt; and &gt; to angle brackets', () => {
      const xml = '<p>&lt;tag&gt;</p>';
      const result = confluenceXmlToTipTapJson(xml);

      expect(result).toEqual({
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: '<tag>',
              },
            ],
          },
        ],
      });
    });

    test('decodes &amp; to ampersand', () => {
      const xml = '<p>foo &amp; bar</p>';
      const result = confluenceXmlToTipTapJson(xml);

      expect(result).toEqual({
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'foo & bar',
              },
            ],
          },
        ],
      });
    });

    test('decodes multiple entities in same text', () => {
      const xml = '<p>&quot;foo &amp; bar&quot; &lt;test&gt;</p>';
      const result = confluenceXmlToTipTapJson(xml);

      expect(result).toEqual({
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: '"foo & bar" <test>',
              },
            ],
          },
        ],
      });
    });

    test('decodes entities in formatted text', () => {
      const xml = '<p><strong>&quot;Bold text&quot;</strong></p>';
      const result = confluenceXmlToTipTapJson(xml);

      expect(result).toEqual({
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                marks: [{ type: 'bold' }],
                text: '"Bold text"',
              },
            ],
          },
        ],
      });
    });
  });

  describe('Real Confluence Examples', () => {
    test('converts Confluence storage format with attributes', () => {
      const xml = `<h2>Documentation Title</h2><p><a class="" href="https://example.com/docs/guide">https://example.com/docs/guide</a></p>`;
      const result = confluenceXmlToTipTapJson(xml);

      expect(result.content).toHaveLength(2);
      expect(result.content?.[0]).toMatchObject({
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: 'Documentation Title' }],
      });
      expect(result.content?.[1]).toMatchObject({
        type: 'paragraph',
        content: [
          {
            type: 'text',
            marks: [
              {
                type: 'link',
                attrs: {
                  href: 'https://example.com/docs/guide',
                },
              },
            ],
          },
        ],
      });
    });

    test('converts Confluence list with style attribute', () => {
      const xml = `<ul style="list-style-type: square;"><li>Item 1</li><li>Item 2</li></ul>`;
      const result = confluenceXmlToTipTapJson(xml);

      expect(result).toEqual({
        type: 'doc',
        content: [
          {
            type: 'bulletList',
            content: [
              {
                type: 'listItem',
                content: [{ type: 'text', text: 'Item 1' }],
              },
              {
                type: 'listItem',
                content: [{ type: 'text', text: 'Item 2' }],
              },
            ],
          },
        ],
      });
    });

    test('preserves spaces in span elements within paragraphs', () => {
      const xml = `<p>text before<span> </span><a href="https://example.com">link</a></p>`;
      const result = confluenceXmlToTipTapJson(xml);

      expect(result).toEqual({
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              { type: 'text', text: 'text before' },
              { type: 'text', text: ' ' }, // Space from span should be preserved
              {
                type: 'text',
                marks: [
                  {
                    type: 'link',
                    attrs: {
                      href: 'https://example.com',
                      target: undefined,
                    },
                  },
                ],
                text: 'link',
              },
            ],
          },
        ],
      });
    });

    test('handles complex Confluence content with spans and multiple formatting', () => {
      const xml = `<p>This change is conservative in the sense that the altitude is only converted just before publishing. The conversion first computes the ellipsoidal height by summing the filtered height above geoid with the raw undulation reported by Septentrio. Though the undulation sample rate is low (2 Hz currently), undulation varies slowly over several kilometers. Then, the ellipsoidal height is converted to EGM96 with<span> </span><a href="https://ghe.anduril.dev/autonomy/terrain-cpp/blob/90d0cf227641befe15e0cf73b90bdeb1ba8e17a3/src/Terrain.cc#L231" style="text-decoration: underline;">/autonomy/terrain-cpp</a>. Because computing the undulation is costly (~50 ms), a roughly 10 km by 10 km grid of undulations is cached during initialization.</p>`;
      const result = confluenceXmlToTipTapJson(xml);

      // Check that we have a paragraph
      expect(result.content).toHaveLength(1);
      expect(result.content?.[0].type).toBe('paragraph');

      // Check that the space before the link is preserved
      const content = result.content?.[0].content;
      expect(content).toBeDefined();

      // Find the text node with ' ' (space from span)
      const spaceNode = content?.find(
        (node) => node.type === 'text' && node.text === ' ' && !node.marks
      );
      expect(spaceNode).toBeDefined();

      // Find the link node
      const linkNode = content?.find(
        (node) =>
          node.type === 'text' &&
          node.marks?.some((mark) => mark.type === 'link')
      );
      expect(linkNode).toBeDefined();
      expect(linkNode?.text).toBe('/autonomy/terrain-cpp');
    });
  });
});
