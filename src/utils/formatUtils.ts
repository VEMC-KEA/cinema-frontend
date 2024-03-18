function formatDate(date: string) {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("da-DK", {
        weekday: "short",
        day: "numeric",
        month: "numeric"
    });
}

function formatTime(time: string) {
    return time.slice(0, 5);
}

export { formatDate, formatTime };
