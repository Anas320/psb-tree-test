import { AdminLayout } from "@layout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Dropdown,
  Table,
  Form,
  FormCheck,
  Button,
} from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import {
  deleteShopifyScriptTags,
  postShopifyScriptTags,
  getShopifyChargeConfirmationUrl,
} from "src/redux/actions";
import store from "src/redux/store";
import Modal from "react-bootstrap/Modal";

const Settings = () => {
  const [switchValue, setSwitchValue] = useState(false);
  const [domainValue, setDomainValue] = useState(
    "https://quick-start-ff151158.myshopify.com/"
  );
  const [basicModal, setBasicModal] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const auth = useSelector((state: any) => state.auth);
  const {
    shopifyScriptId,
    agentId,
    shopifyDomain,
    wixDomain,
    wixScriptAdded,
    hasBooterScript,
    shopify,
    wix,
    user,
  } = auth;
  let { shopifyToken } = user;
  console.log("auth : ", auth);

  //changes
  useEffect(() => {
    if (hasBooterScript || wixScriptAdded) {
      setSwitchValue(true);
    } else {
      setSwitchValue(false);
    }
    if (shopify) {
      setDomainValue(shopifyDomain);
    } else if (wix) {
      let widDomainWithoutHttps = wixDomain.replace("https://", "");
      setDomainValue(widDomainWithoutHttps);
    }
  }, [shopifyDomain, hasBooterScript]);

  const switchChangeHandler = (e: any) => {
    const { plan, wixInstanceId, wix, shopify } = user;

    let upgradeLink = `https://www.wix.com/apps/upgrade/a7f8ae58-f017-4b14-a9ee-eb97df0c9257?appInstanceId=${user.wixInstanceId}`;

    if (e.target.checked) {
      if (plan && plan !== "free") {
        setSwitchValue(true);
        store.dispatch(postShopifyScriptTags(agentId));
      } else {
        if (wix) {
          const w = window.open(upgradeLink, "_blank");
          if (w) {
            w.focus(); // okay now
          }
        } else if (shopify) {
          handleShow();
        }
      }
    } else {
      store.dispatch(deleteShopifyScriptTags(agentId));
      setSwitchValue(false);
    }
  };
  return (
    <AdminLayout>
      <Card>
        {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}
        <Modal centered show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h3>Upgrade your plan </h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Please select the plan from the Options : </p>
            <a
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => {
                store.dispatch(
                  getShopifyChargeConfirmationUrl({
                    planName: "Basic Plan ",
                    planValue: 1.2,
                    interval: "EVERY_30_DAYS",
                    agentId,
                  })
                );
              }}
            >
              Montly Plan
            </a>
            <br />
            <a
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => {
                store.dispatch(
                  getShopifyChargeConfirmationUrl({
                    planName: "Basic Plan Yearly",
                    planValue: 12,
                    interval: "ANNUAL",
                    agentId,
                  })
                );
              }}
            >
              Yearly Plan
            </a>
          </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Buy plan
            </Button>
          </Modal.Footer> */}
        </Modal>
        <Card.Header className="d-flex flex-direction-rtl justify-content-center align-items-center">
          Page Speed Settings
        </Card.Header>
        <Card.Body
          className="d-flex justify-content-around align-items-center"
          style={{ flexFlow: "column", gap: "20px" }}
        >
          <h1>Improve the Speed of your Store and increase Conversions</h1>
          {shopify && (
            <>
              <div>
                <h2>
                  <u>Step 1</u>
                </h2>
              </div>
              <h3 style={{ textAlign: "center", width: "70%" }}>
                Please click on the below button "Activate Script" and save the
                settings in your Shopify store <b>(for the first time only)</b>{" "}
                to enable our app.
              </h3>
              <Button
                style={{
                  width: "200px",
                  height: "50px",
                }}
                onClick={() => {
                  const w = window.open(
                    `https://${domainValue}/admin/themes/current/editor?context=apps&activateAppId=74bd0928-30ec-4e47-a543-d6e6ae1dc5cf/app-embed`,
                    "_blank"
                  );
                  if (w) {
                    w.focus(); // okay now
                  }
                }}
              >
                <p style={{ fontSize: "20px", paddingTop: "2px" }}>
                  Activate Script
                </p>
              </Button>
              <h2>
                <u>Step 2</u>
              </h2>
            </>
          )}
          <div>
            <img style={{ width: "155px" }} src="./rocket.jpg" />
          </div>
          <h3 style={{ textAlign: "center", width: "70%" }}>
            {switchValue
              ? "The app is successfully installed on your store."
              : "Improve the Speed of your Store and increase Conversions by switching this to ON"}
          </h3>
          <div style={{ display: "flex", gap: "10px" }}>
            <p style={{ marginTop: "32px", fontSize: "32px" }}>Off</p>
            <Form.Switch
              checked={switchValue}
              onChange={switchChangeHandler}
              style={{ margin: "1.1em", fontSize: "2rem" }}
            />
            <p style={{ marginTop: "32px", fontSize: "32px" }}>On</p>
          </div>
          <div>
            <Alert
              variant="warning"
              style={{
                display: "flex",
                borderTop: "5px solid gold",
                gap: "20px",
                alignItems: "flex-start",
              }}
            >
              <svg
                width="30px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z" />
              </svg>
              <div>
                <Alert.Heading>
                  IMPORTANT: WHY DO I NOT SEE ANY CHANGE IN MY SPEED SCORE?
                </Alert.Heading>
                <p>
                  Our app will not increase or decrease any page load speed
                  metrics, for example, PageSpeed Insights or Gmetrix. The
                  reason is this app preloads links and this works from the
                  second page view only. Hence this app does not take into
                  consideration the second page load times in its results.
                </p>
              </div>
              <div></div>
            </Alert>
            <button
              onClick={() => {
                const w = window.open(`https://${domainValue}`, "_blank");
                if (w) {
                  w.focus(); // okay now
                }
              }}
              className="preview-btn"
              style={{
                display: "flex",
                borderRadius: "5px",
                width: "19rem",
                gap: "15px",
                height: "2.7rem",
                justifyContent: "center",
                alignItems: "center",
                border: "2px solid #7373ea",
              }}
            >
              <svg
                width="18px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 256c0 79.5-64.5 144-144 144s-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144zM288 192c0 35.3-28.7 64-64 64c-11.5 0-22.3-3-31.6-8.4c-.2 2.8-.4 5.5-.4 8.4c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6z" />
              </svg>
              Preview your store now
            </button>
          </div>
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};
export default Settings;
