function formatDate(dateString: string): string {
    const months: string[] = [
        'января', 'февраля', 'марта',
        'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября',
        'октября', 'ноября', 'декабря'
    ];

    const date = new Date(dateString);
    const day: number = date.getDate();
    const month: string = months[date.getMonth()];
    const year: number = date.getFullYear();

    return `${day} ${month} ${year}`;
}
export default formatDate;