export const extractErrorMessage = (error: any) => {
  let errorMessages = "";
  if (error.response && error.response.data) {
    for (let arrayEntry of Object.values(error.response.data)) {
      if (typeof arrayEntry === "string") {
        errorMessages = arrayEntry;
      }

      if (Array.isArray(arrayEntry)) {
        errorMessages = arrayEntry.join(", ");
      }
    }
  } else {
    errorMessages = error.toString();
  }

  return errorMessages;
};

export const isNotEmptyArray = (arr: any) =>
  Array.isArray(arr) && arr.length > 0;

export const parseAmount = (num: number | string) =>
  Number(num)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");

export const parseDateStr = (dateStr: string) => {
  const newDate = new Date(dateStr).toLocaleString().split(",")[0];
  if (newDate) {
    return newDate?.split("/").reverse().join("-");
  }

  return null;
};

// Discount Helper Functions
export const DISCOUNT = {
  PERCENTAGE: "PERCENTAGE_BASED",
  FIXED: "FIXED_VALUE_BASED",
};

export const calculateDiscount = (type: any, value: any, price: any) => {
  let newPrice = price;

  if (type === DISCOUNT.FIXED) {
    newPrice = newPrice - value;
  } else if (type === DISCOUNT.PERCENTAGE) {
    let discount = price * (value / 100);
    newPrice = newPrice - discount;
  } else {
    // nada
  }
  return newPrice;
};

export function generateCode(digit: number) {
  if (Number.isInteger(digit) && digit >= 0) {
    const code = digit.toString().padStart(3, '0');
    return `INGRYD0${code}`;
  }
}
