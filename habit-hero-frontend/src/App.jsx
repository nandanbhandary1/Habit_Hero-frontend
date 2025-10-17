import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [habitName, setHabitName] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [category, setCategory] = useState("health");
  const [startDate, setStartDate] = useState("");
  const [habits, setHabits] = useState([]);

  const API_URL = "http://127.0.0.1:8000/api/habits/";

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const response = await axios.get(API_URL);
      setHabits(response.data);
    } catch (error) {
      console.error("Error fetching habits:", error);
    }
  };

  const handleAddHabit = async () => {
    if (!habitName || !startDate) {
      alert("Please enter a habit name and start date!");
      return;
    }

    const newHabit = {
      name: habitName,
      frequency: frequency,
      category: category,
      start_date: startDate,
      is_completed: false, // default
    };

    try {
      await axios.post(API_URL, newHabit);
      setHabitName("");
      setFrequency("daily");
      setCategory("health");
      setStartDate("");
      fetchHabits();
    } catch (error) {
      console.error("Error adding habit:", error.response || error);
      alert("Failed to add habit. Check console for details.");
    }
  };

  const handleDeleteHabit = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      fetchHabits();
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };

  const handleToggleComplete = async (habit) => {
    try {
      await axios.patch(`${API_URL}${habit.id}/`, {
        is_completed: !habit.is_completed,
      });
      fetchHabits();
    } catch (error) {
      console.error("Error updating habit:", error);
    }
  };

  const categoryColors = {
    health: "#2ecc71",
    work: "#f1c40f",
    learning: "#9b59b6",
    other: "#3498db",
  };

  return (
    <div className="app">
      <h1>Habit Hero</h1>

      <div className="habit-form">
        <input
          type="text"
          placeholder="Habit Name"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
        />
        <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="health">Health</option>
          <option value="work">Work</option>
          <option value="learning">Learning</option>
          <option value="other">Other</option>
        </select>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <button onClick={handleAddHabit}>Add Habit</button>
      </div>

      <div className="habits-list">
        {habits.length === 0 ? (
          <p className="no-habits">No habits added yet.</p>
        ) : (
          habits.map((habit) => (
            <div
              key={habit.id}
              className={`habit-item ${habit.is_completed ? "completed" : ""}`}
            >
              <div className="habit-header">
                <h3>{habit.name}</h3>
                <span
                  className="category-badge"
                  style={{
                    backgroundColor: categoryColors[habit.category] || "#3498db",
                  }}
                >
                  {habit.category}
                </span>
              </div>
              <p><strong>Frequency:</strong> {habit.frequency}</p>
              <p><strong>Start Date:</strong> {habit.start_date}</p>
              <div className="habit-buttons">
                <button
                  className={habit.is_completed ? "done-btn" : "complete-btn"}
                  onClick={() => handleToggleComplete(habit)}
                >
                  {habit.is_completed ? "Completed ✅" : "Mark Completed"}
                </button>
                <button className="delete-btn" onClick={() => handleDeleteHabit(habit.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App; 
