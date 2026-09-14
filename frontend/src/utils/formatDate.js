export function formatDate() {
    if (!date) return '';

    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(parsedDate);
}

