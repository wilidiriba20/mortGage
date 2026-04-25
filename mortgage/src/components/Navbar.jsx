import { useState } from "react";
import logo from "../assets/logo.ico";

export default function Navbar() {
  const [showGuide, setShowGuide] = useState(false);

  return (
    <nav className="navbar">
      <div className="left">
        <img src={logo} alt="mortgage calculator" className="logo" />
        <h3 className="title">Mortgage Calculator</h3>
      </div>

      <div className="right">
        <button onClick={() => setShowGuide(true)} className="guide-btn">
          Guide
        </button>
      </div>

      {showGuide && (
        <div className="guide-box">
          <button className="close-btn" onClick={() => setShowGuide(false)}>
            ×
          </button>

          <h3>How to Use the Mortgage Calculator</h3>
          <p>1. Enter the purchase price of the property</p>
          <p>2. Enter your down payment</p>
          <p>3. Choose the repayment period (in years)</p>
          <p>4. Adjust the interest rate using the slider or input box</p>
          <p>5. Click Calculate to see your results</p>
          <p>
            💡 Tip: You can either type exact values or use sliders for quick
            adjustments.
          </p>
        </div>
      )}
    </nav>
  );
}
