import { IMSProvider } from "./contexts/IMSProvider";
import { Provider } from "@react-spectrum/s2";

function App() {
  return (
    <Provider>
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
          <h2>Welcome to the Clean Slate template</h2>
          <div>
            Start by asking the agent to <code>Set up the project</code>.
          </div>
        </div>
      </IMSProvider>
    </Provider>
  );
}

export default App;
