import { useTranslations } from 'next-intl'

type Props = {
    bio?: string;
};

const ProfileAbout = ({ bio }: Props) => {
    const t = useTranslations("InstructorProfile");
    return (
        <div className="container mx-auto py-8 space-y-8">
            <div className="bg-white p-6 rounded-lg border border-border-light">
                <h2 className="text-sm font-bold text-title mb-3 uppercase tracking-widest">
                    {t("aboutMe")}
                </h2>
                <div className="text-sm text-description leading-relaxed whitespace-pre-line">
                    {bio || ""}
                </div>
            </div>
        </div>
    )
}

export default ProfileAbout
