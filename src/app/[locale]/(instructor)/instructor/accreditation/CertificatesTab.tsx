"use client";

import { TActiveCertificate } from "@/lib/instructor";
import { SlBadge } from "react-icons/sl";
import { useTranslations } from "next-intl";

type Props = {
    certificates: TActiveCertificate[];
};

const CertificatesTab = ({ certificates }: Props) => {
    const t = useTranslations("InstructorAccreditation");
    return (
        <div className="overflow-x-auto bg-white rounded-md p-5">
            <div>
                <h2 className="text-lg font-semibold text-title">{t("activeCertificates")}</h2>
                <p className="text-sm text-description">{t("certificatesDesc")}</p>
            </div>
            <div className="mt-6 space-y-4">
                {
                    certificates.map((cert) => (
                        <div key={cert.id} className="p-4 border border-border-light rounded-md">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="bg-[#ECF9FF] p-2 rounded-md shrink-0">
                                        <SlBadge className="text-main size-6" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-medium text-title truncate">{cert.courseName}</h3>
                                        <p className="text-sm text-description">{cert.certId}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
                                    <div>
                                        <h3 className="font-medium text-title">1,247</h3>
                                        <p className="text-sm text-description">{t("issued")}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-title">{cert.validUntil}</h3>
                                        <p className="text-sm text-description">{t("validUntil")}</p>
                                    </div>
                                    <span className="text-xs font-medium px-2.5 py-1 rounded-sm bg-[#C4EBFF] text-main">
                                        {cert.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default CertificatesTab;
