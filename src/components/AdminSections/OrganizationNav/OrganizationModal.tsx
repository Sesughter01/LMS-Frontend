import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import parsePhoneNumber from "libphonenumber-js";
import { ChromePicker } from "react-color";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createNewOrganization } from "@/store/slices/organizationSlice";
import { extractErrorMessage } from "@/shared/utils/helper";
import { X } from "lucide-react";

// Define props types for InstructorModal
interface OrganizationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const customMessageStyle = {
  marginTop: "2px",
  marginLeft: "2px",
  fontSize: "14px",
};

const OrganizationModal: React.FC<OrganizationModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);

  const dispatch = useDispatch();

  const [selectedColor, setSelectedColor] = useState("");
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const organizationValidationSchema = Yup.object({
    organizationName: Yup.string().required("The organization name is required"),
    logo: Yup.string().required("The logo is required"),
    email: Yup.string().email("Invalid email address").required("The email is required"),
    phoneNumber: Yup.string().required("The phone number is required"),
    colorScheme: Yup.string().matches(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/, "Color scheme is required"),
    subDomain: Yup.string().required("The sub domain is required"),
  });

  const formik = useFormik({
    initialValues: {
      organizationName: "",
      logo: "",
      email: "",
      phoneNumber: "",
      colorScheme: "",
      subDomain: "",
    },
    validationSchema: organizationValidationSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        setLoading(true);
        await dispatch(createNewOrganization({ ...values, colorScheme: selectedColor }));
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

  const handleColorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(e.target.value);
  };

  const handleColorInputClick = () => {
    setColorPickerVisible(!colorPickerVisible);
  };

  const handleColorChange = (color: any) => {
    setSelectedColor(color.hex);
  };

  const handleColorPickerClose = () => {
    setColorPickerVisible(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add New Organization Modal"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-8 w-full overflow-y-auto max-w-lg h-[85%]"
      overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center"
    >
      <div className="space-y-4 max-h-[420px] font-montserrat">
        <h2 className="text-[22px] text-black font-medium">Invite new organization</h2>
        <p className="text-[#7A7A7A] font-medium text-[15px]">
          {/* New instructors will gain access to the course creation, student list,
          and progress analytics. */}
        </p>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="oname" className="text-[#1A183E] text-sm font-medium ">
              Organization Name
            </label>
            <input
              type="text"
              required
              placeholder="Enter the organization name"
              className={`py-3 px-5 rounded-lg bg-white focus:outline-none w-full
                placeholder-gray-200::placeholder placeholder-opacity-75 border
                ${formik.errors.organizationName ? "border-red-500" : "border-[#ACACAC]"}`}
              id="oname"
              {...formik.getFieldProps("organizationName")}
            />
            {formik.touched.organizationName && formik.errors.organizationName && (
              <div className="flex text-red-500 text-xs items-center">{formik.errors.organizationName}</div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="logo" className="text-[#1A183E] text-sm font-medium ">
              Logo
            </label>
            <input
              type="text"
              required
              placeholder="Enter the logo url"
              className={`py-3 px-5 rounded-lg bg-white focus:outline-none w-full
                placeholder-gray-200::placeholder placeholder-opacity-75 border
                ${formik.errors.logo ? "border-red-500" : "border-[#ACACAC]"}`}
              id="logo"
              {...formik.getFieldProps("logo")}
            />
            {formik.touched.logo && formik.errors.logo && <div className="flex text-red-500 text-xs items-center">{formik.errors.logo}</div>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[#1A183E] text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="Enter the email"
              className={`py-3 px-5 rounded-lg bg-white focus:outline-none w-full
                placeholder-gray-200::placeholder placeholder-opacity-75 border
                ${formik.errors.email ? "border-red-500" : "border-[#ACACAC]"}`}
              id="email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && <div className="flex text-red-500 text-xs items-center">{formik.errors.email}</div>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phoneNumber" className="text-[#1A183E] text-sm font-medium">
              Mobile number
            </label>
            <PhoneInput
              country={"ng"}
              value={formik.values.phoneNumber}
              inputProps={{ required: true }}
              containerClass={`border ${formik.errors.phoneNumber ? "border-red-500" : "border-[#ACACAC]"}`}
              onChange={(phone: string) => formik.setFieldValue("phoneNumber", phone)}
              inputStyle={{
                paddingLeft: "42px",
                paddingTop: "24px",
                paddingBottom: "24px",
                borderRadius: "8px",
                width: "100%",
                backgroundColor: "#FFFFFF",
                border: "1px solid #ACACAC",
                outline: "none",
              }}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <div className="flex text-red-500 text-xs items-center">{formik.errors.phoneNumber}</div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="colorScheme" className="text-[#1A183E] text-sm font-medium">
              Color Scheme
            </label>
            <input
              type="text"
              required
              placeholder="Select color scheme"
              className={`py-3 px-5 rounded-lg bg-white focus:outline-none w-full placeholder-gray-200::placeholder placeholder-opacity-75 border ${
                formik.errors.colorScheme ? "border-red-500" : "border-[#ACACAC]"
              }`}
              id="colorScheme"
              value={selectedColor}
              onChange={handleColorInputChange}
              onClick={handleColorInputClick}
            />
            {colorPickerVisible && (
              <div className="absolute top-full flex gap-2">
                <div className="  pb-8">
                  <ChromePicker color={selectedColor} onChange={handleColorChange} />
                </div>
                <div className=" top-2 right-2 cursor-pointer" onClick={handleColorPickerClose}>
                  <X name="times-circle" color="#1A183E" size={20} />
                </div>
              </div>
            )}
            {formik.touched.colorScheme && formik.errors.colorScheme && (
              <div className="flex text-red-500 text-xs items-center">{formik.errors.colorScheme}</div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="subDomain" className="text-[#1A183E] text-sm font-medium">
              Sub Domain
            </label>
            <input
              type="text"
              required
              placeholder="Enter the sub domain"
              className={`py-3 px-5 rounded-lg bg-white focus:outline-none w-full
                placeholder-gray-200::placeholder placeholder-opacity-75 border
                ${formik.errors.subDomain ? "border-red-500" : "border-[#ACACAC]"}`}
              id="subDomain"
              {...formik.getFieldProps("subDomain")}
            />
            {formik.touched.subDomain && formik.errors.subDomain && (
              <div className="flex text-red-500 text-xs items-center">{formik.errors.subDomain}</div>
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
              <small className="text-primary mx-auto">Sending invite to organisation...</small>
            ) : (
              <button type="submit" className="bg-[#1A183E] text-base font-medium text-white px-4 py-2 rounded-lg" disabled={loading}>
                Invite
              </button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default OrganizationModal;
