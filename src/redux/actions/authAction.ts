import axios from "axios";
import { authConstants, chatConstants } from "../types";
import config from "../../../config.json";
// import { getCustomer } from './index'
import store from "../store";

export const checkSession = () => (dispatch: any) => {
  dispatch({ type: authConstants.CHECKING_SESSION, payload: true });
  let token = localStorage.getItem("psb-auth-bearer-token");
  axios({
    method: "get",
    url: config.apiURL + "agents/myself",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(({ data }) => {
      //
      let {
        avatar,
        email,
        _id,
        domain,
        companyName,
        country,
        supervisorId,
        fullName,
        shopifyDomain,
        shopifyToken,
        shopify,
        afterOmni,
        wixDomain,
        wixInstanceId,
        plan,
        wix,
        operatingCategory,
        shopifyScriptId,
        hasBooterScript,
        wixScriptAdded,
      } = data;
      let object: any = {};
      object.user = {
        avatar,
        email,
        fullName,
        agentId: _id,
        domain,
        companyName,
        country,
        supervisorId,
        afterOmni,
        wixDomain,
        wix,
        operatingCategory,
        shopify,
        shopifyToken,
        shopifyScriptId,
        hasBooterScript,
        wixScriptAdded,
        wixInstanceId,
        plan,
      };
      object.agentId = _id;
      object.shopify = shopify;
      if (!domain && !shopify) {
        //
        dispatch({
          type: authConstants.GET_DOMAIN_REQUEST,
        });
        // localStorage.setItem('FB-login-require-domain', true)
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: object,
        });
      } else {
        if (domain) {
          object.domain = domain;
        }
        // object.fullName = fullName;
        // object.email = email;
        if (shopify) {
          object.shopifyDomain = shopifyDomain;
          object.user.shopifyDomain = shopifyDomain;
        }
        if (wix) {
          object.wixDomain = wixDomain;
          object.user.wixDomain = wixDomain;
          object.wixInstanceId = wixInstanceId;
          object.plan = plan;
        }
        // if (shopifyDomain) {
        //   localStorage.setItem('conzia-inspectlet-shopiy-store', shopifyDomain)
        //   if (window && window.__insp)
        //     window.__insp.push(['identify', shopifyDomain])
        // } else {
        //   localStorage.setItem('conzia-inspectlet-shopiy-store', domain)
        //   if (window && window.__insp) window.__insp.push(['identify', domain])
        // }
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: object,
        });
        dispatch({ type: authConstants.CHECKING_SESSION, payload: false });
        // dispatch(getCustomer())
        // if (
        //   !store.getState().auth.socketConnected ||
        //   !store.getState().auth.socketIoAuthenticated
        // ) {
        //   connectSocketAndStartListening()
        // }
      }
    })
    .catch((error) => {
      //

      dispatch({
        type: authConstants.LOGOUT,
      });
      dispatch({ type: authConstants.CHECKING_SESSION, payload: false });
    });
};

export const register = (values: any) => (dispatch: any) => {
  dispatch({
    type: authConstants.REGISTER_REQUEST,
  });
  let object: any = {};
  object.email = values.email;
  object.password = values.password;
  object.domain = values.domain;
  let form = JSON.stringify(object);
  axios({
    method: "post",
    url: config.apiURL + "auth/register-yourself",
    data: form,
    headers: {
      "Content-Type": "application/json",
    },
    // withCredentials: true,
  })
    .then(({ data }) => {
      //
      let { message } = data;
      dispatch({
        type: authConstants.REGISTER_SUCCESS,
        payload: message,
      });
      dispatch({
        type: authConstants.USER_PROCESSING_END,
      });
      setTimeout(() => {
        dispatch({
          type: authConstants.RESET_REGISTER_MESSAGE,
        });
      }, 5000);
    })
    .catch((error) => {
      //
      if (error.response) {
        if (error.response.status === 409) {
          dispatch({
            type: authConstants.USER_ALREADY_EXISTS,
          });
        } else if ((error.response.status = 400)) {
          let { message } = error.response.data;
          if (message.length > 1) {
            dispatch({
              type: authConstants.REGISTER_FAILURE,
              payload:
                "Password Must be string and atleast 8 characters. Domain must be a valid URL",
            });
          } else {
            let { property } = message[0];
            dispatch({
              type: authConstants.REGISTER_FAILURE,
              payload:
                property === "password"
                  ? "Password Must be string and atleast 8 characters. Domain must be a valid URL"
                  : property === "domain"
                  ? "Domain must be a valid URL!"
                  : "An error occured please contact at support@conzia.com",
            });
          }
        }
      } else if (error.request) {
        //
        dispatch({
          type: authConstants.REGISTER_FAILURE,
          payload: error.response.data,
        });
      } else {
        //
        dispatch({
          type: authConstants.REGISTER_FAILURE,
          payload: error.response && error.response.data,
        });
      }
      // dispatch({
      //   type: authConstants.REGISTER_FAILURE,
      //   payload: "Error",
      // });
      // dispatch({
      //   type: authConstants.USER_PROCESSING_END,
      // });
      setTimeout(() => {
        dispatch({
          type: authConstants.RESET_REGISTER_MESSAGE,
        });
      }, 5000);
    });
};

