const addBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const resetBtn = document.getElementById('reset-btn');
const recordContainer = document.querySelector('.work-container')

const name = document.getElementById('name');
const place = document.getElementById('place');
const time = document.getElementById('time');
const description = document.getElementById('description');

let WorkArray = [];
let id = 0;

function Work(id, name, place, time, description){
    this.id = id;
    this.name = name;
    this.place = place;
    this.time = time;
    this.description = description;
}

// display available work
document.addEventListener('DOMContentLoaded', function(){
    if(localStorage.getItem('works') == null){
        WorkArray = [];
    }else{
        WorkArray = JSON.parse(localStorage.getItem('works'));
        lastID(WorkArray);
    }
    displayRecord();
})

function displayRecord(){
    WorkArray.forEach(function(singleWork){
        addToList(singleWork);
    });
}

// find the last id
function lastID(ContactArray){
    if(ContactArray.length > 0){
        id = ContactArray[ContactArray.length - 1].id;
    } else {
        id = 0;
    }
}

// add new work
addBtn.addEventListener('click', function(){
    if(checkInputField([name, place, time, description])){

        setMessage("success", "Thêm công việc thành công!");

        id++;
        const work = new Work(id, name.value, place.value, time.value, description.value);
        WorkArray.push(work);
        
        localStorage.setItem('works', JSON.stringify(WorkArray));

        addToList(work);

        clearInputFields();
    }else{
        setMessage("error", "Thông tin không được để trống!")
    }
})

// input field validation
function checkInputField(inputArr){
    for(let i = 0; i < inputArr.length ; i++){
        if(inputArr[i].value === ""){
            return false;
        }
    }
    return true;
}

// add to list (DOM)
function addToList(item){
    const newRecordDiv = document.createElement('div');
    newRecordDiv.classList.add('work-item');
    newRecordDiv.innerHTML = `
        <div class="work-el">
            <span id="labeling">STT:</span>
            <span id="work-id">${item.id}</span>
        </div>
        <div class="work-el">
            <span id="labeling">Tên công việc:</span>
            <span id="work-name">${item.name}</span>
        </div>
        <div class="work-el">
            <span id="labeling">Địa điểm:</span>
            <span id="work-place">${item.place}</span>
        </div>
        <div class="work-el">
            <span id="labeling">Thời gian:</span>
            <span id="work-time">${item.time}</span>
        </div>
        <div class="work-el">
            <span id="labeling">Mô tả:</span>
            <span id="work-description">${item.description}</span>
        </div>
        <button type="submit" id="delete-btn">
            <span>
                <i class="fas fa-trash"></i>
            </span>Xóa
        </button>
    `;
    recordContainer.appendChild(newRecordDiv);
}

// delete work
recordContainer.addEventListener('click', function(event){
    if(event.target.id === 'delete-btn'){
        let recordItem = event.target.parentElement;
        recordContainer.removeChild(recordItem);
        let tempWorkList = WorkArray.filter(function(record){
            return (record.id !== parseInt(recordItem.firstElementChild.lastElementChild.textContent));
        });
        WorkArray = tempWorkList;

        localStorage.setItem('works', JSON.stringify(WorkArray));
    }
});

// delete all work
resetBtn.addEventListener('click', function(){
    WorkArray = [];
    localStorage.setItem('works', JSON.stringify(WorkArray));
    location.reload();
})

// display status
function setMessage(status, message){
    let messageBox = document.querySelector('.message');
    if(status == "success"){
        messageBox.innerHTML = `${message}`;
        messageBox.classList.add('success');
        removeMessage(status, messageBox);
    }
    if(status == "error"){
        messageBox.innerHTML = `${message}`;
        messageBox.classList.add('error');
        removeMessage(status, messageBox);
    }
}

//remove status
function removeMessage(status, messageBox){
    setTimeout(function(){
        messageBox.classList.remove(`${status}`)
    }, 3000);
}

// clear input field
cancelBtn.addEventListener('click', function(){
    clearInputFields();
})

function clearInputFields(){
    name.value = "";
    place.value = "";
    time.value = "";
    description.value = ""
}

