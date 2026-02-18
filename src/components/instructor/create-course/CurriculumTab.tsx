"use client";

import { useState } from "react";
import { Plus, GripVertical, Pencil, Trash2, ChevronDown, ChevronUp, Video, FileText, X, Check, Upload, File } from "lucide-react";
import { TCourseSection, TCourseLecture } from "@/lib/instructor";
import { Link } from "@/i18n/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";

type Props = {
    sections: TCourseSection[];
    setSections: (val: TCourseSection[]) => void;
    onNext: () => void;
    onPrev: () => void;
};

type ModalType = "editSection" | "lectureVideo" | "lectureNotes" | "lectureDescription" | "attachFile" | null;

const CurriculumTab = ({ sections, setSections, onNext, onPrev }: Props) => {
    const [expandedSections, setExpandedSections] = useState<string[]>(
        sections.map((s) => s.id)
    );
    const [modalType, setModalType] = useState<ModalType>(null);
    const [selectedSection, setSelectedSection] = useState<TCourseSection | null>(null);
    const [selectedLecture, setSelectedLecture] = useState<{ sectionId: string; lecture: TCourseLecture } | null>(null);
    const [editingSectionTitle, setEditingSectionTitle] = useState("");
    const [lectureNotes, setLectureNotes] = useState("");
    const [lectureDescription, setLectureDescription] = useState("");
    const [uploadedVideo, setUploadedVideo] = useState<{ name: string; preview: string } | null>(null);

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

    const openEditSection = (section: TCourseSection) => {
        setSelectedSection(section);
        setEditingSectionTitle(section.title);
        setModalType("editSection");
    };

    const saveEditSection = () => {
        if (!selectedSection || !editingSectionTitle.trim()) return;
        setSections(
            sections.map((s) =>
                s.id === selectedSection.id ? { ...s, title: editingSectionTitle.trim() } : s
            )
        );
        setModalType(null);
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

    const openLectureModal = (sectionId: string, lecture: TCourseLecture, type: ModalType) => {
        setSelectedLecture({ sectionId, lecture });
        setModalType(type);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-title">Curriculum</h3>
            <div className="border-b border-border-light" />

            {sections.map((section) => (
                <div
                    key={section.id}
                    className="border border-border-light rounded-md overflow-hidden"
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

                        <span className="flex-1 text-sm font-semibold text-title">
                            {section.title}
                        </span>

                        <div className="flex items-center gap-1 shrink-0">
                            <button
                                type="button"
                                onClick={() => openEditSection(section)}
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
                                    className="flex items-center gap-2 px-3 py-2.5 bg-white border border-border-light rounded-md"
                                >
                                    <GripVertical className="w-3.5 h-3.5 text-description cursor-grab shrink-0" />
                                    {lecture.type === "video" ? (
                                        <Video className="w-4 h-4 text-main shrink-0" />
                                    ) : (
                                        <FileText className="w-4 h-4 text-main shrink-0" />
                                    )}

                                    <span className="flex-1 text-sm text-title">
                                        Lecture {lIndex + 1}: {lecture.title}
                                    </span>

                                    {lecture.duration && (
                                        <span className="text-xs text-description shrink-0">
                                            {lecture.duration}
                                        </span>
                                    )}

                                    <div className="flex items-center gap-1 shrink-0">
                                        <button
                                            type="button"
                                            onClick={() => openLectureModal(section.id, lecture, "lectureVideo")}
                                            className="p-1 hover:bg-gray-100 rounded transition-colors text-xs text-main"
                                            title="Upload Video"
                                        >
                                            <Video className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => openLectureModal(section.id, lecture, "attachFile")}
                                            className="p-1 hover:bg-gray-100 rounded transition-colors text-xs text-main"
                                            title="Attach File"
                                        >
                                            <File className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => openLectureModal(section.id, lecture, "lectureDescription")}
                                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                                        >
                                            <Pencil className="w-3 h-3 text-description" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => deleteLecture(section.id, lecture.id)}
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
                                    className="flex items-center gap-1 px-3 py-2 border border-dashed border-border-light rounded-md text-xs font-medium text-description hover:text-title hover:border-main transition-colors"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                    Add Lecture
                                </button>
                                <Link
                                    href={`/instructor/create-course/quiz?section=${section.id}`}
                                    className="flex items-center gap-1 px-3 py-2 border border-dashed border-border-light rounded-md text-xs font-medium text-description hover:text-title hover:border-main transition-colors"
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
                className="w-full flex items-center justify-center gap-1.5 px-4 py-3 border-2 border-dashed border-border-light rounded-md text-sm font-medium text-description hover:text-main hover:border-main transition-colors"
            >
                <Plus className="w-4 h-4" />
                Add New Section
            </button>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-6 border-t border-border-light">
                <button
                    type="button"
                    onClick={onPrev}
                    className="px-5 py-2.5 border border-border-light rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors"
                >
                    Previous
                </button>
                <button
                    type="button"
                    onClick={onNext}
                    className="px-5 py-2.5 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors"
                >
                    Save & Next
                </button>
            </div>

            {/* Edit Section Modal */}
            <Dialog open={modalType === "editSection"} onOpenChange={() => setModalType(null)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold text-title">Edit Section Name</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-2">
                        <div>
                            <label className="text-sm font-medium text-title mb-1.5 block">Section</label>
                            <input
                                value={editingSectionTitle}
                                onChange={(e) => setEditingSectionTitle(e.target.value)}
                                placeholder="Write your section name here..."
                                className="w-full border border-border-light rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-main"
                            />
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setModalType(null)}
                                className="px-4 py-2 border border-border-light rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveEditSection}
                                className="px-4 py-2 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Lecture Video Modal */}
            <Dialog open={modalType === "lectureVideo"} onOpenChange={() => setModalType(null)}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold text-title">Lecture Video</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-2">
                        {uploadedVideo ? (
                            <div className="flex gap-4 items-start">
                                <div className="w-32 h-20 bg-gray-100 rounded-md overflow-hidden">
                                    <video src={uploadedVideo.preview} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-medium text-green-600 uppercase">FILE UPLOADED</span>
                                        <span className="text-xs text-description">• 1:55</span>
                                    </div>
                                    <p className="text-sm text-title truncate">{uploadedVideo.name}</p>
                                    <button
                                        onClick={() => setUploadedVideo(null)}
                                        className="text-sm text-main mt-2"
                                    >
                                        Replace Video
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="border-2 border-dashed border-border-light rounded-md p-6 text-center">
                                <p className="text-sm text-description mb-2">Upload Files</p>
                                <label className="inline-flex items-center gap-2 px-4 py-2 text-main text-sm font-medium hover:text-main/80 cursor-pointer">
                                    <Upload className="w-4 h-4" />
                                    Upload File
                                    <input
                                        type="file"
                                        accept="video/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setUploadedVideo({
                                                    name: file.name,
                                                    preview: URL.createObjectURL(file),
                                                });
                                            }
                                        }}
                                        className="hidden"
                                    />
                                </label>
                                <p className="text-xs text-description mt-2">
                                    Note: All files should be at least 720p in a lesson
                                </p>
                            </div>
                        )}
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setModalType(null)}
                                className="px-4 py-2 border border-border-light rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setModalType(null)}
                                className="px-4 py-2 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors"
                            >
                                Upload Video
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Add Lecture Description Modal */}
            <Dialog open={modalType === "lectureDescription"} onOpenChange={() => setModalType(null)}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold text-title">Add Lecture Description</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-2">
                        <div className="border-2 border-dashed border-main rounded-md p-4">
                            <textarea
                                value={lectureDescription}
                                onChange={(e) => setLectureDescription(e.target.value)}
                                rows={4}
                                placeholder="Write your lecture description here..."
                                className="w-full text-sm focus:outline-none resize-none"
                            />
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setModalType(null)}
                                className="px-4 py-2 border border-border-light rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setModalType(null)}
                                className="px-4 py-2 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors"
                            >
                                Add Description
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Add Lecture Notes Modal */}
            <Dialog open={modalType === "lectureNotes"} onOpenChange={() => setModalType(null)}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold text-title">Add Lecture Notes</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-2">
                        <div>
                            <label className="text-sm font-medium text-title mb-1.5 block">Notes</label>
                            <textarea
                                value={lectureNotes}
                                onChange={(e) => setLectureNotes(e.target.value)}
                                rows={4}
                                placeholder="Write your lecture Notes here..."
                                className="w-full border border-border-light rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-main resize-none"
                            />
                        </div>
                        <div className="border border-dashed border-border-light rounded-md p-4 text-center">
                            <p className="text-sm font-medium text-title mb-2">Uploads Notes</p>
                            <label className="text-sm text-description cursor-pointer">
                                Drag and drop a file or <span className="text-main">Browse file</span>
                                <input type="file" className="hidden" />
                            </label>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setModalType(null)}
                                className="px-4 py-2 border border-border-light rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setModalType(null)}
                                className="px-4 py-2 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors"
                            >
                                Add Notes
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Attach File Modal */}
            <Dialog open={modalType === "attachFile"} onOpenChange={() => setModalType(null)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold text-title">Attach File</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-2">
                        <div className="border border-dashed border-border-light rounded-md p-6 text-center">
                            <p className="text-sm font-medium text-title mb-2">Attach File</p>
                            <label className="text-sm text-description cursor-pointer">
                                Drag and drop a file or <span className="text-main">Browse file</span>
                                <input type="file" className="hidden" />
                            </label>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setModalType(null)}
                                className="px-4 py-2 border border-border-light rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setModalType(null)}
                                className="px-4 py-2 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors"
                            >
                                Save & upload
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CurriculumTab;
