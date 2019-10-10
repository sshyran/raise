export const defaultContext = {
  onSetStep: () => () => null,
  onSetCredentials: () => null,
  onSendCredentials: () => null,
  onResetPassword: () => null,
  onSetPasswordBorrower: () => null,
  onActivateAccount: () => null,
  onLogin: () => null,
  error: false,
  onLoginURL: null,
  blur: false,
  referralCode: null,
  onRecover: () => null,
  setLoginError: () => null,
  onClose: () => null,
  open: false,
  closeButton: false,
  mountNode: null,
  onNotify: () => null,
  credentials: {
    email: '',
    password: '',
    username: '',
    country_id: '',
    mailingChecked: false,
    'g-recaptcha-response': ''
  },
  onResetToken: () => null
};
