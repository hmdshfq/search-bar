const cardTemplate = document.querySelector('#template');
const userCards = document.querySelector('#user-cards');
const searchElement = document.querySelector('#search');
let users = [];

searchElement.addEventListener('input', event => {
    const value = event.target.value.toLowerCase();
    users.forEach(user => {
        const isVisible = user.name.toLowerCase().includes(value) || user.email.toLowerCase().includes(value);
        user.element.classList.toggle('hide', !isVisible);
    })
})

async function fetchUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();

    users = data.map( user => {
        const card = cardTemplate.content.cloneNode(true).children[0];
        const header = card.querySelector('.card-header');
        const body = card.querySelector('.card-body');
        header.textContent = user.name;
        body.textContent = user.email;
        userCards.append(card);
        return {
            name: user.name,
            email: user.email,
            element: card
        }
    })


}

fetchUsers();