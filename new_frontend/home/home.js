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

    const result = await axios({
      method: "get",
      headers: {
        Authorization: "Bearer " + jwt
      },
      url: "http://localhost:3000/private/"
    });
    console.log(result);
    const lists = result.data;
    for (let i = 0; i < lists.length; i++) {
      const htmlToAdd = generateHTML(lists[i]);
      $("#user-gallery").append(htmlToAdd);
    }
  } catch (error) {
    console.log(error);
  }
}

function generateHTML(el) {
  const htmlToAdd = `<div class="col-md-4 col-lg-3 bg-dark mx-5 mt-2 mb-4 text-center text-white rounded shadow" id=${el.id}>
    <div class="my-3 py-3" >
      <h2 class="display-5">
      ${el.name}</h2> 
    </div>
    <div
      class="bg-light box-shadow mx-auto"
      style="width: 60%; height: 200px; border-radius: 21px 21px 0 0;
      background: url(${el.images[0].url});background-position: center; 
      background-repeat: no-repeat; 
      background-size: cover;"
    ></div>
    <div class="text-white my-4 row">
    <div class="col-5 d-flex align-items-center flex-row">
    <span class="mx-3 like-counts" > ${el.likes} Likes</span>
    <i class="far fa-heart clickable p-2 rounded like" ></i></div>
    <div class="col-7 d-flex align-items-center flex-row">
    <span class="mx-3 comment-counts clickable p-1 rounded" > ${el.comments.length} Comments</span>
    <i class="far fa-comment clickable p-2 rounded comments" ></i></div>
    </div>
    </div>`;
  return htmlToAdd;
}

$(document).on("click", ".comments", async function() {
  const id = $(this).parentsUntil("#user-gallery")[2].id;
  const commentHTML = ``;
});
