<template>
  <div class="home-page">
    <div>
      <div class="bg-video">
        <video
          class="video"
          autoplay="autoplay"
          preload=""
          muted="muted"
          loop="loop"
          src="../src/vitepress/images/banner-sf-design.mp4"
        ></video>
        <div class="banner-content">
          <div class="banner animate d1"></div>
          <el-button
            class="new-btn-touse deep animate d2"
            type="primary"
            size="large"
            @click="toGuide('installation')"
            >开始使用</el-button
          >
          <el-button
            class="new-btn-touse animate d2"
            size="large"
            @click="toGuide('color', 'component')"
            >组件规范</el-button
          >
        </div>
      </div>
      <div class="content">
        <div class="characteristic">
          <div class="title">功能特性</div>
          <div class="ch-content">
            <div
              class="ch-item"
              v-for="(item, index) in chList"
              :key="'ch' + index"
            >
              <img class="item-img" :src="item.imgUrl" />
              <div class="item-title">{{ item.title }}</div>
              <div class="item-content">{{ item.content }}</div>
            </div>
          </div>
        </div>
        <div class="guide">
          <div class="title">新手指引</div>
          <div class="guide-content">
            <div
              class="guide-item"
              v-for="(item, index) in guideList"
              :key="'guide' + index"
              @click="toGuide(item.action.to)"
            >
              <div class="item">
                <div class="item-content">
                  <div class="item-title">{{ item.title }}</div>
                  <div class="item-cont">{{ item.content }}</div>
                </div>
                <img class="item-img" :src="item.imgUrl" />
              </div>
              <div class="action">
                <el-link :underline="false">{{ item.action.text }}</el-link>
              </div>
            </div>
          </div>
        </div>
        <div class="contributor">
          <div class="title">建设团队</div>
          <div class="contributor-content">
            <!-- <div
              class="contributor-item"
              v-for="(item, index) in contributorList"
              :key="'contributor' + index"
            >
              <div
                class="item-img"
                :style="`background-image: url('./images/contributor/${item.number}.png')`"
              />
              <div class="name">{{ item.name }}</div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import characteristic1 from '../src/vitepress/images/characteristic1_dark.png';
import characteristic2 from '../src/vitepress/images/characteristic2_dark.png';
import characteristic3 from '../src/vitepress/images/characteristic3_dark.png';

import guide1 from '../src/vitepress/images/guide1.svg';
import guide2 from '../src/vitepress/images/guide2.svg';

const toGuide = (type: string, base: string = 'guide') => {
  const envParams = process.env.NODE_ENV !== 'development' ? '/' : '/';

  window.location.href = `${envParams}${base}/${type}.html`;
};

const chList = [
  {
    imgUrl: characteristic1,
    title: '高性能',
    content: '无需配置，即可拥有最佳的包体积大小和最优性能'
  },
  {
    imgUrl: characteristic2,
    title: '可定制',
    content: '基于 CSS 变量，可以灵活地调整组件外观或自由创造自己的主题'
  },
  {
    imgUrl: characteristic3,
    title: '原子化',
    content: '每个组件提供的功能，恰到好处地满足业务所需'
  }
];
const guideList = [
  {
    imgUrl: guide1,
    title: '快速上手',
    content: '轻松两步，快速实现安装和引入组建，SF Design 自动加载CSS样式文件',
    action: {
      text: '查看详情>',
      to: 'installation'
    }
  },
  {
    imgUrl: guide2,
    title: '常见问题',
    content: '我们为你整理了一些常见的问题，遇到疑问不妨先来查阅一下',
    action: {
      text: 'FAQ>',
      to: 'faq'
    }
  }
];

onMounted(() => {
  window.addEventListener('scroll', () => {
    window.document.querySelector('.VPNavBar').style.opacity =
      window.scrollY < 10 ? '0.85' : '1';
  });
});
</script>

