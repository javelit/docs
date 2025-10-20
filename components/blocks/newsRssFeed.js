import React, { useEffect, useState } from "react";
import NewsEntry from "./newsEntry";

function NewsRssFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const feedUrl = "/feed.atom";

    fetch(feedUrl)
      .then((response) => response.text())
      .then((xmlText) => {
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

            // Extract summary/excerpt
            const summaryEl = entry.querySelector("summary");
            const excerpt = summaryEl ? summaryEl.textContent : "";

            // Extract link
            const linkEl = entry.querySelector("link[rel='alternate']");
            const url = linkEl ? linkEl.getAttribute("href") : "";

            // Try to extract featured image from content
            let feature_image = null;
            const contentEl = entry.querySelector("content");
            if (contentEl) {
              const content = contentEl.textContent;
              // Look for img tags in the content
              const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
              if (imgMatch) {
                feature_image = imgMatch[1];
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
            (post) => !post.title.toLowerCase().includes("introducing jeamlit"),
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
