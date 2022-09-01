import { useState } from "react";
import { Navbar, CreatePost } from "./components";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
function App() {
  const [count, setCount] = useState(0);
  const user = true;
  return (
    <div className="App">
      {user ? (
        <>
          <Navbar />
          <Feed />
          <CreatePost />
        </>
      ) : (
        <Login />
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
