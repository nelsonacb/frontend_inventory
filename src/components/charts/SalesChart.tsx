import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface SalesChartProps {
  data: { date: string; total: number }[];
  loading?: boolean;
}

export const SalesChart = ({ data, loading = false }: SalesChartProps) => {
  if (loading) {
    return (
      <div className='flex justify-center items-center h-64'>Cargando...</div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className='flex justify-center items-center h-64 text-gray-500'>
        Sin datos de ventas
      </div>
    );
  }

  // Formatear fecha para mostrar
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, 'dd/MM', { locale: es });
  };

  return (
    <ResponsiveContainer
      width='100%'
      height={300}
    >
      <LineChart data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          dataKey='date'
          tickFormatter={formatDate}
        />
        <YAxis tickFormatter={(value) => `$${value}`} />
        <Tooltip
          labelFormatter={(label) =>
            format(new Date(label), "d 'de' MMMM, yyyy", { locale: es })
          }
          formatter={(value) => [`$${value}`, 'Ventas']}
        />
        <Legend />
        <Line
          type='monotone'
          dataKey='total'
          stroke='#8884d8'
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
