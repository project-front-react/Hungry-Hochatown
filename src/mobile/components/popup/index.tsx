import { useEffect, useState } from "react";
import popupStyles from "./popup.module.scss";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
interface CustomPopupProps {
  show: boolean;
  // children:string,
  children?: JSX.Element | JSX.Element[];
  onClose: (arg: boolean) => void;
}

const CustomPopup = (props: CustomPopupProps) => {
  const pathName = useLocation().pathname;
  const [show, setShow] = useState(false);
  const closeHandler = () => {
    setShow(false);
    props.onClose(false);
  };

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  return (
    <div
      style={{
        visibility: show ? "visible" : "hidden",
        // opacity: show ? "1" : "0",
      }}
      className={ popupStyles.overlay}
    >
      <div className={popupStyles.popup}>
        {
          <span className={popupStyles.close} onClick={closeHandler}>
            &times;
          </span>
        }

        <div className={popupStyles.content}>{props.children}</div>
      </div>
    </div>
  );
};

CustomPopup.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CustomPopup;
