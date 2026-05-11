"use client";
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Building2, UserCircle2, Globe } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from '@/i18n/navigation';
import { useInstructorInvitationAcceptOrRejectMutation } from '@/redux/features/organization/organization.api';
import { useSearchParams } from 'next/navigation';
import React from 'react';

import { getClientSession } from '@/utils/auth-client';

const OrganizationInvitationPage = () => {
  const searchParams = useSearchParams();
  const t = useTranslations("OrganizationInvitation");
  const router = useRouter();
  const [respondInvitation, { isLoading }] = useInstructorInvitationAcceptOrRejectMutation();
  const invitationToken = searchParams.get('token');

  React.useEffect(() => {
    if (invitationToken) {
      localStorage.setItem('invitation_token', invitationToken);
    }
  }, [invitationToken]);

  const handleResponse = async (action: 'accept' | 'reject') => {
    const token = localStorage.getItem('invitation_token');

    if (!token) {
      toast.error("Invitation token not found. Please use the link from your email.");
      return;
    }

    // If user is not logged in, redirect to sign-in
    const session = getClientSession();
    if (!session.accessToken) {
      router.push('/auth/sign-in');
      return;
    }

    try {
      const response = await respondInvitation({
        token,
        data: { action }
      }).unwrap();
      console.log("response", response)
      if (response.success) {
        toast.success(response.message);
        router.replace('/instructor/dashboard');
        localStorage.removeItem('invitation_token');
      }
    } catch (error: any) {
      // console.log(error)
      toast.error(error?.data?.message || "Something went wrong");
      localStorage.removeItem('invitation_token');
    }
  };

  const handleAccept = () => handleResponse('accept');
  const handleReject = () => handleResponse('reject');

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center p-4 bg-gray-50/30 relative">
      <div className="w-full max-w-md bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
        <div className="h-2.5 bg-main" /> {/* Premium thick top accent bar */}

        <div className="p-8 md:p-10 text-center">
          <div className="mx-auto w-24 h-24 bg-main/5 rounded-full flex items-center justify-center mb-8 relative">
            <div className="absolute inset-0 bg-main/5 animate-ping rounded-full opacity-20" />
            <Building2 className="w-12 h-12 text-main relative z-10" />
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-title mb-3 tracking-tight">
            {t("title")}
          </h1>

          <p className="text-description text-base mb-10 max-w-[90%] mx-auto leading-relaxed">
            {t("description")}
          </p>

          <div className="bg-gray-50/80 p-6 rounded-2xl border border-gray-100 text-left mb-10 transition-colors hover:bg-gray-50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-100">
                <UserCircle2 className="w-6 h-6 text-main" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-description font-bold">{t("title")}</p>
                <span className="text-base font-bold text-title">Forma-Cert Organization</span>
              </div>
            </div>
            <p className="text-description text-[15px] leading-relaxed font-medium">
              {t("welcomeMessage", { organizationName: "Forma-Cert Org", role: "Instructor" })}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Button
              onClick={handleAccept}
              className="w-full h-14 text-lg font-bold bg-main hover:bg-main/90 text-white shadow-xl shadow-main/20 transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] rounded-2xl cursor-pointer"
            >
              <CheckCircle2 className="w-6 h-6 mr-2" />
              {t("accept")}
            </Button>

            <Button
              onClick={handleReject}
              variant="ghost"
              className="w-full h-12 text-base font-bold text-description hover:text-red-500 hover:bg-red-50 transition-all rounded-2xl cursor-pointer"
            >
              <XCircle className="w-5 h-5 mr-2" />
              {t("reject")}
            </Button>
          </div>
        </div>

        <div className="bg-gray-50/50 border-t border-gray-100 px-10 py-6">
          <p className="text-xs text-gray-400 text-center leading-relaxed font-medium">
            By accepting this invitation, you agree to join the organization and follow its internal policies and guidelines.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrganizationInvitationPage;