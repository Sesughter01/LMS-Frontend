"use client";
import { useState, useEffect } from "react";
import EditCohortForm from "@/components/AdminSections/CohortForm/EditCohortForm";
import AdminLayout from "@/components/layouts/AdminLayouts";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";
import formService from "../../../../../services/forms";
import { toast } from "react-toastify";
import { useRequestErrorHandler } from "../../../../../../utilComponents/requestErrorHandler";
import { fetchACohortsById } from "@/store/slices/cohortFormData";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useParams } from "next/navigation";
import Link from "next/link";
import uploadService from "@/services/api/upload";
import { useRouter } from "next/navigation";

const customMessageStyle = {
  marginTop: "2px",
  marginLeft: "2px",
  fontSize: "14px",
};

export default function EditCohort() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();

  const cohortId = Array.isArray(params.id) ? parseInt(params.id[0], 10) : parseInt(params.id, 10);

  const [loading, setLoading] = useState(false);
  const { handleRequestError } = useRequestErrorHandler({ useToast: true });

  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";

  let submitForm = async (values: any) => {
    setLoading(true);
    try {
      if (values.image.name.startsWith("https://s3.eu-west-1.wasabisys.com/")) {
        values.image = values.image.name;
      } else {
        const formData = new FormData();
        formData.append("file", values?.image);
        const image = await uploadService.UploadFiletoS3(formData);
        console.log({ image });
        values.image = image;
      }
      await formService.UPDATE_COHORT_FORM(cohortId, values);
      setLoading(false);
      router.push("/admin/cohort");
      toast.success(
        <>
          <div>
            Change Saved
            <div style={customMessageStyle}>Cohort updated successfully!</div>
          </div>  
        </>
      );
    } catch (error: any) {
      console.error("Error response:", error);
      if(error.message == "Network Error"){
        toast.error("Please ensure you have a stable internet connection")
      }
      handleRequestError(error);
      setLoading(false);
    }
  };

   useEffect(() => {
    router.refresh();
  }, []);

  const { singleCohort } = useSelector((state: RootState) => state.form);

  useEffect(() => {
    // console.log("gegegege", singleCohort)
    const aaa = dispatch(fetchACohortsById(cohortId));
    // console.log("aaaaaaaaa", aaa)
  }, [cohortId, dispatch]);

  const cohort: any = singleCohort;

  return (
    <>
      <AdminLayout>
        <div className="mr-10">
          <div className="flex items-center gap-4">
            <p className="text-[#7A7A7A] text-lg font-semibold">Cohort</p>
            <AiOutlineRight className="text-[#7A7A7A] text-lg font-semibold" />
            <p style={{ color: secondaryColor }} className="font-semibold text-lg">
              Edit Cohort
            </p>
          </div>
          <div className="flex items-center gap-10 mt-9">
            <Link href="/admin/cohort">
              <button>
                <AiOutlineArrowLeft style={{ color: secondaryColor }} className="font-semibold text-4xl" />
              </button>
            </Link>
            <p style={{ color: secondaryColor }} className="font-semibold text-xl">
              Edit Cohort
            </p>
          </div>
          <div className="mt-4">
            <EditCohortForm awaitSubmit={submitForm} submitting={loading} cohort={cohort} />
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