export const login = (values: any) => (dispatch: any) => {
  // return new Promise((resolve, reject) => {
  dispatch({
    type: authConstants.LOGIN_REQUEST,
  });
  let object: any = {};
  let hasPassword;
  object.email = values.email;
  object.password = values.password;
  let form = JSON.stringify(object);
  axios({
    method: "post",
    url: config.apiURL + "auth/login",
    data: form,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(({ data }) => {
      //
      let {
        avatar,
        fullName,
        jwt,
        email,
        password,
        _id,
        domain,
        companyName,
        country,
        supervisorId,
        shopifyDomain,
        wixDomain,
        wix,
      } = data;
      hasPassword = password ? "true" : "false";
      let object = {
        avatar,
        email,
        agentId: _id,
        domain,
        companyName,
        country,
        supervisorId,
        wixDomain,
        wix,
      };

      // Setup local Storage values
      localStorage.setItem("psb-auth-bearer-token", jwt);
      // dispatch({ type: authConstants.LOGIN_SUCCESS, payload: object })
      // dispatch({
      //   type: chatConstants.GET_ALL_CONVERSATIONS_LOADING,
      //   payload: true,
      // })
      setTimeout(() => {
        window.location.reload();
      });
      // setTimeout(() => {
      //   dispatch({
      //     type: chatConstants.GET_ALL_CONVERSATIONS_LOADING,
      //     payload: true
      //   })
      //   dispatch(getCustomer())
      //   connectSocketAndStartListening()
      // }, 3000)

      // dispatch(getCustomer())
      // connectSocketAndStartListening()

      // dispatch({ type: authConstants.USER_PROCESSING_END })
      // resolve('success')
    })
    .catch((error) => {
      //

      if (error.response) {
        if (error.response.status === 401) {
          dispatch({
            type: authConstants.LOGIN_FAILURE,
            payload: { message: "Either email or password is incorrect." },
          });
          dispatch({ type: authConstants.USER_PROCESSING_END });
        }
      }
      setTimeout(() => {
        dispatch({ type: authConstants.CLEAR_ERROR });
      }, 3000);
      // dispatch({
      //   type: authConstants.LOGIN_FAILURE,
      // });
      // dispatch({ type: authConstants.USER_PROCESSING_END });
      // reject('error')
    });
  //
};

export const checkSessionShopify = () => (dispatch: any) => {
  dispatch({ type: authConstants.CHECKING_SESSION, payload: true });
  let token = localStorage.getItem("psb-auth-bearer-token");
  axios({
    method: "get",
    url: config.apiURL + "agents/myself",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(({ data }) => {
      //
      let {
        email,
        fullName,
        jwt,
        domain,
        _id,
        shopifyDomain,
        shopify,
        wixDomain,
        plan,
        wixInstanceId,
      } = data;
      // localStorage.setItem("psd-auth-bearer-token", jwt);
      let object: any = {};
      object.fullName = fullName;
      object.email = email;
      object.agentId = _id;
      object.shopifyDomain = shopifyDomain;
      object.wixDomain = wixDomain;
      object.shopify = shopify;
      object.wixInstanceId = wixInstanceId;
      object.plan = plan;
      dispatch({ type: authConstants.CHECKING_SESSION, payload: false });
      //   dispatch(getCustomer())
      //   if (
      //     !store.getState().auth.socketConnected ||
      //     !store.getState().auth.socketIoAuthenticated
      //   ) {
      //     connectSocketAndStartListening()
      //   }
    })
    .catch((error) => {
      //

      dispatch({
        type: authConstants.LOGOUT,
      });
      dispatch({ type: authConstants.CHECKING_SESSION, payload: false });
    });
};

export const logOut = () => (dispatch: any) => {
  // const router = useRouter();

  let token = localStorage.getItem("psb-auth-bearer-token");
  // window.location.href("/auth/Login");
  // dispatch(checkSession());
  // router.push("/auth/Login");
  const ev = new CustomEvent("conziaLoggedOut", {
    bubbles: true,
    detail: true,
  });
  // localStorage.removeItem('Conzia-loggedIn')
  localStorage.removeItem("psb-auth-bearer-token");
  localStorage.removeItem("conzia-auth-has-password");
  localStorage.removeItem("conzia-auth-agent-id");
  // dispatch({ type: authConstants.LOGOUT });
  dispatch({ type: authConstants.LOGOUT });
  dispatch({ type: "USER_LOGGED_OUT" });
  document.dispatchEvent(ev);
};

export const addPassword = (values: any, agentId: any) => (dispatch: any) => {
  dispatch({ type: authConstants.ADD_PASSWORD_LOADING });
  axios({
    method: "post",
    url: config.apiURL + "agents/add-password/" + agentId,
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(values),
  })
    .then(({ data }) => {
      //
      let { success } = data;
      dispatch({
        type: authConstants.ADD_PASSWORD_SUCCESS,
        payload: true,
      });

      // setTimeout(() => {
      //   dispatch({ type: authConstants.ADD_AGENT_RESET });
      // }, 3000);
    })
    .catch((error) => {
      let { response } = error;
      let { statusCode, message } = response.data;
      //
      // if (statusCode === 409) {
      //   dispatch({
      //     type: authConstants.ADD_PASSWORD_FAILURE,
      //     payload: message,
      //   });
      // } else {
      dispatch({
        type: authConstants.ADD_PASSWORD_FAILURE,
        payload: "Failed to create agent please contact your provider",
      });
      // }
      // setTimeout(() => {
      //   dispatch({ type: authConstants.ADD_AGENT_RESET });
      // }, 3000);
    });
};

// TODO :: setPassword action
export const setPassword = (values: any) => (dispatch: any) => {
  let token = localStorage.getItem("psb-auth-bearer-token");

  // DBG
  // console.log(
  //   `Setting Password for agent: ${values.agentId} with password: ${values.newPassword}`
  // )

  dispatch({ type: authConstants.SET_PASSWORD_LOADING });
  axios({
    method: "put",
    url: `${config.apiURL}agents/set-password/${values.agentId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(values),
  })
    .then(({ data }) => {
      //
      let { success } = data;
      dispatch({
        type: authConstants.SET_PASSWORD_SUCCESS,
        payload: true,
      });
    })
    .catch((error) => {
      let { response } = error;
      let { statusCode, message } = response.data;
      dispatch({
        type: authConstants.SET_PASSWORD_FAILED,
        payload: "Failed to create agent password please contact your provider",
      });
    });
};

export const hasPassword = (agentId: any) => (dispatch: any) => {
  let token = localStorage.getItem("psb-auth-bearer-token");

  // DBG
  // console.log(`Has Password for agent: ${agentId}`)

  dispatch({ type: authConstants.HAS_PASSWORD_LOADING });
  axios({
    method: "get",
    url: `${config.apiURL}agents/haspassword/${agentId}`,
  })
    .then(({ data }) => {
      dispatch({
        type: authConstants.HAS_PASSWORD_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: authConstants.HAS_PASSWORD_FAILED,
        payload: "Failed to check agent password",
      });
    });
};

export const loginUsingShopify = (values: any) => (dispatch: any) => {
  dispatch({
    type: authConstants.LOGIN_USING_SHOPIFY_LOADING,
    payload: true,
  });
  axios({
    method: "post",
    url: config.apiURL + "auth/shopify-login",
    data: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(({ data }) => {
      //
      let {
        email,
        password,
        fullName,
        jwt,
        domain,
        _id,
        shopifyDomain,
        wixDomain,
        shopify,
      } = data;

      let object: any = {};
      object.fullName = fullName;
      object.email = email;
      object.agentId = _id;
      object.shopifyDomain = shopifyDomain;
      object.wixDomain = wixDomain;
      object.shopify = shopify;
      object.domain = domain;
      dispatch({ type: authConstants.LOGIN_USING_SHOPIFY, payload: object });
      //   dispatch(getCustomer())
      // dispatch({
      //   type: authConstants.LOGIN_USING_SHOPIFY_LOADING,
      //   payload: false,
      // });
    })
    .catch((error) => {
      //
      if (error.response) {
        if (error.response.status === 401) {
          dispatch({
            type: authConstants.LOGIN_FAILURE,
          });
          // dispatch({ type: authConstants.USER_PROCESSING_END });
        }
      }
      dispatch({
        type: authConstants.LOGIN_FAILURE,
      });
      // dispatch({ type: authConstants.USER_PROCESSING_END });
      // reject('error')
    });
};

export const postShopifyScriptTags = (agentId: any) => (dispatch: any) => {
  let token = localStorage.getItem("psb-auth-bearer-token");

  dispatch({ type: authConstants.SET_PASSWORD_LOADING });
  axios({
    method: "post",
    url: `${config.apiURL}agents/ws-script-tag/${agentId}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {})
    .catch((error) => {
      let { response } = error;
      let { statusCode, message } = response.data;
    });
};

export const getShopifyChargeConfirmationUrl =
  (chargingDetails: any) => (dispatch: any) => {
    axios({
      method: "post",
      url: `${config.apiURL}agents/shopify/ConfirmationUrl/${chargingDetails.agentId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(chargingDetails),
    })
      .then((response) => {
        window.open(
          response.data.response.data.appSubscriptionCreate.confirmationUrl
        );
      })
      .catch((error) => {
        let { response } = error;
        let { statusCode, message } = response.data;
      });
  };

export const deleteShopifyScriptTags = (agentId: any) => (dispatch: any) => {
  let token = localStorage.getItem("psb-auth-bearer-token");

  // DBG
  // console.log(
  //   `Setting Password for agent: ${values.agentId} with password: ${values.newPassword}`
  // )

  dispatch({ type: authConstants.SET_PASSWORD_LOADING });
  axios({
    method: "delete",
    url: `${config.apiURL}agents/ws-script-tag/${agentId}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // data: JSON.stringify(values),
  })
    .then((response) => {
      console.log("response  : ", response);
      //
      // let { success } = data
      // dispatch({
      //   type: authConstants.SET_PASSWORD_SUCCESS,
      //   payload: true,
      // })
    })
    .catch((error) => {
      let { response } = error;
      let { statusCode, message } = response.data;
      // dispatch({
      //   type: authConstants.SET_PASSWORD_FAILED,
      //   payload: 'Failed to create agent password please contact your provider',
      // })
    });
};

export const changeEmailAlreadyExistsValue =
  (value: any) => (dispatch: any) => {
    dispatch({
      type: authConstants.CHANGE_EXISTING_EMAIL_VALUE,
      payload: value,
    });
  };

export const ShopifyRenameEmailForEixistingAgent =
  (email: string, shopifyId: any, jwt: string) => (dispatch: any) => {
    // let token = localStorage.getItem("conzia-auth-bearer-token");
    axios({
      method: "post",
      url: `${config.apiURL}auth/shopify/emailRename?email=${email}&shopifyId=${shopifyId}&renameEmail=true`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(({ data }) => {
        if (data) {
          window.location.href = `/shopify?${jwt}`;
        } else {
          dispatch(changeEmailAlreadyExistsValue(true));
        }
      })
      .catch((error) => {
        //
        if (error.response) {
          console.log(error.response);
        }

        // dispatch({ type: authConstants.USER_PROCESSING_END });
        // reject('error')
      });
  };

export const wixRenameEmailForEixistingAgent =
  (email: string, instanceId: string) => (dispatch: any) => {
    // let token = localStorage.getItem("conzia-auth-bearer-token");
    axios({
      method: "get",
      url: `${config.apiURL}auth/wixAuthentication?email=${email}&instanceId=${instanceId}&renameEmail=true`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(({ data }) => {
        window.location.href = data;
      })
      .catch((error) => {
        //
        if (error.response) {
          console.log(error.response);
        }

        // dispatch({ type: authConstants.USER_PROCESSING_END });
        // reject('error')
      });
  };
