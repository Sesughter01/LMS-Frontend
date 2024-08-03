"use client";

import Image from "next/image";

import Link from "next/link";

import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";

import completeSignup from "@/assets/complete-signup.png";
import { setInvitePassword } from "@/services/AuthService";
import { extractErrorMessage } from "@/shared/utils/helper";
import { toast } from "react-toastify";
import { RootState } from "@/store/store";
import { ChevronLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { fetchAUserByEmail } from "@/store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function CompleteSignUpPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  let urlEmail: string | any = searchParams.get("email");

  urlEmail = urlEmail.replace(/ /g, "+");

  console.log("email", urlEmail);

  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const [email, setEmail] = useState(searchParams.get('email'))

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [errors, setErrors] = useState({
    password: "",
  });

  const handleGoBack = () => {
    router.back(); // This will go back to the previous page in the browser's history.
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    try {
      const newErrors = {
        password: password ? "" : "Password is required",
      };

      setErrors(newErrors);

      if (Object.values(newErrors).every((error) => !error)) {
        setIsSubmitting(true);
        const response: any = await setInvitePassword(urlEmail, password);
        console.log(response);
        toast.success(`successfully set password, you can now login`);
        router.push("/login");
      }
    } catch (error: any) {
      const errorMsg = extractErrorMessage(error);
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    dispatch(fetchAUserByEmail(urlEmail));
  }, [urlEmail, dispatch]);

  const { singleUserByEmail, status, error } = useSelector(
    (state: RootState) => state.user
  );

  console.log("singleUserByEmail", singleUserByEmail);

  const user: any = singleUserByEmail;

  if (user?.isEmailVerified) {
    router.push("/login");
  }

  return (
    <>
      <main className="flex w-full h-screen">
        <ul className="grid grid-flow-row lg:grid-cols-2 grid-rows-1 h-full bg-secondary w-full">
          <li className="hidden lg:flex flex-col h-full bg-secondary text-white place-content-center">
            <section className="flex flex-col gap-8 px-24 py-24 items-center relative overflow-hidden h-full w-full">
              <Image
                src={completeSignup}
                alt="bg image"
                className="absolute inset-0 object-fill"
                fill
              />
            </section>
          </li>

          <li className="flex flex-col h-full py-14 bg-white lg:rounded-tl-3xl lg:rounded-bl-3xl">
            <div className="flex gap-6 lg:gap-8 w-full px-2 lg:px-16 mb-10">
              <Link onClick={handleGoBack} href="#" className="">
                <ChevronLeft className="bg-foreground rounded-full w-8 h-8 text-white mt-2 cursor-pointer" />{" "}
              </Link>
              <div className="flex flex-col gap-4">
                <h1 className="text-4xl font-bold">Sign up</h1>
                <p className="text-[#3E3243]">
                  You&#39;ve been invited to the INGRYD platform. Please
                  complete the sign up process
                </p>
                {errors.password && (
                  <div className="text-red-500 text-xs flex rounded-lg bg-red-600 bg-opacity-20 gap-2 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                    >
                      <path
                        d="M7.5 1.40625C6.29477 1.40625 5.11661 1.76364 4.1145 2.43323C3.11238 3.10282 2.33133 4.05454 1.87011 5.16802C1.40889 6.28151 1.28821 7.50676 1.52334 8.68883C1.75847 9.8709 2.33884 10.9567 3.19107 11.8089C4.0433 12.6612 5.1291 13.2415 6.31117 13.4767C7.49324 13.7118 8.71849 13.5911 9.83198 13.1299C10.9455 12.6687 11.8972 11.8876 12.5668 10.8855C13.2364 9.88339 13.5938 8.70523 13.5938 7.5C13.592 5.88436 12.9495 4.33538 11.807 3.19295C10.6646 2.05052 9.11564 1.40796 7.5 1.40625ZM9.70664 9.04336C9.7502 9.08691 9.78474 9.13861 9.80831 9.19552C9.83188 9.25242 9.84401 9.31341 9.84401 9.375C9.84401 9.43659 9.83188 9.49758 9.80831 9.55448C9.78474 9.61139 9.7502 9.66309 9.70664 9.70664C9.66309 9.75019 9.61139 9.78474 9.55449 9.80831C9.49758 9.83188 9.43659 9.84401 9.375 9.84401C9.31341 9.84401 9.25242 9.83188 9.19552 9.80831C9.13862 9.78474 9.08691 9.75019 9.04336 9.70664L7.5 8.16269L5.95664 9.70664C5.91309 9.75019 5.86139 9.78474 5.80449 9.80831C5.74758 9.83188 5.68659 9.84401 5.625 9.84401C5.56341 9.84401 5.50242 9.83188 5.44552 9.80831C5.38862 9.78474 5.33691 9.75019 5.29336 9.70664C5.24981 9.66309 5.21526 9.61139 5.19169 9.55448C5.16812 9.49758 5.15599 9.43659 5.15599 9.375C5.15599 9.31341 5.16812 9.25242 5.19169 9.19552C5.21526 9.13861 5.24981 9.08691 5.29336 9.04336L6.83731 7.5L5.29336 5.95664C5.20541 5.86868 5.15599 5.74939 5.15599 5.625C5.15599 5.50061 5.20541 5.38132 5.29336 5.29336C5.38132 5.2054 5.50061 5.15599 5.625 5.15599C5.74939 5.15599 5.86869 5.2054 5.95664 5.29336L7.5 6.83731L9.04336 5.29336C9.08691 5.24981 9.13862 5.21526 9.19552 5.19169C9.25242 5.16812 9.31341 5.15599 9.375 5.15599C9.43659 5.15599 9.49758 5.16812 9.55449 5.19169C9.61139 5.21526 9.66309 5.24981 9.70664 5.29336C9.7502 5.33691 9.78474 5.38861 9.80831 5.44552C9.83188 5.50242 9.84401 5.56341 9.84401 5.625C9.84401 5.68659 9.83188 5.74758 9.80831 5.80448C9.78474 5.86139 9.7502 5.91309 9.70664 5.95664L8.1627 7.5L9.70664 9.04336Z"
                        fill="#FF0000"
                      />
                    </svg>
                    {errors.password}
                  </div>
                )}
              </div>
            </div>
            
          <section className="flex flex-col gap-8 px-8 lg:pl-32 w-full lg:max-w-[560px] ">
              {/* The form starts here */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="flex flex-col gap-2 ">
                  <small className="text-sm font-semibold">First name</small>
                  <input
                    type="text"
                    id="firstName"
                    className="outline-2 outline-transparent text-base border px-3 py-4 rounded-md border-gray-300 focus:outline-black "
                    value={user?.profile?.firstName}
                    readOnly={true}
                    disabled={true}
                  />
                </div>

                <div className="flex flex-col gap-2 ">
                  <small className="text-sm font-semibold">Last name</small>
                  <input
                    type="text"
                    id="lastName"
                    className="outline-2 outline-transparent text-base border px-3 py-4 rounded-md border-gray-300 focus:outline-black "
                    value={user?.profile?.lastName}
                    readOnly={true}
                    disabled={true}
                  />
                </div>

                <div className="flex flex-col gap-2 ">
                  <small className="text-sm font-semibold">Email</small>
                  <input
                    type="text"
                    id="email"
                    className="outline-2 outline-transparent text-base border px-3 py-4 rounded-md border-gray-300 focus:outline-black "
                    value={user?.email}
                    readOnly={true}
                    disabled={true}
                  />
                </div>

                <div className="flex flex-col gap-2 ">
                  <small className="text-sm font-semibold">Phone number</small>
                  <input
                    type="text"
                    id="phoneNumber"
                    className="outline-2 outline-transparent text-base border px-3 py-4 rounded-md border-gray-300 focus:outline-black "
                    value={user?.profile?.phoneNumber}
                    readOnly={true}
                    disabled={true}
                  />
                </div>

                <div className="flex flex-col gap-2 ">
                  <small className="text-sm font-semibold">Password</small>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className={`outline-2 outline-transparent text-base border px-3 py-4 rounded-md border-gray-300 focus:outline-black ${
                      errors.password ? "border border-red-500" : ""
                    }`}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div
                    onClick={handleTogglePassword}
                    className="cursor-pointer"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="27"
                        viewBox="0 0 24 27"
                        fill="none"
                        className="absolute bottom-[-128px] right-[41px]"
                      >
                        <path
                          d="M21.25 10.2845C18.94 6.42766 15.56 4.20703 12 4.20703C10.22 4.20703 8.49 4.75953 6.91 5.79016C5.33 6.83141 3.91 8.35078 2.75 10.2845C1.75 11.9527 1.75 14.662 2.75 16.3302C5.06 20.1977 8.44 22.4077 12 22.4077C13.78 22.4077 15.51 21.8552 17.09 20.8245C18.67 19.7833 20.09 18.2639 21.25 16.3302C22.25 14.6727 22.25 11.9527 21.25 10.2845ZM12 17.6052C9.76 17.6052 7.96 15.682 7.96 13.3127C7.96 10.9433 9.76 9.02016 12 9.02016C14.24 9.02016 16.04 10.9433 16.04 13.3127C16.04 15.682 14.24 17.6052 12 17.6052Z"
                          fill="#292D32"
                        />
                        <path
                          d="M11.9984 10.2734C10.4284 10.2734 9.14844 11.6334 9.14844 13.3122C9.14844 14.9803 10.4284 16.3403 11.9984 16.3403C13.5684 16.3403 14.8584 14.9803 14.8584 13.3122C14.8584 11.6441 13.5684 10.2734 11.9984 10.2734Z"
                          fill="#292D32"
                        />
                      </svg>
                    ) : (
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 640 512"
                        height="27"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute bottom-[-128px] right-[41px]"
                      >
                        <path d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"></path>
                      </svg>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="p-3 rounded-md bg-[#1A183E] text-xsm text-center text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Please wait..." : "Sign up"}
                </button>

                <small className="text-center text-base font-medium mt-12">
                  Already have an account?{" "}
                  <Link href={"/login"} className="text-primary">
                    Login
                  </Link>
                </small>
              </form>
            </section>
          </li>
        </ul>
      </main>
    </>
  );
}
