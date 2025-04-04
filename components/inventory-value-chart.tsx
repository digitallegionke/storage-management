"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

// Sample data for the inventory value chart
const data = [
  { month: "Jan", value: 18000 },
  { month: "Feb", value: 19500 },
  { month: "Mar", value: 21000 },
  { month: "Apr", value: 20000 },
  { month: "May", value: 22000 },
  { month: "Jun", value: 23500 },
  { month: "Jul", value: 24500 },
]

export function InventoryValueChart() {
  return (
    <div className="h-full w-full">
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
          <XAxis dataKey="month" className="text-xs text-muted-foreground" />
          <YAxis className="text-xs text-muted-foreground" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
              color: "hsl(var(--foreground))",
            }}
            formatter={(value) => [`$${value}`, "Inventory Value"]}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            name="Inventory Value"
            stroke="hsl(var(--primary))"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

