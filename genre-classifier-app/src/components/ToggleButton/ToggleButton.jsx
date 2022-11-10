import Button from "../Button/Button";

const ToggleButton = ({ value, active, onClick, children, ...props }) => {
  return (
    <Button onClick={() => onClick(value)} {...props} active={active}>
      {children}
    </Button>
  );
};

export default ToggleButton;
