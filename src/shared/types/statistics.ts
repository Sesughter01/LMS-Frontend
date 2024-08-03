export interface Statistics {
    completionPercentage: number;
    highestScore: number;
    lowestScore: number;
    averageScore: number;
    chart: {
        [key: number]: {
            percentage: number;
            count: number;
        };
    };
}
