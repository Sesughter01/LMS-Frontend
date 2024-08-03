import React from "react";
import { useRouter } from "next/navigation";
import { BsSend } from "react-icons/bs";

const Publish = ({ isLoading, location = "/admin/cohort" }) => {
  const router = useRouter();
  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";

  const handleClick = () => {
    router.push(location);
  };

  //  isLoading ? styles.loading : ""

  return (
    <button
      data-action="publish"
      type="submit"
      // onClick={handleClick}
      className={`flex items-center gap-2 border  py-2 px-4 rounded-lg`}
      disabled={isLoading}
      style={{ opacity: isLoading ? 0.5 : 1, backgroundColor: secondaryColor || "#1A183E", borderColor: secondaryColor, pointerEvents: isLoading? "none": "auto" }}
    >
      <span style={{ color: "white" }}>
        <BsSend />
      </span>
      <span className="text-white text-base font-medium">{isLoading? "...": 'Publish'}</span>
    </button>
  );
};

export default Publish;
