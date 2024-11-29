import { ElectronAPI } from '@electron-toolkit/preload';
import { IApi } from './type';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: IApi;
  }
}
