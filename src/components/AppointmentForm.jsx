
import { useState, useEffect } from "react";

const AppointmentForm = ({ date, patients, doctors, editing, onSave, onClose }) => {
  const [patient, setPatient] = useState(patients[0]);
  const [doctor, setDoctor] = useState(doctors[0]);
  const [time, setTime] = useState("09:00");

  useEffect(() => {
    if (editing) {
      setPatient(editing.patient);
      setDoctor(editing.doctor);
      setTime(editing.time);
    }
  }, [editing]);

  const notify = (label, value) => {
    if (value) {
      alert(`${label} selected: ${value}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date) {
      alert("Date is missing.");
      return;
    }
    onSave(patient, doctor, time);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-blue-700">
          {editing ? "Edit" : "Add"} Appointment – {date?.toDateString()}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm mb-1">Patient</label>
            <select
              value={patient}
              onChange={(e) => {
                setPatient(e.target.value);
                notify("Patient", e.target.value);
              }}
              className="w-full p-2 border rounded"
              required
            >
              {patients.map((p, i) => (
                <option key={i} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Doctor</label>
            <select
              value={doctor}
              onChange={(e) => {
                setDoctor(e.target.value);
                notify("Doctor", e.target.value);
              }}
              className="w-full p-2 border rounded"
              required
            >
              {doctors.map((d, i) => (
                <option key={i} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm mb-1">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {editing ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
