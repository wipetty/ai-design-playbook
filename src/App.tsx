import "./utils/IMS";
import { IMSProvider } from "./contexts/IMSProvider";

function App() {
  return (
    <IMSProvider>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <div>
          This will be replaced with the main app. Use the AI agent to
          generate code for the app.
        </div>
      </div>
    </IMSProvider>
  );
}

export default App;
