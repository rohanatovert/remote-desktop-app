import { IMouseData, IKeyData, IScrollData } from './type';

export const getMouseData = (event: MouseEvent) => {
  const video = event.target as HTMLVideoElement;
  let button = 'left';
  if (event.buttons === 4) {
    button = 'middle';
  } else if (event.buttons === 2) {
    button = 'right';
  }
  let type = 'down';
  if (event.type === 'mouseup') {
    type = 'up';
  } else if (event.type === 'mousemove') {
    type = 'move';
  }
  const data: IMouseData = {
    offset: {
      x: event.offsetX,
      y: event.offsetY,
    },
    video: {
      width: video.offsetWidth,
      height: video.offsetHeight,
    },
    type,
    button,
    isDrag: false,
  };
  return data;
};

export const getScrollData = (event: WheelEvent) => {
  // stackoverflow上边看的黑魔法，测了一下好像是可以用
  const isTouchPad = Number.isInteger(event.deltaY) && Number.isInteger(event.deltaX);
  const data: IScrollData = {
    deltaX: isTouchPad ? -event.deltaX : event.deltaX,
    deltaY: isTouchPad ? -event.deltaY : event.deltaY,
  };
  return data;
};

export const getKeyData = (event: KeyboardEvent) => {
  const type = event.type === 'keydown' ? 'down' : 'up';
  const data: IKeyData = {
    key: event.key.toLowerCase(),
    isMac: window.navigator.userAgent.includes('mac'),
    shift: event.shiftKey,
    meta: event.metaKey,
    ctrl: event.ctrlKey,
    alt: event.altKey,
    type,
  };
  return data;
};
