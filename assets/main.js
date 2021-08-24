// form thêm, sửa
// sử dụng onclick trực tiếp trên các nút để bắt sự kiện
// ẩn hiện form dơn giản
// function hide() {
//     let a = document.getElementsByClassName("add-container");
//     a[0].style.display = 'none';
// };
// function show() {
//     let a = document.getElementsByClassName("add-container");
//     a[0].style.display = 'flex';
// }


// config API
const instance = axios.create({
    baseURL: 'https://60becf8e6035840017c17a48.mockapi.io/api/',
    timeout: 2000,
    headers: {'X-Custom-Header': 'foobar'}
});
let employeesData;
function getData(){
    instance.get('/employees')
    .then(function (response) {
        // handle success
        console.log(response.data);
        employeesData = response.data;
        showData(employeesData);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });
    
}

getData();
// Ban đầu dữ liệu ở getdata đc hàm showData hiển thị lên,
// sau đó ở hàm add gọi getdata lần nữa và hàm showData đc chạy lại 1 lần nữa,
// lúc này thì getdata nhận thêm 1 dữ liệu mới rồi in ra cả cũ lẫn mới

// hàm hiển thị dữ liệu trên bảng từ API có sẵn
function formatDate(date){
    let newDate = new Date(date);
    return newDate.toLocaleDateString();
}
function showData() {
    // let ds = [
    //     {id: 1,name: "khỉ", age: 12, phonenumber: 123, city: "HN"},
    //     {id: 2,name: "hâm", age: 12, phonenumber: 123, city: "HN"},
    //     {id: 3,name: "ngáo", age: 12, phonenumber: 123, city: "HN"}
    // ];
    
    event.preventDefault();
    let data = document.getElementsByClassName("data-table");
    data[0].innerHTML = ""; // reset lại dữ liệu

    //ví dụ api có 10 dòng thì sau khi map tự tăng và chạy 10 lần thì data[0] = 10 dòng
    employeesData.filter(item =>
        item.name.includes(document.getElementById("input").value)
    ).map((element,i) => {
        // data[0] ban đầu chưa có gì
        data[0].innerHTML += `
                <tr>
                    <td class="table-content">${i += 1}</td>
                    <td class="table-content">${element.name}</td>
                    <td class="table-content">${formatDate(element.age)}</td>
                    <td class="table-content">${element.phonenumber}</td>
                    <td class="table-content">${element.city}</td>
                    <td class="table-btn">
                        <button onclick="show(${element.id},'${element.name}', '${element.age}', '${element.phonenumber}', '${element.city}');onFocus();" class="btn-edit">
                            <i class="far fa-edit"></i>
                        </button>
                        <button onclick="showDel(${element.id},'${element.name}');onFocus();" class="btn-del">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
                `
        })
}

// ẩn hiện form thêm sửa
function hide() {
    let container = document.getElementsByClassName("container");
    container[0].innerHTML = null
};
// hiển thị form nhập thông tin
function show(id, name = '', age, phoneNum = '', city = '') {
    let container = document.getElementsByClassName("container");
    container[0].innerHTML = `
    <div class="add-container">
        <div class="add-overlay"></div>
        <div class="add">
            <div class="add-form">
                <form onsubmit="addData(${id});hide();showDialog();" class="add-form-input">
                    <input class="add-input focus" type="text" placeholder="Name" value="${name}" required>
                    <input class="add-input" type="date" placeholder="Date" value="${age}" required >
                    <input class="add-input" type="text" placeholder="Phone" value="${phoneNum}" required>
                    <input class="add-input" type="text" placeholder="Address" value="${city}" required>
                    <div class="add-btn-input">
                        <button onclick="hide()" class="add-btn-cancel">CANCEL</button>
                        <input type="submit" class="add-btn" value="ADD">
                    </div>
                </form>
            </div>
        </div>
    </div>
    `
}
function onFocus(){
    let focus = document.getElementsByClassName("focus");
    focus[0].focus();
}
function clickEnter(){
    let enter = document.getElementsByClassName("add-input");
    enter[0].addEventListener("keyup", function(event){
        if(event.keyCode === 13){
            event.preventDefault;
            document.getElementById("btn").click();
        }
    })
}
// function require(){
//     let req = document.getElementsByClassName("add-input");
//     req[0].required;
// }
// thêm dữ liệu
function addData(id) {
    let add = document.getElementsByClassName("add-input");
    event.preventDefault(); // ngăn việc load lại trang sau khi ấn add
    add[0].value;
    add[1].value;
    add[2].value;
    add[3].value;
    let name = add[0].value, 
        age = add[1].value, 
        phonenumber = add[2].value, 
        city = add[3].value;
    if(id !== undefined){ // kiểm tra id đã tồn tại chưa
        instance.put(`/employees/${id}`, {
            name, age, phonenumber, city
        })
        .then(function (response) {
            console.log(response.data);
            getData();
        })
        .catch(function (error) {
            console.log(error);
        });
    }else{
        instance.post('/employees', {
            name, age, phonenumber, city
        })
        .then(function (response) {
            console.log(response.data);
            employeesData.push({name, age, phonenumber, city})
            showData(employeesData);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
}

// sửa dữ liệu trong form


// form xóa
// ẩn hiện form
function hideDel() {
    let delContainer = document.getElementsByClassName("delete-container");
    delContainer[0].innerHTML = '';
}
function showDel(id,name) {
    let delContainer = document.getElementsByClassName("delete-container");
    delContainer[0].innerHTML = `
        <div class="del-container">
            <div class="del-overlay"></div>
            <div class="del-content">
                <form class="del-form">
                    <h3 class="del-danger">Do you want to delete "${name}"?</h3>
                    <div class="del-btn">
                        <button onclick="hideDel()" class="del-btn-cancel">No</button>
                        <button onclick="hideDel();deleteRow(${id});showDialog();" class="del-btn-del focus">Yes</button>
                    </div>
                </form>
            </div>
        </div>
    `
}
// xóa dữ liệu
function deleteRow(id){
    instance.delete(`/employees/${id}`) // xóa theo id đc chọn trên api
    .then(response => {
        // console.log(response.data);
        // employeesData = employeesData.filter(item => item.id !== id);
        // console.log(typeof employeesData);
        for (let i = 0; i < employeesData.length; i++) {
            if(employeesData[i].id == id){
                // ID là cái đc truyền vào còn .id là dữ liệu của mảng
                employeesData.splice(i, 1);
            }
        }
        showData(employeesData);
    })
}
// employeesData=employeesData.map((item,index)=>item.id===id && employeesData.splice(index,1) )
/* note 
Hàm xóa: ban đầu ấn nút xóa sẽ lấy id của dòng đc chọn và truyền vào hàm deleteRow
ở hàm delete thì nó gọi delete request xoá id đó đi
sau đó gọi hàm getData lấy dữ liệu sau khi xoá id vừa rồi và render lại bảng
*/

// show dialog
function showDialog(){
    let dialog = document.getElementsByClassName("success-dialog");
    dialog[0].style.display = 'flex';
    setTimeout(function(){
        dialog[0].style.display = 'none';
    }, 1500)
}