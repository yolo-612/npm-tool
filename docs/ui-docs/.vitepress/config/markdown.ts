import fs from 'fs';
import mdContainer from 'markdown-it-container'
// const { highlight } = require('./highlight.cts');

const blockPlugin = (md) => {
  md.use(mdContainer, 'demo', {
    validate(params) {
      return params.trim().match(/^demo\s*(.*)$/);
    },
    render(tokens, idx) {
      const data = (md as any).__data;

      if (tokens[idx].nesting === 1) {
        let source = [] as any;
        let paths = [] as any;
        let mds = [] as any;
        const content =
          tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : '';
        var contentArray = content.split('\n');
        // 文件路径和代码块
        contentArray.forEach((el) => {
          if (el) {
            var content = fs.readFileSync(`examples/${el}.vue`, 'utf-8');
            source.push(md.utils.escapeHtml(content));
            paths.push(`/examples/${el}.vue`);
            // mds.push(md.utils.escapeHtml(highlight(content, 'vue')));
          }
        });
        let sourceStr = source.join('--SOURCE--');
        let mdsStr = mds.join('--SOURCE--');
        return `
                <demo paths="${md.renderInline(
                  JSON.stringify(paths)
                )}" sourceCodes="${sourceStr}" mds="${mdsStr}">`;
      }
      return '</demo>';
    }
  });
};

const codePlugin = (md, options) => {
  const lang = (options && options.lang) || 'vue';
  const defaultRender = md.renderer.rules.fence;
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    // 判断该 fence 是否在 :::demo 内
    const prevToken = tokens[idx - 1];
    const isInDemoContainer =
      prevToken &&
      prevToken.nesting === 1 &&
      prevToken.info.trim().match(/^demo\s*(.*)$/);
    if (token.info.trim() === lang && isInDemoContainer) {
      const m = prevToken.info.trim().match(/^demo\s*(.*)$/);
      const description = m && m.length > 1 ? m[1] : '';
      //md.render(description).html
      return `
        ${
          description
            ? `<template #description>
          <div>${md.renderInline(description)}</div>
        </template>`
            : ''
        }`;
    }
    return defaultRender(tokens, idx, options, env, self);
  };
};

const demoBlockPlugin = (md, options = {}) => {
  md.use(blockPlugin, options);
  md.use(codePlugin, options);
};

const pagePipePlugin = (md, options = {}) => {
  md.use(mdContainer, 'pagepipe', {
    validate(params) {
      return params.trim().match(/^pagepipe\s*(.*)$/);
    },
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^pagepipe\s+(.*)$/);
      if (tokens[idx].nesting === -1) return '</page-pipe>';
      const optionsStr = md.utils.escapeHtml(m[1]);
      const options = optionsStr.split('|');
      const nodes = options.reduce((nodes, item) => {
        const name = item.substr(item.indexOf('.') + 1, item.length - 1);
        const items = item.split('.');
        if (items[1] === 'guide') {
          nodes.push({
            name,
            value: `<article class="${name}">
              <el-image style="max-width: 1000px;display: flex;
  justify-content: center;" src="https://sdesign-esg-ascp-ai-shenzhen-xili1-oss.sit.sf-express.com/v1/AUTH_sdesign-ESG-ASCP-AI/resources/guide/${items[0]}.png">
              <template #error>
                  <el-result class="blank-result blank-result-no-data">
        <template #icon>
          <div width="280" height="280" class="blank-result-img" />
        </template>
        <template #sub-title>
          <span class="blank-result-tips">暂无数据</span>
        </template>
      </el-result>
        </template>
        </el-image>
            </article>`
          });
        } else {
          const filePath = `component/${item}.md`;
          const contentSource = fs.readFileSync(filePath, 'utf-8');
          const content = md.render(contentSource);
          nodes.push({
            name,
            value: `<article class="${name}">${content}</article>`
          });
        }
        return nodes;
      }, []);
      return `<page-pipe ids="${nodes
        .map((item) => item.name)
        .join('|')}">${nodes.map((item) => item.value).join('')}`;
    }
  });
};

module.exports = {
  blockPlugin,
  codePlugin,
  demoBlockPlugin,
  pagePipePlugin
};
