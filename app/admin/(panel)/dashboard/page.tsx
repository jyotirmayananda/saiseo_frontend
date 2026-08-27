import { cookies } from "next/headers";
import Link from "next/link";
import StatsCards from "@/components/admin/StatsCards";

interface DashboardData {
  totalStudents: number;
  totalInterns: number;
  totalCourses: number;
  recentStudents: {
    id: string;
    name: string;
    rollNumber: string;
    course: string;
    studentType?: string;
  }[];
}

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("saiseo-admin-token")?.value;

  let stats: DashboardData = {
    totalStudents: 0,
    totalInterns: 0,
    totalCourses: 0,
    recentStudents: [],
  };

  try {
    const backendUrl =
      process.env.BACKEND_URL || "https://saiseo-backend.onrender.com";
    const res = await fetch(`${backendUrl}/api/students/stats`, {
      headers: {
        Cookie: `saiseo-admin-token=${token || ""}`,
      },
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      stats = {
        totalStudents: data.totalStudents || 0,
        totalInterns: data.totalInterns || 0,
        totalCourses: data.totalCourses || 0,
        recentStudents: data.recentStudents || [],
      };
    }
  } catch (error) {
    console.error("Failed to fetch dashboard stats from backend:", error);
  }

  const { totalStudents, totalInterns, totalCourses, recentStudents } = stats;

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-brand">Dashboard</h1>
      <p className="mt-1 text-muted">Welcome to Sai SEO Solution admin panel.</p>

      <StatsCards
        totalStudents={totalStudents}
        totalInterns={totalInterns}
        totalCourses={totalCourses}
        recentCount={recentStudents.length}
      />

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/admin/students" className="btn-secondary !py-2 !text-xs">
          Manage Students
        </Link>
        <Link href="/admin/internships" className="btn-secondary !py-2 !text-xs">
          Manage Internships
        </Link>
        <Link href="/admin/students/new" className="btn-primary !py-2 !text-xs">
          Add Student
        </Link>
        <Link href="/admin/internships/new" className="btn-teal !py-2 !text-xs">
          Add Intern
        </Link>
      </div>

      <div className="card mt-8 p-6">
        <h2 className="font-heading font-semibold text-brand">Recent Entries</h2>
        {recentStudents.length === 0 ? (
          <p className="mt-4 text-sm text-muted">No students added yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-muted">
                  <th className="pb-3 pr-4">Roll No.</th>
                  <th className="pb-3 pr-4">Name</th>
                  <th className="pb-3 pr-4">Course</th>
                  <th className="pb-3">Type</th>
                </tr>
              </thead>
              <tbody>
                {recentStudents.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="py-3 pr-4 font-medium text-brand">
                      {s.rollNumber}
                    </td>
                    <td className="py-3 pr-4">{s.name}</td>
                    <td className="py-3 pr-4">{s.course}</td>
                    <td className="py-3">
                      <span
                        className={
                          s.studentType === "internship"
                            ? "rounded-full bg-maroon/10 px-2.5 py-0.5 text-xs font-semibold text-maroon"
                            : "rounded-full bg-teal/10 px-2.5 py-0.5 text-xs font-semibold text-teal-dark"
                        }
                      >
                        {s.studentType === "internship" ? "Intern" : "Student"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
