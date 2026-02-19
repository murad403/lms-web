"use client";
import { useState } from "react";
import { Award, Clock, ShieldCheck, FileCheck, MoreVertical, Download, Search, ChevronDown } from "lucide-react";
import { accreditationStats, accreditationSubmissions, activeCertificates } from "@/lib/instructor";
import { auditLogs, examRules } from "@/lib/organization";

type Tab = "requests" | "rules" | "audit";

const statusColors: Record<string, string> = {
  Approved: "bg-green-50 text-green-700",
  Pending: "bg-yellow-50 text-yellow-700",
  "Needs Revision": "bg-orange-50 text-orange-700",
  Rejected: "bg-red-50 text-red-700",
  Active: "bg-green-50 text-green-700",
};

const AccreditationPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("requests");
  const [openAction, setOpenAction] = useState<string | null>(null);

  const stats = [
    { label: "Approved Courses", value: accreditationStats.approvedCourses, icon: ShieldCheck, color: "bg-green-50 text-green-600" },
    { label: "Pending Review", value: accreditationStats.pendingReview, icon: Clock, color: "bg-yellow-50 text-yellow-600" },
    { label: "Certificates Issued", value: accreditationStats.certificatesIssued.toLocaleString(), icon: Award, color: "bg-blue-50 text-blue-600" },
    { label: "Active Certificates", value: accreditationStats.activeCertificates.toLocaleString(), icon: FileCheck, color: "bg-purple-50 text-purple-600" },
  ];

  const tabs: { key: Tab; label: string }[] = [
    { key: "requests", label: "Accreditation Requests" },
    { key: "rules", label: "Exam & Certificate Rules" },
    { key: "audit", label: "Audit Logs" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-title">Accreditation</h1>
        <p className="text-sm text-description mt-1">Manage accreditation requests and certificates</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white p-5 flex items-center gap-4">
              <div className={`w-12 h-12 flex items-center justify-center ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-title">{stat.value}</p>
                <p className="text-sm text-description">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="bg-white">
        <div className="border-b border-border-light flex">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                activeTab === tab.key
                  ? "text-main border-b-2 border-main"
                  : "text-description hover:text-title"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Accreditation Requests Tab */}
          {activeTab === "requests" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-description" />
                  <input
                    type="text"
                    placeholder="Search requests..."
                    className="pl-10 pr-4 py-2 text-sm border border-border-light focus:outline-none focus:border-main w-64"
                  />
                </div>
                <div className="relative">
                  <button className="flex items-center gap-2 px-4 py-2 text-sm border border-border-light text-description">
                    All Status <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border-light">
                      <th className="text-left py-3 px-4 font-medium text-description">ID</th>
                      <th className="text-left py-3 px-4 font-medium text-description">Course</th>
                      <th className="text-left py-3 px-4 font-medium text-description">Submitted</th>
                      <th className="text-left py-3 px-4 font-medium text-description">Certificate Type</th>
                      <th className="text-left py-3 px-4 font-medium text-description">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-description">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accreditationSubmissions.map((submission) => (
                      <tr key={submission.id} className="border-b border-border-light last:border-0">
                        <td className="py-3 px-4 text-title font-medium">{submission.id}</td>
                        <td className="py-3 px-4 text-title">{submission.course}</td>
                        <td className="py-3 px-4 text-description">{submission.submitted}</td>
                        <td className="py-3 px-4 text-description">{submission.certificateType}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 text-xs font-medium ${statusColors[submission.status]}`}>
                            {submission.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="relative">
                            <button
                              onClick={() => setOpenAction(openAction === submission.id ? null : submission.id)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <MoreVertical className="w-4 h-4 text-description" />
                            </button>
                            {openAction === submission.id && (
                              <div className="absolute right-0 top-8 bg-white shadow-lg border border-border-light rounded z-10 w-40">
                                <button className="w-full text-left px-4 py-2 text-sm text-title hover:bg-gray-50">View Details</button>
                                <button className="w-full text-left px-4 py-2 text-sm text-title hover:bg-gray-50">Edit</button>
                                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">Delete</button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Exam & Certificate Rules Tab */}
          {activeTab === "rules" && (
            <div className="space-y-6">
              {/* Active Certificates */}
              <div>
                <h3 className="text-base font-semibold text-title mb-4">Active Certificates</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border-light">
                        <th className="text-left py-3 px-4 font-medium text-description">Course Name</th>
                        <th className="text-left py-3 px-4 font-medium text-description">Cert ID</th>
                        <th className="text-left py-3 px-4 font-medium text-description">Issued</th>
                        <th className="text-left py-3 px-4 font-medium text-description">Valid Until</th>
                        <th className="text-left py-3 px-4 font-medium text-description">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeCertificates.map((cert) => (
                        <tr key={cert.id} className="border-b border-border-light last:border-0">
                          <td className="py-3 px-4 text-title">{cert.courseName}</td>
                          <td className="py-3 px-4 text-description">{cert.certId}</td>
                          <td className="py-3 px-4 text-description">{cert.issued.toLocaleString()}</td>
                          <td className="py-3 px-4 text-description">{cert.validUntil}</td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 text-xs font-medium ${statusColors[cert.status]}`}>
                              {cert.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Rules */}
              <div>
                <h3 className="text-base font-semibold text-title mb-4">Exam Rules</h3>
                <div className="space-y-3">
                  {examRules.filter(r => r.category === "Exam").map((rule) => (
                    <div key={rule.id} className="border border-border-light p-4">
                      <h4 className="text-sm font-semibold text-title">{rule.title}</h4>
                      <p className="text-sm text-description mt-1">{rule.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-title mb-4">Certificate Rules</h3>
                <div className="space-y-3">
                  {examRules.filter(r => r.category === "Certificate").map((rule) => (
                    <div key={rule.id} className="border border-border-light p-4">
                      <h4 className="text-sm font-semibold text-title">{rule.title}</h4>
                      <p className="text-sm text-description mt-1">{rule.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Audit Logs Tab */}
          {activeTab === "audit" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-description" />
                  <input
                    type="text"
                    placeholder="Search logs..."
                    className="pl-10 pr-4 py-2 text-sm border border-border-light focus:outline-none focus:border-main w-64"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border-light">
                      <th className="text-left py-3 px-4 font-medium text-description">Action</th>
                      <th className="text-left py-3 px-4 font-medium text-description">Performed By</th>
                      <th className="text-left py-3 px-4 font-medium text-description">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-description">Details</th>
                      <th className="text-left py-3 px-4 font-medium text-description">Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="border-b border-border-light last:border-0">
                        <td className="py-3 px-4 text-title font-medium">{log.action}</td>
                        <td className="py-3 px-4 text-description">{log.performedBy}</td>
                        <td className="py-3 px-4 text-description">{log.date}</td>
                        <td className="py-3 px-4 text-description max-w-xs truncate">{log.details}</td>
                        <td className="py-3 px-4">
                          <button className="flex items-center gap-1 text-main hover:text-main/80 text-sm">
                            <Download className="w-4 h-4" /> PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccreditationPage;
