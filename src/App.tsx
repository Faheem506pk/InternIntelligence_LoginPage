import Login from "./components/Login";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Login />
    </>
  );
}

export default App;
