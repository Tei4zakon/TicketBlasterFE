import classes from "../../css/Button.module.css";

function Button(props) {
  let buttonClass = classes.button;

  if (props.type === "form") {
    buttonClass = `${buttonClass} ${classes["form-button"]}`;
  } else if (props.type === "link") {
    buttonClass = `${buttonClass} ${classes["link-button"]}`;
  }
  return (
    <button
      type={props.type}
      className={`${buttonClass} ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default Button;
