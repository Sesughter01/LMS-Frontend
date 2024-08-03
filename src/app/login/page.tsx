"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Logo from "@/assets/logo.png";
import cta_image from "@/assets/Group 710.png";
import cta_bg from "@/assets/Group 96.png";
import { login, mockLoginFunction2 } from "@/services/AuthService";
import { extractErrorMessage } from "@/shared/utils/helper";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "@/store/slices/authSlice";
import { UserTypes } from "@/lib/constants";
import { setUserProgrammes } from "@/store/slices/programmeSlice";
import { ChevronLeft } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import axiosInstance from "@/shared/utils/axios.instance";
import Spinner from "../../../utilComponents/Spinner";
import { useTheme } from "@/context/ThemeContext";
import { RootState } from "@/store/store";

export const currentUrl = "https://ingryd.peachblossoms.ng/login";
//  export const currentUrl = "https://lms-staging.ingrydacademy.com/login";
// export const currentUrl =
//   typeof window !== "undefined" ? window.location.href : "";

//   console.log(currentUrl)

// Check if running in the browser before using window.location
const url = typeof window !== "undefined" ? new URL(currentUrl) : null;
export const subdomain = url ? url.hostname.split(".")[0] : "";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [colorScheme, setColorScheme] = useState("");

  const {
    secondaryColor,
    changeSecondaryColor,
    changeLogoUrl,
    changeEmail,
    changeId,
    changeIsActive,
    changeOrganizationName,
    changePhoneNumber,
    changeSubDomain,
    logoUrl,
    emailRes,
    phoneNumber,
    organizationName,
    id,
    isActive,
    subDomain,
  } = useTheme();

  console.log("subDom:", subDomain);
  console.log("logoUrl:", logoUrl);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const response = await axiosInstance.get(
          `api/v1/organizations/${subdomain}`
        );
        console.log("Organization Data:", response.data);
        console.log("SUBDOMAIN:", subdomain);
        console.log("ORG NAME:", response.data.organizationName);
       
      
        // Handle the organization data as needed
        setColorScheme(response.data.colorScheme);
        changeSecondaryColor(response.data.colorScheme);
        changeLogoUrl(response.data.logo);
        changeEmail(response.data.email);
        changeId(response.data.id);
        changeIsActive(response.data.is_active);
        changeOrganizationName(response.data.organizationName);
        changePhoneNumber(response.data.phoneNumber);
        changeSubDomain(response.data.subDomain);
      } catch (error: any) {
        console.error("Error fetching organization:", error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    if (subdomain) {
      fetchOrganization();
    }
  }, [subdomain]);

  const {
    dispatch: authDispatch,
    computed: { homePath },
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  //  const { dispatch: authDispatch, computed: { homePath } } = useAuth();

  const userDetails = useSelector((state: RootState) => selectUser(state));

  const handleGoBack = () => {
    router.back();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    try {
      setIsSubmitting(true);
      const response: any = await login(email, password);

      authDispatch({ type: "loginSuccess", payload: response });

      toast.success(`successfully logged in`);

      console.log(
        "Response Account Type:",
        response.userProgrammes.organization
      );
      console.log(
        "Response Data:",
        response.data
      );

      sessionStorage.setItem("secondaryColor", secondaryColor);
      sessionStorage.setItem("logoUrl", logoUrl);
      // sessionStorage.setItem("logoUrl", "../../../assets/logo.png");
      sessionStorage.setItem("orgId", id);
      sessionStorage.setItem("orgName", organizationName);

      dispatch(setUser(response));
      dispatch(setUserProgrammes(response?.userProgrammes));

      if (!response.isEmailVerified) {
        router.push(`/signup/verify-email?email=${response.email}`);
        return;
      }

      if (response.accountType === UserTypes.TRAINEE) {
        if (!response.isOnboarded) {
          router.push(`/dashboard/onboarding`);
          return;
        }
        router.push(`/getting-started`);
      } else if (response.accountType === UserTypes.ADMIN) {
        router.push(`/admin`);
      } else if (response.accountType === UserTypes.INSTRUCTOR) {
        router.push("/instructor");
      } else if (response.accountType === UserTypes.SUPER_ADMIN) {
        router.push("/super-admin");
      } else {
        router.push(`/dashboard`);
      }
    } catch (error: any) {
      const errorMsg = extractErrorMessage(error);
      console.log("Error:", errorMsg);
      toast.error("Invalid email or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit2 = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    try {
      setIsSubmitting(true);
      const response: any = await mockLoginFunction2(email, password);
      console.log(response.data);
      authDispatch({ type: "loginSuccess", payload: response });

      sessionStorage.setItem("secondaryColor", secondaryColor);
      sessionStorage.setItem("logoUrl", logoUrl);
      sessionStorage.setItem("orgId", id);
      sessionStorage.setItem("orgName", organizationName);

      dispatch(setUser(response));
      dispatch(setUserProgrammes(response?.userProgrammes));

      if (!response.isEmailVerified) {
        router.push(`/signup/verify-email?email=${response.email}`);
        return;
      }

      if (response.accountType === UserTypes.TRAINEE) {
        if (!response.isOnboarded) {
          router.push(`/dashboard/onboarding`);
          return;
        }
        router.push(`/getting-started`);
      } else if (response.accountType === UserTypes.ADMIN) {
        router.push(`/admin`);
      } else if (response.accountType === UserTypes.INSTRUCTOR) {
        router.push("/instructor");
      } else if (response.accountType === UserTypes.SUPER_ADMIN) {
        router.push("/super-admin");
      } else {
        router.push(`/dashboard`);
      }
    } catch (error: any) {
      const errorMsg = extractErrorMessage(error);
      console.log("Error:", errorMsg);
      toast.error("Invalid email or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main className="flex w-full h-screen">
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-full">
            <Spinner />
          </div>
        ) : (
          <ul
            style={{ backgroundColor: secondaryColor }}
            className={`grid grid-flow-row lg:grid-cols-2 grid-rows-1 h-full lg:h-full w-full`}
          >
            <li
              style={{ backgroundColor: secondaryColor }}
              className={`hidden lg:flex flex-col h-full text-white place-content-center`}
            >
              <section className="flex flex-col gap-2 px-24 py-10 items-center relative overflow-hidden">
                <Image
                  src={cta_bg}
                  alt="bg image"
                  className="absolute inset-4 object-contain"
                  fill
                />
                {/*src={logoUrl}*/}
                <Image
                  src="/images/logo.avif"
                  width={100}
                  height={100}
                  alt="Company Logo"
                  className="h-20 w-auto"
                />
                <p className="text-center text-xl">
                  Helping forward-thinking companies build <br /> top-level
                  teams by recruiting and training{" "}
                </p>
                <Image src={cta_image} alt="group img" className="p-24 " />
              </section>
            </li>
            <li className="flex flex-col gap-10 h-full py-28 bg-white lg:rounded-tl-3xl">
              <div className="flex gap-12 lg:gap-12 w-full px-2 lg:px-16 mb-20">
                <Link onClick={handleGoBack} href="#" className="">
                  <ChevronLeft
                    style={{ backgroundColor: secondaryColor }}
                    className="rounded-full w-8 h-8 text-white mt-2 cursor-pointer"
                  />{" "}
                </Link>
                <div className="flex flex-col gap-4">
                  <h1
                    style={{ color: secondaryColor }}
                    className="text-4xl font-bold"
                  >
                    Log in
                  </h1>
                  <p className="text-[#3E3243]">Enter your email address and password to log in to the INGRYD platform</p>
                  <section className="flex flex-col gap-8  w-full ">
                    {/* The form starts here */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                      <div className="flex flex-col gap-2 ">
                        <small className="text-sm font-semibold">Email</small>
                        <input
                          type="text"
                          id="email"
                          className="outline-2 outline-transparent text-base border px-3 py-4 rounded-md border-gray-300 focus:outline-black "
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col gap-2 ">
                        <small className="text-sm font-semibold">Password</small>
                        <input
                          type="password"
                          id="password"
                          className="outline-2 outline-transparent text-base border px-3 py-4 rounded-md border-gray-300 focus:outline-black "
                          placeholder="Input your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <Link
                          href={"./login/forgot-password"}
                          className="text-foreground text-sm font-medium"
                        >
                          Forgot Password ?
                        </Link>
                      </div>
                      <button
                        style={{ backgroundColor: '#F305F8' }}
                        type="submit"
                        className="p-3 rounded-md text-xsm text-center text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Please wait..." : "Login"}
                      </button>

                      <small className="text-center text-base font-medium mt-12">
                        Don&#39;t have an account yet?{" "}
                        <Link href={"/signup"} style={{ color: '#F305F8' }}>
                          Sign Up
                        </Link>
                      </small>
                    </form>
                  </section>
                </div>
                <div className="flex items-start">
                  <img className="relative h-[24px] w-[24px]" src="/icons/globe.svg" alt="gloge" />
                  EN
                </div>
              </div>
            </li>
            <div className="flex justify-between items-center py-6 text-white px-16 w-full">
              <p>Copyright  2023 Ingryd | All Rights Reserved</p>
            </div>
            <div className="flex justify-end items-center py-6 text-white px-16 w-full">
              <div className="flex gap-2 flex-row">
                <img src="/icons/fb.svg" alt="facebook" />
                <img src="/icons/IG.svg" alt="instagram" />
                <img src="/icons/tw.svg" alt="twiter" />
                <img src="/icons/in.svg" alt="linkenin" />
              </div>
            </div>
          </ul>
        )}
      </main>
    </>
  );
}
