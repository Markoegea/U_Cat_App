import {initializeApp} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://lucy-e7ab2.firebaseio.com"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const cartsInDB = ref(database, "Cart");

const input_field = document.getElementById("input-field");
const button = document.getElementById("add-button");
const list = document.getElementById("shopping-list");

button.addEventListener("click", buttonBehavior)

function buttonBehavior(){
    let inputField = input_field.value;
    if (inputField == ""){
        return
    }
    push(cartsInDB, inputField);   
}

onValue(cartsInDB, getCartItems);

function getCartItems(snapshot){
    clearAll()
    if (!snapshot.exists()){
        list.innerHTML = "No items here... yet."
        return
    }
    let data = Object.entries(snapshot.val());
    addItemsToList(data)
}

function clearAll(){
    input_field.value = "";
    list.innerHTML = "";
}

function addItemsToList(array){
    for (let item of array){
        createELement('li', item[0], item[1], list)
    }
}

function createELement(type, id, value, parent){
    const listItem = document.createElement(type);
    listItem.setAttribute('id', id);
    listItem.innerHTML = value;
    listItem.addEventListener("click", liItemBehavior);
    parent.appendChild(listItem);
}

function liItemBehavior(event){
    const elementID = event.target.id;
    remove(ref(database, "Cart/"+elementID))
}