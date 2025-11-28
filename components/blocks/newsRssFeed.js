import React, { useEffect, useState } from "react";
import NewsEntry from "./newsEntry";

function NewsRssFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const feedUrl = "/feed.atom";
    const summariesUrl = "/feed-summaries.json";

    // Fetch both feed and summaries
    Promise.all([
      fetch(feedUrl).then((response) => response.text()),
      fetch(summariesUrl)
        .then((response) => response.json())
        .catch(() => {
          console.warn("No summaries file found, using empty excerpts");
          return {};
        }),
    ])
      .then(([xmlText, summaries]) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");

        // Parse Atom feed entries
        const entries = xmlDoc.querySelectorAll("entry");
        const parsedPosts = Array.from(entries)
          .slice(0, 10)
          .map((entry) => {
            // Extract title
            const titleEl = entry.querySelector("title");
            const title = titleEl ? titleEl.textContent : "";

            // Extract published date
            const publishedEl = entry.querySelector("published");
            const published_at = publishedEl ? publishedEl.textContent : "";

            // Extract link
            const linkEl = entry.querySelector("link[rel='alternate']");
            const url = linkEl ? linkEl.getAttribute("href") : "";

            // Get summary from summaries JSON, or empty string
            const excerpt = summaries[url] || "";

            // Try to extract featured image from content (skip GIFs)
            let feature_image = null;
            const contentEl = entry.querySelector("content");
            if (contentEl) {
              const content = contentEl.textContent;
              // Find all img tags in the content
              const imgMatches = content.matchAll(/<img[^>]+src="([^">]+)"/g);
              // Find first non-GIF image
              for (const match of imgMatches) {
                const src = match[1];
                if (!src.toLowerCase().includes(".gif")) {
                  feature_image = src;
                  break;
                }
              }
            }

            // Generate a unique ID from the URL or title
            const id = url || title;

            return {
              id,
              title,
              published_at,
              excerpt,
              url,
              feature_image,
            };
          })
          .filter(
            (post) => !post.title.toLowerCase().includes("introducing javelit"),
          )
          .slice(0, 3);

        setPosts(parsedPosts);
      })
      .catch((err) => {
        console.error("Error fetching RSS feed:", err);
      });
  }, []);

  return (
    <div>
      <div id="result">
        {posts.map((post) => (
          <NewsEntry
            key={post.id}
            date={post.published_at}
            title={post.title}
            text={post.excerpt}
            link={post.url}
            image={post.feature_image}
            target="_blank"
          />
        ))}
      </div>
    </div>
  );
}

export default NewsRssFeed;
