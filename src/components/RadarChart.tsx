
import { useMemo } from 'react';

interface RadarChartProps {
  data: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    abilityToLearn: number;
    realWorld: number;
  };
}

const RadarChart = ({ data }: RadarChartProps) => {
  const dimensions = [
    { key: 'will', label: 'Will', angle: 0 },
    { key: 'interest', label: 'Interest', angle: 60 },
    { key: 'skill', label: 'Skill', angle: 120 },
    { key: 'cognitive', label: 'Cognitive', angle: 180 },
    { key: 'abilityToLearn', label: 'Learning', angle: 240 },
    { key: 'realWorld', label: 'Real World', angle: 300 }
  ];

  const size = 300;
  const center = size / 2;
  const maxRadius = center - 60;

  const polarToCartesian = (angle: number, radius: number) => {
    const angleInRadians = (angle - 90) * (Math.PI / 180);
    return {
      x: center + radius * Math.cos(angleInRadians),
      y: center + radius * Math.sin(angleInRadians)
    };
  };

  const pathData = useMemo(() => {
    const points = dimensions.map(dim => {
      const value = data[dim.key as keyof typeof data];
      const radius = (value / 100) * maxRadius;
      return polarToCartesian(dim.angle, radius);
    });

    return `M ${points[0].x} ${points[0].y} ` +
           points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ') +
           ' Z';
  }, [data, dimensions, maxRadius]);

  return (
    <div className="radar-chart">
      <svg width={size} height={size} className="w-full h-full">
        {/* Background circles */}
        {[20, 40, 60, 80, 100].map(percent => (
          <circle
            key={percent}
            cx={center}
            cy={center}
            r={(percent / 100) * maxRadius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="1"
            opacity={0.3}
          />
        ))}

        {/* Axis lines */}
        {dimensions.map(dim => {
          const point = polarToCartesian(dim.angle, maxRadius);
          return (
            <line
              key={dim.key}
              x1={center}
              y1={center}
              x2={point.x}
              y2={point.y}
              stroke="hsl(var(--border))"
              strokeWidth="1"
              opacity={0.3}
            />
          );
        })}

        {/* Data area */}
        <path
          d={pathData}
          fill="hsl(var(--primary) / 0.2)"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />

        {/* Data points */}
        {dimensions.map(dim => {
          const value = data[dim.key as keyof typeof data];
          const radius = (value / 100) * maxRadius;
          const point = polarToCartesian(dim.angle, radius);
          return (
            <circle
              key={dim.key}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="hsl(var(--primary))"
              stroke="white"
              strokeWidth="2"
            />
          );
        })}

        {/* Labels */}
        {dimensions.map(dim => {
          const labelPoint = polarToCartesian(dim.angle, maxRadius + 25);
          const value = data[dim.key as keyof typeof data];
          return (
            <g key={dim.key}>
              <text
                x={labelPoint.x}
                y={labelPoint.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-current text-hero text-sm font-medium"
              >
                {dim.label}
              </text>
              <text
                x={labelPoint.x}
                y={labelPoint.y + 15}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-current text-body text-xs"
              >
                {value}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default RadarChart;
