<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useData } from 'vitepress';
import VPContentDocOutline from './VPContentDocOutline.vue';
import VPContentDocFooter from './VPContentDocFooter.vue';
import VPCarbonAds from './VPCarbonAds.vue';
import type { Config } from '../config';
import { VTLink, VTIconEdit } from '../../core';

const { page, frontmatter, theme } = useData<Config>();

const hashMatch = /#(\w+)$/;

const content = ref('示例');

const repoUrl = computed(() => {
  const repo = theme.value.editLink?.repo || 'vuejs/docs';
  const branch = repo.match(hashMatch)?.[1] || 'main';
  return `https://github.com/vuejs/docs/edit/${branch}/src/${page.value.relativePath}`;
});

const pageClass = computed(() => {
  const { relativePath } = page.value;
  return relativePath.slice(0, relativePath.indexOf('/'));
});
</script>

<template>
  <div
    class="VPContentDoc"
    :class="{ 'has-aside': frontmatter.aside !== false }"
  >
    <div class="container">
      <div class="aside" v-if="frontmatter.aside !== false">
        <div class="aside-container">
          <slot name="aside-top" />
          <VPContentDocOutline
            v-if="page.headers && frontmatter.outline !== false"
          />
          <slot name="aside-mid" />
          <VPCarbonAds v-if="theme.carbonAds && frontmatter.ads !== false" />
          <slot name="aside-bottom" />
        </div>
      </div>
      <div class="content">
        <slot name="content-top" />
        <main>
          <!-- <div
            class="content-type"
            v-if="frontmatter.extendFrontmatter?.design"
          >
            <el-radio-group v-model="content" size="small">
              <el-radio-button value="示例">示例</el-radio-button>
              <el-radio-button value="设计">设计</el-radio-button>、
            </el-radio-group>
          </div> -->
          <div
            v-if="content === '设计' && frontmatter.extendFrontmatter?.design"
          >
            <el-image
              style="max-width: 100%; margin-top: 30px"
              :src="'/images/design/' + frontmatter.extendFrontmatter?.design"
              :preview-src-list="[
                '/images/design/' + frontmatter.extendFrontmatter?.design
              ]"
              lazy
            >
            </el-image>
          </div>
          <Content v-else class="vt-doc" :class="pageClass" />
          <p
            class="edit-link"
            v-if="theme.editLink && frontmatter.editLink !== false"
          >
            <VTIconEdit class="vt-icon" />
            <VTLink :href="repoUrl" :no-icon="true">{{
              theme.editLink.text
            }}</VTLink>
          </p>
        </main>
        <slot name="content-bottom" />
        <VPContentDocFooter v-if="frontmatter.footer !== false" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.VPContentDoc {
  padding: 32px 24px 96px;
}

.vt-doc {
  margin-bottom: 54px;
}

.content {
  margin: 0 auto;
  max-width: 1000px;
  position: relative;
}

.aside {
  position: relative;
  display: none;
  flex-shrink: 0;
  padding-left: 64px;
  width: 320px;
}

.aside-container {
  position: sticky;
  width: 224px;
  top: calc(var(--vt-nav-height) + var(--vt-banner-height, 0px) + 24px);
  bottom: 0;
}

.aside-container::-webkit-scrollbar {
  display: none;
}

.edit-link {
  margin: 0 0 32px;
  /* text-align: center; */
}

.edit-link .vt-link {
  font-size: 14px;
  color: var(--vt-c-brand);
  font-weight: 500;
}

.vt-icon {
  width: 18px;
  height: 18px;
  color: var(--vt-c-brand);
  display: inline-block;
  margin-right: 8px;
  position: relative;
  top: -1px;
}

.content .content-type {
  float: right;
  margin-top: -30px;
}
@media (min-width: 768px) {
  .VPContentDoc {
    padding: 48px 32px 96px;
  }
}

@media (min-width: 960px) {
  .VPContentDoc {
    padding: 64px 64px 96px;
  }
}

@media (min-width: 1280px) {
  .VPContentDoc {
    padding: 64px 0 96px 64px;
  }
  .VPContentDoc:not(.has-sidebar.has-aside) {
    padding-left: calc((100vw - 688px) / 2);
  }
  .VPContentDoc.has-aside:not(.has-sidebar) {
    padding-left: calc((100vw - 688px - 320px) / 2);
  }
  .container {
    display: flex;
  }
  .content {
    min-width: 640px;
    margin: 0;
    order: 1;
  }
  .VPContentDoc:not(.has-aside) .content {
    min-width: 688px;
  }
  .aside {
    display: block;
    order: 2;
  }
}

@media (min-width: 1440px) {
  .VPContentDoc {
    padding: 64px 0 96px 0px;
  }
  .aside {
    padding-left: 96px;
  }
}
</style>
