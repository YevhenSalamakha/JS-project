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

	// Timer

	const deadLine = '2021-12-20';

	function remainingTime(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date()),
			days = Math.floor((t / (1000 * 60 * 60 * 24))),
			hours = Math.floor((t / (1000 * 60 * 60) % 24)),
			minutes = Math.floor((t / 1000 / 60) % 60),
			seconds = Math.floor((t / 1000) % 60);

		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return '0' + num;
		} else {
			return num;
		}
	};

	function setClock(parent, endtime) {
		const timer = document.querySelector(parent),
			days = timer.querySelector("#days"),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);


		updateClock();


		function updateClock() {
			const t = remainingTime(endtime); // записали в цю змінну обє'кт, який є результатом роботи функ remaining

			days.innerHTML = t.days;
			hours.innerHTML = t.hours;
			minutes.innerHTML = t.minutes;
			seconds.innerHTML = t.seconds;

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		};
	};

	setClock('.timer', deadLine);
});

/* 1.) Змінна deadline в якій час кінця акції
2.) Функція яка обраховує залишок часу від зазначеного кінця акції
і сьогоднішнього дня(скільки днів лишилось) в годинах, хв, і тд
В функцію передати deadline щоб знала з чим зрівнювати.
Створити технічну змінну в якій якраз йде обрахунок залишку часу const t = Date.parse(endtime) - Date.parse(new Date()),
	знак % залишає частку і ми зможемо коректно відображати інформацію, якшо число буде 50 і ввести % 24 то буде частка 2.
!Потім в return вивести інформацію яка попаде в зовнішній світ і ми зможемо з нею взаємодіяти
3.) Створити функцію яка отримує елементи з html, щоб потім могли змінити їх на обраховані вище дані.seconds
в аргументи передаєм сам батьківський елемент, і endtime(deadline - щоб потім використати).

4.) Створюєм функцію яка заміняє елементи html на потрібні нам
в технічну змінну запихаємо результат роботи фукції обрахування, в вигляді об'єкта, ключ(назва), і самі дані.
Далі за допомогою innerHTML заміняємо витягнуті елементи з html на витягнуті дані з функції обрахування залишку.

5.) Викликаємо функцію setClock і в неї передаєм батьківський елемент і константу в якій дата кінця акції.

6.) Створюємо метод setInterval яка буде запускати функцію updateClock(заміни елементів html) кожну секунду нові дані
Також запускаєм після цього просто updateClock(); щоб уникнути блимання верстки

7.) Створюємо функцію getZero, в якій буде умова якшо поступаючі цифри будуть менші за 10 в них з'явиться 0, якшо ні, вертається все як було. */