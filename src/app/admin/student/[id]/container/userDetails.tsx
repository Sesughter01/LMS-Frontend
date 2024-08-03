import React from "react";
import { dateOfBirthformat } from "@/shared/utils/dateUtils";

function UserDetails(data: any, secondaryColor: any) {
  console.log(data);
  return (
    <section className="flex max-w-[80%] flex-col gap-12 font-montserrat">
      {/* Personal info */}
      <div className="flex flex-col gap-8">
        <h1 style={{ color: secondaryColor }} className="text-2xl font-medium">
          Personal Information
        </h1>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 text-base font-medium">
            <span className="text-[#9A9A9A]">Title</span>
            <span style={{ color: secondaryColor }}>
              {data?.profile?.gender?.toLowerCase() === "m" ? "Mr" : data?.profile?.gender?.toLowerCase() === "f" ? "Miss" : "NIL"}
            </span>
          </div>
          <div className="flex flex-col gap-2 text-base font-medium">
            <span className="text-[#9A9A9A]">First Name</span>
            <span style={{ color: secondaryColor }}>{data.data?.profile?.firstName}</span>
          </div>
          <div className="flex flex-col gap-2 text-base font-medium">
            <span className="text-[#9A9A9A]">Last Name</span>
            <span style={{ color: secondaryColor }}>{data.data?.profile?.lastName}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 text-base font-medium">
            <span className="text-[#9A9A9A]">Gender</span>
            <span style={{ color: secondaryColor }}>
              {data.data?.profile?.gender?.toLowerCase() === "m" ? "Male" : data.data?.profile?.gender?.toLowerCase() === "f" ? "Female" : "NIL"}
            </span>
          </div>

          <div className="flex flex-col gap-2 text-base font-medium">
            <span className="text-[#9A9A9A]">Date of Birth</span>
            <span style={{ color: secondaryColor }}>
              {data.data?.profile?.dateOfBirth ? dateOfBirthformat(data.data?.profile?.dateOfBirth) : "NIL"}
            </span>
          </div>
        </div>
      </div>

      {/* contact info */}
      <div className="flex flex-col gap-8">
        <h1 style={{ color: secondaryColor }} className="text-2xl font-medium">
          Contact Information
        </h1>
        <div className="flex justify-between items-center ">
          <div className="flex flex-col gap-2 text-base font-medium">
            <span className="text-[#9A9A9A]">Phone Number</span>
            <span style={{ color: secondaryColor }}>{data.data?.profile?.phoneNumber ?? "NIL"}</span>
          </div>
          <div className="flex flex-col gap-2 text-base font-medium">
            <span className="text-[#9A9A9A]">Email</span>
            <span style={{ color: secondaryColor }}>{data.data?.email ?? "NIL"}</span>
          </div>
          <div className="flex flex-col gap-2 text-base font-medium">
            <span className="text-[#9A9A9A]">Address</span>
            <span style={{ color: secondaryColor }}>{data.data?.address?.street ?? "-"}</span>
          </div>
        </div>
      </div>

      {/* Education info */}
      <div className="flex flex-col gap-8">
        <h1 style={{ color: secondaryColor }} className="text-2xl font-medium">
          Educational Information
        </h1>
        <div className="flex justify-between items-center ">
          <div className="flex flex-col gap-2 text-base font-medium">
            <span className="text-[#9A9A9A]">Degree</span>
            <span style={{ color: secondaryColor }}>{data?.data?.education?.certificateObtained || "NIL"}</span>
          </div>
          <div className="flex flex-col gap-2 text-base font-medium">
            <span className="text-[#9A9A9A]">Course of Study</span>
            <span style={{ color: secondaryColor }}>{data?.data?.education?.courseOfStudy || "NIL"}</span>
          </div>
          <div className="flex flex-col gap-2 text-base font-medium">
            <span className="text-[#9A9A9A]">Year of Graduation</span>
            <span style={{ color: secondaryColor }}>
              {data?.data?.education?.yearOfGraduation ? dateOfBirthformat(data?.data?.education.yearOfGraduation) : "NIL"}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-base font-medium">
          <span className="text-[#9A9A9A]">Institution Name</span>
          <span style={{ color: secondaryColor }}>{data?.data?.education?.institutionName || "NIL"}</span>
        </div>
      </div>
    </section>
  );
}

export default UserDetails;
