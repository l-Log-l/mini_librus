
function openSettings() {
    document.getElementById('settingsModal').style.display = 'block';
}

function closeSettings() {
    document.getElementById('settingsModal').style.display = 'none';
}

// Функция переключения темы и сохранения выбранной темы в localStorage
function toggleTheme() {
    var body = document.body;
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    }
}

// Функция для установки темы при загрузке страницы на основе значения из localStorage
function loadTheme() {
    var theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.add('light-theme');
    }
}

// Вызываем функцию для установки темы при загрузке страницы
document.addEventListener('DOMContentLoaded', loadTheme);

// Close the modal if the user clicks outside of it
window.onclick = function(event) {
    var modal = document.getElementById('settingsModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

function logout() {
    localStorage.removeItem('username');
    // Дополнительные действия, например, перенаправление на страницу входа или обновление интерфейса
    window.location.href = '/'; // Пример перенаправления на страницу входа
}