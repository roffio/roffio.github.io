document.addEventListener('DOMContentLoaded', () => {
    // Плавная прокрутка к секции "Связаться со мной"
    const contactMeButton = document.querySelector('.contact-me');
    const contactSection = document.getElementById('contact');

    if (contactMeButton && contactSection) {
        contactMeButton.addEventListener('click', (e) => {
            e.preventDefault();
            contactSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Базовая валидация формы обратной связи
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');
            const messageError = document.getElementById('message-error');

            nameError.textContent = '';
            emailError.textContent = '';
            messageError.textContent = '';

            if (nameInput.value.trim() === '') {
                nameError.textContent = 'Пожалуйста, введите ваше имя.';
                isValid = false;
            }

            if (emailInput.value.trim() === '') {
                emailError.textContent = 'Пожалуйста, введите ваш email.';
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                emailError.textContent = 'Пожалуйста, введите корректный email.';
                isValid = false;
            }

            if (messageInput.value.trim() === '') {
                messageError.textContent = 'Пожалуйста, введите сообщение.';
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault();
            } else {
                // Здесь можно добавить код для отправки данных формы на сервер
                alert('Сообщение отправлено! (имитация)');
                contactForm.reset();
            }
        });

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    }

    // Плавное появление секций при прокрутке
    const sections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Прекратить наблюдение после показа
            }
        });
    }, {
        threshold: 0.1 // Порог видимости секции (10%)
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});