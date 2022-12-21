import 'dotenv/config';
import 'reflect-metadata';
import {
  getDurationPercentiles,
  getLeastBusyPorts,
  getMostBusyPorts,
} from './ports';

describe('Test Percentiles', () => {
  test('should return correct value for percentile', () => {
    return expect(getDurationPercentiles([0.05, 0.5, 0.9])).resolves.toEqual([
      { duration: 12.4, percentile: 0.05 },
      { duration: 21.75, percentile: 0.5 },
      { duration: 32.9, percentile: 0.9 },
    ]);
  });

  test('should throw on too negative input', () => {
    return expect(getDurationPercentiles([-1])).rejects.toThrow();
  });

  test('should throw on too >1 input', () => {
    return expect(getDurationPercentiles([1.1])).rejects.toThrow();
  });
});

describe('Port busyness', () => {
  test('should return 3 least used ports', async () => {
    const leastBusyPorts = await getLeastBusyPorts(3);

    return expect(leastBusyPorts.map((port) => port.id)).toEqual([
      'MACAS',
      'GHTEM',
      'CIABJ',
    ]);
  });

  test('should return 3 most used ports', async () => {
    const mostBusyPorts = await getMostBusyPorts(3);

    return expect(mostBusyPorts.map((port) => port.id)).toEqual([
      'MAPTM',
      'BEANR',
      'DEHAM',
    ]);
  });
});
