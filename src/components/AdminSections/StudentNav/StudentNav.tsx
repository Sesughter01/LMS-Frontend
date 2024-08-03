"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import SearchInt from "../../../../utilComponents/AdminNav/SearchInt";
import FilterInt from "../../../../utilComponents/StudentNav/FilterInt";
import SortInt from "../../../../utilComponents/StudentNav/SortInt";
import { useDispatch, useSelector } from "react-redux";
import { selectInstructorRegistrationForm, setInstructorForm } from "@/store/slices/instructorFormData";
import { extractErrorMessage } from "@/shared/utils/helper";

import { toast } from "react-toastify";
import { sendInstructorInvitation } from "@/services/InstrutorService";
import FilterSmall from "../../../../utilComponents/FilterSmall/FilterSmall";
import SortSmall from "../../../../utilComponents/SortSmall/SortSmall";

interface StudentNavProps {
  count: any;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
  secondaryColor: any;
}

const StudentNav: React.FC<StudentNavProps> = ({ count, setSearchQuery, setSortOption, secondaryColor }) => {
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

  const submitRegistration = async () => {
    try {
      setLoading(true);
      await sendInstructorInvitation(registrationForm);
      toast.success(`Your invite to ${registrationForm.firstName} ${registrationForm.lastName}  has been sent`);
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
        <p style={{ color: secondaryColor }} className="font-semibold text-2xl">
          {count?.count}
        </p>
        <p className="font-medium text-[#A6A6A6] text-2xl">Students in total</p>
      </div>

      <div className="flex items-center gap-4">
        <SearchInt setSearchQuery={setSearchQuery} />
        <FilterSmall />
        <SortSmall setSortOption={setSortOption} />
      </div>
    </div>
  );
};

export default StudentNav;
