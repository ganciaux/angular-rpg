  export function getHpStatus(hp: number, hpMax: number): string {
    if (hp === 0) {
      return '💀 Dead';
    } else if (hp < hpMax * 0.3) {
      return '💥 Critical';
    } else if (hp < hpMax * 0.7) {
      return '🤕 Injured';
    } else {
      return '💪 Healthy';
    }
  }