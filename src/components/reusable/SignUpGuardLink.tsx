"use client";

import { MouseEvent, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { getClientSession } from "@/utils/auth-client";
import { toast } from "sonner";

type SignUpGuardLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

const SignUpGuardLink = ({ href, className, children }: SignUpGuardLinkProps) => {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const { accessToken, role } = getClientSession();
    const isAuthenticated = Boolean(accessToken && role);

    if (isAuthenticated) {
      event.preventDefault();
      toast.error("Logout first, then you can sign up.");
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default SignUpGuardLink;