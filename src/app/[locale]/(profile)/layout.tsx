import ProfileHeader from "@/components/shared/ProfileHeader";
import ProfileSidebar from "@/components/shared/ProfileSidebar";
import Navbar from "@/components/shared/Navbar";
import Menu from "@/components/shared/Menu";
import Footer from "@/components/shared/Footer";
import { getServerAuthSession } from "@/utils/auth-server";

const ProfileLayout = async ({ children }: { children: React.ReactNode }) => {
    const initialSession = await getServerAuthSession();

    return (
        <main>
            <Menu />
            <Navbar initialSession={initialSession} />
            <div className="min-h-screen">
                <div className="container mx-auto px-4 md:px-5 lg:px-6 xl:px-0 2xl:px-0 py-6 md:py-10">
                    <ProfileHeader />
                    <div className="flex flex-col lg:flex-row gap-6">
                        <ProfileSidebar />
                        <div className="flex-1 min-w-0 px-4 lg:px-0">{children}</div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default ProfileLayout;
