async function creatUser() {
  const result = await axios({
    method: "post",
    url: "http://localhost:3000/account/create",
    data: {
      name: "testuser",
      pass: "pass123"
    }
  });
  console.log(result);
}

creatUser();

// async function getUser() {
//   const result = await axios({
//     method: "post",
//     url: "http://localhost:3000/account/login/",
//     data: {
//       name: "bo",
//       pass: "1234"
//     }
//   });
//   console.log(result);
// }
// getUser();
