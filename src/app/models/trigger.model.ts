/*
 * Trigger view model.
 *
 * @author Michel Megens
 * @email  dev@bietje.net
 */

export class TriggerAction {
  public channel: number;
  public target: string;
  public message: string;
}

export enum TriggerActionChannel {
  Email,
  SMS,
  MQTT,
  HttpPost,
  HttpGet,
  ControlMessage
}

export class TriggerInvocation {
  public id: number;
  public triggerId: number;
  public timestamp: Date;
}

export class Trigger {
  public id: Number;
  public lowerEdge: Number;
  public upperEdge: Number;
  public keyValue: string;
  public sensorId: string;

  public actions: TriggerAction[];
  public invocations: TriggerInvocation[];
}