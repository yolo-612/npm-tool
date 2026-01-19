import { visualizer } from 'rollup-plugin-visualizer';

/**
 * 构建产物可视化插件
 */
export default function createBuildVisualizer() {
  return visualizer({});
}
