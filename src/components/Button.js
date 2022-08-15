import "./Button.css";

const Button = ({ className, value, id, onClick }) => {
  return (
    <button className={className} onClick={onClick} id={id}>
      {value}
    </button>
  );
};

export default Button;