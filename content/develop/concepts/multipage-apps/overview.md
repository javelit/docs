---
title: Overview of multipage apps
slug: /develop/concepts/multipage-apps/overview
description: Understand Streamlit's features for creating multipage apps
---

# Overview of multipage apps

## `Jt.page` and `Jt.navigation`

With `Jt.navigation` and `Jt.page` you can declare any Java class {/* TODO implement callable support or `Callable` */} 
as a page in your app. Furthermore, you can define common elements for your pages in your entrypoint file (the file you pass to `jeamlit run`). 
With these methods, your entrypoint file becomes like a picture frame shared by all your pages.

You must include `Jt.navigation` in your entrypoint file to configure your app's navigation menu. This is also how 
your entrypoint file serves as the router between your pages.

## Page terminology

A page has three identifying pieces as follows:

- **Page class**: This is a Java class {/* or callable function */} with the page's source code.
- **Page title**: This is how the page is identified within the navigation menu and the browser tab. See <i style={{ verticalAlign: "-.25em" }} class="material-icons-sharp">looks_one</i> and <i style={{ verticalAlign: "-.25em" }} class="material-icons-sharp">looks_two</i>.
- **Page URL path**: This is the relative path of the page from the root URL of the app. See <i style={{ verticalAlign: "-.25em" }} class="material-icons-sharp">looks_3</i>.

Additionally, a page can have 1 icon as follows:
{/* TODO implement this favicon thing 
- **Page favicon**: This is the icon next to your page title within a browser tab. See <i style={{ verticalAlign: "-.25em" }} class="material-icons-sharp">looks_4</i>.
*/}
- **Page icon**: This is the icon next to your page label in the navigation menu. See <i style={{ verticalAlign: "-.25em" }} class="material-icons-sharp">looks_5</i>.
- ***Page favicon** support is not implemented yet*

{/* todo implement favicon
Typically, the page icon and favicon are the same, but it's possible make them different.
*/}

<div style={{ maxWidth: '564px', margin: 'auto' }}>
<Image caption="1. Page title, 2.Page title, 3. Page URL path, 4.Page favicon, 5. Page icon" src="/images/page_parts.jpg" frame />
</div>

## Automatic page labels and URLs

If you use `Jt.page` without declaring the page title or URL pathname, Jeamlit automatically determines 
the page title and URL path based on the Class name. This section describes this naming convention.

For example, `Jt.page(MyPage.class)` will have: 
- **title**: `My Page` → Jeamlit assumes Camel Case
- **url path**: `/MyPage` → Jeamlit simply uses the class simple name

## Navigating between pages

The primary way users navigate between pages is through the navigation widget. The menu that appears in the sidebar is 
generated when `Jt.navigation` is used. When a user clicks a page of the navigation widget, the app reruns 
and loads the selected page. Optionally, you can hide the default navigation UI with `Jt.navigation(...).hidden()` and
build your own with [`Jt.pageLink`](/develop/api-reference/widgets/jt.pagelink). 
{/*  TODO tutorials 
For more information, see [Build a custom navigation menu with `st.page_link`](/develop/tutorials/multipage/st.page_link-nav).
*/}

If you need to programmatically switch pages, use [`Jt.switchPage`](/develop/api-reference/navigation/jt.switchpage).

Users can also navigate between pages using URLs as noted above. 

<Important>
    Navigating between pages by URL creates a new browser session. In particular, clicking markdown links to other pages 
resets the [Session State](/develop/concepts/architecture/session-state). In order to retain values in 
`Jt.session_state`, handle page switching through Jeamlit navigation commands and widgets, like `Jt.navigation`, 
`Jt.switchPage`, `Jt.pageLink`, and the built-in navigation menu.
</Important>

If a user tries to access a URL for a page that does not exist, they will see a 404 page saying "Page not found."

<div style={{ maxWidth: '75%', margin: 'auto' }}>
<Image alt="Page not found" src="/images/mpa-page-not-found.png" />
</div>
