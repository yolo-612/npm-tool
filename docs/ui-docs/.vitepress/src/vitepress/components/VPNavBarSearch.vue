<script lang="ts" setup>
import "@docsearch/css";
import { useData } from "vitepress";
import { ref, defineAsyncComponent, onMounted, onUnmounted } from "vue";

const { theme } = useData();
const VPAlgoliaSearchBox = defineAsyncComponent(
  () => import("./VPAlgoliaSearchBox.vue")
);

// to avoid loading the docsearch js upfront (which is more than 1/3 of the
// payload), we delay initializing it until the user has actually clicked or
// hit the hotkey to invoke it
const loaded = ref(false);
const metaKey = ref();

onMounted(() => {
  // meta key detect (same logic as in @docsearch/js)
  metaKey.value.textContent = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)
    ? "⌘"
    : "Ctrl";
  const handleSearchHotKey = (e: KeyboardEvent) => {
    if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      load();
      remove();
    }
  };
  const remove = () => {
    window.removeEventListener("keydown", handleSearchHotKey);
  };
  window.addEventListener("keydown", handleSearchHotKey);
  onUnmounted(remove);
});

function load() {
  if (!loaded.value) {
    loaded.value = true;
  }
}
</script>

<template>
  <div v-if="theme.algolia" class="VPNavBarSearch">
    <VPAlgoliaSearchBox v-if="loaded" />
    <div v-else id="docsearch" @click="load">
      <button
        type="button"
        class="DocSearch DocSearch-Button"
        aria-label="Search"
      >
        <span class="DocSearch-Button-Container">
          <svg
            width="20"
            height="20"
            top="-1"
            class="DocSearch-Search-Icon"
            viewBox="0 0 20 20"
          >
            <path
              d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
              stroke="currentColor"
              fill="none"
              fill-rule="evenodd"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
          <span class="DocSearch-Button-Placeholder">Search</span>
        </span>
        <span class="DocSearch-Button-Keys">
          <span class="DocSearch-Button-Key" ref="metaKey">Meta</span>
          <span class="DocSearch-Button-Key">K</span>
        </span>
      </button>
    </div>
  </div>
</template>
