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
  if(validateCourseTitle(formData) && validateCourseStream(formData) && validateType(formData) &&validateFirstName(formData) && validateLastName(formData)){
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

    c1.innerHTML = data.courseTitle.replace(/\s/g,'').toUpperCase();
    c2.innerHTML = data.courseStream;
    c3.innerHTML = data.courseType;
    c4.innerHTML = data.trainerFirstN.replace(/\s/g,'');
    c5.innerHTML = data.trainerLastN.replace(/\s/g,'');
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
  document.querySelector("#courseTitle").value = "";
  document.querySelector("#courseStream").value = "";
  document.querySelector("#courseType").value = "";
  document.querySelector("#trainerFirstN").value = "";
  document.querySelector("#trainerLastN").value = "";
  selectedRow = null;
};

// read from form
function readForm() {
  let formData = {};
  formData["courseTitle"] = document.querySelector("#courseTitle").value;
  formData["courseStream"] = document.querySelector("#courseStream").value;
  formData["courseType"] = document.querySelector("#courseType").value;
  formData["trainerFirstN"] = document.querySelector("#trainerFirstN").value;
  formData["trainerLastN"] = document.querySelector("#trainerLastN").value;
  return formData;
};

// delete Row
function deleteRow(r) {
  if (confirm("Are You Sure You Want to Delete This Line?")) {
    let i = r.parentNode.parentNode.parentNode.rowIndex;
    document.querySelector("#myTable").deleteRow(i);
  };
};

// edit the selected row
function editRow(td) {
  selectedRow = td.parentNode.parentNode.parentNode;
  document.querySelector("#courseTitle").value = selectedRow.cells[0].innerHTML;
  document.querySelector("#courseStream").value = selectedRow.cells[1].innerHTML;
  document.querySelector("#courseType").value = selectedRow.cells[2].innerHTML;
  document.querySelector("#trainerFirstN").value = selectedRow.cells[3].innerHTML;
  document.querySelector("#trainerLastN").value = selectedRow.cells[4].innerHTML;
};

// update the row
function updateRow(formData) {
  selectedRow.cells[0].innerHTML = formData.courseTitle.replace(/\s/g,'').toUpperCase();
  selectedRow.cells[1].innerHTML = formData.courseStream;
  selectedRow.cells[2].innerHTML = formData.courseType;
  selectedRow.cells[3].innerHTML = formData.trainerFirstN.replace(/\s/g,'');
  selectedRow.cells[4].innerHTML = formData.trainerLastN.replace(/\s/g,'');
};

function validateCourseTitle(formData) {
  const regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  let element = document.querySelector("#courseTitle");

  if (formData.courseTitle.length < 2 || formData.courseTitle.length > 6 || regex.test(formData.courseTitle)){
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

function validateCourseStream(formData) {
  let element = document.querySelector("#courseStream");

  if(!formData.courseStream){
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
  let element = document.querySelector("#courseType");

  if(!formData.courseType){
    element.classList.add("error");
    modalBg.classList.add('active');
    document.querySelector('#warning').innerHTML = `Please select a Type`;
    return false;
  } else {
    element.classList.remove("error");
    return true;
  };
};

function validateFirstName(formData) {
  const regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  let element = document.querySelector("#trainerFirstN");

  if (formData.trainerFirstN.length < 3 || formData.trainerFirstN.length > 20 || regex.test(formData.trainerFirstN)){
    element.classList.add("error");
    modalBg.classList.add('active');
    document.querySelector('#warning').innerHTML = `First Name cannot contain(!@#$%^&*()_+\-={};':"|,.<>?~) and must be longer than 3 and shorter than 20 letters`;
    return false;
  }
  else {
    element.classList.remove("error");
    return true;
  };
};

function validateLastName(formData) {
  const regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  let element = document.querySelector("#trainerLastN");

  if (formData.trainerLastN.length < 3 || formData.trainerLastN.length > 20 || regex.test(formData.trainerLastN)){
    element.classList.add("error");
    modalBg.classList.add('active');
    document.querySelector('#warning').innerHTML = `Last Name cannot contain(!@#$%^&*()_+\-={};':"|,.<>?~) and must be longer than 3 and shorter than 20 letters`;
    return false;
  }
  else {
    element.classList.remove("error");
    return true;
  };
};
