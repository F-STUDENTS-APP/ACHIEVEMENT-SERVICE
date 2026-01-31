import { Request, Response } from 'express';

interface RequestWithUser extends Request {
  user?: {
    id: string;
    username?: string;
    roles?: string[];
    name?: string;
  };
}

export const mockRequest = (data: Partial<RequestWithUser> = {}): Partial<RequestWithUser> => {
  return {
    body: {},
    params: {},
    query: {},
    headers: {},
    ip: '127.0.0.1',
    user: undefined,
    ...data,
  } as Partial<RequestWithUser>;
};

export const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  };
  return res;
};

export const mockPrismaClient: any = {
  achievement: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    count: jest.fn(),
  },
  achievementApprovalHistory: {
    create: jest.fn(),
  },
  $transaction: jest.fn((operations: any) => Promise.all(operations)),
};

export const mockAchievement = {
  id: 'achievement-123',
  studentId: 'student-123',
  studentName: 'Ahmad Fauzi',
  studentNisn: '0012345678',
  title: 'Juara 1 Olimpiade Matematika',
  categoryCode: 'OLIMPIADE_MATEMATIKA',
  categoryName: 'Olimpiade Matematika',
  points: 50,
  basePoints: 50,
  status: 'PENDING',
  isActive: true,
  achievementDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const resetAllMocks = () => {
  Object.values(mockPrismaClient).forEach((model: any) => {
    if (typeof model === 'object') {
      Object.values(model).forEach((method: any) => {
        if (typeof method?.mockReset === 'function') {
          method.mockReset();
        }
      });
    }
  });
};
