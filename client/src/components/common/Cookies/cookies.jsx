import Cookies from "js-cookie";

class WebCookies {
  // set cookies in webpage
  static SetCookie = (cookieName, userIn) => {
    Cookies.set(cookieName, userIn, {
      expires: 1,
      secure: true,
      sameSite: "Strict",
      path: "/",
    });
  };
  // get cookies in webpage
  static GetCookie = (cookieName) => {
    return Cookies.get(cookieName);
  };
  // Remove cookies in webpage
  static RemoveCookie = (cookieName) => {
    Cookies.remove(cookieName);
  };
}
export default WebCookies;
