import React, { useMemo } from 'react';
import { DenialsData } from '../utils/utils';

type Props = {
  data: { denials: DenialsData[] };
  selectedDepartment: string;
};

const TranslucentTable: React.FC<Props> = ({ data, selectedDepartment }) => {

    const denials = data?.denials;
    const filteredDenials: DenialsData[] = useMemo(() => selectedDepartment ? denials?.filter((d: DenialsData) => d.department == selectedDepartment) : denials, [data, selectedDepartment]);

    return (
        <>
            <table>
                <thead><tr><th>ID</th><th>Dept</th><th>Amount</th><th>Reason</th><th>Date</th></tr></thead>
                <tbody>
                {filteredDenials?.map((d:any)=>(
                    <tr key={d.id}>
                        <td>{d.id}</td><td>{d.department}</td><td>{d.amount}</td><td>{d.reason}</td><td>{d.date}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
};

export default TranslucentTable