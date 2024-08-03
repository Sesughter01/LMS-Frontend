import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import parsePhoneNumber, { getCountryCallingCode } from "libphonenumber-js";

// Define props types for InstructorModal
interface InstructorModalProps {
  isOpen: boolean;
  onClose: () => void;
  awaitSubmit: () => void;
  onUpdate: (key: string, value: string) => void;
  data: any;
  loading: boolean;
  closeAction: () => void;
  secondaryColor: any;
}

const customMessageStyle = {
  marginTop: "2px",
  marginLeft: "2px",
  fontSize: "14px",
};

const InstructorModal: React.FC<InstructorModalProps> = ({ isOpen, onClose, awaitSubmit, onUpdate, data, loading, closeAction, secondaryColor }) => {
  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const validateEmail = (email: string): boolean => {
    // Regular expression to validate an email address
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    onUpdate("email", email);

    // Validate email and update errors
    const newErrors = {
      ...errors,
      email: email ? (validateEmail(email) ? "" : "Email is invalid") : "Email is required",
    };

    setErrors(newErrors);
  };

  const handleNextClick = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form when the "Proceed" button is clicked
    const { firstName, lastName, email, phone } = data;

    // Check if the phone number is not empty and is a valid number
    const phoneNumber = phone.trim();
    const isValidPhoneNumber = phoneNumber && parsePhoneNumber(phoneNumber, "NG")?.isValid();

    const newErrors = {
      firstName: firstName ? "" : "The first name is required",
      lastName: lastName ? "" : "The last name is required",
      // email: email ? "" : "The email is required",
      email: email ? (validateEmail(email) ? "" : "Email is invalid") : "Email is required",
      phone: isValidPhoneNumber ? "" : "The phone number is invalid",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      awaitSubmit();
    } else {
      // Show error message using toast
      toast.error("Please fill in all required fields.");
    }
  };

  const closeModalAction = () => {
    closeAction();
    setErrors({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });
    onClose();
  };

  return (
    // overflow-y-auto
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add New Instructor Modal"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-8 w-full max-w-lg h-[85%]" // Tailwind CSS classes for styling
      overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center" // Tailwind CSS classes for overlay
    >
      {/* Your modal content goes here */}
      <div className="space-y-4 max-h-[420px] font-montserrat">
        <h2 className="text-[22px] text-black font-medium">Invite new instructor</h2>
        <p className="text-[#7A7A7A] font-medium text-[15px]">
          {/* New instructors will gain access to the course creation, student list,
          and progress analytics. */}
        </p>

        <form onSubmit={handleNextClick} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="fname" className="text-[#1A183E] text-sm font-medium ">
              First Name
            </label>
            <input
              type="text"
              required
              placeholder="Enter the first name"
              className={`py-3 px-5 rounded-lg bg-white focus:outline-none w-full
                placeholder-gray-200::placeholder placeholder-opacity-75 border
                ${errors.firstName ? "border-red-500" : "border-[#ACACAC]"}`}
              id="fname"
              value={data.firstName}
              onChange={(e) => onUpdate("firstName", e.target.value)}
            />
            {data.firstName === "" && errors.firstName && (
              <div className="flex text-red-500 text-xs items-center">
                <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M6 0.75C4.96165 0.75 3.94662 1.05791 3.08326 1.63478C2.2199 2.21166 1.54699 3.0316 1.14963 3.99091C0.752275 4.95022 0.648307 6.00582 0.85088 7.02422C1.05345 8.04262 1.55347 8.97809 2.28769 9.71231C3.02192 10.4465 3.95738 10.9466 4.97578 11.1491C5.99418 11.3517 7.04978 11.2477 8.00909 10.8504C8.9684 10.453 9.78834 9.7801 10.3652 8.91674C10.9421 8.05339 11.25 7.03835 11.25 6C11.25 4.60761 10.6969 3.27226 9.71231 2.28769C8.72775 1.30312 7.39239 0.75 6 0.75ZM6 3C6.11125 3 6.22001 3.03299 6.31251 3.0948C6.40501 3.15661 6.47711 3.24446 6.51968 3.34724C6.56226 3.45002 6.5734 3.56312 6.55169 3.67224C6.52999 3.78135 6.47642 3.88158 6.39775 3.96025C6.31908 4.03891 6.21886 4.09249 6.10974 4.11419C6.00063 4.1359 5.88753 4.12476 5.78474 4.08218C5.68196 4.03961 5.59411 3.96751 5.5323 3.87501C5.47049 3.78251 5.4375 3.67375 5.4375 3.5625C5.4375 3.41332 5.49677 3.27024 5.60226 3.16475C5.70774 3.05926 5.85082 3 6 3ZM7.5 9.04688H4.5V8.20313H5.57813V6.04688H4.875V5.20313H6.42188V8.20313H7.5V9.04688Z"
                    fill="#FF0000"
                  />
                </svg>
                {errors.firstName}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="lname" className="text-[#1A183E] text-sm font-medium ">
              Last Name
            </label>
            <input
              type="text"
              required
              placeholder="Enter the last name"
              className={`py-3 px-5 rounded-lg bg-white focus:outline-none w-full
                placeholder-gray-200::placeholder placeholder-opacity-75 border
                ${errors.lastName ? "border-red-500" : "border-[#ACACAC]"}`}
              id="lname"
              value={data.lastName}
              onChange={(e) => onUpdate("lastName", e.target.value)}
            />
            {data.lastName === "" && errors.lastName && (
              <div className="flex text-red-500 text-xs items-center">
                <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M6 0.75C4.96165 0.75 3.94662 1.05791 3.08326 1.63478C2.2199 2.21166 1.54699 3.0316 1.14963 3.99091C0.752275 4.95022 0.648307 6.00582 0.85088 7.02422C1.05345 8.04262 1.55347 8.97809 2.28769 9.71231C3.02192 10.4465 3.95738 10.9466 4.97578 11.1491C5.99418 11.3517 7.04978 11.2477 8.00909 10.8504C8.9684 10.453 9.78834 9.7801 10.3652 8.91674C10.9421 8.05339 11.25 7.03835 11.25 6C11.25 4.60761 10.6969 3.27226 9.71231 2.28769C8.72775 1.30312 7.39239 0.75 6 0.75ZM6 3C6.11125 3 6.22001 3.03299 6.31251 3.0948C6.40501 3.15661 6.47711 3.24446 6.51968 3.34724C6.56226 3.45002 6.5734 3.56312 6.55169 3.67224C6.52999 3.78135 6.47642 3.88158 6.39775 3.96025C6.31908 4.03891 6.21886 4.09249 6.10974 4.11419C6.00063 4.1359 5.88753 4.12476 5.78474 4.08218C5.68196 4.03961 5.59411 3.96751 5.5323 3.87501C5.47049 3.78251 5.4375 3.67375 5.4375 3.5625C5.4375 3.41332 5.49677 3.27024 5.60226 3.16475C5.70774 3.05926 5.85082 3 6 3ZM7.5 9.04688H4.5V8.20313H5.57813V6.04688H4.875V5.20313H6.42188V8.20313H7.5V9.04688Z"
                    fill="#FF0000"
                  />
                </svg>
                {errors.lastName}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[#1A183E] text-sm font-medium ">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="Enter the email"
              className={`py-3 px-5 rounded-lg bg-white focus:outline-none w-full
                placeholder-gray-200::placeholder placeholder-opacity-75 border
                ${errors.email ? "border-red-500" : "border-[#ACACAC]"}`}
              id="email"
              value={data.email}
              // onChange={(e) => onUpdate("email", e.target.value)}
              onChange={handleEmailChange}
            />
            {errors.email !== "" && errors.email && (
              <div className="flex text-red-500 text-xs items-center">
                <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M6 0.75C4.96165 0.75 3.94662 1.05791 3.08326 1.63478C2.2199 2.21166 1.54699 3.0316 1.14963 3.99091C0.752275 4.95022 0.648307 6.00582 0.85088 7.02422C1.05345 8.04262 1.55347 8.97809 2.28769 9.71231C3.02192 10.4465 3.95738 10.9466 4.97578 11.1491C5.99418 11.3517 7.04978 11.2477 8.00909 10.8504C8.9684 10.453 9.78834 9.7801 10.3652 8.91674C10.9421 8.05339 11.25 7.03835 11.25 6C11.25 4.60761 10.6969 3.27226 9.71231 2.28769C8.72775 1.30312 7.39239 0.75 6 0.75ZM6 3C6.11125 3 6.22001 3.03299 6.31251 3.0948C6.40501 3.15661 6.47711 3.24446 6.51968 3.34724C6.56226 3.45002 6.5734 3.56312 6.55169 3.67224C6.52999 3.78135 6.47642 3.88158 6.39775 3.96025C6.31908 4.03891 6.21886 4.09249 6.10974 4.11419C6.00063 4.1359 5.88753 4.12476 5.78474 4.08218C5.68196 4.03961 5.59411 3.96751 5.5323 3.87501C5.47049 3.78251 5.4375 3.67375 5.4375 3.5625C5.4375 3.41332 5.49677 3.27024 5.60226 3.16475C5.70774 3.05926 5.85082 3 6 3ZM7.5 9.04688H4.5V8.20313H5.57813V6.04688H4.875V5.20313H6.42188V8.20313H7.5V9.04688Z"
                    fill="#FF0000"
                  />
                </svg>
                {errors.email}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="number" className="text-[#1A183E] text-sm font-medium ">
              Mobile number
            </label>
            <PhoneInput
              country={"ng"}
              value={data.phone}
              inputProps={{ required: true }}
              containerClass={`border ${errors.phone ? "border-red-500" : "border-[#ACACAC]"}`}
              // defaultErrorMessage='The phone number is required'
              onChange={(phone: string) => onUpdate("phone", phone)}
              // onChange={(e: any) => onUpdate('phone', e.target.value)}
              inputStyle={{
                paddingLeft: "42px",
                paddingTop: "24px",
                paddingBottom: "24px",
                borderRadius: "8px",
                width: "100%",
                backgroundColor: "#FFFFFF",
                border: "1px solid #ACACAC",
                outline: "none",
                // Add other styles as needed
              }}
            />
            {errors.phone !== "" && errors.phone && (
              <div className="flex text-red-500 text-xs items-center">
                <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M6 0.75C4.96165 0.75 3.94662 1.05791 3.08326 1.63478C2.2199 2.21166 1.54699 3.0316 1.14963 3.99091C0.752275 4.95022 0.648307 6.00582 0.85088 7.02422C1.05345 8.04262 1.55347 8.97809 2.28769 9.71231C3.02192 10.4465 3.95738 10.9466 4.97578 11.1491C5.99418 11.3517 7.04978 11.2477 8.00909 10.8504C8.9684 10.453 9.78834 9.7801 10.3652 8.91674C10.9421 8.05339 11.25 7.03835 11.25 6C11.25 4.60761 10.6969 3.27226 9.71231 2.28769C8.72775 1.30312 7.39239 0.75 6 0.75ZM6 3C6.11125 3 6.22001 3.03299 6.31251 3.0948C6.40501 3.15661 6.47711 3.24446 6.51968 3.34724C6.56226 3.45002 6.5734 3.56312 6.55169 3.67224C6.52999 3.78135 6.47642 3.88158 6.39775 3.96025C6.31908 4.03891 6.21886 4.09249 6.10974 4.11419C6.00063 4.1359 5.88753 4.12476 5.78474 4.08218C5.68196 4.03961 5.59411 3.96751 5.5323 3.87501C5.47049 3.78251 5.4375 3.67375 5.4375 3.5625C5.4375 3.41332 5.49677 3.27024 5.60226 3.16475C5.70774 3.05926 5.85082 3 6 3ZM7.5 9.04688H4.5V8.20313H5.57813V6.04688H4.875V5.20313H6.42188V8.20313H7.5V9.04688Z"
                    fill="#FF0000"
                  />
                </svg>
                {errors.phone}
              </div>
            )}
          </div>

          <div className="flex pb-8 justify-end items-center gap-4">
            <button style={{ color: secondaryColor }} className="text-base font-medium" onClick={closeModalAction}>
              Cancel
            </button>
            {loading ? (
              <small className="text-primary  mx-auto">Sending invite to instructor...</small>
            ) : (
              <button
                style={{ backgroundColor: secondaryColor }}
                className="text-base font-medium text-white px-4 py-2 rounded-lg"
                // onClick={handleNextClick}
                disabled={loading}
              >
                Invite
              </button>
            )}
          </div>
        </form>
        {/* Add form or content for adding a new instructor */}
      </div>
    </Modal>
  );
};

export default InstructorModal;
