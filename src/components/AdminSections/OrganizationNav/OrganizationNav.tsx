"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import SearchInt from "../../../../utilComponents/AdminNav/SearchInt";
import SortSmall from "../../../../utilComponents/SortSmall/SortSmall";
import FilterSmall from "../../../../utilComponents/FilterSmall/FilterSmall";
import OrganizationModal from "./OrganizationModal";

interface OrganizationNavProps {
  count: any;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
}

const OrganizationNav: React.FC<OrganizationNavProps> = ({ count, setSearchQuery, setSortOption }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="flex justify-between items-center px-5">
      <div className="flex items-center gap-2">
        <p className="text-[#1A183E] font-semibold text-2xl">{count?.count}</p>
        <p className="font-medium text-[#A6A6A6] text-2xl">Organizations in total</p>
      </div>

      <div className="flex items-center gap-4">
        <SearchInt setSearchQuery={setSearchQuery} />
        <FilterSmall />
        <SortSmall setSortOption={setSortOption} />

        <button className="flex items-center gap-1 w-full bg-[#1A183E]  p-2 text-white rounded-lg cursor-pointer" onClick={openModal}>
          <Plus className="w-8 h-8" />
          <p>Add new organization</p>
        </button>

        {/* Modal */}
        <OrganizationModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </div>
  );
};

export default OrganizationNav;
