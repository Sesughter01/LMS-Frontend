// src/mock/modules.ts

import { Module } from "@/shared/types/module";

export const modules: Module[] = [
  {
    id: 1,
    moduleTitle: "Introduction to Web Development",
    moduleDescription: "This module covers the basics of web development, including HTML, CSS, and JavaScript.",
    moduleSequencePosition: 1,
    courseId: 1,
  },
  {
    id: 2,
    moduleTitle: "Frontend Development with React",
    moduleDescription: "Learn how to build dynamic web applications using React.",
    moduleSequencePosition: 2,
    courseId: 1,
  },
  {
    id: 3,
    moduleTitle: "Backend Development with Node.js",
    moduleDescription: "Understand how to create server-side applications using Node.js and Express.",
    moduleSequencePosition: 3,
    courseId: 1,
  },
  {
    id: 4,
    moduleTitle: "Data Analysis with Python",
    moduleDescription: "Explore data analysis techniques using Python and its libraries such as Pandas and NumPy.",
    moduleSequencePosition: 1,
    courseId: 2,
  },
  {
    id: 5,
    moduleTitle: "Machine Learning Basics",
    moduleDescription: "Introduction to machine learning concepts and algorithms.",
    moduleSequencePosition: 2,
    courseId: 2,
  },
  {
    id: 6,
    moduleTitle: "Advanced Machine Learning",
    moduleDescription: "Dive deeper into machine learning with advanced techniques and applications.",
    moduleSequencePosition: 3,
    courseId: 2,
  },
  {
    id: 7,
    moduleTitle: "Cybersecurity Fundamentals",
    moduleDescription: "Learn the basic concepts and practices of cybersecurity.",
    moduleSequencePosition: 1,
    courseId: 3,
  },
  {
    id: 8,
    moduleTitle: "Network Security",
    moduleDescription: "Understand how to protect networks from various cyber threats.",
    moduleSequencePosition: 2,
    courseId: 3,
  },
  {
    id: 9,
    moduleTitle: "Application Security",
    moduleDescription: "Learn how to secure web and mobile applications.",
    moduleSequencePosition: 3,
    courseId: 3,
  },
  {
    id: 10,
    moduleTitle: "Digital Marketing Strategy",
    moduleDescription: "Develop effective strategies for online marketing and brand promotion.",
    moduleSequencePosition: 1,
    courseId: 4,
  },
  {
    id: 11,
    moduleTitle: "Social Media Marketing",
    moduleDescription: "Learn how to use social media platforms for marketing and engagement.",
    moduleSequencePosition: 2,
    courseId: 4,
  },
  {
    id: 12,
    moduleTitle: "Content Marketing",
    moduleDescription: "Understand how to create and distribute valuable content to attract and engage an audience.",
    moduleSequencePosition: 3,
    courseId: 4,
  },
];
