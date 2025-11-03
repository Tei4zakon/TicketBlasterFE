import classes from "../../css/Input.module.css";

function Input(props) {
  return (
    <div className={`${classes["input-wrapper"]} `}>
      <label className={props.style} htmlFor={props.id}>
        {props.label}
      </label>
      {props.isTextArea ? (
        <textarea
          type={props.type}
          id={props.id}
          onChange={props.onChange}
          value={props.value}
          className={props.className}
        />
      ) : (
        <input
          type={props.type}
          id={props.id}
          onChange={props.onChange}
          value={props.value}
          className={
            props.error
              ? classes.invalid
              : `${classes.valid} ${props.className}`
          }
        />
      )}
      {props.error && <span className={classes.error}>{props.error}</span>}
    </div>
  );
}

export default Input;
