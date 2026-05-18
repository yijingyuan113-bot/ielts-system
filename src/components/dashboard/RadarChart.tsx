'use client'

interface RadarChartProps {
  scores: { label: string; value: number }[]
}

export function RadarChart({ scores }: RadarChartProps) {
  const maxScore = 9
  const center = 100
  const radius = 80
  
  const getPoint = (value: number, index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2
    const r = (value / maxScore) * radius
    return { 
      x: center + r * Math.cos(angle), 
      y: center + r * Math.sin(angle) 
    }
  }

  const points = scores.map((s, i) => getPoint(s.value, i, scores.length))
  const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(' ')

  return (
    <svg width="250" height="250" viewBox="0 0 200 200">
      {/* Background circles */}
      {[0.33, 0.66, 1].map((scale, i) => (
        <polygon
          key={i}
          points={scores.map((_, idx) => {
            const p = getPoint(maxScore * scale, idx, scores.length)
            return `${p.x},${p.y}`
          }).join(' ')}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="1"
        />
      ))}
      
      {/* Axis lines */}
      {scores.map((_, i) => {
        const p = getPoint(maxScore, i, scores.length)
        return <line key={i} x1={center} y1={center} x2={p.x} y2={p.y} stroke="#e5e7eb" />
      })}
      
      {/* Data polygon */}
      <polygon 
        points={polygonPoints} 
        fill="#6366f1" 
        fillOpacity="0.3" 
        stroke="#6366f1" 
        strokeWidth="2" 
      />
      
      {/* Labels */}
      {scores.map((s, i) => {
        const p = getPoint(maxScore + 18, i, scores.length)
        return (
          <text 
            key={i} 
            x={p.x} 
            y={p.y} 
            textAnchor="middle" 
            fontSize="13" 
            fill="#374151"
            fontWeight="500"
          >
            {s.label}
          </text>
        )
      })}
      
      {/* Data points */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="5" fill="#6366f1" />
      ))}
    </svg>
  )
}