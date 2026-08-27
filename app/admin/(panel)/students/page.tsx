import StudentTable from "@/components/admin/StudentTable";

export default function StudentsPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-brand">Manage Students</h1>
      <p className="mt-1 text-muted">
        View, search, edit, and delete course student records.
      </p>
      <div className="mt-8">
        <StudentTable type="course" />
      </div>
    </div>
  );
}
