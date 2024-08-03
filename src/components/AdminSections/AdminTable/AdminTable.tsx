"use client";

import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import DropdownContent from "./DropdownContent";
import { ChevronLeft, ChevronRight, Mail, Phone } from "lucide-react";
import { formatDate } from "@/shared/utils/dateUtils";
import DisableModal from "../AdminModal/disableModal";
import { Admin } from "@/shared/types/admin";
import adminService from "@/services/api/admins";
import { extractErrorMessage } from "@/shared/utils/helper";
import { toast } from "react-toastify";
import { sortByDate } from "../../../../utilComponents/SortSmall/sortDate";

interface AdminTableProps {
  admins: any;
  awaitUpdate: () => void;
  searchQuery: string;
  sortOption: string;
  secondaryColor: any;
}

const customMessageStyle = {
  marginTop: "2px",
  marginLeft: "2px",
  fontSize: "14px",
};

const AdminTable: React.FC<AdminTableProps> = ({ admins, awaitUpdate, searchQuery, sortOption, secondaryColor }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [adminProfile, setAdminProfile] = useState("");

  const [loadingDisabledAdmin, setLoadingDisabledAdmin] = useState(false);

  const [adminList, setAdminList] = useState<Admin>();

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>, adminIndex: any) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    const tableRect = event.currentTarget.closest("table")?.getBoundingClientRect();

    setDropdownPosition({
      top: buttonRect.bottom - (tableRect?.top || 0) + window.scrollY,
      left: buttonRect.left - (tableRect?.left || 0) + window.scrollX,
    });

    setDropdownVisible(!dropdownVisible);
    setAdminProfile(adminIndex);
  };

  const handleDropdownOptionClick = (id: any, option: string) => {
    console.log("Navigate to Admin profile page");
    setAdminProfile(id);
    setDropdownVisible(false);
    if (option == "modal") {
      openModal();
      // awaitUpdate()
    }
  };

  // Pagination settings
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(0);

  // Calculate pagination
  const indexOfLastAdmin = (currentPage + 1) * itemsPerPage;
  const indexOfFirstAdmin = currentPage * itemsPerPage;
  const displayedAdmins = admins?.slice(indexOfFirstAdmin, indexOfLastAdmin);

  const filteredAndSortedAdmins = admins
    .filter((admins: any) => admins.profile.firstName.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((assessmentA: any, assessmentB: any) => {
      switch (sortOption) {
        case "date newest":
          return sortByDate(assessmentB.createdAt, assessmentA.createdAt);
        case "date oldest":
          return sortByDate(assessmentA.createdAt, assessmentB.createdAt);
        default:
          return 0; // No sorting
      }
    });

  // Determine if there are more pages
  const hasMorePages = indexOfLastAdmin < admins?.length;

  // Handle pagination change
  const handlePageClick = (selected: { selected: number }) => {
    setCurrentPage(selected.selected);
  };

  const getAdminData = (data: any) => {
    const admin = admins?.find((i: any) => i.id === data);
    setAdminList(admin);
  };

  const disabledAdminClick = async (id: number) => {
    try {
      const admin = admins?.find((i: Admin) => i.id === id);
      if (admin) {
        const status = admin.disabled;
        const isEmailVerified = admin.isEmailVerified;
        if (isEmailVerified) {
          setLoadingDisabledAdmin(true);
          let disabledAdmin = await adminService.disableAdminById(id, status);
          toast.success(
            <>
              <div>
                {disabledAdmin?.disabled ? "Disabled" : "Enabled"}
                <div style={customMessageStyle}>The admin has been {disabledAdmin?.disabled ? "disabled" : "enabled"}</div>
              </div>
            </>
          );
          awaitUpdate();
        } else {
          toast.error("Admin account not yet verified");
        }
      } else {
        // Handle the case when no matching admin is found
        toast.error("Admin not found");
      }
    } catch (err: any) {
      const errMsg = extractErrorMessage(err) || err?.message;
      toast(errMsg, { position: toast.POSITION.TOP_RIGHT });
    } finally {
      setLoadingDisabledAdmin(false);
      closeModal();
    }
  };

  return (
    <section>
      <div className="relative overflow-x-auto px-3 pb-12">
        <table className="w-full text-sm text-center shadow-lg text-gray-500">
          <thead className="text-base text-[#1A183E] font-semibold bg-[#D8E4FF]">
            <tr>
              <th scope="col" className="px-2 py-6">
                S/N
              </th>
              <th scope="col" className="px-2 py-6">
                Name
              </th>
              <th scope="col" className="px-2 py-6">
                Contacts
              </th>
              <th scope="col" className="px-2 py-6">
                Number
              </th>
              <th scope="col" className="px-2 py-6">
                Date Added
              </th>
              <th scope="col" className="px-2 py-6">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredAndSortedAdmins?.map((admin: any, index: any) => (
              <tr key={admin.id} className={index % 2 === 0 ? "bg-white" : "bg-[#F2F6FF]"}>
                <td className="px-3 py-4">{indexOfFirstAdmin + index + 1}</td>
                <td className="px-3 py-4">  
                  <div className="flex flex-row gap-6 items-center">
                    {/*<img src={admin?.profile?.avatar || "/images/table-img.svg"} alt="image" />*/}
                   <img className="w-[30px] h-[30px]" src={admin?.profile.avatar || "/images/default-avatar.png"} alt="profile image" />
                    <div className="self-start flex flex-col gap-3 w-[112px] items-start">
                      <span className="text-xs font-['Montserrat'] font-medium text-[#1a183e] ml-0">
                        {admin?.profile?.firstName} {admin?.profile?.lastName}
                      </span>
                      <div className="flex flex-row gap-1 w-24 items-start">
                        {admin?.isEmailVerified && !admin.disabled ? (
                          <div className="overflow-hidden bg-[rgba(56,_142,_60,_0.3)] flex flex-col shrink-0 items-center px-1 py-px rounded">
                            <span className="text-xs font-['Montserrat'] font-medium text-[#388e3c]">Active</span>
                          </div>
                        ) : (
                          <div className="overflow-hidden bg-[#7A7A7A] bg-opacity-30 flex flex-col shrink-0 items-center px-1 py-px rounded">
                            <span className="text-xs font-['Montserrat'] font-medium text-[#7A7A7A]">Inactive</span>
                          </div>
                        )}
                        <div className="overflow-hidden bg-[rgba(44,_40,_132,_0.3)] flex flex-col  shrink-0 items-center px-1 py-px rounded">
                          <span className="text-xs font-['Montserrat'] font-medium text-[#1D63FE]">Admin</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4">
                  <div className="flex flex-col mr-0 gap-3 items-start">
                    <div className="flex flex-row gap-1  items-center">
                      <Mail className="w-4 h-4" />
                      <span className="text-xs font-['Montserrat'] font-medium text-[#1a183e]">{admin?.email}</span>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4">
                  <div className="flex flex-row gap-1 items-center">
                    <Phone className="w-4 h-4" />
                    <span className="text-xs font-['Montserrat'] font-medium text-[#1a183e] mt-px">{admin?.profile?.phoneNumber}</span>
                  </div>
                </td>
                <td className="px-3 py-4">
                  <div className="flex flex-row gap-16 items-start">
                    <span className="text-xs font-['Montserrat'] font-medium mt-1">{formatDate(admin?.createdAt)}</span>
                  </div>
                </td>
                <td className="px-3 py-4">
                  <button onClick={(e) => handleButtonClick(e, admin.id)}>
                    <img src="/icons/action.svg" alt="action" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {dropdownVisible && (
          <DropdownContent
            position={dropdownPosition}
            onOptionClick={handleDropdownOptionClick}
            data={adminProfile}
            admin={adminList}
            onSelection={getAdminData}
          />
        )}

        {/* Pagination */}
        <div className="flex flex-row gap-2 justify-end w-full items-start mt-12">
          <ReactPaginate
            previousLabel={
              <span
                className={`border-solid border-[#7a7a7a] bg-white flex flex-col w-8 h-8 text-center shrink-0 items-center py-2 border rounded ${
                  currentPage === 0 ? "cursor-not-allowed opacity-50" : ""
                }`}
                onClick={() => currentPage > 0 && handlePageClick({ selected: currentPage - 1 })}
              >
                <ChevronLeft />
              </span>
            }
            nextLabel={
              <span
                className={`border-solid border-[#7a7a7a] ${
                  !hasMorePages ? "cursor-not-allowed opacity-50" : ""
                } bg-white flex flex-col w-8 h-8 text-center shrink-0 items-center py-2 border rounded`}
                onClick={() => hasMorePages && handlePageClick({ selected: currentPage + 1 })}
              >
                <ChevronRight />
              </span>
            }
            breakLabel={"..."}
            // breakClassName={"break-me"}
            pageCount={Math.ceil(admins?.length / itemsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName="flex gap-2 items-center justify-center mt-8 mb-4"
            activeClassName="bg-[#d8e4ff]"
            pageClassName="border-solid border-[#7a7a7a] bg-white flex flex-col w-8 h-8 text-center shrink-0 items-center py-1 gap-2 border rounded  font-bold leading-[20px] text-[#1a183e] text-sm font-montserrat"
          />
        </div>
      </div>

      <DisableModal
        secondaryColor={secondaryColor}
        isOpen={isModalOpen}
        onClose={closeModal}
        awaitSubmit={() => disabledAdminClick(Number(adminProfile))}
      />
    </section>
  );
};

export default AdminTable;
