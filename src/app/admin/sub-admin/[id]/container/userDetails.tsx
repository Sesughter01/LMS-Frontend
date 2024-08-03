import React from "react";

function UserDetails(data: any, secondaryColor: any) {
  return (
    <section className="flex max-w-[80%] flex-col gap-12 font-montserrat">
      {/* Personal info */}
      <div className="flex flex-col gap-8">
        <h1 style={{ color: secondaryColor }} className="] text-2xl font-medium">
          Personal Information
        </h1>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 text-base font-medium">
            <span className="text-[#9A9A9A]">First Name</span>
            <span style={{ color: secondaryColor }}>{data.data?.profile?.firstName}</span>
          </div>
          <div className="flex flex-col gap-2 text-base font-medium">
            <span className="text-[#9A9A9A]">Last Name</span>
            <span style={{ color: secondaryColor }}>{data.data?.profile?.lastName}</span>
          </div>
          <div className="flex flex-col gap-2 text-base font-medium">
            <span className="text-[#9A9A9A]">Gender</span>
            <span style={{ color: secondaryColor }}>
              {data.data?.profile?.gender?.toLowerCase() === "m" ? "Male" : data.data?.profile?.gender?.toLowerCase() === "f" ? "Female" : "NIL"}
            </span>
          </div>
        </div>
      </div>

      {/* contact info */}
      <div className="flex flex-col gap-8">
        <h1 style={{ color: secondaryColor }} className=" text-2xl font-medium">
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
    </section>
  );
}

export default UserDetails;
