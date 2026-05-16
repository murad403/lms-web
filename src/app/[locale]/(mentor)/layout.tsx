import MentorWrapper from "@/components/wrapper/MentorWrapper";
import { getServerAuthSession } from "@/utils/auth-server";
import { redirect } from "@/i18n/navigation";
import { getDashboardPathByRole } from "@/utils/auth-shared";


const MentorLayout = async ({ 
    children, 
    params 
}: { 
    children: React.ReactNode; 
    params: Promise<{ locale: string }> 
}) => {
    const { locale } = await params;
    const initialSession = await getServerAuthSession();

    if (initialSession.role !== "instructor") {
        if (!initialSession.accessToken) {
            redirect({ href: "/auth/sign-in", locale });
        } else {
            redirect({ href: getDashboardPathByRole(initialSession.rawRole), locale });
        }
    }

    return (
        <MentorWrapper initialSession={initialSession}>
            {children}
        </MentorWrapper>
    );
};

export default MentorLayout;
