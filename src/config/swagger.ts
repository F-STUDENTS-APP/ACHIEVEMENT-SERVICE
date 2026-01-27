import swaggerJsdoc from 'swagger-jsdoc';
import { version } from '../../package.json';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Achievement Service API',
      version: version,
      description: 'Achievement Management Service for Student Points System',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:3005',
        description: 'Development server',
      },
    ],
    tags: [
      {
        name: 'Achievements',
        description: 'Achievement management endpoints',
      },
      {
        name: 'Approval',
        description: 'Achievement approval workflow',
      },
      {
        name: 'Recognition',
        description: 'Statistics and Hall of Fame',
      },
      {
        name: 'Health',
        description: 'Service health check',
      },
    ],
    components: {
      schemas: {
        Achievement: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            studentId: { type: 'string' },
            studentNisn: { type: 'string' },
            studentName: { type: 'string' },
            studentClass: { type: 'string' },
            reportedBy: { type: 'string' },
            reportedByName: { type: 'string' },
            reporterRole: {
              type: 'string',
              enum: ['WALIKELAS', 'GURUMAPEL', 'BK']
            },
            categoryId: { type: 'string' },
            categoryCode: { type: 'string' },
            categoryName: { type: 'string' },
            categoryType: {
              type: 'string',
              enum: ['ACADEMIC', 'NON_ACADEMIC', 'SPORTS', 'ARTS', 'SCIENCE', 'TECHNOLOGY', 'LANGUAGE', 'RELIGIOUS', 'SOCIAL', 'OTHER']
            },
            title: { type: 'string' },
            description: { type: 'string' },
            achievementDate: { type: 'string', format: 'date-time' },
            location: { type: 'string', nullable: true },
            organizer: { type: 'string', nullable: true },
            level: {
              type: 'string',
              enum: ['SEKOLAH', 'KECAMATAN', 'KABUPATEN', 'PROVINSI', 'NASIONAL', 'INTERNASIONAL']
            },
            rank: {
              type: 'string',
              enum: ['JUARA_1', 'JUARA_2', 'JUARA_3', 'HARAPAN_1', 'HARAPAN_2', 'HARAPAN_3', 'FINALIS', 'PESERTA', 'LULUS_SELEKSI'],
              nullable: true
            },
            isTeamAchievement: { type: 'boolean' },
            teamName: { type: 'string', nullable: true },
            teamMembers: { type: 'array', items: { type: 'object' }, nullable: true },
            studentRole: { type: 'string', nullable: true },
            points: { type: 'integer' },
            basePoints: { type: 'integer' },
            levelMultiplier: { type: 'number', format: 'float' },
            rankMultiplier: { type: 'number', format: 'float' },
            certificateUrl: { type: 'string', nullable: true },
            evidenceUrls: { type: 'array', items: { type: 'string' }, nullable: true },
            photoUrls: { type: 'array', items: { type: 'string' }, nullable: true },
            status: {
              type: 'string',
              enum: ['PENDING', 'APPROVED', 'REJECTED']
            },
            approvedAt: { type: 'string', format: 'date-time', nullable: true },
            approvedBy: { type: 'string', nullable: true },
            approvedByName: { type: 'string', nullable: true },
            bkNotes: { type: 'string', nullable: true },
            rejectedAt: { type: 'string', format: 'date-time', nullable: true },
            rejectedBy: { type: 'string', nullable: true },
            rejectedByName: { type: 'string', nullable: true },
            rejectionReason: { type: 'string', nullable: true },
            isPublished: { type: 'boolean' },
            publishedAt: { type: 'string', format: 'date-time', nullable: true },
            isFeatured: { type: 'boolean' },
            featuredUntil: { type: 'string', format: 'date-time', nullable: true },
            academicYear: { type: 'string' },
            semester: { type: 'integer', enum: [1, 2] },
            notificationSent: { type: 'boolean' },
            notificationSentAt: { type: 'string', format: 'date-time', nullable: true },
            viewCount: { type: 'integer' },
            isActive: { type: 'boolean' },
            createdBy: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedBy: { type: 'string', nullable: true },
            updatedAt: { type: 'string', format: 'date-time' },
            deletedAt: { type: 'string', format: 'date-time', nullable: true },
            deletedBy: { type: 'string', nullable: true },
          },
        },
        CreateAchievementRequest: {
          type: 'object',
          required: ['studentId', 'studentNisn', 'studentName', 'studentClass', 'reportedBy', 'reportedByName', 'reporterRole', 'categoryId', 'title', 'description', 'achievementDate', 'level', 'academicYear', 'semester'],
          properties: {
            studentId: { type: 'string' },
            studentNisn: { type: 'string' },
            studentName: { type: 'string' },
            studentClass: { type: 'string' },
            reportedBy: { type: 'string' },
            reportedByName: { type: 'string' },
            reporterRole: { type: 'string', enum: ['WALIKELAS', 'GURUMAPEL', 'BK'] },
            categoryId: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            achievementDate: { type: 'string', format: 'date-time' },
            location: { type: 'string' },
            organizer: { type: 'string' },
            level: { type: 'string', enum: ['SEKOLAH', 'KECAMATAN', 'KABUPATEN', 'PROVINSI', 'NASIONAL', 'INTERNASIONAL'] },
            rank: { type: 'string', enum: ['JUARA_1', 'JUARA_2', 'JUARA_3', 'HARAPAN_1', 'HARAPAN_2', 'HARAPAN_3', 'FINALIS', 'PESERTA', 'LULUS_SELEKSI'] },
            isTeamAchievement: { type: 'boolean' },
            teamName: { type: 'string' },
            teamMembers: { type: 'array', items: { type: 'object' } },
            studentRole: { type: 'string' },
            certificateUrl: { type: 'string' },
            evidenceUrls: { type: 'array', items: { type: 'string' } },
            photoUrls: { type: 'array', items: { type: 'string' } },
            academicYear: { type: 'string' },
            semester: { type: 'integer', enum: [1, 2] },
          },
        },
        ApprovalRequest: {
          type: 'object',
          required: ['approverUserId', 'approverName', 'approverRole'],
          properties: {
            approverUserId: { type: 'string' },
            approverName: { type: 'string' },
            approverRole: { type: 'string' },
            notes: { type: 'string' },
          },
        },
        RejectionRequest: {
          type: 'object',
          required: ['rejectedBy', 'rejectedByName', 'rejectionReason'],
          properties: {
            rejectedBy: { type: 'string' },
            rejectedByName: { type: 'string' },
            rejectionReason: { type: 'string' },
          },
        },
        AchievementStatistics: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            studentId: { type: 'string' },
            studentName: { type: 'string' },
            classId: { type: 'string' },
            className: { type: 'string' },
            totalAchievements: { type: 'integer' },
            pendingCount: { type: 'integer' },
            approvedCount: { type: 'integer' },
            rejectedCount: { type: 'integer' },
            totalPoints: { type: 'integer' },
            academicCount: { type: 'integer' },
            nonAcademicCount: { type: 'integer' },
            sportsCount: { type: 'integer' },
            artsCount: { type: 'integer' },
            scienceCount: { type: 'integer' },
            technologyCount: { type: 'integer' },
            schoolCount: { type: 'integer' },
            districtCount: { type: 'integer' },
            regencyCount: { type: 'integer' },
            provinceCount: { type: 'integer' },
            nationalCount: { type: 'integer' },
            internationalCount: { type: 'integer' },
            firstPlaceCount: { type: 'integer' },
            secondPlaceCount: { type: 'integer' },
            thirdPlaceCount: { type: 'integer' },
            isTopAchiever: { type: 'boolean' },
            lastAchievementDate: { type: 'string', format: 'date-time', nullable: true },
            academicYear: { type: 'string' },
            semester: { type: 'integer' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        HallOfFame: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            studentId: { type: 'string' },
            studentName: { type: 'string' },
            studentClass: { type: 'string' },
            achievementId: { type: 'string' },
            achievementTitle: { type: 'string' },
            level: { type: 'string', enum: ['SEKOLAH', 'KECAMATAN', 'KABUPATEN', 'PROVINSI', 'NASIONAL', 'INTERNASIONAL'] },
            rank: { type: 'string', enum: ['JUARA_1', 'JUARA_2', 'JUARA_3', 'HARAPAN_1', 'HARAPAN_2', 'HARAPAN_3', 'FINALIS', 'PESERTA', 'LULUS_SELEKSI'] },
            achievementDate: { type: 'string', format: 'date-time' },
            photoUrl: { type: 'string', nullable: true },
            academicYear: { type: 'string' },
            displayOrder: { type: 'integer' },
            isActive: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string' },
            error: { type: 'string' },
          },
        },
        Success: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string' },
            data: { type: 'object' },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token',
        },
      },
      responses: {
        BadRequest: {
          description: 'Bad Request',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
        Unauthorized: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
        NotFound: {
          description: 'Not Found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
        InternalServerError: {
          description: 'Internal Server Error',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
