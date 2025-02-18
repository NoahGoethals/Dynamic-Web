'use strict';

const courses = []; 
const students = {}; 

document.querySelector('#addCourse').addEventListener('click', function() {
    let title = document.querySelector('#courseTitle').value.trim();
    let description = document.querySelector('#courseDesc').value.trim();

    if (title && description) {
        if (!courses.some(course => course.title === title)) {
            courses.push({ title, description });
            updateCourseList();
            updateDropdowns();
        } else {
            alert('Deze cursus bestaat al.');
        }
    } else {
        alert('Voer een geldige cursustitel en beschrijving in.');
    }

    document.querySelector('#courseTitle').value = '';
    document.querySelector('#courseDesc').value = '';
});

function updateCourseList() {
    let list = document.querySelector('#courseList');
    list.innerHTML = '';

    for (let course of courses) {
        let div = document.createElement('div');
        div.innerHTML = `<strong>${course.title}</strong>: ${course.description}`;
        list.appendChild(div);
    }
}

function updateDropdowns() {
    let coursePicker = document.querySelector('#coursePicker');
    let modulePicker = document.querySelector('#modulePicker');
    coursePicker.innerHTML = '';
    modulePicker.innerHTML = '';

    for (let course of courses) {
        let option = document.createElement('option');
        option.value = course.title;
        option.textContent = course.title;
        coursePicker.appendChild(option);
        modulePicker.appendChild(option.cloneNode(true));
    }
}

document.querySelector('#enrollStudent').addEventListener('click', function() {
    let name = document.querySelector('#studentName').value.trim();
    let courseTitle = document.querySelector('#coursePicker').value;

    if (name && courseTitle) {
        if (!students[name]) {
            students[name] = { courses: {}, scores: {} };
        }

        if (!students[name].courses[courseTitle]) {
            students[name].courses[courseTitle] = [];
            students[name].scores[courseTitle] = [];
            updateStudentList();
            updateStudentDropdowns();
        } else {
            alert('Student is al ingeschreven voor deze cursus.');
        }
    } else {
        alert('Voer een studentnaam in en selecteer een cursus.');
    }

    document.querySelector('#studentName').value = '';
});

function updateStudentList() {
    let list = document.querySelector('#studentList');
    list.innerHTML = '';

    for (let student in students) {
        let div = document.createElement('div');
        div.innerHTML = `<strong>${student}</strong>: ${Object.keys(students[student].courses).join(', ')}`;
        list.appendChild(div);
    }
}

function updateStudentDropdowns() {
    let studentPicker = document.querySelector('#studentPicker');
    let reportStudent = document.querySelector('#reportStudent');
    studentPicker.innerHTML = '';
    reportStudent.innerHTML = '';

    for (let student in students) {
        let option = document.createElement('option');
        option.value = student;
        option.textContent = student;
        studentPicker.appendChild(option);
        reportStudent.appendChild(option.cloneNode(true));
    }
}

document.querySelector('#addGrade').addEventListener('click', function() {
    let studentName = document.querySelector('#studentPicker').value;
    let courseTitle = document.querySelector('#modulePicker').value;
    let grade = parseFloat(document.querySelector('#moduleGrade').value);

    if (studentName && courseTitle && grade >= 0 && grade <= 20) {
        students[studentName].scores[courseTitle].push(grade);
    } else {
        alert('Voer een geldige score in (0-20).');
    }

    document.querySelector('#moduleGrade').value = '';
});

document.querySelector('#generateReport').addEventListener('click', function() {
    let studentName = document.querySelector('#reportStudent').value;
    let reportOutput = document.querySelector('#reportOutput');

    if (students[studentName]) {
        let report = `<h2>Rapport voor ${studentName}</h2>`;
        
        for (let course in students[studentName].scores) {
            let scores = students[studentName].scores[course];
            if (scores.length > 0) {
                let total = scores.reduce((sum, num) => sum + num, 0);
                let average = (total / scores.length).toFixed(2);
                let highest = Math.max(...scores);
                let lowest = Math.min(...scores);

                report += `
                    <h3>${course}</h3>
                    <p>Gemiddelde score: ${average}</p>
                    <p>Hoogste score: ${highest}</p>
                    <p>Laagste score: ${lowest}</p>
                    <h4>Scores:</h4>
                    <ul>${scores.map(score => `<li>${score}</li>`).join('')}</ul>
                `;
            }
        }

        reportOutput.innerHTML = report;
    }
});
