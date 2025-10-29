# Jeamlit Documentation

This is the documentation site for Jeamlit, a Java framework inspired by Streamlit.

## Project Structure

- `content/` - Documentation content in markdown
- `pages/` - Next.js pages
- `components/` - React components
- `python/` - Build scripts (fetch API docs from Maven)
- `public/` - Static assets

## Key Conversions

Python/Streamlit → Java/Jeamlit:
- `st.button()` → `Jt.button().use()`
- `st.session_state` → `Jt.sessionState()`
- `st.sidebar.widget()` → `Jt.widget().use(Jt.SIDEBAR)`

## Component Checklist

To make a component visible in the doc because it is now available:

- [ ] edit [menu](content/menu.md)
  - make visible (remove `visible: false`)
  - remove `ignore: true`
  - replace st by Jt/jt where relevant
- [ ] edit api reference [_index.md](content/develop/api-reference/_index.md)
  - **properly uncomment JSX blocks `{/* */}` - IMPORTANT: you must move/restructure the comment tags, not just remove them**
    - Large blocks may contain multiple components
    - When uncommenting one component, move the `*/}` closing tag to end BEFORE your uncommented component
    - Add `{/*` opening tag AFTER your uncommented component to keep remaining components commented
    - Example: if uncommenting component B from `{/* A B C */}`, result should be `{/* A */} B {/* C */}`
  - edit the code
  - replace st by Jt/jt where relevant
  - update the url - should match url in menu.md
- [ ] edit sub folder index.md
  - **same JSX comment handling as above - properly move comment tags, don't just remove them**
  - same changes as in the file above
- [ ] edit md file
  - remove ignore: true
  - update slug - should match menu url
  - update description
  - update autofunction function property. eg streamlit.audio -> Jt.audio
