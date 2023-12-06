import React from "react"
import "./LoadingAnimation.scss"
const LoadingAnimation = (props:any) => {
  const [mQuery, setMQuery] = React.useState<any>({
    matches: window.innerWidth > 766 ? true : false,
  });
  React.useEffect(() => {
    let mediaQuery = window.matchMedia("(min-width: 768px)");
    mediaQuery.addListener(setMQuery);
    return () => mediaQuery.removeListener(setMQuery);
  }, []);
  return (
    <div className="loading__wrapper">
      <div className={mQuery.matches ?"loading__animation_desktop":"loading__animation"}>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

export default LoadingAnimation
