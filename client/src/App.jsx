import { useState } from "react";
import { Navbar, CreatePost } from "./components";
import Feed from "./pages/Feed";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Navbar />
      <Feed />
      <CreatePost />
    </div>
  );
}

export default App;
