import PageRouter from "./components/PageRouter.tsx";
import ContextProvider from "./Context.tsx";

function App() {
    return (
        <ContextProvider>
            <PageRouter />
        </ContextProvider>
    );
}

export default App;
