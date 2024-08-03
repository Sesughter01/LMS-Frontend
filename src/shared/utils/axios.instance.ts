import axios, { AxiosInstance } from "axios";

export const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
    "Organization": "ingryd"
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token  = localStorage.getItem("token");
    // const orgId = sessionStorage.getItem("orgId");
    console.log("Retrieved token:", token); // Debugging line
    // console.log("oregssss", orgId)

    if (config.headers) {
    	if(token){
	      config.headers.Authorization = `Bearer ${token}`;
	       // config.headers.organization = 18;
	      // console.log("there is token", orgId)

        console.log("Authorization header set:", config.headers.Authorization); // Debugging line
    	}

	  // if (orgId) {
	  //     config.headers.Organization = 18;
	  //   }

    // console.log("config.headers", config, config.headers)

    }

   
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
