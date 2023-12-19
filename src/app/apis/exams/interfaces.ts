import { QuestionTypes } from '../../enums/QuestionTypes'
import { ExamTypes } from '../../enums/ExamTypes'
export interface ICreateQuestionOption {
    option: string
    isCorrect: boolean
    questionId: number
}
export interface ICreateQuestion {
    question: string
    description: string
    questionType: QuestionTypes
    marks: number
    negativeMarks: number
    examId: number
    options: ICreateQuestionOption[]
}
export interface ICreateExam {
    id?: number
    name: string
    description: string
    duration: number
    startTime: Date
    passingMarks: number
    totalQuestions: number
    examType: ExamTypes
    organizationId: number
}

export interface IStartExam {
    examId: number
    activities: JSON
}
