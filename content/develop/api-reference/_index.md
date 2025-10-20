---
title: API Reference
slug: /develop/api-reference
---

# API reference

Javelit makes it easy for you to visualize, mutate, and share data. The API
reference is organized by activity type, like displaying data or optimizing
performance. Each section includes methods associated with the activity type,
including examples.

Browse our API below and click to learn more about any of our available commands! 🎈

## Display almost anything

{/*

### Write and magic

<br />

<TileContainer>

<RefCard href="/develop/api-reference/write-magic/st.write">

<h4>st.write</h4>

Write arguments to the app.

```java
st.write("Hello **world**!")
st.write(my_data_frame)
st.write(my_mpl_figure)
```

</RefCard>
<RefCard href="/develop/api-reference/write-magic/st.write_stream">

<h4>st.write_stream</h4>

Write generators or streams to the app with a typewriter effect.

```java
st.write_stream(my_generator)
st.write_stream(my_llm_stream)
```

</RefCard>
<RefCard href="/develop/api-reference/write-magic/magic">

<h4>Magic</h4>

Any time Javelit sees either a variable or literal value on its own line, it automatically writes that to your app using `st.write`

```java
"Hello **world**!"
my_data_frame
my_mpl_figure
```

</RefCard>
</TileContainer>

*/}

### Text elements

<br />

<TileContainer>
<RefCard href="/develop/api-reference/text/jt.markdown">

<Image pure alt="screenshot" src="/images/api/markdown.jpg" />

<h4>Markdown</h4>

Display string formatted as Markdown.

```java
Jt.markdown("Hello **world**!").use();
```

</RefCard>
<RefCard href="/develop/api-reference/text/jt.title">

<Image pure alt="screenshot" src="/images/api/title.jpg" />

<h4>Title</h4>

Display text in title formatting.

```java
Jt.title("The app title").use();
```

{/*

</RefCard>
<RefCard href="/develop/api-reference/text/st.header">

<Image pure alt="screenshot" src="/images/api/header.jpg" />

<h4>Header</h4>

Display text in header formatting.

```java
st.header("This is a header")
```

</RefCard>
<RefCard href="/develop/api-reference/text/st.subheader">

<Image pure alt="screenshot" src="/images/api/subheader.jpg" />

<h4>Subheader</h4>

Display text in subheader formatting.

```java
st.subheader("This is a subheader")
```

</RefCard>
<RefCard href="/develop/api-reference/text/st.badge">

<Image pure alt="screenshot" src="/images/api/badge.jpg" />

<h4>Badge</h4>

Display a small, colored badge.

```java
st.badge("New")
```

</RefCard>
<RefCard href="/develop/api-reference/text/st.caption">

<Image pure alt="screenshot" src="/images/api/caption.jpg" />

<h4>Caption</h4>

Display text in small font.

```java
st.caption("This is written small caption text")
```

*/}

</RefCard>
<RefCard href="/develop/api-reference/text/jt.code">

<Image pure alt="screenshot" src="/images/api/code.jpg" />

<h4>Code block</h4>

Display a code block with optional syntax highlighting.

```java
Jt.code("a = 1234").use();
```

{/*

</RefCard>
<RefCard href="/develop/api-reference/text/st.echo">

<Image pure alt="screenshot" src="/images/api/code.jpg" />

<h4>Echo</h4>

Display some code in the app, then execute it. Useful for tutorials.

```java
with st.echo():
  st.write('This code will be printed')
```

</RefCard>
<RefCard href="/develop/api-reference/text/st.latex">

<Image pure alt="screenshot" src="/images/api/latex.jpg" />

<h4>LaTeX</h4>

Display mathematical expressions formatted as LaTeX.

```java
st.latex("\int a x^2 \,dx")
```

*/}

</RefCard>
<RefCard href="/develop/api-reference/text/jt.text">

<Image pure alt="screenshot" src="/images/api/text.jpg" />

<h4>Preformatted text</h4>

Write fixed-width and preformatted text.

```java
Jt.text("Hello world").use();
```

</RefCard>
<RefCard href="/develop/api-reference/text/jt.divider">

<Image pure alt="screenshot" src="/images/api/divider.jpg" />

<h4>Divider</h4>

Display a horizontal rule.

```java
Jt.divider().use();
```

{/*

</RefCard>
<RefCard href="/develop/api-reference/text/st.help">

<h4>Get help</h4>

Display object’s doc string, nicely formatted.

```java
st.help(st.write)
st.help(pd.DataFrame)
```

*/}

</RefCard>
<RefCard href="/develop/api-reference/text/jt.html">

<h4>Render HTML</h4>

Render an HTML string in your app.

```java
Jt.html("<p>Foo bar.</p>").use();
```

</RefCard>

</TileContainer>

{/*

<ComponentSlider>
<ComponentCard href="https://github.com/tvst/st-annotated-text">

<Image pure alt="screenshot" src="/images/api/components/annotated-text.jpg" />

<h4>Annotated text</h4>

Display annotated text in Javelit apps. Created by [@tvst](https://github.com/tvst).

```java
annotated_text("This ", ("is", "verb"), " some ", ("annotated", "adj"), ("text", "noun"), " for those of ", ("you", "pronoun"), " who ", ("like", "verb"), " this sort of ", ("thing", "noun"), ".")
```

</ComponentCard>

<ComponentCard href="https://github.com/andfanilo/streamlit-drawable-canvas">

<Image pure alt="screenshot" src="/images/api/components/drawable-canvas.jpg" />

<h4>Drawable Canvas</h4>

Provides a sketching canvas using [Fabric.js](http://fabricjs.com/). Created by [@andfanilo](https://github.com/andfanilo).

```java
st_canvas(fill_color="rgba(255, 165, 0, 0.3)", stroke_width=stroke_width, stroke_color=stroke_color, background_color=bg_color, background_image=Image.open(bg_image) if bg_image else None, update_streamlit=realtime_update, height=150, drawing_mode=drawing_mode, point_display_radius=point_display_radius if drawing_mode == 'point' else 0, key="canvas",)
```

</ComponentCard>

<ComponentCard href="https://github.com/gagan3012/streamlit-tags">

<Image pure alt="screenshot" src="/images/api/components/tags.jpg" />

<h4>Tags</h4>

Add tags to your Javelit apps. Created by [@gagan3012](https://github.com/gagan3012).

```java
st_tags(label='# Enter Keywords:', text='Press enter to add more', value=['Zero', 'One', 'Two'], suggestions=['five', 'six', 'seven', 'eight', 'nine', 'three', 'eleven', 'ten', 'four'], maxtags = 4, key='1')
```

</ComponentCard>

<ComponentCard href="https://github.com/JohnSnowLabs/nlu">

<Image pure alt="screenshot" src="/images/api/components/nlu.jpg" />

<h4>NLU</h4>

Apply text mining on a dataframe. Created by [@JohnSnowLabs](https://github.com/JohnSnowLabs/).

```java
nlu.load("sentiment").predict("I love NLU! <3")
```

</ComponentCard>

<ComponentCard href="https://extras.streamlit.app/">

<Image pure alt="screenshot" src="/images/api/components/extras-mentions.jpg" />

<h4>Javelit Extras</h4>

A library with useful Javelit extras. Created by [@arnaudmiribel](https://github.com/arnaudmiribel/).

```java
mention(label="An awesome Javelit App", icon="streamlit",  url="https://extras.streamlit.app",)
```

</ComponentCard>
</ComponentSlider>

*/}

### Data elements

<br />

<TileContainer>

{/*

<RefCard href="/develop/api-reference/data/st.dataframe">
<Image pure alt="screenshot" src="/images/api/dataframe.jpg" />

<h4>Dataframes</h4>

Display a dataframe as an interactive table.

```java
st.dataframe(my_data_frame)
```

</RefCard>
<RefCard href="/develop/api-reference/data/st.data_editor">

<Image pure alt="screenshot" src="/images/api/data_editor.jpg" />

<h4>Data editor</h4>

Display a data editor widget.

```java
edited = st.data_editor(df, num_rows="dynamic")
```

</RefCard>
<RefCard href="/develop/api-reference/data/st.column_config">

<Image pure alt="screenshot" src="/images/api/column_config.jpg" />

<h4>Column configuration</h4>

Configure the display and editing behavior of dataframes and data editors.

```java
st.column_config.NumberColumn("Price (in USD)", min_value=0, format="$%d")
```

</RefCard>

*/}

