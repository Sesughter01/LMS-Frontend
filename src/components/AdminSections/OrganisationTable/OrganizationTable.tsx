import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Organization } from "@/shared/types/organization";

interface OrganizationTableProps {
  organizations: Organization[];
  searchQuery: string;
  sortOption: string;
}

const OrganizationTable: React.FC<OrganizationTableProps> = ({ organizations, searchQuery, sortOption }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const getSortedOrganizations = () => {
    switch (sortOption) {
      case "date newest":
        return [...organizations].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case "date oldest":
        return [...organizations].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      // Add other sorting options as needed
      default:
        return organizations;
    }
  };

  const filteredAndSortedOrganizations = getSortedOrganizations().filter((org: Organization) =>
    org.organizationName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //   const filteredAndSortedOrganizations = organizations
  //     .filter((org: Organization) => org.organizationName.toLowerCase().includes(searchQuery.toLowerCase()))
  //     .sort((orgA: Organization, orgB: Organization) => {
  //       // You can add sorting logic here based on the sortOption
  //       return 0; // No sorting for now
  //     });

  const [currentPage, setCurrentPage] = useState(0);

  const indexOfLastItem = currentPage + 1;
  const indexOfFirstItem = currentPage * filteredAndSortedOrganizations.length;

  const displayedItems = filteredAndSortedOrganizations.length > 0 ? filteredAndSortedOrganizations : [];

  // Determine if there are more pages
  const hasMorePages = indexOfLastItem < (filteredAndSortedOrganizations.length || 0);

  // Handle pagination change
  const handlePageClick = async (selected: { selected: number }) => {
    setCurrentPage(selected.selected);
  };

  return (
    <section>
      <div className="relative overflow-x-auto px-3 pb-12">
        <table className="w-full text-sm shadow-lg text-gray-500">
          <thead className="text-base text-[#1A183E] font-semibold bg-[#D8E4FF]">
            <tr>
              <th scope="col" className="px-2 py-6">
                S/N
              </th>
              <th scope="col" className="px-2 py-6">
                Organization Name
              </th>
              <th scope="col" className="px-2 py-6">
                Email
              </th>
              <th scope="col" className="px-2 py-6">
                Phone Number
              </th>
              <th scope="col" className="px-2 py-6">
                Color Scheme
              </th>
              <th scope="col" className="px-2 py-6">
                Subdomain
              </th>
              <th scope="col" className="px-2 py-6">
                Status
              </th>
              {/* Action column if needed */}
            </tr>
          </thead>

          <tbody>
            {displayedItems.map((org: Organization, index: number) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white text-center" : "bg-[#F2F6FF] text-center"}>
                <td className="px-3 py-4">{indexOfFirstItem + index + 1}</td>
                <td className="px-3 py-4">{org.organizationName}</td>
                <td className="px-3 py-4">{org.email}</td>
                <td className="px-3 py-4">{org.phoneNumber}</td>
                <td className="px-3 py-4">{org.colorScheme}</td>
                <td className="px-3 py-4">{org.subDomain}</td>
                <td className="px-3 py-4">
                  <span className={`text-${org.is_active ? "green" : "red"}`}>{org.is_active ? "Active" : "Inactive"}</span>
                </td>
                {/* Action column if needed */}
              </tr>
            ))}
          </tbody>
        </table>

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
            breakClassName="border-solid border-[#7a7a7a] bg-white flex flex-col w-8 h-8 text-center shrink-0 items-center py-1 gap-2 border rounded  font-bold leading-[20px] text-[#1a183e] text-sm font-montserrat"
            pageCount={Math.ceil(filteredAndSortedOrganizations.length / 10)} // Adjust the number based on your desired items per page
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName="flex gap-2 items-center justify-center mt-8 mb-4"
            activeClassName="bg-blue-100 text-[#1a183e]"
            pageClassName="border-solid border-[#7a7a7a] bg-white flex flex-col w-8 h-8 text-center shrink-0 items-center py-1 gap-2 border rounded  font-bold leading-[20px] text-[#1a183e] text-sm font-montserrat"
          />
        </div>
      </div>
    </section>
  );
};

export default OrganizationTable;
