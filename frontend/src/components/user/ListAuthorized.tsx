import { useQuery } from "@tanstack/react-query";
import {
  ListAllDepartmentsAPI,
  ListStudentsAPI,
} from "../../../../Service/Admin/adminService";
import { useState } from "react";
import Loading from "../../State/Loading";

function DepartmentInfoWithStudents() {
  const [filters, setFilters] = useState({
    gender: "",
    department: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const {
    data: studentResponse,
    isLoading,
  } = useQuery({
    queryKey: ["ListStudents", filters],
    queryFn: () => ListStudentsAPI(filters),
    // enabled: !!filters.department,
  });

  const {
    data: allDepartments,
    isLoading: deptLoading,
  } = useQuery({
    queryKey: ["ListDepartments"],
    queryFn: ListAllDepartmentsAPI,
  });

  if (isLoading || deptLoading) return <Loading />;

  const selectedDept =
    allDepartments?.depts?.find((dept: any) => dept._id === filters.department) || null;

  return (
    <div className="min-h-screen bg-white m-3 rounded-xl p-4 flex flex-col gap-6">
      {/* Department Info */}
      {selectedDept && (
        <div className="grid md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-xl shadow-sm">
          <img
            src={selectedDept.profileImage || "/images/default.png"}
            alt="Department"
            className="w-full h-40 object-cover rounded-xl"
          />
          <div className="md:col-span-2 flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-gray-800">{selectedDept.name} Department</h2>
            <p className="text-gray-500 text-sm uppercase">Code: {selectedDept.code}</p>
            <p className="text-gray-700">{selectedDept.description}</p>
            <p className="text-sm text-gray-600">
              Created on: {new Date(selectedDept.createdAt).toLocaleDateString()}
            </p>
            {/* HOD */}
            <div className="flex gap-4 mt-4 items-center">
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="HOD"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">Dr. John Adewale</p>
                <p className="text-sm text-gray-600">john.adewale@university.edu</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-stone-50 rounded-lg p-4 flex flex-col md:flex-row justify-between gap-4 items-center shadow-sm">
        <h4 className="text-xl font-semibold text-gray-800">Students in Department</h4>
        <div className="flex flex-wrap gap-3">
          <input
            type="search"
            placeholder="Search by name or ID"
            className="border border-gray-300 rounded-full px-3 py-1.5 text-sm w-52"
          />
          <select
            name="gender"
            value={filters.gender}
            onChange={handleChange}
            className="border border-gray-300 rounded-full px-3 py-1.5 text-sm"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <select
            name="department"
            value={filters.department}
            onChange={handleChange}
            className="border border-gray-300 rounded-full px-3 py-1.5 text-sm"
          >
            <option value="">Select Department</option>
            {allDepartments?.depts?.map((dept: any) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Gender</th>
              <th className="px-4 py-2 text-left">Student ID</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">Level</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {studentResponse?.students?.map((student: any, index: number) => (
              <tr
                key={student._id}
                className={`hover:bg-purple-50 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-4 py-3">
                  {student.gender === "Male" ? "Mr." : "Mrs."} {student.firstName}{" "}
                  {student.lastName}
                </td>
                <td className="px-4 py-3">{student.email}</td>
                <td className="px-4 py-3 capitalize">{student.gender}</td>
                <td className="px-4 py-3">{student.studentId}</td>
                <td className="px-4 py-3">{student.address}</td>
                <td className="px-4 py-3">{student.level}</td>
                <td className="px-4 py-3 text-blue-600">View</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DepartmentInfoWithStudents;
