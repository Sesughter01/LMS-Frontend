"use client";

import React from "react";
import styles from "./styles.module.scss";
import { Label } from "../Label/Label";
import InputFeedback from "./InputFeedback";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { BsInfoCircleFill } from "react-icons/bs";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import { handleDateInputFocus } from "@/lib/utils";

const mbClassesMap = {
  normal: "mb-10",
  none: "mb-0",
};

const InputField = React.forwardRef((props, ref) => {
  let {
    type,
    label,
    placeholder,
    validation,
    marginBottom = "normal",
    isInvalid = false,
    feedback,
    naked,
    options = [],
    children,
    control: Control,
    controlProps = {},
    selectProps = {},
    beforeLabel,
    isDisabled,
    showSubText,
    ...otherProps
  } = props;

  const [showPass, setShowPass] = React.useState(false);

  let togglePasswordVisibility = () => {
    setShowPass((show) => !show);
  };

  let mbClass = props.mb || mbClassesMap[marginBottom] || mbClassesMap.normal;

  let invalidClass = { [styles.invalid]: isInvalid };
  let nakedClass = { [styles.naked]: !!naked };

  const handleFocusClick = () =>  {
    console.log("input onFocus")
  }

  return (
    <div className={`flex flex-col ${mbClass ? ` ${mbClass}` : ""}`}>
      <div className={`flex items-center mb-2 ${styles.labelWrapper}`}>
        {beforeLabel}
        {label && (
          <>
            <Label required={validation?.required}>{label}</Label>
            {props.infoicon && (
              <div style={{ marginTop: "-0.5rem" }}>
                <Tooltip title={props.tooltiptext} arrow>
                  <Button
                    style={{
                      color: "#7A7A7A",
                      backgroundColor: "transparent",
                      minWidth: "0",
                    }}
                    disableRipple
                  >
                    <BsInfoCircleFill size={16} />
                  </Button>
                </Tooltip>
              </div>
            )}
          </>
        )}
      </div>
      {Control ? (
        <Control
          ref={ref}
          className={`${styles.input} ${invalidClass} ${nakedClass}`}
          {...otherProps}
          {...controlProps}
          disabled={isDisabled}
        />
      ) : type === "password" ? (
        <div className="relative">
          <input
            {...otherProps}
            ref={ref}
            type={showPass ? "text" : "password"}
            className={`${styles.input} ${invalidClass} pr-16 ${nakedClass}`}
            placeholder={placeholder}
            disabled={isDisabled}
          />
          <div className="absolute top-0 bottom-0 right-0 w-16 grid place-items-center">
            <button type="button" onClick={togglePasswordVisibility}>
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
      ) : type === "select" ? (
        <div className="select">
          <select
            {...otherProps}
            ref={ref}
            className={`
              ${styles.input}
              ${invalidClass}
              ${nakedClass}
              pr-16 appearance-none
            `}
          >
            {selectProps.allowEmpty === true ? null : (
              <option value="">{placeholder ?? "Select an option"}</option>
            )}
            {options.map((option, index) => {
              let { label, value } =
                typeof option === "object"
                  ? option
                  : { label: option, value: option };
              return (
                <option key={index} value={value}>
                  {label}
                </option>
              );
            })}
            {children}
          </select>
          <div className="absolute top-0 bottom-0 right-0  w-8 grid place-items-center">
            <FiChevronDown />
          </div>
        </div>
      ) : type === "textarea" ? (
        <textarea
          {...otherProps}
          ref={ref}
          type={type}
          className={`${styles.input} ${invalidClass} ${nakedClass}`}
          placeholder={placeholder}
          disabled={isDisabled}
        />
      ) : (
        <input
          {...otherProps}
          ref={ref}
          type={type}
          className={`${props.bgerror} ${styles.input} ${invalidClass} ${nakedClass}`}
          placeholder={placeholder}
          disabled={isDisabled}
          onClick={type == "date"? handleDateInputFocus: handleFocusClick}
          onFocus={type == "date"? handleDateInputFocus: handleFocusClick}
        />
      )}

      {showSubText && (
        <p className="text-xs text-[blue]">
          Kindly input the primary teaching overviews. These will be featured on
          the course card displayed on the course page. Each overview should
          consist of no more than 5 words, and you are limited to a maximum of 6
          goals. After typing each overview, please press the &quot;Enter&quot; key to
          submit it.
        </p>
      )}

      {feedback && (
        <InputFeedback isInvalid={isInvalid}>{feedback}</InputFeedback>
      )}
    </div>
  );
});

InputField.displayName = "InputField";

export default InputField;
