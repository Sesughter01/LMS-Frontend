"use client";

import AdminLayout from "@/components/layouts/AdminLayouts";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useCohortData } from "../../../../../context/CohortDataContext";
import Spinner from "../../../../../utilComponents/Spinner";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { TfiWorld } from "react-icons/tfi";
import { FiEdit } from "react-icons/fi";
import { BiCalendar } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import { MdOutlineSchool } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import SearchSmall from "../../../../../utilComponents/SearchSmall/SearchSmall";
import FilterSmall from "../../../../../utilComponents/FilterSmall/FilterSmall";
import SortSmall from "../../../../../utilComponents/SortSmall/SortSmall";
import SingleCohortDetails from "@/components/AdminSections/CohortModal/SingleCohortDetails";
import { extractMonthYear, extractMonthYearDay } from "@/shared/utils/dateUtils";
import { useDispatch, useSelector } from "react-redux";
import { fetchACohortsById } from "@/store/slices/cohortFormData";
import { fetchAllCoursesByCohort } from "@/store/slices/coursesSlice";
import { RootState } from "@/store/store";
import courseService from "@/services/api/courses";
import { toast } from "react-toastify";
import DropdownContent from "@/components/AdminSections/CohortModal/DropdownContent";
import DeleteModal from "@/components/AdminSections/CohortModal/DeleteModal";
import CohortStatusModal from "@/components/AdminSections/CohortModal/CohortStatusModal";
import { DeleteSingleCohort, UpdateSingleCohortStatus } from "@/services/api/cohort";
import { extractErrorMessage } from "@/shared/utils/helper";
import Courses from "./container/courses";

const customMessageStyle = {
  marginTop: "2px",
  marginLeft: "2px",
  fontSize: "14px",
};