<RefCard href="/develop/api-reference/data/jt.table">
<Image pure alt="screenshot" src="/images/api/table.jpg" />

<h4>Static tables</h4>

Display a static table.

```java
Jt.table(my_data).use();
```

</RefCard>

{/*

<RefCard href="/develop/api-reference/data/st.metric">
<Image pure alt="screenshot" src="/images/api/metric.jpg" />

<h4>Metrics</h4>

Display a metric in big bold font, with an optional indicator of how the metric changed.

```java
st.metric("My metric", 42, 2)
```

</RefCard>
<RefCard href="/develop/api-reference/data/st.json">
<Image pure alt="screenshot" src="/images/api/json.jpg" />

<h4>Dicts and JSON</h4>

Display object or string as a pretty-printed JSON string.

```java
st.json(my_dict)
```

</RefCard>

*/}

</TileContainer>

{/*
<ComponentSlider>

<ComponentCard href="https://github.com/PablocFonseca/streamlit-aggrid">

<Image pure alt="screenshot" src="/images/api/components/aggrid.jpg" />

<h4>Javelit Aggrid</h4>

Implementation of Ag-Grid component for Javelit. Created by [@PablocFonseca](https://github.com/PablocFonseca).

```java
df = pd.DataFrame({'col1': [1, 2, 3], 'col2': [4, 5, 6]})
grid_return = AgGrid(df, editable=True)

new_df = grid_return['data']
```

</ComponentCard>

<ComponentCard href="https://github.com/randyzwitch/streamlit-folium">

<Image pure alt="screenshot" src="/images/api/components/folium.jpg" />

<h4>Javelit Folium</h4>

Javelit Component for rendering Folium maps. Created by [@randyzwitch](https://github.com/randyzwitch).

```java
m = folium.Map(location=[39.949610, -75.150282], zoom_start=16)
folium.Marker([39.949610, -75.150282], popup="Liberty Bell", tooltip="Liberty Bell").add_to(m)

st_data = st_folium(m, width=725)
```

</ComponentCard>

<ComponentCard href="https://github.com/okld/streamlit-pandas-profiling">

<Image pure alt="screenshot" src="/images/api/components/pandas-profiling.jpg" />

<h4>Pandas Profiling</h4>

Pandas profiling component for Javelit. Created by [@okld](https://github.com/okld/).

```java
df = pd.read_csv("https://storage.googleapis.com/tf-datasets/titanic/train.csv")
pr = df.profile_report()

st_profile_report(pr)
```

</ComponentCard>

<ComponentCard href="https://github.com/blackary/streamlit-image-coordinates">

<Image pure alt="screenshot" src="/images/api/components/image-coordinates.jpg" />

<h4>Image Coordinates</h4>

Get the coordinates of clicks on an image. Created by [@blackary](https://github.com/blackary/).

```java
from streamlit_image_coordinates import streamlit_image_coordinates
value = streamlit_image_coordinates("https://placekitten.com/200/300")

st.write(value)
```

</ComponentCard>

<ComponentCard href="https://github.com/null-jones/streamlit-plotly-events">

<Image pure alt="screenshot" src="/images/api/components/plotly-events.jpg" />

<h4>Plotly Events</h4>

Make Plotly charts interactive!. Created by [@null-jones](https://github.com/null-jones/).

```java
from streamlit_plotly_events import plotly_events
fig = px.line(x=[1], y=[1])

selected_points = plotly_events(fig)
```

</ComponentCard>

<ComponentCard href="https://extras.streamlit.app/">

<Image pure alt="screenshot" src="/images/api/components/extras-metric-cards.jpg" />

<h4>Javelit Extras</h4>

A library with useful Javelit extras. Created by [@arnaudmiribel](https://github.com/arnaudmiribel/).

```java
from streamlit_extras.metric_cards import style_metric_cards
col3.metric(label="No Change", value=5000, delta=0)

style_metric_cards()
```

</ComponentCard>

</ComponentSlider>

*/}

### Chart elements

<br />

<TileContainer>

<RefCard href="/develop/api-reference/charts/jt.echarts">

<Image pure alt="screenshot" src="/images/api/components/echarts.jpg" />

<h4>ECharts</h4>

Display a chart using the Apache ECharts library.

```java
Jt.echarts(myChartConfig).use();
```

</RefCard>


{/*

<RefCard href="/develop/api-reference/charts/st.area_chart">
<Image pure alt="screenshot" src="/images/api/area_chart.jpg" />

<h4>Simple area charts</h4>

Display an area chart.

```java
st.area_chart(my_data_frame)
```

</RefCard>
<RefCard href="/develop/api-reference/charts/st.bar_chart">
<Image pure alt="screenshot" src="/images/api/bar_chart.jpg" />

<h4>Simple bar charts</h4>

Display a bar chart.

```java
st.bar_chart(my_data_frame)
```

</RefCard>
<RefCard href="/develop/api-reference/charts/st.line_chart">
<Image pure alt="screenshot" src="/images/api/line_chart.jpg" />

<h4>Simple line charts</h4>

Display a line chart.

```java
st.line_chart(my_data_frame)
```

</RefCard>
<RefCard href="/develop/api-reference/charts/st.scatter_chart">
<Image pure alt="screenshot" src="/images/api/scatter_chart.svg" />

<h4>Simple scatter charts</h4>

Display a line chart.

```java
st.scatter_chart(my_data_frame)
```

</RefCard>
<RefCard href="/develop/api-reference/charts/st.map">
<Image pure alt="screenshot" src="/images/api/map.jpg" />

<h4>Scatterplots on maps</h4>

Display a map with points on it.

```java
st.map(my_data_frame)
```

</RefCard>
<RefCard href="/develop/api-reference/charts/st.pyplot">
<Image pure alt="screenshot" src="/images/api/pyplot.jpg" />

<h4>Matplotlib</h4>

Display a matplotlib.pyplot figure.

```java
st.pyplot(my_mpl_figure)
```

</RefCard>
<RefCard href="/develop/api-reference/charts/st.altair_chart">
<Image pure alt="screenshot" src="/images/api/vega_lite_chart.jpg" />

<h4>Altair</h4>

Display a chart using the Altair library.

```java
st.altair_chart(my_altair_chart)
```

</RefCard>
<RefCard href="/develop/api-reference/charts/st.vega_lite_chart">
<Image pure alt="screenshot" src="/images/api/vega_lite_chart.jpg" />

<h4>Vega-Lite</h4>

Display a chart using the Vega-Lite library.

```java
st.vega_lite_chart(my_vega_lite_chart)
```

</RefCard>
<RefCard href="/develop/api-reference/charts/st.plotly_chart">
<Image pure alt="screenshot" src="/images/api/plotly_chart.jpg" />

<h4>Plotly</h4>

Display an interactive Plotly chart.

```java
st.plotly_chart(my_plotly_chart)
```

</RefCard>
<RefCard href="/develop/api-reference/charts/st.bokeh_chart">
<Image pure alt="screenshot" src="/images/api/bokeh_chart.jpg" />

<h4>Bokeh</h4>

Display an interactive Bokeh chart.

```java
st.bokeh_chart(my_bokeh_chart)
```

</RefCard>
<RefCard href="/develop/api-reference/charts/st.pydeck_chart">
<Image pure alt="screenshot" src="/images/api/pydeck_chart.jpg" />

<h4>PyDeck</h4>

Display a chart using the PyDeck library.

```java
st.pydeck_chart(my_pydeck_chart)
```

</RefCard>
<RefCard href="/develop/api-reference/charts/st.graphviz_chart">
<Image pure alt="screenshot" src="/images/api/graphviz_chart.jpg" />

<h4>GraphViz</h4>

Display a graph using the dagre-d3 library.

```java
st.graphviz_chart(my_graphviz_spec)
```

</RefCard>

*/}

</TileContainer>

