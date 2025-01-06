// Storing elements into variables 
const itemForm = document.querySelector('#item-form')
const itemInput = document.querySelector('#item-input');
const button = document.querySelector('.btn')
const filterButton = document.querySelector('#filter')  
const itemList = document.querySelector('#item-list')
const items = document.querySelector('li'); 
const clearButton = document.querySelector('.btn-clear');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDom(item));
    checkUI();
}

// Functions working on creating an Item 
function onAddItemSubmit(e) {
    e.preventDefault();
    let newItem = itemInput.value.trim();
    if (newItem === '') {
        alert('Please enter an item')
        return
    }  

    // Check for edit mode 
    if (isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode');
        removeItemfromStorage(itemToEdit.textContent);

        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    } else {
        if (checkIfItemExists(newItem)) {
            alert('that item already exists!');
            return
        }
    }

    // Create item Dom element
    addItemToDom(newItem)

    // Add item to local storage 
    addItemToStorage(newItem);
    // calling the checkUI function to take out the filter and clear button 
    checkUI(); 
    // Resetting the input field
    itemInput.value = '';
};

// Creating the html using javascript dom manipulation 

function addItemToDom(item) {
    const newLi = document.createElement('li');
    const newText = document.createTextNode(item);
    newLi.appendChild(newText);
    itemList.appendChild(newLi);
    const createdButton = createButton("remove-item btn-link text-red");
    newLi.appendChild(createdButton);
}

function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon("fa-solid fa-xmark");
    button.appendChild(icon);
    return button;
}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes
    return icon;
}

// Adds a new item to local storage
function addItemToStorage(item) {
    // Get the current list of items from local storage (returns an array)
    const itemsFromStorage = getItemsFromStorage(); 
    
    // Add the new item to the array
    itemsFromStorage.push(item); 
    
    // Convert the array to a JSON string and save it in local storage under the key "items"
    localStorage.setItem('items', JSON.stringify(itemsFromStorage)); 
}

// Retrieves the list of items from local storage
function getItemsFromStorage() {
    // Check if there is no "items" key in local storage
    if (localStorage.getItem('items') === null) {
        // If no items exist, return an empty array to start the list
        itemsFromStorage = []; 
    } else {
        // If items exist, parse the stored JSON string back into an array
        itemsFromStorage = JSON.parse(localStorage.getItem('items')); 
    }

    // Return the array of items (either empty or filled with existing data)
    return itemsFromStorage; 
}

function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
    } else {
        setItemToEdit(e.target)
    }
}

function checkIfItemExists(item) {
    const itemsFromStorage = getItemsFromStorage();
    return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
    isEditMode = true;

    itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'));

    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
    formBtn.style.backgroundColor = "#228B22";
    itemInput.value = item.textContent;
}

function removeItem(item) {
    if (confirm('Are you sure you want to delete this item?')) {
        // Remove item from DOM
        item.remove();

        // Remove item from storage
        removeItemfromStorage(item.textContent);

        checkUI();
    }
}

function removeItemfromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();

    // Filter out the item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    // Re-set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// Remove ALl 
function removeAll(e) {
    while (itemList.firstChild) {
        itemList.firstChild.remove();
    }

    // Clear from local storage 
    localStorage.removeItem('items');

    checkUI();
}


function filterItems(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('#item-list li').forEach(item => {
        const itemText = item.firstChild.textContent.toLowerCase();
        item.style.display = itemText.includes(text) ? 'flex' : 'none';
    });
}

function checkUI() {
    itemInput.value = ""

    const isEmpty = itemList.children.length === 0;
    clearButton.style.display = isEmpty ? "none" : "block";
    filterButton.style.display = isEmpty ? "none" : "block";

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333';

    isEditMode = false;
}

// Initialize app 
function init() {
    // Event Listeners 
    itemForm.addEventListener('submit', onAddItemSubmit)
    filterButton.addEventListener('input', filterItems)
    itemList.addEventListener('click', onClickItem);
    clearButton.addEventListener('click', removeAll);
    document.addEventListener('DOMContentLoaded', displayItems);
    checkUI(); // Clear UI
}

init();