const CohortDetails = () => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isCohortStatusModalOpen, setCohortStatusModalOpen] = useState(false);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });

  const [cohortProfile, setCohortProfile] = useState("");

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  const openCohortStatusModal = () => setCohortStatusModalOpen(true);
  const closeCohortStatusModal = () => setCohortStatusModalOpen(false);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [coursesSearchQuery, setCoursesSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");

  const [coursesFiltered, setCoursesFiltered] = useState<any>([]);
  

  const logoUrl = sessionStorage.getItem("logoUrl") || "";
  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";

  const modalStyle = {
    content: {
      width: "950px",
      height: "596px",
      margin: "auto",
      background: "white",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };
  const cohortId = Array.isArray(params.id) ? parseInt(params.id[0], 10) : parseInt(params.id, 10);

  const [selectedValue, setSelectedValue] = useState("");

  const handleRadioChange = (event: any) => {
    if (event.target.type === "radio") {
      setSelectedValue(event.target.id);
    }
  };

  const addCourseToCohort = async (data: Array<any>) => {
    const successfulSubmissions = [];
    const failedSubmissions = [];
    // Sequentially submit selected courses
    for (const selectedCourse of data) {
      try {
        const addedToCohort = await courseService.addCourseToCohort(selectedCourse.id, cohortId);
        successfulSubmissions.push(selectedCourse.courseTitle);
        console.log(`Course ${addedToCohort}`);
        console.log(`Course ${selectedCourse.courseTitle} submitted successfully`);
      } catch (error) {
        failedSubmissions.push(selectedCourse.courseTitle);
        console.error(`Error submitting course ${selectedCourse.courseTitle}:`, error);
        // Handle the error as needed
      }
    }

    if (successfulSubmissions.length === data.length) {
      toast.success(
        <>
          <div>
            {successfulSubmissions.length > 1 ? "Courses Added!" : "Course Added!"}
            <div style={customMessageStyle}>
              {successfulSubmissions.length > 1 ? "All courses were successfully added." : "The course was successfully added."}
            </div>
          </div>
        </>
      );
      dispatch(fetchACohortsById(cohortId));
      dispatch(fetchAllCoursesByCohort(cohortId));
    } else {
      // Some submissions failed
      toast.error(
        <>
          <div>
            Course Addition Partially Failed
            <div style={customMessageStyle}>The following courses failed to be added: {failedSubmissions.join(", ")}</div>
          </div>
        </>
      );
      // closeModal();
    }
  };

  const handleDropdownOptionClick = (id: any, option: string) => {
    console.log("Navigate to Admin profile page");
    setCohortProfile(id);
    setDropdownVisible(false);
    if (option == "delete") {
      openDeleteModal();
    } else {
      openCohortStatusModal();
    }
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>, cohortIndex: any) => {
    event.preventDefault();
    const buttonRect = event.currentTarget.getBoundingClientRect();
    const divRect = event.currentTarget.closest("button")?.getBoundingClientRect();

    // Calculate the top position by adding the button's height
    const top = buttonRect.bottom - (divRect?.top || 0) + window.scrollY + 118;

    const right = buttonRect.right - (divRect?.right || 0) + window.scrollX - 39;

    setDropdownPosition({
      top: top,
      right: right,
    });

    setDropdownVisible(!dropdownVisible);
    setCohortProfile(cohortIndex);
  };

  const deleteCohort = async (id: number) => {
    try {
      await DeleteSingleCohort(id);
      toast.success(
        <>
          <div>
            Cohort Deleted
            <div style={customMessageStyle}>The cohort was successfully deleted</div>
          </div>
        </>
      );
      closeDeleteModal();
      router.push("/admin/cohort");
    } catch (error: any) {
      const errMsg = extractErrorMessage(error) || error?.message;
      toast(errMsg, { position: toast.POSITION.TOP_RIGHT });
    }
  };

  const cohortStatusChange = async (id: number, status: string) => {
    try {
      const statusSent = status == "drafts" ? "published" : "drafts";
      const statusUpdate = await UpdateSingleCohortStatus(id, statusSent);
      toast.success(
        <>
          <div>
            Cohort {statusUpdate.status == "published" ? "Published!" : "Unpublished!"}
            <div style={customMessageStyle}>The cohort was successfully {statusUpdate.status == "published" ? "Published!" : "Unpublished!"}</div>
          </div>
        </>
      );
      closeCohortStatusModal();
      dispatch(fetchACohortsById(cohortId));
    } catch (error: any) {
      const errMsg = extractErrorMessage(error) || error?.message;
      toast(errMsg, { position: toast.POSITION.TOP_RIGHT });
    }
  };

  const dispatchCourseOnDelete = () => {
    dispatch(fetchACohortsById(cohortId));
    dispatch(fetchAllCoursesByCohort(cohortId));
  };

  const { singleCohort } = useSelector((state: RootState) => state.form);
  const { allCoursesByCohort } = useSelector((state: RootState) => state.courses);

  const coursesByCohort = allCoursesByCohort;

  useEffect(() => {
    dispatch(fetchACohortsById(cohortId));
    dispatch(fetchAllCoursesByCohort(cohortId)).then(() => {
      // Set loading to false when the data is loaded
      setLoading(false);
    });
  }, [cohortId, dispatch]);

  const cohort: any = singleCohort;

  const handleCoursesSearchQuery = (val: string) => {
     setCoursesFiltered(coursesByCohort.filter((item) => item.courseTitle.toLowerCase().includes(val.toLowerCase())))
  }

  useEffect(() => {
   setCoursesFiltered(coursesByCohort)
  }, [coursesByCohort])

  return (
    <>
      <AdminLayout>
        {cohort !== null && !loading ? (
          <div className="pr-12">
            <div className="flex items-center gap-4">
              <p className="text-[#7A7A7A] text-lg font-semibold">Cohort</p>
              <AiOutlineRight className="text-[#7A7A7A] text-lg font-semibold" />
              <p style={{ color: secondaryColor }} className="font-semibold text-lg">
                Cohort - <span>{extractMonthYear(cohort?.startDate)}</span>
              </p>
            </div>
            <div className="flex gap-4 items-center mt-8">
              <button onClick={() => router.back()}>
                <AiOutlineArrowLeft style={{ color: secondaryColor }} className="font-semibold text-4xl" />
              </button>
              <div style={{ borderLeft: "1px solid lightgray", height: "40px" }}></div>
              <p style={{ color: secondaryColor }} className="text-lg font-semibold">
                Cohort - <span>{extractMonthYear(cohort?.startDate)}</span>
              </p>
              <p className="text-sm text-gray-500 font-medium mt-1">
                {extractMonthYear(cohort?.startDate)} - {extractMonthYear(cohort?.endDate)}
              </p>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-4">
                {cohort?.status === "published" ? (
                  <div style={{ backgroundColor: "#AADEA0", marginLeft: "70px" }} className="flex items-center gap-2 px-2 py-1 mt-2 rounded-lg">
                    <TfiWorld style={{ color: "#67975E" }} />
                    <p style={{ color: "#67975E" }} className="text-sm">
                      Published
                    </p>
                  </div>
                ) : (
                  <div
                    style={{ backgroundColor: "rgba(122, 122, 122, 0.30)", marginLeft: "70px" }}
                    className="flex items-center gap-2 px-2 py-1 mt-2 rounded-lg"
                  >
                    <FiEdit style={{ color: "#7A7A7A" }} />
                    <p style={{ color: "#7A7A7A" }} className="text-sm">
                      Draft
                    </p>
                  </div>
                )}
                <div className="flex items-center mt-2 text-sm">
                  <BiCalendar style={{ color: "#616660" }} />
                  <p style={{ color: "#616660" }}>Created: {extractMonthYearDay(cohort?.createdAt)}</p>
                  <BsDot style={{ color: "#616660" }} />
                  <MdOutlineSchool style={{ color: "#616660", marginRight: "2px" }} />
                  <p style={{ color: "#616660" }} className="text-sm">
                    Cohort
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-2 mt-2 text-sm" onClick={(e) => handleButtonClick(e, cohort.id)}>
                <FiSettings />
                Menu
              </button>
            </div>
            <div className="mt-5" style={{ width: "100%" }}>
              {cohort?.image && (
                <img
                  src={cohort?.image}
                  alt="Cohort Image"
                  style={{
                    width: "100%",
                    maxHeight: "500px",
                    borderRadius: "8px",
                  }}
                />
              )}
            </div>
            <div className="mt-5 font-medium">
              <p>{cohort?.description || "NIL"}</p>
            </div>
            <div className="flex items-center gap-12 mt-8">
              <div className="flex items-center flex-col gap-2">
                <p style={{ color: secondaryColor }} className="text-lg font-semibold">
                  Total Students
                </p>
                <div style={{ backgroundColor: secondaryColor }} className=" text-white px-4 py-2 rounded-full">
                  <p>{cohort?.students}</p>
                </div>
              </div>
              <div className="flex items-center flex-col gap-2">
                <p style={{ color: secondaryColor }} className="text-lg font-semibold">
                  Total Instructors
                </p>
                <div style={{ backgroundColor: secondaryColor }} className="text-white px-4 py-2 rounded-full">
                  <p>{cohort?.instructors}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-8">
              <div className="flex items-center gap-2">
                <p style={{ color: secondaryColor }} className="text-lg font-semibold">
                  {cohort?.cohortCourses}
                </p>
                <p className="text-lg text-gray-500 font-medium">Courses in total</p>
              </div>
              <div className="flex items-center gap-2">
                <SearchSmall setSearchQuery={handleCoursesSearchQuery} />
                <FilterSmall filterClassName="relative" />
                <SortSmall setSortOption={setSortOption} sortClassName="relative" />

                <button
                  onClick={openModal}
                  style={{ backgroundColor: secondaryColor }}
                  className="flex items-center gap-2 py-2 px-4 text-white rounded-lg cursor-pointer"
                >
                  <AiOutlinePlus />
                  <p>Add a course</p>
                </button>
              </div>
            </div>

            {/* course added to cohort */}
            <div className="mt-4">
              <Courses modalStyle={modalStyle} data={coursesFiltered} awaitDelete={dispatchCourseOnDelete} cohortId={Number(cohortId)} />
            </div>

            <SingleCohortDetails
              modalIsOpen={isModalOpen}
              closeModal={closeModal}
              modalStyle={modalStyle}
              awaitSubmit={addCourseToCohort}
              cohortCourses={coursesByCohort}
              secondaryColor={secondaryColor}
              setSearchQuery={setSearchQuery}
              setSortOption={setSortOption}
            />

            {dropdownVisible && (
              <DropdownContent position={dropdownPosition} onOptionClick={handleDropdownOptionClick} data={cohortProfile} cohort={cohort} />
            )}

            <DeleteModal
              secondaryColor={secondaryColor}
              isOpen={isDeleteModalOpen}
              onClose={closeDeleteModal}
              awaitSubmit={() => deleteCohort(Number(cohortId))}
            />

            <CohortStatusModal
              isOpen={isCohortStatusModalOpen}
              cohort={cohort}
              onClose={closeCohortStatusModal}
              awaitSubmit={() => cohortStatusChange(Number(cohortId), cohort.status)}
            />
          </div>
        ) : (
          <div className="flex justify-center items-center my-[30px]">
            <Spinner />
          </div>
        )}
      </AdminLayout>
    </>
  );
};

export default CohortDetails;
