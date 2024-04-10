export const removeAcentos = (value: string) => {
    const removed = value.normalize('NFD').replace(/[^\w\s]/gi, '');
    return removed.toLocaleLowerCase().split(' ').join('');
}

export const formatMoney = (value: number) => {
    const ajusted = isNaN(value) ? 0 : value;
    const formated = Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' });
    return formated.format(ajusted);
}

export const formatPercent = (value: number) => {
    const ajusted = isNaN(value) ? 0 : value;
    return (ajusted * 100).toFixed(2);
}