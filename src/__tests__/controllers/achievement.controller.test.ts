import {
  getAchievements,
  getAchievementById,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from '../../controllers/achievement.controller';
import {
  mockRequest,
  mockResponse,
  mockPrismaClient,
  mockAchievement,
  resetAllMocks,
} from '../utils/test-helpers';

jest.mock('../../config/prisma', () => {
  const { mockPrismaClient } = require('../utils/test-helpers');
  return {
    __esModule: true,
    default: mockPrismaClient,
  };
});

describe('Achievement Controller', () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    resetAllMocks();
    jest.clearAllMocks();
  });

  describe('getAchievements', () => {
    it('should return paginated list of achievements', async () => {
      req.headers = { 'x-paging-offset': '0', 'x-paging-limit': '25' };

      mockPrismaClient.achievement.findMany.mockResolvedValue([mockAchievement]);
      mockPrismaClient.achievement.count.mockResolvedValue(1);

      await getAchievements(req, res);

      expect(mockPrismaClient.achievement.findMany).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          data: expect.objectContaining({ items: [mockAchievement] }),
        })
      );
    });

    it('should filter by search term', async () => {
      req.headers = { 'x-paging-search': 'Test' };

      mockPrismaClient.achievement.findMany.mockResolvedValue([]);
      mockPrismaClient.achievement.count.mockResolvedValue(0);

      await getAchievements(req, res);

      const call = mockPrismaClient.achievement.findMany.mock.calls[0][0];
      expect(call.where.OR).toBeDefined();
    });
  });

  describe('createAchievement', () => {
    it('should create new achievement', async () => {
      req.body = {
        studentId: '123e4567-e89b-12d3-a456-426614174000',
        categoryId: '123e4567-e89b-12d3-a456-426614174001',
        title: 'Math Olympic Winner',
        description: 'Won the first place in math olympics at district level',
        level: 'KABUPATEN',
        academicYear: '2023/2024',
        semester: 1,
        achievementDate: new Date().toISOString(),
      };

      req.user = { id: 'teacher-123', name: 'Teacher', roles: ['GURU'] };

      mockPrismaClient.achievement.create.mockResolvedValue({ ...mockAchievement, ...req.body });
      mockPrismaClient.achievementApprovalHistory.create.mockResolvedValue({});

      await createAchievement(req, res);

      expect(mockPrismaClient.achievement.create).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should return 400 on validation error', async () => {
      req.body = {}; // Invalid
      await createAchievement(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('updateAchievement', () => {
    it('should update achievement if PENDING', async () => {
      req.params = { id: 'achievement-123' };
      req.body = { title: 'Updated Title' };

      mockPrismaClient.achievement.findUnique.mockResolvedValue(mockAchievement);
      mockPrismaClient.achievement.update.mockResolvedValue({
        ...mockAchievement,
        title: 'Updated Title',
      });

      await updateAchievement(req, res);

      expect(mockPrismaClient.achievement.update).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should return 400 if not PENDING', async () => {
      req.params = { id: 'achievement-123' };
      mockPrismaClient.achievement.findUnique.mockResolvedValue({
        ...mockAchievement,
        status: 'APPROVED',
      });

      await updateAchievement(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('deleteAchievement', () => {
    it('should soft delete achievement', async () => {
      req.params = { id: 'achievement-123' };
      mockPrismaClient.achievement.update.mockResolvedValue({});

      await deleteAchievement(req, res);

      expect(mockPrismaClient.achievement.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'achievement-123' },
          data: expect.objectContaining({ isActive: false }),
        })
      );
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
