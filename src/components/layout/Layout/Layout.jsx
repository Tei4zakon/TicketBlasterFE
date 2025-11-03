import classes from "../../../css/Layout.module.css";

function Layout(props) {
  return (
    <div className={`${classes["layout-container"]} ${props.styles}`}>
      <div className={`${classes.width} ${props.layout}`}>{props.children}</div>
    </div>
  );
}

export default Layout;
