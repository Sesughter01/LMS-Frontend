"use client";

import { Button } from "@/components/ui/button";
import SideBar from "@/components/SideBar";
import DashNav from "@/components/DashNav";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";

import imgPfp from "@/assets/prp_img.jpg";

const Page = () => {
  const pathname = usePathname();
  const logoUrl = sessionStorage.getItem("logoUrl") || "";
  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";

  return (
    <section className="flex w-full min-h-screen h-auto">
      <SideBar logoUrl={logoUrl} secondaryColor={secondaryColor} />
      <main className="grow shrink-0 max-w-full lg:max-w-[77%] flex flex-col gap-6">
        <DashNav secondaryColor={secondaryColor} currentPage={""} />
        <section className="grow px-6 lg:px-8 flex flex-col gap-8">
          <article className="lg:w-2/3">
            <h2 className="text-2xl font-semibold leading-7 text-gray-900 mb-10">Edit Profile</h2>
            <form>
              <section className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                <div className="col-span-full">
                  <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                    Residential address <span className="text-primary">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="street-address"
                      id="street-address"
                      autoComplete="street-address"
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3 sm:col-start-1">
                  <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                    City <span className="text-primary">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="address-level2"
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                    Country of Reesidence <span className="text-primary">*</span>
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 py-2.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                    State of Origin <span className="text-primary">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="region"
                      id="region"
                      autoComplete="address-level1"
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="loc-gov" className="block text-sm font-medium leading-6 text-gray-900">
                    Local Government <span className="text-primary">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="loc-gov"
                      id="loc-gov"
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </section>

              {/* <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Update Info
                </button>
              </div> */}
              {/* Added by Shakirat */}
              <div className="mt-6 flex items-center justify-start gap-x-6">
                            <button
                              type="button"
                              className="text-sm font-semibold leading-6 border rounded-lg text-gray-900 px-4 py-2"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="rounded-md bg-secondary px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              Update Info
                            </button>
                          </div>
            </form>
          </article>
        </section>
      </main>
    </section>
  );
};

export default Page;
