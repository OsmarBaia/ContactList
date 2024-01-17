const contactForm = document.querySelector("#contact-menu");
const formContactName = document.querySelector("#form-contact-name");
const formContactTel = document.querySelector("#form-contact-tel");

const buttonAddContact = document.querySelector("#button-add-contact");
const formButtonSave = document.querySelector("#button-save");
const formButtonCancel = document.querySelector("#button-cancel");

const contactTable = document.querySelector('#table-contacts');
const trTemplate = document.querySelector("#contact-template");

trTemplate.classList.toggle('hidden');

let lastID = 0; /*Fetch somewhere*/
let contactList = [];

let isEditing = false;
let editingID = null;

class contact {
    constructor(contactName, contactTel, contactID) {
        this.contactName = contactName;
        this.contactTel = contactTel;
        this.contactID = contactID;
    }

    print() {
        let newContact = trTemplate.cloneNode(true);
        newContact.classList.remove('hidden');

        let newElement ={
            contactName: newContact.querySelector('#contact-name'),
            contactTel: newContact.querySelector('#contact-tel'),
            editButton: newContact.querySelector('#edit-button'),
            deleteButton : newContact.querySelector('#delete-button')
        }

        newElement.contactName.innerText = this.contactName;
        newElement.contactTel.innerText = this.contactTel;

        newElement.editButton.addEventListener('click', () => { this.editContact();});
        newElement.deleteButton.addEventListener('click', () => { this.deleteContact()});

        contactTable.appendChild(newContact);
    }

    editContact(){
        EditAction(this.contactID);
    }

    deleteContact(){
        DeleteContact(this.contactID);
        UpdateTable();
    }
}

function toggleElementHiddenClass(element){
    if(element.classList.contains("hidden")){
        element.classList.remove("hidden");
    }else{
        element.classList.add("hidden");
    }
}

function OpenContactMenu(){
    try {
        ClearForm();
        toggleElementHiddenClass(contactForm);
        toggleElementHiddenClass(formButtonSave);
        toggleElementHiddenClass(formButtonCancel);
    }catch (e){
        console.log(e);
    }
}

function CloseContactMenu(){
    try {
        ClearForm();
        toggleElementHiddenClass(formButtonSave);
        toggleElementHiddenClass(formButtonCancel);
        toggleElementHiddenClass(contactForm);
    }catch (e){
        console.log(e);
    }
}

function CreateContact(contactID){
    try{
        let newContact = new contact(formContactName.value, formContactTel.value, contactID);
        contactList.push(newContact);
        UpdateTable();
    }
    catch (e) {
        console.log(e);
    }
}

function ReadContact(contactID){
    try{
        contactList.forEach(e => {
            if(e.contactID === contactID)
            {
                formContactName.value = e.contactName;
                formContactTel.value = e.contactTel;
            }
        });
    }
    catch (e) {
        console.log(e);
    }
}

function UpdateContact(contactID){
    try{
        contactList.forEach(e => {
            if(e.contactID === contactID)
            {
                e.contactName = formContactName.value;
                e.contactTel = formContactTel.value;
            }
        });
        UpdateTable();
    }catch (e) {
        console.log(e);
    }

}
function DeleteContact(contactID){
    try{
        contactList.forEach((contact, index) =>{
            if(contactID === contact.contactID){
                delete contactList[index];
                contactList = contactList.reduce((acc, i) => i ? [...acc, i] : acc, []);
            }
        })
    }catch (e) {
        console.log(e);
    }
}

function UpdateTable(){
    const tableContact = document.querySelector("#table-contacts");

    while (tableContact.firstChild) {
        tableContact.removeChild(tableContact.lastChild);
    }

    contactList.forEach(e => {e.print()});
}

function EditAction(contactID){
    OpenContactMenu();
    ReadContact(contactID);
    editingID = contactID;
    isEditing = true;
}

function SaveAction(){
    if(isEditing){
        UpdateContact(editingID);
        isEditing = false;
        editingID = null;
    }else{
        CreateContact(lastID);
        lastID += 1;
    }
    CloseContactMenu();
}

function ClearForm(){
    try{
        formContactName.value = "";
        formContactTel.value = "";
    }
    catch (e) {
        console.log(e);
    }
}

buttonAddContact.addEventListener("click", (e) => {
    e.preventDefault();
    OpenContactMenu();
})

formButtonCancel.addEventListener("click", (e) => {
    e.preventDefault();
    CloseContactMenu();
})

formButtonSave.addEventListener("click", (e) => {
    e.preventDefault();
    SaveAction();
})

