import React from 'react';
import { ChartData } from '../utils/utils.tsx';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarProps,
  Rectangle
} from 'recharts';

type Props = {
  chartData: ChartData[];
  selectedDepartment: string;
  dataKey: string;
  nameKey: string;
};

const TranslucentBarChart: React.FC<Props> = ({ chartData, selectedDepartment, dataKey, nameKey }) => {

    const CustomShape = (props: BarProps) => {
        const fill = props.type == selectedDepartment ? "#d3d3f2" : "#8884d8";
        console.log("BarP: ", props);
        return <Rectangle {...props} fill={fill} />;
    };

    return (
        <ResponsiveContainer width="100%" maxWidth={500} height={250}>
            <BarChart
                data={chartData}
                margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={nameKey} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                    dataKey={dataKey}
                    shape={CustomShape}
                    radius={[10, 10, 0, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default TranslucentBarChart;
