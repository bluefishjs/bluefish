---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Bluefish"
  text: "Because your diagrams are worth it"
  tagline: "The missing diagramming framework"
  actions:
    - theme: brand
      text: Markdown Examples
      link: /markdown-examples
    - theme: alt
      text: API Examples
      link: /api-examples
features:
  - title: "Build Reactive Diagrams"
    details: Bluefish works seamlessly with reactive UI frameworks.
  - title: Use Powerful Custom Layouts
    details: Bluefish provides graph and arrow layouts out of the box, with the ability to add your own.
  - title: "Compose Diagrams with <i>Relations</i>"
    details: Combine elements using alignment, arrows, containment and more!
---

<br />

# Demo!

::: sandbox

```vue /src/App.vue [active]
<template>
  <div>{{ hello }}</div>
</template>

<script setup>
import { ref } from "vue";

const hello = ref("Hello World!");
</script>
```

```js /src/main.js
import App from "./App.vue";
import { createApp } from "vue";

createApp(App).mount("#app");
```

:::
