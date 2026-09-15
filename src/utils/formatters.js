export function formatters(value) {
    return new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
}