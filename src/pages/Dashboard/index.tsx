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

const data = [
  { name: 'Ene', ventas: 4000 },
  { name: 'Feb', ventas: 3000 },
  { name: 'Mar', ventas: 5000 },
];

export const Dashboard = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold'>Dashboard</h1>
      <p>Contenido del dashboard aquí.</p> <br />
      <ResponsiveContainer
        width='100%'
        height={300}
      >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type='monotone'
            dataKey='ventas'
            stroke='#8884d8'
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
