"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Preview from "./PreviewButton/Preview";
import Save from "../../../../utilComponents/Buttons/SaveButton/Save";
import Publish from "../../../../utilComponents/Buttons/PublishButton/Published";
import Edit from "../../../../utilComponents/Buttons/EditButton/Edit";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import pick from "lodash/pick";
import { errorPropsGetter } from "../../../../utilComponents/formValidation";
import { objectToFormData } from "../../../../utilComponents/objectToFormData";
import { toast } from "react-toastify";
import CourseOptionModal from "../CourseModal/CourseOptionModal";
import VideoLinkTypeModal from "../CourseModal/VideoLinkTypeModal";
import VideoFileTypeModal from "../CourseModal/VideoFileTypeModal";
import DocumentFileTypeModal from "../CourseModal/DocumentFileTypeModal";

const errorMessages = {
  required(field = "Field") {
    return field + " is required in order to publish or save";
  },
};

let buildSchema = (data) => {
  return Yup.object().shape({
    modules: Yup.array()
      .of(
        Yup.object().shape({
          moduleTitle: Yup.string().required(
            errorMessages.required("The module title")
          ),
        })
      )
      .min(1, "At least one module is required"), // At least one module
  });
};

const customMessageStyle = {
  marginTop: "2px",
  marginLeft: "2px",
  fontSize: "14px",
};

