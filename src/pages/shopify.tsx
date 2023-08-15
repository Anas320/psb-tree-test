import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { checkSession } from "../redux/actions";
import { hasPassword } from "../redux/actions/authAction";

// const grey = '#f5f5f5'

// import Loading from "../components/Loader";
const Shopify = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { asPath } = router;
  const auth = useSelector((state: any) => state.auth);
  const { logged, agentId, hasPasswordSuccess } = auth;
  // console.log(agentId, "<<<<<AUTH")
  useEffect(() => {
    let jwt = asPath.split("?")[1];
    localStorage.setItem("psb-auth-bearer-token", jwt);
    dispatch(checkSession());
    // localStorage.setItem("conzia-auth-agent-id", agentId);
  }, [agentId]);

  useEffect(() => {
    if (logged) {
      window.location.href = "/";
    }
  }, [logged, agentId]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#33373E",
      }}
    >
      <p style={{ color: "white" }}>Loading</p>
      {/* <Loading /> */}
    </div>
  );
};

export default Shopify;
