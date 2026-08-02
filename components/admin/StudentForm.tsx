"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { studentSchema, StudentFormData } from "@/lib/validations";
import { calculateResultStats } from "@/lib/utils";
import { Plus, Trash2 } from "lucide-react";

import { ALL_COURSE_NAMES } from "@/lib/courses";

interface StudentFormProps {
  studentId?: string;
  initialData?: StudentFormData;
}

export default function StudentForm({ studentId, initialData }: StudentFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isEdit = !!studentId;

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: initialData || {
      name: "",
      rollNumber: "",
      course: "",
      fatherName: "",
      dob: "",
      contactNumber: "",
      photoUrl: "",
      certificateUrl: "",
      results: [{ subjectName: "", marksObtained: 0, maxMarks: 100 }],
    },
  });

  const photoUrl = watch("photoUrl");
  const certificateUrl = watch("certificateUrl");

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "photoUrl" | "certificateUrl"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("File size should not exceed 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setValue(field, reader.result as string, { shouldValidate: true });
    };
    reader.readAsDataURL(file);
  };

  const { fields, append, remove } = useFieldArray({ control, name: "results" });
  const results = watch("results");
  const stats = calculateResultStats(
    (results || []).map((r) => ({
      marksObtained: Number(r.marksObtained) || 0,
      maxMarks: Number(r.maxMarks) || 0,
    }))
  );

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const onSubmit = async (data: StudentFormData) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(isEdit ? `/api/students/${studentId}` : "/api/students", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Failed to save");
        return;
      }
      router.push("/admin/students");
      router.refresh();
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="card p-6">
        <h2 className="font-heading font-semibold text-brand">Student Information</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Input label="Full Name" error={errors.name?.message} {...register("name")} />
          <Input label="Roll Number" error={errors.rollNumber?.message} {...register("rollNumber")} />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Course</label>
            <select {...register("course")} className="input-field">
              <option value="">Select course</option>
              {ALL_COURSE_NAMES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {errors.course && <p className="mt-1 text-sm text-red-500">{errors.course.message}</p>}
          </div>
          <Input label="Father's Name" error={errors.fatherName?.message} {...register("fatherName")} />
          <Input label="Date of Birth" type="date" error={errors.dob?.message} {...register("dob")} />
          <Input label="Contact Number" error={errors.contactNumber?.message} {...register("contactNumber")} />
        </div>

        {/* Media Upload Options */}
        <div className="mt-6 border-t border-slate-100 pt-6 grid gap-6 sm:grid-cols-2">
          {/* Profile Photo */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Profile Photo</label>
            <div className="flex items-center gap-4">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt="Profile"
                  className="h-16 w-16 rounded-full object-cover border border-slate-200"
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 text-xs text-muted">
                  No Photo
                </div>
              )}
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "photoUrl")}
                  className="block w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-teal/10 file:text-brand hover:file:bg-teal/20 cursor-pointer"
                />
                {photoUrl && (
                  <button
                    type="button"
                    onClick={() => setValue("photoUrl", "")}
                    className="mt-1 text-xs text-red-500 hover:underline"
                  >
                    Remove Photo
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Certificate Image */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Certificate Image</label>
            <div className="flex items-center gap-4">
              {certificateUrl ? (
                <img
                  src={certificateUrl}
                  alt="Certificate"
                  className="h-16 w-24 rounded-lg object-cover border border-slate-200"
                />
              ) : (
                <div className="h-16 w-24 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200 text-xs text-muted">
                  No Image
                </div>
              )}
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "certificateUrl")}
                  className="block w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-teal/10 file:text-brand hover:file:bg-teal/20 cursor-pointer"
                />
                {certificateUrl && (
                  <button
                    type="button"
                    onClick={() => setValue("certificateUrl", "")}
                    className="mt-1 text-xs text-red-500 hover:underline"
                  >
                    Remove Certificate
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-semibold text-brand">Subject Marks</h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ subjectName: "", marksObtained: 0, maxMarks: 100 })}
          >
            <Plus size={14} /> Add
          </Button>
        </div>
        <div className="mt-4 space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="grid gap-3 rounded-xl bg-surface p-4 sm:grid-cols-4">
              <Input label="Subject" error={errors.results?.[index]?.subjectName?.message} {...register(`results.${index}.subjectName`)} />
              <Input label="Obtained" type="number" error={errors.results?.[index]?.marksObtained?.message} {...register(`results.${index}.marksObtained`)} />
              <Input label="Max" type="number" error={errors.results?.[index]?.maxMarks?.message} {...register(`results.${index}.maxMarks`)} />
              <div className="flex items-end">
                {fields.length > 1 && (
                  <Button type="button" variant="ghost" size="sm" className="text-red-500" onClick={() => remove(index)}>
                    <Trash2 size={15} />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-6 rounded-xl bg-teal/5 p-4 text-sm">
          <span><strong className="text-brand">{stats.totalObtained}/{stats.totalMax}</strong> Total</span>
          <span><strong className="text-brand">{stats.percentage}%</strong></span>
          <span className={stats.passed ? "text-forest font-bold" : "text-red-600 font-bold"}>
            {stats.passed ? "PASS" : "FAIL"}
          </span>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : isEdit ? "Update" : "Add Student"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/students")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