{/*
<ComponentSlider>

<ComponentCard href="https://github.com/tvst/plost">

<Image pure alt="screenshot" src="/images/api/components/plost.jpg" />

<h4>Plost</h4>

A deceptively simple plotting library for Javelit. Created by [@tvst](https://github.com/tvst).

```java
import plost
plost.line_chart(my_dataframe, x='time', y='stock_value', color='stock_name',)
```

</ComponentCard>

<ComponentCard href="https://github.com/facebookresearch/hiplot">

<Image pure alt="screenshot" src="/images/api/components/hiplot.jpg" />

<h4>HiPlot</h4>

High dimensional Interactive Plotting. Created by [@facebookresearch](https://github.com/facebookresearch).

```java
data = [{'dropout':0.1, 'lr': 0.001, 'loss': 10.0, 'optimizer': 'SGD'}, {'dropout':0.15, 'lr': 0.01, 'loss': 3.5, 'optimizer': 'Adam'}, {'dropout':0.3, 'lr': 0.1, 'loss': 4.5, 'optimizer': 'Adam'}]
hip.Experiment.from_iterable(data).display()
```

</ComponentCard>

<ComponentCard href="https://github.com/andfanilo/streamlit-echarts">

<Image pure alt="screenshot" src="/images/api/components/echarts.jpg" />

<h4>ECharts</h4>

High dimensional Interactive Plotting. Created by [@andfanilo](https://github.com/andfanilo).

```java
from streamlit_echarts import st_echarts
st_echarts(options=options)
```

</ComponentCard>

<ComponentCard href="https://github.com/randyzwitch/streamlit-folium">

<Image pure alt="screenshot" src="/images/api/components/folium.jpg" />

<h4>Javelit Folium</h4>

Javelit Component for rendering Folium maps. Created by [@randyzwitch](https://github.com/randyzwitch).

```java
m = folium.Map(location=[39.949610, -75.150282], zoom_start=16)
st_data = st_folium(m, width=725)
```

</ComponentCard>

<ComponentCard href="https://github.com/explosion/spacy-streamlit">

<Image pure alt="screenshot" src="/images/api/components/spacy.jpg" />

<h4>Spacy-Javelit</h4>

spaCy building blocks and visualizers for Javelit apps. Created by [@explosion](https://github.com/explosion).

```java
models = ["en_core_web_sm", "en_core_web_md"]
spacy_streamlit.visualize(models, "Sundar Pichai is the CEO of Google.")
```

</ComponentCard>

<ComponentCard href="https://github.com/ChrisDelClea/streamlit-agraph">

<Image pure alt="screenshot" src="/images/api/components/agraph.jpg" />

<h4>Javelit Agraph</h4>

A Javelit Graph Vis, based on [react-grah-vis](https://github.com/crubier/react-graph-vis). Created by [@ChrisDelClea](https://github.com/ChrisDelClea).

```java
from streamlit_agraph import agraph, Node, Edge, Config
agraph(nodes=nodes, edges=edges, config=config)
```

</ComponentCard>

<ComponentCard href="https://github.com/andfanilo/streamlit-lottie">

<Image pure alt="screenshot" src="/images/api/components/lottie.jpg" />

<h4>Javelit Lottie</h4>

Integrate [Lottie](https://lottiefiles.com/) animations inside your Javelit app. Created by [@andfanilo](https://github.com/andfanilo).

```java
lottie_hello = load_lottieurl("https://assets5.lottiefiles.com/packages/lf20_V9t630.json")
st_lottie(lottie_hello, key="hello")
```

</ComponentCard>

<ComponentCard href="https://github.com/null-jones/streamlit-plotly-events">

<Image pure alt="screenshot" src="/images/api/components/plotly-events.jpg" />

<h4>Plotly Events</h4>

Make Plotly charts interactive!. Created by [@null-jones](https://github.com/null-jones/).

```java
fig = px.line(x=[1], y=[1])
selected_points = plotly_events(fig)
```

</ComponentCard>

<ComponentCard href="https://extras.streamlit.app/">

<Image pure alt="screenshot" src="/images/api/components/extras-chart-annotations.jpg" />

<h4>Javelit Extras</h4>

A library with useful Javelit extras. Created by [@arnaudmiribel](https://github.com/arnaudmiribel/).

```java
chart += get_annotations_chart(annotations=[("Mar 01, 2008", "Pretty good day for GOOG"), ("Dec 01, 2007", "Something's going wrong for GOOG & AAPL"), ("Nov 01, 2008", "Market starts again thanks to..."), ("Dec 01, 2009", "Small crash for GOOG after..."),],)
st.altair_chart(chart, use_container_width=True)
```

</ComponentCard>

</ComponentSlider>

*/}

### Input widgets

<br />

<TileContainer>
<RefCard href="/develop/api-reference/widgets/jt.button">

<Image pure alt="screenshot" src="/images/api/button.svg" />

<h4>Button</h4>

Display a button widget.

```java
boolean clicked = Jt.button("Click me").use();
```

</RefCard>

{/*
<RefCard href="/develop/api-reference/widgets/st.download_button">

<Image pure alt="screenshot" src="/images/api/download_button.svg" />

<h4>Download button</h4>

Display a download button widget.

```java
st.download_button("Download file", file)
```

</RefCard>
*/}
<RefCard href="https://docs.javelit.io/develop/api-reference/execution-flow/jt.formsubmitbutton">

<Image pure alt="screenshot" src="/images/api/form_submit_button.svg" />

<h4>Form button</h4>

Display a form submit button. For use with `Jt.form`.

```java
boolean submitted = Jt.formSubmitButton("Sign up").use();
```

</RefCard>

{/*
<RefCard href="/develop/api-reference/widgets/st.link_button">

<Image pure alt="screenshot" src="/images/api/link_button.svg" />

<h4>Link button</h4>

Display a link button.

```java
st.link_button("Go to gallery", url)
```

</RefCard>
*/}
<RefCard href="/develop/api-reference/widgets/jt.pagelink">

<Image pure alt="screenshot" src="/images/api/page_link.jpg" />

<h4>Page link</h4>

Display a link to another page in a multipage app.

```java
Jt.pageLink(HomePage.class).use();
Jt.pageLink("https://example.com", "Go to site").use();
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/jt.checkbox">

<Image pure alt="screenshot" src="/images/api/checkbox.jpg" />

<h4>Checkbox</h4>

Display a checkbox widget.

```java
boolean selected = Jt.checkbox("I agree").use();
```

</RefCard>

{/*
<RefCard href="/develop/api-reference/widgets/st.color_picker">

<Image pure alt="screenshot" src="/images/api/color_picker.jpg" />

<h4>Color picker</h4>

Display a color picker widget.

```java
color = st.color_picker("Pick a color")
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/st.feedback">

<Image pure alt="screenshot" src="/images/api/feedback.jpg" />

<h4>Feedback</h4>

Display a rating or sentiment button group.

```java
st.feedback("stars")
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/st.multiselect">

<Image pure alt="screenshot" src="/images/api/multiselect.jpg" />

<h4>Multiselect</h4>

Display a multiselect widget. The multiselect widget starts as empty.

```java
choices = st.multiselect("Buy", ["milk", "apples", "potatoes"])
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/st.pills">

<Image pure alt="screenshot" src="/images/api/pills.jpg" />

<h4>Pills</h4>

Display a pill-button selection widget.

```java
st.pills("Tags", ["Sports", "AI", "Politics"])
```

</RefCard>
*/}
<RefCard href="/develop/api-reference/widgets/jt.radio">

<Image pure alt="screenshot" src="/images/api/radio.jpg" />

<h4>Radio</h4>

Display a radio button widget.

```java
String choice = Jt.radio("Pick one", List.of("cats", "dogs")).use();
```

</RefCard>

{/*
<RefCard href="/develop/api-reference/widgets/st.segmented_control">

<Image pure alt="screenshot" src="/images/api/segmented_control.jpg" />

<h4>Segmented control</h4>

Display a segmented-button selection widget.

```java
st.segmented_control("Filter", ["Open", "Closed", "All"])
```

</RefCard>
*/}

<RefCard href="/develop/api-reference/widgets/jt.selectbox">

<Image pure alt="screenshot" src="/images/api/selectbox.jpg" />

<h4>Selectbox</h4>

Display a select widget.

```java
choice = st.selectbox("Pick one", ["cats", "dogs"])
```

</RefCard>

{/*

<RefCard href="/develop/api-reference/widgets/st.select_slider">

<Image pure alt="screenshot" src="/images/api/select_slider.jpg" />

<h4>Select-slider</h4>

Display a slider widget to select items from a list.

```java
size = st.select_slider("Pick a size", ["S", "M", "L"])
```

</RefCard>
*/}
<RefCard href="/develop/api-reference/widgets/jt.toggle">

<Image pure alt="screenshot" src="/images/api/toggle.jpg" />

<h4>Toggle</h4>

Display a toggle widget.

