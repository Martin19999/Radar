export function timeCalculator(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const timeIntervals = [
    { label: 'year', seconds: 31536000 },  // 60 * 60 * 24 * 365
    { label: 'month', seconds: 2592000 },   // 60 * 60 * 24 * 30
    { label: 'week', seconds: 604800 },     // 60 * 60 * 24 * 7
    { label: 'day', seconds: 86400 },       // 60 * 60 * 24
    { label: 'hour', seconds: 3600 },       // 60 * 60
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
  ];

  for (const interval of timeIntervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';

}