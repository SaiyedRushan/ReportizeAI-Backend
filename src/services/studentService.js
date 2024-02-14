const students = [];
export function createStudent(student) {
  students.push(student);
  return student;
}

export function getStudent(id) {
  return students.find((student) => student.id === id);
}

export function getStudents() {
  return students;
}

export function updateStudent(id, student) {
  const index = students.findIndex((student) => student.id === id);
  students[index] = student;
  return student;
}

export function deleteStudent(id) {
  const index = students.findIndex((student) => student.id === id);
  students.splice(index, 1);
  return id;
}
