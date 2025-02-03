"use client"
import Preloader from "@/components/common/Preloader";
import useGlobalContext from "@/hooks/use-context";
import { childrenType } from "@/interFace/interFace";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const PrivetRoute = ({ children }: childrenType) => {
  const { user, loading } = useGlobalContext();
  const router = useRouter();
  const pathName = usePathname();
  const [showLoader, setShowLoader] = useState<boolean>(true);

  const userIdMatch = pathName.match(/^\/sample-video\/([\w-]+)/);
  const id = userIdMatch ? userIdMatch[1] : null;

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (showLoader) {
    return <Preloader />;
  }

  if (!id) {
    router.replace(`/sample-video/not-found`); // Redirect to a valid sample video
    return null;
  }

  return <>{children}</>;
};

export default PrivetRoute;
