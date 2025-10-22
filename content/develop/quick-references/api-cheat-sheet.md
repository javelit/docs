---
title: Javelit API cheat sheet
slug: /develop/quick-reference/cheat-sheet
---

# Javelit API cheat sheet

This is a summary of the docs for the latest version of Javelit.

<Masonry>

<CodeTile featured>

#### Install & Import ...

```markup
<!-- Add to pom.xml -->
<dependency>
    <groupId>io.javelit</groupId>
    <artifactId>javelit</artifactId>    
    <version>${JEAMLIT_VERSION}</version>
</dependency>

// Import convention
import io.javelit.core.Jt;
import io.javelit.core.Server;

...

void app() {
      Jt.text("Hello World").use();
}

...

Server.builder(() -> app(), 8080).build().start();
```

</CodeTile>

<CodeTile featured>
#### ... or run standalone
Recommended: use JBang
```bash
jbang app install javelit@javelit
javelit hello
javelit run MyApp.java
```
Vanilla: run the fat jar
```bash
curl -L -o javelit.jar https://repo1.maven.org/maven2/io/javelit/javelit/${JEAMLIT_VERSION}/javelit-${JEAMLIT_VERSION}-all.jar
java -jar javelit.jar hello
java -jar javelit-all.jar run MyApp.java
```


</CodeTile>


<CodeTile featured>

#### Basic App Structure

```java
import io.javelit.core.Jt;

public class MyApp {
    public static void main(String[] args) {
        Jt.title("My Javelit App").use();
        Jt.text("Hello World!").use();
    }
}
```

</CodeTile>

</Masonry>

<Masonry>

<CodeTile>

#### Display text

```java
Jt.text("Simple text").use();
Jt.title("My Title").use();
Jt.markdown("_Markdown_ with **formatting**").use();
Jt.code("public class MyApp { ... }").use();
Jt.html("<p>Custom HTML content</p>").use();

// Text with containers
var container = Jt.container().use();
Jt.text("Text inside container").use(container);
```

</CodeTile>

<CodeTile>

#### Session State

```java
// Access session state (persistent across reruns)
Jt.sessionState().putIfAbsent("counter", 0);
int counter = Jt.sessionState().getInt("counter");

// Update session state
Jt.sessionState().put("name", "John");
String name = Jt.sessionState().getString("name");

// Compute values
int newCounter = Jt.sessionState().computeInt("counter",
    (k, v) -> v + 1);
```

</CodeTile>

<CodeTile>

#### Display data

```java
// Tables from lists
List<Person> people = List.of(
    new Person("Alice", 30),
    new Person("Bob", 25)
);
Jt.table(people).use();

// Tables from arrays
Object[] rows = {"Name", "Alice", "Bob"};
Jt.table(rows).use();

// Show errors
Jt.error("Something went wrong!").use();
```

</CodeTile>

<CodeTile>

#### File Upload

```java
// Basic file uploader
List<JtUploadedFile> files = Jt.fileUploader("Upload files")
    .acceptMultipleFiles(true)
    .accept(List.of(".pdf", ".txt"))
    .use();

if (!files.isEmpty()) {
    Jt.text("Uploaded: " + files.get(0).name()).use();
}
```

</CodeTile>

<CodeTile>

#### Display charts

```java
// ECharts integration
import org.icepear.echarts.*;

// Line chart
Line lineChart = new Line()
    .addXAxis(new CategoryAxis()
        .setData(new String[]{"Mon", "Tue", "Wed", "Thu", "Fri"}))
    .addYAxis(new ValueAxis())
    .addSeries(new Line.LineSeries()
        .setData(new Number[]{120, 200, 150, 80, 70}));

Jt.echarts(lineChart).use();

// Bar chart from JSON
String chartJson = """
{
    "xAxis": {"type": "category", "data": ["A", "B", "C"]},
    "yAxis": {"type": "value"},
    "series": [{"type": "bar", "data": [10, 20, 30]}]
}
""";
Jt.echarts(chartJson).use();
```

</CodeTile>

<CodeTile>

#### Sidebar

```java
// Add elements to the sidebar
Jt.title("Sidebar Title").use(Jt.SIDEBAR);
Double value = Jt.slider("Pick value")
    .min(0).max(100).value(50)
    .use(Jt.SIDEBAR);
```

</CodeTile>

<CodeTile>

#### Columns

```java
import java.util.List;

// Two equal columns
var cols = Jt.columns(2).use();
Jt.text("Column 1").use(cols.col(0));
Jt.text("Column 2").use(cols.col(1));

// Three columns with custom widths
var cols3 = Jt.columns(3)
    .widths(List.of(0.5, 0.25, 0.25))
    .verticalAlignment(ColumnsComponent.VerticalAlignment.TOP)
    .gap(ColumnsComponent.Gap.SMALL)
    .use();
```

</CodeTile>

<CodeTile>

