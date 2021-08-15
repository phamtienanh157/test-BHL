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
function getData(){
    instance.get('/employees')
    .then(function (response) {
        // handle success
        console.log(response.data);
        showData(response.data);
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
function showData(list) {
    let data = document.getElementsByClassName("data-table");
    data[0].innerHTML = "";
    // ví dụ api có 10 dòng thì sau khi map tự tăng và chạy 10 lần thì data[0] = 10 dòng
    list.map((element,i) => {
        // data[0] ban đầu chưa có gì
        data[0].innerHTML += `
                <tr>
                    <td class="table-content">${i += 1}</td>
                    <td class="table-content">${element.name}</td>
                    <td class="table-content">${element.age}</td>
                    <td class="table-content">${element.phonenumber}</td>
                    <td class="table-content">${element.city}</td>
                    <td class="table-btn">
                        <button onclick="show()" class="btn-edit">
                            <i class="far fa-edit"></i>
                        </button>
                        <button onclick="showDel(${element.id});onFocus();" class="btn-del">
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

function show() {
    let container = document.getElementsByClassName("container");
    container[0].innerHTML = `
    <div class="add-container">
        <div class="add-overlay"></div>
        <div class="add">
            <div class="add-form">
                <form class="add-form-input">
                    <input id="add" class="add-input focus" type="text" placeholder="Name" required>
                    <input class="add-input" type="text" placeholder="Date" required>
                    <input class="add-input" type="text" placeholder="Phone" required>
                    <input class="add-input" type="text" placeholder="Adress" required>
                    <div class="add-btn-input">
                        <button onclick="hide()" class="add-btn-cancel">CANCEL</button>
                        <button id="btn" type="submit" onclick="addData();hide();clickEnter();" onsubmit="addData()" class="add-btn">ADD</button>
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
    let enter = document.getElementsById("add");
    enter.addEventListener("keyup", function(event){
        if(event.keyCode === 13){
            event.preventDefault;
            document.getElementById("btn").click();
        }
    })
}
// thêm dữ liệu
function addData() {
    let add = document.getElementsByClassName("add-input");
    event.preventDefault(); // ngăn việc load lại trang sau khi ấn add
    add[0].value;
    console.log(add[0].value);
    add[1].value;
    console.log(add[1].value);
    add[2].value;
    console.log(add[2].value);
    add[3].value;
    console.log(add[3].value);
    let name = add[0].value, 
        age = add[1].value, 
        phonenumber = add[2].value, 
        city = add[3].value;
    instance.post('/employees', {
        name, age, phonenumber, city
    })
    .then(function (response) {
        console.log(response.data);
        getData();
    })
    .catch(function (error) {
        console.log(error);
    });
}

// sửa dữ liệu trong form



// form xóa
// ẩn hiện form
function hideDel() {
    let delContainer = document.getElementsByClassName("delete-container");
    delContainer[0].innerHTML = '';
}
function showDel(id) {
    let delContainer = document.getElementsByClassName("delete-container");
    delContainer[0].innerHTML = `
        <div class="del-container">
            <div class="del-overlay"></div>
            <div class="del-content">
                <form class="del-form">
                    <h3 class="del-danger">Are you sure ?</h3>
                    <div class="del-btn">
                        <button onclick="hideDel()" class="del-btn-cancel">No</button>
                        <button onclick="hideDel();deleteRow(${id});" class="del-btn-del focus">Yes</button>
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
        console.log(response.data);
        getData();
    })
}
/* note 
Hàm xóa: ban đầu ấn nút xóa sẽ lấy id của dòng đc chọn và truyền vào hàm deleteRow
ở hàm delete thì nó gọi delete request xoá id đó đi
sau đó gọi hàm getData lấy dữ liệu sau khi xoá id vừa rồi và render lại bảng
*/