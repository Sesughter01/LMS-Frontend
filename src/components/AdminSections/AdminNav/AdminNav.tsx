"use client";

import React, { useState } from "react";
import AdminModal from "./AdminModal";
import { Plus } from "lucide-react";
import SearchInt from "../../../../utilComponents/AdminNav/SearchInt";
import FilterInt from "../../../../utilComponents/AdminNav/FilterInt";
import { useDispatch, useSelector } from "react-redux";
import { selectInstructorRegistrationForm, setInstructorForm, clearInstructorUser } from "@/store/slices/instructorFormData";
import { extractErrorMessage } from "@/shared/utils/helper";

import { toast } from "react-toastify";
import adminService from "@/services/api/admins";
import SortSmall from "../../../../utilComponents/SortSmall/SortSmall";

const customMessageStyle = {
  marginTop: "2px",
  marginLeft: "2px",
  fontSize: "14px",
};

interface AdminNavProps {
  count: any;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
  secondaryColor: any;
}

const AdminNav: React.FC<AdminNavProps> = ({ count, setSearchQuery, setSortOption, secondaryColor }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const registrationForm = useSelector(selectInstructorRegistrationForm);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const updateInstructorFormData = (key: string, newValue: any) => {
    let newFormInformation = { ...registrationForm } as any;
    newFormInformation[key] = newValue;

    dispatch(setInstructorForm(newFormInformation));
  };

  const clearForm = () => {
    dispatch(clearInstructorUser());
  };

  const submitRegistration = async () => {
    try {
      setLoading(true);
      await adminService.sendAdminInvitation(registrationForm);
      toast.success(
        <>
          <div>
            Invite sent!
            <div style={customMessageStyle}>
              Your invite to {registrationForm.firstName} {registrationForm.lastName} has been sent
            </div>
          </div>
        </>
      );
      clearForm();
      closeModal();
    } catch (err) {
      const errorMessage = extractErrorMessage(err);

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-between items-center px-5">
      <div className="flex items-center gap-2">
        <p style={{ color: secondaryColor }} className={`font-semibold text-2xl`}>
          {count?.count}
        </p>
        <p className="font-medium text-[#A6A6A6] text-2xl">Admins in total</p>
      </div>

      <div className="flex items-center gap-4">
        <SearchInt setSearchQuery={setSearchQuery} />
        <FilterInt />
        <SortSmall setSortOption={setSortOption} />

        <button
          style={{ backgroundColor: secondaryColor }}
          className={`flex items-center gap-1 w-full  p-2 text-white rounded-lg cursor-pointer`}
          onClick={openModal}
        >
          <Plus className="w-8 h-8" />
          <p>Add new admin</p>
        </button>

        {/* Modal */}
        <AdminModal
          isOpen={isModalOpen}
          onClose={closeModal}
          awaitSubmit={submitRegistration}
          onUpdate={updateInstructorFormData}
          data={registrationForm}
          loading={loading}
          closeAction={clearForm}
          secondaryColor={secondaryColor}
        />
      </div>
    </div>
  );
};

export default AdminNav;
