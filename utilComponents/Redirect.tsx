import { useRouter } from "next/navigation";
import { useEffect } from "react";

let Redirect = ({ to, replace = false }: { to: any; replace?: boolean }) => {
  let router = useRouter();
  useEffect(() => {
    if (replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  }, [router, to, replace]);

  return null;
};

export { Redirect };
