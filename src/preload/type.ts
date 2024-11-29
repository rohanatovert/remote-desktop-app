import { IKeyData, IMouseData, IScrollData } from '../main/type';

export interface IApi {
  getMediaStream: () => Promise<MediaStream | null>;
  doMouse: (data: IMouseData) => void;
  doScroll: (data: IScrollData) => void;
  doKey: (data: IKeyData) => void;
}
