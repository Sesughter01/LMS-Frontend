import React from "react";
import { useRouter } from "next/navigation";

const Back = ({handleBack}) => {
  const router = useRouter();

  function goBack (){
  	if(handleBack){
  		handleBack()
  	}else{
		router.back()
  	}	
  }
  
  return (
    <div className="flex items-center gap-2 border border-menu py-2 px-4 rounded-lg">
      <button type="button" className="text-menu text-base font-medium" onClick={goBack}>
        Back
      </button>
    </div>
  );
};

export default Back;
