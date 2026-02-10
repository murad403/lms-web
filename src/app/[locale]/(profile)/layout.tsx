import ProfileHeader from "@/components/shared/ProfileHeader";
import ProfileSidebar from "@/components/shared/ProfileSidebar";
import Navbar from "@/components/shared/Navbar";
import Menu from "@/components/shared/Menu";
import Footer from "@/components/shared/Footer";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Menu />
      <Navbar />
      <div className="bg-light-bg min-h-screen">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-0 py-6 md:py-10">
          <ProfileHeader />
          <div className="flex flex-col lg:flex-row gap-6">
            <ProfileSidebar />
            <div className="flex-1 min-w-0">{children}</div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default ProfileLayout;
