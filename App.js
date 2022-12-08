import Alert from "./src/Alert.js";
import LocalStorage from "./src/LocalStorage.js";
import Validate from "./src/Validate.js";

const basic_form = document.querySelector("#basic_form");
const msg = document.querySelector(".msg");
const student_table = document.querySelector("#student_table");
const view_data = document.querySelector('.view_data');
const edit_data = document.querySelector('.edit_data');
const edit_form = document.querySelector('#edit_form');

basic_form.onsubmit = (e) => {
  e.preventDefault();

  const from_data = new FormData(e.target);
  const data = Object.fromEntries(from_data.entries());
  console.log(data);

  if (!data.name || !data.email || !data.skill || !data.photo) {
    msg.innerHTML = Alert.danger("All fields are required!");
    console.log("All fields are required ");
  } else if (!Validate.isEmail(data.email)) {
    msg.innerHTML = Alert.warning("Invalid Email Address");
  } else {
    let AllData = [];
    if (LocalStorage.get('students')) {
      AllData = LocalStorage.get('students');
    }
    AllData.push(data);
    LocalStorage.save('students', AllData);
    msg.innerHTML = Alert.success('Added new student');
    e.target.reset();
    getAllStudents();
  }
};

//===========================================================

const getAllStudents = () => {
  let getlsdata = LocalStorage.get("students");

  let list = "";
  if (!getlsdata) {
    list = `
          <tr class ="text-center"><td  colspan ="7">No data found</td></tr>
          `;
  } else {
    getlsdata.map((item, index) => {
      list += `
      <tr>
      <td>${index + 1}</td>
      <td> ${item.name} </td>
      <td>${item.email}</td>
      <td>${item.skill}</td>
      <td>${item.phone}</td>
      <td>
          <img class="s" src="${item.photo}" alt="">
      </td>
      <td>
          <td>
              <a href = "#view_modal" data-bs-toggle = "modal" index="${index}" class="btn btn-sm btn-info view"><i class="fas fa-eye"></i></a>
              <a href = "#edit_modal" data-bs-toggle = "modal" index="${index}" class="btn btn-sm btn-warning edit"><i class="fas fa-edit"></i></a>
              <a index="${index}" class="btn btn-sm btn-danger delete"><i class="fas fa-trash"></i></a>
          </td>
      </td>
  </tr>
  
              `;
    });
  }
  student_table.innerHTML = list;
};
getAllStudents();



//view , edit ,delete

student_table.onclick = (e) => {
  e.preventDefault();
  const index = e.target.getAttribute('index');
  const AllData = LocalStorage.get('students')
   if(e.target.classList.contains('delete')){
    const afterDelete = AllData.filter(
      (data) => data != AllData[index]
    );
    LocalStorage.save('students', afterDelete);
    getAllStudents();
  }else if(e.target.classList.contains('view')){
    const viewData = AllData[index];

    view_data.innerHTML = `

    <img src="${viewData.photo}" alt="">

    <h3> Name: ${viewData.name}</h3>
    <p>Email : ${viewData.email}</p>
    <p>Phone : ${viewData.phone}</p>
   
    `
  }else if(e.target.classList.contains('edit')){
    const editData = AllData[index];
    edit_form.innerHTML = `

    <div class="msg"></div>
    <div class="my-1">
        <label for="">Name</label>
        <input class="form-control" value="${editData.name}" type="text" name="edit_name" id="">
    </div>
    <div class="my-1">
        <label for="">Email</label>
        <input class="form-control" value="${editData.email}" type="email" name="edit_email" id="">
    </div>
    <div class="my-1">
    <label for="">Skill</label>
    <input class="form-control" type="text" value="${editData.skill}" name="edit_skill" id="">
</div>

    <div class="my-1">
        <label for="">Mobile</label>
        <input class="form-control" type="text" value="${editData.phone}" name="edit_cell" id="">
    </div>
    <div class="my-1">
        <label for="">Photo</label>
        <input class="form-control" type="text" value="${editData.photo}" name="edit_photo" id="">
    </div>
    <button class="w-100 btn btn-primary text-uppercase  text-white" type="submit" >Update</button>
    
    
    `


    // Update Data=================================
  edit_form.onsubmit = (e) => {
  e.preventDefault();
  const editData = AllData[index];

  const edit_from_data = new FormData(e.target);
  const data = Object.fromEntries(edit_from_data.entries())
  const {edit_name, edit_email, edit_skill, edit_cell, edit_photo} = Object.fromEntries(edit_from_data.entries());
  AllData[index] = {
    name : edit_name,
    email : edit_email,
    skill : edit_skill,
    phone : edit_cell,
    photo : edit_photo

  }
  LocalStorage.save('students', AllData);
  msg.innerHTML = Alert.success('Updated student data!');
  getAllStudents();


}


  }
};





