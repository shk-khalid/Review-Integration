import { saveAs } from 'file-saver';
import { generateReportCSV } from './reportGenerator';
import { generatePDF } from './pdf';
import { Business } from '../pages/BusinessList/types';
import { Review, DashboardStats } from '../pages/Dashboard/types';

interface ReportData {
  business: Business;
  stats: DashboardStats;
  reviews: Review[];
}

export async function exportReport(data: ReportData, format: 'csv' | 'pdf') {
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `review-report-${timestamp}`;

  try {
    if (format === 'csv') {
      const csvContent = generateReportCSV(data);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, `${filename}.csv`);
    } else {
      const pdfBlob = generatePDF(data);
      saveAs(pdfBlob, `${filename}.pdf`);
    }
  } catch (error) {
    console.error('Export failed:', error);
    throw new Error(`Failed to export report as ${format.toUpperCase()}`);
  }
}