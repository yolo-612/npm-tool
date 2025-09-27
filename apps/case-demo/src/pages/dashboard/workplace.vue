<route lang="json5">
{
  name: "workplace",
  meta: {
    title: "工作台",
    permission: ["*"],
    order: 100,
    icon: 'HomeFilled',
  }
}
</route>
<template>
  <PageMain title='首页' :async-data='asyncData'>
    <p>
      采用统一的web的模板：<br/><br/>
      具体配置：文件系统路由 + 菜单baseOn：frontend + 菜单侧边：side 
    </p>
    <button @click="handleClick">test</button>
  </PageMain>
</template>

<script setup>
// cookie添加了 还在本地 带不过去
const handleClick = ()=>{
  const data = {
    "note_id": "68c2c278000000001d01d201",
    "content": "学到了，感谢",
    "at_users": []
  }
  const myHeaders = new Headers({
    "accept": 'application/json, text/plain, */*',
    "accept-encoding": 'gzip, deflate, br, zstd',
    "accept-language": 'zh,en;q=0.9,zh-CN;q=0.8',
    "cookie": 'abRequestId=c103f9d9-bed4-5950-99ab-c7c624b8d2a1; xsecappid=xhs-pc-web; a1=19943222f3e7b3ajknh3ln83udnpime9jwu46rly850000375269; webId=93f73a382f29688d24cd39c2afb68715; gid=yjj4qJJq4iVjyjj4qJJJiEF1qdWDq0VTIxq17vYIYq7fI428U36djK888qW2JKj8d2WqyW0i; webBuild=4.81.0; loadts=1758958798065; acw_tc=0ad59b0c17589587983547487e4e3b64b2cc8d7cef26698cba2982b6db02b6; websectiga=82e85efc5500b609ac1166aaf086ff8aa4261153a448ef0be5b17417e4512f28; sec_poison_id=30f28ec4-a198-4fb6-9c4d-b050d8afa98c; web_session=040069b54682116bbc658fdce23a4be7601bad; unread={%22ub%22:%2268d749590000000013008874%22%2C%22ue%22:%2268d5fd74000000001300daa3%22%2C%22uc%22:23}'
  });
  fetch('https://edith.xiaohongshu.com/api/sns/web/v1/comment/post', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: myHeaders
  }).then((res)=>{
    console.log(res)
  }).catch((err)=>{console.log(err)})
}

</script>

<style lang='scss' scoped>
</style>