#### Tabs

```java
// Create tabs
var tabs = Jt.tabs(List.of("Tab 1", "Tab 2", "Tab 3")).use();

// Add content to specific tabs
Jt.text("Content for tab 1").use(tabs.tab("Tab 1"));
Jt.text("Content for tab 2").use(tabs.tab("Tab 2"));
Jt.button("Button in tab 3").use(tabs.tab("Tab 3"));
```

</CodeTile>

<CodeTile>

#### Containers & Expanders

```java
// Simple container
var container = Jt.container().use();
Jt.text("Inside container").use(container);

// Expander
var expander = Jt.expander("Show Details")
    .expanded(false)
    .icon(":material/info:")
    .use();
Jt.text("Hidden content").use(expander);

// Popover
var popover = Jt.popover("Click me").use();
Jt.text("Popover content").use(popover);
```

</CodeTile>

<CodeTile>

#### Forms & Navigation

```java
// Forms group widgets together
var form = Jt.form().use();
String username = Jt.textInput("Username").use(form);
String password = Jt.textInput("Password")
    .type("password").use(form);

if (Jt.formSubmitButton("Login").use(form)) {
    Jt.text("Logging in: " + username).use();
}

// Multi-page navigation
var nav = Jt.navigation(
    Jt.page("/home", () -> home()).title("Home").icon("🏠"),
    Jt.page("/settings", () -> settings()).title("Settings").icon("⚙️")
).use();

// Page links
Jt.pageLink("https://example.com", "External Link").use();
```

</CodeTile>

<CodeTile>

#### Interactive widgets

```java
// Basic input widgets
boolean clicked = Jt.button("Click me").use();
boolean checked = Jt.checkbox("I agree").use();
boolean toggled = Jt.toggle("Enable feature").use();

String name = Jt.textInput("Your name").use();
Double age = Jt.slider("Age").min(0).max(120).use();
Integer count = Jt.numberInput("Count", Integer.class).use();
String bio = Jt.textArea("Bio").use();
LocalDate birthday = Jt.dateInput("Birthday").use();

// Selection widgets
String choice = Jt.radio("Pick one", List.of("Option A", "Option B"))
    .use();
String selected = Jt.selectBox("Choose", List.of("Cat", "Dog"))
    .use();

// Using widget values
if (clicked) {
    Jt.text("Button was clicked!").use();
}
for (int i = 0; i < count; i++) {
    Jt.text("Item " + (i+1)).use();
}

// Disabled widgets
Jt.slider("Disabled").disabled(true).use();
```

</CodeTile>

<CodeTile>

#### Builder Pattern Examples

```java
// All Javelit components use builder pattern
var slider = Jt.slider("Temperature")
    .min(-10.0)
    .max(40.0)
    .value(20.0)
    .step(0.5)
    .format("%.1f°C")
    .help("Set the temperature")
    .disabled(false)
    .use();

var textInput = Jt.textInput("Email")
    .value("user@example.com")
    .placeholder("Enter your email")
    .maxChars(100)
    .type("default")
    .use();
```

</CodeTile>

<CodeTile>

#### Containers & Layout

```java
// Empty containers can be populated later
var placeholder = Jt.empty("status-area").use();
// Later in your code:
Jt.text("Loading complete!").use(placeholder);

// Container with borders and height
var main = Jt.container()
    .border(true)
    .height(400)
    .use();

// Nested containers
var nested = Jt.container().use(main);
Jt.text("Nested content").use(nested);
```

</CodeTile>

<CodeTile>

#### Component Keys & State

```java
// Use keys for component identity
boolean result = Jt.button("Action")
    .key("my-action-button")
    .use();

// Access component state by key
TypedMap componentState = Jt.componentState();
Boolean buttonClicked = componentState.getBoolean("my-action-button");

// Widget callbacks
Double temperature = Jt.slider("Temp")
    .onChange(oldValue -> {
        Jt.text("Changed from: " + oldValue).use();
    })
    .use();
```

</CodeTile>

<CodeTile>

#### Complete App Example

```java
import io.javelit.core.Jt;
import java.time.LocalDate;
import java.util.List;

public class WeatherApp {
    public static void main(String[] args) {
        Jt.title("🌡️ Weather Dashboard").use();

        // Sidebar controls
        String city = Jt.selectBox("City", List.of("New York", "London", "Tokyo"))
            .use(Jt.SIDEBAR);
        LocalDate date = Jt.dateInput("Date")
            .use(Jt.SIDEBAR);

        // Main content
        Jt.text("Weather for " + city + " on " + date).use();

        if (Jt.button("Get Weather").use()) {
            // Display results
            var cols = Jt.columns(2).use();
            Jt.text("Temperature: 22°C").use(cols.col(0));
            Jt.text("Humidity: 65%").use(cols.col(1));
        }
    }
}
```

</CodeTile>
</Masonry>
