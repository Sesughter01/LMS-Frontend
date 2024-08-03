"use client";

import Image from "next/image";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Logo from "@/assets/logo.png";
import cta_image from "@/assets/Group 710.png";
import cta_bg from "@/assets/Group 96.png";
import { ChevronLeft } from "lucide-react";

import Step1 from "./containers/Step1";
import Step2 from "./containers/Step2";
import Step3 from "./containers/Step3";
import { toast } from "react-toastify";
import { extractErrorMessage } from "@/shared/utils/helper";
import { register,mockRegisterFunction } from "@/services/AuthService";
import {
  selectRegistrationForm,
  setRegistrationForm,
} from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Programme } from "@/shared/types/programme";
import { Cohort } from "@/shared/types/cohort";
import { Course } from "@/shared/types/course";
import { GetDefaultProgramme } from "@/services/api/programme";
import { GetCohortsWithinAProgramme } from "@/services/api/cohort";
import courseService from "@/services/api/courses";
import { subdomain } from "../login/page";
import axiosInstance from "@/shared/utils/axios.instance";
import { useTheme } from "@/context/ThemeContext";
import Spinner from "../../../utilComponents/Spinner";



export default function LoginPage() {
  // const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // For Screen2
  const [defaultProgramme, setDefaultProgramme] = useState<Programme>();
  const [availableCohorts, setAvailableCohorts] = useState<Cohort[]>();
  const [availableCourses, setAvailableCourses] = useState<Course[]>();
  const [loadingCourses, setLoadingCourses] = useState(false);

  const registrationForm = useSelector(selectRegistrationForm);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const {
    secondaryColor,
    changeSecondaryColor,
    changeLogoUrl,
    id,
    changeId,
    logoUrl,
  } = useTheme();

  // useEffect(() => {
  //   const fetchOrganization = async () => {
  //     try {
  //       const response = await axiosInstance.get(
  //         `api/v1/organizations/${subdomain}`
  //       );
  //       console.log("Organization Data:", response.data);

  //       // Handle the organization data as needed

  //       changeSecondaryColor(response.data.colorScheme);
  //       changeLogoUrl(response.data.logo);
  //       changeId(response.data.id);
  //     } catch (error: any) {
  //       console.error("Error fetching organization:", error.message);
  //       // Handle the error
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   if (subdomain) {
  //     fetchOrganization();
  //   }
  // }, [subdomain]);

  //const [signUpForm, setSignUpForm] = useState<any>();
  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const response = await axiosInstance.get(
          `api/v1/organizations/${subdomain}`
        );
        console.log("SUBDOMAIN NEW:", subdomain);
        console.log("Organization Data:", response.data);

        // Handle the organization data as needed

        changeSecondaryColor(response.data.colorScheme);
        changeLogoUrl(response.data.logo);
        changeId(response.data.id);
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
  const updateSignUpFormData = (key: string, newValue: any) => {
    let newFormInformation = { ...registrationForm } as any;
    newFormInformation[key] = newValue;

    dispatch(setRegistrationForm(newFormInformation));
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const submitRegistration = async () => {
    try {
      setLoading(true);
      const response = await register(registrationForm);

      router.push(`/signup/verify-email?email=${response.email}`);

    } catch (err: any) {
      const errorMessage = extractErrorMessage(err);
      // console.log('err', err)
      if(err.response && err.response.status === 400){
        const errorKey = Object.keys(err.response.data)[0]
        let errStr = `${errorKey.toUpperCase()}: ${err.response.data[errorKey]}`

        toast.error(errStr)
      }else{
        toast.error(errorMessage);
      }

    } finally {
      setLoading(false);
    }
  };

  // NEW SUBMITREG FROM CHARLES START
  const submitRegistration2 = async () => {
    try {
      setLoading(true);
      // const response = await register(registrationForm);
      const response = await register(registrationForm);

      router.push(`/signup/verify-email?email=${response.email}`);

    } catch (err: any) {
      const errorMessage = extractErrorMessage(err);
      // console.log('err', err)
      if(err.response && err.response.status === 400){
        const errorKey = Object.keys(err.response.data)[0]
        let errStr = `${errorKey.toUpperCase()}: ${err.response.data[errorKey]}`

        toast.error(errStr)
      }else{
        toast.error(errorMessage);
      }

    } finally {
      setLoading(false);
    }
  };

  // Stuff needed for the second Screen
  const populateProgrammeAndCohorts = async () => {
    let programme = await GetDefaultProgramme();
    console.log("Default Programme:", programme); // Log the returned programme
    setDefaultProgramme(programme);

    let cohorts = await GetCohortsWithinAProgramme();
    console.log("ALL COHORT DATA", cohorts);
    console.log("COHORT", cohorts[0]);
    setAvailableCohorts(cohorts);

    if (cohorts.length > 0) {
      updateSignUpFormData("preferredCohort", cohorts[0].id);
      // updateSignUpFormData('preferredCohortId', cohorts[0].id)
    }
  };

  const organizationId = id;
  console.log("PREFERRED COURSE", Number(registrationForm.preferredCourse));
  console.log("PROGRAMME ID", defaultProgramme?.id);
  const populateCourses = async () => {
    // let programme = await GetDefaultProgramme();
    // console.log("Default Programme:", programme); // Log the returned programme
    // setDefaultProgramme(programme);
    if (!defaultProgramme) {
      await populateProgrammeAndCohorts();
    }
    if (defaultProgramme) {
      try {
        setLoadingCourses(true);
        // console.log("@@@@@@@@@@@@@", organizationId, defaultProgramme?.id,   registrationForm.preferredCohort )
        let courses = await courseService.GetAllAvailableCourses(
          organizationId,
          defaultProgramme?.id,
          registrationForm.preferredCohort
          
        );
        console.log("ALL COURSES DATA", courses.results);
       
        setAvailableCourses(courses.results);

        // console.log("****courses", courses)

        if (courses.length > 0) {
          updateSignUpFormData("preferredCourse", courses.results[0].id);
          // updateSignUpFormData('preferredCourseId', courses[0].id)
        }
      } catch (err: any) {
        const errMsg = extractErrorMessage(err) || err?.message;
        toast(errMsg, { position: toast.POSITION.TOP_RIGHT });
      } finally {
        setLoadingCourses(false);
      }
    }
  };

  useEffect(() => {
    populateProgrammeAndCohorts();
  }, []);

  useEffect(() => {
    populateCourses();
  }, [registrationForm.preferredCohort, availableCohorts, defaultProgramme]);

  

  console.log("Current Form", registrationForm);

  return (
    <>
      <main className="flex w-full h-screen ">
        {isLoading ? (
          // Show a spinner while loading
          <div className="flex items-center justify-center w-full h-full">
            <Spinner />
          </div>
        ) : (
          <ul
            style={{ backgroundColor: secondaryColor }}
            className="grid grid-flow-row lg:grid-cols-2 grid-rows-1 h-full lg:h-screen  w-full"
          >
            <li
              style={{ backgroundColor: secondaryColor }}
              className="hidden lg:flex flex-col h-full text-white place-content-center"
            >
              <section className="flex flex-col gap-2 px-24 py-12 items-center relative overflow-hidden">
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
            <li className="flex flex-col h-full place-content-center items-center bg-white lg:rounded-tl-3xl ">
              {currentStep === 1 && (
                <Step1
                  secondaryColor={secondaryColor}
                  onNext={handleNext}
                  onUpdate={updateSignUpFormData}
                  data={registrationForm}
                  onLoading={setLoading}
                />
              )}
              {currentStep === 2 && (
                <Step2
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  onUpdate={updateSignUpFormData}
                  data={registrationForm}
                  onLoading={setLoading}
                  program={defaultProgramme}
                  allCohorts={availableCohorts}
                  courses={availableCourses}
                  loadingCourses={loadingCourses}
                  secondaryColor={secondaryColor}
                />
              )}
              {currentStep === 3 && (
                <Step3
                  onPrevious={handlePrevious}
                  onUpdate={updateSignUpFormData}
                  data={registrationForm}
                  onSubmit={submitRegistration2}
                  loading={loading}
                  // onLoading={setLoading}
                  secondaryColor={secondaryColor}
                />
              )}
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
