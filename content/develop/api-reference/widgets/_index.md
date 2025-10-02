---
title: Input widgets
slug: /develop/api-reference/widgets
---

# Input widgets

With widgets, Jeamlit allows you to bake interactivity directly into your apps with buttons, sliders, text inputs, and more.

## Button elements

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

<RefCard href="https://docs.jeamlit.io/develop/api-reference/execution-flow/jt.formsubmitbutton">

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

</TileContainer>

## Selection elements

<TileContainer>

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
<RefCard href="/develop/api-reference/widgets/st.select_slider">

<Image pure alt="screenshot" src="/images/api/select_slider.jpg" />

<h4>Select slider</h4>

Display a slider widget to select items from a list.

```java
size = st.select_slider("Pick a size", ["S", "M", "L"])
```

</RefCard>
*/}
<RefCard href="/develop/api-reference/widgets/jt.selectbox">

<Image pure alt="screenshot" src="/images/api/selectbox.jpg" />

<h4>Selectbox</h4>

Display a select widget.

```java
String choice = Jt.selectbox("Pick one", List.of("cats", "dogs"))
```

</RefCard>

<RefCard href="/develop/api-reference/widgets/jt.toggle">

<Image pure alt="screenshot" src="/images/api/toggle.jpg" />

<h4>Toggle</h4>

Display a toggle widget.

```java
boolean activated = Jt.toggle("Activate").use();
```

</RefCard>

</TileContainer>

## Numeric input elements

<TileContainer>
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

</TileContainer>

## Date and time input elements

<TileContainer>

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
*/}

</TileContainer>

## Text input elements

<TileContainer>

<RefCard href="/develop/api-reference/widgets/jt.textinput">

<Image pure alt="screenshot" src="/images/api/text_input.jpg" />

<h4>Text input</h4>

Display a single-line text input widget.

```java
String name = Jt.textInput("First name").use();
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/jt.textarea">

<Image pure alt="screenshot" src="/images/api/text_area.jpg" />

<h4>Text area</h4>

Display a multi-line text input widget.

```java
String text = Jt.textArea("Text to translate").use();
```

</RefCard>

{/*
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

</TileContainer>

## Other input elements

<TileContainer>

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

<h4>Streamlit Elements</h4>

Create a draggable and resizable dashboard in Streamlit. Created by [@okls](https://github.com/okls).

```python
from streamlit_elements import elements, mui, html

with elements("new_element"):
  mui.Typography("Hello world")
```

</ComponentCard>

<ComponentCard href="https://github.com/gagan3012/streamlit-tags">

<Image pure alt="screenshot" src="/images/api/components/tags.jpg" />

<h4>Tags</h4>

Add tags to your Streamlit apps. Created by [@gagan3012](https://github.com/gagan3012).

```python
from streamlit_tags import st_tags

st_tags(label='# Enter Keywords:', text='Press enter to add more', value=['Zero', 'One', 'Two'],
suggestions=['five', 'six', 'seven', 'eight', 'nine', 'three', 'eleven', 'ten', 'four'], maxtags = 4, key='1')
```

</ComponentCard>

<ComponentCard href="https://github.com/Wirg/stqdm">

<Image pure alt="screenshot" src="/images/api/components/stqdm.jpg" />

<h4>Stqdm</h4>

The simplest way to handle a progress bar in streamlit app. Created by [@Wirg](https://github.com/Wirg).

```python
from stqdm import stqdm

for _ in stqdm(range(50)):
    sleep(0.5)
```

</ComponentCard>

<ComponentCard href="https://github.com/innerdoc/streamlit-timeline">

<Image pure alt="screenshot" src="/images/api/components/timeline.jpg" />

<h4>Timeline</h4>

Display a Timeline in Streamlit apps using [TimelineJS](https://timeline.knightlab.com/). Created by [@innerdoc](https://github.com/innerdoc).

```python
from streamlit_timeline import timeline

with open('example.json', "r") as f:
  timeline(f.read(), height=800)
```

</ComponentCard>

<ComponentCard href="https://github.com/blackary/streamlit-camera-input-live">

<Image pure alt="screenshot" src="/images/api/components/camera-live.jpg" />

<h4>Camera input live</h4>

Alternative for st.camera_input which returns the webcam images live. Created by [@blackary](https://github.com/blackary).

```python
from camera_input_live import camera_input_live

image = camera_input_live()
st.image(value)
```

</ComponentCard>

<ComponentCard href="https://github.com/okld/streamlit-ace">

<Image pure alt="screenshot" src="/images/api/components/ace.jpg" />

<h4>Streamlit Ace</h4>

Ace editor component for Streamlit. Created by [@okld](https://github.com/okld).

```python
from streamlit_ace import st_ace

content = st_ace()
content
```

</ComponentCard>

<ComponentCard href="https://github.com/AI-Yash/st-chat">

<Image pure alt="screenshot" src="/images/api/components/chat.jpg" />

<h4>Streamlit Chat</h4>

Streamlit Component for a Chatbot UI. Created by [@AI-Yash](https://github.com/AI-Yash).

```python
from streamlit_chat import message

message("My message")
message("Hello bot!", is_user=True)  # align's the message to the right
```

</ComponentCard>

<ComponentCard href="https://github.com/victoryhb/streamlit-option-menu">

<Image pure alt="screenshot" src="/images/api/components/option-menu.jpg" />

<h4>Streamlit Option Menu</h4>

Select a single item from a list of options in a menu. Created by [@victoryhb](https://github.com/victoryhb).

```python
from streamlit_option_menu import option_menu

option_menu("Main Menu", ["Home", 'Settings'],
  icons=['house', 'gear'], menu_icon="cast", default_index=1)
```

</ComponentCard>

<ComponentCard href="https://extras.streamlit.app/">

<Image pure alt="screenshot" src="/images/api/components/extras-toggle.jpg" />

<h4>Streamlit Extras</h4>

A library with useful Streamlit extras. Created by [@arnaudmiribel](https://github.com/arnaudmiribel/).

```python
from streamlit_extras.stoggle import stoggle

stoggle(
    "Click me!", """🥷 Surprise! Here's some additional content""",)
```

</ComponentCard>

</ComponentSlider>
*/}
