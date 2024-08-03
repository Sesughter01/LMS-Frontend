"use client";
import { useState, useEffect } from "react";
import CourseForm from "@/components/AdminSections/CourseForm/CourseForm";
import BasicInfoForm from "@/components/AdminSections/CourseForm/BasicInfoForm";
import LeadInstructorForm from "@/components/AdminSections/CourseForm/LeadInstructorForm";
import FAQForm from "@/components/AdminSections/CourseForm/FAQForm";
import LocationForm from "@/components/AdminSections/CourseForm/LocationForm";
import ModulesForm from "@/components/AdminSections/CourseForm/ModulesForm";
import AdminLayout from "@/components/layouts/AdminLayouts";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/navigation";
import courseService from "@/services/api/courses";
import { toast } from "react-toastify";
import { useRequestErrorHandler } from "../../../../../utilComponents/requestErrorHandler";
import { selectCourseForm, setCourseCreationForm, clearCourseForm } from "@/store/slices/coursesSlice";
import { fetchAllInstructors } from "@/store/slices/instructorFormData";
import { useDispatch, useSelector } from "react-redux";
import { extractErrorMessage } from "@/shared/utils/helper";
import { RootState } from "@/store/store";

const customMessageStyle = {
  marginTop: "2px",
  marginLeft: "2px",
  fontSize: "14px",
};

