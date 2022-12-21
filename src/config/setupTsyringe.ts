import 'reflect-metadata';
import { SchedulesService } from '../services/schedules';
import { SchedulesServiceMock } from '../services/schedulesMock';
import { VesselsService } from '../services/vessels';
import { VesselsServiceMock } from '../services/vesselsMock';
import { Tokens } from './Tokens';
import { mapClass } from './utils';

if (process.env.NODE_ENV === 'test') {
  mapClass(Tokens.SchedulesService, SchedulesServiceMock);
  mapClass(Tokens.VesselsService, VesselsServiceMock);
} else {
  mapClass(Tokens.SchedulesService, SchedulesService);
  mapClass(Tokens.VesselsService, VesselsService);
}
