// components/common/PageHeader.tsx
"use client";

import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

export const PageHeader = () => {
  const { title, info } = useSelector((state: RootState) => state.pageHeader);

  return (
    <div className="">
      <h1 className="text-2xl font-bold">{title}</h1>
      {info && <p className="text-gray-500 mt-1">{info}</p>}
    </div>
  );
};
