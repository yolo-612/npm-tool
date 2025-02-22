(() => {
  const saved = localStorage.getItem('vitepress-theme-appearance');
  if (
    !saved || saved === 'auto'
      ? window.matchMedia(`(prefers-color-scheme: dark)`).matches
      : saved === 'dark'
  ) {
    // 暂时注释暗黑模式
    document.documentElement.classList.add('dark');
  }
})();
