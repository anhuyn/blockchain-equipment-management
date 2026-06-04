import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Card } from 'react-bootstrap';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function StatisticsChart({ statistics }) {
  const data = {
    labels: ['Sẵn sàng', 'Đang mượn', 'Hỏng'],
    datasets: [
      {
        data: [statistics.available, statistics.borrowed, statistics.damaged],
        backgroundColor: [
          'rgba(40, 167, 69, 0.8)',
          'rgba(255, 193, 7, 0.8)',
          'rgba(220, 53, 69, 0.8)',
        ],
        borderColor: [
          'rgba(40, 167, 69, 1)',
          'rgba(255, 193, 7, 1)',
          'rgba(220, 53, 69, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-white border-0 pt-3">
        <h5 className="fw-bold mb-0">
          <i className="bi bi-pie-chart me-2"></i>
          Thống kê thiết bị
        </h5>
      </Card.Header>
      <Card.Body>
        <div style={{ height: '300px' }}>
          <Doughnut data={data} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
}

export default StatisticsChart;
