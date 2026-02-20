"use client";
import { Plus } from "lucide-react";
import InstructorStats from "./InstructorStats";
import InstructorTable from "./InstructorTable";
import { useState } from "react";



const InstructorsPage = () => {
  const [showAddInstructor, setShowAddInstructor] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-title">Instructors</h1>
          <p className="text-sm text-description mt-1">Manage your organization instructors</p>
        </div>
        <button
          onClick={() => setShowAddInstructor(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-main text-white text-sm font-medium hover:bg-main/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Instructor
        </button>
      </div>

      {/* Stats */}
      <InstructorStats />

      <InstructorTable showAddInstructor={showAddInstructor} setShowAddInstructor={setShowAddInstructor} />

    </div>
  );
};

export default InstructorsPage;
