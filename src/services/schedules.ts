/* eslint-disable @typescript-eslint/no-explicit-any */
import 'isomorphic-fetch';
import { injectable } from 'tsyringe';

import { parseSchedule, Schedule } from '../types/Schedule';

const API_BASE = process.env.PORTCHAIN_API_BASE_URL;

@injectable()
export class SchedulesService {
  async getSchedule(vesselImo: number): Promise<Schedule> {
    const apiResponse = await fetch(`${API_BASE}/schedule/${vesselImo}`);
    const json = await apiResponse.json();
    const schedule = parseSchedule(json);

    return schedule;
  }
}
