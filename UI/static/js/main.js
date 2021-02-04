const md = require('markdown-it')()
  .use(require('markdown-it-highlightjs'))
// const tm = require("markdown-it-texmath")
// md.use(tm, {
//   engine: require('katex'),
//   delimiters: 'dollars',
//   katexOptions: {
//     macros: {
//       "\\RR": "\\mathbb{R}"
//     }
//   }
// });
var saveUpdatedNote
var ceditNotename = ''
var currentceditNote = ''
var currentNoteID = ''
function setBuffer(status){
  if(status=='typing'){
    let buf = document.querySelector(".buffer")
    buf.innerHTML = '<svg height="25px" viewBox="0 0 512 512" width="25px" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0 141.386719-114.613281 256-256 256s-256-114.613281-256-256 114.613281-256 256-256 256 114.613281 256 256zm0 0" fill="#e76e54"/><path d="m384 256c0 70.691406-57.308594 128-128 128s-128-57.308594-128-128 57.308594-128 128-128 128 57.308594 128 128zm0 0" fill="#dd523c"/></svg>'
  }if(status=='saved'){
    let buf = document.querySelector(".buffer")
    buf.innerHTML = '<svg height="25px" viewBox="0 0 512 512" width="25px" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0 141.386719-114.613281 256-256 256s-256-114.613281-256-256 114.613281-256 256-256 256 114.613281 256 256zm0 0" fill="#addb31"/><path d="m199.503906 358.335938-110.449218-107.488282 68.65625-66.816406 41.792968 40.671875 138.785156-135.039063 68.65625 66.816407zm0 0" fill="#fff"/><g fill="#6fbb2e"><path d="m144 384h96c8.835938 0 16 7.164062 16 16s-7.164062 16-16 16h-96c-8.835938 0-16-7.164062-16-16s7.164062-16 16-16zm0 0"/><path d="m288 384h32v32h-32zm0 0"/><path d="m352 384h32v32h-32zm0 0"/></g></svg>'
  }
}
function convert() {
  let html = md.render($('.tmarkdown').val());
  let sanitized = DOMPurify.sanitize(html);
  $('.output').html(sanitized);
}
async function saveNote(){
  if(currentNoteID == ''){
    return
  }
    var notebody = $('.tmarkdown').val()
    await axios.put("http://192.168.1.106:5000/api/v1/note/"+currentNoteID, {
     noteBody:notebody,
    }).then(response=>{
      console.log("saved")
      console.log(response.data.data)
    })
      .catch(error=>console.log(error))
    setBuffer('saved')
}
const DOMPurify = require('dompurify')
$(function () {
  var isEdited = false;
  $('.tmarkdown').bind('keyup', function () {
    clearTimeout(saveUpdatedNote)
    setBuffer('typing')
    console.log('type')
    isEdited = true;
    convert();
    saveUpdatedNote = setTimeout(function(){saveNote()},2000)
    $('.output a').each(function (index, element) {
      var href = element.getAttribute('href');
      if (RegExp('^javascript', 'i').test(href)) {
        element.setAttribute('href', '#');
      }
    });
  });
  convert();
});
var notebookid = window.location.pathname.split("/")[2]
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

