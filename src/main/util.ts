import { desktopCapturer } from 'electron';
import { IKeyData, IMouseData, IScrollData } from './type';
import robot from 'robotjs';

export const getDesktopCaptureSource = async () => {
  const sources = await desktopCapturer.getSources({
    types: ['screen'],
    thumbnailSize: {
      height: 300,
      width: 300,
    },
    fetchWindowIcons: true,
  });

  return sources;
};

export const doMouse = (data: IMouseData) => {
  const { offset, video, type, button, isDrag } = data;
  // 这里用robotjs拿到屏幕尺寸才对，其他方法会有各种兼容性问题
  const x: number = (offset.x / video.width) * robot.getScreenSize().width;
  const y: number = (offset.y / video.height) * robot.getScreenSize().height;
  if (isDrag) {
    robot.dragMouse(x, y);
  } else {
    robot.moveMouse(x, y);
  }
  if (type !== 'move') {
    robot.mouseToggle(type, button);
  }
};

export const doScroll = (data: IScrollData) => {
  const { deltaX, deltaY } = data;
  robot.scrollMouse(deltaX, deltaY);
};

export const doKey = (data: IKeyData) => {
  const modifiers: string[] = [];
  const { type, isMac, shift, ctrl, alt, meta } = data;
  // 对其他系统传到mac的做一下适配
  if (process.platform === 'darwin' && !isMac) {
    if (ctrl) modifiers.push('command');
  } else {
    if (ctrl) modifiers.push('control');
    if (meta) modifiers.push('command');
  }
  if (shift) modifiers.push('shift');
  if (alt) modifiers.push('alt');
  let key = data.key;
  // 一些键特殊处理
  switch (key) {
    case 'meta':
      key = 'command';
      break;
    case 'arrowup':
      key = 'up';
      break;
    case 'arrowdown':
      key = 'down';
      break;
    case 'arrowleft':
      key = 'left';
      break;
    case 'arrowright':
      key = 'right';
      break;
    default:
  }
  try {
    robot.keyToggle(key, type, modifiers);
  } catch (error) {
    console.log(key, error);
  }
};
