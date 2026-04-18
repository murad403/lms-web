import { useTranslations } from 'next-intl'
import { InstructorProfileData } from '@/redux/features/instructor/instructor.type';

type Props = {
    profile?: InstructorProfileData;
};

const ProfileAbout = ({ profile }: Props) => {
    const t = useTranslations("InstructorProfile");
    return (
        <div className="bg-white p-6">
            <h2 className="text-sm font-bold text-title mb-3 uppercase tracking-widest">
                {t("aboutMe")}
            </h2>
            <div className="text-sm text-description leading-relaxed whitespace-pre-line">
                {profile?.biography || ""}
            </div>
        </div>
    )
}

export default ProfileAbout
