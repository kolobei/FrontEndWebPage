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
  if(validateFirstname(formData) && validateLastname(formData) && validateDateofbirth(formData) && validateFees(formData)){
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

  c1.innerHTML = data.firstname.replace(/\s/g,'');
  c2.innerHTML = data.lastname.replace(/\s/g,'');
  c3.innerHTML = data.birthDate;
  c4.innerHTML = data.fees;
  c5.innerHTML = `<a
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
  document.querySelector("#firstname").value = "";
  document.querySelector("#lastname").value = "";
  document.querySelector("#birthDate").value = "";
  document.querySelector("#fees").value = "";
  selectedRow = null;
};

// read from form
function readForm() {
  let formData = {};
  formData["firstname"] = document.querySelector("#firstname").value;
  formData["lastname"] = document.querySelector("#lastname").value;
  formData["birthDate"] = document.querySelector("#birthDate").value;
  formData["fees"] = document.querySelector("#fees").value;
  return formData;
};

// delete Row
function deleteRow(r) {
  if (confirm("Are You Sure You Want to Delete This Student?")) {
    let i = r.parentNode.parentNode.parentNode.rowIndex;
    document.querySelector("#myTable").deleteRow(i);
  };
};

// edit the selected row
function editRow(td) {
  selectedRow = td.parentNode.parentNode.parentNode;
  document.querySelector("#firstname").value = selectedRow.cells[0].innerHTML;
  document.querySelector("#lastname").value = selectedRow.cells[1].innerHTML;
  document.querySelector("#birthDate").value = selectedRow.cells[2].innerHTML;
  document.querySelector("#fees").value = selectedRow.cells[3].innerHTML;
};

// update the row
function updateRow(formData) {
  selectedRow.cells[0].innerHTML = formData.firstname.replace(/\s/g,'');
  selectedRow.cells[1].innerHTML = formData.lastname.replace(/\s/g,'');
  selectedRow.cells[2].innerHTML = formData.birthDate;
  selectedRow.cells[3].innerHTML = formData.fees;
};

function validateFirstname(formData) {
  const regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  let element = document.querySelector("#firstname");

  if (formData.firstname.length < 3 || formData.firstname.length > 20 || regex.test(formData.firstname)){
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

function validateLastname(formData) {
  const regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  let element = document.querySelector("#lastname");

  if (formData.lastname.length < 3 || formData.lastname.length > 20 || regex.test(formData.lastname)){
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

function validateDateofbirth(formData) {
  let element = document.querySelector("#birthDate");

  if(!formData.birthDate){
    element.classList.add("error");
    modalBg.classList.add('active');
    document.querySelector('#warning').innerHTML = `Please select a Date of Birth`;
    return false;
  } else {
    element.classList.remove("error");
    return true;
  };
};

function validateFees(formData) {
  let element = document.querySelector("#fees");

  if(!formData.fees || formData.fees < 2250 || formData.fees >2500){
    element.classList.add("error");
    modalBg.classList.add('active');
    document.querySelector('#warning').innerHTML = `Fees cannot be lower than 2250 or higher than 2500`;
    return false;
  } else {
    element.classList.remove("error");
    return true;
  };
};