```java
boolean activated = Jt.toggle("Activate").use();
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/jt.numberinput">

<Image pure alt="screenshot" src="/images/api/number_input.jpg" />

<h4>Number input</h4>

Display a numeric input widget.

```java
Number choice = Jt.numberInput("Pick a number").use();
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/jt.slider">

<Image pure alt="screenshot" src="/images/api/slider.jpg" />

<h4>Slider</h4>

Display a slider widget.

```java
int number = Jt.slider("Pick a number").use();
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/jt.dateinput">

<Image pure alt="screenshot" src="/images/api/date_input.jpg" />

<h4>Date input</h4>

Display a date input widget.

```java
LocalDate date = Jt.dateInput("Your birthday").use();
```

</RefCard>

{/*
<RefCard href="/develop/api-reference/widgets/st.time_input">

<Image pure alt="screenshot" src="/images/api/time_input.jpg" />

<h4>Time input</h4>

Display a time input widget.

```java
time = st.time_input("Meeting time")
```

</RefCard>
<RefCard href="/develop/api-reference/chat/st.chat_input">

<Image pure alt="screenshot" src="/images/api/chat_input.jpg" />

<h4>Chat input</h4>

Display a chat input widget.

```java
prompt = st.chat_input("Say something")
if prompt:
    st.write(f"The user has sent: {prompt}")
```

</RefCard>
*/}
<RefCard href="/develop/api-reference/widgets/jt.textarea">

<Image pure alt="screenshot" src="/images/api/text_area.jpg" />

<h4>Text-area</h4>

Display a multi-line text input widget.

```java
String text = Jt.textArea("Text to translate").use();
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/jt.textinput">

<Image pure alt="screenshot" src="/images/api/text_input.jpg" />

<h4>Text input</h4>

Display a single-line text input widget.

```java
String name = Jt.textInput("First name").use();
```

</RefCard>

{/*
<RefCard href="/develop/api-reference/widgets/st.audio_input">

<Image pure alt="screenshot" src="/images/api/audio_input.jpg" />

<h4>Audio input</h4>

Display a widget that allows users to record with their microphone.

```java
speech = st.audio_input("Record a voice message")
```

</RefCard>
<RefCard href="/develop/api-reference/data/st.data_editor">

<Image pure alt="screenshot" src="/images/api/data_editor.jpg" />

<h4>Data editor</h4>

Display a data editor widget.

```java
edited = st.data_editor(df, num_rows="dynamic")
```

</RefCard>
*/}
<RefCard href="/develop/api-reference/widgets/jt.fileuploader">

<Image pure alt="screenshot" src="/images/api/file_uploader.jpg" />

<h4>File uploader</h4>

Display a file uploader widget.

```java
UploadedFile data = Jt.fileUploader("Upload a CSV").use();
```

</RefCard>

{/*
<RefCard href="/develop/api-reference/widgets/st.camera_input">

<Image pure alt="screenshot" src="/images/api/camera_input.jpg" />

<h4>Camera input</h4>

Display a widget that allows users to upload images directly from a camera.

```java
image = st.camera_input("Take a picture")
```

</RefCard>
*/}
</TileContainer>

{/*

<ComponentSlider>

<ComponentCard href="https://github.com/okld/streamlit-elements">

<Image pure alt="screenshot" src="/images/api/components/elements.jpg" />

<h4>Javelit Elements</h4>

Create a draggable and resizable dashboard in Javelit. Created by [@okls](https://github.com/okls).

```java
from streamlit_elements import elements, mui, html

with elements("new_element"):
  mui.Typography("Hello world")
```

</ComponentCard>

<ComponentCard href="https://github.com/gagan3012/streamlit-tags">

<Image pure alt="screenshot" src="/images/api/components/tags.jpg" />

<h4>Tags</h4>

Add tags to your Javelit apps. Created by [@gagan3012](https://github.com/gagan3012).

```java
from streamlit_tags import st_tags

st_tags(label='# Enter Keywords:', text='Press enter to add more', value=['Zero', 'One', 'Two'],
suggestions=['five', 'six', 'seven', 'eight', 'nine', 'three', 'eleven', 'ten', 'four'], maxtags = 4, key='1')
```

</ComponentCard>

<ComponentCard href="https://github.com/Wirg/stqdm">

<Image pure alt="screenshot" src="/images/api/components/stqdm.jpg" />

<h4>Stqdm</h4>

The simplest way to handle a progress bar in streamlit app. Created by [@Wirg](https://github.com/Wirg).

```java
from stqdm import stqdm

for _ in stqdm(range(50)):
    sleep(0.5)
```

</ComponentCard>

<ComponentCard href="https://github.com/innerdoc/streamlit-timeline">

<Image pure alt="screenshot" src="/images/api/components/timeline.jpg" />

<h4>Timeline</h4>

Display a Timeline in Javelit apps using [TimelineJS](https://timeline.knightlab.com/). Created by [@innerdoc](https://github.com/innerdoc).

```java
from streamlit_timeline import timeline

with open('example.json', "r") as f:
  timeline(f.read(), height=800)
```

</ComponentCard>

<ComponentCard href="https://github.com/blackary/streamlit-camera-input-live">

<Image pure alt="screenshot" src="/images/api/components/camera-live.jpg" />

<h4>Camera input live</h4>

Alternative for st.camera_input which returns the webcam images live. Created by [@blackary](https://github.com/blackary).

```java
from camera_input_live import camera_input_live

image = camera_input_live()
st.image(value)
```

</ComponentCard>

<ComponentCard href="https://github.com/okld/streamlit-ace">

<Image pure alt="screenshot" src="/images/api/components/ace.jpg" />

<h4>Javelit Ace</h4>

Ace editor component for Javelit. Created by [@okld](https://github.com/okld).

```java
from streamlit_ace import st_ace

content = st_ace()
content
```

</ComponentCard>

<ComponentCard href="https://github.com/AI-Yash/st-chat">

<Image pure alt="screenshot" src="/images/api/components/chat.jpg" />

<h4>Javelit Chat</h4>

Javelit Component for a Chatbot UI. Created by [@AI-Yash](https://github.com/AI-Yash).

```java
from streamlit_chat import message

message("My message")
message("Hello bot!", is_user=True)  # align's the message to the right
```

</ComponentCard>

<ComponentCard href="https://github.com/victoryhb/streamlit-option-menu">

<Image pure alt="screenshot" src="/images/api/components/option-menu.jpg" />

<h4>Javelit Option Menu</h4>

Select a single item from a list of options in a menu. Created by [@victoryhb](https://github.com/victoryhb).

```java
from streamlit_option_menu import option_menu

option_menu("Main Menu", ["Home", 'Settings'],
  icons=['house', 'gear'], menu_icon="cast", default_index=1)
```

</ComponentCard>

<ComponentCard href="https://extras.streamlit.app/">

<Image pure alt="screenshot" src="/images/api/components/extras-toggle.jpg" />

<h4>Javelit Extras</h4>

A library with useful Javelit extras. Created by [@arnaudmiribel](https://github.com/arnaudmiribel/).

```java
from streamlit_extras.stoggle import stoggle

stoggle(
    "Click me!", """🥷 Surprise! Here's some additional content""",)
```

</ComponentCard>

</ComponentSlider>

*/}

