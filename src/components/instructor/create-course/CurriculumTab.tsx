"use client";

import { useState } from "react";
import { Plus, GripVertical, Pencil, Trash2, ChevronDown, ChevronUp, Video, FileText, X, Check } from "lucide-react";
import { TCourseSection, TCourseLecture } from "@/lib/instructor";
import { Link } from "@/i18n/navigation";

type Props = {
    sections: TCourseSection[];
    setSections: (val: TCourseSection[]) => void;
};

const CurriculumTab = ({ sections, setSections }: Props) => {
    const [expandedSections, setExpandedSections] = useState<string[]>(
        sections.map((s) => s.id)
    );
    const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
    const [editingSectionTitle, setEditingSectionTitle] = useState("");
    const [editingLectureId, setEditingLectureId] = useState<string | null>(null);
    const [editingLectureTitle, setEditingLectureTitle] = useState("");

    const toggleSection = (id: string) => {
        setExpandedSections((prev) =>
            prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
        );
    };

    // Section operations
    const addSection = () => {
        const newSection: TCourseSection = {
            id: `section-${Date.now()}`,
            title: `Section ${sections.length + 1}: New Section`,
            lectures: [],
        };
        setSections([...sections, newSection]);
        setExpandedSections((prev) => [...prev, newSection.id]);
    };

    const deleteSection = (sectionId: string) => {
        setSections(sections.filter((s) => s.id !== sectionId));
    };

    const startEditSection = (section: TCourseSection) => {
        setEditingSectionId(section.id);
        setEditingSectionTitle(section.title);
    };

    const saveEditSection = () => {
        if (!editingSectionId || !editingSectionTitle.trim()) return;
        setSections(
            sections.map((s) =>
                s.id === editingSectionId ? { ...s, title: editingSectionTitle.trim() } : s
            )
        );
        setEditingSectionId(null);
    };

    // Lecture operations
    const addLecture = (sectionId: string) => {
        const newLecture: TCourseLecture = {
            id: `lecture-${Date.now()}`,
            title: "New Lecture",
            type: "video",
        };
        setSections(
            sections.map((s) =>
                s.id === sectionId ? { ...s, lectures: [...s.lectures, newLecture] } : s
            )
        );
    };

    const deleteLecture = (sectionId: string, lectureId: string) => {
        setSections(
            sections.map((s) =>
                s.id === sectionId
                    ? { ...s, lectures: s.lectures.filter((l) => l.id !== lectureId) }
                    : s
            )
        );
    };

    const startEditLecture = (lecture: TCourseLecture) => {
        setEditingLectureId(lecture.id);
        setEditingLectureTitle(lecture.title);
    };

    const saveEditLecture = (sectionId: string) => {
        if (!editingLectureId || !editingLectureTitle.trim()) return;
        setSections(
            sections.map((s) =>
                s.id === sectionId
                    ? {
                          ...s,
                          lectures: s.lectures.map((l) =>
                              l.id === editingLectureId
                                  ? { ...l, title: editingLectureTitle.trim() }
                                  : l
                          ),
                      }
                    : s
            )
        );
        setEditingLectureId(null);
    };

    return (
        <div className="space-y-4">
            {sections.map((section, sIndex) => (
                <div
                    key={section.id}
                    className="border border-border-light rounded-lg overflow-hidden"
                >
                    {/* Section Header */}
                    <div className="bg-gray-50 px-4 py-3 flex items-center gap-2">
                        <GripVertical className="w-4 h-4 text-description cursor-grab shrink-0" />
                        <button
                            type="button"
                            onClick={() => toggleSection(section.id)}
                            className="p-0.5"
                        >
                            {expandedSections.includes(section.id) ? (
                                <ChevronUp className="w-4 h-4 text-description" />
                            ) : (
                                <ChevronDown className="w-4 h-4 text-description" />
                            )}
                        </button>

                        {editingSectionId === section.id ? (
                            <div className="flex-1 flex items-center gap-2">
                                <input
                                    value={editingSectionTitle}
                                    onChange={(e) => setEditingSectionTitle(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && saveEditSection()}
                                    className="flex-1 border border-main rounded px-2 py-1 text-sm focus:outline-none"
                                    autoFocus
                                />
                                <button
                                    type="button"
                                    onClick={saveEditSection}
                                    className="p-1 hover:bg-green-50 rounded"
                                >
                                    <Check className="w-4 h-4 text-green-600" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditingSectionId(null)}
                                    className="p-1 hover:bg-red-50 rounded"
                                >
                                    <X className="w-4 h-4 text-red-500" />
                                </button>
                            </div>
                        ) : (
                            <span className="flex-1 text-sm font-semibold text-title">
                                {section.title}
                            </span>
                        )}

                        <div className="flex items-center gap-1 shrink-0">
                            <button
                                type="button"
                                onClick={() => startEditSection(section)}
                                className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                            >
                                <Pencil className="w-3.5 h-3.5 text-description" />
                            </button>
                            <button
                                type="button"
                                onClick={() => deleteSection(section.id)}
                                className="p-1.5 hover:bg-red-50 rounded transition-colors"
                            >
                                <Trash2 className="w-3.5 h-3.5 text-red-500" />
                            </button>
                        </div>
                    </div>

                    {/* Lectures */}
                    {expandedSections.includes(section.id) && (
                        <div className="p-4 space-y-2">
                            {section.lectures.map((lecture, lIndex) => (
                                <div
                                    key={lecture.id}
                                    className="flex items-center gap-2 px-3 py-2.5 bg-white border border-border-light rounded-lg"
                                >
                                    <GripVertical className="w-3.5 h-3.5 text-description cursor-grab shrink-0" />
                                    {lecture.type === "video" ? (
                                        <Video className="w-4 h-4 text-main shrink-0" />
                                    ) : (
                                        <FileText className="w-4 h-4 text-main shrink-0" />
                                    )}

                                    {editingLectureId === lecture.id ? (
                                        <div className="flex-1 flex items-center gap-2">
                                            <input
                                                value={editingLectureTitle}
                                                onChange={(e) =>
                                                    setEditingLectureTitle(e.target.value)
                                                }
                                                onKeyDown={(e) =>
                                                    e.key === "Enter" &&
                                                    saveEditLecture(section.id)
                                                }
                                                className="flex-1 border border-main rounded px-2 py-1 text-sm focus:outline-none"
                                                autoFocus
                                            />
                                            <button
                                                type="button"
                                                onClick={() => saveEditLecture(section.id)}
                                                className="p-1 hover:bg-green-50 rounded"
                                            >
                                                <Check className="w-3.5 h-3.5 text-green-600" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setEditingLectureId(null)}
                                                className="p-1 hover:bg-red-50 rounded"
                                            >
                                                <X className="w-3.5 h-3.5 text-red-500" />
                                            </button>
                                        </div>
                                    ) : (
                                        <span className="flex-1 text-sm text-title">
                                            Lecture {lIndex + 1}: {lecture.title}
                                        </span>
                                    )}

                                    {lecture.duration && (
                                        <span className="text-xs text-description shrink-0">
                                            {lecture.duration}
                                        </span>
                                    )}

                                    <div className="flex items-center gap-1 shrink-0">
                                        <button
                                            type="button"
                                            onClick={() => startEditLecture(lecture)}
                                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                                        >
                                            <Pencil className="w-3 h-3 text-description" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                deleteLecture(section.id, lecture.id)
                                            }
                                            className="p-1 hover:bg-red-50 rounded transition-colors"
                                        >
                                            <Trash2 className="w-3 h-3 text-red-500" />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Add Lecture & Add Quiz */}
                            <div className="flex flex-wrap gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => addLecture(section.id)}
                                    className="flex items-center gap-1 px-3 py-2 border border-dashed border-border-light rounded-lg text-xs font-medium text-description hover:text-title hover:border-main transition-colors"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                    Add Lecture
                                </button>
                                <Link
                                    href={`/instructor/create-course/quiz?section=${section.id}`}
                                    className="flex items-center gap-1 px-3 py-2 border border-dashed border-border-light rounded-lg text-xs font-medium text-description hover:text-title hover:border-main transition-colors"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                    Add Quiz
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {/* Add Section */}
            <button
                type="button"
                onClick={addSection}
                className="w-full flex items-center justify-center gap-1.5 px-4 py-3 border-2 border-dashed border-border-light rounded-lg text-sm font-medium text-description hover:text-main hover:border-main transition-colors"
            >
                <Plus className="w-4 h-4" />
                Add New Section
            </button>
        </div>
    );
};

export default CurriculumTab;
