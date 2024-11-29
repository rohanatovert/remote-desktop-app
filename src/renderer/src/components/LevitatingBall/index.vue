<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { Operation } from '@element-plus/icons-vue';
import { ConnectionType } from '@renderer/type';

const props = defineProps<{
  userId: string;
  remoteId: string;
  startTime: number;
  connectionType: ConnectionType;
}>();
const emit = defineEmits<{
  (e: 'handleDisconnect'): void;
}>();

const isClient = props.connectionType === ConnectionType.Client;
const dialogVisible = ref(isClient);
const continueTime = ref(0);
let timer: ReturnType<typeof setTimeout> | null = null;

const handleBallClick: () => void = () => {
  dialogVisible.value = true;
};
const handleDisconnect: () => void = () => {
  dialogVisible.value = false;
  emit('handleDisconnect');
};
const updateTimer = () => {
  continueTime.value = continueTime.value + 1000;
  timer = setTimeout(updateTimer, 1000 - (Date.now() - (props.startTime + continueTime.value)));
};

onMounted(() => {
  timer = setTimeout(updateTimer, 1000 - (Date.now() - (props.startTime + continueTime.value)));
});
onBeforeUnmount(() => {
  clearTimeout(timer!);
});
</script>

<template>
  <div class="container">
    <div class="levitating-ball" @click.stop.prevent="handleBallClick">
      <el-icon :size="30" color="#e3e3e3"><Operation /></el-icon>
    </div>
    <el-dialog
      v-model="dialogVisible"
      title="连接详情"
      width="450px"
      align-center
      :close-on-click-modal="!isClient"
      :close-on-press-escape="!isClient"
      :show-close="!isClient"
    >
      <div class="dialog-body">
        <el-text class="mx-1">你的连接ID：{{ userId }}</el-text>
        <el-text class="mx-1">远程连接ID：{{ remoteId }}</el-text>
        <el-text class="mx-1">连接开始时间：{{ new Date(startTime).toLocaleString() }}</el-text>
        <el-text class="mx-1"
          >连接持续时长：{{
            new Date(continueTime).toLocaleTimeString(undefined, { timeZone: 'UTC' })
          }}</el-text
        >
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="danger" round @click="handleDisconnect">断开连接</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped>
.levitating-ball {
  border-radius: 20px;
  position: fixed;
  z-index: 1;
  top: 20px;
  right: 20px;
  cursor: pointer;
}
.dialog-body {
  display: flex;
  flex-direction: column;

  .el-text {
    align-self: start;
    line-height: 30px;
    margin-left: 20px;
  }
}
</style>
