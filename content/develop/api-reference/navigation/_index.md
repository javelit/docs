---
title: Navigation and pages
slug: /develop/api-reference/navigation
---

# Navigation and pages

<TileContainer>

<RefCard href="/develop/api-reference/navigation/jt.navigation">

<Image pure alt="screenshot" src="/images/api/navigation.jpg" />

<h4>Navigation</h4>

Configure the available pages in a multipage app.

```java
var currentPage =
        Jt.navigation(
            Jt.page("/dashboard", DashboardPage::app).title("Home").home(),
            Jt.page("/users", () -> users()).icon("👥"),
            Jt.page("/queries", () -> {Jt.title("Queries").use(); ...}))
        .use();

currentPage.run();
```

</RefCard>

<RefCard href="/develop/api-reference/navigation/jt.page">

<Image pure alt="screenshot" src="/images/api/page.jpg" />

<h4>Page</h4>

Define a page in a multipage app.

```java
Jt.page("/settings", () -> settings())
        .title("Settings")
        .icon(":settings:");
```

</RefCard>

<RefCard href="/develop/api-reference/widgets/jt.pagelink">

<Image pure alt="screenshot" src="/images/api/page_link.jpg" />

<h4>Page link</h4>

Display a link to another page in a multipage app.

```java
Jt.pageLink("/dashboard").use();
Jt.pageLink("/users").label("See Users").use();

// external page
Jt.pageLink("https://github.com/javelit/javelit", "Github project").icon(":link:").use();
```

</RefCard>

<RefCard href="/develop/api-reference/navigation/jt.switchpage">

<h4>Switch page</h4>

Programmatically navigates to a specified page.

```java
Jt.switchPage("/users");

// go home
Jt.switchPage(null);
```

</RefCard>

</TileContainer>
