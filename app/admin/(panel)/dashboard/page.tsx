import { cookies } from "next/headers";
import StatsCards from "@/components/admin/StatsCards";

interface DashboardData {
  totalStudents: number;
  totalCourses: number;
  recentStudents: {
    id: string;
    name: string;
    rollNumber: string;
    course: string;
  }[];
}

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("saiseo-admin-token")?.value;

  let stats: DashboardData = {
    totalStudents: 0,
    totalCourses: 0,
    recentStudents: [],
  };

  try {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:5001";
    const res = await fetch(`${backendUrl}/api/students/stats`, {
      headers: {
        Cookie: `saiseo-admin-token=${token || ""}`,
      },
      cache: "no-store",
    });

    if (res.ok) {
      stats = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch dashboard stats from backend:", error);
  }

  const { totalStudents, totalCourses, recentStudents } = stats;

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-brand">Dashboard</h1>
      <p className="mt-1 text-muted">Welcome to Sai SEO Solution admin panel.</p>

      <StatsCards
        totalStudents={totalStudents}
        totalCourses={totalCourses}
        recentCount={recentStudents.length}
      />

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
                  <th className="pb-3">Course</th>
                </tr>
              </thead>
              <tbody>
                {recentStudents.map((s) => (
                  <tr key={s.id} className="border-b border-slate-100 last:border-0">
                    <td className="py-3 pr-4 font-medium text-brand">{s.rollNumber}</td>
                    <td className="py-3 pr-4">{s.name}</td>
                    <td className="py-3">{s.course}</td>
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
