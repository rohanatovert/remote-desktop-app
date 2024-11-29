export interface IMouseData {
  offset: {
    x: number;
    y: number;
  };
  video: {
    width: number;
    height: number;
  };
  type: string;
  button: string;
  isDrag: boolean;
}

export interface IScrollData {
  deltaX: number;
  deltaY: number;
}

export interface IKeyData {
  key: string;
  isMac: boolean;
  meta: boolean;
  alt: boolean;
  ctrl: boolean;
  shift: boolean;
  type: string;
}
