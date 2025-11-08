/**
 * API utilities for accessing the API with the configured token
 */

export const API_TOKEN = import.meta.env.VITE_CONFLUENCE_TOKEN;

/**
 * Fetches a Confluence page by ID with expanded content
 * @param pageId The Confluence page ID
 * @returns The page data with body, history, space, version, ancestors, and container
 */
export async function fetchConfluencePage(pageId: string) {
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

  return response.json();
}
