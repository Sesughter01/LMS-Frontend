"use client";

import { Button } from "@/components/ui/button";
import { FaPaypal } from 'react-icons/fa';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import SideBar from "@/components/SideBar";
import DashNav from "@/components/DashNav";
import { Book, BookmarkIcon, Clock10Icon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import courseImage from "@/assets/java_coder.png";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import courseService from "@/services/api/courses";
import { DISCOUNT, calculateDiscount, extractErrorMessage } from "@/shared/utils/helper";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CourseDetail, couponResponse } from "@/shared/types/course";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Loader from "./container/loader";

const paymentOption = {
  FULL: "full",
  PARTIAL: "partial",
};

const initialOptions = {
  "client-id": "YOUR_PAYPAL_CLIENT_ID", // Replace with your actual PayPal client ID
  currency: "USD",
};

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  console.log("courseId:", params.id);

  const authUser = useSelector((state: RootState) => state.auth.user);

  const [details, setDetails] = useState<CourseDetail | null>();

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState<couponResponse | null>();
  const [error, setError] = useState("");
  const [isCouponSuccessful, setIsCouponSuccessful] = useState(false);

  const [price, setPrice] = useState(0);
  const [selectedPaymentType, setSelectedPaymentType] = useState(paymentOption.FULL);

  const [loading, setLoading] = useState(false);

  const logoUrl = sessionStorage.getItem("logoUrl") || "";
  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";

  const reCalculatePrice = () => {
    setPrice(discount ? calculateDiscount(discount.couponDiscountType, discount.couponDiscountValue, details?.coursePrice) : details?.coursePrice);
  };

  const initiateCoursePayment = async (courseId: any) => {
    try {
      setLoading(true);
      const response = await courseService.initiateCoursePayment(discount?.couponCode, selectedPaymentType, courseId);

      if (response.isFree) {
        router.push(`/dashboard/confirm-payment?courseId=${params.id}`);
      } else {
        // console.log("FINDING DATA",response.data)
        console.log("FINDING LINK",response.link)
        window.location.href = response.link;
        // router.push(`/dashboard/confirm-payment?courseId=${params.id}`);
      }
      return;
    } catch (err) {
      const errMsg = extractErrorMessage(err);
      toast.error(errMsg, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setLoading(false);
    }
  };

  const getCouponCode = async (courseId: any) => {
    try {
      const response = await courseService.getUserCoupon(details?.couponId, courseId, authUser?.id);

      setDiscount(response);
      setCoupon(response.couponCode);
    } catch (err) {}
  };

  const validateCoupon = async () => {
    try {
      const response = await courseService.validateCoupon(coupon);
      if (response.couponDiscountValue) {
        setIsCouponSuccessful(true);
        setDiscount(response);
        setCoupon(response.couponCode);
      } else {
        setError("This coupon invalid");
        setIsCouponSuccessful(false);
      }
    } catch (err) {
      setError("This coupon invalid");
      setIsCouponSuccessful(false);
    }
  };

    function createOrder() {
    return fetch("/my-server/create-paypal-order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // use the "body" param to optionally pass additional order information
        // like product ids and quantities
        body: JSON.stringify({
            cart: [
                {
                    id: "YOUR_PRODUCT_ID",
                    quantity: "YOUR_PRODUCT_QUANTITY",
                },
            ],
        }),
    })
        .then((response) => response.json())
        .then((order) => order.id);
}
function onApprove(data) {
      return fetch("/my-server/capture-paypal-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: data.orderID
        })
      })
      .then((response) => response.json())
      .then((orderData) => {
            const name = orderData.payer.name.given_name;
            alert(`Transaction completed by ${name}`);
      });

    }

  useEffect(() => {
    fetchThisCourse(params.id);
  }, []);

  useEffect(() => {
    if (details && !coupon) {
      getCouponCode(params.id);
    }
  }, [details]);

  useEffect(() => {
    reCalculatePrice();
  }, [discount]);

  const fetchThisCourse = async (courseId: any) => {
    try {
      const response = await courseService.GetIndividualCourseDetails(courseId);
      setDetails(response);
      setPrice(response.coursePrice);
    } catch (err) {
      const errorMsg = extractErrorMessage(err);

      console.log("ERROR MSG", errorMsg)
      toast.error(errorMsg, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <section className="flex w-full min-h-screen h-auto">
      <SideBar logoUrl={logoUrl} secondaryColor={secondaryColor} />
      <main className="grow shrink-0 w-full lg:max-w-[77%] flex flex-col gap-6">
        <DashNav secondaryColor={secondaryColor} currentPage={"Courses"} />
        <div className="px-8">
          <h1 className="flex gap-2 font-base items-center text-gray-500 capitalize">
            <span className="cursor-pointer" onClick={() => router.push("/dashboard/courses")}>
              Course
            </span>
            <ChevronRight />
            <span className="cursor-pointer" onClick={() => router.push(`/dashboard/courses/${params.id}`)}>
              {details ? details.courseTitle : "..."}
            </span>
          </h1>
        </div>
        {details ? (
          <div>
            <section className="flex flex-col items-center gap-8 px-6 lg:px-36">
              <div className="flex flex-col-reverse lg:flex-row gap-2 w-full lg:w-2/3 cursor-pointer hover:bg-gray-50 border border-gray-200 rounded-lg p-2">
                <div className="flex flex-col gap-2 grow">
                  <div
                    className="flex justify-between font-bold
                                 p-2 border-b border-gray-100"
                  >
                    <p>{details.courseTitle}</p>
                  </div>
                  {/* <ul className='flex flex-col gap-1 text-gray-500 text-xs list-disc pl-8'>
                                    <li>
                                        {details.courseDescription}
                                    </li>
                                    <li>
                                        Server-Side Framework Mastery
                                    </li>
                                    <li>
                                        RESTful API Creation
                                    </li>
                                    <li>
                                        Database Integration Proficiency
                                    </li>
                                    <li>
                                        Deployment and Scalability
                                    </li>
                                </ul> */}
                  <div className="flex gap-8 mt-6 text-xs">
                    <p className="flex items-center gap-1">
                      <Book className="text-primary h-4" /> 12 Lessons
                    </p>
                    <p className="flex items-center gap-1">
                      <Clock10Icon className="text-primary h-4" /> 40 hrs 45 mins
                    </p>
                  </div>
                </div>
                <div className="w-full aspect-video lg:w-[30%] shrink-0 bg-gray-100 lg:h-full flex relative">
                  <Image src={courseImage} alt="course image" className="object-cover" fill />
                </div>
              </div>
            </section>
            <section className="lg:w-max px-6 lg:px-8 flex flex-col gap-8 lg:mx-auto py-16">
              <div className="flex flex-col items-center gap-8 ">
                <h1 className="text-lg font-semibold">Payment</h1>
                <h1 className="text-3xl font-semibold">#{price}</h1>
                <p className="text-lg font-semibold">Select your preferred payment plan</p>
                <RadioGroup
                  onValueChange={setSelectedPaymentType}
                  defaultValue={paymentOption.FULL}
                  className="flex flex-col lg:flex-row gap-6 flex-wrap"
                >
                  <Label
                    htmlFor="option-one"
                    className="flex flex-col p-4 rounded-lg hover:bg-gray-100 cursor-pointer border border-gray-300 gap-6 w-[240px] max-w-full"
                  >
                    <RadioGroupItem value={paymentOption.FULL} id={paymentOption.FULL} className="border-gray-700 text-gray-700" />
                    <div className="p-0 flex flex-col gap-3 list-disc">
                      <h1 className="font-semibold text-base">Pay now</h1>
                      <ul className="text-gray-500 text-sm flex flex-col gap-2">
                        <li>{price}</li>
                        <li>you pay only once</li>
                        <li>No other payment required</li>
                      </ul>
                    </div>
                  </Label>
                  <Label
                    htmlFor="option-two"
                    className="flex flex-col p-4 rounded-lg hover:bg-gray-100 cursor-pointer border border-gray-300 gap-6 w-[240px]"
                  >
                    <RadioGroupItem value={paymentOption.PARTIAL} id={paymentOption.PARTIAL} className="border-gray-700 text-gray-700" />
                    <div className="p-0 flex flex-col gap-3 list-disc">
                      <h1 className="font-semibold text-base">Pay in Installments</h1>
                      <ul className="text-gray-500 text-sm flex flex-col gap-2">
                        <li>40% = 72,000</li>
                        <li>30% = 54,000</li>
                        <li>30% = 54,000</li>
                      </ul>
                    </div>
                  </Label>
                </RadioGroup>
                <Button style={{ backgroundColor: secondaryColor }} className="w-full" onClick={() => initiateCoursePayment(params.id)}>
                  {loading ? "Loading..." : "Proceed"}
                </Button>
                   {/* <Button 
                      style={{ 
                        backgroundColor: 'transparent', 
                        borderColor: secondaryColor, 
                        borderWidth: '1px', 
                        borderStyle: 'solid' 
                      }} 
                      className="w-full flex items-center justify-center space-x-2 text-black" 
                      onClick={() => initiateCoursePayment(params.id)}
                    >
                      {loading ? "Loading..." : (
                        <>
                          
                          <span>Proceed with</span>
                          <FaPaypal />
                        </>
                      )}
                </Button> */}
                <PayPalScriptProvider options={{ clientId: "test" }}>
                   <div className="w-full">
                      <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                      />

                   </div>
                </PayPalScriptProvider>

                
                <Collapsible className="flex flex-col items-center gap-6 w-full">
                  <CollapsibleTrigger>Have a code?</CollapsibleTrigger>
                  <CollapsibleContent className="w-full">
                    <div className="w-full">
                      <label htmlFor="search" className="text-sm font-medium text-gray-900">
                        Enter coupon code
                      </label>
                      <div className="relative flex gap-3 items-center">
                        <input
                          type="search"
                          id="search"
                          className="block grow px-3 py-3 text-sm text-gray-900 border border-gray-200 rounded-md bg-gray-50"
                          placeholder="coupon code"
                          value={coupon}
                          onChange={(e) => {
                            setCoupon(e.target.value);
                            setDiscount(null);
                          }}
                          required
                        />
                        {discount ? (
                          <CheckCircleIcon className="text-green-500 w-8 h-8 shrink-0" />
                        ) : (
                          <button
                            type="submit"
                            style={{ backgroundColor: secondaryColor }}
                            className="text-white grow shrink focus:outline-none font-medium rounded-lg text-sm py-3 px-8"
                            onClick={validateCoupon}
                          >
                            Apply
                          </button>
                        )}
                      </div>
                      {error && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                          <span className="font-medium">Oh, snapp!</span> {error}
                        </p>
                      )}
                      {isCouponSuccessful && (
                        <p className="text-sm text-center w-full mt-8 text-gray-600">Excellent! Your coupon code has been successfully applied </p>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </section>
          </div>
        ) : (
          <div className="px-6">
            <Loader />
          </div>
        )}
      </main>
    </section>
  );
};

export default Page;
