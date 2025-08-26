// Shared Chart.js configuration for Maersk theme
const ChartConfig = {
    // Common chart options
    commonOptions: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 1000 },
        scales: {
            x: {
                title: {
                    font: { size: 14, weight: '600' },
                    color: 'rgb(212, 212, 212)'
                },
                grid: {
                    color: 'rgba(138, 138, 138, 0.3)',
                    lineWidth: 1
                },
                ticks: {
                    color: 'rgb(138, 138, 138)',
                    font: { size: 12 }
                },
                border: { color: 'rgb(76, 76, 76)' }
            },
            y: {
                title: {
                    font: { size: 14, weight: '600' },
                    color: 'rgb(212, 212, 212)'
                },
                beginAtZero: true,
                max: 35000,
                grid: {
                    color: 'rgba(138, 138, 138, 0.3)',
                    lineWidth: 1
                },
                ticks: {
                    stepSize: 5000,
                    color: 'rgb(138, 138, 138)',
                    font: { size: 12 },
                    callback: function(value) {
                        return (value / 1000).toFixed(0) + 'k';
                    }
                },
                border: { color: 'rgb(76, 76, 76)' }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    color: 'rgb(212, 212, 212)',
                    font: { size: 12, weight: '500' },
                    padding: 15,
                    usePointStyle: true,
                    pointStyle: 'line'
                }
            },
            tooltip: {
                backgroundColor: 'rgba(33, 33, 33, 0.95)',
                titleColor: 'rgb(240, 240, 240)',
                bodyColor: 'rgb(212, 212, 212)',
                borderColor: 'rgb(76, 76, 76)',
                borderWidth: 1,
                cornerRadius: 8,
                padding: 12
            }
        },
        interaction: {
            intersect: false,
            mode: 'index'
        }
    },

    // Dataset factory functions
    createDataset: {
        line: (label, data, color, options = {}) => ({
            label,
            data,
            borderColor: color,
            backgroundColor: options.fill ? color.replace('rgb', 'rgba').replace(')', ', 0.1)') : 'transparent',
            borderWidth: options.borderWidth || 2,
            pointRadius: options.pointRadius || 0,
            pointBackgroundColor: options.pointBackgroundColor || color,
            pointBorderColor: options.pointBorderColor || 'rgb(33, 33, 33)',
            pointBorderWidth: options.pointBorderWidth || 0,
            fill: options.fill || false,
            tension: options.tension || 0.3,
            borderDash: options.borderDash || [],
            spanGaps: options.spanGaps !== undefined ? options.spanGaps : true
        }),

        confidenceBand: (label, data, color, fillTo = null) => ({
            label,
            data,
            borderColor: color.replace('rgb', 'rgba').replace(')', ', 0.3)'),
            backgroundColor: color.replace('rgb', 'rgba').replace(')', ', 0.05)'),
            borderWidth: 1,
            pointRadius: 0,
            fill: fillTo || false,
            tension: 0.3,
            borderDash: [2, 8],
            spanGaps: false
        })
    },

    // Common colors
    colors: {
        maerskBlue: 'rgb(0, 143, 211)',
        maerskLightBlue: 'rgb(66, 176, 213)',
        maerskSuccess: 'rgb(0, 170, 136)',
        maerskWarning: 'rgb(255, 165, 0)',
        maerskError: 'rgb(229, 62, 62)',
        white: 'rgb(255, 255, 255)',
        orange: 'rgb(255, 180, 50)'
    }
};
