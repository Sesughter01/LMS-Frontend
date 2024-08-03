"use client";

import React, { createContext, useContext, useState } from "react";
import formService from "@/services/forms";

const CohortDataContext = createContext();

export const CohortDataProvider = ({ children }) => {
  const [cohortData, setCohortData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const setContextCohortData = (data) => {
    setCohortData(data);
  };

  const getCohortById = (id) => {
    return cohortData.find((cohort) => cohort.id === id) || null;
  };

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await formService.GET_ALL_COHORT_DATA();
      setContextCohortData(res);
      console.log(res)
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CohortDataContext.Provider
      value={{
        cohortData,
        loading,
        error,
        setContextCohortData,
        getCohortById,
        fetchData,
      }}
    >
      {children}
    </CohortDataContext.Provider>
  );
};

export const useCohortData = () => useContext(CohortDataContext);
