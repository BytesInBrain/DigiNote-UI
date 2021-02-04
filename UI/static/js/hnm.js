var modal = document.getElementById("myModal");
var btn = document.getElementById("addbtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
function addNotebookListCard(heading,description,tags,id){
    let cardcontainer = document.querySelector(".card-container")
      let card = document.createElement('div')
      card.classList.add("card")
      let title = document.createElement('h1')
      let ids = document.createElement('span')
      ids.innerHTML = id
      ids.classList.add("notebookID")
      ids.style.display = "none"
      title.classList.add("nbtitle")
      title.innerHTML = heading
      let desc = document.createElement('p')
      desc.classList.add("nbdesc")
      desc.innerHTML = description
      let tagc = document.createElement('div')
      tagc.classList.add("nbtagsC")
      let tagl = document.createElement('div')
      tagl.classList.add("tags-list")
      for(tag in tags){
        let i = document.createElement('span')
        i.classList.add("nbtags")
        i.innerHTML = tags[tag]
        tagl.appendChild(i)
      }
      tagc.appendChild(tagl)
      card.appendChild(title)
      card.appendChild(desc)
      card.appendChild(tagc)
      card.appendChild(ids)
      cardcontainer.appendChild(card)
};



async function populateNotebookList(){
  await axios.get("http://192.168.1.106:5000/api/v1/notebook")
  .then(responses=>{
    let data = responses.data.data
    let keys = Object.keys(data)
    for(key in keys){
      addNotebookListCard(
        data[key].title,
        data[key].description,
        data[key].tags,
        data[key]._id
      )
    }
  })
  .catch(error=>console.log(error))
}


$(".nbsubmit").on('click',async function(e){
  e.preventDefault()
  let title = $("#ftitle").val()
  let tags = $("#ftags").val()
  let desc = $("#fdesc").val()
  tags = tags.split(",")
  await axios.post("http://192.168.1.106:5000/api/v1/notebook",{title,tags,description:desc})
  .then(response=>{
    let data = response.data.data
    addNotebookListCard(data.title,data.description,data.tags,data._id)
  })
  .catch(error=>console.log(error))

  modal.style.display = "none";
})

// Populate Notenooks list
populateNotebookList()

$(document).on('click','.card',function(event){
    console.log(event.target.querySelector(".notebookID").innerHTML)
    window.location = "/notebook/"+event.target.querySelector(".notebookID").innerHTML
    console.log("clicked!")
})







