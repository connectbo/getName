const listGallery = $("#playlists");
async function addList() {
  try {
    const result = await axios({
      method: "get",
      url: "http://localhost:3000/public/"
    });
    console.log(result);
    const lists = result.data.playlists.items;
    const likes = result.data.playlists.likes;
    for (let i = 0; i < lists.length; i++) {
      const htmlToAdd = generateHTML(lists[i], likes);
      listGallery.append(htmlToAdd);
    }
  } catch (error) {
    console.log(error);
  }
}

$(document).on("click", ".like", async function() {
  try {
    const id = $(this).parentsUntil("#playlists")[1].id;
    const result = await axios({
      method: "post",
      url: "http://localhost:3000/public/like",
      data: {
        data: {
          id: id
        }
      }
    });
    console.log(result.data);
    // $("#" + id + " .like-counts").text(`${result.data}`);
  } catch (error) {
    console.log(error);
  }
});

function generateHTML(el, likes) {
  const htmlToAdd = `<div class="col-md-4 bg-dark mx-5 mt-2 mb-4 text-center text-white rounded shadow" id=${
    el.id
  }>
    <div class="my-3 py-3" >
      <h2 class="display-5">
      ${el.name}</h2> 
    </div>
    <div
      class="bg-light box-shadow mx-auto"
      style="width: 60%; height: 270px; border-radius: 21px 21px 0 0;
      background: url(${el.images[0].url});background-position: center; 
      background-repeat: no-repeat; 
      background-size: cover;"
    ></div>
    <div class="text-white my-4">
    <span class="mx-3 like-counts"> ${likes[el.id]} Likes</span>
    ${
      el.likes == 0
        ? '<i class="far fa-heart clickable p-2 rounded like" >'
        : '<i class="fas fa-heart clickable p-2 rounded unlike" ></i>'
    }</div>`;
  return htmlToAdd;
}
addList();
