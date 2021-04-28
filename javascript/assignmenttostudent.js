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
  if(validateStudentFirstname(formData) && validateStudentLastname(formData) && validateAssignmentTitle(formData) && validateOralmark(formData) && validateTotalmark(formData)){
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
    let c1 = row.insertCell(0);
    let c2 = row.insertCell(1);
    let c3 = row.insertCell(2);
    let c4 = row.insertCell(3);
    let c5 = row.insertCell(4);
    let c6 = row.insertCell(5);
    let c7 = row.insertCell(6);

    c1.innerHTML = data.studentFirstN.replace(/\s/g,'');
    c2.innerHTML = data.studentLastN.replace(/\s/g,'');
    c3.innerHTML = data.assignmentTitle;
    c4.innerHTML = data.subdatetime;
    c5.innerHTML = data.oralmark;
    c6.innerHTML = data.totalmark;
    c7.innerHTML = `<a
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
  document.querySelector("#studentFirstN").value = "";
  document.querySelector("#studentLastN").value = "";
  document.querySelector("#assignmentTitle").value = "";
  document.querySelector("#subdatetime").value = "";
  document.querySelector("#oralmark").value = "";
  document.querySelector("#totalmark").value = "";
  selectedRow = null;
};

// read from form
function readForm() {
  let formData = {};
  formData["studentFirstN"] = document.querySelector("#studentFirstN").value;
  formData["studentLastN"] = document.querySelector("#studentLastN").value;
  formData["assignmentTitle"] = document.querySelector("#assignmentTitle").value;
  formData["subdatetime"] = document.querySelector("#subdatetime").value;
  formData["oralmark"] = document.querySelector("#oralmark").value;
  formData["totalmark"] = document.querySelector("#totalmark").value;
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
  document.querySelector("#studentFirstN").value = selectedRow.cells[0].innerHTML;
  document.querySelector("#studentLastN").value = selectedRow.cells[1].innerHTML;
  document.querySelector("#assignmentTitle").value = selectedRow.cells[2].innerHTML;
  document.querySelector("#subdatetime").value = selectedRow.cells[3].innerHTML;
  document.querySelector("#oralmark").value = selectedRow.cells[4].innerHTML;
  document.querySelector("#totalmark").value = selectedRow.cells[5].innerHTML;
};

// update the row
function updateRow(formData) {
  selectedRow.cells[0].innerHTML = formData.studentFirstN.replace(/\s/g,'');
  selectedRow.cells[1].innerHTML = formData.studentLastN.replace(/\s/g,'');
  selectedRow.cells[2].innerHTML = formData.assignmentTitle;
  selectedRow.cells[3].innerHTML = formData.subdatetime;
  selectedRow.cells[4].innerHTML = formData.oralmark;
  selectedRow.cells[5].innerHTML = formData.totalmark;
};

function validateStudentFirstname(formData) {
  const regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  let element = document.querySelector("#studentFirstN");

  if (formData.studentFirstN.length < 3 || formData.studentFirstN.length > 20 || regex.test(formData.studentFirstN)){
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

function validateStudentLastname(formData) {
  const regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  let element = document.querySelector("#studentLastN");

  if (formData.studentLastN.length < 3 || formData.studentLastN.length > 20 || regex.test(formData.studentLastN)){
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

function validateAssignmentTitle(formData) {
  const regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  let element = document.querySelector("#assignmentTitle");

  if (formData.assignmentTitle.length < 3 || formData.assignmentTitle.length > 20 || regex.test(formData.assignmentTitle)){
    element.classList.add("error");
    modalBg.classList.add('active');
    document.querySelector('#warning').innerHTML = `Title cannot contain(!@#$%^&*()_+\-={};':"|,.<>?~) and must be longer than 3 and shorter than 20 letters`;
    return false;
  }
  else {
    element.classList.remove("error");
    return true;
  };
};


function validateOralmark(formData) {
  let element = document.querySelector("#oralmark");

  if(formData.oralmark < 0 || formData.oralmark >25){
    element.classList.add("error");
    modalBg.classList.add('active');
    document.querySelector('#warning').innerHTML = `Oral Mark can be between 0 and 25`;
    return false;
  } else {
    element.classList.remove("error");
    return true;
  };
};

function validateTotalmark(formData) {
  let element = document.querySelector("#totalmark");

  if(formData.totalmark < 0 || formData.totalmark >100){
    element.classList.add("error");
    modalBg.classList.add('active');
    document.querySelector('#warning').innerHTML = `Total Mark can be between 0 and 100`;
    return false;
  } else {
    element.classList.remove("error");
    return true;
  };
};