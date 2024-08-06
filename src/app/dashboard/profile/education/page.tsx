"use client";

import { Button } from "@/components/ui/button";
import SideBar from "@/components/SideBar";
import DashNav from "@/components/DashNav";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { PhotoIcon, PlusIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";

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
            <h2 className="text-2xl font-semibold leading-7 text-gray-900 mb-10">
              Edit Profile
            </h2>
            <form>
              <section className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                <div className="col-span-3">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Highest Qualification{" "}
                    <span className="text-primary">*</span>
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

                <div className="col-span-3 ">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Year of Graduation <span className="text-primary">*</span>
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

                <div className="col-span-3 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Institution name <span className="text-primary">*</span>
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

                <div className="col-span-3">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Course of Study <span className="text-primary">*</span>
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
              </section>
              <section className="flex flex-col gap-6 mt-6">
                <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Degree certificate <span className="text-primary">*</span>
                  </label>
                  <div className="mt-2 flex rounded-lg border border-dashed border-gray-900/25 py-4 px-4 flex-col gap-4 ">
                    <div className="flex items-center gap-2">
                      <PhotoIcon
                        className=" h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                      <p className="font-medium leading-5 text-gray-600">
                        Upload Pdf, jpg, jpeg, png files only. Max file size 2MB
                      </p>
                    </div>
                    <div className="flex justify-between items-center rounded-md border border-gray-200 px-4 p-2">
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                                                                            file:text-sm file:font-semibold
                                                                            file:bg-violet-50 file:text-indigo-700
                                                                            hover:file:bg-violet-100 cursor-pointer"
                      />
                      <Button
                        type="button"
                        className="bg-red-100 text-red-700 p-2 rounded-md"
                      >
                        <TrashIcon className="w-4 h-4 " />
                      </Button>
                    </div>
                  </div>
                </div>

                <Button
                  type="button"
                  variant={"outline"}
                  className="hover:bg-gray-100 w-fit flex gap-2 items-center"
                >
                  <PlusIcon className="w-5 h-5" />
                  Add another educational background
                </Button>
              </section>

              {/* <div className="mt-12 flex items-center justify-end gap-x-6">
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
