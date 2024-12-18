// Storing elements into variables 
const itemForm = document.querySelector('#item-form')
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list')
const button = document.querySelector('.btn')

// Functions 
function createElement(e) {
    e.preventDefault();
    
    let newItem = itemInput.value.trim();
    if (newItem === '') {
        console.log('Enter an item')
    } else {
        const newLi = document.createElement('li');
        const newText = document.createTextNode(newItem);
        newLi.appendChild(newText);
        itemList.appendChild(newLi);

        
        const createdButton = createButton("remove-item btn-link text-red");
        newLi.appendChild(createdButton);

        // Reset the input field
        itemInput.value = '';
    }
};


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

// Event Listeners 
itemForm.addEventListener('submit', createElement)


