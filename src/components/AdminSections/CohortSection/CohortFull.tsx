import React, { useState } from "react";
import { TfiWorld } from "react-icons/tfi";
import { FiEdit } from "react-icons/fi";
import { BiCalendar } from "react-icons/bi";
import Link from "next/link";
import { extractMonthYear, extractMonthYearDay } from "@/shared/utils/dateUtils";
import DeleteModal from "../CohortModal/DeleteModal";
import { DeleteSingleCohort } from "@/services/api/cohort";
import { extractErrorMessage } from "@/shared/utils/helper";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { sortByDate } from "../../../../utilComponents/SortSmall/sortDate";

type CohortFullProps = {
  cohortData: Array<any>;
  awaitUpdate: () => void;
  searchQuery: string;
  sortOption: string;
  secondaryColor: any;
};

const customMessageStyle = {
  marginTop: "2px",
  marginLeft: "2px",
  fontSize: "14px",
};

const CohortFull: React.FC<CohortFullProps> = ({ cohortData, awaitUpdate, searchQuery, sortOption, secondaryColor }) => {
  // console.log("cohorts:", cohortData);
  const [isModalOpen, setModalOpen] = useState(false);
  const [cohortId, setCohortId] = useState("");
  const [isDeleting, setIsDeleting] = useState(false)

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    if(!isDeleting){
      setModalOpen(false)
    }
  };
   const router = useRouter();

  const filteredAndSortedCourses = cohortData
    .filter((cohort) => cohort.cohortName.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((courseA, courseB) => {
      switch (sortOption) {
        case "date newest":
          return sortByDate(courseB.createdAt, courseA.createdAt);
        case "date oldest":
          return sortByDate(courseA.createdAt, courseB.createdAt);
        default:
          return 0; // No sorting
      }
    });

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>, cohortIndex: any) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    const tableRect = event.currentTarget.closest("table")?.getBoundingClientRect();

    setCohortId(cohortIndex);
    openModal();
  };

  const deleteCohort = async (id: number) => {
   setIsDeleting(true)
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
      awaitUpdate();
      setIsDeleting(false)
      closeModal();
    } catch (error: any) {
      // console.log('errorddd', error)
      if(error?.response?.data){
        toast.error(error.response.data)
      }else{
        const errMsg = extractErrorMessage(error) || error?.message;
        toast.error(errMsg, { position: toast.POSITION.TOP_RIGHT }); 
      }
     
    }finally{
      closeModal();
      setIsDeleting(false)
    }
  };

  console.log("coh:", filteredAndSortedCourses);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12 pb-10 pr-5">
        {filteredAndSortedCourses &&
          filteredAndSortedCourses.map((item: any, index: any) => (
            <div key={index} className="bg-white shadow-4xl w-full md:w-[447px] h-[199px] rounded-lg flex gap-4 px-4 py-2">
              <div className="w-[134px] h-[179px] rounded-lg">
                <img src={item.image || "/images/cohort-image.svg"} alt="Cohort" className="w-full h-full" />
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-2">
                  {item?.status === "published" ? (
                    <div style={{ backgroundColor: "#AADEA0" }} className="flex items-center gap-2 px-2 py-1 rounded-lg">
                      <TfiWorld style={{ color: "#67975E" }} className="w-[10px] h-[10px]" />
                      <p style={{ color: "#67975E" }} className="text-[8px]">
                        Published
                      </p>
                    </div>
                  ) : (
                    <div style={{ backgroundColor: "rgba(122, 122, 122, 0.30)" }} className="flex items-center gap-2 px-2 py-1 rounded-lg">
                      <FiEdit style={{ color: "#7A7A7A" }} className="w-[10px] h-[10px]" />
                      <p style={{ color: "#7A7A7A" }} className="text-[8px]">
                        Draft
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-1">
                    <BiCalendar style={{ color: "#616660" }} className="w-[7px] h-[9px]" />
                    <p style={{ color: "#616660" }} className="text-[8px]">
                      Created: {extractMonthYearDay(item.createdAt)}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-menu text-[13px] font-semibold mt-2">
                    Cohort - <span>{extractMonthYear(item.startDate)}</span>
                  </p>
                </div>
                <div className="w-full bg-gray-200 h-[2px] mt-2"></div>
                <div className="flex items-center gap-2 mt-2">
                  <BiCalendar style={{ color: "#FF00F8" }} className="w-[10px] h-[10px]" />
                  <p className="text-[10px] text-gray-500 font-medium">
                    {extractMonthYear(item.startDate)} - {extractMonthYear(item.endDate)}
                  </p>
                </div>
                <div className="flex gap-2" style={{ marginTop: "70px" }}>
                 
                   <button
                    onClick={() => router.push(`/admin/cohort/${item.id}/?cohortName=${item.cohortName}`)}
                      style={{ backgroundColor: secondaryColor, border: secondaryColor }}
                      className={`border py-2 px-1 rounded-lg text-white text-[10px] font-normal`}
                    >
                      View Details
                    </button>

               
                   <button
                   
                    onClick={() => {
                      router.push(`/admin/cohort/${item.id}/edit/?cohortName=${item.cohortName}`)
                      {/*window.location.href = `/admin/cohort/${item.id}/edit/?cohortName=${item.cohortName}`*/}
                    }}
                      style={{ color: secondaryColor, border: secondaryColor }}
                      className={`border bg-white py-2 px-1 rounded-lg text-[10px] font-normal`}
                    >
                      Edit Cohort
                    </button>
                  {item?.status !== "published" && <button
                    className={`border border-[#FF0000] bg-white py-2 px-1 rounded-lg text-[#FF0000] text-[10px] font-normal`}
                    onClick={(e) => handleButtonClick(e, item.id)}
                  >
                    Delete Cohort
                  </button>}
                </div>
              </div>
            </div>
          ))}

        <DeleteModal secondaryColor={secondaryColor} isDeleting={isDeleting} isOpen={isModalOpen} onClose={closeModal} awaitSubmit={() => deleteCohort(Number(cohortId))} />
      </div>
    </>
  );
};

export default CohortFull;
