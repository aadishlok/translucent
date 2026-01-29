# DECISIONS.md — Performance & Accessibility

1. Added public/index.html and src/index.tsx so react-scripts has the expected HTML template and entry point.
2. Resolved startup issues by aligning dependencies (installing ajv package)
3. Imported @testing-library/jest-dom in tests so matchers like toBeInTheDocument are available, and mocked ResizeObserver globally for Jest’s jsdom environment.
4. Introduced Separation of Concerns: DenialChart for charts, TranslucentTable for tabular data and filtering, and small chart primitives (TranslucentBarChart, TranslucentPieChart) plus utilities in utils.tsx.
5. Implemented DenialChart using Recharts with both bar and pie views, aggregating the raw denials data by department via getTotalsByField. Aggregation is done client‑side in a memoized helper, avoiding schema changes while keeping the chart logic contained and testable.
6. Modeled department selection as React state and, where appropriate, lifted it to a shared parent (Dashboard) so both table and charts can react to the same selectedDepartment.
7. Reused the Recharts “custom label” pattern for the pie chart and used library‑supported customization points without upgrading to a newer Recharts major version.
8. Used a native <select> and <button> for the department filter and a semantic <table> with <thead> / <tbody> for the data, ensuring keyboard and screen‑reader compatibility by default. 9. For charts, exposed a clear heading (“Denial Charts”), a future iteration could add aria-label / role="img" and a text summary of key metrics.
10. Used useMemo for derived values like department lists, filtered rows, and chart aggregates so recomputation is tied to relevant dependencies.

## Trade - Offs

1. Chose to filter denials in React instead of adding query arguments or new resolvers. This kept the backend simple and avoided schema changes, but means we always fetch the full dataset and can’t offload work to the server for very large data.
2. Using one denials query for both table and charts simplified data flow and cache usage, but limited flexibility; for example, we don’t fetch pre-aggregated stats from the server and rely entirely on client-side aggregation.
3. Aggregating by department in getTotalsByField avoids touching the API and is easy to test, but pushes all aggregation cost to the client and duplicates logic that might otherwise live in a backend analytics layer.
4. Rendering all filtered rows in a plain <table> keeps the code straightforward and a11y-friendly, but for large datasets it would become a performance bottleneck compared to using a virtualized list/grid.
5. Lifting selectedDepartment to a parent component enables coordinated behavior between table and charts, at the cost of slightly tighter coupling and more complex prop wiring than a purely self-contained table. Could use backend-for-frontend solutions like redux to maintain local and global states.
6. Having charts highlight the selected department instead of hiding other departments preserves overall context, but may not match user expectations if they expect “filter” to mean “show only this department everywhere.”
7. Splitting functionality across DenialChart, TranslucentTable, and chart primitives improved testability and reuse, but added some overhead in prop types and wiring, especially as shared state (like the filter) grew.
8. The util function is focussed on calculating the count of records per type of provided field for simplicity. It can be fleshed out to different forms of computation (like amount aggregation) for different visualizations.
9. For a production-grade readyness, pagination should be added to the data retreival. It would incurr additional queries to get component data which is kept out of scope due to the nature and timeline of this assignment.