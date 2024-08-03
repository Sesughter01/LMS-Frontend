import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

interface Step3Props {
  onPrevious: () => void;
  onUpdate: (key: string, value: any) => void;
  data: any;
  onSubmit: () => void;
  loading: boolean;
  secondaryColor: any;
}

const Step3: React.FC<Step3Props> = ({
  onPrevious,
  onUpdate,
  data,
  onSubmit,
  loading,
  secondaryColor,
}) => {
  const searchParams = useSearchParams();
  // const [showPayWilling, setShowPayWilling] = useState<boolean | null>(null);

  const [errors, setErrors] = useState({
    // payWilling: "",
    physicalAttendance: "",
    // learnAboutUsFrom: "",
    password: "",
  });

  const handleNextClick = () => {
    const {  physicalAttendance, password } = data;
    const newErrors = {
      // payWilling: payWilling ? "" : "Willingly to pay option is required",
      physicalAttendance: physicalAttendance
        ? ""
        : "Physical Attendance option is required",
      // learnAboutUsFrom: learnAboutUsFrom
      //   ? ""
      //   : "Where you heard about us option is required",
      password: password ? "" : "Password is required",
    };
    setErrors(newErrors);
    if (Object.values(newErrors).every((error) => !error)) {
      onSubmit();
    } else {
      const err1 = Object.values(newErrors).filter((e) => e !== "")[0];
      toast.error(err1);
    }
  };

  // useEffect(() => {
  //   if (searchParams.get("enroll") == "true") {
  //     setShowPayWilling(false);
  //     onUpdate("physicalAttendance", "yes");
  //     onUpdate("payWilling", "yes");
  //   } else {
  //     setShowPayWilling(true);
  //   }
  // }, [searchParams]);

  return (
    <>
        <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col gap-10 w-full max-w-md px-5 lg:px-10 mb-10">
        <div className="flex items-center gap-4">
          <ChevronLeft
            style={{ backgroundColor: secondaryColor }}
            onClick={onPrevious}
            className="rounded-full w-8 h-8 text-white cursor-pointer"
          />
          <div>
            <h1 style={{ color: secondaryColor }} className="text-2xl font-bold">
              Sign Up
            </h1>
            <small className="text-gray-500">We made it!</small>
          </div>
        </div>
        <section className="flex flex-col gap-8 min-w-[380px]">
          <ul className="w-full flex gap-2">
            <li style={{ backgroundColor: secondaryColor }} className="grow shrink-0 h-1 rounded-full"></li>
            <li style={{ backgroundColor: secondaryColor }} className="grow shrink-0 h-1 rounded-full"></li>
            <li style={{ backgroundColor: secondaryColor }} className="grow shrink-0 h-1 rounded-full"></li>
          </ul>
          <div className="App">
            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 ">
                <small className="text-xs font-semibold">Preferred method of learning ?(optional)</small>
                <select
                  className="outline-0 text-sm border px-3 py-2 rounded-sm border-gray-300"
                  value={data.physicalAttendance}
                  onChange={(e) => onUpdate("physicalAttendance", e.target.value)}
                >
                  <option value="">Select Option</option>
                  <option value={"yes"}>Physical</option>
                  <option value={"no"}>Virtual</option>
                </select>
                {data.physicalAttendance === "" && errors.physicalAttendance && <div className="text-red-500 text-xs">{errors.physicalAttendance}</div>}
              </div>
              <div className="flex flex-col gap-2 ">
                <small className="text-xs font-semibold">Create a Password</small>
                <input
                  type="password"
                  id="password"
                  value={data.password}
                  onChange={(e) => onUpdate("password", e.target.value)}
                  className="outline-0 text-sm border px-3 py-2 rounded-sm border-gray-300"
                  placeholder="Enter your password"
                />
                {errors.password && <div className="text-red-500 text-xs">{errors.password}</div>}
              </div>
              <div className="flex flex-col gap-2 ">
                <small className="text-xs font-semibold">Confirm Password</small>
                <input
                  type="password"
                  id="confirmPassword"
                  value={data.confirmPassword}
                  onChange={(e) => onUpdate("confirmPassword", e.target.value)}
                  className="outline-0 text-sm border px-3 py-2 rounded-sm border-gray-300"
                  placeholder="Confirm your password"
                />
                {data.confirmPassword !== data.password && <div className="text-red-500 text-xs">Passwords do not match</div>}
              </div>
              {loading ? (
                <small className="text-primary mx-auto">Creating your account...</small>
              ) : (
                <Button style={{ color: '#F305F8' }} variant={"ghost"} type="button" className="" disabled={loading} onClick={handleNextClick}>
                  Proceed
                </Button>
              )}
              <small className="text-center font-semibold mt-12">
                Already have an account?{" "}
                <Link style={{ color: '#F305F8' }} href={"/login"} className="">
                  Log in
                </Link>
              </small>
            </form>
          </div>
        </section>
      </div>
    </div>
      {/* <section className="flex flex-col gap-8 min-w-[380px] min-h-[600px]">
        <ul className="w-full flex gap-2">
          {[1, 2, 3].map((_, index) => (
            <li
              key={index}
              style={{ backgroundColor: secondaryColor }}
              className="grow shrink-0 h-1 rounded-full"
            ></li>
          ))}
        </ul>
        <div className="App">
          <form className="flex flex-col gap-4">
            {showPayWilling !== null && (
              <div className="flex flex-col gap-2 ">
                <small className="text-xs font-semibold">
                  Are you willing to pay for this training
                </small>
                <select
                  className="outline-0 text-sm border px-3 py-2 rounded-sm border-gray-300"
                  value={data.payWilling}
                  onChange={(e) => onUpdate("payWilling", e.target.value)}
                >
                  <option value="">Select Option</option>
                  <option value={"yes"}>Yes</option>
                  <option value={"no"}>No</option>
                </select>
                {data.payWilling === "" && errors.payWilling && (
                  <div className="text-red-500 text-xs">
                    {errors.payWilling}
                  </div>
                )}
              </div>
            )}

            {showPayWilling !== null && (
              <div className="flex flex-col gap-2 ">
                <small className="text-xs font-semibold">
                  Can you attend physical training at VI Lagos once a week?
                </small>
                <select
                  className="outline-0 text-sm border px-3 py-2 rounded-sm border-gray-300"
                  value={data.physicalAttendance}
                  onChange={(e) =>
                    onUpdate("physicalAttendance", e.target.value)
                  }
                >
                  <option value="">Select Option</option>
                  <option value={"yes"}>Yes</option>
                  <option value={"no"}>No</option>
                </select>
                {data.physicalAttendance === "" &&
                  errors.physicalAttendance && (
                    <div className="text-red-500 text-xs">
                      {errors.physicalAttendance}
                    </div>
                  )}
              </div>
            )}

            <div className="flex flex-col gap-2 ">
              <small className="text-xs font-semibold">
                Where did you hear about us?
              </small>
              <select
                className="outline-0 text-sm border px-3 py-2 rounded-sm border-gray-300"
                value={data.learnAboutUsFrom}
                onChange={(e) => onUpdate("learnAboutUsFrom", e.target.value)}
              >
                <option value="">Select Option</option>
                <option value={"LSETF"}>LSETF</option>
                <option value={"X(Twitter)"}>X(Twitter)</option>
                <option value={"instagram"}>Instagram</option>
                <option value={"linkedIn"}>LinkedIn</option>
                <option value={"facebook"}>Facebook</option>
                <option value={"others"}>Others</option>
              </select>
              {data.learnAboutUsFrom === "" && errors.learnAboutUsFrom && (
                <div className="text-red-500 text-xs">
                  {errors.learnAboutUsFrom}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 ">
              <small className="text-xs font-semibold">Create a Password</small>
              <input
                type="password"
                id="password"
                value={data.password}
                onChange={(e) => onUpdate("password", e.target.value)}
                className="outline-0 text-sm border px-3 py-2 rounded-sm border-gray-300"
                placeholder="Enter your password"
              />
              {errors.password && (
                <div className="text-red-500 text-xs">{errors.password}</div>
              )}
            </div>

            {loading ? (
              <small className="text-primary  mx-auto">
                Creating your account...
              </small>
            ) : (
              <Button
                style={{ color: secondaryColor }}
                variant={"ghost"}
                type="button"
                className=""
                disabled={loading}
                onClick={handleNextClick}
              >
                Proceed
              </Button>
            )}

            <small className="text-center font-semibold mt-12">
              Already have an account?{" "}
              <Link
                style={{ color: secondaryColor }}
                href={"/login"}
                className=""
              >
                Log in
              </Link>
            </small>
          </form>
        </div>
      </section> */}
    </>
  );
};

export default Step3;
