import StudentForm from "@/components/admin/StudentForm";

export default function NewInternPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-brand">Add Intern</h1>
      <p className="mt-1 text-muted">
        Register a new intern with internship period and passout details.
      </p>
      <div className="mt-8">
        <StudentForm defaultType="internship" />
      </div>
    </div>
  );
}
