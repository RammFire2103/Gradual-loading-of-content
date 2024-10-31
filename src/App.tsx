import List from "./components/List";
import "./App.css";
import { store } from "./app/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <List />
    </Provider>
  );
}

export default App;
