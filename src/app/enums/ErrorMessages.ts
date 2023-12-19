export enum ErrorMessages {
    INVALID_CREDENTIALS = 'Invalid credentials',
    INVALID_TOKEN = 'Invalid token',
    INVALID_USER = 'Invalid user',
    //Super Admin
    SUPER_ADMIN_ALREADY_EXISTS = 'Super Admin already exists',
    SUPER_ADMIN_NOT_FOUND = 'Super Admin not found',

    //Organization
    ORGANIZATION_ALREADY_EXISTS = 'Organization already exists',
    ORGANIZATION_NOT_FOUND = 'Organization not found',

    //Proctor
    PROCTOR_ALREADY_EXISTS = 'Proctor already exists',
    PROCTOR_NOT_FOUND = 'Proctor not found',

    //Student
    STUDENT_ALREADY_EXISTS = 'Student already exists',
    STUDENT_NOT_FOUND = 'Student not found',
    INVALID_AADHAR_NUMBER = 'Invalid Aadhar number',
    INVALID_PAN_NUMBER = 'Invalid Pan number',

    //Exams
    EXAM_NOT_FOUND = 'Exam not found',
    EXAM_ALREADY_STARTED = 'Exam already started',
    EXAM_NOT_STARTED = 'Exam not started yet',
    EXAM_ALREADY_FINISHED = 'Exam already finished',
    EXAM_NOT_FINISHED = 'Exam not finished yet',
    QUESTION_NOT_FOUND = 'Question not found',
}