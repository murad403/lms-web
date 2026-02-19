import { Badge } from '@/components/ui/badge'
import { instructorPastClasses } from '@/lib/instructor'
import { CalendarIcon, Clock, User } from 'lucide-react'
import React from 'react'

const LiveClassPastSessions = () => {
    return (

        <div>
            <h3 className="text-xl font-bold text-title mb-4">Past Sessions</h3>
            <div className="rounded-md border border-border-light p-5">
                <h4 className="text-base font-bold text-title mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-description" />
                    Past Live Classes
                </h4>
                <div className="space-y-3">
                    {instructorPastClasses.map((session) => (
                        <div
                            key={session.id}
                            className="flex flex-col bg-white sm:flex-row sm:items-center justify-between gap-2 p-4 border border-border-light rounded-md"
                        >
                            <div className="min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h4 className="text-base font-medium text-title">{session.title}</h4>
                                    <Badge
                                        className={`text-xs ${session.status === "Attended"
                                            ? "bg-green-500 text-white"
                                            : "bg-red-500 text-white"
                                            }`}
                                    >
                                        {session.status}
                                    </Badge>
                                </div>
                                <p className="text-xs text-description mt-0.5">{session.courseName}</p>
                                <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-description">
                                    <span className="flex items-center gap-1">
                                        <User className="w-3 h-3" />
                                        {session.instructor}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <CalendarIcon className="w-3 h-3" />
                                        {session.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {session.time}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LiveClassPastSessions
