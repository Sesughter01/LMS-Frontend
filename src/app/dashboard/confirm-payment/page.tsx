/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import DashNav from "@/components/DashNav";
import SideBar from "@/components/SideBar";
import { Button } from "@/components/ui/button";
import courseService from "@/services/api/courses";
import { extractErrorMessage } from "@/shared/utils/helper";
import { DownloadIcon } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect, useLayoutEffect } from "react";

const page = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const logoUrl = sessionStorage.getItem("logoUrl") || "";
  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";

  // If the url has the ref param, it means the payment was done via paystack
  // If it has courseId param, it means the course was free
  const [ref, setRef] = useState<any>(searchParams.get("ref"));
  const [courseId, setCourseId] = useState(searchParams.get("courseId"));
  const [details, setDetails] = useState<any>();
  const [loading, setLoading] = useState(false);

  const organizationId = sessionStorage.getItem("orgId") || "";

  const confirmPayment = async () => {
    try {
      setLoading(true);
      const response = await courseService.confirmPayment(
        { ref: ref, courseId: courseId },
        organizationId
      );
      setDetails(response);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ref !== null || courseId !== null) {
      confirmPayment();
    }
  }, []);

  return (
    <section className="flex w-full min-h-screen h-auto">
      <SideBar logoUrl={logoUrl} secondaryColor={secondaryColor} />
      <main className="grow shrink-0 w-full min-h-full lg:max-w-[77%] flex flex-col gap-6">
        <DashNav secondaryColor={secondaryColor} currentPage={""} />
        {loading ? (
          <section className="flex flex-col grow justify-center gap-10 items-center px-6 lg:px-36">
            {/* Succesful Response */}

            <h1 className=" font-semibold text-3xl">Verifying your purchase</h1>
            <div className="flex flex-col items-center gap-2">
              <p className="text-xl text-center">
                This will only take a moment...
              </p>
            </div>
          </section>
        ) : details?.status ? (
          <section className="flex flex-col grow justify-center gap-10 items-center px-6 lg:px-36">
            {/* Succesful Response */}
            <h1 className="text-green-600 font-semibold text-3xl">
              Payment successful!
            </h1>
            <div className="flex flex-col items-center gap-2">
              <p className="text-xl text-center">
                A receipt for this transaction has been sent via email for your
                records
              </p>
            </div>
            {details.amount && (
              <div className="flex flex-col items-center gap-2">
                <small className="font-semibold">Total Amount Paid:</small>
                <h1 className="text-3xl font-semibold">{details.amount}</h1>
              </div>
            )}
            {details.reference && (
              <div className="flex flex-col items-center gap-2">
                <small className="font-bold">Payment Message:</small>
                <p className="text-gray-700 text-center">
                  PAYMENT PROCESSED {details.reference}
                </p>
              </div>
            )}
            {details.paymentMethod && (
              <div className="flex flex-col items-center gap-2">
                <small className="font-bold">Payment Method:</small>
                <p className="text-gray-700 text-center">
                  {details.paymentMethod}
                </p>
              </div>
            )}
            <Button
              style={{ backgroundColor: secondaryColor }}
              onClick={() =>
                router.push(`/dashboard/courses/${details.courseId}`)
              }
            >
              Go to Course
            </Button>
          </section>
        ) : (
          <section className="flex flex-col grow justify-center gap-10 items-center px-6 lg:px-36">
            {/* Error Response */}
            <h1 className="text-red-500 font-semibold text-3xl">
              Sorry! we couldn&apos;t verify your purchase
            </h1>
            <Button
              style={{ backgroundColor: secondaryColor }}
              onClick={() => router.push("/dashboard/courses")}
            >
              Go back to Course
            </Button>
          </section>
        )}
      </main>
    </section>
  );
};

export default page;
