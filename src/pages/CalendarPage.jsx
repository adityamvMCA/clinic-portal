import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/calendarOverrides.css";
import AppointmentForm from "../components/AppointmentForm";

import patientList from "../data/patients.json";
import doctorList from "../data/doctors.json";

const CalendarPage = () => {
  const [appointments, setAppointments] = useState({});
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [patients] = useState(patientList);
  const [doctors] = useState(doctorList);
  const [filterDoctor, setFilterDoctor] = useState("");
  const [filterPatient, setFilterPatient] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("appointments")) || {};
    setAppointments(saved);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleDayClick = (value) => {
    if (!isMobile && value.getMonth() !== new Date().getMonth()) return;
    setSelectedDay(value);
    setEditing(null);
    setShowForm(true);
  };

  const handleFormSubmit = (patient, doctor, time) => {
    const key = selectedDay.toDateString();
    const newEntry = { patient, doctor, time };

    const updated = editing
      ? {
          ...appointments,
          [key]: appointments[key].map((a, i) =>
            i === editing.index ? newEntry : a
          ),
        }
      : {
          ...appointments,
          [key]: [...(appointments[key] || []), newEntry],
        };

    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = (dateKey, index) => {
    const updated = { ...appointments };
    updated[dateKey].splice(index, 1);
    if (updated[dateKey].length === 0) delete updated[dateKey];
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  const renderAppointmentsForDay = (date) => {
    const key = date.toDateString();
    const list = appointments[key] || [];
    const filtered = list.filter(
      (a) =>
        (!filterDoctor || a.doctor === filterDoctor) &&
        (!filterPatient || a.patient === filterPatient)
    );

    return filtered.length > 0 ? (
      <ul className="mt-1 space-y-1 custom-scrollbar">
        {filtered.map((appt, i) => (
          <li
            key={i}
            className="text-xs bg-blue-100 dark:bg-blue-700 text-blue-900 dark:text-white px-2 py-0.5 rounded flex justify-between items-center"
          >
            <span>🕒 {appt.time} – {appt.patient}</span>
            <div className="flex gap-1 ml-2">
              <button
                className="text-blue-500"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDay(date);
                  setEditing({ ...appt, index: i });
                  setShowForm(true);
                }}
              >
                ✏
              </button>
              <button
                className="text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(key, i);
                }}
              >
                🗑
              </button>
            </div>
          </li>
        ))}
      </ul>
    ) : null;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400">
            📅 Clinic Appointment Calendar
          </h2>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
          >
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <div className="flex gap-4 mb-4 flex-wrap">
          <select
            value={filterDoctor}
            onChange={(e) => setFilterDoctor(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">All Doctors</option>
            {doctors.map((doc, i) => (
              <option key={i}>{doc}</option>
            ))}
          </select>

          <select
            value={filterPatient}
            onChange={(e) => setFilterPatient(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">All Patients</option>
            {patients.map((pat, i) => (
              <option key={i}>{pat}</option>
            ))}
          </select>
        </div>

        {isMobile ? (
          <>
            <input
              type="date"
              value={selectedDay.toISOString().split("T")[0]}
              onChange={(e) => setSelectedDay(new Date(e.target.value))}
              className="mb-4 p-2 border rounded w-full dark:bg-gray-800"
            />
            <div className="bg-white dark:bg-gray-800 shadow rounded p-4">
              <h3 className="font-semibold mb-2 text-lg">
                {selectedDay.toDateString()}
              </h3>
              {renderAppointmentsForDay(selectedDay)}
              <button
                className="mt-3 px-4 py-1 bg-blue-600 text-white rounded"
                onClick={() => {
                  setEditing(null);
                  setShowForm(true);
                }}
              >
                ➕ Add Appointment
              </button>
            </div>
          </>
        ) : (
          <div className="bg-white dark:bg-gray-800 shadow rounded p-4 overflow-x-auto">
            <Calendar
              onClickDay={handleDayClick}
              tileDisabled={({ date, view }) =>
                view === "month" && date.getMonth() !== new Date().getMonth()
              }
              tileContent={({ date }) => renderAppointmentsForDay(date)}
            />
          </div>
        )}

        {showForm && (
          <AppointmentForm
            date={selectedDay}
            editing={editing}
            patients={patients}
            doctors={doctors}
            onSave={handleFormSubmit}
            onClose={() => {
              setShowForm(false);
              setEditing(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CalendarPage;
