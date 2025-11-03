import Navigation from "../../Nav/Navigation.jsx";
import classes from "../../../css/Footer.module.css";
import Layout from "../Layout/Layout.jsx";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Layout styles={classes.styles} layout={classes.layout}>
      <div className={classes.footer}>
        <Navigation />
      </div>
      <div className={classes.footer}>
        <span className={classes.span}>
          © TicketBlaster {currentYear}
        </span>
      </div>
    </Layout>
  );
};

export default Footer;
