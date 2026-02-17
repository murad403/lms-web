import InstructorSidebar from "@/components/shared/InstructorSidebar";
import InstructorTopbar from "@/components/shared/InstructorTopbar";

const InstructorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-light-bg">
      <InstructorSidebar />
      <div className="lg:ml-60">
        <InstructorTopbar />
        <main className="p-4 sm:p-6">{children}</main>
        {/* Footer */}
        <footer className="px-6 py-4 border-t border-gray-200 bg-white text-center">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-description">
            <span>FAQs</span>
            <span>Privacy Policy</span>
            <span>Terms & Condition</span>
          </div>
          <p className="text-xs text-description mt-2">
            © From-Cert. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default InstructorLayout;