<style lang="scss" scoped>
.home-page {
  .bg-video {
    margin-top: -65px;
    height: 100%;
    display: grid;
    position: relative;
    .video {
      width: 100%;
      height: calc(100% - 42px);
      object-fit: cover;
    }
  }
  .banner-content {
    position: absolute;
    top: calc(50% - 120px);
    left: 100px;
    .banner {
      width: 387px;
      height: 134px;
      background: url('../src/vitepress/images/banner.png') no-repeat center
        center;
      background-size: 100% 100%;
      margin-bottom: 70px;
    }
    .new-btn-touse {
      border-radius: 18px;
      width: 111px;
      height: 36px;
      border: 1px solid #484848;
      background: unset;
      color: #141d37;
      &:hover {
        border: 1px solid var(--sdesign-color-brand-5);
        background: var(--sdesign-color-brand-1);
        color: var(--sdesign-color-brand-5);
      }
      &:active {
        border: 1px solid var(--sdesign-color-brand-7);
        background: var(--sdesign-color-brand-2);
        color: var(--sdesign-color-brand-7);
      }
      &.deep {
        background: #141d37;
        border: 1px solid #484848;
        color: #ffffff;
        &:hover {
          background: #2b344b;
        }
        &:active {
          background: #111a31;
        }
      }
    }
  }
  .content {
    padding: 24px 100px;
    .title {
      height: 26px;
      font-size: 22px;
      line-height: 26px;
      font-weight: 600;
    }
    .characteristic {
      .ch-content {
        display: flex;
        margin-top: 4px;
        .ch-item {
          display: flex;
          flex-direction: column;
          flex: 1;
          align-items: center;
          .item-img {
            width: 200px;
            height: 160px;
          }
          .item-title {
            margin: 6px 0 15px 0;
            font-size: 15px;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            line-height: 18px;
            color: var(--vt-c-text-1);
          }
          .item-content {
            font-size: 14px;
            font-family: PingFangSC-Light;
            width: 214px;
            text-align: center;
          }
        }
      }
    }
    .guide {
      margin-top: 75px;
      .guide-content {
        display: flex;
        margin-top: 38px;
        cursor: pointer;
        .guide-item {
          padding: 30px 40px 30px 28px;
          flex: 1;
          display: flex;
          flex-direction: column;
          &:last-child {
            margin-left: 40px;
          }
          &:hover {
            box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.05);
            border-radius: 4px;
          }
          .item {
            display: flex;
            justify-content: space-between;
            .item-content {
              display: flex;
              flex-direction: column;
              .item-title {
                margin-bottom: 13px;
                font-size: 18px;
                font-family: PingFangSC-Semibold;
                font-weight: 600;
              }
              .item-cont {
                font-size: 12px;
                font-family: PingFangSC-Light;
                line-height: 22px;
                width: 214px;
              }
            }
            .item-img {
              width: 160px;
              height: 100px;
            }
          }
          .el-link {
            color: var(--vt-c-text-1);
          }
        }
      }
    }
    .contributor {
      margin-top: 75px;
      .contributor-content {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        padding: 12px 20px;
        box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.05);
        .contributor-item {
          display: flex;
          align-items: center;
          margin: 4px 10px;
          min-width: 80px;
        }
        .item-img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-size: cover;
          margin-right: 4px;
        }
        .name {
          font-size: 14px;
        }
      }
    }
  }
}
.dark {
  .guide-item {
    &:hover {
      background: #2a2a2a !important;
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.05) !important;
      border-radius: 4px;
    }
  }
}

.animate {
  animation-name: sectionMove;
  animation-duration: 1.5s;
  animation-fill-mode: both;
  &.d1 {
    animation-duration: 1s;
  }
  &.d2 {
    animation-duration: 2s;
  }
  &.d3 {
    animation-duration: 3s;
  }
}
@-webkit-keyframes sectionMove {
  0% {
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
    opacity: 0;
  }
  to {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
