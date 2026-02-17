import InstructorSidebar from "@/components/shared/InstructorSidebar";
import InstructorTopbar from "@/components/shared/InstructorTopbar";

const InstructorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-light-bg">
      <InstructorSidebar />
      <div className="lg:ml-80">
        <InstructorTopbar />
        <main className="px-4 sm:px-10 md:px-30 py-6">{children}</main>
      </div>
    </div>
  );
};

export default InstructorLayout;
