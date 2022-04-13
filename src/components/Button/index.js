import "./index.css";

const Button = ({ name, onClick }) => {
  return (
    <button type="button" className="btn btn-primary m-2" onClick={onClick}>
      {name}
    </button>
  );
};

export default Button;
