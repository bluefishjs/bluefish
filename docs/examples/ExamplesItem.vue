<script setup lang="ts">
import type { DefaultTheme } from "vitepress/theme";
import VPLink from "./VPLink.vue";

interface Props {
  size?: "small" | "medium";
  member: {
    name: string;
    title: string;
    desc: string;
    avatar: string;
    creator: string;
    inspiration?: string;
    link: string;
  };
}

withDefaults(defineProps<Props>(), {
  size: "medium",
});
</script>

<template>
  <a :href="member.link" class="example-link">
    <article class="VPTeamMembersItem" :class="[size]">
      <div class="profile">
        <div class="data">
          <h1 class="name">
            {{ member.name }}
          </h1>
          <p v-if="member.title" class="affiliation">
            <span class="title">
              {{ member.title }}
            </span>
          </p>
          <p v-if="member.desc" class="desc" v-html="member.desc" />
        </div>
        <figure class="avatar">
          <img class="avatar-img" :src="member.avatar" :alt="member.name" />
        </figure>
        <p v-if="member.creator" class="creator">Created by {{ member.creator }}</p>
        <p v-if="member.inspiration" class="inspiration">Inspired by {{ member.inspiration }}</p>
      </div>
    </article>
  </a>
</template>

<style scoped>
.example-link {
  text-decoration: none;
  color: inherit;
  display: block;
  transition: background-color 0.3s ease;
}

.VPTeamMembersItem {
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-radius: 12px;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.VPTeamMembersItem.small .profile {
  padding: 24px 32px 32px;
}

.VPTeamMembersItem.small .data {
  padding-top: 0;
  margin-bottom: 20px;
}

.VPTeamMembersItem.small .avatar {
  width: 64px;
  height: 64px;
}

.VPTeamMembersItem.small .name {
  line-height: 24px;
  font-size: 16px;
}

.VPTeamMembersItem.small .affiliation {
  padding-top: 4px;
  line-height: 20px;
  font-size: 14px;
}

.VPTeamMembersItem.small .desc {
  padding-top: 12px;
  line-height: 20px;
  font-size: 14px;
}

.VPTeamMembersItem.small .links {
  margin: 0 -16px -20px;
  padding: 10px 0 0;
}

.VPTeamMembersItem.medium .profile {
  padding: 32px 32px 48px;
}

.VPTeamMembersItem.medium .data {
  padding-top: 0;
  margin-bottom: 24px;
  text-align: center;
}

.VPTeamMembersItem.medium .avatar {
  width: 256px;
  height: 128px;
}

.VPTeamMembersItem.medium .name {
  letter-spacing: 0.15px;
  line-height: 28px;
  font-size: 20px;
}

.VPTeamMembersItem.medium .affiliation {
  padding-top: 4px;
  font-size: 16px;
}

.VPTeamMembersItem.medium .desc {
  padding-top: 16px;
  max-width: 288px;
  font-size: 16px;
}

.VPTeamMembersItem.medium .links {
  margin: 0 -16px -12px;
  padding: 16px 12px 0;
}

.profile {
  flex-grow: 1;
  background-color: var(--vp-c-bg-soft);
  display: flex;
  flex-direction: column;
}

.data {
  text-align: center;
}

.avatar {
  position: relative;
  flex-shrink: 0;
  margin: 0 auto;
  border-radius: 50%;
  box-shadow: var(--vp-shadow-3);
}

.avatar-img {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 10%;
  object-fit: cover;
}

.name {
  margin: 0;
  font-weight: 600;
}

.affiliation {
  margin: 0;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.org.link {
  color: var(--vp-c-text-2);
  transition: color 0.25s;
}

.org.link:hover {
  color: var(--vp-c-brand-1);
}

.desc {
  margin: 0 auto;
}

.desc :deep(a) {
  font-weight: 500;
  color: var(--vp-c-brand-1);
  text-decoration-style: dotted;
  transition: color 0.25s;
}

.links {
  display: flex;
  justify-content: center;
  height: 56px;
}

.sp-link {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-sponsor);
  background-color: var(--vp-c-bg-soft);
  transition:
    color 0.25s,
    background-color 0.25s;
}

.sp .sp-link.link:hover,
.sp .sp-link.link:focus {
  outline: none;
  color: var(--vp-c-white);
  background-color: var(--vp-c-sponsor);
}

.sp-icon {
  margin-right: 8px;
  font-size: 16px;
}
</style>
