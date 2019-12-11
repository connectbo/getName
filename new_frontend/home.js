//see if user is authenticated by checking cookie set by sign in page
//function to get a cookie, reference https://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// function to check if cookie is set reference https://www.w3schools.com/js/js_cookies.asp
function checkCookie(cname) {
  const cvalue = getCookie(cname);
  if (cvalue != "") {
    console.log(cvalue);
  } else {
    username = prompt("Please enter your name:", "");
    if (username != "" && username != null) {
      setCookie("username", username, 365);
    }
  }
}

checkCookie("jwt");
