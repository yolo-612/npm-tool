<script setup lang="ts">
import { reactive } from 'vue'
const type = reactive([])

const props = defineProps({
  subfixTxt: {
    type: String,
    default: ''
  }
})
</script>
<template>
  <el-checkbox-group v-model="type">
    <el-checkbox value="Online activities" name="type">
      Online {{ subfixTxt }}
    </el-checkbox>
    <el-checkbox value="Promotion activities" name="type">
      Promotion {{ subfixTxt }}
    </el-checkbox>
    <el-checkbox value="Offline activities" name="type">
      Offline {{ subfixTxt }}
    </el-checkbox>
    <el-checkbox value="Simple brand exposure" name="type">
      Simple brand {{ subfixTxt }}
    </el-checkbox>
  </el-checkbox-group>
</template>
