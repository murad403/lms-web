import InstructorWrapper from "@/components/wrapper/InstructorWrapper";
import { getServerAuthSession } from "@/utils/auth-server";


const InstructorLayout = async ({ children }: { children: React.ReactNode }) => {
  const initialSession = await getServerAuthSession();

  return (
    <InstructorWrapper initialSession={initialSession}>
      {children}
    </InstructorWrapper>
  );
};

export default InstructorLayout;
