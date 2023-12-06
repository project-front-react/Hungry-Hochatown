import React from "react";
interface Props {
  children?: React.ReactNode;
  // any props that come into the component
}
const AuthLayout = ({ children, ...props }: Props) => {
  return <React.Fragment>{children}</React.Fragment>;
};

export default AuthLayout;
