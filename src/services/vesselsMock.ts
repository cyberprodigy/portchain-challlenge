/* eslint-disable @typescript-eslint/no-explicit-any */
import { injectable } from 'tsyringe';

import { Vessel } from '../types/Vessel';

const mockData = [
  { imo: 9303807, name: 'ABIDJAN EXPRESS' },
  { imo: 9314935, name: 'AS CAROLINA' },
  { imo: 9335173, name: 'COSCO BOSTON' },
  { imo: 9337626, name: 'NYK CONSTELLATION' },
  { imo: 9387425, name: 'EMPIRE' },
  { imo: 9388340, name: 'ONE COSMOS' },
  { imo: 9461867, name: 'APL CHONGQING' },
  { imo: 9485007, name: 'YM MASCULINITY' },
  { imo: 9597549, name: 'APL MIAMI' },
  { imo: 9732319, name: 'AL MASHRAB' },
  { imo: 9757187, name: 'MILANO BRIDGE' },
  { imo: 9769271, name: 'MOL TRIUMPH' },
];
@injectable()
export class VesselsServiceMock {
  async getVessels(): Promise<Vessel[]> {
    return mockData;
  }
}