{/*
### Media elements

<br />

<TileContainer>
<RefCard href="/develop/api-reference/media/st.image">

<Image pure alt="screenshot" src="/images/api/image.jpg" />

<h4>Image</h4>

Display an image or list of images.

```java
st.image(numpy_array)
st.image(image_bytes)
st.image(file)
st.image("https://example.com/myimage.jpg")
```

</RefCard>
<RefCard href="/develop/api-reference/media/st.logo">

<Image pure alt="screenshot" src="/images/api/logo.jpg" />

<h4>Logo</h4>

Display a logo in the upper-left corner of your app and its sidebar.

```java
st.logo("logo.jpg")
```

</RefCard>
<RefCard href="/develop/api-reference/media/st.pdf">

<Image pure alt="screenshot" src="/images/api/pdf.jpg" />

<h4>PDF</h4>

Display a PDF file.

```java
st.pdf("my_document.pdf")
```

</RefCard>
<RefCard href="/develop/api-reference/media/st.audio">

<Image pure alt="screenshot" src="/images/api/audio.jpg" />

<h4>Audio</h4>

Display an audio player.

```java
st.audio(numpy_array)
st.audio(audio_bytes)
st.audio(file)
st.audio("https://example.com/myaudio.mp3", format="audio/mp3")
```

</RefCard>
<RefCard href="/develop/api-reference/media/st.video">

<Image pure alt="screenshot" src="/images/api/video.jpg" />

<h4>Video</h4>

Display a video player.

```java
st.video(numpy_array)
st.video(video_bytes)
st.video(file)
st.video("https://example.com/myvideo.mp4", format="video/mp4")
```

</RefCard>
</TileContainer>

{/*

<ComponentSlider>

<ComponentCard href="https://github.com/whitphx/streamlit-webrtc">

<Image pure alt="screenshot" src="/images/api/components/webrtc.jpg" />

<h4>Javelit Webrtc</h4>

Handling and transmitting real-time video/audio streams with Javelit. Created by [@whitphx](https://github.com/whitphx).

```java
from streamlit_webrtc import webrtc_streamer

webrtc_streamer(key="sample")
```

</ComponentCard>

<ComponentCard href="https://github.com/andfanilo/streamlit-drawable-canvas">

<Image pure alt="screenshot" src="/images/api/components/drawable-canvas.jpg" />

<h4>Drawable Canvas</h4>

Provides a sketching canvas using [Fabric.js](http://fabricjs.com/). Created by [@andfanilo](https://github.com/andfanilo).

```java
from streamlit_drawable_canvas import st_canvas

st_canvas(fill_color="rgba(255, 165, 0, 0.3)", stroke_width=stroke_width, stroke_color=stroke_color, background_color=bg_color, background_image=Image.open(bg_image) if bg_image else None, update_streamlit=realtime_update, height=150, drawing_mode=drawing_mode, point_display_radius=point_display_radius if drawing_mode == 'point' else 0, key="canvas",)
```

</ComponentCard>

<ComponentCard href="https://github.com/fcakyon/streamlit-image-comparison">

<Image pure alt="screenshot" src="/images/api/components/image-comparison.jpg" />

<h4>Image Comparison</h4>

Compare images with a slider using [JuxtaposeJS](https://juxtapose.knightlab.com/). Created by [@fcakyon](https://github.com/fcakyon).

```java
from streamlit_image_comparison import image_comparison

image_comparison(img1="image1.jpg", img2="image2.jpg",)
```

</ComponentCard>

<ComponentCard href="https://github.com/turner-anderson/streamlit-cropper">

<Image pure alt="screenshot" src="/images/api/components/cropper.jpg" />

<h4>Javelit Cropper</h4>

A simple image cropper for Javelit. Created by [@turner-anderson](https://github.com/turner-anderson).

```java
from streamlit_cropper import st_cropper

st_cropper(img, realtime_update=realtime_update, box_color=box_color, aspect_ratio=aspect_ratio)
```

</ComponentCard>

<ComponentCard href="https://github.com/blackary/streamlit-image-coordinates">

<Image pure alt="screenshot" src="/images/api/components/image-coordinates.jpg" />

<h4>Image Coordinates</h4>

Get the coordinates of clicks on an image. Created by [@blackary](https://github.com/blackary/).

```java
from streamlit_image_coordinates import streamlit_image_coordinates

streamlit_image_coordinates("https://placekitten.com/200/300")
```

</ComponentCard>

<ComponentCard href="https://github.com/andfanilo/streamlit-lottie">

<Image pure alt="screenshot" src="/images/api/components/lottie.jpg" />

<h4>Javelit Lottie</h4>

Integrate [Lottie](https://lottiefiles.com/) animations inside your Javelit app. Created by [@andfanilo](https://github.com/andfanilo).

```java
lottie_hello = load_lottieurl("https://assets5.lottiefiles.com/packages/lf20_V9t630.json")

st_lottie(lottie_hello, key="hello")
```

</ComponentCard>

</ComponentSlider>
*/}

### Layouts and containers

<br />

<TileContainer>
<RefCard href="/develop/api-reference/layout/jt.columns">

<Image pure alt="screenshot" src="/images/api/columns.jpg" />

<h4>Columns</h4>

Insert containers laid out as side-by-side columns.

```java
var cols = Jt.columns(2).use();
Jt.text("This is column 1").use(cols.col(0));
Jt.text("This is column 2").use(cols.col(1));
```

</RefCard>
<RefCard href="/develop/api-reference/layout/jt.container">

<Image pure alt="screenshot" src="/images/api/container.jpg" />

<h4>Container</h4>

Insert a multi-element container.

```java
var c = Jt.container().use();
Jt.text("This will show last").use();
Jt.text("This will show first").use(c);
Jt.text("This will show second").use(c);
```

</RefCard>

{/*
<RefCard href="/develop/api-reference/execution-flow/st.dialog">

<Image pure alt="screenshot" src="/images/api/dialog.jpg" />

<h4>Modal dialog</h4>

Insert a modal dialog that can rerun independently from the rest of the script.

```java
@st.dialog("Sign up")
def email_form():
    name = st.text_input("Name")
    email = st.text_input("Email")
```

</RefCard>
*/}
<RefCard href="/develop/api-reference/layout/jt.empty">

<Image pure alt="screenshot" src="/images/api/empty.jpg" />

<h4>Empty</h4>

Insert a single-element container.

```java
var e = Jt.empty("my-empty").use();
Jt.text("This will show last").use();
Jt.text("This will be replaced").use(e);
Jt.text("This will show first").use(e);
```

</RefCard>
<RefCard href="/develop/api-reference/layout/jt.expander">

<Image pure alt="screenshot" src="/images/api/expander.jpg" />

<h4>Expander</h4>

Insert a multi-element container that can be expanded/collapsed.

```java
var exp = Jt.expander("Open to see more").use();
Jt.text("This is more content").use(exp);
```

</RefCard>
<RefCard href="/develop/api-reference/layout/jt.popover">

<Image pure alt="screenshot" src="/images/api/popover.svg" />

<h4>Popover</h4>

Insert a multi-element popover container that can be opened/closed.

```java
var pop = Jt.popover("Settings").use();
Jt.checkbox("Show completed").use(pop);
```

</RefCard>

{/*
<RefCard href="/develop/api-reference/layout/st.sidebar">

<Image pure alt="screenshot" src="/images/api/sidebar.jpg" />

<h4>Sidebar</h4>

Display items in a sidebar.

```java
st.sidebar.write("This lives in the sidebar")
st.sidebar.button("Click me!")
```

</RefCard>
*/}
<RefCard href="/develop/api-reference/layout/jt.tabs">

<Image pure alt="screenshot" src="/images/api/tabs.jpg" />

<h4>Tabs</h4>

Insert containers separated into tabs.

```java
var tabs = Jt.tabs(List.of("Tab 1", "Tab 2")).use();
Jt.text("This is tab 1").use(tabs.tab(0));
Jt.text("This is tab 2").use(tabs.tab(1));
```

</RefCard>
</TileContainer>


{/*
<ComponentSlider>

<ComponentCard href="https://github.com/okld/streamlit-elements">

<Image pure alt="screenshot" src="/images/api/components/elements.jpg" />

<h4>Javelit Elements</h4>

Create a draggable and resizable dashboard in Javelit. Created by [@okls](https://github.com/okls).

```java
from streamlit_elements import elements, mui, html

with elements("new_element"):
  mui.Typography("Hello world")
```

</ComponentCard>

<ComponentCard href="https://github.com/lukasmasuch/streamlit-pydantic">

<Image pure alt="screenshot" src="/images/api/components/pydantic.jpg" />

<h4>Pydantic</h4>

Auto-generate Javelit UI from Pydantic Models and Dataclasses. Created by [@lukasmasuch](https://github.com/lukasmasuch).

```java
import streamlit_pydantic as sp

sp.pydantic_form(key="my_form",
  model=ExampleModel)
```

</ComponentCard>

<ComponentCard href="https://github.com/blackary/st_pages">

<Image pure alt="screenshot" src="/images/api/components/pages.jpg" />

<h4>Javelit Pages</h4>

An experimental version of Javelit Multi-Page Apps. Created by [@blackary](https://github.com/blackary).

```java
from st_pages import Page, show_pages, add_page_title

show_pages([ Page("streamlit_app.py", "Home", "🏠"),
  Page("other_pages/page2.py", "Page 2", ":books:"), ])
```

</ComponentCard>

</ComponentSlider>

*/}

