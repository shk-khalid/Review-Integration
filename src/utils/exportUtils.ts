import { Review } from '../pages/Dashboard/types';

export function generateCSV(reviews: Review[]): string {
  const headers = ['Date', 'Reviewer', 'Rating', 'Source', 'Comment', 'Reply'];
  const rows = reviews.map(review => [
    review.date,
    review.reviewer.name,
    review.rating,
    review.source,
    review.text,
    review.reply || ''
  ]);

  return [headers, ...rows]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n');
}

export function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}