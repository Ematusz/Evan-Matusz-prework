const students = ['Evan', 'Steve', 'Marie'];
let newStudent = '';
for (i = 0; i < 3; ++i) {
    newStudent = prompt("Please enter the name of a new student.");
    students.push(newStudent);
}
for (i = 0; i < students.length; ++i) {
    console.log(students[i]);
}