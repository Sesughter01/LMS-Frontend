export interface Application {
    id: number,
    traineeUserId: number,
    courseId: number,
    courseName: string,
    cohortId: number,
    applicationStatus: ApplicationStatuses,
    userEnrollmentAssessmentStatus: 'failed' | 'passed' | 'in-complete',
    createdAt: string,
    updatedAt: string,
    hasTakenCohortPreAssessment: boolean,
    hasTakenCoursePreAssessment: boolean,

    cohortPreAssessmentScore: number,
    coursePreAssessmentScore: number,

    overallApplicationScoreAverage: number,
}

export enum ApplicationStatuses {
    PENDING = 'pending',
    ENROLLED = 'enrolled',
    REJECTED = 'rejected'
}