import { AffiliateSideBar } from "@/components/affiliate/AffiliateSideBar";
import AffiliateTopbar from "@/components/shared/AffiliateTopbar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "18rem",
          "--sidebar-width-mobile": "18rem",
        } as React.CSSProperties
      }
    >
      <AffiliateSideBar />
      <main className="w-full">
        <AffiliateTopbar />
        {children}
      </main>
    </SidebarProvider>
  );
}