{/*
### Chat elements

<br />

Javelit provides a few commands to help you build conversational apps. These chat elements are designed to be used in conjunction with each other, but you can also use them separately.

`st.chat_message` lets you insert a chat message container into the app so you can display messages from the user or the app. Chat containers can contain other Javelit elements, including charts, tables, text, and more. `st.chat_input` lets you display a chat input widget so the user can type in a message.

<TileContainer>
<RefCard href="/develop/api-reference/chat/st.chat_input">

<Image pure alt="screenshot" src="/images/api/chat_input.jpg" />

<h4>Chat input</h4>

Display a chat input widget.

```java
prompt = st.chat_input("Say something")
if prompt:
    st.write(f"The user has sent: {prompt}")
```

</RefCard>
<RefCard href="/develop/api-reference/chat/st.chat_message">

<Image pure alt="screenshot" src="/images/api/chat_message.jpg" />

<h4>Chat message</h4>

Insert a chat message container.

```java
import numpy as np
with st.chat_message("user"):
    st.write("Hello 👋")
    st.line_chart(np.random.randn(30, 3))
```

</RefCard>
<RefCard href="/develop/api-reference/status/st.status">

<Image pure alt="screenshot" src="/images/api/status.jpg" />

<h4>Status container</h4>

Display output of long-running tasks in a container.

```java
with st.status('Running'):
  do_something_slow()
```

</RefCard>
<RefCard href="/develop/api-reference/write-magic/st.write_stream">

<h4>st.write_stream</h4>

Write generators or streams to the app with a typewriter effect.

```java
st.write_stream(my_generator)
st.write_stream(my_llm_stream)
```

</RefCard>
</TileContainer>
*/}

### Status elements

<br />

<TileContainer>

{/*
<RefCard href="/develop/api-reference/status/st.progress">

<Image pure alt="screenshot" src="/images/api/progress.jpg" />

<h4>Progress bar</h4>

Display a progress bar.

```java
for i in range(101):
  st.progress(i)
  do_something_slow()
```

</RefCard>
<RefCard href="/develop/api-reference/status/st.spinner">

<Image pure alt="screenshot" src="/images/api/spinner.jpg" />

<h4>Spinner</h4>

Temporarily displays a message while executing a block of code.

```java
with st.spinner("Please wait..."):
  do_something_slow()
```

</RefCard>
<RefCard href="/develop/api-reference/status/st.status">

<Image pure alt="screenshot" src="/images/api/status.jpg" />

<h4>Status container</h4>

Display output of long-running tasks in a container.

```java
with st.status('Running'):
  do_something_slow()
```

</RefCard>
<RefCard href="/develop/api-reference/status/st.toast">

<Image pure alt="screenshot" src="/images/api/toast.jpg" />

<h4>Toast</h4>

Briefly displays a toast message in the bottom-right corner.

```java
st.toast('Butter!', icon='🧈')
```

</RefCard>
<RefCard href="/develop/api-reference/status/st.balloons">

<Image pure alt="screenshot" src="/images/api/balloons.jpg" />

<h4>Balloons</h4>

Display celebratory balloons!

```java
do_something()

# Celebrate when all done!
st.balloons()
```

</RefCard>
<RefCard href="/develop/api-reference/status/st.snow">

<Image pure alt="screenshot" src="/images/api/snow.jpg" />

<h4>Snowflakes</h4>

Display celebratory snowflakes!

```java
do_something()

# Celebrate when all done!
st.snow()
```

</RefCard>
<RefCard href="/develop/api-reference/status/st.success">

<Image pure alt="screenshot" src="/images/api/success.jpg" />

<h4>Success box</h4>

Display a success message.

```java
st.success("Match found!")
```

</RefCard>
<RefCard href="/develop/api-reference/status/st.info">

<Image pure alt="screenshot" src="/images/api/info.jpg" />

<h4>Info box</h4>

Display an informational message.

```java
st.info("Dataset is updated every day at midnight.")
```

</RefCard>
<RefCard href="/develop/api-reference/status/st.warning">

<Image pure alt="screenshot" src="/images/api/warning.jpg" />

<h4>Warning box</h4>

Display warning message.

```java
st.warning("Unable to fetch image. Skipping...")
```

</RefCard>
*/}
<RefCard href="/develop/api-reference/status/jt.error">

<Image pure alt="screenshot" src="/images/api/error.jpg" />

<h4>Error box</h4>

Display error message.

```java
Jt.error("We encountered an error").use();
```

</RefCard>

{/*
<RefCard href="/develop/api-reference/status/st.exception">

<Image pure alt="screenshot" src="/images/api/exception.jpg" />

<h4>Exception output</h4>

Display an exception.

```java
e = RuntimeError("This is an exception of type RuntimeError")
st.exception(e)
```

</RefCard>
*/}

</TileContainer>

{/*

<ComponentSlider>

<ComponentCard href="https://github.com/Wirg/stqdm">

<Image pure alt="screenshot" src="/images/api/components/stqdm.jpg" />

<h4>Stqdm</h4>

The simplest way to handle a progress bar in streamlit app. Created by [@Wirg](https://github.com/Wirg).

```java
from stqdm import stqdm

for _ in stqdm(range(50)):
    sleep(0.5)
```

</ComponentCard>

<ComponentCard href="https://github.com/Socvest/streamlit-custom-notification-box">

<Image pure alt="screenshot" src="/images/api/components/custom-notification-box.jpg" />

<h4>Custom notification box</h4>

A custom notification box with the ability to close it out. Created by [@Socvest](https://github.com/Socvest).

```java
from streamlit_custom_notification_box import custom_notification_box

styles = {'material-icons':{'color': 'red'}, 'text-icon-link-close-container': {'box-shadow': '#3896de 0px 4px'}, 'notification-text': {'':''}, 'close-button':{'':''}, 'link':{'':''}}
custom_notification_box(icon='info', textDisplay='We are almost done with your registration...', externalLink='more info', url='#', styles=styles, key="foo")
```

</ComponentCard>

<ComponentCard href="https://extras.streamlit.app/">

<Image pure alt="screenshot" src="/images/api/components/extras-emojis.jpg" />

<h4>Javelit Extras</h4>

A library with useful Javelit extras. Created by [@arnaudmiribel](https://github.com/arnaudmiribel/).

```java
from streamlit_extras.let_it_rain import rain

rain(emoji="🎈", font_size=54,
  falling_speed=5, animation_length="infinite",)
```

</ComponentCard>

</ComponentSlider>

*/}

## App logic and configuration

{/*

### Authentication and user info

<br />

<TileContainer>
<RefCard href="/develop/api-reference/user/st.login">

<h4>Log in a user</h4>

`st.login()` starts an authentication flow with an identity provider.

```java
st.login()
```

</RefCard>
<RefCard href="/develop/api-reference/user/st.logout">

<h4>Log out a user</h4>

`st.logout()` removes a user's identity information.

```java
st.logout()
```

</RefCard>
<RefCard href="/develop/api-reference/user/st.user">

<h4>User info</h4>

`st.user` returns information about a logged-in user.

```java
if st.user.is_logged_in:
  st.write(f"Welcome back, {st.user.name}!")
```

</RefCard>
</TileContainer>

*/}

### Navigation and pages

<br />

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

### Execution flow

<br />

<TileContainer>

{/*

<RefCard href="/develop/api-reference/execution-flow/st.dialog" size="full">

<Image pure alt="screenshot" src="/images/api/dialog.jpg" />

<h4>Modal dialog</h4>

Insert a modal dialog that can rerun independently from the rest of the script.

```java
@st.dialog("Sign up")
def email_form():
    name = st.text_input("Name")
    email = st.text_input("Email")
```

</RefCard>

*/}

<RefCard href="/develop/api-reference/execution-flow/jt.form" size="half">

<h4>Forms</h4>

Create a form that batches elements together with a "Submit" button.

```java
var form = Jt.form().use();
String name = Jt.textInput("Name").use(form);
String email = Jt.textInput("Email").use(form);
boolean submitted = Jt.formSubmitButton("Sign up").use(form);
```

</RefCard>

{/*

<RefCard href="/develop/api-reference/execution-flow/st.fragment" size="half">

<h4>Fragments</h4>

Define a fragment to rerun independently from the rest of the script.

```java
@st.fragment(run_every="10s")
def fragment():
    df = get_data()
    st.line_chart(df)
```

</RefCard>

*/}

<RefCard href="/develop/api-reference/execution-flow/jt.rerun">

<h4>Rerun script</h4>

Rerun the script immediately.

