import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding data...');

    // 1. Create Achievements
    const studentId1 = uuidv4();
    const studentId2 = uuidv4();
    const teacherId = uuidv4();

    const achievements = [
        {
            studentId: studentId1,
            studentNisn: '0012345671',
            studentName: 'Budi Santoso',
            studentClass: '12 MIPA 1',
            reportedBy: teacherId,
            reportedByName: 'Drs. Supriyanto',
            reporterRole: 'WALIKELAS',
            categoryId: uuidv4(),
            categoryCode: 'ACAD_MATH_OLIM',
            categoryName: 'Olimpiade Matematika',
            categoryType: 'ACADEMIC',
            title: 'Juara 1 Olimpiade Matematika Provinsi',
            description: 'Mendapatkan medali emas dalam kompetisi matematika tingkat provinsi.',
            achievementDate: new Date('2024-01-15'),
            location: 'Universitas Indonesia',
            organizer: 'Dinas Pendidikan Jawa Barat',
            level: 'PROVINSI',
            rank: 'JUARA_1',
            isTeamAchievement: false,
            points: 100,
            basePoints: 50,
            levelMultiplier: 1.8,
            rankMultiplier: 1.0,
            status: 'APPROVED',
            approvedAt: new Date(),
            approvedBy: teacherId,
            approvedByName: 'Drs. Supriyanto',
            academicYear: '2023/2024',
            semester: 1,
            createdBy: teacherId,
        },
        {
            studentId: studentId2,
            studentNisn: '0012345672',
            studentName: 'Siti Aminah',
            studentClass: '11 IPS 2',
            reportedBy: teacherId,
            reportedByName: 'Drs. Supriyanto',
            reporterRole: 'WALIKELAS',
            categoryId: uuidv4(),
            categoryCode: 'NONACAD_BASKET',
            categoryName: 'Lomba Basket',
            categoryType: 'SPORTS',
            title: 'Juara 3 Turnamen Basket Antar SMA',
            description: 'Mewakili sekolah dalam turnamen basket tingkat kota.',
            achievementDate: new Date('2024-02-10'),
            location: 'GOR Pajajaran',
            organizer: 'PERBASI Kota Bandung',
            level: 'KABUPATEN',
            rank: 'JUARA_3',
            isTeamAchievement: true,
            teamName: 'Tim Basket Putra',
            points: 40,
            basePoints: 30,
            levelMultiplier: 1.5,
            rankMultiplier: 0.6,
            status: 'PENDING',
            academicYear: '2023/2024',
            semester: 2,
            createdBy: teacherId,
        },
        {
            studentId: studentId1,
            studentNisn: '0012345671',
            studentName: 'Budi Santoso',
            studentClass: '12 MIPA 1',
            reportedBy: teacherId,
            reportedByName: 'Drs. Supriyanto',
            reporterRole: 'WALIKELAS',
            categoryId: uuidv4(),
            categoryCode: 'ACAD_ENG_DEBATE',
            categoryName: 'English Debate',
            categoryType: 'LANGUAGE',
            title: 'Finalis National English Debate Championship',
            description: 'Menjadi finalis dalam kompetisi debat bahasa Inggris tingkat nasional.',
            achievementDate: new Date('2024-03-20'),
            location: 'Jakarta Convention Center',
            organizer: 'Kemendikbud',
            level: 'NASIONAL',
            rank: 'FINALIS',
            isTeamAchievement: true,
            teamName: 'Debate Team A',
            points: 60,
            basePoints: 100,
            levelMultiplier: 2.0,
            rankMultiplier: 0.3,
            status: 'APPROVED',
            approvedAt: new Date(),
            approvedBy: teacherId,
            approvedByName: 'Drs. Supriyanto',
            academicYear: '2023/2024',
            semester: 2,
            createdBy: teacherId,
        }
    ];

    for (const achievement of achievements) {
        const created = await prisma.achievement.create({
            data: achievement as any
        });

        // Create Approval History
        await prisma.achievementApprovalHistory.create({
            data: {
                achievementId: created.id,
                action: created.status === 'APPROVED' ? 'APPROVE' : 'SUBMIT',
                fromStatus: 'PENDING',
                toStatus: created.status as any,
                approverUserId: teacherId,
                approverName: 'Drs. Supriyanto',
                approverRole: 'WALIKELAS',
                notes: created.status === 'APPROVED' ? 'Approved automatically by seed' : 'Submitted for approval',
                actionDate: new Date()
            }
        });

        // Update Statistics
        await prisma.achievementStatistics.upsert({
            where: {
                studentId_academicYear_semester: {
                    studentId: created.studentId,
                    academicYear: created.academicYear,
                    semester: created.semester
                }
            },
            update: {
                totalAchievements: { increment: 1 },
                totalPoints: { increment: created.points },
                approvedCount: { increment: created.status === 'APPROVED' ? 1 : 0 },
                pendingCount: { increment: created.status === 'PENDING' ? 1 : 0 },
                academicCount: { increment: created.categoryType === 'ACADEMIC' ? 1 : 0 },
                sportsCount: { increment: created.categoryType === 'SPORTS' ? 1 : 0 },
            },
            create: {
                studentId: created.studentId,
                studentName: created.studentName,
                classId: 'CLASS_ID',
                className: created.studentClass,
                totalAchievements: 1,
                approvedCount: created.status === 'APPROVED' ? 1 : 0,
                pendingCount: created.status === 'PENDING' ? 1 : 0,
                totalPoints: created.points,
                academicCount: created.categoryType === 'ACADEMIC' ? 1 : 0,
                sportsCount: created.categoryType === 'SPORTS' ? 1 : 0,
                academicYear: created.academicYear,
                semester: created.semester
            }
        });

        // Add to Hall of Fame if National/International and Approved
        if (created.status === 'APPROVED' && ['NASIONAL', 'INTERNASIONAL'].includes(created.level)) {
            await prisma.hallOfFame.create({
                data: {
                    studentId: created.studentId,
                    studentName: created.studentName,
                    studentClass: created.studentClass,
                    achievementId: created.id,
                    achievementTitle: created.title,
                    level: created.level as any,
                    rank: created.rank as any,
                    achievementDate: created.achievementDate,
                    academicYear: created.academicYear,
                    photoUrl: 'https://via.placeholder.com/150'
                }
            });
        }
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
