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

    //Exams
    EXAM_NOT_FOUND = 'Exam not found',
    QUESTION_NOT_FOUND = 'Question not found',
}