"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  // updateUserProfile,
  updateUserAvatar,
  updateUser,
} from "@/store/slices/authSlice";
import { Button } from "@/components/ui/button";
import SideBar from "@/components/SideBar";
import DashNav from "@/components/DashNav";
import { unwrapResult } from "@reduxjs/toolkit";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import uploadService from "@/services/api/upload";
import { toast } from "react-toastify";
import imgPfp from "@/assets/prp_img.jpg";

const Page = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state: RootState) => state.auth.user);

  console.log("AUTH DATA: ", authUser);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    // id: authUser?.id || 0,
    firstName: authUser?.profile.firstName || "",
    lastName: authUser?.profile.lastName || "",
    email: authUser?.email || "",
    phoneNumber: authUser?.profile.phoneNumber || "",
    // state: authUser?.profile.state || '',
    // ageRange: authUser?.profile.ageRange || '',
    // employmentStatus: authUser?.profile.employmentStatus || '',
    // physicalAttendance: authUser?.profile.physicalAttendance || '',
    // country: authUser?.profile.country || '',
    // city: authUser?.profile.city || '',
    // gender: authUser?.profile.gender || '',
    // preferredCourse: authUser?.profile.preferredCourse || 0,
  });
  const [title, setTitle] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState<boolean>(false);
  const [imageDimensions, setImageDimensions] = useState({
    width: 100,
    height: 100,
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    authUser?.profile.avatarImageUrl || imgPfp.src
  );
  const [identificationFile, setIdentificationFile] = useState<File | null>(
    null
  );
  const [identificationNumber, setIdentificatioNumber] = useState<
    number | null
  >(authUser?.id || null);
  const pathname = usePathname();
  const logoUrl = sessionStorage.getItem("logoUrl") || "";
  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";

  const id = authUser?.id;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar(file);

      setAvatarPreview(URL.createObjectURL(file));
    }
  };
  const handleImageLoad = ({ target }: any) => {
    setImageDimensions({
      width: target.naturalWidth,
      height: target.naturalHeight,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsUpdatingAvatar(true);
    if (!authUser) return;
    try {
      const formData1 = new FormData();
      const formData2 = new FormData();
      // // Update user profile data
      // dispatch(updateUserProfile({
      //   ...authUser,
      //   profile: {
      //     ...formData,
      //     avatarImageUrl: authUser.profile.avatarImageUrl || '',
      //   }
      // }));

      if (avatar) {
        // Handle avatar upload (e.g., upload to server and get URL)
        // For now, we'll just simulate an upload and update the state
        // Append profile photo file to FormData
        formData1.append("file", avatar);
        console.log("FORM DATA: ", formData);
        // const avatarUrl = avatar && (await uploadService.UploadFiletoS3(formData));
        const avatarUrl =
          avatar && (await uploadService.UploadFiletoS3(formData1));
        // const avatarUrl = URL.createObjectURL(avatar);

        // Update user profile data

        const resultAction = await dispatch(
          updateUser({
            traineeId: id,
            data: {
              ...authUser,
              // firstName,
              // lastName,
              // phoneNumber,
              // documents: identificationUrl ? [identificationUrl] : [],
              ...(avatarUrl
                ? {
                    profile: {
                      ...formData,
                      avatarImageUrl: avatarUrl,
                    },
                  }
                : {}),
              ...(identificationFile
                ? { identificationFile: [identificationFile] }
                : {}),
              // ...(ssceCertificateUrl ? { ssceCertifcate: ssceCertificateUrl } : {}),
              // ...(nyscCertificateUrl ? { nyscCertificate: nyscCertificateUrl } : {}),
            },
          }) as any
        );

        // Unwrap the result using unwrapResult
        unwrapResult(resultAction);
        dispatch(
          updateUserProfile({
            ...authUser,
            profile: {
              ...formData,
              avatarImageUrl: avatarUrl,
            },
          })
        );
        dispatch(updateUserAvatar(avatarUrl));
      }

      toast.info("Updated Successfully");
    } catch (error: any) {
      console.log("errroe that occured", error);
      // toast.error(`${error.name} `);
      toast.error(`An error ocurred. Try again later `);
    } finally {
      setIsUpdatingAvatar(false);
    }
  };

  return (
    <section className="flex w-full min-h-screen h-auto">
      <SideBar logoUrl={logoUrl} secondaryColor={secondaryColor} />
      <main className="grow shrink-0 max-w-full lg:max-w-[77%] flex flex-col gap-6">
        <DashNav secondaryColor={secondaryColor} currentPage={""} />
        <section className="grow px-4 lg:px-8 flex flex-col gap-8">
          <article>
            <Tabs defaultValue="personal Information" className="">
              <TabsList className="mb-8 border-b-2 border-gray-200 w-full gap-12">
                <TabsTrigger
                  value="personal Information"
                  className="inline-block px-4 py-2 border-b-4 border-transparent rounded-none hover:text-gray-600 hover:border-gray-300 data-[state=active]:border-[#1D63FE]"
                >
                  Personal Information
                </TabsTrigger>
                <TabsTrigger
                  value="address"
                  className="inline-block px-4 py-2 border-b-4 border-transparent rounded-none hover:text-gray-600 hover:border-gray-300 data-[state=active]:border-[#1D63FE]"
                >
                  Address
                </TabsTrigger>
                <TabsTrigger
                  value="education"
                  className="inline-block px-4 py-2 border-b-4 border-transparent rounded-none hover:text-gray-600 hover:border-gray-300 data-[state=active]:border-[#1D63FE]"
                >
                  Education
                </TabsTrigger>
              </TabsList>
              <ul className="flex flex-col lg:flex-row gap-12 lg:gap-6">
                <li className="lg:w-1/4 h-fit shrink-0 py-8 px-4 border border-gray-200 rounded-lg">
                  <section className="flex flex-col items-center gap-6">
                    <div className="relative rounded-full border border-gray-200 w-1/2 aspect-square bg-gray-200">
                      <Image
                        // src={authUser?.profile.avatarImageUrl || imgPfp}
                        src={avatarPreview || imgPfp}
                        alt="profile image"
                        className="rounded-full"
                        // width={200} height={200}
                        fill
                        // layout="fill"
                        // objectFit="cover"
                        // width={imageDimensions.width} // Set width
                        // height={imageDimensions.height} // Set height
                        onLoad={handleImageLoad} // Update dimensions on load
                      />
                      <span className="absolute inline-flex items-center justify-center w-10 h-10 cursor-pointer hover:bg-red-200 text-xs font-bold text-foreground bg-gray-200 border-4 border-white rounded-full top-0 right-0">
                        <TrashIcon className="w-6 h-6" />
                      </span>
                    </div>
                    {/* <Button className="bg-secondary">Upload New Photo</Button>
                     */}
                    <label
                      htmlFor="avatar-upload"
                      className="bg-secondary p-2 text-white rounded cursor-pointer"
                    >
                      Upload New Photo
                    </label>
                    <input
                      type="file"
                      id="avatar-upload"
                      accept="image/*"
                      hidden
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                    <div className="flex flex-col gap-2 border border-gray-200 bg-gray-50 p-4 text-center rounded-lg">
                      <small className="text-gray-600">
                        Upload a new avatar. Larger image will be resized
                        automatically
                      </small>
                      <small className="font-semibold">
                        Maximum upload is 2MB
                      </small>
                    </div>
                    <div className="flex gap-1 text-sm mt-8">
                      Member since:{" "}
                      <b>{authUser?.createdAt || "20th August 2023"}</b>
                    </div>
                  </section>
                </li>
                <li className="lg:w-3/4 shrink-0  lg:p-8  border border-gray-200 rounded-lg">
                  {/* <h2 className="text-2xl font-semibold leading-7 text-gray-900 mb-6">Personal Information</h2> */}
                  <TabsContent
                    value="personal Information"
                    className="py-8 px-4"
                  >
                    <h2 className="text-2xl font-semibold leading-7 text-gray-900 mb-6">
                      Personal Information
                    </h2>
                    <Tabs defaultValue="login" className="w-full">
                      <TabsList>
                        <TabsTrigger
                          value="login"
                          className="inline-block px-4 py-2 border-b-4 border-transparent rounded-none hover:text-gray-600 hover:border-gray-300 data-[state=active]:border-[#1D63FE]"
                        >
                          Login Credentials
                        </TabsTrigger>
                        <TabsTrigger
                          value="user"
                          className="inline-block px-4 py-2 border-b-4 border-transparent rounded-none hover:text-gray-600 hover:border-gray-300 data-[state=active]:border-[#1D63FE]"
                        >
                          User Creentials
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="login" className="py-8 px-4">
                        <form onSubmit={handleSubmit}>
                          <section className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="username"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Email
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="email"
                                  id="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label
                                htmlFor="old_password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Old Password
                              </label>
                              <div className="mt-2">
                                <input
                                  type="password"
                                  name="old_password"
                                  id="old_password"
                                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label
                                htmlFor="pass"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Password
                              </label>
                              <div className="mt-2">
                                <input
                                  type="password"
                                  name="pass"
                                  id="pass"
                                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="conf-pass"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Confirm Password
                              </label>
                              <div className="mt-2">
                                <input
                                  type="password"
                                  name="conf-pass"
                                  id="conf-pass"
                                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                          </section>

                          {/* <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" className="text-sm font-semibold leading-6 border rounded-lg text-gray-900 px-4 py-2">
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="rounded-md bg-secondary px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
                      </TabsContent>
                      <TabsContent value="user" className="py-8 px-4">
                        <form onSubmit={handleSubmit}>
                          <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12 flex flex-col gap-8">
                              <section className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                  <label
                                    htmlFor="first-name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    First name
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      name="first-name"
                                      id="first-name"
                                      autoComplete="given-name"
                                      className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                  <label
                                    htmlFor="last-name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Last name
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      name="last-name"
                                      id="last-name"
                                      autoComplete="family-name"
                                      className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                  <label
                                    htmlFor="last-name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Mobile Number
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      name="mobile"
                                      id="mobile"
                                      autoComplete="mobile"
                                      className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>
                                <div className="sm:col-span-3">
                                  <label
                                    htmlFor="last-name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Date of Birth
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="date"
                                      name="dob"
                                      id="dob"
                                      autoComplete="dob"
                                      className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>
                                <div className="sm:col-span-3">
                                  <label
                                    htmlFor="last-name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Identfication Number
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      name="id_number"
                                      id="id_number"
                                      autoComplete="dob"
                                      className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>
                              </section>
                              {/* <section className="flex flex-col gap-6">
                                <div className="col-span-full">
                                  <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Identification (Int&apos;l passort, driver&apos;s licence, national ID...) <span className="text-primary">*</span>
                                  </label>
                                  <div className="mt-2 flex rounded-lg border border-dashed border-gray-900/25 py-4 px-4 flex-col gap-4 ">
                                    <div className="flex items-center gap-2">
                                      <PhotoIcon className=" h-12 w-12 text-gray-300" aria-hidden="true" />
                                      <p className="font-medium leading-5 text-gray-600">Upload Pdf, jpg, jpeg, png files only. Max file size 2MB</p>
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
                                      <Button type="button" className="bg-red-100 text-red-700 p-2 rounded-md">
                                        <TrashIcon className="w-5 h-5 " />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </section> */}
                            </div>
                          </div>

                          {/* <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button
                              type="button"
                              className="text-sm font-semibold leading-6 text-gray-900 border rounded-lg px-4 py-2"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="rounded-md bg-secondary px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
                      </TabsContent>
                    </Tabs>
                  </TabsContent>
                  <TabsContent value="address" className="py-8 px-4">
                    <form onSubmit={handleSubmit}>
                      <header>
                        <h2 className="text-2xl font-semibold leading-7 text-gray-900 mb-6">
                          Address
                        </h2>
                      </header>
                      <section className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                        <div className="sm:col-span-8">
                          <label
                            htmlFor="resaddress"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Residential Address
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="resaddress"
                              id="resaddress"
                              value={formData.email}
                              onChange={handleChange}
                              className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            City
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="city"
                              id="city"
                              className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="country_of_res"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Country of Residence
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="country_of_res"
                              id="country_of_res"
                              className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="state_of_origin"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            State of Origin
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="state_of_origin"
                              id="state_of_origin"
                              className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="local_govt"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Local Government
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="local_govt"
                              id="local_govt"
                              className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </section>

                      {/* <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                          type="button"
                          className="text-sm font-semibold leading-6 text-gray-900"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="rounded-md bg-secondary px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
                  </TabsContent>
                  <TabsContent value="education" className="py-8 px-4">
                    <form onSubmit={handleSubmit}>
                      <header>
                        <h2 className="text-2xl font-semibold leading-7 text-gray-900 mb-6">
                          Education
                        </h2>
                      </header>
                      <section className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="username"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Highest Qualification
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="email"
                              id="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="year_of_grad"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Year of Graduation
                          </label>
                          <div className="mt-2">
                            <input
                              type="date"
                              name="year_of_grad"
                              id="year_of_grad"
                              className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="institution"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Institution Name
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="institution"
                              id="institution"
                              className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="course_of_study"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Course of Study
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="course_of_study"
                              id="course_of_study"
                              className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </section>

                      {/* <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                          type="button"
                          className="text-sm font-semibold leading-6 text-gray-900"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="rounded-md bg-secondary px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
                  </TabsContent>
                </li>
              </ul>
            </Tabs>
          </article>
        </section>
      </main>
    </section>
  );
};

export default Page;
