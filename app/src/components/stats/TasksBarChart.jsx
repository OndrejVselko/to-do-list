// src/components/TasksBarChart.jsx
import React, { useState, useMemo } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { FormControl, InputLabel, Select, MenuItem, Box, Paper, Typography } from '@mui/material';

// Czech month names
const MONTH_NAMES = [
    'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
    'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec',
];

// Custom tooltip component with default text colors
const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;
    return (
        <Paper elevation={3} sx={{ p: 1 }}>
            <Typography variant="subtitle2">
                {label}
            </Typography>
            {payload.map((entry) => (
                <Typography key={entry.dataKey} variant="body2">
                    {entry.name}: {entry.value}
                </Typography>
            ))}
        </Paper>
    );
};

export default function TasksBarChart({ data }) {
    const years = useMemo(
        () => Array.from(new Set(data.map(item => new Date(item.date).getFullYear()))).sort((a, b) => b - a),
        [data]
    );
    const [selectedYear, setSelectedYear] = useState(years[0] || new Date().getFullYear());

    const chartData = useMemo(() => {
        const result = MONTH_NAMES.map(month => ({ month, completed: 0, pending: 0 }));
        data.forEach(item => {
            const date = new Date(item.date);
            if (date.getFullYear() === selectedYear) {
                const idx = date.getMonth();
                if (item.state === 1) result[idx].completed += 1;
                else result[idx].pending += 1;
            }
        });
        return result;
    }, [data, selectedYear]);

    return (
        <Box mb={4}>
            <FormControl sx={{ minWidth: 120, mb: 2 }}>
                <InputLabel id="year-select-label">Rok</InputLabel>
                <Select
                    labelId="year-select-label"
                    value={selectedYear}
                    label="Rok"
                    onChange={e => setSelectedYear(e.target.value)}
                >
                    {years.map(year => (
                        <MenuItem key={year} value={year}>{year}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis
                        dataKey="month"
                        stroke="var(--text_color)"
                        tick={{ fill: 'var(--text_color)', fontSize: 12 }}
                        tickLine={{ stroke: 'var(--text_color)' }}
                        axisLine={{ stroke: 'var(--text_color)' }}
                    />
                    <YAxis
                        allowDecimals={false}
                        stroke="var(--text_color)"
                        tick={{ fill: 'var(--text_color)', fontSize: 12 }}
                        tickLine={{ stroke: 'var(--text_color)' }}
                        axisLine={{ stroke: 'var(--text_color)' }}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#999999' }} />
                    <Legend
                        wrapperStyle={{ color: 'var(--text_color)' }}
                        iconType="square"
                    />
                    <Bar
                        dataKey="pending"
                        name="Neprovedené"
                        fillOpacity={0}
                        stroke="#ff3939"
                        strokeWidth={2}
                        barSize={40}
                        fill="#ff3939"
                    />
                    <Bar
                        dataKey="completed"
                        name="Provedené"
                        fillOpacity={0}
                        stroke="#7af67a"
                        strokeWidth={2}
                        barSize={40}
                        fill="#7af67a"
                    />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
}
