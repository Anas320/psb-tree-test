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
} from "src/redux/actions";
import store from "src/redux/store";

const Settings = () => {
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
  const shopifyAppsListing = [
    {
      tagline: "increase your conversion by 40%",
      appName: "Conzia Live Chat Widgets",
      ratingAndReviews: "5.0 (98+ reviews)",
      desc: "All messaging apps in one widget -40% more sales",
      subDesc: "Average setup time :2 minutes",
      subDesc2: "Increase your sales by providing quick customer support",
      buttonLink: "https://apps.shopify.com/conzia",
      buttonText: "Add App on Shopify",
    },
    {
      tagline: "Optimize your SEO rankings",
      appName: "Conzia Easy SEO",
      ratingAndReviews: "5.0",
      desc: "Add meta tags, alt-texts, sitemap and many more to your optimize your store",
      subDesc: "Average setup time :2 minutes",
      subDesc2: "Increate your organic by using this app",
      buttonLink: "https://apps.shopify.com/conzia-easy-seo",
      buttonText: "Add App on Shopify",
    },
  ];
  const wixAppsListing = [
    {
      tagline: "increase your conversion by 40%",
      appName: "Conzia Live Chat Widgets",
      ratingAndReviews: "5.0",
      desc: "All messaging apps in one widget -40% more sales",
      subDesc: "Average setup time :2 minutes",
      subDesc2: "Increase your sales by providing quick customer support",
      buttonLink: "https://www.wix.com/app-market/conzia-live-chat-whatsapp",
      buttonText: "Add App on Wix",
    },
  ];
  const [switchValue, setSwitchValue] = useState(false);
  const [domainValue, setDomainValue] = useState("");
  const [appsListing, setAppsListing] = useState<any>();
  useEffect(() => {
    if (wix) {
      setAppsListing(wixAppsListing);
    } else {
      setAppsListing(shopifyAppsListing);
    }
  }, [wix]);

  console.log("user : ", user);
  console.log("hasBooterScript : ", hasBooterScript);

  useEffect(() => {
    console.log(" from useeffect : ", shopifyScriptId);
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
    if (e.target.checked) {
      setSwitchValue(true);
      store.dispatch(postShopifyScriptTags(agentId));
    } else {
      store.dispatch(deleteShopifyScriptTags(agentId));
      setSwitchValue(false);
    }
  };
  return (
    <AdminLayout>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <h1>Our Recommended Apps</h1>
        {appsListing &&
          appsListing.map(
            ({
              tagline,
              appName,
              ratingAndReviews,
              desc,
              subDesc,
              subDesc2,
              buttonText,
              buttonLink,
            }: any) => {
              return (
                <Card
                  style={{
                    borderLeft: "4px solid rgba(55, 113, 200, 1)",
                    borderRadius: "15px",
                  }}
                >
                  <Card.Body
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{}}>
                      <p
                        style={{
                          background: "rgba(55, 113, 200, 0.1)",
                          color: "rgba(55, 113, 200, 1)",
                          padding: "0 5px",
                          width: "max-content",
                          borderRadius: "5px",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <img width="15px" src="./trend.png" /> {tagline}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "20px",
                        }}
                      >
                        <div
                          style={{
                            background: "#efefef",
                            borderRadius: "10px",
                            padding: "20px",
                          }}
                        >
                          <img
                            style={{ width: "65px", height: "65px" }}
                            src="/images/logo-min.png"
                          />
                        </div>
                        <div style={{}}>
                          <h3>{appName}</h3>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            {/* <img src="" /> */}
                            ***** {ratingAndReviews}
                          </div>
                          <h6>{desc}</h6>
                        </div>
                      </div>
                      <p
                        style={{
                          margin: "10px 0 0 0",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <img width="15px" src="./clock.png" /> {subDesc}
                      </p>
                      <p
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <img width="15px" src="./sales.png" /> {subDesc2}
                      </p>
                    </div>
                    <div>
                      <Button
                        onClick={() => {
                          window.open(buttonLink);
                        }}
                      >
                        {buttonText}
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              );
            }
          )}
      </div>
    </AdminLayout>
  );
};
export default Settings;
