// TODO: implement chart component
import React, { useMemo, useState } from 'react';
import { CHART_TYPE, DenialsData, getTotalsByField, MAP_CHART_TYPE_TO_COMPONENT } from '../utils/utils.tsx';

const FIELD = "department";

type Props = {
  data: DenialsData[];
  selectedDepartment: string; // or string | '' if you want to be explicit
};

const DenialChart: React.FC<Props> = ({ data, selectedDepartment }) => {
    const distributionByDepartment = useMemo(() => getTotalsByField({data: data, field: FIELD}), [data]);
    const [chartType, setChartType] = useState(CHART_TYPE.BAR);
    const ChartComponent = MAP_CHART_TYPE_TO_COMPONENT[chartType];

    return (
        <>
            <h2>Denial Charts</h2>
            <div style={{ marginBottom: 16 }}>
                <button
                    onClick={() => setChartType(CHART_TYPE.BAR)}
                    disabled={chartType === CHART_TYPE.BAR}
                >
                    Bar Chart
                </button>
                <button
                    onClick={() => setChartType(CHART_TYPE.PIE)}
                    disabled={chartType === CHART_TYPE.PIE}
                    style={{ marginLeft: 8 }}
                >
                    Pie Chart
                </button>
            </div>
            <ChartComponent chartData={distributionByDepartment} selectedDepartment={selectedDepartment} dataKey="value" nameKey="type" />
        </>
    )
};

export default DenialChart;
