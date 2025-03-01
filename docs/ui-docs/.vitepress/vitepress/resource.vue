<template>
  <div class="home-page">
    <div class="page-resource">
      <h1>资源</h1>
      <div class="desc">
        更多设计资源正在处于迭代优化状态。
        <a
          href="https://mastergo.sf-express.com/file/103867484226998?page_id=M&shareId=103867484226998"
          target="_blank"
        >
          WEB通用组件库 v3.0 Beta (在线版)
        </a>
      </div>
      <br />
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card>
            <img src="/images/resource-1.png" />
            <h2 class="title">Token标注</h2>
            <div class="desc">数据录入</div>
            <el-button type="primary" @click="handleDownload('sketch-f')"
              >下载（0428版本）</el-button
            >
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <img src="/images/resource-1.png" />
            <h2 class="title">Token标注</h2>
            <div class="desc">反馈与其他</div>
            <el-button type="primary" @click="handleDownload('sketch-g')"
              >下载（0512版本）</el-button
            >
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <img src="/images/resource-1.png" />
            <h2 class="title">Token标注</h2>
            <div class="desc">导航与通用</div>
            <el-button type="primary" @click="handleDownload('sketch-h')"
              >下载（0512版本）</el-button
            >
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <img src="/images/resource-1.png" />
            <h2 class="title">Token标注</h2>
            <div class="desc">数据展示</div>
            <el-button type="primary" @click="handleDownload('sketch-i')"
              >下载（0512版本）</el-button
            >
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <img src="/images/resource-1.png" />
            <h2 class="title">Sketch Template</h2>
            <div class="desc">通用组件规范</div>
            <el-button
              type="primary"
              @click="handleDownload('UED-WEB通用组件规范-v2.5.sketch')"
              >下载（V2.5）</el-button
            >
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <img src="/images/resource-2.png" />
            <h2 class="title">PDF</h2>
            <div class="desc">通用组件规范</div>
            <el-button
              type="primary"
              @click="handleDownload('UED-WEB通用组件规范-v2.5.pdf')"
              >下载（V2.5）</el-button
            >
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
const handleDownload = (type: string) => {
  const domain =
    'https://sdesign-esg-ascp-ai-shenzhen-xili1-oss.sit.sf-express.com/v1/AUTH_sdesign-ESG-ASCP-AI/resources';
  switch (type) {
    case 'sketch-f':
      window.location.href = domain + '/ued/WEB组件-数据录入-0428-HTML版.zip';
      break;
    case 'sketch-g':
      window.location.href = domain + '/ued/WEB组件-反馈与其他-0512-HTML版.zip';
      break;
    case 'sketch-h':
      window.location.href = domain + '/ued/WEB组件-导航与通用-0512-HTML版.zip';
      break;
    case 'sketch-i':
      window.location.href = domain + '/ued/WEB组件-数据展示-0512-HTML版.zip';
      break;
    default:
      window.location.href = domain + '/ued/' + type;
      break;
  }
};
</script>

<style lang="scss" scoped>
.home-page {
  padding: 40px;
  .page-resource {
    box-sizing: border-box;
    margin: 0 auto;
    max-width: 1400px;
    padding-top: 55px;
    padding-bottom: 80px;
    .desc {
      color: var(--sdesign-font-color-3);
    }
    :deep(.el-card__body) {
      text-align: center;
      .title,
      .desc {
        margin-bottom: 16px;
      }
      img {
        margin: auto;
      }
    }
    .el-col {
      margin-bottom: 16px;
      img {
        width: 60px;
        height: 60px;
      }
    }
  }
  h1 {
    margin-bottom: 24px;
    font-size: 2.2rem;
  }
}
</style>
