import { jsPDF } from 'jspdf';
import { Business } from '../pages/BusinessList/types';
import { Review, DashboardStats } from '../pages/Dashboard/types';

interface ReportData {
  business: Business;
  stats: DashboardStats;
  reviews: Review[];
}

export function generatePDF(data: ReportData): Blob {
  const doc = new jsPDF();
  let yPos = 20;

  // Helper function to add text and update position
  const addText = (text: string, fontSize = 12) => {
    doc.setFontSize(fontSize);
    doc.text(text, 20, yPos);
    yPos += fontSize / 2 + 5;
  };

  // Title
  addText('Business Report', 20);
  yPos += 10;

  // Business Overview
  addText('Business Overview', 16);
  addText(`Name: ${data.business.name}`);
  addText(`Address: ${data.business.address}`);
  addText(`Contact: ${data.business.phone}`);
  addText(`Email: ${data.business.email}`);
  addText(`Hours: ${data.business.hours}`);
  yPos += 10;

  // Statistics
  addText('Statistics Overview', 16);
  addText(`Total Reviews: ${data.stats.totalReviews}`);
  addText(`Positive Reviews: ${data.stats.positiveReviews}`);
  addText(`Neutral Reviews: ${data.stats.neutralReviews}`);
  addText(`Negative Reviews: ${data.stats.negativeReviews}`);
  yPos += 10;

  // Reviews
  addText('Reviews', 16);
  data.reviews.forEach((review) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    addText(`Date: ${review.date}`);
    addText(`Rating: ${review.rating}/5`);
    addText(`Review: ${review.text}`);
    if (review.reply) {
      addText(`Reply: ${review.reply}`);
    }
    yPos += 5;
  });

  return doc.output('blob');
}