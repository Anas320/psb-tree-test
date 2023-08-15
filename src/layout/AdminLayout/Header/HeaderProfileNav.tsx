import { Badge, Button, Dropdown, Nav, NavItem } from "react-bootstrap";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCreditCard,
  faEnvelopeOpen,
  faFile,
  faMessage,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { PropsWithChildren, useEffect, useState } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faGear,
  faListCheck,
  faLock,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/router";

import store from "src/redux/store";
// import { SyntheticEvent, useEffect, useState } from "react";
import { logOut } from "src/redux/actions";

type NavItemProps = {
  icon: IconDefinition;
} & PropsWithChildren;

// const nextRouter =  useRouter()

const ProfileDropdownItem = (props: NavItemProps) => {
  const { icon, children } = props;

  return (
    <>
      <FontAwesomeIcon className="me-2" icon={icon} fixedWidth />
      {children}
    </>
  );
};

export default function HeaderProfileNav() {
  const [nameFirstLetter, setNameFirstLetter] = useState("");
  const auth = useSelector((state: any) => state.auth);
  const { fullName } = auth;

  useEffect(() => {
    console.log("auth : ", auth);
  }, [auth]);
  useEffect(() => {
    console.log("fullName : ", fullName);
    if (fullName) {
      setNameFirstLetter(fullName[0].toUpperCase());
    } else {
      setNameFirstLetter("W");
    }
  }, [fullName]);

  return (
    <Nav style={{ display: "flex", alignItems: "center" }}>
      <div className="nav-insta">
        <Button
          onClick={() => {
            window.open("https://www.instagram.com/dropshipping_conzia/");
          }}
          style={{
            background: "transparent",
            border: "1px solid white",
            padding: "5px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          {" "}
          <img width="25px" src="./insta.png" />
          Follow us
        </Button>
      </div>
      <Dropdown as={NavItem}>
        <Dropdown.Toggle
          style={{
            textDecoration: "none",
          }}
          variant="link"
          bsPrefix="shadow-none"
          className="py-0 px-2 rounded-0"
          id="dropdown-profile"
        >
          <div className="avatar position-relative">
            <h1
              style={{
                background: "orange",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                color: "white",
                fontSize: "32px",
              }}
            >
              {nameFirstLetter}
            </h1>
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className="pt-0">
          <Dropdown.Header className="bg-light fw-bold rounded-top">
            Account
          </Dropdown.Header>
          {/* <Link href="/login" passHref legacyBehavior> */}
          <Dropdown.Item
            onClick={() => {
              store.dispatch(logOut());
              window.location.href = "/login";
              // window.history.pushState({},"", `/login`);
            }}
          >
            <ProfileDropdownItem icon={faPowerOff}>Logout</ProfileDropdownItem>
          </Dropdown.Item>
          {/* </Link> */}
        </Dropdown.Menu>
      </Dropdown>
    </Nav>
  );
}
