"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Building2, ArrowRight, Calendar, UserCheck, ShieldAlert } from "lucide-react";
import { useGetOrganizationListQuery } from "@/redux/features/instructor/instructor.api";
import { InstructorOrganization } from "@/redux/features/instructor/instructor.type";
import { resolveImageUrl } from "@/utils/image";
import { Skeleton } from "@/components/ui/skeleton";

const InstructorOrganizationsPage = () => {
  const { data: response, isLoading, isFetching } = useGetOrganizationListQuery(undefined);
  const organizations: InstructorOrganization[] = response?.data || [];

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Upper header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-light pb-5">
        <div>
          <h1 className="text-2xl font-bold text-title flex items-center gap-2">
            <Building2 className="w-6 h-6 text-main" />
            My Organizations
          </h1>
          <p className="text-sm text-description mt-1">
            Manage your corporate affiliations and access your dedicated instructor dashboards.
          </p>
        </div>
      </div>

      {/* Grid Container */}
      {isLoading || isFetching ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white border border-border-light rounded-xl overflow-hidden shadow-sm p-4 space-y-4"
            >
              <Skeleton className="h-32 w-full rounded-lg" />
              <div className="flex gap-3 items-center">
                <Skeleton className="h-12 w-12 rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          ))}
        </div>
      ) : organizations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {organizations.map((org) => {
            const formattedDate = org.joined_at
              ? new Date(org.joined_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "-";

            return (
              <div
                key={org.membership_id}
                className="bg-white border border-border-light rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
              >
                {/* Banner Image */}
                <div className="relative h-32 w-full bg-gradient-to-r from-blue-500 to-indigo-600 overflow-hidden shrink-0">
                  {org.banner ? (
                    <Image
                      src={resolveImageUrl(org.banner)}
                      alt={`${org.organization_name} Banner`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-20">
                      <Building2 className="w-16 h-16 text-white" />
                    </div>
                  )}
                  {/* Status Indicator */}
                  <div className="absolute top-3 right-3 shrink-0">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm ${
                        org.status?.toLowerCase() === "active"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : "bg-amber-100 text-amber-800 border border-amber-200"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          org.status?.toLowerCase() === "active" ? "bg-emerald-500" : "bg-amber-500"
                        }`}
                      />
                      {org.status || "Pending"}
                    </span>
                  </div>
                </div>

                {/* Card Content Wrapper */}
                <div className="p-4 flex-1 flex flex-col pt-0 relative">
                  {/* Overlapping Avatar */}
                  <div className="relative -mt-8 mb-3 w-16 h-16 rounded-xl overflow-hidden border-4 border-white shadow bg-white shrink-0">
                    {org.organization_photo ? (
                      <Image
                        src={resolveImageUrl(org.organization_photo)}
                        alt={`${org.organization_name} logo`}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#EBEBFF] text-main font-bold uppercase text-lg">
                        {org.organization_name?.charAt(0) || "O"}
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-title line-clamp-1 leading-snug" title={org.organization_name}>
                        {org.organization_name}
                      </h3>
                      
                      <div className="flex flex-col gap-1.5 mt-2.5">
                        <div className="flex items-center gap-2 text-xs text-description">
                          <UserCheck className="w-3.5 h-3.5 text-main shrink-0" />
                          <span>
                            Role: <span className="font-semibold text-title">{org.role || "Instructor"}</span>
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs text-description">
                          <Calendar className="w-3.5 h-3.5 text-description shrink-0" />
                          <span>Joined {formattedDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-2">
                      <Link
                        href="/mentor/dashboard"
                        className="w-full flex items-center justify-center gap-2 bg-[#EBEBFF] hover:bg-main text-main hover:text-white transition-all duration-300 font-semibold py-2.5 px-4 rounded-lg text-xs tracking-wide shrink-0 group-hover:translate-y-0"
                      >
                        Go to Organization Dashboard
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border border-border-light rounded-xl p-12 text-center flex flex-col items-center justify-center max-w-lg mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#EBEBFF] flex items-center justify-center mb-4 text-main shrink-0">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-title">No Organizations Found</h2>
          <p className="text-sm text-description mt-2">
            You are not currently affiliated with any organizations. Please contact an organization administrator to be added as an instructor.
          </p>
        </div>
      )}
    </div>
  );
};

export default InstructorOrganizationsPage;