async function populateNoteList() {
  await axios.get("http://192.168.1.106:5000/api/v1/note/notes/" + notebookid)
    .then(response => {
      let data = response.data.data
      let keys = Object.keys(data)
      for (key in keys) {
        addNoteList(
          data[key].title,
          data[key].description,
          data[key]._id
        )
      }
    }).catch(error => console.log(error))
}
populateNoteList()
function updateNotel(name,desc1,noteID){
  $(`#myUL li:eq(${currentceditNote})`)
  .html(`${name}<svg class="editLogo" id="color" enable-background="new 0 0 24 24" height="15px" viewBox="0 0 24 24" width="15px" xmlns="http://www.w3.org/2000/svg"><path d="m14.25 3h-11.5c-1.52 0-2.75 1.23-2.75 2.75v12.5c0 1.52 1.23 2.75 2.75 2.75h7.38l.22-1.23c.101-.56.36-1.06.761-1.47l1.3-1.3h-8.661c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h9.5c.18 0 .35.07.48.18l3.27-3.26v-6.67c0-1.52-1.23-2.75-2.75-2.75zm-1 10.75h-9.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h9.5c.41 0 .75.34.75.75s-.34.75-.75.75zm0-3.25h-9.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h9.5c.41 0 .75.34.75.75s-.34.75-.75.75z" fill="#2196f3"/><path d="m12.25 2h-1.1c-.33-1.15-1.39-2-2.65-2s-2.32.85-2.65 2h-1.1c-.41 0-.75.34-.75.75v2c0 .96.79 1.75 1.75 1.75h5.5c.96 0 1.75-.79 1.75-1.75v-2c0-.41-.34-.75-.75-.75z" fill="#1976d2"/><g fill="#fff"><path d="m14 9.75c0 .41-.34.75-.75.75h-9.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h9.5c.41 0 .75.34.75.75z"/><path d="m14 13c0 .41-.34.75-.75.75h-9.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h9.5c.41 0 .75.34.75.75z"/><path d="m13.73 15.68-1.32 1.32h-8.66c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h9.5c.18 0 .35.07.48.18z"/></g><path d="m4 3h-1.25c-1.52 0-2.75 1.23-2.75 2.75v12.5c0 1.52 1.23 2.75 2.75 2.75h5.75v-4h-4.75c-.41 0-.75-.34-.75-.75 0-.41.34-.75.75-.75h4.75v-1.75h-4.75c-.41 0-.75-.34-.75-.75 0-.41.34-.75.75-.75h4.75v-1.75h-4.75c-.41 0-.75-.34-.75-.75 0-.41.34-.75.75-.75h4.75v-2.5h-2.75c-.96 0-1.75-.79-1.75-1.75z" fill="#1d83d4"/><path d="m8.5 0c-1.26 0-2.32.85-2.65 2h-1.1c-.41 0-.75.34-.75.75v.25 1.75c0 .96.79 1.75 1.75 1.75h2.75z" fill="#1667b7"/><path d="m8.5 9h-4.75c-.41 0-.75.34-.75.75 0 .41.34.75.75.75h4.75z" fill="#dedede"/><path d="m8.5 12.25h-4.75c-.41 0-.75.34-.75.75 0 .41.34.75.75.75h4.75z" fill="#dedede"/><path d="m8.5 15.5h-4.75c-.41 0-.75.34-.75.75 0 .41.34.75.75.75h4.75z" fill="#dedede"/><path d="m12.527 24c-.197 0-.389-.078-.53-.22-.173-.173-.251-.419-.208-.661l.53-3.005c.026-.151.1-.291.208-.399l7.425-7.425c.912-.913 1.808-.667 2.298-.177l1.237 1.237c.683.683.683 1.792 0 2.475l-7.425 7.425c-.108.109-.248.182-.4.209l-3.005.529zm3.005-1.28h.01z" fill="#ffc107"/><path d="m21.23 11.675c-.392 0-.833.17-1.278.615l-7.425 7.425c-.108.108-.182.248-.208.399l-.53 3.005c-.043.242.035.488.208.661.008.008.015.015.023.022l10.959-10.96-.73-.73c-.25-.25-.608-.437-1.019-.437z" fill="#dea806"/></svg><p class="noteID" style="display:none">${noteID}</p><span class="notedesc">${desc1}</span>`)
}
$(document).on('click', '.note', async function (event) {
  let noteID = event.target.querySelector(".noteid")
  if (noteID) {
    let ID = event.target.querySelector(".noteid").innerHTML
    currentNoteID = ID
    await axios.get("http://192.168.1.106:5000/api/v1/note/" + ID)
      .then(response => {
        let data = response.data.data
        let md = document.querySelector(".tmarkdown")
        md.value = data.noteBody
        convert()
      })
  } else if (event.target.tagName.toLowerCase() === 'svg' || event.target.tagName.toLowerCase() === 'path') {
    var editmodal = document.getElementById("editModal");
    var nID = event.currentTarget.querySelector(".noteid").innerHTML
    ceditNotename = nID
    currentNoteID = nID
    currentceditNote = $(this).index();
    await axios.get("http://192.168.1.106:5000/api/v1/note/"+nID)
    .then(response=>{
      let data = response.data.data
      document.querySelector("#uftitle").value=data.title
      document.querySelector("#uftags").innerHTML=data.tags
      document.querySelector("#ufdesc").innerHTML=data.description
    })
    editmodal.style.display = "block";
  } else {
    let ID = event.target.parentNode.querySelector(".noteid").innerHTML
    currentNoteID = ID
    await axios.get("http://192.168.1.106:5000/api/v1/note/" + ID)
      .then(response => {
        let data = response.data.data
        let md = document.querySelector(".tmarkdown")
        md.value = data.noteBody
        convert()
      })
  }
})
$(".unbsubmit").on('click', async function (e) {
  e.preventDefault()
  let title = $("#uftitle").val()
  let tags = $("#uftags").val()
  let desc = $("#ufdesc").val()
  tags = tags.split(",")
  await axios.put("http://192.168.1.106:5000/api/v1/note/"+ceditNotename, {
      title,
      tags,
      description: desc
    })
    .then(response => {
      let data = response.data.data
      console.log("Updated!!")
      updateNotel(data.title,data.description,data._id)
    })
    .catch(error => console.log(error))
  modal.style.display = "none";
})