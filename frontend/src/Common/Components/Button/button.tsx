// Button.tsx
import React from "react";
import styles from "./button.module.css";

interface ButtonProps {
  text: string;
  bgColor: string;
  hoverBgColor: string;
}

const Button: React.FC<ButtonProps> = ({ text, bgColor, hoverBgColor }) => {
  return (
    <button
      className={styles.btn}
      style={
        {
          backgroundColor: bgColor,
          "--hover-bg-color": hoverBgColor,
        } as React.CSSProperties
      }
    >
      {text}
    </button>
  );
};

export default Button;
