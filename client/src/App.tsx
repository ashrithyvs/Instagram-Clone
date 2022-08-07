import { useState } from "react";
import { Navbar } from "./components";
import Feed from "./pages/Feed";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Navbar />
      <Feed />
    </div>
  );
}

export default App;
