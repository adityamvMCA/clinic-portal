import doctorList from "../data/doctors.json";

const DoctorsPage = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Doctors</h2>
      <ul className="bg-white dark:bg-gray-800 p-4 rounded shadow space-y-2">
        {doctorList.map((doctor, index) => (
          <li
            key={index}
            className="p-2 border-b last:border-b-0 border-gray-200 dark:border-gray-600"
          >
            {doctor}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorsPage;
