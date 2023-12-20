export interface ISubmitExamQues {
    examId: number
    studentId: number
    questionId: number
    options: number[]
}

export interface IGetLiveExamQuestions {
    examId: number
    studentId: number
    organizationId: number
}