export function formatDate() {
    return new Intl.DateTimeFormat('en-US', { style: 'occured_at' }).format();
}

