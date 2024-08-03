import { ReactNode } from "react";
import styles from "./styles.module.scss";

export function Label({
  children,
  className,
  required = false,
}: {
  children: ReactNode;
  className?: string;
  required?: boolean;
}) {
  return (
    <label
      className={`${styles.label} ${className || ""} ${
        required ? styles.required : ""
      }`}
    >
      {children}
    </label>
  );
}
