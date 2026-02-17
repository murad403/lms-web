import InstructorSidebar from "@/components/shared/InstructorSidebar";
import InstructorTopbar from "@/components/shared/InstructorTopbar";

const InstructorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-light-bg">
      <InstructorSidebar />
      <div className="lg:ml-60">
        <InstructorTopbar />
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
};

export default InstructorLayout;
