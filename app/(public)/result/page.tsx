"use client";

import { useState, useEffect, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import Input from "@/components/ui/Input";
import ResultCard from "@/components/result/ResultCard";
import { Search, AlertCircle } from "lucide-react";

const rollSchema = z.object({
  rollNumber: z.string().min(1, "Roll number is required"),
});

type RollFormData = z.infer<typeof rollSchema>;

interface ResultData {
  student: {
    name: string;
    rollNumber: string;
    course: string;
    fatherName: string;
  };
  results: {
    subjectName: string;
    marksObtained: number;
    maxMarks: number;
  }[];
  totalObtained: number;
  totalMax: number;
  percentage: number;
  grade: string;
  passed: boolean;
}

function ResultPageContent() {
  const [result, setResult] = useState<ResultData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const rollNumberParam = searchParams.get("rollNumber");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RollFormData>({
    resolver: zodResolver(rollSchema),
  });

  const onSubmit = async (data: RollFormData) => {
    setLoading(true);
    setNotFound(false);
    setResult(null);

    try {
      const res = await fetch(
        `/api/result/${encodeURIComponent(data.rollNumber.trim())}`
      );
      if (res.status === 404) {
        setNotFound(true);
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch result");
      setResult(await res.json());
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (rollNumberParam) {
      setValue("rollNumber", rollNumberParam);
      onSubmit({ rollNumber: rollNumberParam });
    }
  }, [rollNumberParam, setValue]);

  return (
    <section className="min-h-screen bg-surface pt-24 pb-16">
      <div className="container-main mx-auto max-w-lg py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="section-label">Results Portal</span>
          <h1 className="headline-lg mt-2 text-brand">Check Your Result</h1>
          <p className="mt-2 text-muted">
            Enter your roll number to view examination results.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit(onSubmit)}
          className="card mt-8 p-6 shadow-card sm:p-8"
        >
          <Input
            label="Roll Number"
            placeholder="e.g. SEO2024001"
            error={errors.rollNumber?.message}
            {...register("rollNumber")}
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-teal mt-5 w-full disabled:opacity-50"
          >
            <Search size={18} />
            {loading ? "Checking..." : "Check Result"}
          </button>
        </motion.form>

        <AnimatePresence mode="wait">
          {notFound && (
            <motion.div
              key="not-found"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
            >
              <AlertCircle size={18} />
              <p className="text-sm">No result found. Please check your roll number.</p>
            </motion.div>
          )}

          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6"
            >
              <ResultCard data={result} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <p className="text-muted">Loading Portal...</p>
      </div>
    }>
      <ResultPageContent />
    </Suspense>
  );
}
