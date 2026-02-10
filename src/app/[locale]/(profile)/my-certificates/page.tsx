"use client";
import { useState } from "react";
import { Eye, Download } from "lucide-react";
import Pagination from "@/components/reusable/Pagination";
import { certificates } from "@/lib/profile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ITEMS_PER_PAGE = 6;

const MyCertificatesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewCert, setViewCert] = useState<string | null>(null);

  const totalPages = Math.ceil(certificates.length / ITEMS_PER_PAGE);
  const paginated = certificates.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const selectedCert = certificates.find((c) => c.id === viewCert);

  return (
    <div>
      <h2 className="text-lg sm:text-xl font-bold text-title mb-6">
        My Certificates
      </h2>

      <div className="bg-white rounded-xl border border-border-light overflow-hidden">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 font-semibold text-title text-xs">
                  ID
                </th>
                <th className="text-left py-3 px-4 font-semibold text-title text-xs">
                  Course Name
                </th>
                <th className="text-left py-3 px-4 font-semibold text-title text-xs">
                  Date
                </th>
                <th className="text-left py-3 px-4 font-semibold text-title text-xs">
                  Marks
                </th>
                <th className="text-left py-3 px-4 font-semibold text-title text-xs">
                  Out of
                </th>
                <th className="text-right py-3 px-4 font-semibold text-title text-xs">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((cert) => (
                <tr key={cert.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-4 px-4 text-xs text-description">{cert.id}</td>
                  <td className="py-4 px-4 text-xs sm:text-sm font-medium text-title">
                    {cert.courseName}
                  </td>
                  <td className="py-4 px-4 text-xs text-description">{cert.date}</td>
                  <td className="py-4 px-4 text-xs text-description">{cert.marks}</td>
                  <td className="py-4 px-4 text-xs text-description">{cert.outOf}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setViewCert(cert.id)}
                        className="p-1.5 text-description hover:text-main hover:bg-blue-50 rounded transition-colors"
                        title="View Certificate"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1.5 text-description hover:text-main hover:bg-blue-50 rounded transition-colors"
                        title="Download Certificate"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* View Certificate Dialog */}
      <Dialog open={!!viewCert} onOpenChange={() => setViewCert(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-title">
              Certificate Preview
            </DialogTitle>
          </DialogHeader>
          {selectedCert && (
            <div className="border border-border-light rounded-lg p-6 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-main/10 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-main"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-title">
                Certificate of Completion
              </h3>
              <p className="text-sm text-description">
                This certifies that Kevin Gilbert has successfully completed
              </p>
              <p className="text-base font-bold text-main">
                {selectedCert.courseName}
              </p>
              <p className="text-sm text-description">
                Score: {selectedCert.marks}/{selectedCert.outOf} • Date:{" "}
                {selectedCert.date}
              </p>
              <button className="mt-4 px-6 py-2 bg-main text-white rounded-lg text-sm font-semibold hover:bg-main/90 transition-colors">
                Download PDF
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyCertificatesPage;
