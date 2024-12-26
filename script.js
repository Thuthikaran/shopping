// Storing elements into variables 
const itemForm = document.querySelector('#item-form')
const itemInput = document.querySelector('#item-input');
const button = document.querySelector('.btn')
const itemList = document.querySelector('#item-list')
const filterButton = document.querySelector('#filter')  
const clearButton = document.querySelector('.btn-clear');
const items = document.querySelector('li'); 

// Functions working on creating an Item 
function onAddItemSubmit(e) {
    e.preventDefault();
    let newItem = itemInput.value.trim();
    if (newItem === '') {
        alert('Please enter an item')
        return
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

// this is what's saving the data from the dom manipulation to local storage 
function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.push(item);
    // convert to JSON string and set to local storage 
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

// Remove One
itemList.addEventListener('click', function (e) {
    if (e.target.classList.contains('fa-xmark')) {
        // Remove the parent `<li>` of the clicked delete button
        const itemToRemove = e.target.closest('li');
        if (itemToRemove) {
            if (confirm('Are you sure you want to delete this item?')) {
                itemToRemove.remove();
            }
        }
    }
    checkUI()
});



// Remove ALl 
function removeAll(e) {
    while (itemList.firstChild) {
        itemList.firstChild.remove();
    }
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
    const isEmpty = itemList.children.length === 0;
    clearButton.style.display = isEmpty ? "none" : "block";
    filterButton.style.display = isEmpty ? "none" : "block";
}

// Event Listeners 
itemForm.addEventListener('submit', onAddItemSubmit)
filterButton.addEventListener('input', filterItems)
clearButton.addEventListener('click', removeAll);

// 
checkUI();