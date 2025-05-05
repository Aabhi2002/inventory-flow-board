
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProducts } from "@/context/ProductContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = [
  "#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", 
  "#a4de6c", "#d0ed57", "#ffc658", "#ff8042"
];

export default function CategoryChart() {
  const { categoryData } = useProducts();

  // Sort categories by count for better visualization
  const sortedData = [...categoryData].sort((a, b) => b.count - a.count);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Products by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedData}
              margin={{ top: 5, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={70}
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value} products`, 'Count']}
                labelFormatter={(name) => `Category: ${name}`}
              />
              <Bar 
                dataKey="count" 
                name="Products" 
                fill="#8884d8"
                radius={[4, 4, 0, 0]}
                maxBarSize={60}
                animationDuration={1000}
              >
                {sortedData.map((entry, index) => (
                  <Bar 
                    key={entry.name} 
                    dataKey="count" 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
