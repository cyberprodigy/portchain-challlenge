/* eslint-disable @typescript-eslint/no-explicit-any */
import { Call, parseCall } from './Call';
import { Vessel } from './Vessel';
export type Schedule = {
  vessel: Vessel;
  portCalls: Call[];
};

export function parseSchedule(jsonSchedule: any): Schedule {
  return {
    ...jsonSchedule,
    portCalls: jsonSchedule.portCalls.map((call: any) => parseCall(call)),
  };
}
