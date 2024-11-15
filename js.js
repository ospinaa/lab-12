const form = document.getElementById('contactForm');
const contactList = document.getElementById('contactList');
const cancelEdit = document.getElementById('cancelEdit');

let editIndex = null;

document.addEventListener('DOMContentLoaded', loadContacts);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const contact = {
        nombre: document.getElementById('nombre').value,
        telefono: document.getElementById('telefono').value,
        email: document.getElementById('email').value,
        direccion: document.getElementById('direccion').value,
    };
    
    if (editIndex === null) {
        addContact(contact);
    } else {
        updateContact(contact);
    }
    form.reset();
});

cancelEdit.addEventListener('click', () => {
    resetForm();
});

function addContact(contact) {
    const contacts = getContacts();
    contacts.push(contact);
    saveContacts(contacts);
    renderContacts();
}

function loadContacts() {
    renderContacts();
}

function getContacts() {
    return JSON.parse(localStorage.getItem('contacts')) || [];
}

function saveContacts(contacts) {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

function renderContacts() {
    const contacts = getContacts();
    contactList.innerHTML = '';
    contacts.forEach((contact, index) => {
        const contactElement = document.createElement('div');
        contactElement.classList.add('contact-card');
        contactElement.innerHTML = `
            <p><strong>Nombre:</strong> ${contact.nombre}</p>
            <p><strong>Teléfono:</strong> ${contact.telefono}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Dirección:</strong> ${contact.direccion}</p>
            <button onclick="editContact(${index})">Editar</button>
            <button onclick="deleteContact(${index})">Eliminar</button>
        `;
        contactList.appendChild(contactElement);
    });
}

function editContact(index) {
    const contacts = getContacts();
    const contact = contacts[index];
    document.getElementById('nombre').value = contact.nombre;
    document.getElementById('telefono').value = contact.telefono;
    document.getElementById('email').value = contact.email;
    document.getElementById('direccion').value = contact.direccion;
    editIndex = index;
    cancelEdit.style.display = 'inline';
}

function updateContact(updatedContact) {
    const contacts = getContacts();
    contacts[editIndex] = updatedContact;
    saveContacts(contacts);
    renderContacts();
    resetForm();
}

function deleteContact(index) {
    const contacts = getContacts();
    contacts.splice(index, 1);
    saveContacts(contacts);
    renderContacts();
}

function resetForm() {
    form.reset();
    editIndex = null;
    cancelEdit.style.display = 'none';
}