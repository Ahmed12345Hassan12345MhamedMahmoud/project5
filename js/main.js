// the call element the inputs
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let das = document.getElementById("das");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mod = "create";
let tmp;
//the get total

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +das.value - +discount.value;
    total.innerHTML = result;
    total.style = "background:#040;";
  } else {
    total.innerHTML = "";
    total.style = "background:#a00do2;";
  }
}
//the get create
let dataProd;
if (localStorage.product != null) {
  dataProd = JSON.parse(localStorage.product);
} else {
  dataProd = [];
}
submit.onclick = function () {
  let nowProd = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    das: das.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

   if(title.value !="" &&price.value !="" && category.value !="" && nowProd.count <= 100){
    if (mod === "create") {
      if (nowProd.count > 1) {
        for (let i = 0; i < nowProd.count; i++) {
          dataProd.push(nowProd);
        }
      } else {

        dataProd.push(nowProd);
      }
    } else {
      dataProd[tmp] = nowProd;
      mod = "create";
      submit.innerHTML="create";
      count.style.display="block";
    }
      clearData();
   }

  // the save localStorage
  localStorage.setItem("product", JSON.stringify(dataProd));

  showData();
};

//the clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  das.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
// the read objact
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataProd.length; i++) {
    table += `
    <tr>
    <td>${i+1}</td>
    <td>${dataProd[i].title}</td>
    <td>${dataProd[i].price}</td>
    <td>${dataProd[i].taxes}</td>
    <td>${dataProd[i].das}</td>
    <td>${dataProd[i].discount}</td>
    <td>${dataProd[i].total}</td>
    <td>${dataProd[i].count}</td>
    <td><button onclick="updateFunct(${i})" id="update">update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  let deleteAll = document.getElementById("deleteAll");
  if (dataProd.length > 0) {
    deleteAll.innerHTML = `<button onclick="deletAllFinc()">deleteAll(${dataProd.length})</button>`;
  } else {
    deleteAll.innerHTML = "";
    deleteAll.style = "background:#222";
  }
}
showData();
//the delet function
function deleteData(i) {
  dataProd.splice(i, 1);
  localStorage.product = JSON.stringify(dataProd);
  showData();
}
//the deletAll function
function deletAllFinc() {
  localStorage.clear;
  dataProd.splice(0);
  showData();
}
//the function update

function updateFunct(i) {
  title.value = dataProd[i].title;
  price.value = dataProd[i].price;
  taxes.value = dataProd[i].taxes;
  das.value = dataProd[i].das;
  discount.value = dataProd[i].discount;
  category.value = dataProd[i].category;
  getTotal();
  count.style = "display:none;";
  submit.innerHTML = "update";
  mod = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

let searchMode = "title";
function getsearchMode(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMode = "title";
    search.style.textTransform = "lowercase";
  } else {
    searchMode = "ategory";
    search.style.textTransform = "lowercase";
  }
  search.placeholder = "search By " + searchMode;
  search.focus();
  search.value = "";
  showData();
}

function serchArray(value) {
  let table = "";
  for (let i = 0; i < dataProd.length; i++) {
    if (searchMode == "title") {
      if (dataProd[i].title.includes(value.toLowerCase())) {
        table += `
            <tr>
            <td>${i}</td>
            <td>${dataProd[i].title}</td>
            <td>${dataProd[i].price}</td>
            <td>${dataProd[i].taxes}</td>
            <td>${dataProd[i].das}</td>
            <td>${dataProd[i].discount}</td>
            <td>${dataProd[i].total}</td>
            <td>${dataProd[i].category}</td>
            <td><button onclick="updateFunct(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            `;
      }
    } else {
      if (dataProd[i].category.includes(value.toLowerCase())) {
        table += `
          <tr>
          <td>${i}</td>
          <td>${dataProd[i].title}</td>
          <td>${dataProd[i].price}</td>
          <td>${dataProd[i].taxes}</td>
          <td>${dataProd[i].das}</td>
          <td>${dataProd[i].discount}</td>
          <td>${dataProd[i].total}</td>
          <td>${dataProd[i].category}</td>
          <td><button onclick="updateFunct(${i})" id="update">update</button></td>
          <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
          `;
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}
