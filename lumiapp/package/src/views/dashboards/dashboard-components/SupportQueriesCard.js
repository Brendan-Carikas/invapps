import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import Chart from 'react-apexcharts';

const SupportQueriesCard = ({ sx }) => {
  // Sample data - replace with actual data in production
  const completedQueries = 75;
  const outstandingQueries = 25;

  const chartOptions = {
    chart: {
      type: 'donut',
      height: 200,
    },
    labels: ['Completed', 'Outstanding'],
    colors: ['#00c292', '#e0e0e0'],
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              color: '#000',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              }
            }
          }
        }
      }
    },
    legend: {
      position: 'bottom',
      offsetY: 0,
      labels: {
        colors: '#000'
      },
      formatter: function(seriesName, opts) {
        return seriesName + ": " + opts.w.globals.series[opts.seriesIndex]
      }
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
      style: {
        fontSize: '12px'
      },
      custom: function({ series, seriesIndex, w }) {
        return '<div style="background: #000000; color: #ffffff; padding: 8px;">' +
          w.config.labels[seriesIndex] + ': ' + series[seriesIndex] +
          '</div>';
      }
    }
  };

  const series = [completedQueries, outstandingQueries];

  return (
    <Card sx={sx}>
      <CardContent>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Support Queries
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
          <Chart
            options={chartOptions}
            series={series}
            type="donut"
            height="100%"
            width="100%"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SupportQueriesCard;
