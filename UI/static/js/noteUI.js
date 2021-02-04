var editMode = false
var notebookid = window.location.pathname.split("/")[2]

function editToggle() {
  if (editMode) {
    $('#edit').toggle()
    document.querySelector('.preview').style.width = 700 + "px"
    document.querySelector('.output').style.paddingTop = 10 + "px"
    document.querySelector('.output').style.paddingLeft = 10 + "px"
    document.querySelector('.output').style.paddingRight = 0 + "px"
    editMode = false
    console.log("clicked")
  } else {
    $('#edit').toggle()
    document.querySelector('.preview').style.width = 1470 + "px"
    document.querySelector('.output').style.paddingTop = 70 + "px"
    document.querySelector('.output').style.paddingLeft = 100 + "px"
    document.querySelector('.output').style.paddingRight = 100 + "px"
    editMode = true
    console.log("clicked")
  }
}
$(function () {
  $('#edit').hide()
  document.querySelector('.preview').style.width = 1470 + "px"
  document.querySelector('.output').style.paddingTop = 70 + "px"
  document.querySelector('.output').style.paddingLeft = 100 + "px"
  document.querySelector('.output').style.paddingRight = 100 + "px"
  editMode = true
})
var addNotebtn = document.querySelector(".addnbutn");
var imgupdbtn = document.querySelector(".upimgbutn");
var modal = document.getElementById("myModal");
var teditmodal = document.getElementById("editModal");
var imgumodal = document.getElementById("imageModal")
var span = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close")[1];
var span3 = document.getElementsByClassName("close")[2];
imgupdbtn.onclick =  function(){
  imgumodal.style.display = "block";
}
addNotebtn.onclick = function () {
  modal.style.display = "block";
}
span3.onclick = function(){
  imgumodal.style.display = "none";
}
span2.onclick = function(){
  teditmodal.style.display = "none";
}
span.onclick = function () {
  modal.style.display = "none";
}
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if (event.target == teditmodal) {
    teditmodal.style.display = "none";
  }
  if (event.target == imgumodal) {
    imgumodal.style.display = "none";
  }
}

