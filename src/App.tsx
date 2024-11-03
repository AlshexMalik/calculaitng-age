import { useState } from "react";
import "./App.css";

function App() {
  const [born, setBorn] = useState("");
  const [age, setAge] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const calculateAge = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  };

  const inputStyle = {
    width: '300px',
    padding: '10px',
    margin: '10px 0',
    border: '2px solid #007BFF',
    borderRadius: '5px',
    fontSize: '16px',
    outline: 'none',
    boxShadow: '0 2px 5px rgba(0, 123, 255, 0.3)',
    transition: 'border-color 0.3s',
  };

  const calculate = (e) => {
    e.preventDefault();
    const selectedDate = e.target.value;
    setBorn(selectedDate); // Store the selected date

    if (!selectedDate) {
      setErrorMessage("Please input a valid date.");
      setAge(""); // Clear age if there's an error
      return;
    }

    // Calculate age only if the date is valid
    const { years, months, days } = calculateAge(selectedDate);
    setAge(`${years} years, ${months} months, and ${days} days`);

    // Set error messages based on the calculated values
    if (years > 0 && months === 0 && days === 0) {
      setErrorMessage("Please input days and months.");
    } else {
      setErrorMessage(""); // Clear the error message if the input is valid
    }
  };

  return (
    <div>
      <input
        style={inputStyle}
        onChange={calculate}
        value={born}
        type="date"
      />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <h3>{age}</h3>
    </div>
  );
}

export default App;
