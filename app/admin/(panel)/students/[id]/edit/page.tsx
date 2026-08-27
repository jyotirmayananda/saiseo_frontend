"use client";

import { useEffect, useState } from "react";
import StudentForm from "@/components/admin/StudentForm";
import { StudentFormData } from "@/lib/validations";

export default function EditStudentPage({
  params,
}: {
  params: { id: string };
}) {
  const [initialData, setInitialData] = useState<StudentFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/students/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((student) => {
        setInitialData({
          name: student.name,
          rollNumber: student.rollNumber,
          course: student.course,
          fatherName: student.fatherName,
          dob: student.dob,
          contactNumber: student.contactNumber,
          photoUrl: student.photoUrl || "",
          certificateUrl: student.certificateUrl || "",
          studentType:
            student.studentType === "internship" ? "internship" : "course",
          internshipStartDate: student.internshipStartDate || "",
          internshipEndDate: student.internshipEndDate || "",
          passoutYear: student.passoutYear || "",
          passoutDate: student.passoutDate || "",
          results: (student.results || []).map(
            (r: {
              subjectName: string;
              marksObtained: number;
              maxMarks: number;
            }) => ({
              subjectName: r.subjectName,
              marksObtained: r.marksObtained,
              maxMarks: r.maxMarks,
            })
          ),
        });
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return <p className="text-muted">Loading...</p>;
  if (notFound || !initialData)
    return <p className="text-red-600">Student not found.</p>;

  const isIntern = initialData.studentType === "internship";

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-brand">
        {isIntern ? "Edit Intern" : "Edit Student"}
      </h1>
      <p className="mt-1 text-muted">
        Update {isIntern ? "intern" : "student"} information and details.
      </p>
      <div className="mt-8">
        <StudentForm studentId={params.id} initialData={initialData} />
      </div>
    </div>
  );
}
