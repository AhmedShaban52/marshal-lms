"use client";

import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { useTransition } from "react";
import { enrollInCourseAction } from "../actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function EnrollmentButton({ courseId }: { courseId: string }) {
  const [pending, startTransition] = useTransition();

  function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        enrollInCourseAction(courseId)
      );

      if (error) {
        toast.error("An unexpected error occured. Please try again.");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }

  return (
    <Button className="w-full" disabled={pending} onClick={onSubmit}>
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Loading...
        </>
      ) : (
        "Enroll Now!"
      )}
    </Button>
  );
}
