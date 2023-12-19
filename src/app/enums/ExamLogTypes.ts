export enum ExamLogTypes {
    ExamStarted = 'exam_started',
    ExamFinished = 'exam_finished',
    QuestionAnswered = 'question_answered',
    QuestionMarked = 'question_marked',
    QuestionUnmarked = 'question_unmarked',
    QuestionAnswerChanged = 'question_answer_changed',
    QuestionAnswerCleared = 'question_answer_cleared',
    QuestionAnswerSubmitted = 'question_answer_submitted',
    ExamSubmitted = 'exam_submitted',
    LookedAway = 'looked_away',
    ObjectDetected = 'object_detected',
    ExamLogLLM = 'exam_log_llm',
}