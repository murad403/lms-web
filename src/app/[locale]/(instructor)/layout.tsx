import InstructorWrapper from "@/components/wrapper/InstructorWrapper";


const InstructorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <InstructorWrapper>
      {children}
    </InstructorWrapper>
  );
};

export default InstructorLayout;
