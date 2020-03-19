/*
 * WebSocket service.
 *
 * @author Michel Megens
 * @email  michel@michelmegens.net
 */

import {WebSocketService} from './websocket.service';
import {Injectable} from '@angular/core';
import {LoginService} from './login.service';
import {ISensorAuth, IWebSocketRequest} from '../models/realtimedata.model';
import {Sensor} from '../models/sensor.model';
import sha256 from 'crypto-js/sha256';

@Injectable()
export class RealTimeDataService {
  public constructor(private readonly socket: WebSocketService, private loginService: LoginService) {
  }

  public connect(url: string) {
    this.socket.connect(url).then(() => {
      const authRequest: IWebSocketRequest<string> = {
        data: this.loginService.getJwtToken(),
        request: "auth"
      };

      this.socket.send(authRequest);
    });
  }

  public subcribeMany(sensors: Sensor[]) {
    sensors.forEach(sensor => this.subscribe(sensor));
  }

  public unsubscribeMany(sensors: Sensor[]) {
    sensors.forEach(sensor => this.unsubscribe(sensor));
  }

  public subscribe(sensor: Sensor) {
    const request: ISensorAuth = {
      sensorId: sensor.internalId.toString(),
      sensorSecret: sensor.secret,
      timestamp: new Date().toISOString()
    };


    const hash = sha256(JSON.stringify(request));
    request.sensorSecret = hash.toString();

    const subscribeRequest: IWebSocketRequest<ISensorAuth> = {
      request: "subscribe",
      data: request
    };

    this.socket.send(subscribeRequest);
  }

  public unsubscribe(sensor: Sensor) {
    const request: ISensorAuth = {
      sensorId: sensor.internalId.toString(),
      sensorSecret: sensor.secret,
      timestamp: new Date().toISOString()
    };

    const hash = sha256(JSON.stringify(request));
    request.sensorSecret = hash.toString();

    const subscribeRequest: IWebSocketRequest<ISensorAuth> = {
      request: "unsubscribe",
      data: request
    };

    this.socket.send(subscribeRequest);
  }

  public onMessage() {
    return this.socket.onMessage();
  }

  public disconnect() {
    this.socket.disconnect();
  }

  public isConnected() {
    return this.socket.isConnected();
  }
}