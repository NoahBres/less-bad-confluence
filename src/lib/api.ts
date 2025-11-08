/**
 * API utilities for accessing the API with the configured token
 */
import { ConfluencePageSchema, ConfluencePageEssentialSchema, type ConfluencePage } from './schemas';

export const API_TOKEN = import.meta.env.VITE_CONFLUENCE_TOKEN;

/**
 * Utility functions for working with Confluence page data
 */
export const ConfluenceUtils = {
  /**
   * Safely extracts the HTML content from a Confluence page
   * @param page The Confluence page object
   * @param format The format to extract ('storage' for raw HTML, 'view' for rendered HTML)
   * @returns The HTML content or an empty string if not available
   */
  getContent(page: ConfluencePage, format: 'storage' | 'view' = 'view'): string {
    try {
      return page.body?.[format]?.value || '';
    } catch (error) {
      console.warn(`Failed to extract ${format} content from page:`, error);
      return '';
    }
  },

  /**
   * Safely extracts the space information from a Confluence page
   * @param page The Confluence page object
   * @returns An object with space key and name, or default values if not available
   */
  getSpace(page: ConfluencePage): { key: string; name: string } {
    return {
      key: page.space?.key || 'unknown',
      name: page.space?.name || 'Unknown Space',
    };
  },

  /**
   * Safely extracts the ancestors from a Confluence page
   * @param page The Confluence page object
   * @returns An array of ancestor objects with id and title, or an empty array if not available
   */
  getAncestors(page: ConfluencePage): Array<{ id: string; title: string }> {
    if (!page.ancestors || !Array.isArray(page.ancestors)) {
      return [];
    }

    return page.ancestors.map(ancestor => ({
      id: ancestor.id || '',
      title: ancestor.title || 'Untitled',
    }));
  },

  /**
   * Gets the breadcrumb path for a page based on its ancestors
   * @param page The Confluence page object
   * @returns A string representing the breadcrumb path
   */
  getBreadcrumbPath(page: ConfluencePage): string {
    const ancestors = this.getAncestors(page);
    const titles = ancestors.map(a => a.title);

    if (page.title) {
      titles.push(page.title);
    }

    return titles.join(' > ');
  },
};

/**
 * Error class for Confluence API validation failures
 */
export class ConfluenceValidationError extends Error {
  validationErrors: unknown;

  constructor(message: string, validationErrors: unknown) {
    super(message);
    this.name = 'ConfluenceValidationError';
    this.validationErrors = validationErrors;
  }
}

/**
 * Fetches a Confluence page by ID with expanded content
 * @param pageId The Confluence page ID
 * @returns The page data with body, history, space, version, ancestors, and container
 * @throws Error if the API request fails or if the response doesn't match the expected schema
 */
export async function fetchConfluencePage(pageId: string): Promise<ConfluencePage> {
  const endpoint = `https://confluence.anduril.dev/rest/api/content/${pageId}?expand=body.storage,body.view,history,space,version,ancestors,container`;

  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  try {
    // First validate essential fields (will throw if basic structure is wrong)
    ConfluencePageEssentialSchema.parse(data);

    // Then parse with the complete schema (for type safety)
    return ConfluencePageSchema.parse(data);
  } catch (error) {
    console.error('Confluence API validation error:', error);
    throw new ConfluenceValidationError('API response did not match expected schema', error);
  }
}
