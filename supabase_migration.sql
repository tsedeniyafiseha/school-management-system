-- ============================================================
-- EduManage Pro: Supabase Migration
-- Converts MongoDB schemas to PostgreSQL tables
-- Target Supabase project: zqlbbnbtgykjitfdrofg
-- ============================================================

-- Enable pgcrypto for UUID generation
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================================
-- 1. ADMINS (maps to Admin model)
-- ============================================================
CREATE TABLE public.admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'Admin',
  school_name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_admins_auth_id ON public.admins(auth_id);
CREATE INDEX idx_admins_email ON public.admins(email);

-- ============================================================
-- 2. CLASSES (maps to Sclass model)
-- ============================================================
CREATE TABLE public.classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_name TEXT NOT NULL,
  school_id UUID NOT NULL REFERENCES public.admins(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_classes_school_id ON public.classes(school_id);

-- ============================================================
-- 3. SUBJECTS (maps to Subject model)
-- ============================================================
CREATE TABLE public.subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sub_name TEXT NOT NULL,
  sub_code TEXT NOT NULL,
  sessions TEXT NOT NULL,
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  school_id UUID NOT NULL REFERENCES public.admins(id) ON DELETE CASCADE,
  teacher_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_subjects_class_id ON public.subjects(class_id);
CREATE INDEX idx_subjects_school_id ON public.subjects(school_id);
CREATE INDEX idx_subjects_teacher_id ON public.subjects(teacher_id);

-- ============================================================
-- 4. TEACHERS (maps to Teacher model)
-- ============================================================
CREATE TABLE public.teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'Teacher',
  school_id UUID NOT NULL REFERENCES public.admins(id) ON DELETE CASCADE,
  teach_subject_id UUID,
  teach_class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_teachers_school_id ON public.teachers(school_id);
CREATE INDEX idx_teachers_teach_subject_id ON public.teachers(teach_subject_id);
CREATE INDEX idx_teachers_teach_class_id ON public.teachers(teach_class_id);
CREATE INDEX idx_teachers_email ON public.teachers(email);

-- Add FK for teacher_id in subjects now that teachers table exists
ALTER TABLE public.subjects
  ADD CONSTRAINT fk_subjects_teacher
  FOREIGN KEY (teacher_id) REFERENCES public.teachers(id) ON DELETE SET NULL;

-- Add FK for teach_subject_id in teachers now that subjects table exists
ALTER TABLE public.teachers
  ADD CONSTRAINT fk_teachers_subject
  FOREIGN KEY (teach_subject_id) REFERENCES public.subjects(id) ON DELETE SET NULL;

-- ============================================================
-- 5. STUDENTS (maps to Student model, without embedded arrays)
-- ============================================================
CREATE TABLE public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  roll_num INTEGER NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'Student',
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  school_id UUID NOT NULL REFERENCES public.admins(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_students_class_id ON public.students(class_id);
CREATE INDEX idx_students_school_id ON public.students(school_id);
CREATE INDEX idx_students_roll_num ON public.students(roll_num);

-- ============================================================
-- 6. STUDENT_EXAM_RESULTS (normalized from student.examResult[])
-- ============================================================
CREATE TABLE public.student_exam_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  marks_obtained INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_student_exam_results_student_id ON public.student_exam_results(student_id);
CREATE INDEX idx_student_exam_results_subject_id ON public.student_exam_results(subject_id);

-- ============================================================
-- 7. STUDENT_ATTENDANCE (normalized from student.attendance[])
-- ============================================================
CREATE TABLE public.student_attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Present', 'Absent')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_student_attendance_student_id ON public.student_attendance(student_id);
CREATE INDEX idx_student_attendance_subject_id ON public.student_attendance(subject_id);
CREATE INDEX idx_student_attendance_date ON public.student_attendance(date);

-- ============================================================
-- 8. TEACHER_ATTENDANCE (normalized from teacher.attendance[])
-- ============================================================
CREATE TABLE public.teacher_attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES public.teachers(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  present_count TEXT,
  absent_count TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_teacher_attendance_teacher_id ON public.teacher_attendance(teacher_id);
CREATE INDEX idx_teacher_attendance_date ON public.teacher_attendance(date);

-- ============================================================
-- 9. NOTICES (maps to Notice model)
-- ============================================================
CREATE TABLE public.notices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  details TEXT NOT NULL,
  date DATE NOT NULL,
  school_id UUID NOT NULL REFERENCES public.admins(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_notices_school_id ON public.notices(school_id);

-- ============================================================
-- 10. COMPLAINS (maps to Complain model)
-- ============================================================
CREATE TABLE public.complains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  complaint TEXT NOT NULL,
  school_id UUID NOT NULL REFERENCES public.admins(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_complains_user_id ON public.complains(user_id);
CREATE INDEX idx_complains_school_id ON public.complains(school_id);

-- ============================================================
-- ENABLE ROW LEVEL SECURITY (permissive — matches current setup)
-- ============================================================
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_exam_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complains ENABLE ROW LEVEL SECURITY;

-- Permissive policies: allow all operations for anon and authenticated
-- (matches current backend with no auth middleware)

CREATE POLICY "Allow all on admins" ON public.admins FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on classes" ON public.classes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on subjects" ON public.subjects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on teachers" ON public.teachers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on students" ON public.students FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on student_exam_results" ON public.student_exam_results FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on student_attendance" ON public.student_attendance FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on teacher_attendance" ON public.teacher_attendance FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on notices" ON public.notices FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on complains" ON public.complains FOR ALL USING (true) WITH CHECK (true);

-- ============================================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON public.admins FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON public.classes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_subjects_updated_at BEFORE UPDATE ON public.subjects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON public.teachers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON public.students FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_notices_updated_at BEFORE UPDATE ON public.notices FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
