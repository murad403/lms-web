"use client";
import { store } from "@/redux/store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";

interface ReduxWrapperProps {
  children: ReactNode;
}

const ReduxWrapper: React.FC<ReduxWrapperProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxWrapper;
