import StudentTable from "@/components/admin/StudentTable";

export default function InternshipsPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-brand">Internships</h1>
      <p className="mt-1 text-muted">
        Manage interns separately — with internship start and end dates.
      </p>
      <div className="mt-8">
        <StudentTable
          type="internship"
          titleAddHref="/admin/internships/new"
          titleAddLabel="Add Intern"
        />
      </div>
    </div>
  );
}
