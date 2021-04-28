const addForm = document.querySelector("#addForm");
let modalBg = document.querySelector(".modal-bg");
let modalClose = document.querySelector(".modal-close");
let selectedRow = null;

modalClose.addEventListener('click', function(){
  modalBg.classList.remove('active');
});


addForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let formData = readForm();
  if (validateTitle(formData) && validateStream(formData) && validateType(formData) && validateStartdate(formData) && validateEnddate(formData)){
  if(selectedRow === null){
    addData(formData);
  }else {
    updateRow(formData);
  };
  resetForm();
  };
});


// add Data
function addData(data){

    let x = document.getElementById("myTable");
    let row = x.insertRow(x.length);
    var c1 = row.insertCell(0);
    var c2 = row.insertCell(1);
    var c3 = row.insertCell(2);
    var c4 = row.insertCell(3);
    var c5 = row.insertCell(4);
    let c6 = row.insertCell(5);

    c1.innerHTML = data.title.replace(/\s/g,'').toUpperCase();
    c2.innerHTML = data.stream;
    c3.innerHTML = data.type;
    c4.innerHTML = data.startdate;
    c5.innerHTML = data.enddate;
    c6.innerHTML = `<a
  class="text-decoration-none ml-2 mr-2"
  href="#"
  data-bs-toggle="tooltip"
  data-bs-placement="top"
  title="Edit"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    class="bi bi-pencil-fill edit"
    viewBox="0 0 16 16"
    onclick="editRow(this)"
  >
    <path
      d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
    />
  </svg>
</a>
<a
  class="text-danger mr-2"
  href="#"
  data-bs-toggle="tooltip"
  data-bs-placement="top"
  title="Delete"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    class="bi bi-trash-fill delete"
    viewBox="0 0 16 16"
    onclick="deleteRow(this)"
  >
    <path
      d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
    />
  </svg>
</a>`;
};

// reset Form
function resetForm(){
  document.querySelector("#title").value = "";
  document.querySelector("#stream").value = "";
  document.querySelector("#type").value = "";
  document.querySelector("#startdate").value = "";
  document.querySelector("#enddate").value = "";
  selectedRow = null;
};

// read from form
function readForm() {
  let formData = {};
  formData["title"] = document.querySelector("#title").value;
  formData["stream"] = document.querySelector("#stream").value;
  formData["type"] = document.querySelector("#type").value;
  formData["startdate"] = document.querySelector("#startdate").value;
  formData["enddate"] = document.querySelector("#enddate").value;
  return formData;
};

// delete Row
function deleteRow(r) {
  if (confirm("Are You Sure You Want to Delete This Course?")) {
    let i = r.parentNode.parentNode.parentNode.rowIndex;
    document.querySelector("#myTable").deleteRow(i);
  };
};

// edit the selected row
function editRow(td) {
  selectedRow = td.parentNode.parentNode.parentNode;
  document.querySelector("#title").value = selectedRow.cells[0].innerHTML;
  document.querySelector("#stream").value = selectedRow.cells[1].innerHTML;
  document.querySelector("#type").value = selectedRow.cells[2].innerHTML;
  document.querySelector("#startdate").value = selectedRow.cells[3].innerHTML;
  document.querySelector("#enddate").value = selectedRow.cells[4].innerHTML;
};

// update the row
function updateRow(formData) {
  selectedRow.cells[0].innerHTML = formData.title.replace(/\s/g,'').toUpperCase();
  selectedRow.cells[1].innerHTML = formData.stream;
  selectedRow.cells[2].innerHTML = formData.type;
  selectedRow.cells[3].innerHTML = formData.startdate;
  selectedRow.cells[4].innerHTML = formData.enddate;
};

function validateTitle(formData) {
  const regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  let element = document.querySelector("#title");

  if (formData.title.length < 2 || formData.title.length > 6 || regex.test(formData.title)){
    element.classList.add("error");
    modalBg.classList.add('active');
    document.querySelector('#warning').innerHTML = `Title cannot contain(!@#$%^&*()_+\-={};':"|,.<>?~) and must be longer than 2 and shorter than 6 letters`;
    return false;
  }
  else {
    element.classList.remove("error");
    return true;
  };
};

function validateStream(formData) {
  let element = document.querySelector("#stream");

  if(!formData.stream){
    element.classList.add("error");
    modalBg.classList.add('active');
    document.querySelector('#warning').innerHTML = `Please select a Stream`;
    return false;
  } else {
    element.classList.remove("error");
    return true;
  };
};

function validateType(formData) {
  let element = document.querySelector("#type");

  if(!formData.type){
    element.classList.add("error");
    modalBg.classList.add('active');
    document.querySelector('#warning').innerHTML = `Please select a Type`;
    return false;
  } else {
    element.classList.remove("error");
    return true;
  };
};

function validateStartdate(formData) {
  let element = document.querySelector("#startdate");

  if(!formData.startdate){
    element.classList.add("error");
    modalBg.classList.add('active');
    document.querySelector('#warning').innerHTML = `Please select a Start Date`;
    return false;
  } else {
    element.classList.remove("error");
    return true;
  };
};

function validateEnddate(formData) {
  let element = document.querySelector("#enddate");

  if(!formData.enddate){
    element.classList.add("error");
    modalBg.classList.add('active');
    document.querySelector('#warning').innerHTML = `Please select an End Date`;
    return false;
  } else {
    element.classList.remove("error");
    return true;
  };
};