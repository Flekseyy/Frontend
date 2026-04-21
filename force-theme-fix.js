// ВРЕМЕННОЕ РЕШЕНИЕ ДЛЯ ТЕСТА
// ЗАПУСТИ ЭТОТ КОД В КОНСОЛИ БРАУЗЕРА
document.documentElement.setAttribute('data-theme', 'light');
document.body.setAttribute('data-theme', 'light');
console.log('✅ Атрибуты установлены:');
console.log('html data-theme:', document.documentElement.getAttribute('data-theme'));
console.log('body data-theme:', document.body.getAttribute('data-theme'));

// Проверим применяется ли стиль
setTimeout(() => {
    console.log('Цвет фона body:', getComputedStyle(document.body).backgroundColor);
    console.log('Цвет фона html:', getComputedStyle(document.documentElement).backgroundColor);
}, 100);