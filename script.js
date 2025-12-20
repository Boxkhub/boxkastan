// Навигация - активная ссылка при прокрутке
document.addEventListener('DOMContentLoaded', function() {
	const sections = document.querySelectorAll('section[id]');
	const navLinks = document.querySelectorAll('.nav-link');
	
	// Функция для обновления активной ссылки
	function updateActiveLink() {
		let current = '';
		
		sections.forEach(section => {
			const sectionTop = section.offsetTop - 100;
			const sectionHeight = section.clientHeight;
			if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
				current = section.getAttribute('id');
			}
		});
		
		navLinks.forEach(link => {
			link.classList.remove('active');
			if (link.getAttribute('href') === `#${current}`) {
				link.classList.add('active');
			}
		});
	}
	
	window.addEventListener('scroll', updateActiveLink);
	
	// Инициализация активной ссылки
	updateActiveLink();
	
	// Копирование IP адреса
	const ipAddress = document.getElementById('ipAddress');
	const copyBtn = document.getElementById('copyBtn');
	const notification = document.getElementById('copy-notification');
	
	function copyIP() {
		const ip = 'boxk.mcserv.fun';
		
		navigator.clipboard.writeText(ip).then(() => {
			// Показать уведомление
			notification.classList.add('show');
			setTimeout(() => {
				notification.classList.remove('show');
			}, 3000);
			
			// Визуальная обратная связь
			ipAddress.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
			setTimeout(() => {
				ipAddress.style.backgroundColor = '';
			}, 500);
		});
	}
	
	ipAddress.addEventListener('click', copyIP);
	copyBtn.addEventListener('click', copyIP);
	
	// Мобильное меню
	const mobileMenuBtn = document.getElementById('mobileMenuBtn');
	const navLinksContainer = document.getElementById('navLinks');
	
	mobileMenuBtn.addEventListener('click', function() {
		navLinksContainer.classList.toggle('active');
	});
	
	// Закрытие мобильного меню при клике на ссылку
	navLinks.forEach(link => {
		link.addEventListener('click', function() {
			if (window.innerWidth <= 768) {
				navLinksContainer.classList.remove('active');
			}
		});
	});
	
	// Закрытие мобильного меню при клике вне его
	document.addEventListener('click', function(event) {
		if (window.innerWidth <= 768 && 
			!navLinksContainer.contains(event.target) && 
			!mobileMenuBtn.contains(event.target) &&
			navLinksContainer.classList.contains('active')) {
			navLinksContainer.classList.remove('active');
		}
	});
});