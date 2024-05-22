document.addEventListener("DOMContentLoaded", function() {
    const daySelect = document.getElementById('day-select');

    async function fetchSchedule(day) {
        try {
        	var username = localStorage.getItem('username');
            const response = await fetch(`https://userlog.pythonanywhere.com/list_class?day=${day}&username=${username}`, {
                cache: "no-cache" // Отключаем кеширование
            });
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            
            


            const data = await response.json();
            const scheduleElement = document.getElementById('schedule');
            scheduleElement.innerHTML = ''; // Очистка текущего расписания
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const lesson = data[key];
                    const listItem = document.createElement('li');
                    let replacementText = '';
                    listItem.className = 'li';
                    let nameText = `[${key}] ${lesson.name}`;
                    let teacherText = lesson.teacher

                    if (lesson.replacement!== null) {
                        replacementText = `<b style="white-space: nowrap;vertical-align: middle;position: absolute;left: 67%;">${lesson.replacement}</b>`;
                        listItem.className = 'lit';
                    }
                    let classText = '?.?';
                    if (lesson.class!== null) {
                        classText = `${lesson.class}`;
                    }
                    if (lesson.close == true) {
                        nameText = `<s>${nameText}</s>`
                        classText = `<s>${classText}</s>`
                        teacherText = `<s>${teacherText}</s>`
                        listItem.className = 'lic';
                    }
                    listItem.innerHTML = `
    
                    <div class="title">${nameText} (${classText}) ${replacementText}</div>
                    <div>Учитель: <h style="white-space: nowrap;vertical-align: middle;position: absolute;left: 67%;">${lesson.Tomek}</h><div>${teacherText}</div></div>
                    `;

                    scheduleElement.appendChild(listItem);
                }
            }
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        }
    }

    // Изначальная загрузка расписания на понедельник
    var day = null;
    var today = new Date();
    var weekday = today.getDay(); // 0 - воскресенье, 1 - понедельник,..., 6 - суббота

    // Переводим номер дня недели в ваш формат (0 - понедельник,..., 4 - пятница)
    var adjustedWeekday = weekday - 1; // 0 = понедельник, ..., 4 = пятница, -1 = воскресенье, 5 = суббота

    if (adjustedWeekday < 0 || adjustedWeekday > 4) {
        daySelect.value = "0"; // Устанавливаем понедельник как значение по умолчанию
        day = "0";
    } else {
        daySelect.value = String(adjustedWeekday); // Устанавливаем выбранный день
        day = String(adjustedWeekday);
    }

    console.log(day);
    fetchSchedule(day);


    
    // Обработка изменения выбранного дня
    daySelect.addEventListener('change', function() {
        fetchSchedule(daySelect.value);
    });
});
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
