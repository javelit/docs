---
title: Static file serving
slug: /develop/concepts/configuration/serving-static-files
---

# Static file serving

Streamlit apps can host and serve small, static media files to support media embedding use cases that
won't work with the normal [media elements](/develop/api-reference/media).


{/* feature cannnot be disabled for the moment 
To enable this feature, set `enableStaticServing = true` under `[server]` in your config file,
or environment variable `STREAMLIT_SERVER_ENABLE_STATIC_SERVING=true`.
*/}

In **Standalone** mode, Media stored in the folder `./static/` relative to the running app file is served at path
`app/static/[filename]`, such as `http://localhost:8080/app/static/cat.png`.

In **Embedded** mode, it is the folder `./static/` relative to the ***resources*** folder that is served.

## Details on usage

- Files with the following extensions will be served normally:
  - Common image types: `.jpg`, `.jpeg`, `.png`, `.gif`
  - Common font types: `.otf`, `.ttf`, `.woff`, `.woff2`
  - Other types: `.pdf`, `.xml`, `.json`  
    {/* TODO CYRIL IMPLEMENT THIS SECURITY PRACTICE
    Any other file will be sent with header `Content-Type:text/plain` which will cause browsers to render in plain text.
    This is included for security - other file types that need to render should be hosted outside the app.
    */}
- Streamlit also sets `X-Content-Type-Options:nosniff` for all files rendered from the static directory.

{/* CLOUD not supported
- For apps running on Streamlit Community Cloud:
  - Files available in the Github repo will always be served. Any files generated while the app is running,
    such as based on user interaction (file upload, etc), are not guaranteed to persist across user sessions.
  - Apps which store and serve many files, or large files, may run into resource limits and be shut down.
*/}

## Example usage

- Put an image `cat.png` in the folder `./static/`
{/*- Add `enableStaticServing = true` under `[server]` in your `.streamlit/config.toml`*/}
- Any media in the `./static/` folder is served at the relative URL like `app/static/cat.png`

{/*
```toml
# .streamlit/config.toml

[server]
enableStaticServing = true
```
*/}

```java
import io.jeamlit.core.Jt;

public class StaticExample  {
    public static void main(String[] args) {
        Jt.title("A cat").use();
        Jt.markdown("![a cat](/app/static/cat.png)").use();
    }
}
```


{/*
Additional resources:

- [https://docs.jeamlit.io/develop/concepts/configuration](https://docs.jeamlit.io/develop/concepts/configuration)
- [https://static-file-serving.streamlit.app/](https://static-file-serving.streamlit.app/)

<Cloud name="static-file-serving" height="1000px" />

*/}
