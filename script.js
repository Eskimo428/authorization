const btn = document.getElementById('signin__btn');
const welcome = document.getElementById('welcome');
const userId = document.getElementById('user_id');
const signIn = document.getElementById('signin');
const loginInput = document.querySelector('input[name="login"]');
const passwordInput = document.querySelector('input[name="password"]');
const logOut = document.querySelector('.log-out')
let errorMessage = document.createElement('div');
errorMessage.classList.add('error')

btn.addEventListener('click', (event) => {
    event.preventDefault();
    

    const username = loginInput.value;
    const password = passwordInput.value;


    fetch('https://my-json-server.typicode.com/Eskimo428/fake-server/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.username === 'demo' && data.password === 'demo') {
            console.log('Авторизация прошла успешно. ID пользователя:', data.id);
            welcome.classList.add('welcome_active');
            userId.textContent = data.id;
            signIn.classList.add('signin');
            signIn.remove(errorMessage);
            saveLocalStorage(data.id);

        }else {
            console.log('Неверные данные для входа');
            if (data.username !== 'demo') {
                errorMessage.textContent = 'Неверный логин';
            } else {
                errorMessage.textContent = 'Неверный пароль';
            }
            signIn.insertBefore(errorMessage, signIn.firstElementChild);
        }
    })
    .catch(error => {
        console.error('Произошла ошибка:', error);
    });
});

function saveLocalStorage(userId) {
    localStorage.setItem('userId', JSON.stringify(userId));
}

function getLocalStorage() {
    try {
        return JSON.parse(localStorage.getItem('userId'));
    } catch (e) {
        return null;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const storedUserId = getLocalStorage();
    if (storedUserId) {
        welcome.classList.add('welcome_active');
        userId.textContent = storedUserId;
        signIn.classList.remove('signin_active');
    }
});


logOut.addEventListener('click', clearLocalstorage)

function clearLocalstorage(){
    localStorage.clear()
}
