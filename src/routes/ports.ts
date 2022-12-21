import express, { Request, Response } from 'express';

import * as portsController from '../controllers/ports';

const router = express.Router();

router.get('/least-busy-ports/:limit?', async (req: Request, res: Response) => {
  const limit: number | undefined = Number(req.params.limit) || 5;

  const portWithNumberOfCalls = await portsController.getLeastBusyPorts(limit);

  res.render('portBusyness', {
    title: 'Least busy ports',
    data: portWithNumberOfCalls,
  });
});

router.get('/most-busy-ports/:limit?', async (req, res) => {
  const limit: number | undefined = Number(req.params.limit) || 5;

  const portWithNumberOfCalls = await portsController.getMostBusyPorts(limit);

  res.render('portBusyness', {
    title: 'Most busy ports',
    data: portWithNumberOfCalls,
  });
});

router.get('/least-busy-ports/:limit?', async (req: Request, res: Response) => {
  const limit: number | undefined = Number(req.params.limit) || 5;

  const portWithNumberOfCalls = await portsController.getLeastBusyPorts(limit);

  res.render('portBusyness', {
    title: 'Least busy ports',
    data: portWithNumberOfCalls,
  });
});

router.get('/duration-percentile/:p?', async (req: Request, res: Response) => {
  const p: string | undefined = req.params.p;
  if (p) {
    res.render('easter');
  }

  const portWithNumberOfCalls = await portsController.getDurationPercentiles([
    0.05, 0.2, 0.5, 0.75, 0.9,
  ]);

  res.render('callDurationPercentile', {
    title: 'Call duration percentile',
    data: portWithNumberOfCalls,
  });
});

export default function () {
  return router;
}
