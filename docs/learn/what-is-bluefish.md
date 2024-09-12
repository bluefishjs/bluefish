---
outline: deep
---

<script setup>
import { VPTeamMembers } from "vitepress/theme";

// TODO: maybe use the link icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
// const site = { svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe"><circle cx="12" cy="12" r="10" fill="none"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" fill="none"/><path d="M2 12h20" fill="none"/></svg>' }
const site = { svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" fill="none"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" fill="none"/></svg>' }

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
    avatar: "https://github.com/catherinemei.png",
    name: "Catherine Mei",
    title: "Developer",
    links: [
      { icon: "github", link: "https://github.com/catherinemei" },
    ],
  },
  {
    avatar: "https://github.com/gracefh.png",
    name: "Grace Huang",
    title: "Developer",
    links: [
      { icon: "github", link: "https://github.com/gracefh" },
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
  {
    avatar: "https://hci.csail.mit.edu/images/profile-pictures/faculty/daniel-jackson.jpg",
    name: "Daniel Jackson",
    title: "Advisor",
    links: [
      { icon: site, link: "https://people.csail.mit.edu/dnj/" },
    ],
  },
  {
    avatar: "https://arvindsatya.com/imgs/arvindsatya-2023.jpg",
    name: "Arvind Satyanarayan",
    title: "Advisor",
    links: [
      { icon: site, link: "https://arvindsatya.com/" },
      { icon: "github", link: "https://github.com/arvind" },
      { icon: "x", link: "https://x.com/arvindsatya1" },
      { icon: "mastodon", link: "https://vis.social/@arvindsatya@hci.social" },
    ],
  },
];
</script>

# What Is Bluefish?

Bluefish is a diagramming framework for the web. It relaxes the UI component model popularized by
React. The main primitive of Bluefish is the _relation_. Just as components are the
building blocks of user interfaces, relations are the building blocks of diagrams. Unlike
components, relations can share children with other relations, and they don't need to fully specify
their childrens' layouts.

Bluefish is based on work from the [MIT Visualization Group](https://vis.csail.mit.edu/) and the [Software
is based on work from the [MIT Visualization Group](https://vis.csail.mit.edu/) and the [Software Design Group](https://sdg.csail.mit.edu/). You can read more
about the theory, design, and implementation of Bluefish in our [research
paper](https://arxiv.org/abs/2307.00146).

# Team

<VPTeamMembers size="small" :members="members" />
