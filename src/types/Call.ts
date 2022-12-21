import { convertToDateIfString } from './convertToDateIfString';
import { Port } from './Port';

export type Call = {
  arrival: Date;
  departure: Date;
  createdDate: Date;
  isOmitted: boolean;
  service: string;
  port: Port;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseCall(jsonCall: any): Call {
  return {
    ...jsonCall,
    arrival: convertToDateIfString(jsonCall.arrival),
    departure: convertToDateIfString(jsonCall.departure),
    createdDate: convertToDateIfString(jsonCall.createdDate),
  };
}
