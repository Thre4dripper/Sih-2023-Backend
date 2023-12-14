import { QuestionTypes } from '../../enums/QuestionTypes'
export interface ICreateQuestionOption {
    option: string
    isCorrect: boolean
    questionId: number
}
export interface ICreateQuestion {
    question: string
    description: string
    questionType: QuestionTypes.MULTIPLE_CHOICE | QuestionTypes.CODING
    marks: number
    negativeMarks: number
    examId: number
}
export interface ICreateExam {
    name: string
    description: string
    duration: number
    startTime: Date
    endTime: Date
    passingMarks: number
    totalQuestions: number
    examType: QuestionTypes
    organizationId: number
}