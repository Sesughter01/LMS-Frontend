"use client";
import { useEffect, useState } from "react";
import AssessmentForm from "@/components/AdminSections/AssessmentForm/AssessmentForm";
import CohortSelectionAssessmentForm from "@/components/AdminSections/AssessmentForm/CohortSelectionForm";
import CourseSelection from "@/components/AdminSections/AssessmentForm/CourseSelection";
import AssessmentModule from "@/components/AdminSections/AssessmentForm/AssessmentModule";
import AssessmentSettingsForm from "@/components/AdminSections/AssessmentForm/AssessmentSettingsForm";
import AssessmentQuestion from "@/components/AdminSections/AssessmentForm/AssessmentQuestion";
import PublishAssessment from "@/components/AdminSections/AssessmentForm/PublishAssessment";
import AdminLayout from "@/components/layouts/AdminLayouts";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/navigation";
import formService from "../../../../services/forms";
import { toast } from "react-toastify";
import { useRequestErrorHandler } from "../../../../../utilComponents/requestErrorHandler";
import { useSearchParams } from 'next/navigation'

export default function NewAssessment() {
  const router = useRouter();
   const searchParams = useSearchParams()
 
  const search = searchParams.get('search')  

  const [loading, setLoading] = useState(false);
  const { handleRequestError } = useRequestErrorHandler({ useToast: true });
  const [currentStep, setCurrentStep] = useState(1);
  const [previousStep, setPreviouStep] = useState<null | number>(null);
  const [activeTab, setActiveTab] = useState<string | null>("");

  const savedAssessmentType = sessionStorage.getItem("selectedAssessmentType");
  console.log("Saved Assessment Type:", savedAssessmentType);

  useEffect(() => {
    const aT = searchParams.get('tab')
    if(aT){
      setActiveTab(aT)
    }
    console.log("searchParams.get('search') ", aT)
  }, [searchParams]);

  const checkAndNavigate = () => {
    if (savedAssessmentType) {
      if (savedAssessmentType === "cohortPreAssessment") {
        setCurrentStep(2);
      } else if (savedAssessmentType === "course") {
        setCurrentStep(3);
      } else if (savedAssessmentType === "coursePreAssessment") {
        setCurrentStep(3);
      } else {
      }
    }
  };

  useEffect(() => {
    checkAndNavigate();
  }, [savedAssessmentType]);

  let submitForm = async (values: any) => {
    setLoading(true);
    try {
      await formService.CREATE_COHORT_FORM(values);
      setLoading(false);
      console.log("hey success!");

      toast.success("Assessment created successfully!");
    } catch (error) {
      handleRequestError(error);
      setLoading(false);
    }
  };

  const handleNext = () => {
    setPreviouStep(currentStep)
    setCurrentStep(currentStep + 1);
  };
  const handleCohort = () => {
    setCurrentStep(currentStep + 3);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    // console.log("currentStep", currentStep)
    // if(currentStep == 1){
    //   router.push('/admin/assessment')
    // }else{
    //   // setCurrentStep(currentStep - 1);
    //   setCurrentStep(previousStep);
    // }
  };

  return (
    <>
      <AdminLayout>
        <div className="mr-10">
          <div className="flex items-center gap-4">
            <p onClick={() => router.push('/admin/assessment')} className="text-[#7A7A7A] cursor-pointer text-lg font-semibold">Assessments</p>
            <AiOutlineRight className="text-[#7A7A7A] text-lg font-semibold" />
            <p className="text-menu font-semibold text-lg">
              Create new assessment
            </p>
          </div>

          <div className="mt-4">
            {activeTab == "assessment" && (
              <AssessmentForm
                onPrev={handlePrevious}
                onNext={handleNext}
                awaitSubmit={submitForm}
              />
            )}
            {activeTab == "cohort" && (
              <CohortSelectionAssessmentForm
                onNext={handleCohort}
                awaitSubmit={submitForm}
                onPrev={handlePrevious}
              />
            )}
            {activeTab == "course" && (
              <CourseSelection
                onPrev={handlePrevious}
                onNext={handleNext}
                awaitSubmit={submitForm}
              />
            )}
            {/*{currentStep === 4 &&
              savedAssessmentType !== "coursePreAssessment" && (
                <AssessmentModule
                  onPrev={handlePrevious}
                  onNext={handleNext}
                  awaitSubmit={submitForm}
                />
              )}
            {currentStep === 4 &&
              savedAssessmentType === "coursePreAssessment" && (
                <AssessmentSettingsForm
                  onNext={handleNext}
                  awaitSubmit={submitForm}
                  onPrev={handlePrevious}
                />
              )}*/}
            {activeTab == "modules" && (<AssessmentModule
                  onPrev={handlePrevious}
                  onNext={handleNext}
                  awaitSubmit={submitForm}
                />
              )}
           
            {activeTab == "settings" && (
              <AssessmentSettingsForm
                onNext={handleNext}
                awaitSubmit={submitForm}
                onPrev={handlePrevious}
              />
            )}
            {activeTab == "questions" && (
              <AssessmentQuestion onNext={handleNext} onPrev={handlePrevious} />
            )}
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

// export default newAssessment;
