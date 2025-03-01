<script lang="ts" setup>
import { useData } from 'vitepress';
// import { VTLink } from '../../core';

const { theme } = useData();
</script>

<template>
  <div class="VPFooter">
    <!-- <p v-if="theme.footer?.license" class="license">
      遵循
      <VTLink class="link" :href="theme.footer.license.link" no-icon>{{
        theme.footer.license.text
      }}</VTLink>
    </p>

    <p v-if="theme.footer?.copyright" class="copyright">
      {{ theme.footer.copyright }}
    </p> -->
    <div class="top">
      <div class="barcode">
        <!-- <img
          src="https://sdesign-esg-ascp-ai-shenzhen-xili1-oss.sit.sf-express.com/v1/AUTH_sdesign-ESG-ASCP-AI/resources/group-barcode.png"
        /> -->
        <!-- <div>统一WebUI组件研发群</div> -->
      </div>
      <div class="menus">
        <div class="menu">
          <p>指南</p>
          <ul>
            <li><a href="/guide/installation.html">安装</a></li>
            <li>
              <a href="/guide/new-quickstart.html">快速开始</a>
            </li>
            <!-- <li><a href="/guide/quickstart.html">快速开始（客渠规范）</a></li> -->
            <li>
              <a
                href="https://inner-source.sf-express.com/incubation/SF-Tech-Web/sdesign/sdesign-vue3/-/releases"
                target="_blank"
                >更新日志</a
              >
            </li>
            <li><a href="/guide/plan.html">开发计划</a></li>
          </ul>
        </div>
        <div class="menu">
          <p>组件</p>
          <ul>
            <li><a href="/component/color.html">全局规范</a></li>
            <li><a href="/component/button.html">导航与通用</a></li>
            <li><a href="/component/input.html">数据录入</a></li>
            <li><a href="/component/table.html">数据展示</a></li>
            <li><a href="/component/message.html">反馈与其他</a></li>
          </ul>
        </div>
        <div class="menu">
          <p>试验区</p>
          <ul>
            <li>
              <a href="/test/element-plus.html">基于element-plus的组件</a>
            </li>
            <li><a href="/test/antdv3.html">基于antdv3的组件</a></li>
          </ul>
        </div>
        <div class="menu">
          <p>版本</p>
          <ul>
            <li>
              <a
                href="https://sdesign.sit.sf-express.com/v2/component/color/"
                target="_blank"
              >
                Vue2
              </a>
            </li>
            <li>
              <a
                href="https://sdesign.sit.sf-express.com/react/components/color"
                target="_blank"
              >
                React
              </a>
            </li>
            <li>
              <a
                href="https://sdesign.sit.sf-express.com/charts/"
                target="_blank"
              >
                图表
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="tnc">
        <span>遵循 顺丰科技内源规则</span>
      </div>
      <div v-if="theme.footer?.copyright" style="display: flex">
        {{ theme.footer.copyright }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.VPFooter {
  padding: 2rem 100px 0 100px;
  background-color: var(--sdesign-color-neutral-12);
  transition: border-top 0.5s, background-color 0.5s;
  color: #666;
  text-align: center;
  font-size: 0.85rem;
}

.dark .VPFooter {
  border-top: 1px solid var(--vt-c-divider-light);
  background-color: var(--vt-c-bg);
}

.license,
.copyright {
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--sdesign-color-white);
  transition: color 0.25s;
}

.link {
  color: var(--sdesign-color-white);
  opacity: 0.7;
  transition: color 0.25s;
}

.link:hover {
  opacity: 1;
}
</style>

<style lang="scss" scoped>
.VPFooter {
  .top {
    display: flex;
    justify-content: space-between;
    .barcode {
      color: #f4f5f9;
      img {
        width: 168px;
        height: 168px;
        background: #fff;
        padding: 8px;
        margin-bottom: 4px;
      }
    }
    .menus {
      color: #f4f5f9;
      text-align: left;
      font-size: 14px;
      display: flex;
      .menu {
        margin: 0 36px;
      }
      p {
        margin-bottom: 24px;
      }
      ul {
        padding: 0;
      }
      li {
        opacity: 0.5;
        margin-bottom: 8px;
        list-style-type: none;
        cursor: pointer;
        a {
          color: inherit;
        }
      }
      li:hover {
        opacity: 1;
      }
    }
  }
  .bottom {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid rgba(244, 245, 249, 0.1);
    line-height: 50px;
  }
}
</style>
