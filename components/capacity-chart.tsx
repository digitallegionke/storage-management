"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

// Sample data for the capacity chart
const data = [
  { name: "Section 1", capacity: 45 },
  { name: "Section 2", capacity: 30 },
  { name: "Section 3", capacity: 88 },
  { name: "Bulk Area", capacity: 65 },
  { name: "Container", capacity: 50 },
]

export function CapacityChart() {
  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="name" className="text-xs text-muted-foreground" />
          <YAxis className="text-xs text-muted-foreground" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
              color: "hsl(var(--foreground))",
            }}
            formatter={(value) => [`${value}%`, "Capacity"]}
          />
          <Legend />
          <Bar dataKey="capacity" name="Capacity (%)" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

