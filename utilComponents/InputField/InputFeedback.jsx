import styles from "./styles.module.scss";

export default function InputFeedback({ children, isInvalid = false }) {
  if (!children) return null;

  return (
    <div
      className={`${styles.inputFeedback} ${
        isInvalid ? styles.inputFeedbackInvalid : ""
      }`}
    >
      {children}
    </div>
  );
}
