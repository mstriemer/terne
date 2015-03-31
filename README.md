# terne

A thing for making web components.

## What does it do?

Right now terne lets you create a render-once web component
using `<template>` and `<content>` tags. This might not be useful.

### Make an element

Get this HTML on the page, you can use an HTML Import if that's
supported.

```html
<terne-element name="hello-terne">
  <template>
    <h1>This is my element!</h1>
    <p>Hello, <content select=".you"></content></p>
  </template>
</terne-element>
```

Define your element.

```js
class HelloTerne extends HTMLElement {
  createdCallback() {
    Terne.init(this);
    console.log(this.querySelector('p').textContent);
  }
}
document.registerElement('hello-terne', HelloTerne);
```

### Use an element

```js
<hello-terne>
  <div class="you">Terne</div>
</hello-terne>

```
