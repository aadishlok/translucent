import React from 'react';
import { ChartData, renderCustomizedLabel } from '../utils/utils.tsx';
import {
  ResponsiveContainer,
  Pie,
  PieChart,
} from "recharts";

type Props = {
  chartData: ChartData[];
  selectedDepartment: string;
  dataKey: string;
  nameKey: string;
};

const TranslucentPieChart: React.FC<Props> = ({ chartData, selectedDepartment, dataKey, nameKey }) => {

    return (
        <ResponsiveContainer width="100%" maxWidth={500} height={250}>
            <PieChart style={{ width: '100%' }}>
                <Pie
                    data={chartData}
                    labelLine={false}
                    label={(props) => renderCustomizedLabel(props, selectedDepartment)}
                    fill="#8884d8"
                    dataKey={dataKey}
                    nameKey={nameKey}
                />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default TranslucentPieChart;