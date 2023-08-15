import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  wixRenameEmailForEixistingAgent,
  changeEmailAlreadyExistsValue,
} from "../redux/actions";
import Swal from "sweetalert2";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexFlow: "column",
    gap: "15px",
    backgroundColor: "#33373E",
  },
});

const emailAlreadyExists = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { asPath } = router;
  const [emailVal, setEmailVal] = useState("");
  const [instanceId, setInstanceId] = useState("");
  const [jwt, setJwt] = useState("");
  const [emailExists, setEmailExists] = useState(false);

  const auth = useSelector((state: any) => state.auth);
  const { emailAlreadyExists: emailAlreadyExistsInDb } = auth;

  // let instanceId;
  useEffect(() => {
    //  instanceId = asPath.split("?")[1];
    setInstanceId(asPath.split("?")[1]);
    setJwt(asPath.split("?")[2]);
  }, []);

  const emailChangeHandler = ({ target: { value } }: any) => {
    setEmailVal(value);
    console.log(emailVal);
  };

  useEffect(() => {
    setEmailExists(emailAlreadyExistsInDb);
  }, [emailAlreadyExistsInDb]);

  useEffect(() => {
    if (emailExists) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email Already Exists!",
        // footer: '<a href="">Why do I have this issue?</a>',
      });
      dispatch(changeEmailAlreadyExistsValue(false));
    }
  }, [emailExists]);

  useEffect(() => {
    setInstanceId(asPath.split("?")[1]);
  }, []);

  const [message, setMessage] = useState("");

  const emailValidation = (email: string) => {
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (regEx.test(email)) {
      // setMessage("Email is Valid");
      // console.log("email is valid");
      return true;
    } else {
      setMessage("Invalid email, Enter a valid email");
      // console.log("email is not valid");
      return false;
    }
  };
  const formHandler = (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={formHandler}>
        <div
          className={classes.root}
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexFlow: "column",
            gap: "15px",
            backgroundColor: "#33373E",
          }}
        >
          <div>
            <Grid
              xs={12}
              style={{ position: "absolute", top: "50px", left: "65px" }}
            >
              <a href="https://www.Chazify.com/">
                <img
                  src={"/images/conzia logo new.png"}
                  alt="Logo"
                  style={{ height: "38px" }}
                />
              </a>
            </Grid>
          </div>
          <div
            style={{ color: "white", fontSize: "27px", textAlign: "center" }}
          >
            This email have already been used already,
            <br /> Kindly add new email below
          </div>
          {/* <br /> */}
          <div>
            <input
              // type="email"
              style={{
                height: "2.5rem",
                width: "15rem",
                borderRadius: "5px",
                border: message ? "2px solid red" : "1px solid transparent",
              }}
              value={emailVal}
              onChange={emailChangeHandler}
            />
            <p
              style={{
                color: "red",
                textAlign: "left",
              }}
            >
              {message}
            </p>
          </div>
          <div>
            <button
              type="submit"
              style={{
                borderRadius: "5px",
                background: "#0090e6",
                width: "15rem",
                height: "2.5rem",
                color: "white",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
              onClick={() => {
                if (emailVal && emailValidation(emailVal)) {
                  dispatch(
                    wixRenameEmailForEixistingAgent(emailVal, instanceId)
                  );
                  console.log(" data posted");
                }
              }}
            >
              {" "}
              Continue{" "}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default emailAlreadyExists;
