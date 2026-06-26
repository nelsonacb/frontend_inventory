import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from 'recharts';

interface LowStockChartProps {
  data: { name: string; stock: number; threshold: number }[];
  loading?: boolean;
}

export const LowStockChart = ({
  data,
  loading = false,
}: LowStockChartProps) => {
  if (loading) {
    return (
      <div className='flex justify-center items-center h-64'>Cargando...</div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className='flex justify-center items-center h-64 text-gray-500'>
        No hay productos con bajo stock
      </div>
    );
  }

  // Ordenar por stock (menor primero) y limitar a 5
  const sorted = [...data].sort((a, b) => a.stock - b.stock).slice(0, 5);

  return (
    <ResponsiveContainer
      width='100%'
      height={300}
    >
      <BarChart
        layout='vertical'
        data={sorted}
        margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis type='number' />
        <YAxis
          type='category'
          dataKey='name'
          width={80}
        />
        <Tooltip
          formatter={(value, name) => {
            if (name === 'stock') return [`${value} unidades`, 'Stock actual'];
            if (name === 'threshold')
              return [`${value} unidades`, 'Umbral mínimo'];
            return [value, name];
          }}
        />
        <Legend />
        <Bar
          dataKey='stock'
          fill='#ff6b6b'
          name='Stock actual'
        >
          <LabelList
            dataKey='stock'
            position='right'
          />
        </Bar>
        <Bar
          dataKey='threshold'
          fill='#ffd93d'
          name='Umbral'
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
