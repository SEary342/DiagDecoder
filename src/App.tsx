import { useState } from "react";
import { DiagAppBar } from "./components/DiagAppBar/DiagAppBar";
import { FaultCodeLookup } from "./components/FaultCodeLookup/FaultCodeLookup";
import { DMCalculator } from "./components/DMCalculator/DMCalculator";
import { JSX } from "@emotion/react/jsx-runtime";

const pageMap: Record<string, JSX.Element> = {
  "Fault Code Lookup": <FaultCodeLookup />,
  "DM Calculator": <DMCalculator />,
};
const pages = Object.keys(pageMap);

function App() {
  const [page, setPage] = useState(pages[0]);

  const currentPage = pageMap[page] || <div>Page not found</div>;

  return (
    <>
      <DiagAppBar selectedPage={page} pages={pages} onPageChange={setPage} />
      {currentPage}
    </>
  );
}

export default App;