export default function NewCourse() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const { handleRequestError } = useRequestErrorHandler({ useToast: true });
  const [isPublishing, setIsPublishing] = useState(false)

  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";

  const [activeTab, setActiveTab] = useState<"courseIntro" | "basicinfo" | "instructor" | "faq" | "location" | "modules">("courseIntro");

  const handleTabChange = (tab: "courseIntro" | "basicinfo" | "instructor" | "faq" | "location" | "modules") => {
    setActiveTab(tab);
  };

  const courseForm = useSelector(selectCourseForm);
  const { allInstructors, error } = useSelector((state: RootState) => state.instructor);
  const instructorsList = allInstructors;
  const dispatch = useDispatch();

  const updateCourseFormData = (key: string, newValue: any) => {
    let newFormInformation = { ...courseForm } as any;
    // newFormInformation[key] = newValue;
    // Check if the key is 'overview'
    if (key === "overview") {
      // If it's 'overview', update the nested properties
      newFormInformation.overview = { ...newFormInformation.overview, ...newValue };
    } else {
      // If it's not 'overview', update it as a top-level property
      newFormInformation[key] = newValue;
    }
    console.log("Updating form data with:", newFormInformation);
    dispatch(setCourseCreationForm(newFormInformation));
  };

  const updateCourseOverviewFAQFormData = (newFAQ: any) => {
    const updatedCourseForm = {
      ...courseForm,
      overview: {
        ...courseForm.overview,
        FAQ: newFAQ,
      },
    };

    // Dispatch the action to update the course creation form
    dispatch(setCourseCreationForm(updatedCourseForm));
  };

  const handleNext = () => {
    const tabs = ["courseIntro", "basicinfo", "instructor", "faq", "location", "modules"];
    const currentIndex = tabs.findIndex((tab) => tab === activeTab);

    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1] as "courseIntro" | "basicinfo" | "instructor" | "faq" | "location" | "modules");
    }
  };

  const handlePrevious = () => {
    const tabs = ["courseIntro", "basicinfo", "instructor", "faq", "location", "modules"];
    const currentIndex = tabs.findIndex((tab) => tab === activeTab);

    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1] as "courseIntro" | "basicinfo" | "instructor" | "faq" | "location" | "modules");
    }
  };

  let submitForm = async () => {
    console.log(courseForm);
    setIsPublishing(true)
    try {
      setLoading(true);
      const modulesString: any = localStorage.getItem("modules");
      const overViewString: any = localStorage.getItem("overview");
      const locationString: any = localStorage.getItem("location");
      const instructorsString: any = localStorage.getItem("instructors");
      const form = {
        courseTitle: localStorage.getItem("courseTitle"),
        courseDescription: localStorage.getItem("courseDescription"),
        coursePrice: localStorage.getItem("coursePrice"),
        courseImage: localStorage.getItem("courseImage"),
        courseDiscount: localStorage.getItem("courseDiscount"),
        status: "published",
        instructors: JSON.parse(instructorsString),
        location: JSON.parse(locationString),
        overview: JSON.parse(overViewString),
        modules: JSON.parse(modulesString),
      };
      console.log(form);
      // form.courseTitle && form.courseDescription && form.coursePrice && form.location
      if (
        form.courseTitle && 
        form.courseDescription && 
        form.coursePrice && 
        form.courseImage && 
        form.coursePrice && 
        form.location
      ) {
        const createCourse = await courseService.createACourse(form);
        console.log({ createCourse });
        setLoading(false);
        // console.log("hey success!");
        dispatch(clearCourseForm());
        localStorage.removeItem("courseTitle");
        localStorage.removeItem("courseDescription");
        localStorage.removeItem("coursePrice");
        localStorage.removeItem("courseDiscount");
        localStorage.removeItem("instructors");
        localStorage.removeItem("location");
        localStorage.removeItem("overview");
        localStorage.removeItem("modules");
        localStorage.removeItem("courseImage");
        if (createCourse) {
          router.push("/admin/course");
        }
        toast.success(
          <>
            <div>
              Course Published
              <div style={customMessageStyle}>The course has been published</div>
            </div>
          </>
        );
      } else {
        toast.success(
          <>
            <div>
              Error Occurs!
              <div style={customMessageStyle}>Cannot create course! Please ensure all inputs are properly filled</div>
            </div>
          </>
        );
      }
    } catch (error: any) {
      // handleRequestError(error);
      console.log("error", error)
      if(error.response && error.response.status === 400){
        const errorKey = Object.keys(error.response.data)[0]
        let errStr = `${errorKey.toUpperCase()}: ${error.response.data[errorKey]}`

        toast.error(errStr)
      }else{
        const errorMessage = extractErrorMessage(error);
        toast.error(errorMessage);
      }
    } finally {
      setIsPublishing(false)
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(fetchAllInstructors());
  }, []);

  return (
    <>
      <AdminLayout>
        <div className="mr-10 min-h-screen">
          <div className="flex items-center gap-4">
            <p className="text-[#7A7A7A] text-lg font-semibold">Course</p>
            <AiOutlineRight className="text-[#7A7A7A] text-lg font-semibold" />
            <p style={{ color: secondaryColor }} className="font-semibold text-lg">
              Create new course
            </p>
          </div>
          <div className="flex items-center gap-10 mt-9">
            <button onClick={() => router.back()}>
              <AiOutlineArrowLeft style={{ color: secondaryColor }} className="font-semibold text-4xl" />
            </button>
            <p style={{ color: secondaryColor }} className="font-semibold text-xl">
              Create New Course
            </p>
          </div>
          <div className="mt-4">
            <div className="w-full border-b border-[#D9D9D9] mb-8">
              {/* first button */}
              <div className="flex justify-start items-center gap-20">
                <span
                  className={`text-center inline-block py-2 cursor-pointer text-[18px] leading-normal font-normal ${
                    activeTab === "courseIntro" ? "border-b-2 border-[#1D63FE]" : ""
                  }`}
                  onClick={() => handleTabChange("courseIntro")}
                >
                  Course Introduction
                </span>
                <span
                  className={`text-center inline-block py-2 cursor-pointer text-[18px] leading-normal font-normal ${
                    activeTab === "basicinfo" ? "border-b-2 border-[#1D63FE]" : ""
                  }`}
                  onClick={() => handleTabChange("basicinfo")}
                >
                  Basic Information
                </span>
                <span
                  className={`text-center inline-block py-2 cursor-pointer text-[18px] leading-normal font-normal ${
                    activeTab === "instructor" ? "border-b-2 border-[#1D63FE]" : ""
                  }`}
                  onClick={() => handleTabChange("instructor")}
                >
                  Instructor
                </span>

                <span
                  className={`text-center inline-block py-2 cursor-pointer text-[18px] leading-normal font-normal ${
                    activeTab === "faq" ? "border-b-2 border-[#1D63FE]" : ""
                  }`}
                  onClick={() => handleTabChange("faq")}
                >
                  FAQ
                </span>

                <span
                  className={`text-center inline-block py-2 cursor-pointer text-[18px] leading-normal font-normal ${
                    activeTab === "location" ? "border-b-2 border-[#1D63FE]" : ""
                  }`}
                  onClick={() => handleTabChange("location")}
                >
                  Location
                </span>

                <span
                  className={`text-center inline-block py-2 cursor-pointer text-[18px] leading-normal font-normal ${
                    activeTab === "modules" ? "border-b-2 border-[#1D63FE]" : ""
                  }`}
                  onClick={() => handleTabChange("modules")}
                >
                  Modules
                </span>
              </div>
            </div>

            {activeTab === "courseIntro" && <CourseForm onNext={handleNext} onUpdate={updateCourseFormData} />}
            {activeTab === "basicinfo" && <BasicInfoForm onNext={handleNext} onUpdate={updateCourseFormData} />}
            {activeTab === "instructor" && <LeadInstructorForm onNext={handleNext} onUpdate={updateCourseFormData} data={instructorsList} />}
            {activeTab === "faq" && <FAQForm onNext={handleNext} onUpdate={updateCourseFormData} />}
            {activeTab === "location" && <LocationForm onNext={handleNext} onUpdate={updateCourseFormData} />}
            {activeTab === "modules" && <ModulesForm onNext={handleNext} awaitSubmit={submitForm} isPublishing={isPublishing}/>}
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
