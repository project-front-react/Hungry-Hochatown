import classes from "./loadingScreen.module.scss";
import BrandLogo from "../../assets/images/logo/logo4.png";
const LoadingScreen = () => {
  const OnboardingUrl = window.location.href.includes("onboarding");

  return (
    <div className={`${classes.loadingWrapper} ${classes.splashLogo}`}>
      <section>
        <div className={classes.contentWrap}>
          <img src={BrandLogo} alt="brand-logo" className={classes.logo} />
        </div>
      </section>
    </div>
  );
};

export default LoadingScreen;
