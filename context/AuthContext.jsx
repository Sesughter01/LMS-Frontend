"use client";

import { createContext, useReducer, useContext, useState, useEffect } from "react";
import { client } from "../src/services/client";
import { deleteCookie } from 'cookies-next';

const AuthContext = createContext();

const reducer = (state, action) => {
  if (action.type === "loginSuccess") {
    let payload = action.payload;

    localStorage.setItem("session", JSON.stringify(payload));

    // set client token for future requests;
    client.defaults.headers.common["Authorization"] = `
    Bearer ${payload.accessToken}
    `;

    let user = {
      firstname: payload.profile.firstname,
      lastname: payload.profile.lastname,
      avatar: payload.profile.avatar,
      id: payload.id,
      ...payload,
    };

    return {
      token: payload.accessToken,
      isAdmin: payload.accountType === "ADMIN",
      isInstructor: payload.accountType === "INSTRUCTOR",
      isSuperAdmin: payload.accountType === "SUPER_ADMIN",
      isTrainee: payload.accountType === "TRAINEE",
      isAuthenticated: true,
      user,
    };
  }
  if (action.type === "logout") {
    localStorage.removeItem("session");
    localStorage.removeItem("token");
    localStorage.removeItem("persist:root");
    deleteCookie("account_type")
    deleteCookie("token")

    return {
      token: null,
      isAdmin: false,
      isInstructor: false,
      isSuperAdmin: false,
      isAuthenticated: false,
      isTrainee: false,
      user: null,
    };
  }
  return state;
};

export function AuthProvider({ children }) {
  const [isAppReady, setIsAppReady] = useState(false);

  const [state, dispatch] = useReducer(reducer, {
    token: null,
    isAdmin: false,
    isInstructor: false,
    isSuperAdmin: false,
    isTrainee: false,
    isAuthenticated: false,
  });

  useEffect(() => {
    setIsAppReady(false);
    let session = localStorage.getItem("session");
    if (session) {
      dispatch({
        type: "loginSuccess",
        payload: JSON.parse(session),
      });
    }

    setIsAppReady(true);
  }, []);

  useEffect(() => {
    let confirmSession = () => {
      let session = localStorage.getItem("session");
      if (!session) {
        dispatch({
          type: "logout",
        });
      }
    };
    window.addEventListener("focus", confirmSession);
    return () => {
      window.removeEventListener("focus", confirmSession);
    };
  }, []);

  useEffect(() => {
    const handleInvalidSession = (err) => {
      if (err.response && err.response.status === 401 && err.response.data.message.includes("Authentication failed")) {
        // log user out
        dispatch({
          type: "logout",
        });
      }
      return Promise.reject(err);
    };
    if (state.isAuthenticated) {
      const interceptorId = client.interceptors.response.use(undefined, handleInvalidSession);
      return () => {
        client.interceptors.response.eject(interceptorId);
      };
    }
  }, [state.isAuthenticated]);

  const getUserType = () => {
    if (state.isAdmin) return "/admin";
    if (state.isInstructor) return "/instructor";
    if (state.isSuperAdmin) return "/super-admin";
    if (state.isTrainee) return "/dashboard";
    // if (state.isVolunteer) return "/volunteer/home";
    return "/";
  };

  let computed = {
    homePath: state.isAuthenticated ? getUserType() : null,
  };

  return <AuthContext.Provider value={{ state, dispatch, computed }}>{isAppReady ? children : null}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
