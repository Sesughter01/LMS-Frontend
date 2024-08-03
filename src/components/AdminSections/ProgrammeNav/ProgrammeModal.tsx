import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { extractErrorMessage } from "@/shared/utils/helper";
import { X } from "lucide-react";
import { createProgrammeAsync } from "@/store/slices/programmeMain";
import axiosInstance from "@/shared/utils/axios.instance";
import { Organization } from "@/shared/types/organization";

// Define props types for ProgrammeModal
interface ProgrammeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProgrammeModal: React.FC<ProgrammeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  const programmeValidationSchema = Yup.object({
    programmeName: Yup.string().required("The programme name is required"),
    programmeDescription: Yup.string().required("The programme description is required"),
    organization: Yup.string().required("Please select an organization"),
  });

  // useEffect(() => {
  //   console.log("useEffect triggered");
  //   const fetchOrganizations = async () => {
  //     try {
  //       const response = await axiosInstance.get("/api/v1/organizations", { params: { isOpen: false } });
  //       console.log("orgRes:", response);
  //       setOrganizations(response.data);
  //     } catch (error) {
  //       console.error("Error fetching organizations:", error);
  //     }
  //   };

  //   fetchOrganizations();
  // }, []);

  useEffect(() => {
    console.log("useEffect triggered");
    const fetchOrganizations = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/organizations?open=false");
        console.log("orgRes:", response);
        setOrganizations(response.data);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };

    // Fetch organizations when the modal is opened
    if (isOpen) {
      fetchOrganizations();
    }
  }, [isOpen]);

  const formik = useFormik({
    initialValues: {
      programmeName: "",
      programmeDescription: "",
      organization: "",
    },
    validationSchema: programmeValidationSchema,

    onSubmit: async (values, { setErrors }) => {
      try {
        setLoading(true);
        await dispatch(createProgrammeAsync(values) as any);
        formik.resetForm();
        onClose();
      } catch (err: any) {
        console.log(err);
        const errorMessage = extractErrorMessage(err);

        if (err.response && err.response.data && err.response.data.errors) {
          setErrors(err.response.data.errors);
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add New Programme Modal"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-8 w-full overflow-y-auto max-w-lg "
      overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center"
    >
      <div className="space-y-4 max-h-lg font-montserrat">
        <h2 className="text-[22px] text-black font-medium">Create new programme</h2>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="pname" className="text-[#1A183E] text-sm font-medium">
              Programme Name
            </label>
            <input
              type="text"
              required
              placeholder="Enter the programme name"
              className={`py-3 px-5 rounded-lg bg-white focus:outline-none w-full
                placeholder-gray-200::placeholder placeholder-opacity-75 border
                ${formik.errors.programmeName ? "border-red-500" : "border-[#ACACAC]"}`}
              id="pname"
              {...formik.getFieldProps("programmeName")}
            />
            {formik.touched.programmeName && formik.errors.programmeName && (
              <div className="flex text-red-500 text-xs items-center">{formik.errors.programmeName}</div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="pdescription" className="text-[#1A183E] text-sm font-medium">
              Programme Description
            </label>
            <input
              type="text"
              required
              placeholder="Enter the programme description"
              className={`py-3 px-5 rounded-lg bg-white focus:outline-none w-full
                placeholder-gray-200::placeholder placeholder-opacity-75 border
                ${formik.errors.programmeDescription ? "border-red-500" : "border-[#ACACAC]"}`}
              id="pdescription"
              {...formik.getFieldProps("programmeDescription")}
            />
            {formik.touched.programmeDescription && formik.errors.programmeDescription && (
              <div className="flex text-red-500 text-xs items-center">{formik.errors.programmeDescription}</div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="organization" className="text-[#1A183E] text-sm font-medium">
              Organization
            </label>
            <select
              id="organization"
              required
              className={`py-3 px-5 rounded-lg bg-white focus:outline-none w-full
    placeholder-gray-200::placeholder placeholder-opacity-75 border
    ${formik.errors.organization ? "border-red-500" : "border-[#ACACAC]"}`}
              {...formik.getFieldProps("organization")}
            >
              {organizations.length === 0 ? (
                <option value="" disabled>
                  No organizations found
                </option>
              ) : (
                <>
                  <option value="" disabled>
                    Select an organization
                  </option>
                  {organizations.map((org) => (
                    <option key={org.id} value={org.id}>
                      {org.organizationName}
                    </option>
                  ))}
                </>
              )}
            </select>
            {formik.touched.organization && formik.errors.organization && (
              <div className="flex text-red-500 text-xs items-center">{formik.errors.organization}</div>
            )}
          </div>

          <div className="flex pb-8 justify-end items-center gap-4">
            <button
              type="button"
              className="text-[#1A183E] text-base font-medium"
              onClick={() => {
                formik.resetForm();
                onClose();
              }}
            >
              Cancel
            </button>
            {loading ? (
              <small className="text-primary mx-auto">Creating new programme...</small>
            ) : (
              <button
                type="submit"
                className="bg-[#1A183E] text-base font-medium text-white px-4 py-2 rounded-lg"
                disabled={loading}
              >
                Create Programme
              </button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ProgrammeModal;
