<script lang="ts" setup>
const envParams = process.env.NODE_ENV !== 'development' ? '/' : '/';
</script>

<template>
  <a class="VPNavBarTitle" :href="envParams">
    <!-- <span class="vi"></span>
    <span class="text">Design</span> -->
  </a>
</template>

<style lang="scss" scoped>
.VPNavBarTitle {
  display: flex;
  align-items: center;
  padding-top: 1px;
  width: 120px;
  height: 40px;
  transition: opacity 0.25s;
  color: inherit;
  background: url('../images/logo.svg') no-repeat center center;
  background-size: 120px 40px;
  position: absolute;
}

.dark {
  .VPNavBarTitle {
    background: url('../images/logo_dark.svg') no-repeat center center;
  }
}

.VPNavBarTitle:hover {
  opacity: 0.6;
}

.logo {
  position: relative;
}

.logo + .text {
  padding-left: 8px;
}

.text {
  font-size: 18px;
  font-weight: 500;
}
.vi {
  transform: rotate(45deg);
  background-color: var(--vt-c-brand);
  background-image: -webkit-radial-gradient(
    0% 0%,
    circle,
    #f96,
    var(--vt-c-brand) 50%
  );
  width: 24px;
  height: 24px;
  border-radius: 50%;
  text-align: center;
  display: flex;
  color: #fff;
  line-height: 24px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-right: 8px;
}
.vi:before {
  content: 'S';
  font-family: tahoma;
  font-weight: 900;
  font-size: 32px;
}
</style>
