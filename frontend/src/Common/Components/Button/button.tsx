// Button.tsx
import React from "react";
import styles from "./button.module.css";

interface ButtonProps {
  text: string;
  bgColor: string;
  hoverBgColor: string;
  textColor: string;
  hoverTextColor: string;
  onClick?: () => void | Promise<void>;
}

const Button: React.FC<ButtonProps> = ({
  text,
  bgColor,
  hoverBgColor,
  textColor,
  hoverTextColor,
  onClick,
}) => {
  return (
    <button
      className={styles.btn}
      style={
        {
          backgroundColor: bgColor,
          "--hover-bg-color": hoverBgColor,
          "--text-color": textColor,
          "--hover-text-color": hoverTextColor,
        } as React.CSSProperties
      }
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
