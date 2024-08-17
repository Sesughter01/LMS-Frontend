/* eslint-disable react/no-unescaped-entities */
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";

interface Step2Props {
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (key: string, value: any) => void;
  data: any;
  onLoading: (loading: boolean) => void;
  program: any;
  allCohorts: any;
  courses: any;
  loadingCourses: boolean;
  secondaryColor: any;
}

const Step2: React.FC<Step2Props> = ({
  onNext,
  onPrevious,
  onUpdate,
  data,
  onLoading,
  program,
  allCohorts,
  courses,
  loadingCourses,
  secondaryColor,
}) => {


    const [errors, setErrors] = useState({
      city: "",
      state: "",
      country: "",
      ageRange: "",
      employmentStatus: "",
      preferredCohort: "",
      preferredCourse: "",
    });
    const [selectedCohort, setSelectedCohort] = useState("");
    console.log("COURSES DATA IN FORM", courses);
    if (!Array.isArray(courses)) {
      courses = [];
    }

    const handleNextClick = () => {
      const {
        city,
        state,
        country,
        ageRange,
        employmentStatus,
        preferredCohort,
        preferredCourse,
      } = data;
      const newErrors = {
        city: city ? "" : "City is required",
        state: state ? "" : "State is required",
        country: country ? "" : "Country is required",
        ageRange: ageRange ? "" : "Age Range is required",
        employmentStatus: employmentStatus
          ? ""
          : "Employment Status is required",
        preferredCohort:
          preferredCohort !== 0 ? "" : "Preferred Cohort is required",
        preferredCourse:
          preferredCourse !== 0 ? "" : "Preferred Course is required",
      };
      setErrors(newErrors);
      if (Object.values(newErrors).every((error) => !error)) {
        onNext();
      } else {
        // Show error message using toast
        const err1 = Object.values(newErrors).filter((e) => e !== "")[0];
        // console.log("errr1", err1, newErrors)
        toast.error(err1);
        // toast.error('Please fill in all required fields.');
      }
      // setErrors(newErrors);
      // if (Object.values(newErrors).every((error) => !error)) {
      //   onNext();
      // } else {
      //   toast.error("Please fill in all required fields.");
      // }
    };

  return (
    <>
      <div className="flex gap-10 w-full justify-between  px-5 lg:px-10 mt-14">
        <ChevronLeft
          style={{ backgroundColor: secondaryColor }}
          onClick={onPrevious}
          className="rounded-full w-8 h-8 text-white cursor-pointer"
        />
        <div>
          <h1 style={{ color: secondaryColor }} className="text-2xl font-bold">
            Sign Up
          </h1>
          <small className="text-gray-500">You&#39;re almost done!</small>
          <section className="flex flex-col gap-3 min-w-[380px] min-h-[600px]">
            <ul className="w-full flex gap-2">
              <li
                style={{ backgroundColor: secondaryColor }}
                className="grow shrink-0 h-1 rounded-full"
              ></li>
              <li
                style={{ backgroundColor: secondaryColor }}
                className="grow shrink-0 h-1 rounded-full"
              ></li>
              <li className="grow shrink-0 h-1 rounded-full bg-gray-200"></li>
            </ul>
            <div className="App">
              <form className="flex flex-col gap-2">
                <div className="flex flex-col gap-2 ">
                  <small className="text-xs font-semibold">City</small>
                  <input
                    type="text"
                    value={data.city}
                    onChange={(e) => onUpdate("city", e.target.value)}
                    id="city"
                    className="outline-0 text-sm border px-3 py-2 rounded-sm border-gray-300"
                    placeholder="Enter your city"
                  />
                  {data.city === "" && errors.city && (
                    <div className="text-red-500 text-xs">{errors.city}</div>
                  )}
                </div>

                <div className="flex flex-col gap-2 ">
                  <small className="text-xs font-semibold">State</small>
                  <input
                    type="text"
                    value={data.state}
                    onChange={(e) => onUpdate("state", e.target.value)}
                    id="state"
                    className="outline-0 text-sm border px-3 py-2 rounded-sm border-gray-300"
                    placeholder="Enter your state"
                  />
                  {data.state === "" && errors.state && (
                    <div className="text-red-500 text-xs">{errors.state}</div>
                  )}
                </div>

                <div className="flex flex-col gap-2 ">
                  <small className="text-xs font-semibold">Country</small>

                  <select
                    className="outline-0 text-sm border px-3 py-2 rounded-sm border-gray-300"
                    value={data.country}
                    onChange={(e) => onUpdate("country", e.target.value)}
                  >
                    <option value="">Select Option</option>
                    <option value={"Afghanistan"}>Afghanistan</option>
                    <option value={"Aland Islands"}>Aland Islands</option>
                    <option value={"Albania"}>Albania</option>
                    <option value={"Algeria"}>Algeria</option>
                    <option value={"American Samoa"}>American Samoa</option>
                    <option value={"Andorra"}>Andorra</option>
                    <option value={"Angola"}>Angola</option>
                    <option value={"Anguilla"}>Anguilla</option>
                    <option value={"Antarctica"}>Antarctica</option>
                    <option value={"Antigua and Barbuda"}>
                      Antigua and Barbuda
                    </option>
                    <option value={"Argentina"}>Argentina</option>
                    <option value={"Armenia"}>Armenia</option>
                    <option value={"Aruba"}>Aruba</option>
                    <option value={"Australia"}>Australia</option>
                    <option value={"Austria"}>Austria</option>
                    <option value={"Azerbaijan"}>Azerbaijan</option>
                    <option value={"Bahamas"}>Bahamas</option>
                    <option value={"Bahrain"}>Bahrain</option>
                    <option value={"Bangladesh"}>Bangladesh</option>
                    <option value={"Barbados"}>Barbados</option>
                    <option value={"Belarus"}>Belarus</option>
                    <option value={"Belgium"}>Belgium</option>
                    <option value={"Belize"}>Belize</option>
                    <option value={"Benin"}>Benin</option>
                    <option value={"Bermuda"}>Bermuda</option>
                    <option value={"Bhutan"}>Bhutan</option>
                    <option value={"Bolivia"}>Bolivia</option>
                    <option value={"Bonaire, Sint Eustatius and Saba"}>
                      Bonaire, Sint Eustatius and Saba
                    </option>
                    <option value={"Bosnia and Herzegovina"}>
                      Bosnia and Herzegovina
                    </option>
                    <option value={"Botswana"}>Botswana</option>
                    <option value={"Bouvet Island"}>Bouvet Island</option>
                    <option value={"Brazil"}>Brazil</option>
                    <option value={"British Indian Ocean Territory"}>
                      British Indian Ocean Territory
                    </option>
                    <option value={"Brunei Darussalam"}>Brunei Darussalam</option>
                    <option value={"Bulgaria"}>Bulgaria</option>
                    <option value={"Burkina Faso"}>Burkina Faso</option>
                    <option value={"Burundi"}>Burundi</option>
                    <option value={"Cambodia"}>Cambodia</option>
                    <option value={"Cameroon"}>Cameroon</option>
                    <option value={"Canada"}>Canada</option>
                    <option value={"Cape Verde"}>Cape Verde</option>
                    <option value={"Cayman Islands"}>Cayman Islands</option>
                    <option value={"Central African Republic"}>
                      Central African Republic
                    </option>
                    <option value={"Chad"}>Chad</option>
                    <option value={"Chile"}>Chile</option>
                    <option value={"China"}>China</option>
                    <option value={"Christmas Island"}>Christmas Island</option>
                    <option value={"Cocos (Keeling) Islands"}>
                      Cocos (Keeling) Islands
                    </option>
                    <option value={"Colombia"}>Colombia</option>
                    <option value={"Comoros"}>Comoros</option>
                    <option value={"Congo"}>Congo</option>
                    <option value={"Congo, Democratic Republic of the Congo"}>
                      Congo, Democratic Republic of the Congo
                    </option>
                    <option value={"Cook Islands"}>Cook Islands</option>
                    <option value={"Costa Rica"}>Costa Rica</option>
                    <option value={"Cote D'Ivoire"}>Cote D'Ivoire</option>
                    <option value={"Croatia"}>Croatia</option>
                    <option value={"Cuba"}>Cuba</option>
                    <option value={"Curacao"}>Curacao</option>
                    <option value={"Cyprus"}>Cyprus</option>
                    <option value={"Czech Republic"}>Czech Republic</option>
                    <option value={"Denmark"}>Denmark</option>
                    <option value={"Djibouti"}>Djibouti</option>
                    <option value={"Dominica"}>Dominica</option>
                    <option value={"Dominican Republic"}>Dominican Republic</option>
                    <option value={"Ecuador"}>Ecuador</option>
                    <option value={"Egypt"}>Egypt</option>
                    <option value={"El Salvador"}>El Salvador</option>
                    <option value={"Equatorial Guinea"}>Equatorial Guinea</option>
                    <option value={"Eritrea"}>Eritrea</option>
                    <option value={"Estonia"}>Estonia</option>
                    <option value={"Ethiopia"}>Ethiopia</option>
                    <option value={"Falkland Islands (Malvinas)"}>
                      Falkland Islands (Malvinas)
                    </option>
                    <option value={"Faroe Islands"}>Faroe Islands</option>
                    <option value={"Fiji"}>Fiji</option>
                    <option value={"Finland"}>Finland</option>
                    <option value={"France"}>France</option>
                    <option value={"French Guiana"}>French Guiana</option>
                    <option value={"French Polynesia"}>French Polynesia</option>
                    <option value={"French Southern Territories"}>
                      French Southern Territories
                    </option>
                    <option value={"Gabon"}>Gabon</option>
                    <option value={"Gambia"}>Gambia</option>
                    <option value={"Georgia"}>Georgia</option>
                    <option value={"Germany"}>Germany</option>
                    <option value={"Ghana"}>Ghana</option>
                    <option value={"Gibraltar"}>Gibraltar</option>
                    <option value={"Greece"}>Greece</option>
                    <option value={"Greenland"}>Greenland</option>
                    <option value={"Grenada"}>Grenada</option>
                    <option value={"Guadeloupe"}>Guadeloupe</option>
                    <option value={"Guam"}>Guam</option>
                    <option value={"Guatemala"}>Guatemala</option>
                    <option value={"Guernsey"}>Guernsey</option>
                    <option value={"Guinea"}>Guinea</option>
                    <option value={"Guinea-Bissau"}>Guinea-Bissau</option>
                    <option value={"Guyana"}>Guyana</option>
                    <option value={"Haiti"}>Haiti</option>
                    <option value={"Heard Island and Mcdonald Islands"}>
                      Heard Island and Mcdonald Islands
                    </option>
                    <option value={"Holy See (Vatican City State)"}>
                      Holy See (Vatican City State)
                    </option>
                    <option value={"Honduras"}>Honduras</option>
                    <option value={"Hong Kong"}>Hong Kong</option>
                    <option value={"Hungary"}>Hungary</option>
                    <option value={"Iceland"}>Iceland</option>
                    <option value={"India"}>India</option>
                    <option value={"Indonesia"}>Indonesia</option>
                    <option value={"Iran, Islamic Republic of"}>
                      Iran, Islamic Republic of
                    </option>
                    <option value={"Iraq"}>Iraq</option>
                    <option value={"Ireland"}>Ireland</option>
                    <option value={"Isle of Man"}>Isle of Man</option>
                    <option value={"Israel"}>Israel</option>
                    <option value={"Italy"}>Italy</option>
                    <option value={"Jamaica"}>Jamaica</option>
                    <option value={"Japan"}>Japan</option>
                    <option value={"Jersey"}>Jersey</option>
                    <option value={"Jordan"}>Jordan</option>
                    <option value={"Kazakhstan"}>Kazakhstan</option>
                    <option value={"Kenya"}>Kenya</option>
                    <option value={"Kiribati"}>Kiribati</option>
                    <option value={"Korea, Democratic People's Republic of"}>
                      Korea, Democratic People's Republic of
                    </option>
                    <option value={"Korea, Republic of"}>Korea, Republic of</option>
                    <option value={"Kosovo"}>Kosovo</option>
                    <option value={"Kuwait"}>Kuwait</option>
                    <option value={"Kyrgyzstan"}>Kyrgyzstan</option>
                    <option value={"Lao People's Democratic Republic"}>
                      Lao People's Democratic Republic
                    </option>
                    <option value={"Latvia"}>Latvia</option>
                    <option value={"Lebanon"}>Lebanon</option>
                    <option value={"Lesotho"}>Lesotho</option>
                    <option value={"Liberia"}>Liberia</option>
                    <option value={"Libyan Arab Jamahiriya"}>
                      Libyan Arab Jamahiriya
                    </option>
                    <option value={"Liechtenstein"}>Liechtenstein</option>
                    <option value={"Lithuania"}>Lithuania</option>
                    <option value={"Luxembourg"}>Luxembourg</option>
                    <option value={"Macao"}>Macao</option>
                    <option value={"Macedonia, the Former Yugoslav Republic of"}>
                      Macedonia, the Former Yugoslav Republic of
                    </option>
                    <option value={"Madagascar"}>Madagascar</option>
                    <option value={"Malawi"}>Malawi</option>
                    <option value={"Malaysia"}>Malaysia</option>
                    <option value={"Maldives"}>Maldives</option>
                    <option value={"Mali"}>Mali</option>
                    <option value={"Malta"}>Malta</option>
                    <option value={"Marshall Islands"}>Marshall Islands</option>
                    <option value={"Martinique"}>Martinique</option>
                    <option value={"Mauritania"}>Mauritania</option>
                    <option value={"Mauritius"}>Mauritius</option>
                    <option value={"Mayotte"}>Mayotte</option>
                    <option value={"Mexico"}>Mexico</option>
                    <option value={"Micronesia, Federated States of"}>
                      Micronesia, Federated States of
                    </option>
                    <option value={"Moldova, Republic of"}>
                      Moldova, Republic of
                    </option>
                    <option value={"Monaco"}>Monaco</option>
                    <option value={"Mongolia"}>Mongolia</option>
                    <option value={"Montenegro"}>Montenegro</option>
                    <option value={"Montserrat"}>Montserrat</option>
                    <option value={"Morocco"}>Morocco</option>
                    <option value={"Mozambique"}>Mozambique</option>
                    <option value={"Myanmar"}>Myanmar</option>
                    <option value={"Namibia"}>Namibia</option>
                    <option value={"Nauru"}>Nauru</option>
                    <option value={"Nepal"}>Nepal</option>
                    <option value={"Netherlands"}>Netherlands</option>
                    <option value={"Netherlands Antilles"}>
                      Netherlands Antilles
                    </option>
                    <option value={"New Caledonia"}>New Caledonia</option>
                    <option value={"New Zealand"}>New Zealand</option>
                    <option value={"Nicaragua"}>Nicaragua</option>
                    <option value={"Niger"}>Niger</option>
                    <option value={"Nigeria"}>Nigeria</option>
                    <option value={"Niue"}>Niue</option>
                    <option value={"Norfolk Island"}>Norfolk Island</option>
                    <option value={"Northern Mariana Islands"}>
                      Northern Mariana Islands
                    </option>
                    <option value={"Norway"}>Norway</option>
                    <option value={"Oman"}>Oman</option>
                    <option value={"Pakistan"}>Pakistan</option>
                    <option value={"Palau"}>Palau</option>
                    <option value={"Palestinian Territory, Occupied"}>
                      Palestinian Territory, Occupied
                    </option>
                    <option value={"Panama"}>Panama</option>
                    <option value={"Papua New Guinea"}>Papua New Guinea</option>
                    <option value={"Paraguay"}>Paraguay</option>
                    <option value={"Peru"}>Peru</option>
                    <option value={"Philippines"}>Philippines</option>
                    <option value={"Pitcairn"}>Pitcairn</option>
                    <option value={"Poland"}>Poland</option>
                    <option value={"Portugal"}>Portugal</option>
                    <option value={"Puerto Rico"}>Puerto Rico</option>
                    <option value={"Qatar"}>Qatar</option>
                    <option value={"Reunion"}>Reunion</option>
                    <option value={"Romania"}>Romania</option>
                    <option value={"Russian Federation"}>Russian Federation</option>
                    <option value={"Rwanda"}>Rwanda</option>
                    <option value={"Saint Barthelemy"}>Saint Barthelemy</option>
                    <option value={"Saint Helena"}>Saint Helena</option>
                    <option value={"Saint Kitts and Nevis"}>
                      Saint Kitts and Nevis
                    </option>
                    <option value={"Saint Lucia"}>Saint Lucia</option>
                    <option value={"Saint Martin"}>Saint Martin</option>
                    <option value={"Saint Pierre and Miquelon"}>
                      Saint Pierre and Miquelon
                    </option>
                    <option value={"Saint Vincent and the Grenadines"}>
                      Saint Vincent and the Grenadines
                    </option>
                    <option value={"Samoa"}>Samoa</option>
                    <option value={"San Marino"}>San Marino</option>
                    <option value={"Sao Tome and Principe"}>
                      Sao Tome and Principe
                    </option>
                    <option value={"Saudi Arabia"}>Saudi Arabia</option>
                    <option value={"Senegal"}>Senegal</option>
                    <option value={"Serbia"}>Serbia</option>
                    <option value={"Serbia and Montenegro"}>
                      Serbia and Montenegro
                    </option>
                    <option value={"Seychelles"}>Seychelles</option>
                    <option value={"Sierra Leone"}>Sierra Leone</option>
                    <option value={"Singapore"}>Singapore</option>
                    <option value={"Sint Maarten"}>Sint Maarten</option>
                    <option value={"Slovakia"}>Slovakia</option>
                    <option value={"Slovenia"}>Slovenia</option>
                    <option value={"Solomon Islands"}>Solomon Islands</option>
                    <option value={"Somalia"}>Somalia</option>
                    <option value={"South Africa"}>South Africa</option>
                    <option value={"South Georgia and the South Sandwich Islands"}>
                      South Georgia and the South Sandwich Islands
                    </option>
                    <option value={"South Sudan"}>South Sudan</option>
                    <option value={"Spain"}>Spain</option>
                    <option value={"Sri Lanka"}>Sri Lanka</option>
                    <option value={"Sudan"}>Sudan</option>
                    <option value={"Suriname"}>Suriname</option>
                    <option value={"Svalbard and Jan Mayen"}>
                      Svalbard and Jan Mayen
                    </option>
                    <option value={"Swaziland"}>Swaziland</option>
                    <option value={"Sweden"}>Sweden</option>
                    <option value={"Switzerland"}>Switzerland</option>
                    <option value={"Syrian Arab Republic"}>
                      Syrian Arab Republic
                    </option>
                    <option value={"Taiwan, Province of China"}>
                      Taiwan, Province of China
                    </option>
                    <option value={"Tajikistan"}>Tajikistan</option>
                    <option value={"Tanzania, United Republic of"}>
                      Tanzania, United Republic of
                    </option>
                    <option value={"Thailand"}>Thailand</option>
                    <option value={"Timor-Leste"}>Timor-Leste</option>
                    <option value={"Togo"}>Togo</option>
                    <option value={"Tokelau"}>Tokelau</option>
                    <option value={"Tonga"}>Tonga</option>
                    <option value={"Trinidad and Tobago"}>
                      Trinidad and Tobago
                    </option>
                    <option value={"Tunisia"}>Tunisia</option>
                    <option value={"Turkey"}>Turkey</option>
                    <option value={"Turkmenistan"}>Turkmenistan</option>
                    <option value={"Turks and Caicos Islands"}>
                      Turks and Caicos Islands
                    </option>
                    <option value={"Tuvalu"}>Tuvalu</option>
                    <option value={"Uganda"}>Uganda</option>
                    <option value={"Ukraine"}>Ukraine</option>
                    <option value={"United Arab Emirates"}>
                      United Arab Emirates
                    </option>
                    <option value={"United Kingdom"}>United Kingdom</option>
                    <option value={"United States"}>United States</option>
                    <option value={"United States Minor Outlying Islands"}>
                      United States Minor Outlying Islands
                    </option>
                    <option value={"Uruguay"}>Uruguay</option>
                    <option value={"Uzbekistan"}>Uzbekistan</option>
                    <option value={"Vanuatu"}>Vanuatu</option>
                    <option value={"Venezuela"}>Venezuela</option>
                    <option value={"Viet Nam"}>Viet Nam</option>
                    <option value={"Virgin Islands, British"}>
                      Virgin Islands, British
                    </option>
                    <option value={"Virgin Islands, U.s."}>
                      Virgin Islands, U.s.
                    </option>
                    <option value={"Wallis and Futuna"}>Wallis and Futuna</option>
                    <option value={"Western Sahara"}>Western Sahara</option>
                    <option value={"Yemen"}>Yemen</option>
                    <option value={"Zambia"}>Zambia</option>
                    <option value={"Zimbabwe"}>Zimbabwe</option>
                  </select>
                  {data.country === "" && errors.country && (
                    <div className="text-red-500 text-xs">{errors.country}</div>
                  )}
                </div>

                <div className="flex flex-col gap-2 ">
                  <small className="text-xs font-semibold">Age Range</small>

                  {program ? (
                    <select
                      className="outline-0 text-sm border px-3 py-2 rounded-sm border-gray-300"
                      value={data.ageRange}
                      onChange={(e) => onUpdate("ageRange", e.target.value)}
                    >
                      <option value="">Select Option</option>
                      <option value={"18-25"}>18 - 25</option>
                      <option value={"25-35"}>25 - 35</option>
                      <option value={"35-45"}>35 - 45</option>
                      <option value={">45"}> &gt; 45</option>
                    </select>
                  ) : (
                    <InputLoading />
                  )}
                  {data.ageRange === "" && errors.ageRange && (
                    <div className="text-red-500 text-xs">{errors.ageRange}</div>
                  )}
                </div>

                <div className="flex flex-col gap-2 ">
                  <small className="text-xs font-semibold">Employment Status</small>

                  {program ? (
                    <select
                      value={data.employmentStatus}
                      onChange={(e) => onUpdate("employmentStatus", e.target.value)}
                      className="outline-0 text-sm border px-3 py-2 rounded-sm border-gray-300"
                    >
                      <option value="">Select Option</option>
                      <option value={"Self-Employed"}>Self Employed</option>
                      <option value={"UnEmployed"}>Unemployed</option>
                      <option value={"employed"}>Employed</option>
                    </select>
                  ) : (
                    <InputLoading />
                  )}
                  {data.employmentStatus === "" && errors.employmentStatus && (
                    <div className="text-red-500 text-xs">
                      {errors.employmentStatus}
                    </div>
                  )}
                </div>
                

                <div className="flex flex-col gap-2 ">
                  <small className="text-xs font-semibold">Preferred Start Date (required)</small>
                  {!loadingCourses && allCohorts ? (
                    <select
                      className="outline-0 text-sm border px-3 py-2 rounded-sm border-gray-300"
                      value={data.preferredCohort}
                      onChange={(e) => {
                        onUpdate("preferredCohort", Number(e.target.value));
                      }}
                    >
                      <option value="" selected>
                        Select Option
                      </option>
                      {allCohorts.map((cohort: any) => {
                        return (
                          <option value={cohort.id} key={cohort.id}>
                            {cohort.cohortName}
                          </option>
                        );
                      })}
                    </select>
                  ) : (
                    <InputLoading />
                  )}
                  {(data.preferredCohort === "" || data.preferredCohort <= 0) &&
                    (errors.preferredCourse || data.preferredCourse === "") && (
                      <div className="text-red-500 text-xs">
                        {errors.preferredCohort}
                      </div>
                    )}
                
                </div>

                {<div className="flex flex-col gap-2 ">
                  <small className="text-xs font-semibold">Preferred course (required)</small>
                  {!loadingCourses && courses ? (
                    <select
                      className="outline-0 text-sm border px-3 py-2 rounded-sm border-gray-300"
                      value={data.preferredCourse}
                      onChange={(e) => {
                        onUpdate("preferredCourse", Number(e.target.value));
                      }}
                    >
                      <option value="" >
                        Select Option
                      </option>
                      {courses.map((course: any) => {
                        return (
                          <option value={course.id} key={course.id}>
                            {course.courseTitle}
                          </option>
                        );
                      })}
                    </select>
                  ) : (
                    <InputLoading />
                  )}
                  {(data.preferredCohort === "" || data.preferredCohort <= 0) &&
                    (errors.preferredCourse || data.preferredCourse === "") && (
                      <div className="text-red-500 text-xs">
                        {errors.preferredCourse}
                      </div>
                    )}
                </div> }

                <Button
                  style={{ color: '#F305F8' }}
                  variant={"ghost"}
                  type="button"
                  className=""
                  onClick={handleNextClick}
                >
                  Proceed
                </Button>

                <small className="text-center font-semibold ">
                  Already have an account?{" "}
                  <Link
                    style={{ color: '#F305F8'}}
                    href={"/login"}
                    className=""
                  >
                    Log in
                  </Link>
                </small>
              </form>
            </div>
          </section>
        </div>
        <div className="flex items-start">
          <img className="relative h-[24px] w-[24px]" src="/icons/globe.svg" alt="gloge" />
          EN
        </div>
      </div>
      {/* <section className="flex flex-col gap-8 min-w-[380px] min-h-[600px]">
        <ul className="w-full flex gap-2">
          <li
            style={{ backgroundColor: secondaryColor }}
            className="grow shrink-0 h-1 rounded-full"
          ></li>
          <li
            style={{ backgroundColor: secondaryColor }}
            className="grow shrink-0 h-1 rounded-full"
          ></li>
          <li className="grow shrink-0 h-1 rounded-full bg-gray-200"></li>
        </ul>
        <div className="App">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 ">
              <small className="text-xs font-semibold">City</small>
              <input
                type="text"
                value={data.city}
                onChange={(e) => onUpdate("city", e.target.value)}
                id="city"
                className="outline-0 text-sm border px-3 py-2 rounded-sm border-gray-300"
                placeholder="Enter your city"
              />
              {data.city === "" && errors.city && (
                <div className="text-red-500 text-xs">{errors.city}</div>
              )}
            </div>

            <div className="flex flex-col gap-2 ">
              <small className="text-xs font-semibold">State</small>
              <input
                type="text"
                value={data.state}
                onChange={(e) => onUpdate("state", e.target.value)}
                id="state"
                className="outline-0 text-sm border px-3 py-2 rounded-sm border-gray-300"
                placeholder="Enter your state"
              />
              {data.state === "" && errors.state && (
                <div className="text-red-500 text-xs">{errors.state}</div>
              )}
            </div>

            <div className="flex flex-col gap-2 ">
              <small className="text-xs font-semibold">Country</small>

              <select
                className="outline-0 text-sm border px-3 py-2 rounded-sm border-gray-300"
                value={data.country}
                onChange={(e) => onUpdate("country", e.target.value)}
              >
                <option value="">Select Option</option>
                <option value={"Afghanistan"}>Afghanistan</option>
                <option value={"Aland Islands"}>Aland Islands</option>
                <option value={"Albania"}>Albania</option>
                <option value={"Algeria"}>Algeria</option>
                <option value={"American Samoa"}>American Samoa</option>
                <option value={"Andorra"}>Andorra</option>
                <option value={"Angola"}>Angola</option>
                <option value={"Anguilla"}>Anguilla</option>
                <option value={"Antarctica"}>Antarctica</option>
                <option value={"Antigua and Barbuda"}>
                  Antigua and Barbuda
                </option>
                <option value={"Argentina"}>Argentina</option>
                <option value={"Armenia"}>Armenia</option>
                <option value={"Aruba"}>Aruba</option>
                <option value={"Australia"}>Australia</option>
                <option value={"Austria"}>Austria</option>
                <option value={"Azerbaijan"}>Azerbaijan</option>
                <option value={"Bahamas"}>Bahamas</option>
                <option value={"Bahrain"}>Bahrain</option>
                <option value={"Bangladesh"}>Bangladesh</option>
                <option value={"Barbados"}>Barbados</option>
                <option value={"Belarus"}>Belarus</option>
                <option value={"Belgium"}>Belgium</option>
                <option value={"Belize"}>Belize</option>
                <option value={"Benin"}>Benin</option>
                <option value={"Bermuda"}>Bermuda</option>
                <option value={"Bhutan"}>Bhutan</option>
                <option value={"Bolivia"}>Bolivia</option>
                <option value={"Bonaire, Sint Eustatius and Saba"}>
                  Bonaire, Sint Eustatius and Saba
                </option>
                <option value={"Bosnia and Herzegovina"}>
                  Bosnia and Herzegovina
                </option>
                <option value={"Botswana"}>Botswana</option>
                <option value={"Bouvet Island"}>Bouvet Island</option>
                <option value={"Brazil"}>Brazil</option>
                <option value={"British Indian Ocean Territory"}>
                  British Indian Ocean Territory
                </option>
                <option value={"Brunei Darussalam"}>Brunei Darussalam</option>
                <option value={"Bulgaria"}>Bulgaria</option>
                <option value={"Burkina Faso"}>Burkina Faso</option>
                <option value={"Burundi"}>Burundi</option>
                <option value={"Cambodia"}>Cambodia</option>
                <option value={"Cameroon"}>Cameroon</option>
                <option value={"Canada"}>Canada</option>
                <option value={"Cape Verde"}>Cape Verde</option>
                <option value={"Cayman Islands"}>Cayman Islands</option>
                <option value={"Central African Republic"}>
                  Central African Republic
                </option>
                <option value={"Chad"}>Chad</option>
                <option value={"Chile"}>Chile</option>
                <option value={"China"}>China</option>
                <option value={"Christmas Island"}>Christmas Island</option>
                <option value={"Cocos (Keeling) Islands"}>
                  Cocos (Keeling) Islands
                </option>
                <option value={"Colombia"}>Colombia</option>
                <option value={"Comoros"}>Comoros</option>
                <option value={"Congo"}>Congo</option>
                <option value={"Congo, Democratic Republic of the Congo"}>
                  Congo, Democratic Republic of the Congo
                </option>
                <option value={"Cook Islands"}>Cook Islands</option>
                <option value={"Costa Rica"}>Costa Rica</option>
                <option value={"Cote D'Ivoire"}>Cote D'Ivoire</option>
                <option value={"Croatia"}>Croatia</option>
                <option value={"Cuba"}>Cuba</option>
                <option value={"Curacao"}>Curacao</option>
                <option value={"Cyprus"}>Cyprus</option>
                <option value={"Czech Republic"}>Czech Republic</option>
                <option value={"Denmark"}>Denmark</option>
                <option value={"Djibouti"}>Djibouti</option>
                <option value={"Dominica"}>Dominica</option>
                <option value={"Dominican Republic"}>Dominican Republic</option>
                <option value={"Ecuador"}>Ecuador</option>
                <option value={"Egypt"}>Egypt</option>
                <option value={"El Salvador"}>El Salvador</option>
                <option value={"Equatorial Guinea"}>Equatorial Guinea</option>
                <option value={"Eritrea"}>Eritrea</option>
                <option value={"Estonia"}>Estonia</option>
                <option value={"Ethiopia"}>Ethiopia</option>
                <option value={"Falkland Islands (Malvinas)"}>
                  Falkland Islands (Malvinas)
                </option>
                <option value={"Faroe Islands"}>Faroe Islands</option>
                <option value={"Fiji"}>Fiji</option>
                <option value={"Finland"}>Finland</option>
                <option value={"France"}>France</option>
                <option value={"French Guiana"}>French Guiana</option>
                <option value={"French Polynesia"}>French Polynesia</option>
                <option value={"French Southern Territories"}>
                  French Southern Territories
                </option>
                <option value={"Gabon"}>Gabon</option>
                <option value={"Gambia"}>Gambia</option>
                <option value={"Georgia"}>Georgia</option>
                <option value={"Germany"}>Germany</option>
                <option value={"Ghana"}>Ghana</option>
                <option value={"Gibraltar"}>Gibraltar</option>
                <option value={"Greece"}>Greece</option>
                <option value={"Greenland"}>Greenland</option>
                <option value={"Grenada"}>Grenada</option>
                <option value={"Guadeloupe"}>Guadeloupe</option>
                <option value={"Guam"}>Guam</option>
                <option value={"Guatemala"}>Guatemala</option>
                <option value={"Guernsey"}>Guernsey</option>
                <option value={"Guinea"}>Guinea</option>
                <option value={"Guinea-Bissau"}>Guinea-Bissau</option>
                <option value={"Guyana"}>Guyana</option>
                <option value={"Haiti"}>Haiti</option>
                <option value={"Heard Island and Mcdonald Islands"}>
                  Heard Island and Mcdonald Islands
                </option>
                <option value={"Holy See (Vatican City State)"}>
                  Holy See (Vatican City State)
                </option>
                <option value={"Honduras"}>Honduras</option>
                <option value={"Hong Kong"}>Hong Kong</option>
                <option value={"Hungary"}>Hungary</option>
                <option value={"Iceland"}>Iceland</option>
                <option value={"India"}>India</option>
                <option value={"Indonesia"}>Indonesia</option>
                <option value={"Iran, Islamic Republic of"}>
                  Iran, Islamic Republic of
                </option>
                <option value={"Iraq"}>Iraq</option>
                <option value={"Ireland"}>Ireland</option>
                <option value={"Isle of Man"}>Isle of Man</option>
                <option value={"Israel"}>Israel</option>
                <option value={"Italy"}>Italy</option>
                <option value={"Jamaica"}>Jamaica</option>
                <option value={"Japan"}>Japan</option>
                <option value={"Jersey"}>Jersey</option>
                <option value={"Jordan"}>Jordan</option>
                <option value={"Kazakhstan"}>Kazakhstan</option>
                <option value={"Kenya"}>Kenya</option>
                <option value={"Kiribati"}>Kiribati</option>
                <option value={"Korea, Democratic People's Republic of"}>
                  Korea, Democratic People's Republic of
                </option>
                <option value={"Korea, Republic of"}>Korea, Republic of</option>
                <option value={"Kosovo"}>Kosovo</option>
                <option value={"Kuwait"}>Kuwait</option>
                <option value={"Kyrgyzstan"}>Kyrgyzstan</option>
                <option value={"Lao People's Democratic Republic"}>
                  Lao People's Democratic Republic
                </option>
                <option value={"Latvia"}>Latvia</option>
                <option value={"Lebanon"}>Lebanon</option>
                <option value={"Lesotho"}>Lesotho</option>
                <option value={"Liberia"}>Liberia</option>
                <option value={"Libyan Arab Jamahiriya"}>
                  Libyan Arab Jamahiriya
                </option>
                <option value={"Liechtenstein"}>Liechtenstein</option>
                <option value={"Lithuania"}>Lithuania</option>
                <option value={"Luxembourg"}>Luxembourg</option>
                <option value={"Macao"}>Macao</option>
                <option value={"Macedonia, the Former Yugoslav Republic of"}>
                  Macedonia, the Former Yugoslav Republic of
                </option>
                <option value={"Madagascar"}>Madagascar</option>
                <option value={"Malawi"}>Malawi</option>
                <option value={"Malaysia"}>Malaysia</option>
                <option value={"Maldives"}>Maldives</option>
                <option value={"Mali"}>Mali</option>
                <option value={"Malta"}>Malta</option>
                <option value={"Marshall Islands"}>Marshall Islands</option>
                <option value={"Martinique"}>Martinique</option>
                <option value={"Mauritania"}>Mauritania</option>
                <option value={"Mauritius"}>Mauritius</option>
                <option value={"Mayotte"}>Mayotte</option>
                <option value={"Mexico"}>Mexico</option>
                <option value={"Micronesia, Federated States of"}>
                  Micronesia, Federated States of
                </option>
                <option value={"Moldova, Republic of"}>
                  Moldova, Republic of
                </option>
                <option value={"Monaco"}>Monaco</option>
                <option value={"Mongolia"}>Mongolia</option>
                <option value={"Montenegro"}>Montenegro</option>
                <option value={"Montserrat"}>Montserrat</option>
                <option value={"Morocco"}>Morocco</option>
                <option value={"Mozambique"}>Mozambique</option>
                <option value={"Myanmar"}>Myanmar</option>
                <option value={"Namibia"}>Namibia</option>
                <option value={"Nauru"}>Nauru</option>
                <option value={"Nepal"}>Nepal</option>
                <option value={"Netherlands"}>Netherlands</option>
                <option value={"Netherlands Antilles"}>
                  Netherlands Antilles
                </option>
                <option value={"New Caledonia"}>New Caledonia</option>
                <option value={"New Zealand"}>New Zealand</option>
                <option value={"Nicaragua"}>Nicaragua</option>
                <option value={"Niger"}>Niger</option>
                <option value={"Nigeria"}>Nigeria</option>
                <option value={"Niue"}>Niue</option>
                <option value={"Norfolk Island"}>Norfolk Island</option>
                <option value={"Northern Mariana Islands"}>
                  Northern Mariana Islands
                </option>
                <option value={"Norway"}>Norway</option>
                <option value={"Oman"}>Oman</option>
                <option value={"Pakistan"}>Pakistan</option>
                <option value={"Palau"}>Palau</option>
                <option value={"Palestinian Territory, Occupied"}>
                  Palestinian Territory, Occupied
                </option>
                <option value={"Panama"}>Panama</option>
                <option value={"Papua New Guinea"}>Papua New Guinea</option>
                <option value={"Paraguay"}>Paraguay</option>
                <option value={"Peru"}>Peru</option>
                <option value={"Philippines"}>Philippines</option>
                <option value={"Pitcairn"}>Pitcairn</option>
                <option value={"Poland"}>Poland</option>
                <option value={"Portugal"}>Portugal</option>
                <option value={"Puerto Rico"}>Puerto Rico</option>
                <option value={"Qatar"}>Qatar</option>
                <option value={"Reunion"}>Reunion</option>
                <option value={"Romania"}>Romania</option>
                <option value={"Russian Federation"}>Russian Federation</option>
                <option value={"Rwanda"}>Rwanda</option>
                <option value={"Saint Barthelemy"}>Saint Barthelemy</option>
                <option value={"Saint Helena"}>Saint Helena</option>
                <option value={"Saint Kitts and Nevis"}>
                  Saint Kitts and Nevis
                </option>
                <option value={"Saint Lucia"}>Saint Lucia</option>
                <option value={"Saint Martin"}>Saint Martin</option>
                <option value={"Saint Pierre and Miquelon"}>
                  Saint Pierre and Miquelon
                </option>
                <option value={"Saint Vincent and the Grenadines"}>
                  Saint Vincent and the Grenadines
                </option>
                <option value={"Samoa"}>Samoa</option>
                <option value={"San Marino"}>San Marino</option>
                <option value={"Sao Tome and Principe"}>
                  Sao Tome and Principe
                </option>
                <option value={"Saudi Arabia"}>Saudi Arabia</option>
                <option value={"Senegal"}>Senegal</option>
                <option value={"Serbia"}>Serbia</option>
                <option value={"Serbia and Montenegro"}>
                  Serbia and Montenegro
                </option>
                <option value={"Seychelles"}>Seychelles</option>
                <option value={"Sierra Leone"}>Sierra Leone</option>
                <option value={"Singapore"}>Singapore</option>
                <option value={"Sint Maarten"}>Sint Maarten</option>
                <option value={"Slovakia"}>Slovakia</option>
                <option value={"Slovenia"}>Slovenia</option>
                <option value={"Solomon Islands"}>Solomon Islands</option>
                <option value={"Somalia"}>Somalia</option>
                <option value={"South Africa"}>South Africa</option>
                <option value={"South Georgia and the South Sandwich Islands"}>
                  South Georgia and the South Sandwich Islands
                </option>
                <option value={"South Sudan"}>South Sudan</option>
                <option value={"Spain"}>Spain</option>
                <option value={"Sri Lanka"}>Sri Lanka</option>
                <option value={"Sudan"}>Sudan</option>
                <option value={"Suriname"}>Suriname</option>
                <option value={"Svalbard and Jan Mayen"}>
                  Svalbard and Jan Mayen
                </option>
                <option value={"Swaziland"}>Swaziland</option>
                <option value={"Sweden"}>Sweden</option>
                <option value={"Switzerland"}>Switzerland</option>
                <option value={"Syrian Arab Republic"}>
                  Syrian Arab Republic
                </option>
                <option value={"Taiwan, Province of China"}>
                  Taiwan, Province of China
                </option>
                <option value={"Tajikistan"}>Tajikistan</option>
                <option value={"Tanzania, United Republic of"}>
                  Tanzania, United Republic of
                </option>
                <option value={"Thailand"}>Thailand</option>
                <option value={"Timor-Leste"}>Timor-Leste</option>
                <option value={"Togo"}>Togo</option>
                <option value={"Tokelau"}>Tokelau</option>
                <option value={"Tonga"}>Tonga</option>
                <option value={"Trinidad and Tobago"}>
                  Trinidad and Tobago
                </option>
                <option value={"Tunisia"}>Tunisia</option>
                <option value={"Turkey"}>Turkey</option>
                <option value={"Turkmenistan"}>Turkmenistan</option>
                <option value={"Turks and Caicos Islands"}>
                  Turks and Caicos Islands
                </option>
                <option value={"Tuvalu"}>Tuvalu</option>
                <option value={"Uganda"}>Uganda</option>
                <option value={"Ukraine"}>Ukraine</option>
                <option value={"United Arab Emirates"}>
                  United Arab Emirates
                </option>
                <option value={"United Kingdom"}>United Kingdom</option>
                <option value={"United States"}>United States</option>
                <option value={"United States Minor Outlying Islands"}>
                  United States Minor Outlying Islands
                </option>
                <option value={"Uruguay"}>Uruguay</option>
                <option value={"Uzbekistan"}>Uzbekistan</option>
                <option value={"Vanuatu"}>Vanuatu</option>
                <option value={"Venezuela"}>Venezuela</option>
                <option value={"Viet Nam"}>Viet Nam</option>
                <option value={"Virgin Islands, British"}>
                  Virgin Islands, British
                </option>
                <option value={"Virgin Islands, U.s."}>
                  Virgin Islands, U.s.
                </option>
                <option value={"Wallis and Futuna"}>Wallis and Futuna</option>
                <option value={"Western Sahara"}>Western Sahara</option>
                <option value={"Yemen"}>Yemen</option>
                <option value={"Zambia"}>Zambia</option>
                <option value={"Zimbabwe"}>Zimbabwe</option>
              </select>
              {data.country === "" && errors.country && (
                <div className="text-red-500 text-xs">{errors.country}</div>
              )}
            </div>

            <div className="flex flex-col gap-2 ">
              <small className="text-xs font-semibold">Age Range</small>

              {program ? (
                <select
                  className="outline-0 text-sm border px-3 py-2 rounded-sm border-gray-300"
                  value={data.ageRange}
                  onChange={(e) => onUpdate("ageRange", e.target.value)}
                >
                  <option value="">Select Option</option>
                  <option value={"18-25"}>18 - 25</option>
                  <option value={"25-35"}>25 - 35</option>
                  <option value={"35-45"}>35 - 45</option>
                  <option value={">45"}> &gt; 45</option>
                </select>
              ) : (
                <InputLoading />
              )}
              {data.ageRange === "" && errors.ageRange && (
                <div className="text-red-500 text-xs">{errors.ageRange}</div>
              )}
            </div>

            <div className="flex flex-col gap-2 ">
              <small className="text-xs font-semibold">Employment Status</small>

              {program ? (
                <select
                  value={data.employmentStatus}
                  onChange={(e) => onUpdate("employmentStatus", e.target.value)}
                  className="outline-0 text-sm border px-3 py-2 rounded-sm border-gray-300"
                >
                  <option value="">Select Option</option>
                  <option value={"Self-Employed"}>Self Employed</option>
                  <option value={"UnEmployed"}>UnEmployed</option>
                  <option value={"employed"}>Employed</option>
                </select>
              ) : (
                <InputLoading />
              )}
              {data.employmentStatus === "" && errors.employmentStatus && (
                <div className="text-red-500 text-xs">
                  {errors.employmentStatus}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 ">
              <small className="text-xs font-semibold">Preferred Cohort</small>
                {allCohorts
                    ? <select className='outline-0 text-sm border px-3 py-2 rounded-sm border-gray-300' value={data.preferredCohort} onChange={(e) => { onUpdate('preferredCohort', Number(e.target.value)); setSelectedCohort( e.target.value ); }}>
                        <option value="">Select Option</option>
                        {allCohorts && allCohorts.map((cohort: any) => {
                            if(!cohort.cohortName.trim().toLowerCase().includes('october 2023')){
                                return (<option value={cohort.id} key={cohort.id}>{cohort.cohortName}</option>);
                            }
                        })}
                    </select>
                    : <InputLoading />
                }
              {(data.preferredCohort === "" || data.preferredCohort <= 0) &&
                (errors.preferredCohort || data.preferredCohort === "") && (
                  <div className="text-red-500 text-xs">
                    {errors.preferredCohort}
                  </div>
                )}
            </div>

            <div className="flex flex-col gap-2 ">
              <small className="text-xs font-semibold">Preferred course</small>
              {!loadingCourses && courses ? (
                <select
                  className="outline-0 text-sm border px-3 py-2 rounded-sm border-gray-300"
                  value={data.preferredCourse}
                  onChange={(e) => {
                    onUpdate("preferredCourse", Number(e.target.value));
                  }}
                >
                  <option value="" selected>
                    Select Option
                  </option>
                  {courses.map((course: any) => {
                    return (
                      <option value={course.id} key={course.id}>
                        {course.courseTitle}
                      </option>
                    );
                  })}
                </select>
              ) : (
                <InputLoading />
              )}
              {(data.preferredCohort === "" || data.preferredCohort <= 0) &&
                (errors.preferredCourse || data.preferredCourse === "") && (
                  <div className="text-red-500 text-xs">
                    {errors.preferredCourse}
                  </div>
                )}
            </div>

            <Button
              style={{ color: secondaryColor }}
              variant={"ghost"}
              type="button"
              className=""
              onClick={handleNextClick}
            >
              Proceed
            </Button>

            <small className="text-center font-semibold mt-12">
              Already have an account?{" "}
              <Link
                style={{ color: secondaryColor }}
                href={"/login"}
                className=""
              >
                Log in
              </Link>
            </small>
          </form>
        </div>
      </section> */}
    </>
  );
};

export const InputLoading = () => {
  return <div className="rounded-sm h-10 animate-pulse bg-gray-200"></div>;
};

export default Step2;
