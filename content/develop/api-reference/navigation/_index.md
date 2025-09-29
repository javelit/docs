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
Map<String, List<Object>> pages = Map.of(
    "Your account", List.of(logOut, settings),
    "Reports", List.of(overview, usage),
    "Tools", List.of(search)
);
Jt.navigation(pages).use();
```

</RefCard>

<RefCard href="/develop/api-reference/navigation/jt.page">

<Image pure alt="screenshot" src="/images/api/page.jpg" />

<h4>Page</h4>

Define a page in a multipage app.

```java
Object home = Jt.page(
    "home.java",
    "Home",
    ":material/home:"
);
```

</RefCard>

<RefCard href="/develop/api-reference/widgets/jt.pagelink">

<Image pure alt="screenshot" src="/images/api/page_link.jpg" />

<h4>Page link</h4>

Display a link to another page in a multipage app.

```java
Jt.pageLink("App.java", "Home", "🏠").use();
Jt.pageLink("pages/Profile.java", "My profile").use();
```

</RefCard>

<RefCard href="/develop/api-reference/navigation/jt.switchpage">

<h4>Switch page</h4>

Programmatically navigates to a specified page.

```java
Jt.switchPage("pages/MyPage.java");
```

</RefCard>

</TileContainer>
