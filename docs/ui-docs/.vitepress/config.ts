import { defineConfig } from 'vitepress'
import path from 'path'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "YOLO Component",
  description: "YOLO Component",
  themeConfig: {
  },
  vite: {
    resolve: {
      alias: {
        '@vue/theme': path.join(__dirname, './src'),
      }
    }
  }
})
