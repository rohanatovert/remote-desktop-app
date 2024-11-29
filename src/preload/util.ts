import { DesktopCapturerSource } from 'electron';

export async function getStreamBySources(sources: DesktopCapturerSource[]) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        // @ts-ignore electron不支持
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: sources[0].id,
        },
      },
    });
    return stream;
  } catch (e) {
    console.log(e);
    return null;
  }
}
