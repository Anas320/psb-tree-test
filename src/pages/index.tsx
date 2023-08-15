import type { NextPage } from "next";
import Image from "next/image";
import { AdminLayout } from "@layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faDownload,
  faEllipsisVertical,
  faMars,
  faSearch,
  faUsers,
  faVenus,
} from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  ButtonGroup,
  Card,
  Dropdown,
  ProgressBar,
} from "react-bootstrap";
import { Bar, Line } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import {
  faCcAmex,
  faCcApplePay,
  faCcPaypal,
  faCcStripe,
  faCcVisa,
  faFacebookF,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";

import initStore from "../redux/store";

const auth = initStore.getState().auth;
const {
  // user,
  // agentId,
  logged,
  // shopify,
  getDomain,
  // socketIoAuthenticated,
  // checkingSession,
  sessionChecked,
  // socketConnected,
  hasPasswordSuccess,
  // hasPasswordFailed,
  // hasPasswordLoading,
} = auth;

// console.log("logged : ", logged);

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Filler
);

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// const nextRouter = useRouter();

const Home: any = () => {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("psb-auth-bearer-token")) {
      setIsLogged(true);
    } else {
      window.location.href = "/login";
    }
  }, []);
  return isLogged && <AdminLayout />;
};

export default Home;
