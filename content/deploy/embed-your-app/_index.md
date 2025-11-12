---
title: Embed your app
slug: /deploy/embed-your-app
---

# Embed your app

Embedding Javelit apps enriches your content by integrating interactive, data-driven applications directly within your pages. 
Whether you're writing a blog post, a technical document or a demo, {/* not supported yet  or sharing resources on platforms like Medium, Notion, or even StackOverflow, */}
embedding Javelit apps adds a dynamic component to your content. This allows your audience to interact with your ideas, rather than merely reading about them or looking at screenshots.

Javelit supports both [iframe](#embedding-with-iframes) and [oEmbed](#embedding-with-oembed) methods for embedding **public** apps. 
This flexibility enables you to share your apps across a wide array of platforms, broadening your app's visibility and impact. In this guide, we'll cover how to use both methods effectively to share your Javelit apps with the world.

<Important>
This feature is not supported on Safari yet. 
</Important>

## Embedding with iframes

To embed a public app, add the query parameter `/?embed=true` to the end of your app URL.

For example, say you want to embed the <a href="https://jbang-production-5e9a.up.railway.app/" target="_blank">Temperature demo app</a>. 
The URL to include in your iframe is: `https://jbang-production-5e9a.up.railway.app/?embed=true`:

```javascript
<iframe
  src="https://jbang-production-5e9a.up.railway.app/?embed=true"
  style="height: 350px; width: 100%;"
></iframe>
```

<iframe 
src={"https://jbang-production-5e9a.up.railway.app/?embed=true"}
style={{height: "350px",  width: "100%", outline: "none"}}>
</iframe>

<br/>  
In addition to allowing you to embed apps via iframes, the `?embed=true` query parameter also does the following:

- removes the "Built with javelit" bottom right label
- adds a grey "Built with javelit" frame with a link to open the app in fullscreen 

{/*

- Removes the toolbar with the app menu icon (<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>more_vert</i>).
- Removes the padding at the top and bottom of the app.
- Removes the colored line from the top of the app.
*/}
{/* NOT IMPLEMENTED YET 
For granular control over the embedding behavior, Javelit allows you to specify one or more instances of the `?embed_options` query parameter (e.g. to show the toolbar, open the app in dark theme, etc). [Click here for a full list of Embed options.](#embed-options)
*/}

<Tip>
**You don't need to write the iframe code manually!**  
Once your app is deployed, click on the app chrome, then click on _Get embed code_.
![App menu](/images/app-menu/app-menu-get-embed-code.png)
The iframe html snippet will be written to your clipboard. 
</Tip>

## Embedding with oEmbed

Javelit's oEmbed support allows for a simpler embedding experience. 
You can directly drop a Javelit app's URL into a platform that supports the Oembed protocol, the embedded app will automatically appear! 

Well, this is the theory, because major platform like Medium, Ghost, or Notion page requires an Oembed provider URL to be whitelisted 
through services like [embed.ly](embed.ly) and [iframely.com](iframely.com).  
As of today, the Oembed server is implemented within the Javelit app itself. This means all apps server are their own Oembed server and they 
cannot be whitelisted in the services above.
While the current solution is enough to support Oembed in a Wordpress server you own, it won't work with platforms that 
require a specific Oembed server to be whitelisted.

We are working on this issue. 
In the meantime, if you need help to get a whitelisted Oembed server, please reach out on the [forum](https://github.com/javelit/javelit/discussions). 

{/*
(or any of more than 700 content providers that supports oEmbed or <a href="https://embed.ly/" target="_blank">embed.ly</a>). This helps Javelit Community Cloud apps seamlessly integrate into these platforms, improving the visibility and accessibility of your apps.
*/}

{/*
### Example

When creating content in a Notion page, Medium article, or Ghost blog, you only need to paste the app's URL and hit "**Enter**." The app will then render automatically at that spot in your content. You can use your undecorated app URL without the `?embed=true` query parameter.

```
https://30days.streamlit.app/
```

Here's an example of <a href="https://github.com/chrieke" target="_blank">@chrieke</a>'s <a href="https://chrieke-prettymapp-streamlit-prettymappapp-1k0qxh.streamlit.app/" target="_blank">Prettymapp app</a> embedded in a Medium article:

<Image src="/images/streamlit-community-cloud/oembed.gif" alt="Example: Embed an app in a Medium article with oEmbed" clean />

<Tip>

Ensure the platform hosting the embedded Javelit app supports oEmbed or <a href="https://embed.ly/" target="_blank">embed.ly</a>.

</Tip>

### Key Sites for oEmbed

oEmbed should work out of the box for several platforms including but not limited to:

- <a target="_blank" href="https://medium.com/">Medium</a>
- <a target="_blank" href="https://notion.so/">Notion</a>
- <a target="_blank" href="https://www.looker.com/">Looker</a>
- <a target="_blank" href="https://www.tableau.com/">Tableau</a>
- <a target="_blank" href="https://ghost.org/">Ghost</a>
- <a target="_blank" href="https://www.discourse.org/">Discourse</a>
- <a target="_blank" href="https://stackoverflow.com/">StackOverflow</a>
- <a target="_blank" href="https://www.w3schools.com/">W3</a>
- <a target="_blank" href="https://www.reddit.com/">Reddit</a>

Please check the specific platform's documentation to verify support for oEmbed.

### iframe versus oEmbed

The only noteworthy differences between the methods is that iframing allows you to customize the app's embedding behavior (e.g. showing the toolbar, opening the app in dark theme, etc) using the various `?embed_options` described in the next section.

## Embed options

When [Embedding with iframes](#embedding-with-iframes), Javelit allows you to specify one or more instances of the `?embed_options` query parameter for granular control over the embedding behavior.

Both `?embed` and `?embed_options` are invisible to [`st.query_params`](/develop/api-reference/caching-and-state/st.query_params) and its precursors, [`st.experimental_get_query_params`](/develop/api-reference/caching-and-state/st.experimental_get_query_params) and [`st.experimental_set_query_params`](/develop/api-reference/caching-and-state/st.experimental_set_query_params). You can't get or set their values.

The supported values for `?embed_options` are listed below:

1. Show the toolbar at the top right of the app which includes the app menu (<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>more_vert</i>), running man, and link to GitHub.

   ```javascript
   /?embed=true&embed_options=show_toolbar
   ```

2. Show padding at the top and bottom of the app.

   ```javascript
   /?embed=true&embed_options=show_padding
   ```

3. Show the footer reading "Made with Javelit." (This doesn't apply to Javelit versions 1.29.0 and later since the footer was removed from the library.)

   ```javascript
   /?embed=true&embed_options=show_footer
   ```

4. Show the colored line at the top of the app.

   ```javascript
   /?embed=true&embed_options=show_colored_line
   ```

5. Hide the "skeleton" that appears while an app is loading.

   ```javascript
   /?embed=true&embed_options=hide_loading_screen
   ```

6. Disable scrolling for the main body of the app. (The sidebar will still be scrollable.)

   ```javascript
   /?embed=true&embed_options=disable_scrolling
   ```

7. Open the app with light theme.

   ```javascript
   /?embed=true&embed_options=light_theme
   ```

8. Open the app with dark theme.

   ```javascript
   /?embed=true&embed_options=dark_theme
   ```

You can also combine the params:

```javascript
/?embed=true&embed_options=show_toolbar&embed_options=show_padding&embed_options=show_footer&embed_options=show_colored_line&embed_options=disable_scrolling
```

### Build an embed link

You can conveniently build an embed link for your app &mdash; right from your app!

1. From your app at `<your-custom-subdomain>.streamlit.app`, click "**Share**" in the upper-right corner.
2. Click "**Embed**" to access a list of selectable embed options.

   ![Access embed options from the share button](/images/streamlit-community-cloud/share-menu-embed.png)

3. Select your embed options and click "**Get embed link**" to copy the embed link to your clipboard.

   ![Build a customized embed link for your app from the share button](/images/streamlit-community-cloud/share-menu-embed-url.png)

*/}
