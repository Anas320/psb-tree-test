import "@styles/globals.scss";
import type { AppProps } from "next/app";
// Next.js allows you to import CSS directly in .js files.
// It handles optimization and all the necessary Webpack configuration to make this work.
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { SSRProvider } from "react-bootstrap";
import initStore from "../redux/store";
import { createWrapper } from "next-redux-wrapper";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import store from "../redux/store";
import { checkSession } from "../redux/actions";

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

// You change this configuration value to false so that the Font Awesome core SVG library
// will not try and insert <style> elements into the <head> of the page.
// Next.js blocks this from happening anyway so you might as well not even try.
// See https://fontawesome.com/v6/docs/web/use-with/react/use-with#next-js
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (!logged && !window.location.pathname.includes("/shopify")) {
      store.dispatch(checkSession());
    }
  }, []);

  useEffect(() => {
    if (
      window.location.pathname === "/" &&
      localStorage.getItem("psb-auth-bearer-token")
    ) {
      window.location.href = "/settings";
    }
  }, []);

  // In server-side rendered applications, a SSRProvider must wrap the application in order
  // to ensure that the auto-generated ids are consistent between the server and client.
  // https://react-bootstrap.github.io/getting-started/server-side-rendering/
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <>
      {/* anas@conzia.com */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
              (function() {
                window.__insp = window.__insp || [];
                __insp.push(['wid', 1343907088]);
                var ldinsp = function(){
                if(typeof window.__inspld != "undefined") return; window.__inspld = 1; var insp = document.createElement('script'); insp.type = 'text/javascript'; insp.async = true; insp.id = "inspsync"; insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js?wid=1343907088&r=' + Math.floor(new Date().getTime()/3600000); var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(insp, x); };
                setTimeout(ldinsp, 0);
                })();
              `,
        }}
      />
      {/* nuria@alonecmw.com  */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
          (function() {
            window.__insp = window.__insp || [];
            __insp.push(['wid', 26904653]);
            var ldinsp = function(){
            if(typeof window.__inspld != "undefined") return; window.__inspld = 1; var insp = document.createElement('script'); insp.type = 'text/javascript'; insp.async = true; insp.id = "inspsync"; insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js?wid=26904653&r=' + Math.floor(new Date().getTime()/3600000); var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(insp, x); };
            setTimeout(ldinsp, 0);
            })();
              `,
        }}
      />

      <script
        dangerouslySetInnerHTML={{
          __html: `
          var metaTag = document.createElement("meta");
          metaTag.name = "google-site-verification";
          metaTag.content = "JKRcG8OgaY4LZ3sTEGRA8wVYZPSPx-p_-eTxsSSGuzI";
          document.getElementsByTagName("head")[0].appendChild(metaTag);
              `,
        }}
      />

      <script src="https://apis-development-testing.appconzia.com/api/channel/liveChat/chat-plugin-afteromni/625807eb2d1316612bc09ffc" />
      <Provider store={initStore}>
        <SSRProvider>
          <Component {...pageProps} />
        </SSRProvider>
      </Provider>
    </>
  );
}

const makeStore = () => initStore;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
