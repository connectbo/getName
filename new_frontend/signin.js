let accountInfo;
$("#submit-form").click(async function() {
  const name = $("#user-email").val();
  const pass = $("#user-password").val();
  try {
    const result = await axios({
      method: "post",
      url: "http://localhost:3000/account/login",
      data: {
        name: name,
        pass: pass
      }
    });
    const jwt = result.data.jwt;
    const account = await axios({
      method: "get",
      url: "http://localhost:3000/account/status",
      headers: {
        Authorization: "Bearer " + jwt
      },
      data: {
        name: name,
        pass: pass
      }
    });
    accountInfo = account.data;

    // window.location.href = "home.html/" + name;
  } catch (error) {
    console.log(error);
  }
});
