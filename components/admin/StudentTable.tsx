"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { Pencil, Trash2, Search, QrCode } from "lucide-react";

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
  const [qrStudent, setQrStudent] = useState<Student | null>(null);

  const handleDownload = async (student: Student) => {
    const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" + encodeURIComponent(
      window.location.origin + "/result?rollNumber=" + student.rollNumber
    );
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "QR_" + student.rollNumber + ".png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch {
      window.open(qrCodeUrl, "_blank");
    }
  };

  const handlePrint = (student: Student) => {
    const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" + encodeURIComponent(
      window.location.origin + "/result?rollNumber=" + student.rollNumber
    );
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(
      "<html><head><title>Student Barcode - " + student.name + "</title>" +
      "<style>body{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;margin:0;font-family:sans-serif;text-align:center;}img{width:250px;height:250px;margin-bottom:20px;}h2{margin:5px 0;color:#333;}p{margin:5px 0;color:#666;font-size:14px;}</style></head>" +
      "<body><img src=\"" + qrCodeUrl + "\" onload=\"window.print(); window.close();\" />" +
      "<h2>" + student.name + "</h2>" +
      "<p>Roll Number: " + student.rollNumber + "</p>" +
      "<p>Course: " + student.course + "</p></body></html>"
    );
    printWindow.document.close();
  };
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
                      <Button
                        variant="ghost"
                        size="sm"
                        className="!p-2 text-teal-600 hover:bg-teal-50"
                        onClick={() => setQrStudent(s)}
                        title="View QR Barcode"
                      >
                        <QrCode size={15} />
                      </Button>
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

      {qrStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="card w-full max-w-sm overflow-hidden bg-white p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setQrStudent(null)}
              className="absolute top-4 right-4 text-muted hover:text-slate-700 text-2xl font-semibold leading-none"
            >
              &times;
            </button>

            <div className="text-center">
              <h3 className="font-heading text-lg font-bold text-brand">Student Barcode</h3>
              <p className="text-xs text-muted mt-1">Scan to view results & certificate</p>

              <div className="my-6 flex justify-center border border-slate-100 p-4 rounded-2xl bg-slate-50">
                <img
                  src={"https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + encodeURIComponent(
                    window.location.origin + "/result?rollNumber=" + qrStudent.rollNumber
                  )}
                  alt={"QR Code for " + qrStudent.name}
                  className="w-48 h-48"
                />
              </div>

              <div className="space-y-1 text-slate-800">
                <p className="font-semibold text-lg">{qrStudent.name}</p>
                <p className="text-sm font-medium text-teal-600 font-mono">{qrStudent.rollNumber}</p>
                <p className="text-xs text-muted">{qrStudent.course}</p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm" onClick={() => handleDownload(qrStudent)}>
                  Download PNG
                </Button>
                <Button size="sm" onClick={() => handlePrint(qrStudent)}>
                  Print Card
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
