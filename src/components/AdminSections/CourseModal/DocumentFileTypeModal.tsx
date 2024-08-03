'use client'

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import uploadService from "@/services/api/upload";

// Define props types for DocumentFileTypeModal
interface DocumentFileTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  awaitSubmit: (data: any) => void;
  title: any;
  parentModalOpener: () => void
}

const customMessageStyle = {
  marginTop: "2px",
  marginLeft: "2px",
  fontSize: "14px",
};

const DocumentFileTypeModal: React.FC<DocumentFileTypeModalProps> = ({
  isOpen,
  onClose,
  awaitSubmit,
  parentModalOpener
}) => {

  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);
  
   const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    documentFile: "",
    duration: "",
  });

  const [data, setData] = useState({
    title: "",
    documentFile: null,
    duration: "",
  })

  const onUpdate = (field: string, value: string) => {
    // Create a new object based on the current data state
    const newData = { ...data };
    // Update the field with the new value
    // newData[field] = value;
    newData[field as keyof typeof data] = value;
    // Update the data state
    setData(newData);
  };

  const handleNextClick = async(e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      title: data.title ? "" : "The title is required",
      documentFile: data.documentFile ? "" : "Only PDF, DOC, DOCX, PPT, PPTX files are allowed.",
      duration: data.duration &&  !isNaN(data.duration)  ? "" : "Invalid duration",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
        const uploadedFile = await handleFileUpload()
        if(!uploadedFile){
          return
        }

        console.log("selectedData", data, uploadedFile)
        const selectedData = {
          title: data.title,
          documentFile: uploadedFile,
          duration: data.duration,
        };
        setData({
          title: "",
          documentFile: "",
          duration: 0,
        })
        awaitSubmit(selectedData);
        onClose()
    }
  };

  function handleFileChange (e: any){
    const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        console.log("Uploaded file:", file);
        const allowedExtensions = ["pdf", "doc", "docx", "ppt", "pptx"];
        const extension = file.name.split(".").pop().toLowerCase();
        if (allowedExtensions.includes(extension)) {
          onUpdate("documentFile", file);
          setErrors((prevErrors) => ({
            ...prevErrors,
            documentFile: "",
          }));
        } else {
           onUpdate("documentFile", "");
          setErrors((prevErrors) => ({
            ...prevErrors,
            documentFile: "Only PDF, DOC, DOCX, PPT, PPTX files are allowed.",
          }));
          e.target.value = null;
        }
    }
  }

  async function handleFileUpload(){
    // onChange(selectedImage);
    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      if (!data.documentFile) {
        return;
      }

      formData.append("file", data.documentFile);
      const uploadedFile = await uploadService.UploadFiletoS3(formData);
      console.log("Image uploaded to S3:", uploadedFile);
      // setData({...data, document: uploadedFile})
      return uploadedFile
       // localStorage.setItem("courseImage", imageUrl);

      // onChange(selectedImage);
    } catch (error: any) {
      console.log("error", error)
      if (error?.response?.status === 413) {
        toast.error("File is too Large. Cannot be uploaded!");
      }
    } finally {
      setIsUploadingImage(false);
    }
  };

  const closeModalAction = () => {
    if (!isUploadingImage) {
       setErrors({
        title: "",
        documentFile: "",
        duration: "",
      })
      setData({
        title: "",
        documentFile: "",
        duration: 0,
      })
      onClose()
      parentModalOpener()
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModalAction}
      contentLabel="Add New Lesson Content"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-8 w-full max-w-lg h-[72%]" // Tailwind CSS classes for styling
      overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center" // Tailwind CSS classes for overlay
    >
      {/* Your modal content goes here */}
      <div className="fixed right-[-7px] top-0 cursor-pointer">
        <svg onClick={closeModalAction} className="rounded-full bg-black" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
            <path d="M17.5781 7.42188L7.42188 17.5781M7.42188 7.42188L17.5781 17.5781" stroke="white" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div className="space-y-4 max-h-[420px] font-montserrat overflow-y-auto overflow-x-hidden">
        <h2 className="text-black text-center font-montserrat text-xl font-semibold">
            Add New Lesson Content
        </h2>
        <div className="rounded-md bg-[#E8EFFF] pt-[14px] pb-[15px] pl-[22px]">
            <p className="text-[#1A183E] font-medium text-[12px]">
                Lesson: Document
            </p>
        </div>

        <form className="flex flex-col gap-6">
            
          <div className="flex flex-col gap-2">
            <label
              htmlFor="title"
              className="text-[#1A183E] text-sm font-medium "
            >
              Title
            </label>
            <input
              type="text"
              required
              placeholder="Enter title"
              className={`py-3 px-5 rounded-lg bg-white focus:outline-none w-full
                placeholder-gray-200::placeholder placeholder-opacity-75 border
                ${errors.title ? "border-red-500" : "border-[#ACACAC]"}`}
              id="title"
              value={data.title}
              onChange={(e) => onUpdate("title", e.target.value)}
            />
            {data.title === "" && errors.title && (
              <div className="flex text-red-500 text-xs items-center">
                <svg
                  className="mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M6 0.75C4.96165 0.75 3.94662 1.05791 3.08326 1.63478C2.2199 2.21166 1.54699 3.0316 1.14963 3.99091C0.752275 4.95022 0.648307 6.00582 0.85088 7.02422C1.05345 8.04262 1.55347 8.97809 2.28769 9.71231C3.02192 10.4465 3.95738 10.9466 4.97578 11.1491C5.99418 11.3517 7.04978 11.2477 8.00909 10.8504C8.9684 10.453 9.78834 9.7801 10.3652 8.91674C10.9421 8.05339 11.25 7.03835 11.25 6C11.25 4.60761 10.6969 3.27226 9.71231 2.28769C8.72775 1.30312 7.39239 0.75 6 0.75ZM6 3C6.11125 3 6.22001 3.03299 6.31251 3.0948C6.40501 3.15661 6.47711 3.24446 6.51968 3.34724C6.56226 3.45002 6.5734 3.56312 6.55169 3.67224C6.52999 3.78135 6.47642 3.88158 6.39775 3.96025C6.31908 4.03891 6.21886 4.09249 6.10974 4.11419C6.00063 4.1359 5.88753 4.12476 5.78474 4.08218C5.68196 4.03961 5.59411 3.96751 5.5323 3.87501C5.47049 3.78251 5.4375 3.67375 5.4375 3.5625C5.4375 3.41332 5.49677 3.27024 5.60226 3.16475C5.70774 3.05926 5.85082 3 6 3ZM7.5 9.04688H4.5V8.20313H5.57813V6.04688H4.875V5.20313H6.42188V8.20313H7.5V9.04688Z"
                    fill="#FF0000"
                  />
                </svg>
                {errors.title}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="documentFile"
              className="text-[#1A183E] text-sm font-medium "
            >
              Upload the document (pdf, doc, docx, ppt, pptx)
            </label>
            <input
              type="file"
              required
              placeholder="Browse or drag the document file here."
              className={`py-3 px-5 rounded-lg bg-white focus:outline-none w-full
                placeholder-gray-200::placeholder placeholder-opacity-75 border
                ${errors.documentFile ? "border-red-500" : "border-[#ACACAC]"}`}
              id="documentFile"
               onChange={handleFileChange}
            />
            {errors.documentFile && (
              <div className="flex text-red-500 text-xs items-center">
                <svg
                  className="mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M6 0.75C4.96165 0.75 3.94662 1.05791 3.08326 1.63478C2.2199 2.21166 1.54699 3.0316 1.14963 3.99091C0.752275 4.95022 0.648307 6.00582 0.85088 7.02422C1.05345 8.04262 1.55347 8.97809 2.28769 9.71231C3.02192 10.4465 3.95738 10.9466 4.97578 11.1491C5.99418 11.3517 7.04978 11.2477 8.00909 10.8504C8.9684 10.453 9.78834 9.7801 10.3652 8.91674C10.9421 8.05339 11.25 7.03835 11.25 6C11.25 4.60761 10.6969 3.27226 9.71231 2.28769C8.72775 1.30312 7.39239 0.75 6 0.75ZM6 3C6.11125 3 6.22001 3.03299 6.31251 3.0948C6.40501 3.15661 6.47711 3.24446 6.51968 3.34724C6.56226 3.45002 6.5734 3.56312 6.55169 3.67224C6.52999 3.78135 6.47642 3.88158 6.39775 3.96025C6.31908 4.03891 6.21886 4.09249 6.10974 4.11419C6.00063 4.1359 5.88753 4.12476 5.78474 4.08218C5.68196 4.03961 5.59411 3.96751 5.5323 3.87501C5.47049 3.78251 5.4375 3.67375 5.4375 3.5625C5.4375 3.41332 5.49677 3.27024 5.60226 3.16475C5.70774 3.05926 5.85082 3 6 3ZM7.5 9.04688H4.5V8.20313H5.57813V6.04688H4.875V5.20313H6.42188V8.20313H7.5V9.04688Z"
                    fill="#FF0000"
                  />
                </svg>
                {errors.documentFile}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1">
              <label
              htmlFor="duration"
              className="text-[#1A183E] text-sm font-medium "
              >
              Duration  (in minutes)
              </label>
              <input
              type="number"
              required
              placeholder="eg 30"
              className={`py-3 px-5 rounded-lg bg-white focus:outline-none w-full
                  placeholder-gray-200::placeholder placeholder-opacity-75 border
                  ${errors.duration ? "border-red-500" : "border-[#ACACAC]"}`}
              id="duration"
              value={data.duration}
              onChange={(e) => onUpdate("duration", e.target.value)}
              />
              {errors.duration !== '' && errors.duration && (
              <div className="flex text-red-500 text-xs items-center">
                  <svg
                  className="mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  >
                  <path
                      d="M6 0.75C4.96165 0.75 3.94662 1.05791 3.08326 1.63478C2.2199 2.21166 1.54699 3.0316 1.14963 3.99091C0.752275 4.95022 0.648307 6.00582 0.85088 7.02422C1.05345 8.04262 1.55347 8.97809 2.28769 9.71231C3.02192 10.4465 3.95738 10.9466 4.97578 11.1491C5.99418 11.3517 7.04978 11.2477 8.00909 10.8504C8.9684 10.453 9.78834 9.7801 10.3652 8.91674C10.9421 8.05339 11.25 7.03835 11.25 6C11.25 4.60761 10.6969 3.27226 9.71231 2.28769C8.72775 1.30312 7.39239 0.75 6 0.75ZM6 3C6.11125 3 6.22001 3.03299 6.31251 3.0948C6.40501 3.15661 6.47711 3.24446 6.51968 3.34724C6.56226 3.45002 6.5734 3.56312 6.55169 3.67224C6.52999 3.78135 6.47642 3.88158 6.39775 3.96025C6.31908 4.03891 6.21886 4.09249 6.10974 4.11419C6.00063 4.1359 5.88753 4.12476 5.78474 4.08218C5.68196 4.03961 5.59411 3.96751 5.5323 3.87501C5.47049 3.78251 5.4375 3.67375 5.4375 3.5625C5.4375 3.41332 5.49677 3.27024 5.60226 3.16475C5.70774 3.05926 5.85082 3 6 3ZM7.5 9.04688H4.5V8.20313H5.57813V6.04688H4.875V5.20313H6.42188V8.20313H7.5V9.04688Z"
                      fill="#FF0000"
                  />
                  </svg>
                  {errors.duration}
              </div>
              )}
          </div>

         
        </form>
      </div>
       <div className="flex pb-8 justify-end items-center gap-4 mt-[8px]">
              {/*<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M9.16797 7.50008H10.8346V5.83341H9.16797M10.0013 16.6667C6.3263 16.6667 3.33464 13.6751 3.33464 10.0001C3.33464 6.32508 6.3263 3.33341 10.0013 3.33341C13.6763 3.33341 16.668 6.32508 16.668 10.0001C16.668 13.6751 13.6763 16.6667 10.0013 16.6667ZM10.0013 1.66675C8.90695 1.66675 7.82332 1.8823 6.81227 2.30109C5.80123 2.71987 4.88257 3.3337 4.10875 4.10752C2.54594 5.67033 1.66797 7.78994 1.66797 10.0001C1.66797 12.2102 2.54594 14.3298 4.10875 15.8926C4.88257 16.6665 5.80123 17.2803 6.81227 17.6991C7.82332 18.1179 8.90695 18.3334 10.0013 18.3334C12.2114 18.3334 14.3311 17.4554 15.8939 15.8926C17.4567 14.3298 18.3346 12.2102 18.3346 10.0001C18.3346 8.90573 18.1191 7.8221 17.7003 6.81105C17.2815 5.80001 16.6677 4.88135 15.8939 4.10752C15.12 3.3337 14.2014 2.71987 13.1903 2.30109C12.1793 1.8823 11.0957 1.66675 10.0013 1.66675ZM9.16797 14.1667H10.8346V9.16675H9.16797V14.1667Z" fill="#1A183E"/>
              </svg>*/}

              <button
                  disabled={isUploadingImage}
                  className="bg-[#1A183E] text-base font-medium text-white px-4 py-2 rounded-lg"
                  onClick={handleNextClick}
              >
                  {isUploadingImage ? "Checking file..." : "Add lesson"}
              </button>
          </div>
    </Modal>
  );
};

export default DocumentFileTypeModal;
