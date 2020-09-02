import React from "react";
import { ReactQueryDevtools } from "react-query-devtools";
import "./App.css";
import Infinite from "./components/Infinite";
import NormalQuery from "./components/NormalQuery";
import Paginated from "./components/Paginated";

const defaultComp = <NormalQuery />;
const componentList = ["Default", "Infinite", "Paginated"];

const None = () => {
  return <p>None</p>;
};

function App() {
  const [comp, setComp] = React.useState(defaultComp);

  function chooseComponent(target) {
    switch (target) {
      case "Default":
        setComp(<NormalQuery />);
        break;
      case "Infinite":
        setComp(<Infinite />);
        break;
      case "Paginated":
        setComp(<Paginated />);
        break;
      default:
        setComp(<None />);
        break;
    }
  }

  return (
    <>
      <div className="App">
        <h3>React-Query Learning</h3>
        {componentList.map((component) => {
          return (
            <button onClick={() => chooseComponent(component)} key={component}>
              {component}
            </button>
          );
        })}
        {comp}
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
