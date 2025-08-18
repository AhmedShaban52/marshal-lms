import { ReactNode } from "react";
import { CourseSidebar } from "../_components/CourseSidebar";

export default function CourseLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1">
      {/* sidebar - 30% */}
      <div className="w-80 border-r border-border shrink-0">
        <CourseSidebar/>
      </div>

      {/* main Content - 70% */}
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
