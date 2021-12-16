window.addEventListener('DOMContentLoaded', function () {

	// Tabs

	let tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {

		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});
	}

	function showTabContent(i = 0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', function (event) {
		const target = event.target;
		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});

	const deadLine = '2021-05-11';

	// цю функцію ми зробили щоб використати отриманні з неї данні знизу
	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new.Date()), // результат в мс кінцевого ч. - теперешнього ч.
			days = Math.floor(t / (1000 * 60 * 60 * 24)), // кількість мс за день, без хвоста він відкінеться, 1000 мс * 60 = к-сть мс в 1 хвилині
			hours = Math.floor((t / (1000 * 60 * 60) % 24)), // 50/24 2 дні відкидуємо 2 години цей хвіст нам і потрібен шоб вказати залишок
			minutes = Math.floor((t / 1000 / 60) % 60), // t/1000 кс секунд потім ділим і вийдуть секунди
			//! всюди множим 1000 на шось, бо до прикладу в hours 1000*60 вийде кількість мілісекунд в 1 хв, 1000 пишеться для зручності
			seconds = Math.floor((t / 1000) % 60); // отримали секунди, мілісекунди поділили на 1000 і це вийшли секунди
		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function setClock(selector, endtime) { // налаштовуємо наш таймер
		const timer = document.querySelector(selector), // всередині змінної timer шукаємо айдішки
			days = timer.querySelector('#days'), // timer це те що ми передамо при виклику функції
			hours = timer.querySelector('#hours'), // це може бути інші елементи з тими вказаними айді шоб добавились в зміні
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000); // функ updateClock буде вик кожну секунду

		function updateClock() {
			const t = getTimeRemaining(endtime); // записали об'єкт return і можем юзати

			days.textContent = t.days;
			hours.textContent = t.hours;
			minutes.textContent = t.minutes;
			seconds.textContent = t.seconds;

			if (t.total <= 0) {
				clearInterval(timeInterval);
			};
		}
	};
	setClock('.timer', deadLine);
});