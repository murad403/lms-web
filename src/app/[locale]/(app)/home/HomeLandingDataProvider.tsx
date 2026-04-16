"use client";

import { createContext, ReactNode, useContext } from "react";
import { useHomeCoursesQuery } from "@/redux/features/landing/landing.api";
import { HomeCoursesData } from "@/redux/features/landing/landing.type";

type HomeLandingDataContextValue = {
  homeData?: HomeCoursesData;
  isLoading: boolean;
};

const HomeLandingDataContext = createContext<HomeLandingDataContextValue | undefined>(
  undefined
);

type HomeLandingDataProviderProps = {
  children: ReactNode;
};

const HomeLandingDataProvider = ({ children }: HomeLandingDataProviderProps) => {
  const { data, isLoading } = useHomeCoursesQuery();

  return (
    <HomeLandingDataContext.Provider
      value={{ homeData: data?.data, isLoading }}
    >
      {children}
    </HomeLandingDataContext.Provider>
  );
};

export const useHomeLandingData = () => {
  const context = useContext(HomeLandingDataContext);

  if (!context) {
    throw new Error("useHomeLandingData must be used within HomeLandingDataProvider");
  }

  return context;
};

export default HomeLandingDataProvider;
