<script setup lang="ts">
import { E_TABLIST } from './types';

const props = defineProps({
  /** 当前激活的tab */
  activeTabs: {
    type: String,
    default: E_TABLIST.HOME,
  },
  /** 模板标题 */
  pageTitle: {
    type: String,
    default: '',
  },
  /** 背景图地址 */
  pageBgUrl: {
    type: String,
    default: '',
  },
  /** 收集项 */
  collections: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  /** 背景色 */
  pageBgColor: {
    type: String,
    default: '#ffffff',
  },
  /* 按钮图地址 */
  pageBtnUrl: {
    type: String,
    default: '',
  },
  /** 规则文案 */
  pageRuleText: {
    type: String,
    default: '',
  },
  /** 协议文案 */
  pageAgreementText: {
    type: String,
    default: '',
  },
});

const rendererStyle = computed(() => {
  if (props.pageBgUrl) {
    return {
      backgroundColor: props.pageBgColor ?? '#ffffff',
    };
  }
  return {};
});

const options = [
  {
    code: 'customerName',
    img: 'https://acsp-public-static.sf-express.com/sfcdn/sfosspublic001/luban/1744095501733_115.png',
  },
  {
    code: 'customerPhone',
    img: 'https://acsp-public-static.sf-express.com/sfcdn/sfosspublic001/luban/1744094937026_250.png',
  },
  {
    code: 'customerPhone',
    img: 'https://acsp-public-static.sf-express.com/sfcdn/sfosspublic001/luban/1744098480924_400.png',
  },
  {
    code: 'companyName',
    img: 'https://acsp-public-static.sf-express.com/sfcdn/sfosspublic001/luban/1744094948545_729.png',
  },
  {
    code: 'companyAddr',
    img: 'https://acsp-public-static.sf-express.com/sfcdn/sfosspublic001/luban/1744094958599_452.png',
  },
  {
    code: 'companyLayer',
    img: 'https://acsp-public-static.sf-express.com/sfcdn/sfosspublic001/luban/1744094991652_532.png',
  },
  {
    code: 'companySize',
    img: 'https://acsp-public-static.sf-express.com/sfcdn/sfosspublic001/luban/1744095063295_259.png',
  },
  {
    code: 'monthCard',
    img: 'https://acsp-public-static.sf-express.com/sfcdn/sfosspublic001/luban/1744095093206_779.png',
  },
  {
    code: 'monthCard',
    img: 'https://acsp-public-static.sf-express.com/sfcdn/sfosspublic001/luban/1744095102354_824.png',
  },
  {
    code: 'estimatedMonthlyCourierCost',
    img: 'https://acsp-public-static.sf-express.com/sfcdn/sfosspublic001/luban/1744095119511_678.png',
  },
  {
    code: 'potentialCooperationBusiness',
    img: 'https://acsp-public-static.sf-express.com/sfcdn/sfosspublic001/luban/1744095132972_957.png',
  },
];

/** 模板内容 */
const collectionsList = computed(() => {
  const collections = props.collections.join(',');
  const list = options.filter((item) => {
    return collections.includes(item.code);
  });
  return list;
});

</script>

