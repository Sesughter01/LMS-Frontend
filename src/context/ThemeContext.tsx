"use client";
import React, { createContext, useEffect, useState, useReducer, ReactNode, useContext } from "react";
import Logo from "@/assets/logo.png";

export const ThemeContext = createContext<any>({
  changePrimaryColor: (name: any) => {},
  changeSecondaryColor: (name: any) => {},
  changeLogoUrl: (name: any) => {},
  changeEmail: () => {},
  changePhoneNumber: () => {},
  changeOrganizationName: () => {},
  changeId: () => {},
  changeIsActive: () => {},
  changeSubDomain: () => {},
  primaryColor: "",
  secondaryColor: "",
  logoUrl: "",
  emailRes: "",
  phoneNumber: "",
  organizationName: "",
  id: "",
  isActive: "",
  subDomain: "",
});

const reducer = (previousState: any, updatedState: any) => ({
  ...previousState,
  ...updatedState,
});

const initialState = {
  primaryColor: "#f305f8",
  secondaryColor: "#2a0839",
  logoUrl: Logo,
  emailRes: "",
  phoneNumber: "",
  organizationName: "",
  id: "",
  isActive: "",
  subDomain: "",
};

export const ThemeContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { primaryColor, secondaryColor, logoUrl, emailRes, phoneNumber, organizationName, id, isActive, subDomain } = state;

  const changePrimaryColor = (name: any) => {
    dispatch({ primaryColor: name });
  };

  const changeSecondaryColor = (name: any) => {
    dispatch({ secondaryColor: name });
  };

  const changeLogoUrl = (name: any) => {
    dispatch({ logoUrl: name });
  };

  const changeEmail = (name: any) => {
    dispatch({ emailRes: name });
  };

  const changePhoneNumber = (name: any) => {
    dispatch({ phoneNumber: name });
  };

  const changeOrganizationName = (name: any) => {
    dispatch({ organizationName: name });
  };

  const changeId = (name: any) => {
    dispatch({ id: name });
  };

  const changeIsActive = (name: any) => {
    dispatch({ isActive: name });
  };

  const changeSubDomain = (name: any) => {
    dispatch({ subDomain: name });
  };

  return (
    <ThemeContext.Provider
      value={{
        changePrimaryColor,
        changeSecondaryColor,
        changeLogoUrl,
        changeEmail,
        changeId,
        changeIsActive,
        changeOrganizationName,
        changePhoneNumber,
        changeSubDomain,
        primaryColor,
        secondaryColor,
        logoUrl,
        emailRes,
        phoneNumber,
        organizationName,
        id,
        isActive,
        subDomain,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
