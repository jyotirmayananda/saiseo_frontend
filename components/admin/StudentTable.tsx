"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { Pencil, Trash2, Search } from "lucide-react";

interface Student {
  id: string;
  rollNumber: string;
  name: string;
  course: string;
}

interface Pagination {
  page: number;
  totalPages: number;
  total: number;
}

export default function StudentTable() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    totalPages: 1,
    total: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "10",
        ...(search && { search }),
      });
      const res = await fetch(`/api/students?${params}`);
      const data = await res.json();
      setStudents(data.students);
      setPagination(data.pagination);
    } catch {
      setStudents([]);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    const timer = setTimeout(fetchStudents, 300);
    return () => clearTimeout(timer);
  }, [fetchStudents]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete student "${name}"?`)) return;
    try {
      const res = await fetch(`/api/students/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Failed to delete student");
        return;
      }
      fetchStudents();
      router.refresh();
    } catch (err) {
      console.error("Delete error:", err);
      alert("An error occurred while deleting the student.");
    }
  };

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search roll number or name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="input-field pl-9"
          />
        </div>
        <Link href="/admin/students/new">
          <Button size="sm">Add Student</Button>
        </Link>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-surface">
              <th className="px-4 py-3 text-left font-semibold text-muted">Roll No.</th>
              <th className="px-4 py-3 text-left font-semibold text-muted">Name</th>
              <th className="px-4 py-3 text-left font-semibold text-muted">Course</th>
              <th className="px-4 py-3 text-right font-semibold text-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted">
                  Loading...
                </td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted">
                  No students found.
                </td>
              </tr>
            ) : (
              students.map((s) => (
                <tr key={s.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3 font-medium text-brand">{s.rollNumber}</td>
                  <td className="px-4 py-3">{s.name}</td>
                  <td className="px-4 py-3">{s.course}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Link href={`/admin/students/${s.id}/edit`}>
                        <Button variant="ghost" size="sm" className="!p-2">
                          <Pencil size={15} />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="!p-2 text-red-500 hover:bg-red-50"
                        onClick={() => handleDelete(s.id, s.name)}
                      >
                        <Trash2 size={15} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination.totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm">
          <p className="text-muted">{pagination.total} students</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
              Previous
            </Button>
            <span className="flex items-center px-2 text-muted">
              {page} / {pagination.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= pagination.totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
