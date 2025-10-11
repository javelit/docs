---
title: Create a multipage app
slug: /get-started/tutorials/create-a-multipage-app
---

# Create a multipage app

In [Additional features](/get-started/fundamentals/additional-features), we introduced multipage apps, including how to define pages, structure and run multipage apps, and navigate between pages in the user interface. You can read more details in our guide to [Multipage apps](/develop/concepts/multipage-apps).

In this tutorial, we'll build a multipage AI Assistant app using [Ollama](https://ollama.ai) as a local AI 
model provider and [LangChain4j](https://docs.langchain4j.dev) in Java as the client library. This demonstrates 
key concepts like page navigation, session state management, and how the main app acts as a shared canvas for 
all pages. We will also encounter advanced concepts like [forms](/develop/concepts/architecture/forms) 
and [empty containers](/develop/concepts/design/animate).

## Prerequisites

Before starting, ensure you have:
1. [Ollama](https://ollama.ai) installed and running (`ollama serve`)
2. Required models pulled: `ollama pull gemma3:270m` and `ollama pull gemma3:1b`

<Tip>
You can find the app files here: https://github.com/jeamlit/jeamlit/tree/main/examples/multipage_ai

**Try it out before reading further with:**
```bash
jeamlit run  https://github.com/jeamlit/jeamlit/tree/main/examples/multipage_ai
```
</Tip>

## App structure

Our multipage app will have this structure:
```
AIAssistant.java          # Main entrypoint
pages/
  ├── ClassificationPage.java
  └── ChatPage.java
```

## Create the main entrypoint

The main entrypoint (`AIAssistant.java`) serves as the **canvas** for all pages. Elements placed in this entrypoint 
appear on every page. The current page is run via `currentPage.run()`.

<Collapse title="AIAssistant.java (click to expand)" expanded={false} >

```java
/// usr/bin/env jbang "$0" "$@" ; exit $?

//DEPS io.jeamlit:jeamlit:${JEAMLIT_VERSION}
//DEPS dev.langchain4j:langchain4j:0.36.2
//DEPS dev.langchain4j:langchain4j-ollama:0.36.2

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

import io.jeamlit.core.Jt;
import io.jeamlit.core.Shared;
import pages.ChatPage;
import pages.ClassificationPage;

public class AIAssistant {
    public static void main(String[] args) {
        // Sidebar configuration - appears on ALL pages
        Jt.title("🤖 AI Assistant").use(Jt.SIDEBAR);

        // About section - appears on ALL pages
        Jt.markdown("""
                This demo showcases [LangChain4j](https://docs.langchain4j.dev) with [Ollama](https://ollama.ai) - completely free local AI!

                Navigate between pages to explore:
                - 🏷️ **Classification**: Sentiment analysis
                - 💬 **Chat**: Simple Q&A assistant
                """).use(Jt.SIDEBAR);

        // Define navigation with multiple pages
        JtPage currentPage = Jt
                .navigation(Jt.page(ClassificationPage.class).title("Classification").home(),
                            Jt.page(ChatPage.class).title("Chat"))
                .use();

        // Model selector in sidebar - appears on ALL pages
        boolean ollamaRunning = checkOllamaConnection();
        if (ollamaRunning) {
            Jt.markdown("**Model Selection**").use(Jt.SIDEBAR);
            Jt.text("✅ Ollama connected").use(Jt.SIDEBAR);
            String currentModel = Jt.sessionState().getString("selected_model", "gemma3:270m");

            List<String> models = List.of("gemma3:270m", "gemma3:1b");
            String selectedModel = Jt.selectbox("Choose model", models)
                                     .index(models.indexOf(currentModel))
                                     .use(Jt.SIDEBAR);

            // Check if the selected model is loaded in Ollama
            if (isModelLoaded(selectedModel)) {
                // Store model in session state for pages to access
                Jt.sessionState().put("selected_model", selectedModel);

                // Execute the current page - this is where page content starts to execute
                currentPage.run();
            } else {
                // model is not available - display error message
                String errorMsg = """
                       ⚠️ Model not available. \s
                       Run:  \s
                       `ollama run %s` \s
                       and refresh this page.  \s
                       Or make sure the model was not paused automatically by ollama!
                       """.formatted(selectedModel);
                Jt.error(errorMsg).use();
            }
        } else {
            Jt.error("⚠️ Ollama is not running on port `11434`. Start ollama by running `ollama serve` and refresh this page.").use();
        }
    }

    private static boolean checkOllamaConnection() {
        try {
            URL url = new URL("http://localhost:11434/api/tags");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setConnectTimeout(2000);
            conn.setReadTimeout(2000);
            int responseCode = conn.getResponseCode();
            conn.disconnect();
            return responseCode == 200;
        } catch (Exception e) {
            return false;
        }
    }

    private static boolean isModelLoaded(String modelName) {
        try {
            final URL url = new URL("http://localhost:11434/api/ps");
            final HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setConnectTimeout(2000);
            conn.setReadTimeout(2000);

            if (conn.getResponseCode() != 200) {
                return false;
            }

            // Parse JSON response using Jackson
            final var json = Shared.OBJECT_MAPPER.readValue(conn.getInputStream(), java.util.Map.class);
            conn.disconnect();

            // Check if the model field matches our selected model
            final var models = (java.util.List<java.util.Map<String, Object>>) json.get("models");
            if (models != null) {
                for (var model : models) {
                    if (modelName.equals(model.get("model"))) {
                        return true;
                    }
                }
            }
            return false;

        } catch (Exception e) {
            return false;
        }
    }
}
```

</Collapse>

### Key concepts

**1. Page Navigation**

The `Jt.navigation()` method defines which pages are available:

```java
JtPage currentPage = Jt
    .navigation(Jt.page(ClassificationPage.class).title("Classification").home(),
                Jt.page(ChatPage.class).title("Chat"))
    .use();
```

This returns a `JtPage` object representing the currently selected page. Call `currentPage.run()` to execute that page's `main()` method.

**2. The Canvas Pattern**

Elements placed *before* and *after* `currentPage.run()` appear on **all pages**:
- Sidebar title and about section
- Model selection dropdown
- Connection status

Remember, Jeamlit apps are resolved top to bottom. While the `Jt.navigation` and `currentPage.run()` automatically add 
a table of content in the sidebar and URL paths management, the app is still executed top to bottom. In this demo, 
the entrypoint app does not call the current page if the ollama model is not available. The preconditions checks are not 
duplicated in all pages! 

**3. Session State for Shared Data**

Session state allows sharing data between the main app and pages:

```java
// Main app stores the selected model
Jt.sessionState().put("selected_model", selectedModel);

// Pages retrieve the selected model
String modelName = Jt.sessionState().getString("selected_model", "gemma3:270m");
```

This pattern is crucial for multipage apps - the model selection in the sidebar is available to both pages without duplicating code.

## Create the pages

Now let's create the two page classes. Each page is a separate Java class with a `main()` method.

### Classification Page

<Collapse title="pages/ClassificationPage.java (click to expand)" expanded={false} >

```java
package pages;

//DEPS io.jeamlit:jeamlit:${JEAMLIT_VERSION}
//DEPS dev.langchain4j:langchain4j:0.36.2
//DEPS dev.langchain4j:langchain4j-ollama:0.36.2

import dev.langchain4j.model.ollama.OllamaChatModel;
import dev.langchain4j.service.AiServices;
import dev.langchain4j.service.UserMessage;
import io.jeamlit.core.Jt;

public class ClassificationPage {

    // Define the Sentiment enum
    enum Sentiment {
        POSITIVE,
        NEUTRAL,
        NEGATIVE
    }

    // Define the AI-powered Sentiment Analyzer interface
    interface SentimentAnalyzer {
        @UserMessage("Analyze sentiment of {{it}}")
        Sentiment analyzeSentimentOf(String text);
    }

    public static void main(String[] args) {
        Jt.title("🏷️ Sentiment Classification").use();

        Jt.markdown("""
                    This page demonstrates **sentiment classification** using LangChain4j with Ollama. \s
                    Enter some text below and the AI will classify its sentiment as POSITIVE, NEUTRAL, or NEGATIVE.
                    """).use();

        // Get model from session state (shared by main app)
        String modelName = Jt.sessionState().getString("selected_model", "gemma3:270m");

        // Text input for classification
        Jt.markdown("""
                    ### 📝 Input
                    *💡 Try these examples:*
                    """).use();

        // Example buttons
        String exampleValue = Jt.sessionState().computeIfAbsentString("input", k -> "I love this product! It's amazing and works perfectly.");

        var col1 = Jt.columns(3).use();
        if (Jt.button("Positive example").use(col1.col(0))) {
            exampleValue = "This is absolutely wonderful! Best experience ever!";
        }
        if (Jt.button("Neutral example").use(col1.col(1))) {
            exampleValue = "The product works as described. Nothing special.";
        }
        if (Jt.button("Negative example").use(col1.col(2))) {
            exampleValue = "Terrible quality. Very disappointed with this purchase.";
        }
        Jt.sessionState().put("input", exampleValue);

        String text = Jt
                .textArea("Enter text to analyze")
                .value(exampleValue)
                .height(150)
                .use();

        // Classify button
        if (Jt.button("Classify Sentiment").type("primary").use()) {
            if (text.trim().isEmpty()) {
                Jt.text("Please enter some text to analyze.").use();
            } else {
                try {
                    Jt.text("Analyzing sentiment...").use();

                    // Create Ollama model
                    var chatModel = OllamaChatModel
                            .builder()
                            .baseUrl("http://localhost:11434")
                            .modelName(modelName)
                            .temperature(0.3)
                            .build();

                    // Create AI-powered Sentiment Analyzer
                    SentimentAnalyzer analyzer = AiServices.create(SentimentAnalyzer.class, chatModel);

                    // Analyze sentiment
                    Sentiment sentiment = analyzer.analyzeSentimentOf(text);

                    // Display result
                    Jt.markdown("### 🎯 Result").key("classi-result").use();

                    String emoji = switch (sentiment) {
                        case POSITIVE -> "😊";
                        case NEUTRAL -> "😐";
                        case NEGATIVE -> "😞";
                    };

                    Jt.markdown("**Sentiment:** %s %s".formatted(emoji, sentiment)).use();

                } catch (Exception e) {
                    throw e;
                }
            }
        }
    }
}
```

</Collapse>

![classification page screenshot](/images/get-started/multipage_classify.png)

### Chat Page

<Collapse title="pages/ChatPage.java (click to expand)" expanded={false} >

```java
package pages;

//DEPS io.jeamlit:jeamlit:${JEAMLIT_VERSION}
//DEPS dev.langchain4j:langchain4j:0.36.2
//DEPS dev.langchain4j:langchain4j-ollama:0.36.2

import dev.langchain4j.model.ollama.OllamaChatModel;
import dev.langchain4j.service.AiServices;
import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;
import dev.langchain4j.service.V;
import io.jeamlit.core.Jt;
import io.jeamlit.core.JtContainer;

public class ChatPage {

    // Define the AI Assistant interface
    interface Assistant {
        @SystemMessage("You are a helpful AI assistant. Provide clear, concise, and accurate answers.")
        @UserMessage("{{question}}")
        String chat(@V("question") String question);
    }

    public static void main(String[] args) {
        Jt.title("💬 Chat Assistant").use();

        Jt.markdown("""
                            This page demonstrates a **simple Q&A chat** using LangChain4j with Ollama.
                            Ask any question and get an AI-powered response!
                            """).use();

        // Get model from session state (shared by main app)
        String modelName = Jt.sessionState().getString("selected_model", "gemma3:270m");

        // Form prevents reruns when typing - only reruns when button clicked
        JtContainer formContainer = Jt.form().use();

        String question = Jt.textArea("Your question")
                            .value("What is the meaning of life?")
                            .height(100)
                            .placeholder("Enter your question here...")
                            .use(formContainer);

        // Temperature slider - adjustable per request
        double temperature = Jt.slider("Temperature - the higher the more creative")
                .min(0.0)
                .max(2.0)
                .value(0.7)
                .step(0.1)
                .use(formContainer);

        // Form submit button
        if (Jt.formSubmitButton("Get Answer").type("primary").use(formContainer)) {
            if (question.trim().isEmpty()) {
                Jt.text("Please enter a question.").use();
            } else {
                try {
                    // Empty container allows updating content in place
                    var inPlaceContainer = Jt.empty("load-and-answer").use();

                    // Show loading state
                    Jt.text("Thinking...").use(inPlaceContainer);

                    // Create Ollama model
                    var chatModel = OllamaChatModel.builder()
                                                   .baseUrl("http://localhost:11434")
                                                   .modelName(modelName)
                                                   .temperature(temperature)
                                                   .build();

                    // Create AI-powered Assistant
                    Assistant assistant = AiServices.create(Assistant.class, chatModel);

                    // Get answer
                    String answer = assistant.chat(question);

                    // Replace loading state with answer
                    Jt.markdown("### 💡 Answer\n" + answer).use(inPlaceContainer);

                } catch (Exception e) {
                    Jt.error("Error getting answer: " + e.getMessage()).use();
                }
            }
        }
    }
}
```

</Collapse>

![chat page screenshot](/images/get-started/multipage_chat.png)

The Chat page demonstrates two advanced patterns for better user experience:

**1. Forms for controlled reruns**

As explained in the [basic concepts](/get-started/fundamentals/main-concepts#data-flow), a Jeamlit app re-runs 
top-to-bottom every time a widget value is changed. Without a form, changing the text area or temperature slider 
would trigger a full app rerun. With a form, the app only reruns when the submit button `Get answer` is clicked.
Forms prevent the app from rerunning on every widget change. 

```java
JtContainer formContainer = Jt.form().use();
// Add inputs to form
String question = Jt.textArea("Your question").use(formContainer);
double temperature = Jt.slider("Temperature").use(formContainer);
// app only reruns when this button is clicked
if (Jt.formSubmitButton("Get Answer").use(formContainer)) { ... }
```

Learn more: [Forms documentation](/develop/concepts/architecture/forms)

**2. Empty containers for dynamic updates**

Empty containers allow replacing content in place without adding new elements. This creates a smooth loading → result transition:

```java
var inPlaceContainer = Jt.empty("load-and-answer").use();
Jt.text("Thinking...").use(inPlaceContainer);  // Show loading state
// ... AI processing ...
Jt.markdown("### Answer\n" + answer).use(inPlaceContainer);  // Replace with result
```

Learn more: [Animation documentation](/develop/concepts/design/animate)

## Run the multipage app

To run your multipage app:

```bash
jeamlit run AIAssistant.java
```

The app will:
1. Display the sidebar with navigation, about section, and model selector on all pages
2. Allow switching between Classification and Chat pages
3. Share the selected model between pages via session state
4. Show page-specific content in the main area

**It's never been so easy to try and demo [LangChain4j](https://docs.langchain4j.dev/)!**

## Next steps

Congratulations! 🎉 If you've read this far, chances are you've learned to create both single-page and 
multipage apps. Where you go from here is entirely up to your creativity! We’re excited to see what you’ll 
build now that adding additional pages to your apps is easier than ever. Try adding more pages to the app 
we've just built as an exercise. Also, stop by the [forum](https://github.com/jeamlit/jeamlit/discussions/) to show 
off your multipage apps with the Jeamlit community! 🚡

Here are some resources to continue learning:

- Post a question or share your multipage app on our [community forum](https://github.com/jeamlit/jeamlit/discussions/).
- Explore the full [Multipage apps documentation](/develop/concepts/multipage-apps)
- Learn about [Forms](/develop/concepts/architecture/forms) for controlled reruns
- Discover [Animation techniques](/develop/concepts/design/animate) with empty containers
- Browse the [API reference](/develop/api-reference/) for all Jeamlit components
