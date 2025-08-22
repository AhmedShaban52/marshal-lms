"use client"

import { CourseSidebarDataType } from "@/app/data/course/get-course-sidebar-data";
import { useMemo } from "react";

interface iAppProps {
  courseData: CourseSidebarDataType["course"];
}

interface CourseProgressReult {
  totalLessons: number;
  completedLessons: number;
  progressPercentage: number;
}

export function useCourseProgress({
  courseData,
}: iAppProps): CourseProgressReult {
  return useMemo(() => {
    let totalLessons = 0;

    let completedLessons = 0;

    courseData.chapter.forEach((chapter) => {
      chapter.lessons.forEach((lesson) => {
        totalLessons++;

        // check if this lesson is completed
        const isCompleted = lesson.lessonProgress.some(
          (progress) => progress.lessonId === lesson.id && progress.completed
        );

        if (isCompleted) {
          completedLessons++;
        }
      });
    });

    const progressPercentage =
      totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0;

    return {
      totalLessons,
      completedLessons,
      progressPercentage,
    };
  }, [courseData]);
}
