import type { ResearchSource } from "./types";

export type SearchSourcesOptions = {
  queries: string[];
  maxResultsPerQuery?: number;
  seedSources?: ResearchSource[];
};

export async function searchSources(options: SearchSourcesOptions): Promise<ResearchSource[]> {
  const maxResultsPerQuery = options.maxResultsPerQuery ?? 5;
  const results = new Map<string, ResearchSource>();

  for (const source of options.seedSources ?? []) {
    results.set(normalizeUrlKey(source.url), source);
  }

  for (const query of options.queries) {
    const found = await searchBingRss(query, maxResultsPerQuery);
    for (const source of found) {
      const key = normalizeUrlKey(source.url);
      if (!results.has(key)) {
        results.set(key, { ...source, query });
      }
    }
  }

  return [...results.values()];
}

async function searchBingRss(query: string, maxResults: number): Promise<ResearchSource[]> {
  const url = `https://www.bing.com/search?format=rss&q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url, {
      headers: {
        "accept": "application/rss+xml, application/xml, text/xml",
        "user-agent": "SpendLensResearchAgent/0.1 (+public-spending-transparency; non-aggressive)",
      },
    });

    if (!response.ok) {
      return [];
    }

    const xml = await response.text();
    return parseRssItems(xml).slice(0, maxResults);
  } catch {
    return [];
  }
}

function parseRssItems(xml: string): ResearchSource[] {
  const items: ResearchSource[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(xml)) !== null) {
    const item = match[1] ?? "";
    const title = getTagValue(item, "title");
    const url = getTagValue(item, "link");
    const snippet = getTagValue(item, "description");

    if (!title || !url) continue;
    items.push({
      title: decodeXml(title),
      url: decodeXml(url),
      snippet: snippet ? decodeXml(stripTags(snippet)) : undefined,
    });
  }

  return items;
}

function getTagValue(xml: string, tag: string) {
  const match = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i").exec(xml);
  return match?.[1]?.trim() ?? "";
}

function stripTags(value: string) {
  return value.replace(/<[^>]+>/g, " ");
}

function decodeXml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, "\"")
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeUrlKey(value: string) {
  try {
    const url = new URL(value);
    url.hash = "";
    return url.toString();
  } catch {
    return value.trim();
  }
}
