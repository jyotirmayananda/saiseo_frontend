"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { studentSchema, StudentFormData } from "@/lib/validations";
import { calculateResultStats } from "@/lib/utils";
import { ALL_COURSE_NAMES } from "@/lib/courses";
import { Briefcase, GraduationCap, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface StudentFormProps {
  studentId?: string;
  initialData?: StudentFormData;
  defaultType?: "course" | "internship";
}

const currentYear = new Date().getFullYear();
const passoutYears = Array.from({ length: 15 }, (_, i) => String(currentYear - i + 2));

export default function StudentForm({
  studentId,
  initialData,
  defaultType = "course",
}: StudentFormProps) {
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
      studentType: defaultType,
      internshipStartDate: "",
      internshipEndDate: "",
      passoutYear: String(currentYear),
      passoutDate: "",
      results:
        defaultType === "internship"
          ? []
          : [{ subjectName: "", marksObtained: 0, maxMarks: 100 }],
    },
  });

  const photoUrl = watch("photoUrl");
  const certificateUrl = watch("certificateUrl");
  const studentType = watch("studentType");
  const isInternship = studentType === "internship";

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
      const payload = {
        ...data,
        results: data.studentType === "internship" ? data.results || [] : data.results,
        internshipStartDate:
          data.studentType === "internship" ? data.internshipStartDate : "",
        internshipEndDate:
          data.studentType === "internship" ? data.internshipEndDate : "",
      };

      const res = await fetch(isEdit ? `/api/students/${studentId}` : "/api/students", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Failed to save");
        return;
      }
      router.push(
        data.studentType === "internship" ? "/admin/internships" : "/admin/students"
      );
      router.refresh();
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Type selector */}
      <div className="card p-6">
        <h2 className="font-heading font-semibold text-brand">Entry Type</h2>
        <p className="mt-1 text-sm text-muted">
          Choose whether this is a course student or an intern.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setValue("studentType", "course", { shouldValidate: true })}
            className={cn(
              "flex items-start gap-3 rounded-2xl border p-4 text-left transition-all",
              !isInternship
                ? "border-teal bg-teal/5 ring-2 ring-teal/20"
                : "border-slate-200 hover:border-slate-300"
            )}
          >
            <span
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                !isInternship ? "bg-teal/15 text-teal-dark" : "bg-surface-2 text-muted"
              )}
            >
              <GraduationCap size={20} />
            </span>
            <span>
              <span className="block font-semibold text-brand">Course Student</span>
              <span className="mt-0.5 block text-xs text-muted">
                Diploma / programming courses with subject marks
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => setValue("studentType", "internship", { shouldValidate: true })}
            className={cn(
              "flex items-start gap-3 rounded-2xl border p-4 text-left transition-all",
              isInternship
                ? "border-maroon bg-maroon/5 ring-2 ring-maroon/20"
                : "border-slate-200 hover:border-slate-300"
            )}
          >
            <span
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                isInternship ? "bg-maroon/10 text-maroon" : "bg-surface-2 text-muted"
              )}
            >
              <Briefcase size={20} />
            </span>
            <span>
              <span className="block font-semibold text-brand">Internship</span>
              <span className="mt-0.5 block text-xs text-muted">
                Intern with start & end dates (separate section)
              </span>
            </span>
          </button>
        </div>
        <input type="hidden" {...register("studentType")} />
      </div>

      {/* Basic info */}
      <div className="card p-6">
        <h2 className="font-heading font-semibold text-brand">
          {isInternship ? "Intern Information" : "Student Information"}
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Input label="Full Name" error={errors.name?.message} {...register("name")} />
          <Input
            label={isInternship ? "Intern ID / Roll Number" : "Roll Number"}
            error={errors.rollNumber?.message}
            {...register("rollNumber")}
          />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              {isInternship ? "Internship Domain / Course" : "Course"}
            </label>
            <select {...register("course")} className="input-field">
              <option value="">Select {isInternship ? "domain" : "course"}</option>
              {ALL_COURSE_NAMES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
              {isInternship && <option value="Internship">Internship (General)</option>}
            </select>
            {errors.course && (
              <p className="mt-1 text-sm text-red-500">{errors.course.message}</p>
            )}
          </div>
          <Input
            label="Father's Name"
            error={errors.fatherName?.message}
            {...register("fatherName")}
          />
          <Input
            label="Date of Birth"
            type="date"
            error={errors.dob?.message}
            {...register("dob")}
          />
          <Input
            label="Contact Number"
            error={errors.contactNumber?.message}
            {...register("contactNumber")}
          />
        </div>

        {/* Passout fields — for both */}
        <div className="mt-6 border-t border-slate-100 pt-6">
          <h3 className="text-sm font-semibold text-brand">Passout Details</h3>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Passout Year
              </label>
              <select {...register("passoutYear")} className="input-field">
                <option value="">Select year</option>
                {passoutYears.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              {errors.passoutYear && (
                <p className="mt-1 text-sm text-red-500">{errors.passoutYear.message}</p>
              )}
            </div>
            <Input
              label="Passout Date"
              type="date"
              error={errors.passoutDate?.message}
              {...register("passoutDate")}
            />
          </div>
        </div>

        {/* Internship-only dates */}
        {isInternship && (
          <div className="mt-6 rounded-2xl border border-maroon/20 bg-maroon/5 p-5">
            <div className="flex items-center gap-2">
              <Briefcase size={18} className="text-maroon" />
              <h3 className="font-heading font-semibold text-brand">
                Internship Period
              </h3>
            </div>
            <p className="mt-1 text-xs text-muted">
              Select when the internship starts and ends.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Input
                label="Internship Start Date"
                type="date"
                error={errors.internshipStartDate?.message}
                {...register("internshipStartDate")}
              />
              <Input
                label="Internship End Date"
                type="date"
                error={errors.internshipEndDate?.message}
                {...register("internshipEndDate")}
              />
            </div>
          </div>
        )}

        {/* Media Upload */}
        <div className="mt-6 grid gap-6 border-t border-slate-100 pt-6 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Profile Photo
            </label>
            <div className="flex items-center gap-4">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt="Profile"
                  className="h-16 w-16 rounded-full border border-slate-200 object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-xs text-muted">
                  No Photo
                </div>
              )}
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "photoUrl")}
                  className="block w-full cursor-pointer text-xs text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-teal/10 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-brand hover:file:bg-teal/20"
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

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Certificate Image
            </label>
            <div className="flex items-center gap-4">
              {certificateUrl ? (
                <img
                  src={certificateUrl}
                  alt="Certificate"
                  className="h-16 w-24 rounded-lg border border-slate-200 object-cover"
                />
              ) : (
                <div className="flex h-16 w-24 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-xs text-muted">
                  No Image
                </div>
              )}
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "certificateUrl")}
                  className="block w-full cursor-pointer text-xs text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-teal/10 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-brand hover:file:bg-teal/20"
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

      {/* Subject marks — required for course, optional for internship */}
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-semibold text-brand">
              {isInternship ? "Evaluation Marks (Optional)" : "Subject Marks"}
            </h2>
            {isInternship && (
              <p className="mt-1 text-xs text-muted">
                You can add evaluation subjects if needed, or leave empty.
              </p>
            )}
          </div>
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
          {fields.length === 0 && isInternship ? (
            <p className="rounded-xl bg-surface px-4 py-6 text-center text-sm text-muted">
              No subjects added. Click Add if you want to record evaluation marks.
            </p>
          ) : (
            fields.map((field, index) => (
              <div
                key={field.id}
                className="grid gap-3 rounded-xl bg-surface p-4 sm:grid-cols-4"
              >
                <Input
                  label="Subject"
                  error={errors.results?.[index]?.subjectName?.message}
                  {...register(`results.${index}.subjectName`)}
                />
                <Input
                  label="Obtained"
                  type="number"
                  error={errors.results?.[index]?.marksObtained?.message}
                  {...register(`results.${index}.marksObtained`)}
                />
                <Input
                  label="Max"
                  type="number"
                  error={errors.results?.[index]?.maxMarks?.message}
                  {...register(`results.${index}.maxMarks`)}
                />
                <div className="flex items-end">
                  {(fields.length > 1 || isInternship) && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-red-500"
                      onClick={() => remove(index)}
                    >
                      <Trash2 size={15} />
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        {errors.results?.message && (
          <p className="mt-2 text-sm text-red-500">{errors.results.message}</p>
        )}
        {fields.length > 0 && (
          <div className="mt-4 flex gap-6 rounded-xl bg-teal/5 p-4 text-sm">
            <span>
              <strong className="text-brand">
                {stats.totalObtained}/{stats.totalMax}
              </strong>{" "}
              Total
            </span>
            <span>
              <strong className="text-brand">{stats.percentage}%</strong>
            </span>
            <span
              className={
                stats.passed ? "font-bold text-forest" : "font-bold text-red-600"
              }
            >
              {stats.passed ? "PASS" : "FAIL"}
            </span>
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : isEdit
              ? "Update"
              : isInternship
                ? "Add Intern"
                : "Add Student"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            router.push(isInternship ? "/admin/internships" : "/admin/students")
          }
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
