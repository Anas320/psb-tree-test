// import {client} from 'socket'
import { authConstants } from "../types";

const InitialState = {
  //Loading
  loading: false,
  verifiyLoading: false,

  //session
  checkingSession: false,
  sessionChecked: false,

  //Login
  logged: false,
  loginSuccess: false,
  loginError: null,
  loginErrorMessage: "",
  verified: false,
  verificationError: false,
  verificationErrorMessage: null,

  //User
  user: {},
  userBar: null,
  userName: null,
  childAgent: false,

  updateLoading: false,
  updatedSuccessfully: false,
  updatedFailed: false,

  // Avatar
  updatingAvatar: false,
  updatingAvatarSuccess: false,
  updatingAvatarFailure: false,

  updatingAvatarAndName: false,
  updatingAvatarAndNameSuccess: false,
  updatingAvatarAndNameFailure: false,

  //Register
  registerMessage: null,
  registerFailed: false,
  registerSuccess: false,
  registerLoading: false,

  //Facebook Login
  facebookLoading: false,

  //Add domain after Facebook login
  addDomainLoading: false,
  getDomain: false,
  getDomainMessage: null,
  getDomainFailure: false,
  getDomainSuccess: false,
  domainAlreadyExists: false,

  //Forget Password
  forgotPasswordLoading: false,
  forgotPasswordMessage: null,
  forgotPasswordLink: false,
  resetPasswordLoading: false,
  resetPasswordEmail: null,
  resetPasswordMessage: null,

  //Socket.io Authenticated
  socketIoAuthenticated: false,
  socketConnected: false,
  socketConnecting: true,

  //Add agent
  addAgentLoading: false,
  addAgentSuccess: false,
  addAgentFailed: false,
  addAgentFialedMessage: "",

  // check password
  checkPasswordLoading: false,
  checkPasswordSuccess: true, //it means we need to take password from user
  checkPasswordError: false,
  checkPasswordErrorMessage: "",

  // add password
  addPasswordLoading: false,
  addPasswordSuccess: false,
  addPasswordFailed: false,
  addPasswordFailedMessage: "",

  // TODO ::
  // set password
  setPasswordLoading: false,
  setPasswordSuccess: false,
  setPasswordFailed: false,
  setPasswordFailedMessage: "",

  // has password
  hasPasswordLoading: undefined,
  hasPasswordSuccess: true,
  hasPasswordFailed: false,

  //GET ALL AGENTS
  getAllAgentsLoading: false,
  getAllAgentsSuccess: false,
  getAllAgentsFailure: false,
  allAgentsData: [],

  // CHANGE Password]
  changePasswordLoading: false,
  changePasswordSuccess: false,
  changePasswordFailed: false,
  changePasswordFailedMessage: "",

  // Socket.io
  clients: [],
  client: null,
  disconnectCount: 0,
  shopifyScriptId: "",
  hasBooterScript: 10,
  fullName: "",
  shopifyDomain: "",
  wixDomain: "",
  wixScriptAdded: false,
  emailAlreadyExists: false,
};