```java
Jt.rerun()
```

</RefCard>

{/*

<RefCard href="/develop/api-reference/execution-flow/st.stop">

<h4>Stop execution</h4>

Stops execution immediately.

```java
st.stop()
```

</RefCard>

*/}

</TileContainer>

{/*

<ComponentSlider>

<ComponentCard href="https://github.com/kmcgrady/streamlit-autorefresh">

<Image pure alt="screenshot" src="/images/api/components/autorefresh.jpg" />

<h4>Autorefresh</h4>

Force a refresh without tying up a script. Created by [@kmcgrady](https://github.com/kmcgrady).

```java
from streamlit_autorefresh import st_autorefresh

st_autorefresh(interval=2000, limit=100,
  key="fizzbuzzcounter")
```

</ComponentCard>

<ComponentCard href="https://github.com/lukasmasuch/streamlit-pydantic">

<Image pure alt="screenshot" src="/images/api/components/pydantic.jpg" />

<h4>Pydantic</h4>

Auto-generate Javelit UI from Pydantic Models and Dataclasses. Created by [@lukasmasuch](https://github.com/lukasmasuch).

```java
import streamlit_pydantic as sp

sp.pydantic_form(key="my_form",
  model=ExampleModel)
```

</ComponentCard>

<ComponentCard href="https://github.com/blackary/st_pages">

<Image pure alt="screenshot" src="/images/api/components/pages.jpg" />

<h4>Javelit Pages</h4>

An experimental version of Javelit Multi-Page Apps. Created by [@blackary](https://github.com/blackary).

```java
from st_pages import Page, show_pages, add_page_title

show_pages([ Page("streamlit_app.py", "Home", "🏠"),
  Page("other_pages/page2.py", "Page 2", ":books:"), ])
```

</ComponentCard>

</ComponentSlider>

*/}

{/*

### Caching and state

<br />

<TileContainer>
<RefCard href="/develop/api-reference/caching-and-state/st.cache_data" size="half">

<h4>Cache data</h4>

Function decorator to cache functions that return data (e.g. dataframe transforms, database queries, ML inference).

```java
@st.cache_data
def long_function(param1, param2):
  # Perform expensive computation here or
  # fetch data from the web here
  return data
```

</RefCard>

<RefCard href="/develop/api-reference/caching-and-state/st.cache_resource" size="half">

<h4>Cache resource</h4>

Function decorator to cache functions that return global resources (e.g. database connections, ML models).

```java
@st.cache_resource
def init_model():
  # Return a global resource here
  return pipeline(
    "sentiment-analysis",
    model="distilbert-base-uncased-finetuned-sst-2-english"
  )
```

</RefCard>

<RefCard href="/develop/api-reference/caching-and-state/st.session_state">

<h4>Session state</h4>

Session state is a way to share variables between reruns, for each user session.

```java
st.session_state['key'] = value
```

</RefCard>

<RefCard href="/develop/api-reference/caching-and-state/st.query_params">

<h4>Query parameters</h4>

Get, set, or clear the query parameters that are shown in the browser's URL bar.

```java
st.query_params[key] = value
st.query_params.clear()
```

</RefCard>
<RefCard href="/develop/api-reference/caching-and-state/st.context">

<h4>Context</h4>

`st.context` provides a read-only interface to access cookies, headers, locale, and other browser-session information.

```java
st.context.cookies
st.context.headers
```

</RefCard>

</TileContainer>

*/}

{/*

### Connections and databases

#### Setup your connection

<TileContainer>
<RefCard href="/develop/api-reference/connections/st.connection" size="half">

<Image pure alt="screenshot" src="/images/api/connection.svg" />

<h4>Create a connection</h4>

Connect to a data source or API

```java
conn = st.connection('pets_db', type='sql')
pet_owners = conn.query('select * from pet_owners')
st.dataframe(pet_owners)
```

</RefCard>
</TileContainer>

#### Built-in connections

<TileContainer>

<RefCard href="/develop/api-reference/connections/st.connections.snowflakeconnection" size="half">

<Image pure alt="screenshot" src="/images/api/connections.SnowflakeConnection.svg" />

<h4>SnowflakeConnection</h4>

A connection to Snowflake.

```java
conn = st.connection('snowflake')
```

</RefCard>

<RefCard href="/develop/api-reference/connections/st.connections.sqlconnection" size="half">

<Image pure alt="screenshot" src="/images/api/connections.SQLConnection.svg" />

<h4>SQLConnection</h4>

A connection to a SQL database using SQLAlchemy.

```java
conn = st.connection('sql')
```

</RefCard>
</TileContainer>

#### Build your own connections

<TileContainer>
<RefCard href="/develop/api-reference/connections/st.connections.baseconnection" size="half">

<h4>Connection base class</h4>

Build your own connection with `BaseConnection`.

```java
class MyConnection(BaseConnection[myconn.MyConnection]):
    def _connect(self, **kwargs) -> MyConnection:
        return myconn.connect(**self._secrets, **kwargs)
    def query(self, query):
        return self._instance.query(query)
```

</RefCard>

</TileContainer>

#### Secrets management

<TileContainer>

<RefCard href="/develop/api-reference/connections/st.secrets" size="half">

<h4>Secrets singleton</h4>

Access secrets from a local TOML file.

```java
key = st.secrets["OpenAI_key"]
```

</RefCard>
<RefCard href="/develop/api-reference/connections/secrets.toml" size="half">

<h4>Secrets file</h4>

Save your secrets in a per-project or per-profile TOML file.

```java
OpenAI_key = "<YOUR_SECRET_KEY>"
```

</RefCard>

</TileContainer>

*/}

{/*

<ComponentSlider>

<ComponentCard href="https://github.com/mkhorasani/Javelit-Authenticator">

<Image pure alt="screenshot" src="/images/api/components/authenticator.jpg" />

<h4>Authenticator</h4>

A secure authentication module to validate user credentials. Created by [@mkhorasani](https://github.com/mkhorasani).

```java
import streamlit_authenticator as stauth

authenticator = stauth.Authenticate( config['credentials'], config['cookie']['name'],
config['cookie']['key'], config['cookie']['expiry_days'], config['preauthorized'])
```

</ComponentCard>

<ComponentCard href="https://github.com/gagangoku/streamlit-ws-localstorage">

<Image pure alt="screenshot" src="/images/api/components/localstorage.jpg" />

<h4>WS localStorage</h4>

A simple synchronous way of accessing localStorage from your app. Created by [@gagangoku](https://github.com/gagangoku).

```java
from streamlit_ws_localstorage import injectWebsocketCode

ret = conn.setLocalStorageVal(key='k1', val='v1')
st.write('ret: ' + ret)
```

</ComponentCard>

<ComponentCard href="https://github.com/conradbez/streamlit-auth0">

<Image pure alt="screenshot" src="/images/api/components/auth0.jpg" />

<h4>Javelit Auth0</h4>

The fastest way to provide comprehensive login inside Javelit. Created by [@conradbez](https://github.com/conradbez).

```java
from auth0_component import login_button

user_info = login_button(clientId, domain = domain)
st.write(user_info)
```

</ComponentCard>

</ComponentSlider>

*/}

### Custom Components

<br />

<TileContainer>

{/*

<RefCard href="/develop/api-reference/custom-components/st.components.v1.declare_component">

<h4>Declare a component</h4>

Create and register a custom component.

```java
from st.components.v1 import declare_component
declare_component(
    "custom_slider",
    "/frontend",
)
```

</RefCard>

*/}

<RefCard href="/develop/api-reference/text/jt.html">

<h4>HTML</h4>

Render an HTML string in your app.

```java
Jt.html("<p>Foo bar.</p>").use();
```

</RefCard>

{/*

<RefCard href="/develop/api-reference/custom-components/st.components.v1.iframe">

<h4>iframe</h4>

Load a remote URL in an iframe.

```java
from st.components.v1 import iframe
iframe(
    "docs.javelit.io"
)
```

</RefCard>

*/}

</TileContainer>

