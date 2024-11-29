<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

const props = defineProps<{
  userId: string;
}>();
const emit = defineEmits<{
  (e: 'handleConnect', remoteId: string): void;
}>();

const remoteId = ref('');
const tipsContent = ref('点击复制');

const handleConnect = () => {
  if (remoteId.value === props.userId) {
    ElMessage.closeAll();
    ElMessage.error('不能使用自己的ID');
    return;
  }
  if (remoteId.value === '') {
    ElMessage.closeAll();
    ElMessage.error('请输入ID');
    return;
  }
  emit('handleConnect', remoteId.value);
};
const handleCopy = (event: MouseEvent) => {
  try {
    navigator.clipboard.writeText(props.userId);
    tipsContent.value = '已复制';
  } catch (error) {
    console.log(error);
  }
  event.target?.addEventListener(
    'mouseleave',
    () => {
      setTimeout(() => {
        tipsContent.value = '点击复制';
      }, 300);
    },
    {
      once: true,
    },
  );
};
</script>

<template>
  <el-container>
    <el-main>
      <div class="tips">
        <el-text class="mx-1">你的连接ID：</el-text>
        <el-tooltip class="box-item" effect="dark" :content="tipsContent" placement="top">
          <el-text class="mx-1" style="cursor: pointer" @click="handleCopy">{{ userId }}</el-text>
        </el-tooltip>
      </div>
      <el-input v-model="remoteId" placeholder="请输入受控端ID" @keyup.enter="handleConnect" />
    </el-main>
    <el-footer>
      <el-text class="mx-1">powered by zhaojie</el-text>
    </el-footer>
  </el-container>
</template>

<style lang="less" scoped>
.el-container {
  height: 100%;
  background-image: url(../../assets/backgroundImage.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
.el-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .tips {
    margin-bottom: 20px;
  }

  .el-text {
    color: #f3f3f3;
    font-size: 24px;
  }
}
.el-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-input {
  max-width: 560px;
  height: 44px;
  border-radius: 50px;
  overflow: hidden;
}
:deep(.el-input__wrapper) {
  box-shadow: none;
}
:deep(.el-input__inner) {
  color: black;
  font-size: 16px;
  margin: 0 15px;
}
</style>
