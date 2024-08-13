---
outline: deep
---

<script setup>
import { VPTeamMembers } from "vitepress/theme";

const site = { svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe"><circle cx="12" cy="12" r="10" fill="none"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" fill="none"/><path d="M2 12h20" fill="none"/></svg>' }

const members = [
  {
    avatar: "https://github.com/joshpoll.png",
    name: "Josh Pollock",
    title: "Creator",
    links: [
      { icon: site, link: "https://joshmpollock.com/" },
      { icon: "github", link: "https://github.com/joshpoll" },
      { icon: "x", link: "https://x.com/joshmpollock" },
      { icon: "mastodon", link: "https://mastodon.mit.edu/@joshmpollock" },
    ],
  },
  {
    avatar: "https://github.com/vezwork.png",
    name: "Elliot Evans",
    title: "Developer",
    links: [
      { icon: site, link: "http://elliot.website/" },
      { icon: "github", link: "https://github.com/vezwork" },
      { icon: "x", link: "https://x.com/elliotokay" },
      { icon: "mastodon", link: "https://mathstodon.xyz/@vez" },
    ],
  },
];
</script>

# What is Bluefish?

Bluefish is a diagramming framework for the web. In contrast to previous frameworks, which focus on
low-level or high-level abstractions, Bluefish draws inspiration from UI component frameworks like React that
let users define and use their own custom abstractions (i.e. components). Bluefish works best in
SolidJS, but can be used in other environments like React, Svelte, Observable notebooks, and plain
ol' JavaScript.

Bluefish relaxes the component model to *relations*. Unlike components, relations can share children
and they don't need to fully specify their childrens' layouts. Bluefish is based on work from the [MIT Visualization Group](https://vis.csail.mit.edu/). You can
read more about the theory, design, and implementation of Bluefish in our [research
paper](https://arxiv.org/abs/2307.00146).

<!-- <VPTeamMembers size="small" :members="members" /> -->