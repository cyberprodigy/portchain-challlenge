/* eslint-disable @typescript-eslint/no-explicit-any */
import 'isomorphic-fetch';
import { injectable } from 'tsyringe';

import { Vessel } from '../types/Vessel';

const API_BASE = process.env.PORTCHAIN_API_BASE_URL;

@injectable()
export class VesselsService {
  async getVessels(): Promise<Vessel[]> {
    const apiResponse = await fetch(`${API_BASE}/vessels`);
    const vessel = await apiResponse.json();

    return vessel;
  }
}
