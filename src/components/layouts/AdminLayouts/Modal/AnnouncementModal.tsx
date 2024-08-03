import RichTextEditor from "@/components/Description/RichTextEditor";
import { X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import Modal from "react-modal";
import { Label } from "../../../../../utilComponents/Label/Label";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DashboardService from "@/services/api/dashboard";
import { ApiRequestClient } from "@/shared/utils/api-client";
import { toast } from "react-toastify";

const errorMessages = {
  required(field = "Field") {
    return field + " is required";
  },
};

interface AssignCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  secondaryColor: any;
}

interface Course {
  id: number;
  courseTitle: string;
}

let buildSchema = () => {
  return Yup.object().shape({
    // assessmentName: Yup.string().required(errorMessages.required("An assessment name is required")),
    // assessmentType: Yup.string().required(errorMessages.required("An assessment type is required")),
    Announcement: Yup.string()
      .required(errorMessages.required("A description is required"))
      .max(200, "Word limit exceeded! Please shorten your text.")
      .min(5, "Please provide a valid cohort description"),
  });
};

interface RichTextInputFieldProps {
  label: string;
  name: string;
  placeholder: string;
  tooltipText?: string;
  isDisabled?: boolean;
  control: any;
  error?: any;
}

const RichTextInputField: React.FC<RichTextInputFieldProps> = ({
  label,
  name,
  placeholder,
  tooltipText,
  isDisabled,
  control,
  error,
  ...inputProps
}) => {
  return (
    <div className="relative w-full pb-12">
      <div className="flex items-center">
        <Label>{label}</Label>
      </div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <RichTextEditor
              {...field}
              placeholder={placeholder}
              readOnly={isDisabled}
              error={error}
              initialValue={field.value}
              onChange={(content: any) => field.onChange(content)}
              {...inputProps}
            />
          </>
        )}
      />
    </div>
  );
};

const AnnouncementModal: React.FC<AssignCourseModalProps> = ({ isOpen, onClose, secondaryColor }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [title, setTitle] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);

  const form = useForm({
    resolver: yupResolver(buildSchema()),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = form;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await ApiRequestClient.get("/api/v1/courses");
        const data = await response.data;
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    if (isOpen) {
      // Fetch courses only when the modal is open
      fetchCourses();
    }
  }, [isOpen]);

  const conSelect = (e: any) => {
    setSelectedValue(e.target.value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const announce = async () => {
    try {
      const courseId = Number(selectedValue);
      const announcementData = {
        courseId,
        title,
        announcement: getValues("Announcement"),
      };

      // Call the DashboardService.addAnnouncement function
      const response = await DashboardService.addAnnouncement(announcementData);

      // Handle the response or any additional logic here
      console.log("Announcement added successfully:", response);

      toast.success("Announcement added successfully");

      // Close the modal or perform any other action after successful announcement
      onClose();
    } catch (error) {
      console.error("Error adding announcement:", error);
      toast.error("Error adding announcement");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Assign Course Modal"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-8 overflow-y-auto w-full max-w-lg"
      overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center"
    >
      <div className="space-y-4  max-h-[420px] font-montserrat">
        <div className=" w-full border-b border-[#7A7A7A] ">
          <div className="py-3 flex  justify-between items center">
            <h1 style={{ color: secondaryColor }} className="font-semibold text-lg">
              Announcement
            </h1>
            <X onClick={onClose} className="cursor-pointer" />
          </div>
        </div>

        <div className="flex flex-col gap-6 items-start">
          {/* Course Input */}
          <div className="w-full">
            <label htmlFor="course" className="text-[#1A183E] font-semibold mb-1">
              Course
            </label>
            <select
              id="course"
              name="course"
              className="border text-[#7A7A7A] bg-transparent border-opacity-25 p-2 outline-none rounded-md w-full"
              value={selectedValue}
              onChange={conSelect}
            >
              <option value="" disabled>
                Select a course
              </option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.courseTitle}
                </option>
              ))}
            </select>
          </div>

          {/* Title Input */}
          <div className="w-full">
            <label htmlFor="title" className="text-[#1A183E] font-semibold mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="border text-[#7A7A7A] bg-transparent border-opacity-25 p-2 rounded-md w-full outline-none"
              placeholder="Add Title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>

          {/* Rich text editor */}
          <RichTextInputField
            name="Announcement"
            label="Announcement"
            placeholder="Add an announcement"
            error={errors.Announcement?.message}
            control={control}
          />
        </div>

        <div className="flex justify-end pt-12 pb-12 items-center gap-4">
          <button onClick={onClose} style={{ color: secondaryColor }} className="font-semibold text-base">
            Cancel
          </button>
          <button
            style={{ backgroundColor: secondaryColor }}
            className="rounded-lg px-4 py-2 text-white font-semibold text-base"
            onClick={() => announce()}
          >
            Announce
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AnnouncementModal;
