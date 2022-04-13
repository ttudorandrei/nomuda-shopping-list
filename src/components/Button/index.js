import "./index.css";

const Button = ({ name }) => {
  return (
    <button type="button" className="btn btn-primary m-2">
      {name}
    </button>
  );
};

export default Button;
