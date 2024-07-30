export function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const dateString = date.toISOString().slice(0, 10);
  return dateString.split("-").join("/");
}

export function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes}`;
}

export function timeAgo(timestamp: number): string {
  const now = Date.now();
  const secondsPast = Math.floor((now - timestamp) / 1000);

  if (secondsPast < 60) {
    return `${secondsPast} seconds ago`;
  }

  const minutesPast = Math.floor(secondsPast / 60);
  if (minutesPast < 60) {
    return `${minutesPast} minutes ago`;
  }

  const hoursPast = Math.floor(minutesPast / 60);
  if (hoursPast < 24) {
    return `${hoursPast} hours ago`;
  }

  const daysPast = Math.floor(hoursPast / 24);
  if (daysPast < 7) {
    return `${daysPast} days ago`;
  }

  const weeksPast = Math.floor(daysPast / 7);
  if (weeksPast < 4) {
    return `${weeksPast} weeks ago`;
  }

  const monthsPast = Math.floor(daysPast / 30);
  if (monthsPast < 12) {
    return `${monthsPast} months ago`;
  }

  const yearsPast = Math.floor(daysPast / 365);
  return `${yearsPast} years ago`;
}
