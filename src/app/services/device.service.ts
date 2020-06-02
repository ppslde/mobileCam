import { Injectable } from '@angular/core';
import { Device } from '../models/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor() { }

  public getDevices(): Promise<Array<Device>> {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices.enumerateDevices().then(infos => {
        resolve(infos.map(i => new Device(i.deviceId, i.label, this.isInputType(i.kind), this.isVideoType(i.kind))));
      }).catch(error => {
        reject(error);
      });
    });
  }

  private isInputType(kind: MediaDeviceKind): boolean {
    if (kind === 'audioinput' || kind === 'videoinput') {
      return true;
    }
    return false;
  }

  private isVideoType(kind: MediaDeviceKind): boolean {
    if (kind === 'videoinput') {
      return true;
    }
    return false;
  }
}