<template>
  <div class="template-content">
    <div v-if="activeTabs === E_TABLIST.HOME" class="template-content__title">
      <span>{{ pageTitle }}</span>
    </div>
    <div
      v-if="activeTabs === E_TABLIST.HOME"
      class="template-content__tab template-content__home"
      :style="rendererStyle"
    >
      <img v-if="pageBgUrl" class="template-content__home-bg" :src="pageBgUrl" fit="cover" />
      <div class="template-content__home-content">
        <img
          class="template-content__home-content-rule"
          src="https://acsp-public-static.sf-express.com/sfcdn/sfosspublic001/luban/1744016206369_878.png"
        />
        <div class="template-content__home-content-collection">
          <div
            v-for="(item, index) in collectionsList"
            :key="index"
            class="template-content__home-content-collection-option"
          >
            <img :src="item.img" />
          </div>
          <div class="template-content__home-content-collection-agreement">
            <img src="https://acsp-public-static.sf-express.com/sfcdn/sfosspublic001/luban/1744095797482_494.png" />
          </div>
          <img
            v-if="pageBtnUrl"
            :src="pageBtnUrl"
            class="template-content__home-content-collection-btn"
          />
        </div>
      </div>
    </div>
    <div v-else-if="activeTabs === E_TABLIST.RULE" class="template-content__tab template-content__rule">
      <div class="template-content__rule-popup">
        <div class="ql-editor" v-html="pageRuleText"></div>
      </div>
    </div>
    <div v-else-if="activeTabs === E_TABLIST.AGREEMENT" class="template-content__tab template-content__agreement">
      <div class="template-content__agreement-popup">

      </div>
      <div class="ql-editor" v-html="pageAgreementText"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.template-content {
  width: 100%;
  height: 100%;
  padding: 20px 0;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__title {
    width: 375px;
    height: 96px;
    font-size: 17px;
    font-weight: 500;
    background: url(https://acsp-public-static.sf-express.com/sfcdn/sfosspublic001/luban/1744621666348_8.png);
    background-size: 375px 96px;
    color: #0F1214;
    position: relative;
    span {
      width: 375px;
      text-align: center;
      position: absolute;
      left: 0;
      bottom: 15px;
    }
  }
  &__tab {
    width: 375px;
    height: 812px;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
  }
  &__home {
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    /* 隐藏滚动条 */
    &::-webkit-scrollbar {
      display: none;
    }
    &-bg {
      width: 375px;
      height: 812px;
      position: absolute;
      top: 0;
      left: 0;
    }
    &-content {
      width: 375px;
      height: 812px;
      position: absolute;
      top: 0;
      left: 0;
      &-rule {
        width: 32px;
        height: 32px;
        position: absolute;
        top: 10px;
        right: 10px;
      }
      &-collection {
        width: 351px;
        margin: 210px auto 0;
        padding-top: 36px;
        border-radius: 15px;
        background: #ffffff;
        background-image: url('https://acsp-public-static.sf-express.com/sfcdn/sfosspublic001/luban/1744017850572_619.png');
        background-repeat: no-repeat;
        background-size: 351px 91px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        &:after {
          content: '';
          width: 4px;
          height: 16.5px;
          position: absolute;
          top: 20px;
          left: 2px;
          background-image: url('https://acsp-public-static.sf-express.com/sfcdn/sfosspublic001/luban/1744018022722_452.png');
          background-repeat: no-repeat;
          background-size: 4px 16.5px;
        }
        &:before {
          content: '';
          width: 75px;
          height: 17px;
          position: absolute;
          top: 20px;
          left: 15px;
          background-image: url('https://acsp-public-static.sf-express.com/sfcdn/sfosspublic001/luban/1744254294562_767.png');
          background-repeat: no-repeat;
          background-size: 75px 17px;
        }
        &-option {
          height: 58px;
          box-sizing: border-box;
          border-bottom: 1px solid #ECECEC;
          display: flex;
          align-items: center;
          align-items: center;
          img {
            width: 100%;
            height: 20px;
          }
        }
        &-agreement {
          width: 100%;
          height: 60.5px;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 241px;
            height: 16.5px;
          }
        }
        &-btn {
          width: 260px;
          height: 69px;
          margin-bottom: 22.5px;
        }
      }
    }
  }
  &__rule {
    background: #ffffff;
    position: relative;
    &::before {
      content: '';
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      position: absolute;
      top: 0;
      left: 0;
    }
    &-popup {
      width: 326px;
      height: 476px;
      position: absolute;
      top: 153px;
      left: 26px;
      background: url('https://acsp-public-static.sf-express.com/sfcdn/sfosspublic001/luban/1744254813544_601.png') no-repeat;
      background-size: 326px 476px;
      background-repeat: no-repeat;
      &::after {
        content: '';
        width: 35px;
        height: 35px;
        background: url('https://acsp-public-static.sf-express.com/sfcdn/sfosspublic001/luban/1744254931959_701.png') no-repeat;
        background-size: 35px 35px;
        background-repeat: no-repeat;
        position: absolute;
        bottom: -60px;
        left: 144.5px;
      }
      &::before {
        content: '';
        width: 78.5px;
        height: 18px;
        background: url('https://acsp-public-static.sf-express.com/sfcdn/sfosspublic001/luban/1744255288309_865.png') no-repeat;
        background-size: 78.5px 18px;
        background-repeat: no-repeat;
        position: absolute;
        top: 87px;
        left: 122.5px;
      }
      .ql-editor {
        width: 273px;
        height: 325px;
        position: absolute;
        top: 112px;
        left: 25px;
        overflow-x: hidden;
        overflow-y: scroll;
      }
    }
    /* 针对 WebKit 浏览器隐藏滚动条 */
    .ql-editor::-webkit-scrollbar {
      display: none;
    }
  }
  &__agreement {
    background: #ffffff;
    position: relative;
    &::before {
      content: '';
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      position: absolute;
      top: 0;
      left: 0;
    }
    &-popup {
      width: 100%;
      height: 290px;
      position: absolute;
      bottom: 0;
      left: 0;
      background: url('https://acsp-public-static.sf-express.com/sfcdn/sfosspublic001/luban/1744255716577_892.png') no-repeat;
      background-size: 100% 290px;
      background-repeat: no-repeat;
    }
    .ql-editor {
      width: 335px;
      height: 150px;
      position: absolute;
      bottom: 86px;
      left: 20px;
      overflow-x: hidden;
      overflow-y: scroll;
    }
    /* 针对 WebKit 浏览器隐藏滚动条 */
    .ql-editor::-webkit-scrollbar {
      display: none;
    }
  }

  .ql-editor * {
    font: revert;
  }
}
</style>
