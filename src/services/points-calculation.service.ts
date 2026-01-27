export enum AchievementLevel {
  SEKOLAH = 'SEKOLAH',
  KECAMATAN = 'KECAMATAN',
  KABUPATEN = 'KABUPATEN',
  PROVINSI = 'PROVINSI',
  NASIONAL = 'NASIONAL',
  INTERNASIONAL = 'INTERNASIONAL',
}

export enum AchievementRank {
  JUARA_1 = 'JUARA_1',
  JUARA_2 = 'JUARA_2',
  JUARA_3 = 'JUARA_3',
  HARAPAN_1 = 'HARAPAN_1',
  HARAPAN_2 = 'HARAPAN_2',
  HARAPAN_3 = 'HARAPAN_3',
  FINALIS = 'FINALIS',
  PESERTA = 'PESERTA',
  LULUS_SELEKSI = 'LULUS_SELEKSI',
}

class PointsCalculationService {
  private levelMultipliers: Record<AchievementLevel, number> = {
    [AchievementLevel.SEKOLAH]: 1.0,
    [AchievementLevel.KECAMATAN]: 1.2,
    [AchievementLevel.KABUPATEN]: 1.5,
    [AchievementLevel.PROVINSI]: 1.8,
    [AchievementLevel.NASIONAL]: 2.0,
    [AchievementLevel.INTERNASIONAL]: 2.5,
  };

  private rankMultipliers: Record<AchievementRank, number> = {
    [AchievementRank.JUARA_1]: 1.0,
    [AchievementRank.JUARA_2]: 0.8,
    [AchievementRank.JUARA_3]: 0.6,
    [AchievementRank.HARAPAN_1]: 0.5,
    [AchievementRank.HARAPAN_2]: 0.4,
    [AchievementRank.HARAPAN_3]: 0.3,
    [AchievementRank.FINALIS]: 0.3,
    [AchievementRank.PESERTA]: 0.1,
    [AchievementRank.LULUS_SELEKSI]: 0.2,
  };

  calculatePoints(basePoints: number, level: AchievementLevel, rank?: AchievementRank): number {
    const levelMultiplier = this.levelMultipliers[level] || 1.0;
    const rankMultiplier = rank ? this.rankMultipliers[rank] || 1.0 : 1.0;

    return Math.round(basePoints * levelMultiplier * rankMultiplier);
  }
}

export default new PointsCalculationService();
