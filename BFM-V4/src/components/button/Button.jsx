import ButtonWrapper from "./Button.style";

const Button = ({ children, ...props }) => {
  return (
    <ButtonWrapper {...props} className="text-white">
      {children}
    </ButtonWrapper>
  );
};

export default Button;
