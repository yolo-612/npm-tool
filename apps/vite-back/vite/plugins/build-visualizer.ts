import { visualizer } from 'rollup-plugin-visualizer';
import type { PluginOption } from 'vite';

/**
 * 构建产物可视化插件
 */
export default function createBuildVisualizer() {
  return visualizer({}) as PluginOption;
}
