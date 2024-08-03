"use client";

import Image from "next/image";

import Link from "next/link";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Step1 from "../containers/PersonalInformation";
import Step2 from "../containers/Address";
import Step3 from "../containers/Education";
import Step4 from "../containers/Confirmation";
import personalInfo from '@/assets/onboarding/personal-active.svg';
import address from '@/assets/onboarding/address.svg'
import addressActive from '@/assets/onboarding/address-active.svg';
import education from '@/assets/onboarding/education.svg'
import educationActive from '@/assets/onboarding/education-active.svg';
import confirmation from '@/assets/onboarding/confirmation.svg'
import confirmationActive from '@/assets/onboarding/confirmation-active.svg';

const OnboardingTemplate = () => {
  const [currentStage, setCurrentStage] = useState(1);

  // Access values directly from sessionStorage
  const logoUrl = sessionStorage.getItem("logoUrl") || "";
  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";

  console.log("Logo URL:", logoUrl);
  console.log("Secondary Color:", secondaryColor);

  const handleStageChange = (stage: number) => {
    setCurrentStage(stage);
    // console.log("clicked tab")
  };

 
  return (
    <>
        <section className='flex gap-4 text-center' >
          <div className='flex flex-col gap-3 items-center cursor-pointer' onClick={() => handleStageChange(1)}>
              <Image src={personalInfo} alt="icon" className="w-12 aspect-square" />
              <small className='text-blue-500 text-xs'>Personal <br />Information</small>
          </div>
          <span className='bg-[#ACACAC] h-[2px] grow rounded-full my-5'></span>
          <div className='flex flex-col gap-3 items-center cursor-pointer' onClick={() => handleStageChange(2)}>
              <Image src={currentStage >= 2? addressActive :address} alt="icon" className="w-12 aspect-square" />
              <small className={`${currentStage >= 2? 'text-blue-500': 'text-gray-600'} text-xs`}>Address</small>
          </div>
          <span className='bg-[#ACACAC] h-[2px] grow rounded-full my-5'></span>
          <div className='flex flex-col gap-3 items-center cursor-pointer' onClick={() => handleStageChange(3)}>
              <Image src={currentStage >= 3? educationActive :education} alt="icon" className="w-12 aspect-square" />
              <small className={`${currentStage >= 3? 'text-blue-500': 'text-gray-600'} text-xs`}>Education</small>
          </div>
          <span className='bg-[#ACACAC] h-[2px] grow rounded-full my-5'></span>
          <div className='flex flex-col gap-3 items-center'>
              <Image src={currentStage == 4? confirmationActive :confirmation}  alt="icon" className="w-12 aspect-square" />
              <small className={`${currentStage == 4? 'text-blue-500': 'text-gray-600'} text-xs`}>Confirmation</small>
          </div>
        </section>
      {currentStage === 1 && <Step1 onStageChange={handleStageChange} />}
      {currentStage === 2 && <Step2 onStageChange={handleStageChange} />}
      {currentStage === 3 && <Step3 onStageChange={handleStageChange} />}
      {currentStage === 4 && <Step4 onStageChange={handleStageChange} />}
    </>
  );
};

export default OnboardingTemplate;
