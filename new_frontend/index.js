const listGallery = $("#playlists");
async function addList() {
  try {
    const result = await axios({
      method: "get",
      url: "http://localhost:3000/public"
    });
    console.log(result);
    const lists = result.data.playlists.items;
    for (let i = 0; i < lists.length; i++) {
      const htmlToAdd = `<div class="col-md-4 bg-dark mx-5 mt-2 mb-4 text-center text-white rounded shadow">
        <div class="my-3 py-3">
          <h2 class="display-5">
          ${lists[i].name}</h2> 
        </div>
        <div
          class="bg-light box-shadow mx-auto"
          style="width: 60%; height: 270px; border-radius: 21px 21px 0 0;
          background: url(${lists[i].images[0].url});background-position: center; 
          background-repeat: no-repeat; 
          background-size: cover;"
        ></div>`;
      listGallery.append(htmlToAdd);
    }
  } catch (error) {
    console.log(error);
  }
}

addList();
