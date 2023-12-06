import React from "react";
import classes from "./addaddressmain.module.scss";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useForm from "../../helpers/useForm";
import MapContainer from "./MapComponent/MaoComponent";
import { useDispatch } from "react-redux";
import { actionSaveAddress } from "../../store/actions";

const AddAddressMain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [instruction, setInstruction] = React.useState("");
  const [mapData, setMapData] = React.useState("");
  const { handleChange, values, errors, onFocus, onBlur, handleSubmit } =
    useForm();
    const [mQuery, setMQuery] = React.useState<any>({
      matches: window.innerWidth > 766 ? true : false,
    });
  
    React.useEffect(() => {
      let mediaQuery = window.matchMedia("(min-width: 768px)");
      mediaQuery.addListener(setMQuery);
      return () => mediaQuery.removeListener(setMQuery);
    }, []);

  const handleOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event) event.preventDefault();
    handleSubmit();
    if (values.area) {
      let addressData = {
        area: values.area.trim(),
        instruction: instruction.trim(),
        mapData: mapData,
      };

      navigate("/payment");
      dispatch(actionSaveAddress(addressData));
    }
  };

  return (
    <React.Fragment>
      <div className={classes.addAddressheader}>
        <div className={classes.logoWrap}>
          <span onClick={() => window.history.back()}>
            <IoMdArrowRoundBack />
          </span>
          <h1>Add Address</h1>
        </div>
      </div>
      <main className={`${classes.addAddressmain} mb-xxl`}>
        <div className={classes.addressDetails}>
          <form className={classes.customForm}>
            <div className={classes.inputBox}>
              <input
                type="text"
                placeholder="Cabin name/Boatramp name."
                name="area"
                value={values.area}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>
            {errors.area && (
              <p className={mQuery.matches?`${classes.errorRedText}`:`${classes.errorText}`}>{errors.area}</p>
            )}
            <div className={classes.inputBox}>
              <textarea
                value={instruction}
                placeholder="Copy/Paste turn-by-turn directions to cabin provided by rental agency here."
                name="instruction"
                onChange={(e: any) => setInstruction(e.target.value)}
              />
            </div>
            <div className={classes.inputBox}>
              <MapContainer mapData={setMapData} height="60vh" />
            </div>
          </form>
        </div>
      </main>
      <div className={classes.footerBtn} onClick={handleOnClick}>
        <div>Proceed to Payment</div>
      </div>
    </React.Fragment>
  );
};

export default AddAddressMain;
