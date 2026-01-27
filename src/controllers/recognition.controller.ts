import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { sendResponse } from '../utils/response';

export const getHallOfFame = async (req: Request, res: Response) => {
  const academicYear = req.query.academicYear as string;
  const items = await prisma.hallOfFame.findMany({
    where: {
      isActive: true,
      ...(academicYear && { academicYear }),
    },
    orderBy: [{ level: 'desc' }, { achievementDate: 'desc' }],
  });
  return sendResponse(res, 200, true, 'Hall of Fame retrieved', items);
};

export const getStatsSummary = async (req: Request, res: Response) => {
  const academicYear = req.query.academicYear as string;
  const total = await prisma.achievement.count({
    where: { deletedAt: null, ...(academicYear && { academicYear }) },
  });

  const byStatus = await prisma.achievement.groupBy({
    by: ['status'],
    where: { deletedAt: null, ...(academicYear && { academicYear }) },
    _count: true,
  });

  return sendResponse(res, 200, true, 'Achievement statistics retrieved', {
    total,
    byStatus: byStatus.reduce(
      (acc: any, curr: any) => ({ ...acc, [curr.status]: curr._count }),
      {}
    ),
  });
};
