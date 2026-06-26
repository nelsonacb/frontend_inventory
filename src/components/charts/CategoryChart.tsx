import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Sector,
} from 'recharts';
import { COLORS } from '../../utils/chartColors';

interface CategoryChartProps {
  data: { category: string; value: number }[];
  loading?: boolean;
}

interface CustomSectorProps {
  cx?: number;
  cy?: number;
  innerRadius?: number;
  outerRadius?: number;
  startAngle?: number;
  endAngle?: number;
  index?: number;
  fill?: string;
  [key: string]: any;
}

const CustomSector = (props: CustomSectorProps) => {
  const { index, ...rest } = props;
  const fill = COLORS[index !== undefined ? index % COLORS.length : 0];
  return (
    <Sector
      {...rest}
      fill={fill}
    />
  );
};

export const CategoryChart = ({
  data,
  loading = false,
}: CategoryChartProps) => {
  if (loading) {
    return (
      <div className='flex justify-center items-center h-64'>Cargando...</div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className='flex justify-center items-center h-64 text-gray-500'>
        Sin datos
      </div>
    );
  }

  return (
    <ResponsiveContainer
      width='100%'
      height={300}
    >
      <PieChart>
        <Pie
          data={data}
          dataKey='value'
          nameKey='category'
          cx='50%'
          cy='50%'
          outerRadius={100}
          label
          shape={CustomSector}
        />
        <Tooltip
          formatter={(value: any) => {
            const num = Number(value);
            return isNaN(num) ? '$0.00' : `$${num.toFixed(2)}`;
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
