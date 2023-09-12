import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProgressBar from "./ProgressBar";

function App() {
    const [currentStep, setCurrentStep] = useState(1);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProgressBar currentStep={currentStep} />} />
      </Routes>
    </Router>
  );
}

export default App;
