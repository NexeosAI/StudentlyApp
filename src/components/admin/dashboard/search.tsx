import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts'

const data = [
  {
    searches: 400,
  },
  {
    searches: 300,
  },
  {
    searches: 500,
  },
  {
    searches: 700,
  },
  {
    searches: 400,
  },
  {
    searches: 550,
  },
  {
    searches: 800,
  },
  {
    searches: 900,
  },
  {
    searches: 750,
  },
  {
    searches: 600,
  },
  {
    searches: 850,
  },
  {
    searches: 1000,
  },
]

export function Search() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Searches
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {payload[0].value}
                      </span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Line
          type="monotone"
          strokeWidth={2}
          dataKey="searches"
          className="stroke-primary"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