const AuthReducers = (state = InitialState, action: any) => {
  switch (action.type) {
    case authConstants.REGISTER_REQUEST:
      return { ...state, registerLoading: true };

    case authConstants.CHECKING_SESSION:
      return { ...state, checkingSession: action.payload };

    case authConstants.REGISTER_FAILURE:
      return {
        ...state,
        registerMessage: action.payload,
        registerFailed: true,
        registerLoading: false,
      };

    case authConstants.REGISTER_SUCCESS:
      return {
        ...state,
        registerMessage: action.payload,
        registerSuccess: true,
        registerLoading: false,
      };

    case authConstants.RESET_LOGIN_SUCCESS:
      return { ...state, loginSuccess: false };

    case authConstants.LOGIN_CLEAR_ERROR:
      return { ...state, loginError: null };

    case authConstants.LOGIN_REQUEST:
      return { ...state, loading: true, loginError: null };

    case authConstants.TEMP_LOGIN_SUCCESS:
      return { ...state, logged: true, loading: false, sessionChecked: true };

    case authConstants.LOGIN_SUCCESS: {
      let {
        shopify,
        shopifyDomain,
        user,
        agentId,
        domain,
        wixDomain,
        wixInstanceId,
        plan,
        wix,
      } = action.payload;
      console.log("action.payloadssssss : ", user);
      console.log("wix Domain from auth reducer : ", wixDomain);
      let object: any = {
        shopify,
        user,
        agentId,
        domain,
        wixDomain,
      };
      if (shopify) {
        object.shopifyDomain = shopifyDomain;
      } else if (wix) {
        object.wixDomain = wixDomain;
        object.wixInstanceId = wixInstanceId;
        object.plan = plan;
      }
      return {
        ...state,
        shopifyScriptId: user.shopifyScriptId,
        hasBooterScript: user.hasBooterScript,
        wixScriptAdded: user.wixScriptAdded,
        shopify: user.shopify,
        wix: user.wix,
        wixDomain: user.wixDomain,
        fullName: user.fullName,
        shopifyDomain: user.shopifyDomain,
        loading: false,
        loginSuccess: true,
        logged: true,
        loginError: null,
        user: user,
        sessionChecked: true,
        childAgent: action.payload.supervisorId ? true : false,
        ...object,
      };
    }

    case authConstants.UPDATING_AGENT_DATA_LOADING:
      return {
        ...state,
        updateLoading: action.payload,
      };
    case authConstants.UPDATE_COMPANY_DATA_FAILED:
      return { ...state, updatedFailed: true };

    case authConstants.UPDATE_COMPANY_DATA:
      return {
        ...state,
        user: action.payload,
        updatedSuccessfully: true,
      };

    case authConstants.UPDATE_COMPANY_DATA_RESET:
      return {
        ...state,
        updatedSuccessfully: false,
        updatedFailed: false,
        updateLoading: false,
      };

    case authConstants.LOGIN_USING_FACEBOOK_LOADING:
      return { ...state, facebookLoading: action.payload };

    case authConstants.LOGIN_USING_FACEBOOK:
      return {
        ...state,
        loading: false,
        loginSuccess: true,
        logged: true,
        loginError: null,
        user: action.payload,
      };

    case authConstants.LOGIN_USING_SHOPIFY_LOADING:
      return { ...state, shopifyLoading: action.payload };

    case authConstants.LOGIN_USING_SHOPIFY:
      return {
        ...state,
        loading: false,
        loginSuccess: true,
        logged: true,
        loginError: null,
        user: action.payload,
        email: action.email,
        fullName: action.fullName,
        shopify: action.shopify,
        // shopifyDomain: shopifyDomain,
        shopifyLoading: false,
      };

    case authConstants.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        logged: false,
        loginError: true,
        loginErrorMessage: action.payload.message,
      };

    case authConstants.USER_PROCESSING_START:
      return { ...state, loading: true, registerMessage: null };

    case authConstants.USER_PROCESSING_END:
      return { ...state, loading: false };

    case authConstants.USER_ALREADY_EXISTS:
      return {
        ...state,
        registerMessage: "User with this email already exists!",
        registerFailed: true,
      };

    case authConstants.RESET_REGISTER_MESSAGE:
      return {
        ...state,
        registerFailed: false,
        registerSuccess: false,
        registerMessage: null,
      };

    case authConstants.CLEAR_ERROR:
      return { ...state, loginError: false };

    case authConstants.LOGOUT: {
      return { ...state, logged: false, sessionChecked: true };
    }

    case authConstants.TOKEN_VERIFYING_START:
      return { ...state, verifiyLoading: true };

    case authConstants.TOKEN_VERIFYING_END:
      return { ...state, verifiyLoading: false };

    case authConstants.TOKEN_VERIFYING_FAILURE:
      return {
        ...state,
        verified: false,
        verificationError: true,
        verificationErrorMessage: action.payload || null,
      };

    case authConstants.TOKEN_VERIFYING_SUCCESS:
      return { ...state, verified: true };

    case authConstants.FORGOT_PASSWORD_REQUEST_SUCCESS:
      return {
        ...state,
        forgotPasswordLink: true,
        forgotPasswordMessage: action.payload,
      };

    case authConstants.RESET_PASSWORD_REQUEST_EMAIL:
      return { ...state, resetPasswordEmail: action.payload };

    case authConstants.FORGOT_PASSWORD_REQUEST_FAILURE:
      return {
        ...state,
        forgotPasswordLink: false,
        forgotPasswordMessage: action.payload,
      };

    case authConstants.RESET_PASSWORD_REQUEST_SUCCESS:
      return { ...state, resetPasswordMessage: action.payload };

    case authConstants.RESET_PASSWORD_REQUEST_FAILURE:
      return { ...state, resetPasswordMessage: action.payload };

    case authConstants.RESET_PASSWORD_RESET_MESSAGE:
      return { ...state, resetPasswordEmail: null, resetPasswordMessage: null };

    case authConstants.FORGOT_PASSWORD_RESET_MESSAGE:
      return {
        ...state,
        forgotPasswordLoading: false,
        forgotPasswordLink: false,
        forgotPasswordMessage: null,
        resetPasswordEmail: null,
        resetPasswordMessage: null,
        resetPasswordLoading: false,
      };

    case authConstants.GET_DOMAIN_REQUEST:
      return { ...state, getDomain: true };

    case authConstants.ADD_DOMAIN_LOADING:
      return { ...state, addDomainLoading: action.payload };

    case authConstants.GET_DOMAIN_SUCCESS:
      return {
        ...state,
        getDomain: false,
        getDomainSuccess: true,
        getDomainMessage: action.payload,
      };

    case authConstants.GET_DOMAIN_FAILURE:
      return {
        ...state,
        getDomainFailure: true,
        getDomainMessage: action.payload,
      };

    case authConstants.GET_DOMAIN_ALREADY_EXISTS:
      return {
        ...state,
        domainAlreadyExists: true,
        getDomainMessage: "Already Exists",
      };

    case authConstants.RESET_DOMAIN_MESSAGE:
      return {
        ...state,
        getDomainMessage: null,
        getDomainFailure: false,
        getDomainSuccess: false,
        domainAlreadyExists: false,
      };

    case authConstants.AUTHENTICATE_SOCKET_IO:
      return { ...state, socketIoAuthenticated: action.payload };

    case authConstants.FORGOT_PASSWORD_LOADING:
      return { ...state, forgotPasswordLoading: action.payload };

    case authConstants.RESET_PASSWORD_REQUEST_LOADING:
      return { ...state, resetPasswordLoading: action.payload };

    case authConstants.SOCKET_CONNECTED:
      return { ...state, socketConnected: true, socketConnecting: false };

    case authConstants.SOCKET_CONNECTED_DATA: {
      return {
        ...state,
        client: action.payload,
        clients: [...state.clients, action.payload],
      };
    }

    case authConstants.SOCKET_DISCONNECTED:
      return {
        ...state,
        socketConnected: false,
        socketConnecting: false,
        disconnectCount: state.disconnectCount + 1,
      };

    case authConstants.SOCKET_RECONNECTING: {
      //console.log("inside connecting");
      return { ...state, socketConnecting: true, socketConnected: false };
    }

    case authConstants.UPDATING_AVATAR:
      return { ...state, updatingAvatar: true };

    case authConstants.UPDATING_AVATAR_SUCCESS:
      return {
        ...state,
        updatingAvatarSuccess: true,
        user: { ...state.user, avatar: action.payload },
        updatingAvatar: false,
      };

    case authConstants.UPDATING_AVATAR_FAILURE:
      return { ...state, updatingAvatarFailure: true, updatingAvatar: false };

    case authConstants.UPDATING_AVATAR_RESET:
      return {
        ...state,
        updatingAvatar: false,
        updatingAvatarSuccess: false,
      };

    case authConstants.UPDATING_AVATAR_AND_NAME:
      return { ...state, updatingAvatarAndName: true };

    case authConstants.UPDATING_AVATAR_AND_NAME_SUCCESS:
      return {
        ...state,
        updatingAvatarAndName: false,
        updatingAvatarAndNameSuccess: true,
        updatingAvatarAndNameFailure: false,
        user: {
          ...state.user,
          avatar: action.payload.avatar,
          fullName: action.payload.fullName,
        },
      };

    case authConstants.UPDATING_AVATAR_AND_NAME_FAILURE:
      return {
        ...state,
        updatingAvatarAndName: false,
        updatingAvatarAndNameFailure: true,
      };

    case authConstants.UPDATING_AVATAR_AND_NAME_RESET:
      return {
        ...state,
        updatingAvatarAndName: false,
        updatingAvatarAndNameSuccess: false,
        updatingAvatarAndNameFailure: false,
      };

    case authConstants.ADD_AGENT_LOADING:
      return {
        ...state,
        addAgentLoading: action.payload,
        addAgentFailed: false,
        addAgentFialedMessage: "",
      };

    case authConstants.ADD_AGENT_SUCCESS:
      return {
        ...state,
        addAgentLoading: false,
        addAgentSuccess: true,
        addAgentFailed: false,
        addAgentFialedMessage: "",
      };

    case authConstants.ADD_AGENT_FAILED:
      return {
        ...state,
        addAgentLoading: false,
        addAgentFailed: true,
        addAgentFialedMessage: action.payload,
        addAgentSuccess: false,
      };

    case authConstants.ADD_AGENT_RESET:
      return {
        ...state,
        addAgentLoading: false,
        addAgentFailed: false,
        addAgentSuccess: false,
        addAgentFialedMessage: "",
      };

    case authConstants.CHECK_ADD_PASSWORD_LOADING:
      return { ...state, checkPasswordLoading: true };

    case authConstants.CHECK_ADD_PASSWORD_SUCCESS:
      return {
        ...state,
        checkPasswordSuccess: true,
        checkPasswordLoading: false,
      };

    case authConstants.CHECK_ADD_PASSWORD_FAILED:
      return {
        ...state,
        checkPasswordLoading: false,
        checkPasswordError: true,
        checkPasswordErrorMessage: action.payload,
      };

    case authConstants.ADD_PASSWORD_LOADING:
      return { ...state, addPasswordLoading: true };

    case authConstants.ADD_PASSWORD_SUCCESS:
      return { ...state, addPasswordLoading: false, addPasswordSuccess: true };

    case authConstants.ADD_PASSWORD_FAILURE:
      return {
        ...state,
        addPasswordLoading: false,
        addPasswordFailed: true,
        addPasswordFailedMessage: action.payload,
      };
    case authConstants.ADD_PASSWORD_RESET:
      return {
        ...state,
        addPasswordLoading: false,
        addPasswordSuccess: false,
        addPasswordFailed: false,
        addPasswordFailedMessage: "",
      };

    case authConstants.GET_AGENTS_LOADING:
      return { ...state, getAllAgentsLoading: true };

    case authConstants.GET_AGENTS_SUCCESS:
      return {
        ...state,
        getAllAgentsSuccess: true,
        getAllAgentsLoading: false,
        allAgentsData: action.payload,
      };

    case authConstants.GET_AGENTS_FAILED:
      return {
        ...state,
        getAllAgentsFailure: true,
        getAllAgentsLoading: false,
      };

    case authConstants.CHANGE_PASSWORD_LOADING:
      return { ...state, changePasswordLoading: true };

    case authConstants.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordLoading: false,
        changePasswordSuccess: true,
      };

    case authConstants.CHANGE_PASSWORD_FAILED:
      return {
        ...state,
        changePasswordSuccess: false,
        changePasswordFailed: true,
        changePasswordFailedMessage: action.payload,
        changePasswordLoading: false,
      };

    case authConstants.CHANGE_PASSWORD_RESET:
      return {
        ...state,
        changePasswordSuccess: false,
        changePasswordFailed: false,
        changePasswordFailedMessage: "",
        changePasswordLoading: false,
      };
    // TODO :: Set paswoord states

    case authConstants.SET_PASSWORD_LOADING:
      return { ...state, setPasswordLoading: true };

    case authConstants.SET_PASSWORD_SUCCESS:
      return {
        ...state,
        setPasswordLoading: false,
        setPasswordSuccess: true,
      };

    case authConstants.SET_PASSWORD_FAILED:
      return {
        ...state,
        setPasswordSuccess: false,
        setPasswordFailed: true,
        setPasswordFailedMessage: action.payload,
        setPasswordLoading: false,
      };

    case authConstants.SET_PASSWORD_RESET:
      return {
        ...state,
        setPasswordSuccess: false,
        setPasswordFailed: false,
        setPasswordFailedMessage: "",
        setPasswordLoading: false,
      };

    case authConstants.HAS_PASSWORD_LOADING:
      return { ...state, hasPasswordLoading: true };

    case authConstants.HAS_PASSWORD_SUCCESS:
      return {
        ...state,
        hasPasswordLoading: false,
        hasPasswordSuccess: action.payload,
      };

    case authConstants.HAS_PASSWORD_FAILED:
      return {
        ...state,
        hasPasswordFailed: true,
        hasPasswordLoading: false,
      };
    case authConstants.CHANGE_EXISTING_EMAIL_VALUE:
      return {
        ...state,
        emailAlreadyExists: action.payload,
      };

    default:
      return state;
  }
};

export default AuthReducers;
