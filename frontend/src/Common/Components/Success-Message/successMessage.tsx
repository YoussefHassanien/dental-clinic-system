interface ErrorMessageProps {
  text: string;
  isVisible?: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  text,
  isVisible = false,
}) => {
  return (
    <p className={`${isVisible ? "block" : "hidden"} text-green-600 my-4`}>
      {text}
    </p>
  );
};

export default ErrorMessage;
