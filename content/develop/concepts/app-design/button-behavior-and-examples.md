---
title: Button behavior and examples
slug: /develop/concepts/design/buttons
---

# Button behavior and examples

## Summary

Buttons created with [`Jt.button`](/develop/api-reference/widgets/jt.button) do not retain state. They return `True` on 
the app rerun resulting from their click and immediately return to `False` on the next app rerun. If a displayed 
element is nested inside 
```java
if (Jt.button('Click me').use()) {
    ...
}
```
the element will be visible when the button is clicked and disappear as soon as the user takes their next action. 
This is because the app reruns and the button return value becomes `False`.

In this guide, we will illustrate the use of buttons and explain common misconceptions. Read on to see a variety of 
examples that expand on `Jt.button` using [`Jt.sessionState`](/develop/api-reference/caching-and-state/jt.sessionstate). 
[Anti-patterns](#anti-patterns) are included at the end. Go ahead and pull up your favorite code editor so you 
can `javelit run` the examples as you read. Check out Javelit's [Basic concepts](/get-started/fundamentals/main-concepts) 
if you haven't run your own Javelit apps yet.

## When to use `if (Jt.button().use())`

When code is conditioned on a button's value, it will execute once in response to the button being clicked and not again (until the button is clicked again).

Good to nest inside buttons:

- Transient messages that immediately disappear.
- Once-per-click processes that saves data to session state, a file, or
  a database.

Bad to nest inside buttons:

- Displayed items that should persist as the user continues.
- Other widgets which cause the app to rerun when used.
- Processes that neither modify session state nor write to a file/database.\*

\* This can be appropriate when disposable results are desired. If you
have a "Validate" button, that could be a process conditioned directly on a
button. It could be used to create an alert to say 'Valid' or 'Invalid' with no
need to keep that info.

## Common logic with buttons

### Show a temporary message with a button

If you want to give the user a quick button to check if an entry is valid, but not keep that check displayed as the user continues.

In this example, a user can click a button to check if their `animal` string is in the `animal_shelter` list. When the user clicks "**Check availability**" they will see "We have that animal!" or "We don't have that animal." If they change the animal in [`Jt.textInput`](/develop/api-reference/widgets/jt.textinput), the app reruns and the message disappears until they click "**Check availability**" again.

```java
import io.javelit.core.Jt;
import java.util.List;

public class App {
    public static void main(String[] args) {
        List<String> animalShelter = List.of("cat", "dog", "rabbit", "bird");

        String animal = Jt.textInput("Type an animal").use();

        if (Jt.button("Check availability").use()) {
            boolean haveIt = animalShelter.contains(animal.toLowerCase());
            String message = haveIt ? "We have that animal!" : "We don't have that animal.";
            Jt.text(message).use();
        }
    }
}
```

### Stateful button

If you want a clicked button to continue to be `True`, create a value in `Jt.sessionState()` and use the button to set that value to `True` in a callback.

```java
import io.javelit.core.Jt;

public class App {
    public static void main(String[] args) {
        Jt.sessionState().computeIfAbsentBoolean("clicked", k -> false);

        Jt.button("Click me")
                .onClick(b -> Jt.sessionState().put("clicked", true))
                .use();

        if (Jt.sessionState().getBoolean("clicked")) {
            // The message and nested widget will remain on the page
            Jt.text("Button clicked!").use();
            Jt.slider("Select a value").use();
        }
    }
}
```

### Toggle button

If you want a button to work like a toggle switch, consider using [`Jt.checkbox`](/develop/api-reference/widgets/jt.checkbox) 
or [`Jt.toggle`](/develop/api-reference/widgets/jt.toggle). 
Otherwise, you can use a button with a callback function to reverse a boolean value saved in `Jt.sessionState()`.

In this example, we use `Jt.button` to toggle another widget on and off. By displaying [`Jt.slider`](/develop/api-reference/widgets/jt.slider) conditionally on a value in `Jt.sessionState()`, the user can interact with the slider without it disappearing.

```java
import io.javelit.core.Jt;

public class App {
    public static void main(String[] args) {
        Jt.sessionState().computeIfAbsentBoolean("button", k -> false);

        Jt.button("Click me")
                .onClick(b -> {
                    boolean current = Jt.sessionState().getBoolean("button");
                    Jt.sessionState().put("button", !current);
                })
                .use();

        if (Jt.sessionState().getBoolean("button")) {
            // The message and nested widget will remain on the page
            Jt.text("Button is on!").use();
            Jt.slider("Select a value").use();
        } else {
            Jt.text("Button is off!").use();
        }
    }
}
```

Alternatively, you can use the value in `Jt.sessionState()` on the slider's `disabled` parameter.

```java
import io.javelit.core.Jt;

public class App {
    public static void main(String[] args) {
        Jt.sessionState().computeIfAbsentBoolean("button", k -> false);

        Jt.button("Click me")
                .onClick(b -> {
                    boolean current = Jt.sessionState().getBoolean("button");
                    Jt.sessionState().put("button", !current);
                })
                .use();

        Jt.slider("Select a value")
                .disabled(Jt.sessionState().getBoolean("button"))
                .use();
    }
}
```

### Buttons to continue or control stages of a process

Another alternative to nesting content inside a button is to use a value in `Jt.sessionState()` that designates the "step" or "stage" of a process. In this example, we have four stages in our app:

0. Before the user begins.
1. User enters their name.
2. User chooses a color.
3. User gets a thank-you message.

A button at the beginning advances the stage from 0 to 1. A button at the end resets the stage from 3 to 0. The 
other widgets used in stage 1 and 2 have callbacks to set the stage. If you have a process with dependant steps and 
want to keep previous stages visible, such a callback forces a user to retrace subsequent stages if they change an earlier widget.

```java
import io.javelit.core.Jt;
import java.util.List;

public class TestApp {
    public static void main(String[] args) {
        Jt.sessionState().computeIfAbsentInt("stage", k -> 0);

        int stage = Jt.sessionState().getInt("stage");

        if (stage == 0) {
            Jt.button("Begin")
                    .onClick(b -> Jt.sessionState().put("stage", 1))
                    .use();
        }

        if (stage >= 1) {
            Jt.textInput("Name")
                    .key("name")
                    .onChange(value -> Jt.sessionState().put("stage", 2))
                    .use();
        }

        if (stage >= 2) {
            String name = Jt.componentsState().getString("name");
            Jt.text("Hello " + name + "!").use();

            String color = Jt.selectbox("Pick a Color",
                                        List.of("", "red", "orange", "green", "blue", "violet"))
                    .key("color")
                    .onChange(value -> {
                        if (!Jt.componentsState().getString("color").isEmpty()) {
                            Jt.sessionState().put("stage", 3);
                        } else {
                            Jt.sessionState().put("stage", 2);
                        }
                    })
                    .use();
        }

        if (stage >= 3) {
            String color = Jt.componentsState().getString("color");
            Jt.markdown("You chose **" + color + "**, thank you!").use();
            Jt.button("Start Over") //
                    .onClick(b -> Jt.sessionState().put("stage", 0))
                    .use();
        }
    }
}

```

### Buttons to modify `Jt.sessionState()`

If you modify `Jt.sessionState()` inside of a button, you must consider where that button is within the app.

#### A slight problem

In this example, we access `Jt.sessionState().get("name")` both before and after the buttons which modify it. 
When a button ("**Jane**" or "**John**") is clicked, the app reruns. The info displayed before the buttons lags behind 
the info written after the button. The data in `Jt.sessionState()` before the button is not updated. When the app 
executes the button function, that is when the conditional code to update `Jt.sessionState()` creates the change. Thus, 
this change is reflected after the button.

```java
import io.javelit.core.Jt;

public class TestApp {
    public static void main(String[] args) {
        Jt.sessionState().computeIfAbsent("name", k -> "John Doe");

        // First text - shows old value before button updates
        Jt.markdown(Jt.sessionState().getString("name")).key("before").use();

        if (Jt.button("Jane").use()) {
            Jt.sessionState().put("name", "Jane Doe");
        }

        if (Jt.button("John").use()) {
            Jt.sessionState().put("name", "John Doe");
        }

        // Second text - shows updated value after button updates
        Jt.markdown(Jt.sessionState().getString("name")).key("after").use();
    }
}
```

#### Logic used in a callback

Callbacks are a clean way to modify `Jt.sessionState()`. Callbacks are executed as a prefix to the app rerunning, so 
the position of the button relative to accessing data is not important.

```java
import io.javelit.core.Jt;

public class App {
    public static void main(String[] args) {
        Jt.sessionState().computeIfAbsent("name", k -> "John Doe");

        // Both texts show the same value because callbacks run before the app reruns
        Jt.markdown(Jt.sessionState().getString("name")).key("before").use();

        Jt.button("Jane")
                .onClick(b -> Jt.sessionState().put("name", "Jane Doe"))
                .use();
        Jt.button("John")
                .onClick(b -> Jt.sessionState().put("name", "John Doe"))
                .use();

        Jt.markdown(Jt.sessionState().getString("name")).key("after").use();
    }
}
```

#### Logic nested in a button with a rerun

Although callbacks are often preferred to avoid extra reruns, our first 'John Doe'/'Jane Doe' example can be modified 
by adding [`Jt.rerun`](/develop/api-reference/execution-flow/jt.rerun) instead. If you need to access data in `Jt.sessionState()` before 
the button that modifies it, you can include `Jt.rerun()` to rerun the app after the change has been committed. 
This means the app will rerun twice when a button is clicked.

```java
import io.javelit.core.Jt;

public class App {
    public static void main(String[] args) {
        Jt.sessionState().computeIfAbsent("name", k -> "John Doe");

        Jt.text(Jt.sessionState().getString("name")).key("before").use();

        if (Jt.button("Jane").use()) {
            Jt.sessionState().put("name", "Jane Doe");
            Jt.rerun();
        }

        if (Jt.button("John").use()) {
            Jt.sessionState().put("name", "John Doe");
            Jt.rerun();
        }

        Jt.text(Jt.sessionState().getString("name")).key("after").use();
    }
}
```

### Buttons to modify or reset other widgets
When a button is used to modify a widget value, `Jt.componentsState()` cannot be used because it is immutable.
You need to use `Jt.setComponentsState(key, value)`.
An extra consideration exists: you cannot modify a key-value pair if the widget with that key has already been rendered 
on the page for the current script run.

<Important>

Don't do this!

```java
import io.javelit.core.Jt;

public class TestApp {
    public static void main(String[] args) {
        String name = Jt.textInput("Name").key("name").use();

        if (Jt.button("Clear name").use()) {
            // this will throw an exception because this attempts to update 
            // a widget's state after that widget's use() within the run  
            Jt.setComponentState("name", "");
        }
    }
}
```

</Important>

#### Option 1: Use a callback
Callbacks are triggered when the user interacts with the button and always run before the rest of script.

```java
import io.javelit.core.Jt;

public class App {
    public static void main(String[] args) {
        String name = Jt.textInput("Name").key("name").use();

        Jt.button("Clear name")
                .onClick(button -> Jt.setComponentState("name", ""))
                .use();
    }
}
```

#### Option 2: Use a key for the button and put the logic before the widget

If you assign a key to a button, you can condition code on a button's state by using its value in `Jt.componentsState()`.
This means that logic depending on your button can be in your app before that button. In the following example,
we use the `getOrDefault()` method on `Jt.componentsState()` because the keys for the buttons will not exist when the app runs for the first time.

```java
import io.javelit.core.Jt;

public class App {
    public static void main(String[] args) {
        // Use getOrDefault since the button keys won't be in componentsState on the first app run
        if (Jt.componentsState().getBoolean("clear", false)) {
            Jt.setComponentState("name", "");
        }

        String name = Jt.textInput("Name").key("name").use();
        Jt.button("Clear name").key("clear").use();
    }
}
```

#### Option 3: Use containers
Javelit always executes top-to-bottom, but you can place components out-of-order with [containers](/develop/api-reference/layout/jt.container). 

```java
import io.javelit.core.Jt;
import io.javelit.core.JtContainer;

public class App {
    public static void main(String[] args) {
        JtContainer begin = Jt.container().use();

        if (Jt.button("Clear name").use()) {
            Jt.setComponentState("name", "");
        }

        // The widget is second in logic, but first in display
        String name = Jt.textInput("Name").key("name").use(begin);
    }
}
```

### Buttons to add other widgets dynamically

When dynamically adding widgets to the page, make sure to use an index to keep the keys unique and avoid 
a `DuplicateWidgetID` error. In this example, we define a function `displayInputRow` which renders a row of widgets. 
That function accepts an `index` as a parameter. The widgets rendered by `displayInputRow` use `index` within their 
keys so that `displayInputRow` can be executed multiple times on a single app rerun without repeating any widget keys.

```java
import io.javelit.core.Jt;

public class App {

    static void displayInputRow(int index) {
        var cols = Jt.columns(3).key("cols_" + index).use();
        Jt.textInput("First").key("first_" + index).use(cols.col(0));
        Jt.textInput("Middle").key("middle_" + index).use(cols.col(1));
        Jt.textInput("Last").key("last_" + index).use(cols.col(2));
    }

    public static void main(String[] args) {
        Jt.sessionState().computeIfAbsentInt("rows", k -> 0);

        Jt.button("Add person")
                .onClick(b -> Jt.sessionState().computeInt("rows", (k, v) -> v + 1))
                .use();

        int rows = Jt.sessionState().getInt("rows");
        for (int i = 0; i < rows; i++) {
            displayInputRow(i);
        }

        // Show the results
        Jt.markdown("## People").use();
        for (int i = 0; i < rows; i++) {
            String first = Jt.componentsState().getString("first_" + i);
            String middle = Jt.componentsState().getString("middle_" + i);
            String last = Jt.componentsState().getString("last_" + i);
            Jt.text("Person " + (i + 1) + ": " + first + " " + middle + " " + last).use();
        }
    }
}
```

### Buttons to handle expensive or file-writing processes

When you have an expensive function result that is optional to show, set it to run upon clicking a button.
Also save the results into a cache to avoid recomputing each time. Depending on the use case, it could be `Jt.sessionState()`, 
`Jt.cache()` or a [custom cache](/develop/concepts/architecture/caching#controlling-cache-size-and-duration).

```java
import io.javelit.core.Jt;
import io.javelit.core.JtContainer;

import java.util.Map;
import java.util.HashMap;

public class TestApp {

    public static void main(String[] args) {
        String option = Jt
                .selectbox("Select an industry", java.util.List.of("Technology", "Finance", "Food and Beverage"))
                .use();
        if (Jt.button("Show advanced analysis").use()) {
            var advancedAnalysis = Jt.sessionState().computeIfAbsent(option, key -> computeAnalysis(key));
            Jt.text("Result of the analysis: " + advancedAnalysis).use();
        }
    }

    private static String computeAnalysis(String option) {
        var empty = Jt.empty().use();
        Jt.text("Computing advanced analysis for %s ...".formatted(option)).use(empty);

        // expensive computation simulated here
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        final String res;
        if ("Technology".equals(option)) {
            res = "BUY JEAMLIT! Sell NVDA!";
        } else if ("Finance".equals(option)) {
            res = "HOLD every finance stock !";
        } else if ("Food and Beverage".equals(option)) {
            res = "SELL every Food and Beverage Stock! ";
        } else {
            res = "Unknown industry";
        }
        Jt.text("").use(empty);
        return res;
    }
}
```

## Anti-patterns

Here are some simplified examples of how buttons can go wrong. Be on the lookout for these common mistakes.

### Buttons nested inside buttons

```java
import io.javelit.core.Jt;

public class App {
    public static void main(String[] args) {
        if (Jt.button("Button 1").use()) {
            Jt.text("Button 1 was clicked").use();
            if (Jt.button("Button 2").use()) {
                // This will never be executed. - when Button2 is clicked, Button 1 is false
                Jt.text("Button 2 was clicked").use();
            }
        }
    }
}
```

### Other widgets nested inside buttons

```java
import io.javelit.core.Jt;

public class App {
    public static void main(String[] args) {
        if (Jt.button("Sign up").use()) {
            String name = Jt.textInput("Name").use();

            if (!name.isEmpty()) {
                // This will never be executed.
                Jt.success("Welcome " + name).use();
            }
        }
    }
}
```

### Nesting a process inside a button without saving to session state

```java
import io.javelit.core.Jt;
import java.io.File;

public class App {
    public static void main(String[] args) {
        File file = Jt.fileUploader("Upload a file").accept(".csv").use();

        String content = null;
        if (Jt.button("Get data").use()) {
            content = readFile(file);
            // This display will go away with the user's next action.
            Jt.text("Data loaded from: " + file.getName()).use();
            // FORGOT TO SAVE THE CONTENT IN SESSION STATE
        }

        if (Jt.button("Save").use()) {
            // content will always be null !  
            safe(content);
        }
    }
}
```
