import classes from "../../css/Title.module.css";

const Title = (props) => {
  return <h1 className={classes.h1}>{props.children}</h1>;
};

export default Title;
