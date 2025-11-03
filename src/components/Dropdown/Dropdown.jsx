import classes from "../../css/Dropdown.module.css";

function Dropdown(props) {
  return (
    <div className={`${classes["wrapper"]} `}>
      <label htmlFor="label">{props.label}</label>
      <select
        className={classes.select}
        id="event-type"
        value={props.value}
        onChange={props.onChange}
      >
        {props.children}
      </select>
    </div>
  );
}

export default Dropdown;