{/*

### Configuration

<br />

<TileContainer>
<RefCard href="/develop/api-reference/configuration/config.toml">

<h4>Configuration file</h4>

Configures the default settings for your app.

```
your-project/
├── .streamlit/
│   └── config.toml
└── your_app.py
```

</RefCard>
<RefCard href="/develop/api-reference/configuration/st.get_option">

<h4>Get config option</h4>

Retrieve a single configuration option.

```java
st.get_option("theme.primaryColor")
```

</RefCard>
<RefCard href="/develop/api-reference/configuration/st.set_option">

<h4>Set config option</h4>

Set a single configuration option. (This is very limited.)

```java
st.set_option("deprecation.showPyplotGlobalUse", False)
```

</RefCard>
<RefCard href="/develop/api-reference/configuration/st.set_page_config">

<h4>Set page title, favicon, and more</h4>

Configures the default settings of the page.

```java
st.set_page_config(
  page_title="My app",
  page_icon=":shark:",
)
```

</RefCard>
</TileContainer>

*/}

## Developer tools

### App testing

<br />

<TileContainer>

<RefCard href="/develop/concepts/app-testing" size="full">

<h4>App Testing</h4>

Learn how to test your Javelit applications with unit tests, integration tests, and automated testing frameworks. Ensure your apps work correctly across different scenarios and user interactions.

```java
@Test
public void testButtonIsVisible() {
    PlaywrightUtils.runInSharedBrowser(testInfo, app, page -> {
        assertThat(page.locator("jt-button").first()).isVisible(WAIT_1_SEC_MAX);
    });
}
```

</RefCard>

{/*

<RefCard href="/develop/api-reference/app-testing/st.testing.v1.apptest#apptestfrom_file" size="full">

<h4>AppTest.from_file</h4>

`st.testing.v1.AppTest.from_file` initializes a simulated app from a file.

```java
from streamlit.testing.v1 import AppTest

at = AppTest.from_file("streamlit_app.py")
at.run()
```

</RefCard>

<RefCard href="/develop/api-reference/app-testing/st.testing.v1.apptest#apptestfrom_string" size="full">

<h4>AppTest.from_string</h4>

`st.testing.v1.AppTest.from_string` initializes a simulated app from a string.

```java
from streamlit.testing.v1 import AppTest

at = AppTest.from_string(app_script_as_string)
at.run()
```

</RefCard>

<RefCard href="/develop/api-reference/app-testing/st.testing.v1.apptest#apptestfrom_function" size="full">

<h4>AppTest.from_function</h4>

`st.testing.v1.AppTest.from_function` initializes a simulated app from a function.

```java
from streamlit.testing.v1 import AppTest

at = AppTest.from_function(app_script_as_callable)
at.run()
```

</RefCard>

<RefCard href="/develop/api-reference/app-testing/testing-element-classes#sttestingv1element_treeblock" size="half">

<h4>Block</h4>

A representation of container elements, including:

- `st.chat_message`
- `st.columns`
- `st.sidebar`
- `st.tabs`
- The main body of the app.

```java
# at.sidebar returns a Block
at.sidebar.button[0].click().run()
assert not at.exception
```

</RefCard>

<RefCard href="/develop/api-reference/app-testing/testing-element-classes#sttestingv1element_treeelement" size="half">

<h4>Element</h4>

The base class for representation of all elements, including:

- `st.title`
- `st.header`
- `st.markdown`
- `st.dataframe`

```java
# at.title returns a sequence of Title
# Title inherits from Element
assert at.title[0].value == "My awesome app"
```

</RefCard>

<RefCard href="/develop/api-reference/app-testing/testing-element-classes#sttestingv1element_treebutton" size="third">

<h4>Button</h4>

A representation of `st.button` and `st.form_submit_button`.

```java
at.button[0].click().run()
```

</RefCard>

<RefCard href="/develop/api-reference/app-testing/testing-element-classes#sttestingv1element_treechatinput" size="third">

<h4>ChatInput</h4>

A representation of `st.chat_input`.

```java
at.chat_input[0].set_value("What is Javelit?").run()
```

</RefCard>

<RefCard href="/develop/api-reference/app-testing/testing-element-classes#sttestingv1element_treecheckbox" size="third">

<h4>Checkbox</h4>

A representation of `st.checkbox`.

```java
at.checkbox[0].check().run()
```

</RefCard>

<RefCard href="/develop/api-reference/app-testing/testing-element-classes#sttestingv1element_treecolorpicker" size="third">

<h4>ColorPicker</h4>

A representation of `st.color_picker`.

```java
at.color_picker[0].pick("#FF4B4B").run()
```

</RefCard>

<RefCard href="/develop/api-reference/app-testing/testing-element-classes#sttestingv1element_treedateinput" size="third">

<h4>DateInput</h4>

A representation of `st.date_input`.

```java
release_date = datetime.date(2023, 10, 26)
at.date_input[0].set_value(release_date).run()
```

</RefCard>

<RefCard href="/develop/api-reference/app-testing/testing-element-classes#sttestingv1element_treemultiselect" size="third">

<h4>Multiselect</h4>

A representation of `st.multiselect`.

```java
at.multiselect[0].select("New York").run()
```

</RefCard>

<RefCard href="/develop/api-reference/app-testing/testing-element-classes#sttestingv1element_treenumberinput" size="third">

<h4>NumberInput</h4>

A representation of `st.number_input`.

```java
at.number_input[0].increment().run()
```

</RefCard>

<RefCard href="/develop/api-reference/app-testing/testing-element-classes#sttestingv1element_treeradio" size="third">

<h4>Radio</h4>

A representation of `st.radio`.

```java
at.radio[0].set_value("New York").run()
```

</RefCard>

<RefCard href="/develop/api-reference/app-testing/testing-element-classes#sttestingv1element_treeselectslider" size="third">

<h4>SelectSlider</h4>

A representation of `st.select_slider`.

```java
at.select_slider[0].set_range("A","C").run()
```

</RefCard>

<RefCard href="/develop/api-reference/app-testing/testing-element-classes#sttestingv1element_treeselectbox" size="third">

<h4>Selectbox</h4>

A representation of `st.selectbox`.

```java
at.selectbox[0].select("New York").run()
```

</RefCard>

<RefCard href="/develop/api-reference/app-testing/testing-element-classes#sttestingv1element_treeslider" size="third">

<h4>Slider</h4>

A representation of `st.slider`.

```java
at.slider[0].set_range(2,5).run()
```

</RefCard>

<RefCard href="/develop/api-reference/app-testing/testing-element-classes#sttestingv1element_treetextarea" size="third">

<h4>TextArea</h4>

A representation of `st.text_area`.

```java
at.text_area[0].input("Javelit is awesome!").run()
```

</RefCard>

<RefCard href="/develop/api-reference/app-testing/testing-element-classes#sttestingv1element_treetextinput" size="third">

<h4>TextInput</h4>

A representation of `st.text_input`.

```java
at.text_input[0].input("Javelit").run()
```

</RefCard>

<RefCard href="/develop/api-reference/app-testing/testing-element-classes#sttestingv1element_treetimeinput" size="third">

<h4>TimeInput</h4>

A representation of `st.time_input`.

```java
at.time_input[0].increment().run()
```

</RefCard>

<RefCard href="/develop/api-reference/app-testing/testing-element-classes#sttestingv1element_treetoggle" size="third">

<h4>Toggle</h4>

A representation of `st.toggle`.

```java
at.toggle[0].set_value("True").run()
```

</RefCard>

*/}

</TileContainer>

{/*

<ComponentSlider>

<ComponentCard href="https://github.com/okld/streamlit-pandas-profiling">

<Image pure alt="screenshot" src="/images/api/components/pandas-profiling.jpg" />

<h4>Pandas Profiling</h4>

Pandas profiling component for Javelit. Created by [@okld](https://github.com/okld/).

```java
df = pd.read_csv("https://storage.googleapis.com/tf-datasets/titanic/train.csv")
pr = df.profile_report()

st_profile_report(pr)
```

</ComponentCard>

<ComponentCard href="https://github.com/okld/streamlit-ace">

<Image pure alt="screenshot" src="/images/api/components/ace.jpg" />

<h4>Javelit Ace</h4>

Ace editor component for Javelit. Created by [@okld](https://github.com/okld).

```java
from streamlit_ace import st_ace

content = st_ace()
content
```

</ComponentCard>

<ComponentCard href="https://github.com/jrieke/streamlit-analytics">

<Image pure alt="screenshot" src="/images/api/components/analytics.jpg" />

<h4>Javelit Analytics</h4>

Track & visualize user interactions with your streamlit app. Created by [@jrieke](https://github.com/jrieke).

```java
import streamlit_analytics

with streamlit_analytics.track():
    st.text_input("Write something")
```

</ComponentCard>

</ComponentSlider>

*/}
