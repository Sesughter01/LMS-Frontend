"use client";

import { ChevronRight } from "lucide-react";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import UserDetails from "./container/userDetails";
import DisableModal from "./Modals/disableModal";
import { toast } from "react-toastify";
import { formatDate } from "@/shared/utils/dateUtils";
import { Admin } from "@/shared/types/admin";
import adminService from "@/services/api/admins";
import { extractErrorMessage } from "@/shared/utils/helper";
import Spinner from "../../../../../utilComponents/Spinner/index";
import { menu } from "@/components/layouts/SuperAdminLayout/menu";
import SuperAdminSideMenu from "@/components/SideMenu/superAdminSideMenu";

const customMessageStyle = {
  marginTop: "2px",
  marginLeft: "2px",
  fontSize: "14px",
};

function Page() {
  const router = useRouter();
  const params = useParams();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<"userDetails">("userDetails");

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const [admin, setAdmin] = useState<Admin | any>();
  const [loadingAdmin, setLoadingAdmin] = useState(false);

  const [loadingDisabledAdmin, setLoadingDisabledAdmin] = useState(false);

  const populateAdmin = async (id: number) => {
    try {
      setLoadingAdmin(true);
      let fetchAdmin = await adminService.GetAdminById(id);
      setAdmin(fetchAdmin);
      console.log(fetchAdmin);
    } catch (err: any) {
      const errMsg = extractErrorMessage(err) || err?.message;
      toast(errMsg, { position: toast.POSITION.TOP_RIGHT });
    } finally {
      setLoadingAdmin(false);
    }
  };

  const disabledAdminClick = async () => {
    try {
      const id = Number(params.id);
      const status = admin?.disabled;
      const isEmailVerified = admin?.isEmailVerified;
      if (isEmailVerified) {
        setLoadingDisabledAdmin(true);
        let disabledAdmin = await adminService.disabledAdmin(id, status);
        setAdmin(disabledAdmin);
        // console.log(disabledAdmin)
        toast.success(
          <>
            <div>
              {disabledAdmin?.disabled ? "Disabled" : "Enabled"}
              <div style={customMessageStyle}>The admin has been {disabledAdmin?.disabled ? "disabled" : "enabled"}</div>
            </div>
          </>
        );
      } else {
        toast.error("Admin account not yet verified");
      }
    } catch (err: any) {
      const errMsg = extractErrorMessage(err) || err?.message;
      toast(errMsg, { position: toast.POSITION.TOP_RIGHT });
    } finally {
      setLoadingDisabledAdmin(false);
      closeModal();
    }
  };

  const handleTabChange = (tab: "userDetails") => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const studentId = Number(id);
    populateAdmin(studentId);
  }, [id]);

  return admin ? (
    <section className="h-screen overflow-hidden font-montserrat flex bg-white py-5 px-5 gap-10">
      <div className="flex-shrink-0 relative w-[350px]" style={{ transition: ".2s" }}>
        <SuperAdminSideMenu menu={menu} />
      </div>
      <main className="overflow-auto w-full space-y-8 h-full">
        <h1 className="flex gap-2 font-base items-center font-semibold text-[#1A183E]">
          <span className="cursor-pointer" onClick={() => router.push("/admin/sub-admin")}>
            Admin
          </span>
          <ChevronRight />
          <span className="cursor-pointer" onClick={() => router.push(`/admin/sub-admin/${params.id}`)}>
            View Admin
          </span>
        </h1>

        <div className="flex items-center  justify-start gap-4">
          <img src={admin?.profile.avatar || "/images/instructor-profile.svg"} alt="profile image" />
          <div className="flex flex-col gap-4">
            <h1 className="text-[#1A183E] text-3xl font-normal">
              {admin?.profile?.firstName} {admin?.profile?.lastName}
            </h1>
            <div className="flex items-center justify-start gap-2">
              {admin?.isEmailVerified && !admin?.disabled ? (
                <span className="bg-[#388e3c] rounded bg-opacity-[0.3] text-center text-sm text-[#388E3C] font-medium px-1">Active</span>
              ) : (
                <span className="bg-[#7A7A7A] bg-opacity-30 font-medium text-[#7A7A7A] text-center text-sm px-1 rounded">Pending</span>
              )}
              <div className="flex items-center justify-start gap-1 ">
                <img src="/icons/date.svg" alt="date-icon" />
                <h2 className="text-[#7A7A7A] font-medium text-sm">Added: {formatDate(admin?.createdAt)} .</h2>
              </div>
              <div className="flex items-center justify-start gap-1 ">
                <img src="/icons/admin.svg" alt="admin-icon" />
                <h2 className="text-[#7A7A7A] font-medium text-sm">Admin</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full border-b border-[#D9D9D9]">
          <div className="flex justify-between items-center px-8">
            {/* first button */}
            <div className="flex justify-start items-center gap-20">
              <span
                className={`text-center inline-block py-2 cursor-pointer text-[18px] leading-normal font-normal ${
                  activeTab === "userDetails" ? "border-b-2 border-[#1D63FE]" : ""
                }`}
                onClick={() => handleTabChange("userDetails")}
              >
                User details
              </span>
            </div>
            {/* second button */}
            <div className="flex justify-start items-center gap-4">
              {admin?.isEmailVerified && !admin?.disabled ? (
                <button onClick={openModal} className="bg-[#1A183E] rounded-lg px-4 py-1 text-white font-semibold text-base">
                  Disable
                </button>
              ) : (
                <button onClick={openModal} className="bg-[#1A183E] rounded-lg px-4 py-1 text-white font-semibold text-base">
                  Enable
                </button>
              )}
            </div>
          </div>
        </div>
        {activeTab === "userDetails" ? <UserDetails data={admin} /> : ""}
      </main>

      {/* Modal */}
      <DisableModal isOpen={isModalOpen} onClose={closeModal} awaitSubmit={disabledAdminClick} />
    </section>
  ) : (
    <div className="flex justify-center items-center my-[30px]">
      <Spinner />
    </div>
  );
}

export default Page;
