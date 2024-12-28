import React from 'react';
import { AnalyticsData } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AnalyticsSectionProps {
  data: AnalyticsData[];
}

export function AnalyticsSection({ data }: AnalyticsSectionProps) {
  return (
    <section className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4">Review Trends</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="rating" stroke="#2563eb" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}