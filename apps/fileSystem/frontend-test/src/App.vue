<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

// 文件列表
const fileList = ref([])

// 下载文件name
const downLoadFileName = ref('')

const handleQueryFileList = async ()=>{
  try {
    const response = await axios.get('http://localhost:8080/list');
    fileList.value = response.data
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

const handleDownLoad = async ()=>{
  try {
    const response = await axios.get('http://localhost:8080/download', {
      params: {
        name: downLoadFileName.value
      },
      responseType: 'blob', 
    });
    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = downLoadFileName.value; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl); 
  } catch (error) {
    console.error(error);
  }
}

onMounted(()=>{
  handleQueryFileList()
})
</script>

<template>
  <div class="PageMain">
    <header class="header">测试文件上传接口-upload</header>
    <div class="content">
      <el-upload
        class="upload-demo"
        drag
        action="http://localhost:8080/upload"
        name="file"
        :auto-upload="true"
        :show-file-list="true"
        @success="handleQueryFileList"
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">
          将文件拖到此处，或 <em>点击上传</em>
        </div>
      </el-upload> 
    </div>
  </div>
  <div class="PageMain">
    <header class="header">测试查询文件列表接口-list</header>
    <div class="content">
      <div style="display: flex; align-items: center ;">
        <span style="width: 50%">文件列表结果</span>       
        <el-button @click="handleQueryFileList">查询文件列表</el-button>
      </div>
      <ul>
        <li v-for="(fileName, index) in fileList" :key="index">{{ fileName }}</li>
      </ul>
    </div>
  </div>
  <div class="PageMain">
    <header class="header">测试下载文件接口-download</header>
    <div class="content" style="display: flex;">
      <el-input v-model="downLoadFileName"></el-input>
      <el-button @click="handleDownLoad">下载</el-button>
    </div>
  </div>
</template>

<style scoped>
  .PageMain {
    position: relative;
    flex-direction: column;
    display: flex;
    background-color: #fff;
    border-radius: 5px;
    margin: 10px;
    box-sizing: border-box;
  }

  .PageMain .header {
    display: flex;
    align-items: center;
    height: 56px;
    padding: 0 20px;
    border-bottom: 1px solid #e0e0e0;
    font-size: 20px;
    font-weight: 500;
    line-height: 22px;

  }

  .PageMain .content {
    position: relative;
    flex: 1;
    padding: 20px 20px 20px 20px;
  }
</style>
