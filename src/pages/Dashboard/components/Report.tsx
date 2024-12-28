import React, { useState } from 'react';
import { FileDown, FileType, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { exportReport } from '../../../utils/export';
import { useDashboardData } from '../hooks/useDashboardData';
import { mockBusinessData } from '../data/mockData';

export function ReportSection() {
  const { data } = useDashboardData();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async (format: 'csv' | 'pdf') => {
    if (!data?.reviews || !data?.stats) return;

    setIsGenerating(true);
    try {
      const reportData = {
        business: mockBusinessData,
        stats: data.stats,
        reviews: data.reviews
      };
      
      await exportReport(reportData, format);
      toast.success(`Report exported as ${format.toUpperCase()}`);
    } catch (error) {
      toast.error(`Failed to export report: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4">Download Report</h2>
      <p className="text-gray-600 mb-6">
        Generate a comprehensive report including business overview, statistics, and review history.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => handleDownload('csv')}
          disabled={isGenerating}
          className="flex-1 flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isGenerating ? (
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
          ) : (
            <FileDown className="h-5 w-5 mr-2" />
          )}
          Download CSV
        </button>
        <button
          onClick={() => handleDownload('pdf')}
          disabled={isGenerating}
          className="flex-1 flex items-center justify-center px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
        >
          {isGenerating ? (
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
          ) : (
            <FileType className="h-5 w-5 mr-2" />
          )}
          Download PDF
        </button>
      </div>
    </section>
  );
}