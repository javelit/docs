---
title: Javelit's testing utilities
slug: /develop/concepts/app-testing
---

# Javelit's native app testing framework

Javelit provides Playwright end-to-end test utilities to make it simple for developers to build and run automated tests.

### Import the test dependencies:

**maven** (`pom.xml`):
```
<dependency>
    <groupId>io.javelit</groupId>
    <artifactId>javelit</artifactId>
    <version>0.19.0</version>
    <type>test-jar</type>
    <scope>test</scope>
</dependency>
```

<Warning>
The testing utilities depend on JUnit.
Please reach out on [Github](https://github.com/javelit/javelit/discussions) to get help with other testing frameworks.
</Warning>

### Test your app 

```java
import io.javelit.e2e.helpers.PlaywrightUtils;
import static io.javelit.e2e.helpers.PlaywrightUtils.WAIT_1_SEC_MAX;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInfo;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

@Test
public void testMyApp(TestInfo testInfo) {
    PlaywrightUtils.runInSharedBrowser(testInfo, app, page -> {
        // interact with the app and perform assertions
        // example: ensure a dateInput component appears properly
        assertThat(page.locator("jt-date-input").first()).isVisible(WAIT_1_SEC_MAX);
    });
}
```
Explanations : 
- `TestInfo` is injected by JUnit.  
- `app` is the Javelit app as a `String`, a `Path` or a `Class`. See full documentation below.
- `page` is a `com.microsoft.playwright.Page`. For more information, visit the [Playwright For Java documentation](https://playwright.dev/java/) 
- `PlaywrightUtils.runInSharedBrowser` takes care of starting a Javelit server, launching a headless browser on an available port and navigating to the app page.
- `WAIT_1_SEC_MAX` means the timeout for the check is 1 second. The default timeout in Playwright is often 30 seconds. A lot of option constants with lower timeout values are provided, just type `WAIT_` in your IDE when filling options of a Playwright method, it should suggest all relevant constants from `io.javelit.e2e.helpers.PlaywrightUtils`.

The Javelit server runs with the test classpath.  
Test traces are written in the `target/playwright-traces/` folder.


### Available methods 

```java
// run in a shared browser (recommended, faster) 
// The tests run on different pages in the browser, but the browser is shared so cookies, storage, etc... are shared
// Thread safe. Each call launches a Javelit server.  
PlaywrightUtils.runInSharedBrowser(String testName, Path appFile, Consumer<Page> run);
PlaywrightUtils.runInSharedBrowser(String testName, String app, Consumer<Page> run);

// run in a dedicated browser
// use when you need to test behaviors that depend on the browser cookies, storage, cache 
PlaywrightUtils.runInDedicatedBrowser(String testName, Path appFile, Consumer<Page> run);
PlaywrightUtils.runInDedicatedBrowser(String testName, String app, Consumer<Page> run);
PlaywrightUtils.runInDedicatedBrowser(String testName, Class<?> appClass, Consumer<Page> run);
```

{/*

The provided class, AppTest, simulates a running app and provides methods to set up, manipulate, and inspect the app contents via API instead of a browser UI. AppTest provides similar functionality to browser automation tools like Selenium or Playwright, but with less overhead to write and execute tests. Use our testing framework with a tool like [pytest](https://docs.pytest.org/) to execute or automate your tests. A typical pattern is to build a suite of tests for an app to ensure consistent functionality as the app evolves. The tests run locally and/or in a CI environment like GitHub Actions.

<InlineCalloutContainer>
    
    <InlineCallout
        color="yellow-80"
        icon="science"
        bold="Get started"
        href="/develop/concepts/app-testing/get-started"
    >introduces you to the app testing framework and how to execute tests using <code>pytest</code>. Learn how to initialize and run simulated apps, including how to retrieve, manipulate, and inspect app elements.</InlineCallout>
    
    <InlineCallout
        color="yellow-80"
        icon="password"
        bold="Beyond the basics"
        href="/develop/concepts/app-testing/beyond-the-basics"
    >explains how to work with secrets and Session State within app tests, including how to test multipage apps.</InlineCallout>
    
    <InlineCallout
        color="yellow-80"
        icon="play_circle"
        bold="Automate your tests"
        href="/develop/concepts/app-testing/automate-tests"
    >with Continuous Integration (CI) to validate app changes over time.</InlineCallout>
    
    <InlineCallout
        color="yellow-80"
        icon="quiz"
        bold="Example"
        href="/develop/concepts/app-testing/examples"
    >puts together the concepts explained above. Check out an app with multiple tests in place.</InlineCallout>
    
    <InlineCallout
        color="yellow-80"
        icon="saved_search"
        bold="Cheat sheet"
        href="/develop/concepts/app-testing/cheat-sheet"
    >is a compact reference summarizing the available syntax.</InlineCallout>
</InlineCalloutContainer>
*/}
