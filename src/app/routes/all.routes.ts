import superAdminRoutes from './user/super.admin.routes'
import organizationRoutes from './user/organization.routes'
import proctorRoutes from './user/proctor.routes'
import studentRoutes from './user/student.routes'
import examRoutes from './exam/exam.routes'
import liveExamRoutes from './live-exam/live.exam.routes'

export default [
    superAdminRoutes,
    organizationRoutes,
    proctorRoutes,
    studentRoutes,
    examRoutes,
    liveExamRoutes,
]
