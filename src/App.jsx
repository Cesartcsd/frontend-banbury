import SolvePage from "./pages/SolvePage";
import g2Logo from "./assets/g2-logo.svg";

export default function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <img src={g2Logo} alt="G2 IA BAMBURY logo" />
          <span className="brand-title">G2 IA BAMBURY</span>
        </div>
      </header>

      <SolvePage />
    </div>
  );
}
