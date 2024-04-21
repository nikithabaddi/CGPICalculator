import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [marks, setMarks] = useState([]);
  const [sgpa, setSgpa] = useState(0);
  const { state } = useLocation();
  const userId = state.userId;

  const handleAddMarks = () => {
    const newMarks = parseFloat(
      prompt("Enter marks for subject (out of 100):")
    );
    if (!isNaN(newMarks)) {
      setMarks([...marks, newMarks]);
    } else {
      alert("Please enter a valid number.");
    }
  };

  const calculateSGPA = () => {
    const credits = 25;
    let totalCredits = 0;
    let sum = 0;

    marks.forEach((mark) => {
      totalCredits += credits;
      if (mark >= 90) {
        sum += 10 * credits;
      } else if (mark >= 80) {
        sum += 9 * credits;
      } else if (mark >= 70) {
        sum += 8 * credits;
      } else if (mark >= 60) {
        sum += 7 * credits;
      } else if (mark >= 50) {
        sum += 6 * credits;
      } else if (mark >= 40) {
        sum += 5 * credits;
      }
    });

    const sgpa = sum / totalCredits;
    setSgpa(sgpa.toFixed(2));

    axios
      .post("http://localhost:3001/calculate", { sgpa, userId })
      .then((result) => {
        console.log(result);
        if (result.data.status === "success") {
          alert("User result saved successfully");
        } else {
          alert("Incorrect password! Please try again.");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>SGPA Calculator</h1>
      <button onClick={handleAddMarks}>Add Marks</button>
      <button onClick={calculateSGPA}>Calculate SGPA</button>
      <h2>Marks:</h2>
      <ul>
        {marks.map((mark, index) => (
          <li key={index}>
            Subject {index + 1}: {mark}
          </li>
        ))}
      </ul>
      <h2>SGPA: {sgpa}</h2>
    </div>
  );
};

export default Home;
