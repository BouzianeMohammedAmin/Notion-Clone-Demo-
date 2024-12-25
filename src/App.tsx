import "./App.css";
import { AppStateProvider } from "./state/AppStateContext";
import Page from "./page/Page";
import { createPage } from "./utils/createPage";

function App() {
  const initialState = createPage();
  return (
    <AppStateProvider initialState={initialState}>
      <Page />
    </AppStateProvider>
  );
}

export default App;
