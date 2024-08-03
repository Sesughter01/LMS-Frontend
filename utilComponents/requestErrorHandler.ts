import { useState } from "react";
import { toast } from "react-toastify";

export function useRequestErrorHandler({ useToast = true } = {}) {
  const [error, setError] = useState(null);

  const handleRequestError = async (arg: any) => {
    let error;
    if (typeof arg === "function") {
      // if arg is a function invoke it
      try {
        await Promise.resolve(arg());
      } catch (err) {
        error = err;
      }
    } else {
      error = arg;
    }

    if (error) {
      let errMessage = error?.response?.data?.message;
      if (useToast) {
        toast.error(errMessage);
      } else {
        // set error
        setError(errMessage);
      }
    }
  };

  let resetError = () => setError(null);

  return {
    error,
    resetError,
    handleRequestError,
  };
}
