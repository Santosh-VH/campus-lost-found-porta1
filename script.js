let items = JSON.parse(localStorage.getItem('items')) || [];

function registerUser() {
    const name = document.getElementById('name').value;
    const contact = document.getElementById('contact').value;
    const department = document.getElementById('department').value;

    if(name && contact && department) {
        document.getElementById('userMessage').innerText =
            `Welcome ${name}! Registration Successful`;
    } else {
        alert('Please fill all fields');
    }
}

function addItem() {
    const itemName = document.getElementById('itemName').value;
    const description = document.getElementById('description').value;
    const location = document.getElementById('location').value;
    const status = document.getElementById('status').value;
    const imageInput = document.getElementById('image');

    if(!itemName || !description || !location) {
        alert('Please fill all item details');
        return;
    }

    const reader = new FileReader();

    reader.onload = function() {
        const item = {
            itemName,
            description,
            location,
            status,
            image: reader.result
        };

        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
        displayItems();
    };

    if(imageInput.files[0]) {
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        const item = {
            itemName,
            description,
            location,
            status,
            image: ''
        };

        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
        displayItems();
    }
}

function displayItems(filteredItems = items) {
    const itemsList = document.getElementById('itemsList');
    itemsList.innerHTML = '';

    filteredItems.forEach((item, index) => {
        itemsList.innerHTML += `
            <div class="item">
                <h3>${item.itemName} (${item.status})</h3>
                <p><strong>Description:</strong> ${item.description}</p>
                <p><strong>Location:</strong> ${item.location}</p>
                ${item.image ? `<img src="${item.image}" alt="Item Image">` : ''}
                <br>
                <button class="claim-btn" onclick="claimItem(${index})">Claim Request</button>
                <button class="reject-btn" onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });
}

function searchItems() {
    const keyword = document.getElementById('search').value.toLowerCase();

    const filtered = items.filter(item =>
        item.itemName.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword)
    );

    displayItems(filtered);
}

function claimItem(index) {
    alert(`Claim request sent for ${items[index].itemName}`);
}

function removeItem(index) {
    items.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(items));
    displayItems();
}

function clearAll() {
    if(confirm('Are you sure you want to remove all posts?')) {
        localStorage.removeItem('items');
        items = [];
        displayItems();
    }
}

displayItems();
