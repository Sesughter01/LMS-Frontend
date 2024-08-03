"use client";

import React from "react";
import { RxFilePlus } from "react-icons/rx";
import CohortFull from "./CohortFull";
import Spinner from "../../../../utilComponents/Spinner/index";

type CohortFullProps = {
  cohorts: Array<any>;
  loading: boolean;
  awaitUpdate: () => void;
  searchQuery: string;
  sortOption: string;
  secondaryColor: any;
};

const CohortEmpty: React.FC<CohortFullProps> = ({ cohorts, loading, awaitUpdate, searchQuery, sortOption, secondaryColor }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center my-[30px]">
        <Spinner />
      </div>
    );
  }

  if (cohorts.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center gap-8 text-center text-[#7A7A7A] mt-20">
        <p className="text-2xl font-semibold">NO COHORT FOUND</p>
        <div>
          <p className="font-medium text-lg">
            You haven't created any cohorts yet. Let's get started by <br /> creating your first cohort.
          </p>
        </div>
        <div>
          <RxFilePlus className="w-[199px] h-[199px]" />
        </div>
        <div>
          <p className="font-medium text-lg">
            Select the “create new cohort” button at the top right <br /> hand corner to create your first cohort.
          </p>
        </div>
      </div>
    );
  }

  return (
    <CohortFull secondaryColor={secondaryColor} cohortData={cohorts} awaitUpdate={awaitUpdate} searchQuery={searchQuery} sortOption={sortOption} />
  );
};

export default CohortEmpty;
