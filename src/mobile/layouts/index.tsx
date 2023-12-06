import React from "react";
import AppBar from "../components/common/AppBar";
import AppHeader from "../components/common/AppHeader";
import AppMain from "../components/common/AppMain";
interface Props {
  children?: React.ReactNode;
  // any props that come into the component
}
let fullFilled = false;
let promise: Promise<void> | null = null;

const useTimeout = (ms: number) => {
  if (!fullFilled) {
    throw (promise ||= new Promise((res) => {
      setTimeout(() => {
        fullFilled = true;
        res();
      }, ms);
    }));
  }
};
const AppLayout = ({ children, ...props }: Props) => {
  useTimeout(1000);
  return (
    <React.Fragment>
      <AppHeader />
      {children}
      <AppBar />
    </React.Fragment>
  );
};

export default AppLayout;
