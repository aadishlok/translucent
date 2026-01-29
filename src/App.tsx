import { ApolloProvider, ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
import React, { useState, useMemo } from 'react';
import DenialChart from './components/DenialChart.tsx';
import TranslucentTable from './components/TranslucentTable.tsx';
import { DenialsData } from './utils/utils.tsx';
import TranslucentDropdown from './components/TranslucentDropdown.tsx';

const client = new ApolloClient({ uri: 'http://localhost:4000/', cache: new InMemoryCache() });
const DENIALS_QUERY = gql`query { denials { id department amount reason date } }`;

function Dashboard() {
  const { loading, error, data } = useQuery(DENIALS_QUERY); 
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const denials = data?.denials;
  const departments: string[] = useMemo(() => Array.from(new Set(denials?.map((d: DenialsData) => d.department))), [data, selectedDepartment]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <h1>Denial Dashboard</h1>
      <div style={{ display: "flex", flexDirection: "column", margin: "40px 40px" }}>

        <div style={{ display: 'flex'}}>
          <TranslucentDropdown data={departments} selectedDepartment={selectedDepartment} onDepartmentChange={setSelectedDepartment} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{flex: 1 }}>
            <TranslucentTable data={data} selectedDepartment={selectedDepartment} />
          </div>

          <div style={{ flex: 1 }}>
            <DenialChart data={data.denials} selectedDepartment={selectedDepartment} />
          </div>
        </div>

      </div>
    </>
  );
}

export default function App() {
  return <ApolloProvider client={client}><Dashboard /></ApolloProvider>
}
