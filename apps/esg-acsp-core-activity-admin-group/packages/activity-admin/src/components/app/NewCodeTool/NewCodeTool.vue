<script setup lang="ts">
import NewCodeToolDialog from './NewCodeToolDialog.vue';

const dialogRef = ref<InstanceType<typeof NewCodeToolDialog>|null>(null);

const handleClickIcon = () => {
  dialogRef.value && dialogRef.value.show();
};
</script>

<template>
  <div id="new-code-tools">
    <button class="new-code-tools-btn" @click="handleClickIcon">
      <span class="sign">
        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9308" width="16" height="16"><path d="M409.6 409.6V102.4a102.4 102.4 0 1 1 204.8 0v307.2h307.2a102.4 102.4 0 1 1 0 204.8H614.4v307.2a102.4 102.4 0 1 1-204.8 0V614.4H102.4a102.4 102.4 0 1 1 0-204.8h307.2z" fill="#dbdbdb" p-id="9309"></path></svg>
      </span>
      <span class="text">创建</span>
    </button>
    <NewCodeToolDialog ref="dialogRef"/>
  </div>
</template>

<style scoped>
#new-code-tools{
  position: fixed;
  bottom: 20px;
  right: -10px;
  line-height: 40px;
  text-align: center;
  z-index: 10;
  cursor: pointer;
}
.new-code-tools-btn{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 35px;
  height: 35px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition-duration: .3s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
  background-color: rgb(255, 65, 65);
}

/* plus sign */
.sign {
  width: 100%;
  transition-duration: .3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sign svg {
  width: 18px;
}

.sign svg path {
  fill: white;
}
/* text */
.text {
  position: absolute;
  right: 0%;
  width: 0%;
  opacity: 0;
  color: white;
  font-size: 1.2em;
  font-weight: 600;
  transition-duration: .3s;
}
/* hover effect on button width */
.new-code-tools-btn:hover {
  width: 125px;
  border-radius: 40px;
  transition-duration: .3s;
}

.new-code-tools-btn:hover .sign {
  width: 30%;
  transition-duration: .3s;
  padding-left: 20px;
}
/* hover effect button's text */
.new-code-tools-btn:hover .text {
  opacity: 1;
  width: 70%;
  transition-duration: .3s;
  padding-right: 10px;
}
/* button click effect*/
.new-code-tools-btn:active {
  transform: translate(2px ,2px);
}
</style>
