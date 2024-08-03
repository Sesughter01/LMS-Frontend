import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Step1Props {
  onNext: () => void;
  onUpdate: (key: string, value: string) => void;
  data: any;
  onLoading: (loading: boolean) => void;
  secondaryColor: any;
}

const Step1: React.FC<Step1Props> = ({ onNext, onUpdate, data, onLoading, secondaryColor }) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back(); // This will go back to the previous page in the browser's history.
  };

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
  });

  const handleNextClick = () => {
    // Validate the form when the "Proceed" button is clicked
    const { firstName, lastName, email, phoneNumber, gender } = data;
    const newErrors = {
      firstName: firstName ? "" : "First name is required",
      lastName: lastName ? "" : "Last name is required",
      email: email ? "" : "Email is required",
      phoneNumber: phoneNumber ? "" : "Phone number is required",
      gender: gender ? "" : "Gender is required",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      onNext();
    } else {
      const err1 = Object.values(newErrors).filter((e) => e !== "")[0];
      console.log("errr1", err1, newErrors)
      toast.error(err1);
      // Show error message using toast
      // toast.error('Please fill in all required fields.');
    }
    // if (Object.values(newErrors).every((error) => !error)) {
    //   onNext();
    // } else {
    //   // Show error message using toast
    //   toast.error("Please fill in all required fields.");
    // }
  };

  return (
    <>
      <div className="flex gap-16 justify-between w-full  px-5 lg:px-20 ">
        <Link onClick={handleGoBack} href="#" className="">
          <ChevronLeft style={{ backgroundColor: secondaryColor }} className="rounded-full w-8 h-8 text-white cursor-pointer" />{" "}
        </Link>
        <div className="w-full px-3">
          <h1 style={{ color: secondaryColor }} className="text-2xl font-bold">
            Sign Up
          </h1>
          <small className="text-gray-500">Few steps ahead!</small>
          <section className="flex flex-col gap-8 min-w-full  sm:min-w-[380px] min-h-[500px]">
            <ul className="w-full flex gap-2">
              <li style={{ backgroundColor: secondaryColor }} className="grow shrink-0 h-1 rounded-full"></li>
              <li className="grow shrink-0 h-1 rounded-full bg-gray-200"></li>
              <li className="grow shrink-0 h-1 rounded-full bg-gray-200"></li>
            </ul>
            <div className="App">
              <form className="flex flex-col gap-2">
                <div className="flex flex-col gap-2 ">
                  <small className="text-xs font-semibold">First name</small>
                  <input
                    type="text"
                    value={data.firstName}
                    onChange={(e) => onUpdate("firstName", e.target.value)}
                    id="firstName"
                    className="outline-0 text-sm border px-3 py-2 rounded-sm border-gray-300"
                    placeholder="Enter your first name"
                  />
                  {data.firstName === "" && errors.firstName && <div className="text-red-500 text-xs">{errors.firstName}</div>}
                </div>
                <div className="flex flex-col gap-2 ">
                  <small className="text-xs font-semibold">Last name</small>
                  <input
                    type="text"
                    id="lastName"
                    value={data.lastName}
                    onChange={(e) => onUpdate("lastName", e.target.value)}
                    className="outline-0 text-sm border px-3 py-2 rounded-sm border-gray-300"
                    placeholder="Enter your last name"
                  />
                  {data.lastName === "" && errors.lastName && <div className="text-red-500 text-xs">{errors.lastName}</div>}
                </div>
                <div className="flex flex-col gap-2 ">
                  <small className="text-xs font-semibold">Email</small>
                  <input
                    type="text"
                    id="email"
                    value={data.email}
                    onChange={(e) => onUpdate("email", e.target.value)}
                    className="outline-0 text-sm border px-3 py-2 rounded-sm border-gray-300"
                    placeholder="Enter your email"
                  />
                  {data.email === "" && errors.email && <div className="text-red-500 text-xs">{errors.email}</div>}
                </div>
                <div className="flex flex-col gap-2 ">
                  <small className="text-xs font-semibold">Phone number</small>
                  <input
                    type="text"
                    id="phone"
                    value={data.phoneNumber}
                    onChange={(e) => onUpdate("phoneNumber", e.target.value)}
                    className="outline-0 text-sm border px-3 py-2 rounded-sm border-gray-300"
                    placeholder="+234"
                  />
                  {data.phoneNumber === "" && errors.phoneNumber && <div className="text-red-500 text-xs">{errors.phoneNumber}</div>}
                </div>
                <div className="flex flex-col gap-2 ">
                  <small className="text-xs font-semibold">Gender</small>
                  <select
                    className="outline-0 text-sm border px-3 py-2 rounded-sm border-gray-300"
                    value={data.gender}
                    onChange={(e) => onUpdate("gender", e.target.value)}
                  >
                    <option value="">Select Option</option>
                    <option value={"M"}>Male</option>
                    <option value={"F"}>Female</option>
                  </select>
                  {data.gender === "" && errors.gender && <div className="text-red-500 text-xs">{errors.gender}</div>}
                </div>

                <Button style={{ color: '#F305F8' }} variant={"ghost"} type="button" className="" onClick={handleNextClick}>
                  Proceed
                </Button>

                <small className="text-center font-semibold ">
                  Already have an account?{" "}
                  <Link style={{ color: '#F305F8' }} href={"/login"} className="">
                    Log in
                  </Link>
                </small>
              </form>
            </div>
          </section>
        </div>
        <div className="flex items-start">
          <img className="relative h-[24px] w-[24px]" src="/icons/globe.svg" alt="gloge" />
          EN
        </div>
      </div>
      {/* <section className="flex flex-col gap-8 min-w-full px-3 sm:min-w-[380px] min-h-[600px]">
        <ul className="w-full flex gap-2">
          <li style={{ backgroundColor: secondaryColor }} className="grow shrink-0 h-1 rounded-full"></li>
          <li className="grow shrink-0 h-1 rounded-full bg-gray-200"></li>
          <li className="grow shrink-0 h-1 rounded-full bg-gray-200"></li>
        </ul>
        <div className="App">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 ">
              <small className="text-xs font-semibold">First name</small>
              <input
                type="text"
                value={data.firstName}
                onChange={(e) => onUpdate("firstName", e.target.value)}
                id="firstName"
                className="outline-0 text-sm border px-3 py-2 rounded-sm border-gray-300"
                placeholder="Enter your first name"
              />
              {data.firstName === "" && errors.firstName && <div className="text-red-500 text-xs">{errors.firstName}</div>}
            </div>
            <div className="flex flex-col gap-2 ">
              <small className="text-xs font-semibold">Last name</small>
              <input
                type="text"
                id="lastName"
                value={data.lastName}
                onChange={(e) => onUpdate("lastName", e.target.value)}
                className="outline-0 text-sm border px-3 py-2 rounded-sm border-gray-300"
                placeholder="Enter your last name"
              />
              {data.lastName === "" && errors.lastName && <div className="text-red-500 text-xs">{errors.lastName}</div>}
            </div>
            <div className="flex flex-col gap-2 ">
              <small className="text-xs font-semibold">Email</small>
              <input
                type="text"
                id="email"
                value={data.email}
                onChange={(e) => onUpdate("email", e.target.value)}
                className="outline-0 text-sm border px-3 py-2 rounded-sm border-gray-300"
                placeholder="Enter your email"
              />
              {data.email === "" && errors.email && <div className="text-red-500 text-xs">{errors.email}</div>}
            </div>
            <div className="flex flex-col gap-2 ">
              <small className="text-xs font-semibold">Phone number</small>
              <input
                type="text"
                id="phone"
                value={data.phoneNumber}
                onChange={(e) => onUpdate("phoneNumber", e.target.value)}
                className="outline-0 text-sm border px-3 py-2 rounded-sm border-gray-300"
                placeholder="+234"
              />
              {data.phoneNumber === "" && errors.phoneNumber && <div className="text-red-500 text-xs">{errors.phoneNumber}</div>}
            </div>
            <div className="flex flex-col gap-2 ">
              <small className="text-xs font-semibold">Gender</small>
              <select
                className="outline-0 text-sm border px-3 py-2 rounded-sm border-gray-300"
                value={data.gender}
                onChange={(e) => onUpdate("gender", e.target.value)}
              >
                <option value="">Select Option</option>
                <option value={"M"}>Male</option>
                <option value={"F"}>Female</option>
              </select>
              {data.gender === "" && errors.gender && <div className="text-red-500 text-xs">{errors.gender}</div>}
            </div>

            <Button style={{ color: secondaryColor }} variant={"ghost"} type="button" className="" onClick={handleNextClick}>
              Proceed
            </Button>

            <small className="text-center font-semibold mt-12">
              Already have an account?{" "}
              <Link style={{ color: secondaryColor }} href={"/login"} className="">
                Log in
              </Link>
            </small>
          </form>
        </div>
      </section> */}
    </>
  );
};

export default Step1;
