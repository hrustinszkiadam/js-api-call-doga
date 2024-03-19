const BASE_URL = 'https://retoolapi.dev/aaEKEH/data';

const dataList = document.querySelector('#list');

const nameInput = document.querySelector('#name');
const idInput = document.querySelector('#id');

const deleteButton = document.querySelector('#delete');
const updateButton = document.querySelector('#update');
const addButton = document.querySelector('#add');

fetchData();
deleteButton.addEventListener('click', deleteData);
updateButton.addEventListener('click', updateData);
addButton.addEventListener('click', addData);

async function fetchData() {
	try {
		const data = await (await fetch(BASE_URL)).json();
		data.forEach((item) => createListItem(item));
	} catch (err) {
		console.error(err);
	}
}

async function addData() {
    const name = nameInput.value;
    if (!name) {
        alert('Kötelező megadni egy nevet az adat hozzáadásához!');
        return;
    }
    try {
        await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ customer: name }),
        });
        updateList();
    } catch (err) {
        console.error(err);
    }
}

async function updateData() {
	const id = idInput.value;
	const name = nameInput.value;
	if (!id || !name) {
		alert('Kötelező megadni az ID-t és a nevet egy adat frissítéséhez!');
		return;
	}
	try {
		await fetch(`${BASE_URL}/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ customer: name }),
		});
        updateList();
	} catch (err) {
		console.error(err);
	}
}

async function deleteData() {
	const id = idInput.value;
	if (!id) {
		alert('Kötelező megadni az ID-t egy adat törléséhez!');
		return;
	}
	try {
		await fetch(`${BASE_URL}/${id}`, {
			method: 'DELETE',
		});
        updateList();
	} catch (err) {
		console.error(err);
	}
}

function updateList() {
    dataList.innerHTML = '';
    idInput.value = '';
    nameInput.value = '';
    fetchData();
}

function createListItem(item) {
	const li = document.createElement('li');
	li.textContent = `${item.customer} (${item.id})`;
	li.addEventListener('click', () => populateInputs(item.id, item.customer));
	li.style.width = 'fit-content';
	li.style.cursor = 'pointer';
	dataList.appendChild(li);
}

function populateInputs(id, name) {
	idInput.value = id;
	nameInput.value = name;
}
