import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const subjectSchema = z
  .object({
    subjectName: z.string().min(1, "Subject name is required"),
    marksObtained: z.coerce.number().min(0, "Marks must be 0 or more"),
    maxMarks: z.coerce.number().min(1, "Max marks must be at least 1"),
  })
  .refine((data) => data.marksObtained <= data.maxMarks, {
    message: "Marks obtained cannot exceed max marks",
    path: ["marksObtained"],
  });

export const studentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  rollNumber: z.string().min(1, "Roll number is required"),
  course: z.string().min(1, "Course is required"),
  fatherName: z.string().min(2, "Father's name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  contactNumber: z.string().min(10, "Valid contact number required"),
  photoUrl: z.string().optional(),
  certificateUrl: z.string().optional(),
  results: z.array(subjectSchema).min(1, "At least one subject is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type StudentFormData = z.infer<typeof studentSchema>;
export type SubjectFormData = z.infer<typeof subjectSchema>;
