"use client";
import { useState } from "react";
import CohotForm from "@/components/AdminSections/CohortForm/CohotForm";
import AdminLayout from "@/components/layouts/AdminLayouts";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/navigation";
import formService from "@/services/forms";
import uploadService from "@/services/api/upload";
import { toast } from "react-toastify";
import { useRequestErrorHandler } from "../../../../../utilComponents/requestErrorHandler";
import { UpdateSingleCohortStatus } from "@/services/api/cohort";
import { fetchAllCohorts } from "@/store/slices/cohortFormData";
import { useDispatch, useSelector } from "react-redux";

const customMessageStyle = {
  marginTop: "2px",
  marginLeft: "2px",
  fontSize: "14px",
};

export default function NewCohort() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const { handleRequestError } = useRequestErrorHandler({ useToast: true });

  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";

  let submitForm = async (values: any, cohortId?: number) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", values?.image);
      const image = await uploadService.UploadFiletoS3(formData);
      console.log({ image });
      values.image = image;

      let data: any;
      if (cohortId) {
        if (values.status === "published") {
          await UpdateSingleCohortStatus(cohortId, values.status);
        }
        data = await formService.UPDATE_COHORT_FORM(cohortId, values);
      } else {
        data = await formService.CREATE_COHORT_FORM(values);
      }

      setLoading(false);

      // Handle status based on the response structure
      const status = data?.data?.status || data?.status;

      router.push("/admin/cohort");
      // /admin/cohort

      if (status === "drafts") {
        toast.success(
          <>
            <div>
              Change Saved
              <div style={customMessageStyle}>
                Cohort created successfully
              </div>
            </div>
          </>
        );
      } else {
        toast.success(
          <>
            <div>
              Change Saved
              <div style={customMessageStyle}>
                Cohort {cohortId ? "updated" : "created"} successfully!
              </div>
            </div>
          </>
        );
      }

      await dispatch(fetchAllCohorts());
      return data;
    } catch (error: any) {
      console.error("Error response:", error);
      if(error.response.status == 413){
        toast.error("Cohort Image File is too large!")
      }else{
        handleRequestError(error);
      }
    } finally{
      setLoading(false);
    }
  };

  return (
    <>
      <AdminLayout>
        <div className="mr-10">
          <div className="flex items-center gap-4">
            <p className="text-[#7A7A7A] text-lg font-semibold">Cohort</p>
            <AiOutlineRight className="text-[#7A7A7A] text-lg font-semibold" />
            <p
              style={{ color: secondaryColor }}
              className="font-semibold text-lg"
            >
              Create New Cohort
            </p>
          </div>
          <div className="flex items-center gap-10 mt-9">
            <button onClick={() => router.back()}>
              <AiOutlineArrowLeft
                style={{ color: secondaryColor }}
                className="font-semibold text-4xl"
              />
            </button>
            <p
              style={{ color: secondaryColor }}
              className="font-semibold text-xl"
            >
              Create New Cohort
            </p>
          </div>
          <div className="mt-4">
            <CohotForm awaitSubmit={submitForm} isLoading={loading} />
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

//export default Page;
