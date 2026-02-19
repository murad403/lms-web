import { activityLogs } from '@/lib/organization'
import { Clock } from 'lucide-react'
import Image from 'next/image'
import avatar from "@/assets/for-school/image1.png"

const ActivityLogs = () => {
    return (
        <div className='bg-white border border-border-light p-5 rounded-md'>
            <div className='mb-6'>
                <h3 className="text-lg font-semibold text-title">Recent Activity</h3>
                <p className='text-sm text-description'>Track what your team members are doing</p>
            </div>
            <div className="space-y-4">
                {activityLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between rounded-md gap-4 p-4 border border-border-light">
                        <div className='flex gap-4 items-center'>
                            <Image className="rounded-full size-12" src={log.avatar || avatar} alt={log.user} width={500} height={500} />
                            <div>
                                <h3 className="font-medium text-title">{log.user}</h3>
                                <p className="text-sm text-description">{log.action} {log.target}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3 text-description" />
                            <span className="text-xs text-description">{log.time}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ActivityLogs
