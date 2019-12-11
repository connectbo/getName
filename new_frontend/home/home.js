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

const user = getCookie("username");
const pass = getCookie("password");
const jwt = getCookie("jwt");
if (user != "") {
  renderPage(user, pass, jwt);
} else {
  renderWaning();
}

function renderWaning() {
  const warning = `<div class="text-center mt-5">
    <p class="lead">You are not logged in</p>
    <a href = "../signin/signin.html" class="text-info">Go back to sign in</a>
</div>`;
  $(".container-fluid").append(warning);
}

async function renderPage(username, password, jwt) {
  try {
    const account = await axios({
      method: "get",
      url: "http://localhost:3000/account/status",
      headers: {
        Authorization: "Bearer " + jwt
      },
      data: {
        name: username,
        pass: password
      }
    });
    const user = account.data.user.name;
    $("nav .container").append(`
    <div class="py-2 d-none d-md-inline-block">
    <a class="text-white" href="../logout/logout.html" id="logout">Log out</a>
    <span class="text-white mx-3">/</span>
    <a class="text-white" href="../account/account.html" id="account">My Account</a>
  </div>`);
  } catch (error) {
    console.log(error);
  }
}
