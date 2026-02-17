"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

type Props = {
    description: string;
    setDescription: (val: string) => void;
    requirements: string[];
    setRequirements: (val: string[]) => void;
    whatYouWillTeach: string[];
    setWhatYouWillTeach: (val: string[]) => void;
};

const MAX_ITEMS = 8;

const AdvanceInfoTab = ({
    description,
    setDescription,
    requirements,
    setRequirements,
    whatYouWillTeach,
    setWhatYouWillTeach,
}: Props) => {
    const [newRequirement, setNewRequirement] = useState("");
    const [newTeachItem, setNewTeachItem] = useState("");

    const addRequirement = () => {
        if (!newRequirement.trim() || requirements.length >= MAX_ITEMS) return;
        setRequirements([...requirements, newRequirement.trim()]);
        setNewRequirement("");
    };

    const removeRequirement = (index: number) => {
        setRequirements(requirements.filter((_, i) => i !== index));
    };

    const addTeachItem = () => {
        if (!newTeachItem.trim() || whatYouWillTeach.length >= MAX_ITEMS) return;
        setWhatYouWillTeach([...whatYouWillTeach, newTeachItem.trim()]);
        setNewTeachItem("");
    };

    const removeTeachItem = (index: number) => {
        setWhatYouWillTeach(whatYouWillTeach.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-6">
            {/* Course Description - Rich Text Editor */}
            <div>
                <label className="text-sm font-medium text-title mb-1.5 block">
                    Course Description
                </label>
                {/* Simple toolbar */}
                <div className="border border-border-light rounded-t-lg border-b-0 bg-gray-50 px-3 py-2 flex flex-wrap gap-1">
                    {["B", "I", "U", "S"].map((btn) => (
                        <button
                            key={btn}
                            type="button"
                            className={`w-8 h-8 rounded text-sm font-bold text-description hover:bg-gray-200 transition-colors ${
                                btn === "B"
                                    ? "font-bold"
                                    : btn === "I"
                                    ? "italic"
                                    : btn === "U"
                                    ? "underline"
                                    : "line-through"
                            }`}
                        >
                            {btn}
                        </button>
                    ))}
                    <span className="w-px h-8 bg-border-light mx-1" />
                    <button
                        type="button"
                        className="px-2 h-8 rounded text-xs text-description hover:bg-gray-200 transition-colors"
                    >
                        H1
                    </button>
                    <button
                        type="button"
                        className="px-2 h-8 rounded text-xs text-description hover:bg-gray-200 transition-colors"
                    >
                        H2
                    </button>
                    <span className="w-px h-8 bg-border-light mx-1" />
                    <button
                        type="button"
                        className="px-2 h-8 rounded text-xs text-description hover:bg-gray-200 transition-colors"
                    >
                        • List
                    </button>
                    <button
                        type="button"
                        className="px-2 h-8 rounded text-xs text-description hover:bg-gray-200 transition-colors"
                    >
                        1. List
                    </button>
                </div>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={8}
                    placeholder="Provide a detailed description of your course..."
                    className="w-full border border-border-light rounded-b-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-main resize-none"
                />
            </div>

            {/* Course Requirements */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-title">
                        Course Requirements
                    </label>
                    <span className="text-xs text-description">
                        {requirements.length}/{MAX_ITEMS}
                    </span>
                </div>

                <div className="space-y-2 mb-3">
                    {requirements.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2.5"
                        >
                            <span className="text-sm text-title flex-1">{item}</span>
                            <button
                                type="button"
                                onClick={() => removeRequirement(index)}
                                className="p-1 hover:bg-red-50 rounded transition-colors"
                            >
                                <X className="w-3.5 h-3.5 text-red-500" />
                            </button>
                        </div>
                    ))}
                </div>

                {requirements.length < MAX_ITEMS && (
                    <div className="flex gap-2">
                        <input
                            value={newRequirement}
                            onChange={(e) => setNewRequirement(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addRequirement())}
                            placeholder="Add a requirement..."
                            className="flex-1 border border-border-light rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-main"
                        />
                        <button
                            type="button"
                            onClick={addRequirement}
                            className="px-3 py-2.5 bg-main text-white rounded-lg text-sm font-medium hover:bg-main/90 transition-colors flex items-center gap-1"
                        >
                            <Plus className="w-4 h-4" />
                            Add New
                        </button>
                    </div>
                )}
            </div>

            {/* What You Will Teach */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-title">
                        What You Will Teach
                    </label>
                    <span className="text-xs text-description">
                        {whatYouWillTeach.length}/{MAX_ITEMS}
                    </span>
                </div>

                <div className="space-y-2 mb-3">
                    {whatYouWillTeach.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2.5"
                        >
                            <span className="text-sm text-title flex-1">{item}</span>
                            <button
                                type="button"
                                onClick={() => removeTeachItem(index)}
                                className="p-1 hover:bg-red-50 rounded transition-colors"
                            >
                                <X className="w-3.5 h-3.5 text-red-500" />
                            </button>
                        </div>
                    ))}
                </div>

                {whatYouWillTeach.length < MAX_ITEMS && (
                    <div className="flex gap-2">
                        <input
                            value={newTeachItem}
                            onChange={(e) => setNewTeachItem(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTeachItem())}
                            placeholder="Add a learning objective..."
                            className="flex-1 border border-border-light rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-main"
                        />
                        <button
                            type="button"
                            onClick={addTeachItem}
                            className="px-3 py-2.5 bg-main text-white rounded-lg text-sm font-medium hover:bg-main/90 transition-colors flex items-center gap-1"
                        >
                            <Plus className="w-4 h-4" />
                            Add New
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdvanceInfoTab;
