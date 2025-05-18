export default function timeFunction() {
    const formatDate = (dateString) => {
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true, 
            timeZone: userTimeZone, 
        };

        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    const formatTime = (dateString) => {
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: undefined, // Exclude seconds if not needed
            hour12: true, 
            timeZone: userTimeZone, 
        };

        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    return { formatDate, formatTime };
}
