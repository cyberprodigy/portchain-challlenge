import { container } from 'tsyringe';

import { Tokens } from '../config/Tokens';
import { SchedulesService } from '../services/schedules';
import { VesselsService } from '../services/vessels';
import { Call } from '../types/Call';
import { Port } from '../types/Port';

type PortWithNumberOfCalls = Port & { numberOfCalls: number };

async function getMostBusyPorts(limit?: number) {
  let portWithNumberOfCalls = await getPortsWithNumberOfCalls();

  portWithNumberOfCalls = sortPortsByNumberOfCalls(portWithNumberOfCalls);

  if (limit && limit > 0) {
    portWithNumberOfCalls = portWithNumberOfCalls.slice(0, limit);
  }

  return portWithNumberOfCalls;
}

async function getLeastBusyPorts(limit?: number) {
  let portWithNumberOfCalls = await getPortsWithNumberOfCalls();

  portWithNumberOfCalls = sortPortsByNumberOfCalls(portWithNumberOfCalls);

  if (limit && limit > 0) {
    portWithNumberOfCalls = portWithNumberOfCalls.slice(limit * -1);
  }

  return portWithNumberOfCalls;
}

async function getDurationPercentiles(percentiles: number[]) {
  const durations: { percentile: number; duration: number }[] = [];
  const portCalls = await getAllCalls();
  for (const percentile of percentiles) {
    const durationMs = await getDurationPercentile(percentile, portCalls);
    const durationHours = durationMs / 1000 / 60 / 60;
    durations.push({ percentile, duration: durationHours });
  }

  return durations;
}
async function getDurationPercentile(percentile: number, portCalls: Call[]) {
  if (percentile < 0 || percentile > 1) {
    throw new Error(`Percentile must be between 0 and 1, was ${percentile}`);
  }

  const durations = portCalls.map(
    (call) => call.departure.getTime() - call.arrival.getTime()
  );
  const sortedDurations = durations.sort((a, b) => a - b);
  const index = Math.min(
    Math.floor(sortedDurations.length * percentile),
    sortedDurations.length - 1
  );

  return sortedDurations[index];
}

async function getAllCalls(filterOmitted: boolean = true) {
  const vesselsService: VesselsService = container.resolve(
    Tokens.VesselsService
  );
  const schedulesService: SchedulesService = container.resolve(
    Tokens.SchedulesService
  );
  const vessels = await vesselsService.getVessels();
  const vesselImos = vessels.map((vessel) => vessel.imo);

  const schedulesPromises = vesselImos.map((imo) =>
    schedulesService.getSchedule(imo)
  );
  const schedules = await Promise.all(schedulesPromises);

  const calls = schedules.reduce((acc, schedule) => {
    return [...acc, ...schedule.portCalls];
  }, [] as Call[]);

  if (filterOmitted) {
    return calls.filter((call) => !call.isOmitted);
  }

  return calls;
}

async function getPortsWithNumberOfCalls() {
  const portWithNumberOfCalls: PortWithNumberOfCalls[] = [];
  const portCalls = await getAllCalls();
  portCalls.forEach((call: Call) => {
    if (!call.isOmitted) {
      incrementPortCall(portWithNumberOfCalls, call.port);
    }
  });

  return portWithNumberOfCalls;
}

function incrementPortCall(
  ports: PortWithNumberOfCalls[],
  portToIncrement: Port
) {
  const port = findPortById(ports, portToIncrement.id as string);
  if (port) {
    port.numberOfCalls++;
  } else {
    ports.push({
      ...portToIncrement,
      numberOfCalls: 1,
    });
  }
}

function findPortById(ports: PortWithNumberOfCalls[], id: string) {
  return ports.find((port) => port.id === id);
}

function sortPortsByNumberOfCalls(
  ports: PortWithNumberOfCalls[],
  ascending: boolean = false
) {
  return ports.sort((a, b) => {
    if (ascending) {
      return a.numberOfCalls - b.numberOfCalls;
    } else {
      return b.numberOfCalls - a.numberOfCalls;
    }
  });
}

export { getMostBusyPorts, getLeastBusyPorts, getDurationPercentiles };
