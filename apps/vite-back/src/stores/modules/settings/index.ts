import globalSettings from '@/settings';

const useSettingsStore = defineStore('setting', () => {
  const settings = ref(globalSettings);

  watch(
    () => settings.value.theme,
    (value) => {
      updateTheme();
    },
  );

  function updateTheme() {
    document.documentElement.setAttribute('data-theme', settings.value.theme);
  }

  return {
    settings,
    updateTheme,
  };
});

export default useSettingsStore;
