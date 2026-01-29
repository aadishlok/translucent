# Take‑Home (2‑3 hrs) – Software Engineer Frontend

**Objective:** Add one interactive chart and a department filter to an existing React dashboard.

## Provided

* A working React + TypeScript project that already fetches denial data and renders a table.
* Mock GraphQL server (`npm run server`) and sample data.
* A failing unit test (`Dashboard.test.tsx`) marked with `TODO` comments.

## Your Tasks

1. Implement `DenialChart` component using Recharts (bar or pie is fine).
2. Add department filter dropdown that hooks into existing query.
3. Make the failing test pass (expecting chart title and filter interaction).
4. Write **`DECISIONS.md`** (≤1 page) describing performance and a11y considerations.

## Implementation

1. **Overview**  
   This project is a small React + TypeScript dashboard that visualizes healthcare claim denials. It uses an Apollo GraphQL server backed by a static JSON file and renders both a table and interactive charts for exploring denials by department.

2. **Architecture & Components**  
   - **GraphQL server (`server.js`)**:  
     - Uses `apollo-server` and `graphql`.  
     - Reads `data/denials.json` at startup and exposes a single query:  
       `denials: [Denial!]!` with fields `id`, `department`, `amount`, `reason`, `date`, `payer`.
   - **Client entry (`src/index.tsx`)**:  
     - Standard CRA-style entry that renders `<App />` into `public/index.html`’s `root` div.
   - **App & Dashboard (`src/App.tsx`)**:  
     - Configures `ApolloClient` with `InMemoryCache` and `uri: http://localhost:4000/`.  
     - Defines `DENIALS_QUERY` to fetch all denials.  
     - `Dashboard` uses `useQuery` to load data, then renders:  
       - Page title: **Denial Dashboard**.  
       - A layout row with `TranslucentTable` (table + filter) and `DenialChart` (charts), both driven by the same GraphQL data and a shared `selectedDepartment` state.
   - **Utilities (`src/utils/utils.tsx`)**:  
     - Defines shared types like `DenialsData` and `ChartData`.  
     - `getTotalsByField` aggregates raw denials by a key (e.g., `department`) to produce `{ type, value }` data for charts.  
     - `renderCustomizedLabel` implements Recharts-style custom labels for pie slices.
   - **Table (`src/components/TranslucentTable.tsx`)**:  
     - Props: `data` (with `denials` array), `selectedDepartment`, `onDepartmentChange`.  
     - Renders a native `<select>` with “All Departments” + unique departments derived from data.  
     - Uses `useMemo` to build `departments` and `filteredDenials`.  
     - Renders a semantic `<table>` with ID, department, amount, reason, and date columns.
   - **Charts (`src/components/DenialChart.tsx`, `TranslucentBarChart.tsx`, `TranslucentPieChart.tsx`)**:  
     - `DenialChart` accepts the raw denials and `selectedDepartment`, computes an aggregated dataset (counts per department), and lets the user toggle between bar and pie.  
     - `TranslucentBarChart` renders a Recharts `BarChart` over the aggregated data, with per-bar styling that can highlight the selected department.  
     - `TranslucentPieChart` renders a Recharts `PieChart` with custom labels and per-slice styling to emphasize the selected department.

3. **Packages & Tooling**  
   - **Runtime**:  
     - `react`, `react-dom`, `react-scripts` – standard CRA-style React stack.  
     - `@apollo/client`, `graphql`, `apollo-server` – GraphQL client and mock server.  
     - `recharts` – charting library used for the bar and pie charts.
   - **Dev & Testing**:  
     - `typescript` – static typing for components and utilities.  
     - `@testing-library/react`, `@testing-library/jest-dom`, `jest` – component tests, including chart title and filter interaction.  
     - A simple `ResizeObserver` mock in tests to allow Recharts to render under jsdom.

4. **What the Project Does**  
   - Starts a mock GraphQL API (`npm run server`) that serves denial records from `data/denials.json`.  
   - Starts a React client (`npm start`) that:  
     - Fetches all denials once via Apollo Client.  
     - Displays an interactive **department filter dropdown** that filters the table in memory.  
     - Renders an interactive **DenialChart** showing the distribution of denials by department (bar and pie), using Recharts and client-side aggregation.  
   - Includes tests that verify the chart title and department filter behavior, and a `DECISIONS.md` summarizing performance and accessibility choices and trade-offs.

5. **Source**
    - Used Gemini and Cursor to flesh out documentation and the last test file.
    - Used Recharts documentation to implement charts 