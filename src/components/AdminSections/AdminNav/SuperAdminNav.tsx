"use client";

import React, { useState } from "react";
import AdminModal from "./AdminModal";
import { Plus } from "lucide-react";
import SearchInt from "../../../../utilComponents/AdminNav/SearchInt";
import FilterInt from "../../../../utilComponents/AdminNav/FilterInt";
import { useDispatch, useSelector } from "react-redux";
import { selectSuperRegistrationForm, clearSuperUser } from "@/store/slices/instructorFormData";
import SortSmall from "../../../../utilComponents/SortSmall/SortSmall";
import SuperAdminModal from "./SuperAdminModal";

interface AdminNavProps {
  count: any;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
}

const SuperAdminNav: React.FC<AdminNavProps> = ({ count, setSearchQuery, setSortOption }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const dispatch = useDispatch();

  const clearForm = () => {
    dispatch(clearSuperUser());
  };

  return (
    <div className="flex justify-between items-center px-5">
      <div className="flex items-center gap-2 text-[#1a183e] ">
        <p className={`font-semibold text-2xl`}>{count?.count}</p>
        <p className="font-medium text-[#A6A6A6] text-2xl">Admins in total</p>
      </div>

      <div className="flex items-center gap-4">
        <SearchInt setSearchQuery={setSearchQuery} />
        <FilterInt />
        <SortSmall setSortOption={setSortOption} />

        <button
          className={`flex items-center gap-1 w-full bg-[#1A183E] p-2 text-white rounded-lg cursor-pointer`}
          onClick={openModal}
        >
          <Plus className="w-8 h-8" />
          <p>Add new admin</p>
        </button>

        {/* Modal */}
        <SuperAdminModal isOpen={isModalOpen} onClose={closeModal} closeAction={clearForm} />
      </div>
    </div>
  );
};

export default SuperAdminNav;
