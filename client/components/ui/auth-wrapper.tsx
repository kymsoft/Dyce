"use client";

import { Card, CardContent, CardHeader, CardFooter } from "./card";
import { BackButton } from "./back-button";
import { Header } from "./header";

interface AuthWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  backButtonRequest: string;
}

export const AuthWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  backButtonRequest,
}: AuthWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md bg-[#ffffff] border-none">
      <CardHeader className="text-center">
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton
          href={backButtonHref}
          label={backButtonLabel}
          request={backButtonRequest}
        />
      </CardFooter>
    </Card>
  );
};
