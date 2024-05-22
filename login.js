document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('loginForm');
    var usernameField = document.getElementById('username');
    var loginField = document.getElementById('login');
    var passwordField = document.getElementById('password');
    var submitButton = document.getElementById('submitButton');
    var toggleButton = document.getElementById('toggleButton');
    var isRegisterMode = false;

    // Логика переключения между режимами "Быстрый вход" и "Регистрация/Логин"
    toggleButton.addEventListener('click', function() {
        if (isRegisterMode) {
            loginField.style.display = 'none';
            passwordField.style.display = 'none';
            submitButton.textContent = 'Подвердить';
            toggleButton.textContent = 'Регестрация';
            isRegisterMode = false;
        } else {
            loginField.style.display = 'block';
            passwordField.style.display = 'block';
            submitButton.textContent = 'Подвердить';
            toggleButton.textContent = 'Логин';
            isRegisterMode = true;
        }
    });

    

    // Загрузка данных из Local Storage
    var savedUsername = localStorage.getItem('username');

    if (savedUsername) {
        // Проверяем существует ли пользователь с этим именем на сервере
        fetch(`https://192.168.18.10:8080/user/${savedUsername}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.exists) {
                    // Если пользователь существует, автоматически заполняем поле username
                    usernameField.value = savedUsername;
                } else {
                    // Если пользователь не существует, удаляем его имя из Local Storage
                    localStorage.removeItem('username');
                }
            })
            .catch(error => {
                console.error('Error checking user data:', error);
            });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('loginForm'); // Убедитесь, что id формы соответствует
    var usernameField = document.getElementById('username'); // Убедитесь, что id поля ввода соответствует
    var passwordField = document.getElementById('password'); // Убедитесь, что id поля ввода соответствует
    var loginField = document.getElementById('login');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвращаем стандартную обработку формы

        console.log('Username:', usernameField.value); // Для отладки
        console.log('Password:', passwordField.value); // Для отладки

        localStorage.setItem('username', usernameField.value);
        localStorage.setItem('password', passwordField.value);
        localStorage.setItem('login', loginField.value); // Убедитесь, что loginField также определен
    });
});