export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
  }).format(date);
}

export function formatDateMore(dateString: string): string {
  const date = new Date(dateString);
  // Format the date part
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(date);

  // Format the time part (24-hour format)
  const formattedTime = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date);

  // Combine date and time with a comma
  return `${formattedDate}, ${formattedTime}`;
}