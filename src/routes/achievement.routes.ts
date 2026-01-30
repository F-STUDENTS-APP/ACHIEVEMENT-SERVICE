import { Router } from 'express';
import * as achievementController from '../controllers/achievement.controller';
import * as approvalController from '../controllers/approval.controller';
import * as recognitionController from '../controllers/recognition.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticate, achievementController.getAchievements);

router.post('/', authenticate, achievementController.createAchievement);

router.get('/:id', authenticate, achievementController.getAchievementById);

router.put('/:id', authenticate, achievementController.updateAchievement);

router.delete('/:id', authenticate, achievementController.deleteAchievement);

router.post('/:id/approve', authenticate, authorize(['BK']), approvalController.approveAchievement);

router.post('/:id/reject', authenticate, authorize(['BK']), approvalController.rejectAchievement);

router.get('/hall-of-fame', authenticate, recognitionController.getHallOfFame);

router.get('/stats/summary', authenticate, recognitionController.getStatsSummary);

export default router;
