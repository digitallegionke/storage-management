"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

// Sample data for the temperature chart
const data = [
  { time: "00:00", "Cold Room A": -18, "Cold Room B": -5, "Cold Room C": -22 },
  { time: "04:00", "Cold Room A": -19, "Cold Room B": -6, "Cold Room C": -21 },
  { time: "08:00", "Cold Room A": -17, "Cold Room B": -4, "Cold Room C": -23 },
  { time: "12:00", "Cold Room A": -18, "Cold Room B": -5, "Cold Room C": -22 },
  { time: "16:00", "Cold Room A": -19, "Cold Room B": -7, "Cold Room C": -21 },
  { time: "20:00", "Cold Room A": -18, "Cold Room B": -5, "Cold Room C": -22 },
  { time: "24:00", "Cold Room A": -17, "Cold Room B": -4, "Cold Room C": -23 },
]

export function TemperatureChart() {
  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="time" className="text-xs text-muted-foreground" />
          <YAxis className="text-xs text-muted-foreground" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
              color: "hsl(var(--foreground))",
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="Cold Room A" stroke="#3b82f6" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Cold Room B" stroke="#ef4444" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Cold Room C" stroke="#10b981" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

