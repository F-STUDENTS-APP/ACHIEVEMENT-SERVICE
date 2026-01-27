import Joi from 'joi';

export const createAchievementSchema = Joi.object({
  studentId: Joi.string().uuid().required(),
  categoryId: Joi.string().uuid().required(),
  title: Joi.string().min(10).max(200).required(),
  description: Joi.string().min(20).max(2000).required(),
  achievementDate: Joi.date().max('now').required(),
  location: Joi.string().max(200).optional(),
  organizer: Joi.string().max(200).optional(),
  level: Joi.string()
    .valid('SEKOLAH', 'KECAMATAN', 'KABUPATEN', 'PROVINSI', 'NASIONAL', 'INTERNASIONAL')
    .required(),
  rank: Joi.string()
    .valid(
      'JUARA_1',
      'JUARA_2',
      'JUARA_3',
      'HARAPAN_1',
      'HARAPAN_2',
      'HARAPAN_3',
      'FINALIS',
      'PESERTA',
      'LULUS_SELEKSI'
    )
    .optional(),
  isTeamAchievement: Joi.boolean().default(false),
  teamName: Joi.string().max(100).when('isTeamAchievement', {
    is: true,
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  teamMembers: Joi.array().items(Joi.object()).when('isTeamAchievement', {
    is: true,
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  studentRole: Joi.string().max(50).optional(),
  certificateUrl: Joi.string().uri().optional(),
  evidenceUrls: Joi.array().items(Joi.string().uri()).max(10).optional(),
  photoUrls: Joi.array().items(Joi.string().uri()).max(10).optional(),
  academicYear: Joi.string()
    .pattern(/^\d{4}\/\d{4}$/)
    .required(),
  semester: Joi.number().valid(1, 2).required(),
});

export const approveSchema = Joi.object({
  notes: Joi.string().max(500).optional(),
  isPublished: Joi.boolean().default(false),
  isFeatured: Joi.boolean().default(false),
  featuredUntil: Joi.date().greater('now').when('isFeatured', {
    is: true,
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
});

export const rejectSchema = Joi.object({
  rejectionReason: Joi.string().min(10).max(500).required(),
});
