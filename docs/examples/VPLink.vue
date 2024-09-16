<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  tag?: string;
  href?: string;
  noIcon?: boolean;
  target?: string;
  rel?: string;
}>();

const tag = computed(() => props.tag ?? (props.href ? "a" : "span"));
</script>

<template>
  <component
    :is="tag"
    class="VPLink"
    :class="{
      link: href,
      'vp-external-link-icon': true,
      'no-icon': noIcon,
    }"
    :href="href"
    :target="target ?? (href ? '_blank' : undefined)"
    :rel="rel ?? (href ? 'noreferrer' : undefined)"
  >
    <slot />
  </component>
</template>
