"use client";

import Image from "next/image";

import Link from "next/link";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Logo from "@/assets/logo.png";
import cta_image from "@/assets/Group 710.png";
import cta_bg from "@/assets/Group 96.png";
import { ChevronLeft } from "lucide-react";
import { initiatePasswordReset, resendEmail } from "@/services/AuthService";
import { toast } from "react-toastify";
import { extractErrorMessage } from "@/shared/utils/helper";
import axiosInstance from "@/shared/utils/axios.instance";
import { subdomain } from "../page";
import { useTheme } from "@/context/ThemeContext";
import Spinner from "../../../../utilComponents/Spinner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const { secondaryColor, changeSecondaryColor, changeLogoUrl, logoUrl } =
    useTheme();

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const response = await axiosInstance.get(
          `api/v1/organizations/${subdomain}`
        );
        console.log("Organization Data:", response.data);

        // Handle the organization data as needed

        changeSecondaryColor(response.data.colorScheme);
        changeLogoUrl(response.data.logo);
      } catch (error: any) {
        console.error("Error fetching organization:", error.message);
        // Handle the error
      } finally {
        setIsLoading(false);
      }
    };

    if (subdomain) {
      fetchOrganization();
    }
  }, [subdomain]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    try {
      setIsSubmitting(true);

      // TODO: Replace with the right service
      const response = await initiatePasswordReset(email);
      console.log("Res:", response);
      toast.success(response.message || "A Password reset mail has been sent to your email. Please Check your email to reset password", {
        position: toast.POSITION.TOP_RIGHT
      });
    } catch (error: any) {
      const errorMsg = extractErrorMessage(error);
      toast.error(errorMsg, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main className="flex w-full h-screen">
        {isLoading ? (
          // Show a spinner while loading
          <div className="flex items-center justify-center w-full h-full">
            <Spinner />
          </div>
        ) : (
          <ul
            style={{ backgroundColor: secondaryColor }}
            className="grid grid-flow-row lg:grid-cols-2 grid-rows-1 h-full w-full"
          >
            <li
              style={{ backgroundColor: secondaryColor }}
              className="hidden lg:flex flex-col h-full text-white place-content-center"
            >
              <section className="flex flex-col gap-8 px-24 py-24 items-center relative overflow-hidden">
                <Image
                  src={cta_bg}
                  alt="bg image"
                  className="absolute inset-4 object-contain"
                  fill
                />
                <Image
                  src={logoUrl}
                  width={100}
                  height={100}
                  alt="Company Logo"
                  className="h-20 w-auto"
                />
                <p className="text-center text-lg">
                  Helping forward-thinking companies build <br /> top-level
                  teams by recruiting and training{" "}
                </p>
                <Image src={cta_image} alt="group img" className="p-16" />
              </section>
            </li>
            <li className="flex flex-col h-full place-content-center items-center bg-white lg:rounded-tl-3xl lg:rounded-bl-3xl">
              <Link href={"/login"} className="w-full mb-16 px-8 lg:px-10">
                <ChevronLeft
                  style={{ backgroundColor: secondaryColor }}
                  className="rounded-full w-8 h-8 text-white"
                />{" "}
              </Link>
              <section className="flex flex-col px-8 gap-8 min-w-[380px]">
                <div className="flex flex-col gap-3">
                  <h1 className="text-2xl font-bold">Forgot password</h1>
                  <small className="text-gray-500">
                    Enter the email associated to your account
                  </small>
                </div>

                {/* Form here */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2 ">
                    <small className="text-xs font-semibold">Email</small>
                    <input
                      type="text"
                      id="email"
                      className="outline-0 text-sm border px-3 py-2 rounded-sm border-gray-300"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button
                    style={{ backgroundColor: secondaryColor }}
                    type="submit"
                    className="p-3 rounded-md text-xs text-center text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Please wait..." : "Reset Password"}
                  </button>
                </form>
              </section>
            </li>
          </ul>
        )}
      </main>
    </>
  );
}