function addNoteList(name, desc1, noteID) {
  let nlist = document.querySelector("#myUL")
  let l = document.createElement('li')
  l.innerHTML = name
  l.classList.add("note")
  let id = document.createElement('p')
  id.classList.add("noteid")
  id.innerHTML = noteID
  let desc = document.createElement('span')
  desc.classList.add("notedesc")
  desc.innerHTML = desc1
  id.style.display = "none"
  l.innerHTML += '<svg class="editLogo" id="color" enable-background="new 0 0 24 24" height="15px" viewBox="0 0 24 24" width="15px" xmlns="http://www.w3.org/2000/svg"><path d="m14.25 3h-11.5c-1.52 0-2.75 1.23-2.75 2.75v12.5c0 1.52 1.23 2.75 2.75 2.75h7.38l.22-1.23c.101-.56.36-1.06.761-1.47l1.3-1.3h-8.661c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h9.5c.18 0 .35.07.48.18l3.27-3.26v-6.67c0-1.52-1.23-2.75-2.75-2.75zm-1 10.75h-9.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h9.5c.41 0 .75.34.75.75s-.34.75-.75.75zm0-3.25h-9.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h9.5c.41 0 .75.34.75.75s-.34.75-.75.75z" fill="#2196f3"/><path d="m12.25 2h-1.1c-.33-1.15-1.39-2-2.65-2s-2.32.85-2.65 2h-1.1c-.41 0-.75.34-.75.75v2c0 .96.79 1.75 1.75 1.75h5.5c.96 0 1.75-.79 1.75-1.75v-2c0-.41-.34-.75-.75-.75z" fill="#1976d2"/><g fill="#fff"><path d="m14 9.75c0 .41-.34.75-.75.75h-9.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h9.5c.41 0 .75.34.75.75z"/><path d="m14 13c0 .41-.34.75-.75.75h-9.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h9.5c.41 0 .75.34.75.75z"/><path d="m13.73 15.68-1.32 1.32h-8.66c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h9.5c.18 0 .35.07.48.18z"/></g><path d="m4 3h-1.25c-1.52 0-2.75 1.23-2.75 2.75v12.5c0 1.52 1.23 2.75 2.75 2.75h5.75v-4h-4.75c-.41 0-.75-.34-.75-.75 0-.41.34-.75.75-.75h4.75v-1.75h-4.75c-.41 0-.75-.34-.75-.75 0-.41.34-.75.75-.75h4.75v-1.75h-4.75c-.41 0-.75-.34-.75-.75 0-.41.34-.75.75-.75h4.75v-2.5h-2.75c-.96 0-1.75-.79-1.75-1.75z" fill="#1d83d4"/><path d="m8.5 0c-1.26 0-2.32.85-2.65 2h-1.1c-.41 0-.75.34-.75.75v.25 1.75c0 .96.79 1.75 1.75 1.75h2.75z" fill="#1667b7"/><path d="m8.5 9h-4.75c-.41 0-.75.34-.75.75 0 .41.34.75.75.75h4.75z" fill="#dedede"/><path d="m8.5 12.25h-4.75c-.41 0-.75.34-.75.75 0 .41.34.75.75.75h4.75z" fill="#dedede"/><path d="m8.5 15.5h-4.75c-.41 0-.75.34-.75.75 0 .41.34.75.75.75h4.75z" fill="#dedede"/><path d="m12.527 24c-.197 0-.389-.078-.53-.22-.173-.173-.251-.419-.208-.661l.53-3.005c.026-.151.1-.291.208-.399l7.425-7.425c.912-.913 1.808-.667 2.298-.177l1.237 1.237c.683.683.683 1.792 0 2.475l-7.425 7.425c-.108.109-.248.182-.4.209l-3.005.529zm3.005-1.28h.01z" fill="#ffc107"/><path d="m21.23 11.675c-.392 0-.833.17-1.278.615l-7.425 7.425c-.108.108-.182.248-.208.399l-.53 3.005c-.043.242.035.488.208.661.008.008.015.015.023.022l10.959-10.96-.73-.73c-.25-.25-.608-.437-1.019-.437z" fill="#dea806"/></svg>'
  l.appendChild(id)
  l.appendChild(desc)
  nlist.appendChild(l)
}
$(".nbsubmit").on('click', async function (e) {
  e.preventDefault()
  let title = $("#ftitle").val()
  let tags = $("#ftags").val()
  let desc = $("#fdesc").val()
  tags = tags.split(",")
  await axios.post("http://192.168.1.106:5000/api/v1/note/notes/" + notebookid, {
      title,
      tags,
      description: desc
    })
    .then(response => {
      let data = response.data.data
      addNoteList(data.title, data.description, data._id)
    })
    .catch(error => console.log(error))
  modal.style.display = "none";
})
$('.optlogo').on('click',function(e){
  let id = e.currentTarget.id
  console.log(id)
  let mdcursor = document.querySelector(".tmarkdown").selectionStart
  let mdcontent = $('.tmarkdown').val()

  if(id=="simage"){
    $('.tmarkdown').val(mdcontent.slice(0,mdcursor)+"![Alt text](http://192.168.1.106:5000/api/v1/image/)"+mdcontent.slice(mdcursor));
  }else if(id == "sblock"){
    $('.tmarkdown').val(mdcontent.slice(0,mdcursor)+"> "+mdcontent.slice(mdcursor));
  }else if(id == "stable"){
    let elem = "|   |   |" + "\n" +"| --- | --- |" + "\n" + "|   |   |"
    $('.tmarkdown').val(mdcontent.slice(0,mdcursor)+elem+mdcontent.slice(mdcursor));
  }else if(id == "slist"){
    $('.tmarkdown').val(mdcontent.slice(0,mdcursor)+"- "+mdcontent.slice(mdcursor));
  }else if(id == "scode"){
    let elem = "```"+"\n\n"+"```"
    $('.tmarkdown').val(mdcontent.slice(0,mdcursor)+elem+mdcontent.slice(mdcursor));
  }else if(id == "slink"){
    $('.tmarkdown').val(mdcontent.slice(0,mdcursor)+"[text](link)"+mdcontent.slice(mdcursor));
  }
})
var isLink = true
var isFile = false
$(".ibsubmit").on('click', async function (e) {
  e.preventDefault()
  let title = $("#ititle").val()
  let tags = $("#itags").val()
  let link = $("#ilink").val()
  let file = document.getElementById("ifile").files[0]
  tags = tags.split(",")
  var fd = new FormData();
  fd.append('title',title)
  fd.append('tags',tags)
  if(isLink){
    fd.append('imgtype',"getOnline")
    fd.append('image',link)
  }
  if(isFile){
    fd.append('imgtype',"provided")
    fd.append('image',file)
  }
  await axios.post("http://192.168.1.106:5000/api/v1/image/",fd)
    .then(response => {
      console.log("Uploaded!!")
    })
    .catch(error => console.log(error))
  // modal.style.display = "none";
  
})

// toggle link and file for image upload
var ifil = document.getElementById("ifile")
  ifil.style.display = 'none'
$("#ImageType").change(function(){
var drpval = $("#ImageType").val()
var inil = document.getElementById("ilink")
if(drpval=="Image"){
  inil.style.display = 'none'
  ifil.style.display = 'block'
  isLink = false
  isFile = true
}else if(drpval=="Link"){
  inil.style.display = 'block'
  ifil.style.display = 'none'
  isLink = true
  isFile = false
}})


