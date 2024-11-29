<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { getMouseData, getScrollData, getKeyData } from './util';
import { IKeyData, IScrollData, IMouseData } from './type';
import { throttle } from 'lodash';

defineProps<{
  videoSrcObject: object;
}>();
const emit = defineEmits<{
  (e: 'handleMouse', data: IMouseData): void;
  (e: 'handleScroll', data: IScrollData): void;
  (e: 'handleKey', data: IKeyData): void;
}>();

const video = ref<HTMLVideoElement>();
const videoLoading = ref(true);
const clickStartTime = ref(Date.now());

const cancelLoading = () => {
  videoLoading.value = false;
};
const handleMouse = (event: MouseEvent) => {
  const data = getMouseData(event);
  if (data.type === 'down') {
    clickStartTime.value = Date.now();
  } else if (data.type === 'up') {
    data.isDrag = Date.now() - clickStartTime.value > 200;
  }
  emit('handleMouse', data);
};
const handleScroll = throttle((event: WheelEvent) => {
  const data = getScrollData(event);
  emit('handleScroll', data);
}, 50);
const handleKey = (event: KeyboardEvent) => {
  const data = getKeyData(event);
  emit('handleKey', data);
};
const handleMousemove = throttle(handleMouse, 50);

onMounted(() => {
  video.value?.addEventListener('canplaythrough', cancelLoading, { once: true });
  video.value?.addEventListener('mousedown', handleMouse);
  video.value?.addEventListener('mouseup', handleMouse);
  video.value?.addEventListener('mousemove', handleMousemove);
  document.addEventListener('wheel', handleScroll);
  document.addEventListener('keydown', handleKey);
  document.addEventListener('keyup', handleKey);
});
onBeforeUnmount(() => {
  video.value?.removeEventListener('mousedown', handleMouse);
  video.value?.removeEventListener('mouseup', handleMouse);
  video.value?.removeEventListener('mousemove', handleMousemove);
  document.removeEventListener('wheel', handleScroll);
  document.removeEventListener('keydown', handleKey);
  document.removeEventListener('keyup', handleKey);
});
</script>

<template>
  <div class="container">
    <div v-loading="videoLoading" element-loading-background="#2f3241" class="remote-window">
      <video id="remote-video" ref="video" :srcObject="videoSrcObject" autoplay></video>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #2f3241;
}

.remote-window {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#remote-video {
  width: 100%;
  max-width: 100%;
  max-height: 100%;
}
</style>
