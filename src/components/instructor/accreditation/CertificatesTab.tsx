"use client";

import { TActiveCertificate } from "@/lib/instructor";

type Props = {
    certificates: TActiveCertificate[];
};

const CertificatesTab = ({ certificates }: Props) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-border-light">
                        <th className="py-3 px-4 text-xs font-semibold text-description uppercase">
                            Course Name
                        </th>
                        <th className="py-3 px-4 text-xs font-semibold text-description uppercase">
                            Certificate ID
                        </th>
                        <th className="py-3 px-4 text-xs font-semibold text-description uppercase">
                            Issued
                        </th>
                        <th className="py-3 px-4 text-xs font-semibold text-description uppercase">
                            Valid Until
                        </th>
                        <th className="py-3 px-4 text-xs font-semibold text-description uppercase">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {certificates.map((cert) => (
                        <tr
                            key={cert.id}
                            className="border-b border-border-light last:border-0"
                        >
                            <td className="py-3.5 px-4 text-sm font-medium text-title">
                                {cert.courseName}
                            </td>
                            <td className="py-3.5 px-4 text-sm text-description">
                                {cert.certId}
                            </td>
                            <td className="py-3.5 px-4 text-sm text-description">
                                {cert.issued.toLocaleString()}
                            </td>
                            <td className="py-3.5 px-4 text-sm text-description">
                                {cert.validUntil}
                            </td>
                            <td className="py-3.5 px-4">
                                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-100 text-green-700">
                                    {cert.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CertificatesTab;
