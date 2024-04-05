export const removeAcentos = (value: string) => {
    const removed = value.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    return removed.toLocaleLowerCase();
}