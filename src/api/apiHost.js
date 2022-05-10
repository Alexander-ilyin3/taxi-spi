export const apiHost = process.env.NODE_ENV === "development"
? process.env.REACT_APP_BASE_URL
: window.sjd_inline_script.api_domain;
