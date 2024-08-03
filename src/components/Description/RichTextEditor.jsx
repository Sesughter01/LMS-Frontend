"use client";

import "react-quill/dist/quill.snow.css";
import "./RichText.css";
import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });


const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
  ],
};

function RichTextEditor({ placeholder, readOnly, onChange, error,  wordLimit=200, initialValue }) {
  const [value, setValue] = useState(initialValue  || "");


  useEffect(() => {
    // setValue(initialValue || "")
  // console.log("cohortDescription", initialValue)

    handleTextChange(initialValue || "")
  }, [initialValue])
  // Calculate word count
  const wordCount = value.trim().split(/\s+/).length;

  // Set a word limit
  // const wordLimit = 200;

  // Validate word count
  const isWithinLimit = wordCount <= wordLimit;

  const handleTextChange = (content, delta, source, editor) => {
    // Check if word count exceeds the limit
    if (wordCount > wordLimit) {
      // Truncate content if it exceeds the word limit
      const words = content.split(/\s+/).slice(0, wordLimit);
      const truncatedContent = words.join(" ");

      const sanitizedContent = truncatedContent
        .replace(/<p>/g, "")
        .replace(/<\/p>/g, "");

      // Update the content with the truncated version
      setValue(sanitizedContent);
    } else {
      const sanitizedContent = content
        .replace(/<p>/g, "")
        .replace(/<\/p>/g, "");

      setValue(content);
      onChange(sanitizedContent);
    }
  };

  return (
    <div className="contain">
      <div className="editor">
        <ReactQuill
          theme="snow"
          value={value}
          defaultValue={initialValue}
          className="editor-input"
          onChange={handleTextChange}
          placeholder={placeholder}
          modules={modules}
          readOnly={readOnly}
        />
        <div className="mt-4 flex justify-end mr-4">
          <p className="text-[#A1A1A1] text-xs font-medium">
            {value.trim().split(/\s+/).length} / {wordLimit} words
          </p>
        </div>
      </div>
      {error && (
        <p style={{ color: "red", marginTop: "42px", fontSize: "12px" }}>
          {error}
        </p>
      )}
      {!isWithinLimit && (
        <div style={{ color: "red", marginTop: "42px", fontSize: "12px" }}>
          Word limit exceeded! Please shorten your text.
        </div>
      )}
    </div>
  );
}

export default RichTextEditor;
