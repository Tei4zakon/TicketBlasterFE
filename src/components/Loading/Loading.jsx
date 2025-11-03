import { RotatingLines } from "react-loader-spinner";
import classes from "../../css/Loading.module.css";

const Loading = () => {
  return (
    <div className={classes.center}>
      <RotatingLines
        strokeColor="#ff48ab"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
};

export default Loading;