const ModulesForm = ({ onNext, awaitSubmit, isPublishing }) => {
  const form = useForm({
    resolver: yupResolver(buildSchema()),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = form;

  const { modules } = getValues();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const getErrorProps = errorPropsGetter(errors);

  const [isEditMode, setIsEditMode] = useState(true);
  const [previewedContent, setPreviewedContent] = useState(false);
  const [moduleNumber, setModuleNumber] = useState(1);
  const [modulesList, setModulesList] = useState([{}]);
  const [sendModules, setSendModules] = useState("");
  const [sendModuleIndex, setSendModuleIndex] = useState(0);
  //   const [titleError, setTitleError] = useState("");
  const [titleErrors, setTitleErrors] = useState(Array(moduleNumber).fill(""));
  const [lessonType, setLessonTypes] = useState("");

  const [isModalOpen, setModalOpen] = useState(false);
  const [isVideoLinkModalOpen, setVideoLinkModalOpen] = useState(false);
  const [isVideoFileModalOpen, setVideoFileModalOpen] = useState(false);
  const [isDocumentFileModalOpen, setDocumentFileModalOpen] = useState(false);
  const [handlePersistClicked, setHandlePersistClicked] = useState(false);

  const [editedTitleMode, setEditedTitleMode] = useState(
    Array(moduleNumber).fill(false)
  );
  const [moduleDetailsVisible, setModuleDetailsVisible] = useState(
    Array(moduleNumber).fill(false)
  );

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const openVideoLinkModal = () => setVideoLinkModalOpen(true);
  const closeVideoLinkModal = () => setVideoLinkModalOpen(false);

  const openVideoFileModal = () => setVideoFileModalOpen(true);
  const closeVideoFileModal = () => setVideoFileModalOpen(false);

  const openDocumentFileModal = () => setDocumentFileModalOpen(true);
  const closeDocumentFileModal = () => setDocumentFileModalOpen(false);

  const handleAddTitle = (e, idx) => {
    e.preventDefault();
    const { modules } = getValues();
    console.log("moduleNumber", moduleNumber, modules);
    console.log(modules[moduleNumber - 1].moduleTitle);
    // const moduleTitle = modules[moduleNumber - 1].moduleTitle
    const moduleTitle = modules[idx].moduleTitle;
    // setIsEditMode(true);
    console.log("idx", idx);
    console.log("moduleTitle", modules[idx].moduleTitle);

    if (moduleTitle) {
      // setTitleError("");
      // setTitleErrors((prevErrors) => {
      //     const newErrors = [...prevErrors];
      //     newErrors[moduleNumber-1] = "";
      //     return newErrors;
      // });
      console.log("theeres title", moduleTitle);
      // setModulesList((prevModulesList) => {
      //     const newModulesList = [...prevModulesList];
      //     if (!newModulesList[moduleNumber - 1]) {
      //         newModulesList[moduleNumber - 1] = {}; // Add an empty object if it doesn't exist
      //     }
      //     newModulesList[moduleNumber - 1].moduleTitle = moduleTitle;
      //     return newModulesList;
      // });
      const mlist = modulesList.map((item, i) => {
        if (idx == i) {
          item.moduleTitle = moduleTitle;
        }
        return item;
      });
      setModulesList(mlist);
      const tErrors = titleErrors.map((item, i) => {
        if (idx == i) {
          item = "";
        }
        return item;
      });
      setTitleErrors(tErrors);
      return;
    } else {
      // setTitleError("The module title is required to proceed");
      console.log("theeres no title");
      const tErrors = titleErrors.map((item, i) => {
        if (idx == i) {
          // item = ""
          console.log("holla", idx, i);
          item = "The module title is required to proceed";
        }
        // else{
        //     console.log("holla", idx, i)
        //     item = "The module title is required to proceed"
        // }
        return item;
      });
      setTitleErrors(tErrors);
      // setTitleErrors((prevErrors) => {
      //     const newErrors = [...prevErrors];
      //     newErrors[moduleNumber-1] = "The module title is required to proceed";
      //     return newErrors;
      // });
      return;
    }

    console.log(modulesList);
  };

  const handleRemoveModule = (e, indexToRemove) => {
    e.preventDefault();
    // console.log("errors", error)

    if (modulesList) {
      if (modulesList.length > 1) {
        // Remove the module from modulesList
        modulesList.splice(indexToRemove, 1);
        // Remove the module from modules array
        modules.splice(indexToRemove, 1);

        // Decrease moduleNumber as long as it is more than 1
        setModuleNumber((prevNum) => (prevNum > 1 ? prevNum - 1 : prevNum));

        // Update the state to trigger a re-render
        setModulesList([...modulesList]);
        reset({ modules: [...modules] });
        // console.log("indexToRemove", indexToRemove)
        // if(!(modulesList.length > 1)){
        //     console.log("is less")
        //   const tErrors = titleErrors.map((item, idx) => {
        //     if(idx == indexToRemove){
        //         item = ""
        //     }
        //     return item
        //     });
        //     setTitleErrors(tErrors);
        // }else{
        //       console.log("is greate")
        //      const tErrors = titleErrors.filter((item, idx) => idx != indexToRemove);
        //     setTitleErrors(tErrors);
        // }
        const tErrors = titleErrors.filter((item, idx) => idx != indexToRemove);
        setTitleErrors(tErrors);
      }
    } else {
      // If there's only one module left, reset the form and modulesList
      setModuleNumber(1);
      setModulesList([{}]);
      const tErrors = titleErrors.map((item, idx) => {
        if (idx == indexToRemove) {
          item = "";
        }
        return item;
      });
      setTitleErrors(tErrors);
    }

    console.log(modulesList);
  };

  const handleRemoveLesson = (e, moduleIndex, lessonIndex) => {
    e.preventDefault();

    // Create a copy of modulesList to avoid mutating state directly
    const updatedModulesList = [...modulesList];

    // Remove the lesson from the specified module
    updatedModulesList[moduleIndex].lessons.splice(lessonIndex, 1);

    // Check if there are no lessons left in the module
    if (updatedModulesList[moduleIndex].lessons.length === 0) {
      // If no lessons left, remove the 'lessons' key from the module
      delete updatedModulesList[moduleIndex].lessons;
    }

    // Update the state with the modified modulesList
    setModulesList(updatedModulesList);
    console.log(modulesList);
  };

  const editLesson = (e, moduleIndex, lessonIndex) => {
    e.preventDefault();
    const { contentType } = modulesList[moduleIndex].lessons[lessonIndex];
    if (contentType === "LINK") {
      openVideoLinkModal();
      closeModal();
    } else if (contentType === "VIDEO") {
      openVideoFileModal();
      closeModal();
    } else {
      openDocumentFileModal();
      closeModal();
    }

    // // Create a copy of modulesList to avoid mutating state directly
    // const updatedModulesList = [...modulesList];

    // // Remove the lesson from the specified module
    // updatedModulesList[moduleIndex].lessons.splice(lessonIndex, 1);

    // // Check if there are no lessons left in the module
    // if (updatedModulesList[moduleIndex].lessons.length === 0) {
    //     // If no lessons left, remove the 'lessons' key from the module
    //     delete updatedModulesList[moduleIndex].lessons;
    // }

    // // Update the state with the modified modulesList
    // setModulesList(updatedModulesList);

    // console.log(lesson)
  };

  const handleAddModule = (e) => {
    e.preventDefault();
    // Increment the module title
    setModuleNumber((prevNum) => prevNum + 1);
    setModulesList((prevModuleList) => [...prevModuleList, {}]);
    setTitleErrors((prevErrors) => {
      const newErrors = [...prevErrors];
      newErrors.push("");
      return newErrors;
    });
  };

  const updateModule = (moduleTitle, data) => {
    setModulesList((prevModules) =>
      prevModules.map((module) =>
        module.moduleTitle === moduleTitle ? { ...module, ...data } : module
      )
    );
  };

  const onSubmit = (action) => (data) => {
    setIsEditMode(false);
    setPreviewedContent(data);
    console.log("action", action, modulesList, isSubmitted);

    if (modulesList && !isSubmitted) {
      localStorage.setItem("modules", JSON.stringify(modulesList));
      if (action === "publish") {
        awaitSubmit();
        // setIsSubmitted(true);
      } else if (action === "save") {
        toast.info("Persisted to draft successfully!");
      }
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    // form.setValue("croppedImage", undefined);
    setIsEditMode(true);
  };

  const handleModalOpen = (e, title, index) => {
    e.preventDefault();
    setSendModules(title);
    setSendModuleIndex(index);
    openModal();
  };

  const handleModalSubmitNext = (data) => {
    console.log(data);

    // Find the index of the module to update
    const moduleIndex = modulesList.findIndex(
      (module) => module.moduleTitle === sendModules
    );

    if (moduleIndex !== -1) {
      // If the module exists, update its properties
      modulesList[moduleIndex].moduleSequencePosition = moduleIndex + 1;
    }
    setLessonTypes(data.lessonType);

    if (data.lessonType === "LINK") {
      openVideoLinkModal();
      closeModal();
    } else if (data.lessonType === "VIDEO") {
      openVideoFileModal();
      closeModal();
    } else {
      openDocumentFileModal();
      closeModal();
    }
    return;
  };

  const handleModalContentDetailsSubmit = (data) => {
    if (sendModuleIndex !== -1) {
      if (!modulesList[sendModuleIndex].hasOwnProperty("lessons")) {
        modulesList[sendModuleIndex].lessons = [];
      }

      const newLesson = {
        contentTitle: data.title,
        contentDescription: data.summary,
        contentDuration: data.duration,
        contentType: lessonType,
      };

      // Set the contentUrl based on the lessonType
      if (lessonType === "LINK") {
        newLesson.contentUrl = data.videoLink;
      } else if (lessonType === "VIDEO") {
        newLesson.contentUrl = data.videoFile;
      } else if (lessonType === "DOCUMENT") {
        newLesson.contentUrl = data.documentFile;
      }

      // Update the lessons array for the corresponding module
      modulesList[sendModuleIndex].lessons.push(newLesson);
      toast.success(
        <>
          <div>
            Lesson Added
            <div style={customMessageStyle}>
              The lesson has successfully been added
            </div>
          </div>
        </>
      );

      console.log({ modulesList });
    }
    return;
  };

  const handleUpdate = (index) => {
    const updatedEditState = [...editedTitleMode];
    updatedEditState[index] = false;
    setEditedTitleMode(updatedEditState);

    // Update the module title in the state
    const updatedModuleTitles = [...moduleTitles];
    updatedModuleTitles[index] = modules[index].moduleTitle;
    setModuleTitles(updatedModuleTitles);
  };

  const handleEditModule = (e, index) => {
    // const mod = modulesList
    // console.log(index)
    setModulesList((prevArray) => {
      const newArray = prevArray.map((item, idx) => {
        if (index === idx) {
          return {
            ...item,
            moduleTitle: "",
          };
          //  const { moduleTitle, ...rest } = item;
          // return rest;
        }
        return item;
      });
      return newArray;
      // const newArray = prevArray.filter((item, idx) => idx !== index);
      // return newArray;
    });
    // reset({ modules: [...modules] });
  };

  function handlePersist() {
    setHandlePersistClicked(true, () => {
      handleSubmit(onSubmit)();
    });
  }

  useEffect(() => {
    const ml = JSON.parse(localStorage.getItem("modules"));

    if (ml) {
      if (ml.length) {
        setModulesList(ml);
        setValue("modules", ml);
        setModuleNumber(ml.length);
      }
    }
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("eeeeeeeeeeeeeee", e.nativeEvent.submitter);
          const action = e.nativeEvent.submitter.getAttribute("data-action");
          handleSubmit(onSubmit(action), (err) => {
            console.log(err, form.getValues(), "error");
          })();
        }}
      >
        <div>
          <div className="my-10">
            <div
              className="grid grid-cols-1 gap-x-6 mx-auto"
              style={{ width: "678px", height: "46px", flexShrink: 0 }}
            >
              {Array.from({ length: moduleNumber }).map((_, index) => (
                <div key={index}>
                  <div
                    className={`rounded-md border p-1 flex items-center justify-between mb-3 ${
                      titleErrors[index] ? "border-[#F00]" : "border-gray-300"
                    }`}
                  >
                    <div
                      onClick={() => {
                        // Toggle the visibility of additional information for this module
                        setModuleDetailsVisible((prev) => {
                          const updated = [...prev];
                          updated[index] = !updated[index];
                          return updated;
                        });
                      }}
                    >
                      {moduleDetailsVisible[index] ? (
                        <svg
                          className="ml-2"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="17"
                          viewBox="0 0 16 17"
                          fill="none"
                        >
                          <path
                            d="M1.63654 6.01809C1.82406 5.83319 2.07837 5.72932 2.34354 5.72932C2.6087 5.72932 2.86301 5.83319 3.05054 6.01809L8.00054 10.9003L12.9505 6.01809C13.1391 5.83843 13.3917 5.73902 13.6539 5.74126C13.9161 5.74351 14.1669 5.84724 14.3524 6.03011C14.5378 6.21298 14.6429 6.46035 14.6452 6.71896C14.6475 6.97756 14.5467 7.2267 14.3645 7.41272L8.70754 12.9922C8.52001 13.1771 8.2657 13.281 8.00054 13.281C7.73537 13.281 7.48106 13.1771 7.29354 12.9922L1.63654 7.41272C1.44907 7.22776 1.34375 6.97694 1.34375 6.71541C1.34375 6.45388 1.44907 6.20305 1.63654 6.01809Z"
                            fill="#1A183E"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="ml-2"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M5.29246 14.364C5.10499 14.1764 4.99968 13.9221 4.99968 13.657C4.99968 13.3918 5.10499 13.1375 5.29246 12.95L10.2425 7.99995L5.29246 3.04995C5.1103 2.86135 5.00951 2.60875 5.01179 2.34655C5.01407 2.08435 5.11924 1.83354 5.30464 1.64813C5.49005 1.46272 5.74087 1.35756 6.00306 1.35528C6.26526 1.353 6.51786 1.45379 6.70646 1.63595L12.3635 7.29295C12.5509 7.48048 12.6562 7.73479 12.6562 7.99995C12.6562 8.26512 12.5509 8.51942 12.3635 8.70695L6.70646 14.364C6.51893 14.5514 6.26463 14.6567 5.99946 14.6567C5.7343 14.6567 5.47999 14.5514 5.29246 14.364Z"
                            fill="#1A183E"
                          />
                        </svg>
                      )}
                    </div>

                    <span
                      style={{
                        color: "#7A7A7A",
                        textAlign: "center",
                        fontFamily: "Montserrat",
                        fontSize: "15px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "normal",
                      }}
                    >
                      Module {index + 1}
                    </span>

                    {modulesList &&
                    modulesList[index] &&
                    modulesList[index].moduleTitle ? (
                      <p
                        style={{
                          color: "#7A7A7A",
                          textAlign: "center",
                          fontFamily: "Montserrat",
                          fontSize: "15px",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "normal",
                        }}
                      >
                        - {modules[index].moduleTitle}
                      </p>
                    ) : (
                      <>
                        <label
                          htmlFor=""
                          style={{
                            color: "#1A183E",
                            fontFamily: "Montserrat",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "normal",
                          }}
                        >
                          Title
                        </label>

                        <input
                          type="text"
                          // name="moduleTitle"
                          name={`modules[${index}].moduleTitle`}
                          className={`border rounded w-56 h-8 flex-shrink-0 p-2 ${
                            titleErrors[index]
                              ? "border-[#F00]"
                              : "border-gray-300"
                          }`}
                          placeholder="Add a title"
                          {...register(`modules[${index}].moduleTitle`)}
                          {...getErrorProps(`modules[${index}].moduleTitle`)}
                        />
                        <button
                          onClick={(e) => handleAddTitle(e, index)}
                          className="rounded-md bg-[#1A183E] inline-flex p-2 items-start gap-2 text-white"
                        >
                          Update
                        </button>
                      </>
                    )}

                    <div className="flex gap-1 mr-2">
                      {modulesList &&
                        modulesList[index] &&
                        modulesList[index].moduleTitle && (
                          <div
                            onClick={(e) =>
                              handleModalOpen(
                                e,
                                modules[index].moduleTitle,
                                index
                              )
                            }
                            className="cursor-pointer border rounded-full border-black border-2 items-center"
                          >
                            <svg
                              style={{ padding: "1px" }}
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 14 14"
                              fill="none"
                            >
                              <path
                                d="M11.0846 7.5822H7.58464V11.0822H6.41797V7.5822H2.91797V6.41553H6.41797V2.91553H7.58464V6.41553H11.0846V7.5822Z"
                                fill="black"
                              />
                            </svg>
                          </div>
                        )}
                      <div className="cursor-pointer border rounded-full border-black border-2 items-center">
                        <svg
                          onClick={(e) => handleRemoveModule(e, index)}
                          style={{ padding: "2px" }}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <path
                            d="M3.0625 3.0625L3.60938 11.8125C3.63535 12.3181 4.00312 12.6875 4.48438 12.6875H9.51562C9.99879 12.6875 10.3597 12.3181 10.3906 11.8125L10.9375 3.0625"
                            stroke="#1A183E"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2.1875 3.0625H11.8125H2.1875Z"
                            fill="#1A183E"
                          />
                          <path
                            d="M2.1875 3.0625H11.8125"
                            stroke="#1A183E"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                          />
                          <path
                            d="M5.25 3.0625V1.96875C5.24975 1.8825 5.26655 1.79705 5.29944 1.71732C5.33233 1.63758 5.38066 1.56514 5.44165 1.50415C5.50264 1.44316 5.57508 1.39483 5.65482 1.36194C5.73455 1.32905 5.82 1.31225 5.90625 1.3125H8.09375C8.18 1.31225 8.26545 1.32905 8.34518 1.36194C8.42492 1.39483 8.49736 1.44316 8.55835 1.50415C8.61934 1.56514 8.66767 1.63758 8.70056 1.71732C8.73345 1.79705 8.75025 1.8825 8.75 1.96875V3.0625M7 4.8125V10.9375M5.03125 4.8125L5.25 10.9375M8.96875 4.8125L8.75 10.9375"
                            stroke="#1A183E"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      {modulesList &&
                        modulesList[index] &&
                        modulesList[index].moduleTitle && (
                          <div
                            onClick={(e) => handleEditModule(e, index)}
                            className="cursor-pointer border rounded-full border-black border-2 items-center"
                          >
                            <svg
                              style={{ padding: "2px" }}
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 14 14"
                              fill="none"
                            >
                              <path
                                d="M11.2583 5.20609L8.77917 2.75609L9.59583 1.93942C9.81944 1.71581 10.0942 1.604 10.4201 1.604C10.746 1.604 11.0205 1.71581 11.2437 1.93942L12.0604 2.75609C12.284 2.9797 12.4007 3.24959 12.4104 3.56575C12.4201 3.88192 12.3132 4.15161 12.0896 4.37484L11.2583 5.20609ZM10.4125 6.0665L4.22917 12.2498H1.75V9.77067L7.93333 3.58734L10.4125 6.0665Z"
                                fill="black"
                              />
                            </svg>
                          </div>
                        )}
                    </div>
                  </div>

                  {moduleDetailsVisible[index] &&
                    modulesList[index]?.moduleTitle && (
                      <div
                        className="border border-[#BEBEBE] p-3"
                        style={{ marginTop: "-11px" }}
                      >
                        {modules[index] &&
                        modulesList[index]?.lessons &&
                        modulesList[index]?.lessons?.length > 0 ? (
                          <div>
                            {modulesList[index]?.lessons?.map(
                              (lesson, lessonIndex) => (
                                <div
                                  className="flex items-center justify-between"
                                  key={lessonIndex}
                                >
                                  <div className="flex items-center">
                                    <div className="flex items-center">
                                      <svg
                                        className=""
                                        style={{ marginRight: "-16px" }}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <path
                                          d="M12 4C11.7348 4 11.4804 4.10536 11.2929 4.29289C11.1054 4.48043 11 4.73478 11 5C11 5.26522 11.1054 5.51957 11.2929 5.70711C11.4804 5.89464 11.7348 6 12 6C12.2652 6 12.5196 5.89464 12.7071 5.70711C12.8946 5.51957 13 5.26522 13 5C13 4.73478 12.8946 4.48043 12.7071 4.29289C12.5196 4.10536 12.2652 4 12 4ZM12 11C11.7348 11 11.4804 11.1054 11.2929 11.2929C11.1054 11.4804 11 11.7348 11 12C11 12.2652 11.1054 12.5196 11.2929 12.7071C11.4804 12.8946 11.7348 13 12 13C12.2652 13 12.5196 12.8946 12.7071 12.7071C12.8946 12.5196 13 12.2652 13 12C13 11.7348 12.8946 11.4804 12.7071 11.2929C12.5196 11.1054 12.2652 11 12 11ZM12 18C11.7348 18 11.4804 18.1054 11.2929 18.2929C11.1054 18.4804 11 18.7348 11 19C11 19.2652 11.1054 19.5196 11.2929 19.7071C11.4804 19.8946 11.7348 20 12 20C12.2652 20 12.5196 19.8946 12.7071 19.7071C12.8946 19.5196 13 19.2652 13 19C13 18.7348 12.8946 18.4804 12.7071 18.2929C12.5196 18.1054 12.2652 18 12 18Z"
                                          fill="#7A7A7A"
                                          stroke="#7A7A7A"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <path
                                          d="M12 4C11.7348 4 11.4804 4.10536 11.2929 4.29289C11.1054 4.48043 11 4.73478 11 5C11 5.26522 11.1054 5.51957 11.2929 5.70711C11.4804 5.89464 11.7348 6 12 6C12.2652 6 12.5196 5.89464 12.7071 5.70711C12.8946 5.51957 13 5.26522 13 5C13 4.73478 12.8946 4.48043 12.7071 4.29289C12.5196 4.10536 12.2652 4 12 4ZM12 11C11.7348 11 11.4804 11.1054 11.2929 11.2929C11.1054 11.4804 11 11.7348 11 12C11 12.2652 11.1054 12.5196 11.2929 12.7071C11.4804 12.8946 11.7348 13 12 13C12.2652 13 12.5196 12.8946 12.7071 12.7071C12.8946 12.5196 13 12.2652 13 12C13 11.7348 12.8946 11.4804 12.7071 11.2929C12.5196 11.1054 12.2652 11 12 11ZM12 18C11.7348 18 11.4804 18.1054 11.2929 18.2929C11.1054 18.4804 11 18.7348 11 19C11 19.2652 11.1054 19.5196 11.2929 19.7071C11.4804 19.8946 11.7348 20 12 20C12.2652 20 12.5196 19.8946 12.7071 19.7071C12.8946 19.5196 13 19.2652 13 19C13 18.7348 12.8946 18.4804 12.7071 18.2929C12.5196 18.1054 12.2652 18 12 18Z"
                                          fill="#7A7A7A"
                                          stroke="#7A7A7A"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </div>

                                    <div className="flex items-center justify-between">
                                      <div className="cursor-pointer border rounded-full border-black border-2 items-center mr-2">
                                        {(lesson.contentType == "VIDEO" ||
                                          lesson.contentType == "LINK") && (
                                          <svg
                                            style={{ padding: "2px" }}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 12 12"
                                            fill="none"
                                          >
                                            <path
                                              d="M10.9917 5.20635L4.23797 1.07525C4.09633 0.988908 3.93433 0.941689 3.76848 0.938415C3.60263 0.935141 3.43889 0.97593 3.29395 1.05662C3.14902 1.1373 3.02809 1.255 2.94351 1.3977C2.85893 1.54039 2.81372 1.70297 2.8125 1.86885V10.131C2.81372 10.2969 2.85893 10.4595 2.94351 10.6022C3.02809 10.7449 3.14902 10.8626 3.29395 10.9433C3.43889 11.024 3.60263 11.0647 3.76848 11.0615C3.93433 11.0582 4.09633 11.011 4.23797 10.9246L10.9917 6.79353C11.1279 6.71064 11.2405 6.59409 11.3186 6.4551C11.3967 6.31612 11.4377 6.15937 11.4377 5.99994C11.4377 5.84051 11.3967 5.68376 11.3186 5.54478C11.2405 5.40579 11.1279 5.28924 10.9917 5.20635ZM3.9375 9.78978V2.2101L10.1325 5.99994L3.9375 9.78978Z"
                                              fill="black"
                                            />
                                          </svg>
                                        )}

                                        {lesson.contentType == "DOCUMENT" && (
                                          <svg
                                            style={{ padding: "2px" }}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 12 12"
                                            fill="none"
                                          >
                                            <path
                                              d="M6 3.75C6.375 2.26969 7.79133 1.51383 10.875 1.5C10.9243 1.49982 10.9731 1.50939 11.0187 1.52817C11.0643 1.54695 11.1057 1.57456 11.1406 1.60942C11.1754 1.64428 11.2031 1.6857 11.2218 1.73128C11.2406 1.77686 11.2502 1.8257 11.25 1.875V8.625C11.25 8.72446 11.2105 8.81984 11.1402 8.89017C11.0698 8.96049 10.9745 9 10.875 9C7.875 9 6.71602 9.60492 6 10.5M6 3.75C5.625 2.26969 4.20867 1.51383 1.125 1.5C1.0757 1.49982 1.02686 1.50939 0.981277 1.52817C0.935696 1.54695 0.894282 1.57456 0.859423 1.60942C0.824564 1.64428 0.796949 1.6857 0.778169 1.73128C0.759389 1.77686 0.749817 1.8257 0.750003 1.875V8.57977C0.750003 8.81133 0.89344 9 1.125 9C4.125 9 5.28821 9.60938 6 10.5M6 3.75V10.5"
                                              stroke="black"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                        )}
                                      </div>

                                      <div className="flex flex-col">
                                        <div className="">
                                          <p className="text-black font-Montserrat text-base font-medium">
                                            {lesson?.contentTitle}
                                          </p>
                                        </div>

                                        <div className="">
                                          <span className="text-gray-500 font-Montserrat text-xs font-medium">
                                            {lesson.contentType == "VIDEO" ||
                                            lesson.contentType == "LINK"
                                              ? "Video"
                                              : "Reading"}{" "}
                                            . {`${lesson.contentDuration} min`}
                                          </span>
                                        </div>

                                        <div className="">
                                          <a
                                            href={lesson.contentUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-500 font-Montserrat text-xs font-medium"
                                          >
                                            {lesson.contentUrl}
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex gap-2">
                                    {/*<div className="cursor-pointer border rounded-full border-black border-2 items-center">
                                                                <svg style={{padding: "2px"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 14 10" fill="none">
                                                                    <path d="M6.9987 3.25C7.46283 3.25 7.90795 3.43437 8.23614 3.76256C8.56432 4.09075 8.7487 4.53587 8.7487 5C8.7487 5.46413 8.56432 5.90925 8.23614 6.23744C7.90795 6.56563 7.46283 6.75 6.9987 6.75C6.53457 6.75 6.08945 6.56563 5.76126 6.23744C5.43307 5.90925 5.2487 5.46413 5.2487 5C5.2487 4.53587 5.43307 4.09075 5.76126 3.76256C6.08945 3.43437 6.53457 3.25 6.9987 3.25ZM6.9987 0.625C9.91537 0.625 12.4062 2.43917 13.4154 5C12.4062 7.56083 9.91537 9.375 6.9987 9.375C4.08203 9.375 1.5912 7.56083 0.582031 5C1.5912 2.43917 4.08203 0.625 6.9987 0.625ZM1.8537 5C2.32518 5.96268 3.05729 6.77377 3.96681 7.34106C4.87633 7.90836 5.92676 8.2091 6.9987 8.2091C8.07063 8.2091 9.12107 7.90836 10.0306 7.34106C10.9401 6.77377 11.6722 5.96268 12.1437 5C11.6722 4.03732 10.9401 3.22623 10.0306 2.65893C9.12107 2.09164 8.07063 1.7909 6.9987 1.7909C5.92676 1.7909 4.87633 2.09164 3.96681 2.65893C3.05729 3.22623 2.32518 4.03732 1.8537 5Z" fill="black"/>
                                                                </svg>
                                                            </div>*/}

                                    <div className="cursor-pointer border rounded-full border-black border-2 items-center">
                                      <svg
                                        onClick={(e) =>
                                          handleRemoveLesson(
                                            e,
                                            index,
                                            lessonIndex
                                          )
                                        }
                                        style={{ padding: "2px" }}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                      >
                                        <path
                                          d="M3.0625 3.0625L3.60938 11.8125C3.63535 12.3181 4.00312 12.6875 4.48438 12.6875H9.51562C9.99879 12.6875 10.3597 12.3181 10.3906 11.8125L10.9375 3.0625"
                                          stroke="#1A183E"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M2.1875 3.0625H11.8125H2.1875Z"
                                          fill="#1A183E"
                                        />
                                        <path
                                          d="M2.1875 3.0625H11.8125"
                                          stroke="#1A183E"
                                          strokeMiterlimit="10"
                                          strokeLinecap="round"
                                        />
                                        <path
                                          d="M5.25 3.0625V1.96875C5.24975 1.8825 5.26655 1.79705 5.29944 1.71732C5.33233 1.63758 5.38066 1.56514 5.44165 1.50415C5.50264 1.44316 5.57508 1.39483 5.65482 1.36194C5.73455 1.32905 5.82 1.31225 5.90625 1.3125H8.09375C8.18 1.31225 8.26545 1.32905 8.34518 1.36194C8.42492 1.39483 8.49736 1.44316 8.55835 1.50415C8.61934 1.56514 8.66767 1.63758 8.70056 1.71732C8.73345 1.79705 8.75025 1.8825 8.75 1.96875V3.0625M7 4.8125V10.9375M5.03125 4.8125L5.25 10.9375M8.96875 4.8125L8.75 10.9375"
                                          stroke="#1A183E"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </div>

                                    {/*<div onClick={(e) => editLesson(e, index, lessonIndex)} className="cursor-pointer border rounded-full border-black border-2 items-center">
                                                                <svg style={{padding: "2px"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 14 14" fill="none">
                                                                    <path d="M11.2583 5.20609L8.77917 2.75609L9.59583 1.93942C9.81944 1.71581 10.0942 1.604 10.4201 1.604C10.746 1.604 11.0205 1.71581 11.2437 1.93942L12.0604 2.75609C12.284 2.9797 12.4007 3.24959 12.4104 3.56575C12.4201 3.88192 12.3132 4.15161 12.0896 4.37484L11.2583 5.20609ZM10.4125 6.0665L4.22917 12.2498H1.75V9.77067L7.93333 3.58734L10.4125 6.0665Z" fill="black"/>
                                                                </svg>
                                                            </div>*/}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        ) : (
                          <p className="flex items-center text-[#A1A1A1]">
                            Click on the “
                            <svg
                              className="border rounded-full border-[#A1A1A1]"
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 10 10"
                              fill="none"
                            >
                              <path
                                d="M7.45078 5.34907H5.35078V7.44907H4.65078V5.34907H2.55078V4.64907H4.65078V2.54907H5.35078V4.64907H7.45078V5.34907Z"
                                fill="#A1A1A1"
                              />
                            </svg>
                            ” button to add a lesson to this module
                          </p>
                        )}
                      </div>
                    )}

                  {errors.modules &&
                    errors.modules[index] &&
                    errors.modules[index].moduleTitle && (
                      <div
                        style={{ color: "red" }}
                        className="flex items-center gap-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                        >
                          <g clip-path="url(#clip0_4879_100220)">
                            <path
                              d="M7.5 0.9375C6.20206 0.9375 4.93327 1.32238 3.85407 2.04348C2.77488 2.76458 1.93374 3.7895 1.43704 4.98864C0.940343 6.18778 0.810384 7.50728 1.0636 8.78028C1.31682 10.0533 1.94183 11.2226 2.85961 12.1404C3.7774 13.0582 4.94672 13.6832 6.21972 13.9364C7.49272 14.1896 8.81222 14.0597 10.0114 13.563C11.2105 13.0663 12.2354 12.2251 12.9565 11.1459C13.6776 10.0667 14.0625 8.79794 14.0625 7.5C14.0625 5.75952 13.3711 4.09032 12.1404 2.85961C10.9097 1.6289 9.24049 0.9375 7.5 0.9375ZM7.5 3.75C7.63907 3.75 7.77501 3.79124 7.89064 3.8685C8.00627 3.94576 8.09639 4.05557 8.14961 4.18405C8.20282 4.31253 8.21675 4.45391 8.18962 4.5903C8.16249 4.72669 8.09552 4.85198 7.99719 4.95031C7.89885 5.04864 7.77357 5.11561 7.63718 5.14274C7.50078 5.16987 7.35941 5.15595 7.23093 5.10273C7.10245 5.04951 6.99264 4.95939 6.91538 4.84376C6.83812 4.72813 6.79688 4.59219 6.79688 4.45312C6.79688 4.26664 6.87096 4.0878 7.00282 3.95594C7.13468 3.82408 7.31352 3.75 7.5 3.75ZM9.375 11.3086H5.625V10.2539H6.97266V7.55859H6.09375V6.50391H8.02735V10.2539H9.375V11.3086Z"
                              fill="#FF0000"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_4879_100220">
                              <rect width="15" height="15" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        {errors.modules[index].moduleTitle.message}
                      </div>
                    )}

                  {titleErrors[index] && (
                    <div
                      style={{ color: "red" }}
                      className="flex items-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_4879_100220)">
                          <path
                            d="M7.5 0.9375C6.20206 0.9375 4.93327 1.32238 3.85407 2.04348C2.77488 2.76458 1.93374 3.7895 1.43704 4.98864C0.940343 6.18778 0.810384 7.50728 1.0636 8.78028C1.31682 10.0533 1.94183 11.2226 2.85961 12.1404C3.7774 13.0582 4.94672 13.6832 6.21972 13.9364C7.49272 14.1896 8.81222 14.0597 10.0114 13.563C11.2105 13.0663 12.2354 12.2251 12.9565 11.1459C13.6776 10.0667 14.0625 8.79794 14.0625 7.5C14.0625 5.75952 13.3711 4.09032 12.1404 2.85961C10.9097 1.6289 9.24049 0.9375 7.5 0.9375ZM7.5 3.75C7.63907 3.75 7.77501 3.79124 7.89064 3.8685C8.00627 3.94576 8.09639 4.05557 8.14961 4.18405C8.20282 4.31253 8.21675 4.45391 8.18962 4.5903C8.16249 4.72669 8.09552 4.85198 7.99719 4.95031C7.89885 5.04864 7.77357 5.11561 7.63718 5.14274C7.50078 5.16987 7.35941 5.15595 7.23093 5.10273C7.10245 5.04951 6.99264 4.95939 6.91538 4.84376C6.83812 4.72813 6.79688 4.59219 6.79688 4.45312C6.79688 4.26664 6.87096 4.0878 7.00282 3.95594C7.13468 3.82408 7.31352 3.75 7.5 3.75ZM9.375 11.3086H5.625V10.2539H6.97266V7.55859H6.09375V6.50391H8.02735V10.2539H9.375V11.3086Z"
                            fill="#FF0000"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_4879_100220">
                            <rect width="15" height="15" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      {titleErrors[index]}
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-5">
                <button
                  onClick={handleAddModule}
                  className="flex border border-black rounded bg-white p-2 items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M15.0013 10.8317H10.8346V14.9984C10.8346 15.2194 10.7468 15.4313 10.5906 15.5876C10.4343 15.7439 10.2223 15.8317 10.0013 15.8317C9.78029 15.8317 9.56833 15.7439 9.41205 15.5876C9.25577 15.4313 9.16797 15.2194 9.16797 14.9984V10.8317H5.0013C4.78029 10.8317 4.56833 10.7439 4.41205 10.5876C4.25577 10.4313 4.16797 10.2194 4.16797 9.99837C4.16797 9.77736 4.25577 9.5654 4.41205 9.40912C4.56833 9.25284 4.78029 9.16504 5.0013 9.16504H9.16797V4.99837C9.16797 4.77736 9.25577 4.5654 9.41205 4.40912C9.56833 4.25284 9.78029 4.16504 10.0013 4.16504C10.2223 4.16504 10.4343 4.25284 10.5906 4.40912C10.7468 4.5654 10.8346 4.77736 10.8346 4.99837V9.16504H15.0013C15.2223 9.16504 15.4343 9.25284 15.5906 9.40912C15.7468 9.5654 15.8346 9.77736 15.8346 9.99837C15.8346 10.2194 15.7468 10.4313 15.5906 10.5876C15.4343 10.7439 15.2223 10.8317 15.0013 10.8317Z"
                      fill="#1A183E"
                    />
                  </svg>
                  Add Module
                </button>
              </div>

              <div className="flex mt-20 gap-6 cursor-pointer items-center justify-end">
                {/*<Preview
                            isSubmitted={isSubmitted}
                            previewContent={previewedContent}
                            />*/}
                <Save
                  btnStyle={{ pointerEvents: isPublishing ? "none" : "auto" }}
                  onSave={handleSubmit(onSubmit)}
                  formReset={reset}
                  errors={form.formState.errors}
                  title="Persist to Draft"
                />
                {/* {isEditMode ? (
                            <Save
                                onSave={handleSubmit(onSubmit)}
                                formReset={reset}
                                errors={form.formState.errors}
                                title="Persist to Draft"
                            />
                            ) : (
                            <Edit onClick={handleEdit} />
                            )}*/}
                <Publish
                  btnStyle={{ pointerEvents: isPublishing ? "none" : "auto" }}
                  title={isPublishing ? "Publishing..." : "Publish"}
                  onClick={handleSubmit(onSubmit)}
                />
              </div>
            </div>
          </div>
        </div>
      </form>

      <CourseOptionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        awaitSubmit={handleModalSubmitNext}
        title={sendModules}
      />

      <VideoLinkTypeModal
        parentModalOpener={openModal}
        isOpen={isVideoLinkModalOpen}
        onClose={closeVideoLinkModal}
        awaitSubmit={handleModalContentDetailsSubmit}
      />

      <VideoFileTypeModal
        isOpen={isVideoFileModalOpen}
        parentModalOpener={openModal}
        onClose={closeVideoFileModal}
        awaitSubmit={handleModalContentDetailsSubmit}
      />

      <DocumentFileTypeModal
        parentModalOpener={openModal}
        isOpen={isDocumentFileModalOpen}
        onClose={closeDocumentFileModal}
        awaitSubmit={handleModalContentDetailsSubmit}
      />
    </>
  );
};

export default ModulesForm;
