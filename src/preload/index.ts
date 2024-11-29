import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import { getStreamBySources } from './util';
import { IApi } from './type';
import { IKeyData, IMouseData, IScrollData } from '../main/type';

// Custom APIs for renderer
const api: IApi = {
  getMediaStream: async () => {
    const sources = await ipcRenderer.invoke('getDesktopCaptureSource');
    return getStreamBySources(sources);
  },
  doMouse: (data: IMouseData) => {
    ipcRenderer.send('mouse', data);
  },
  doScroll: (data: IScrollData) => {
    ipcRenderer.send('scroll', data);
  },
  doKey: (data: IKeyData) => {
    ipcRenderer.send('key', data);
  },
};

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
