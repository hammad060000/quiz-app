import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
var firebaseConfig = {
    apiKey: "AIzaSyDpqg758i1A-Sdn67WkTmqVTcC_uro41Q0",
    authDomain: "quiz-hammad-app.firebaseapp.com",
    projectId: "quiz-hammad-app",
    storageBucket: "quiz-hammad-app.appspot.com",
    messagingSenderId: "692061850072",
    appId: "1:692061850072:web:6848124a9bcee93ea78aad",
    measurementId: "G-4QQFY4HM44"
};
var app = initializeApp(firebaseConfig);
var auth = getAuth(app);
var database = getDatabase(app);

var name1 = document.getElementById("name1");
var email1 = document.getElementById("email1");
var password1 = document.getElementById("password1");
var singup = document.getElementById("singup");
var login = document.getElementById("login");
var email2 = document.getElementById("email2");
var password2 = document.getElementById("password2");
var questionNumber = document.getElementById("questionNumber");
var questionIndex = document.getElementById("questionIndex");
var options = document.getElementById("options");
var resuldata = document.getElementById("resuldata");
var result = document.getElementById("result");
var grade = document.getElementById("grade");
var main = document.getElementById("main");

var questionData = [{
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris",
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Jupiter", "Venus", "Mercury"],
        answer: "Mars",
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: ["William Shakespeare", "Charles Dickens", "Leo Tolstoy", "Jane Austen"],
        answer: "William Shakespeare",
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Giraffe", "Blue Whale", "Lion"],
        answer: "Blue Whale",
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        answer: "Carbon Dioxide",
    },
    {
        question: "Who is the first woman to fly solo across the Atlantic Ocean?",
        options: ["Amelia Earhart", "Harriet Quimby", "Bessie Coleman", "Valentina Tereshkova"],
        answer: "Amelia Earhart",
    },
    {
        question: "What is the tallest mountain in the world?",
        options: ["Mount Kilimanjaro", "Mount Everest", "Mount McKinley", "Mount Fuji"],
        answer: "Mount Everest",
    },
    {
        question: "In which year did the Titanic sink?",
        options: ["1910", "1925", "1937", "1912"],
        answer: "1912",
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Pablo Picasso", "Leonardo da Vinci", "Vincent van Gogh", "Michelangelo"],
        answer: "Leonardo da Vinci",
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Fe", "Hg"],
        answer: "Au",
    },
];

window.singupbtn = function() {
    if (name1.value == "") {
        swal({
            title: "Note!",
            text: "Please fill the Name",
            timer: 2000
        });
        return false;
    } else if (email1.value == "") {
        swal({
            title: "Note!",
            text: "Please fill the Email",
            timer: 2000
        });
        return false;
    } else if (password1.value == "") {
        swal({
            title: "Note!",
            text: "Please fill the Password Atlest 7 Letter",
            timer: 2000
        });
        return false;
    }

    createUserWithEmailAndPassword(auth, email1.value, password1.value).then(function(sucess) {
            console.log(sucess);
            swal({
                title: "Congratulations",
                text: "Your Singup is Complete",
                timer: 2000
            });
            var singupdata = {
                Name: name1.value,
                Email: email1.value,
                Password: password1.value,
            }
            var referId = ref(database)
            var ID = push(referId).key
            singupdata.id = ID
            var reference = ref(database, `students/${singupdata.id}`)
            set(reference, singupdata)
            singup.style.display = "none";
            login.style.display = "inline-block";
        })
        .catch(function(error) {
            console.log(error)
            swal({
                title: "Sorry!",
                text: "Some thing went wrong plz try Again",
                timer: 2000
            });
        })
}
window.loginhere = function() {
    login.style.display = "inline-block";
    singup.style.display = "none";
}


window.loginbtn = function() {
    if (email2.value == "") {
        swal({
            title: "Note!",
            text: "Please fill the Email",
            timer: 2000
        });
        return false;
    } else if (password2.value == "") {
        swal({
            title: "Note!",
            text: "Please fill the Password",
            timer: 2000
        });
        return false;
    } else if (password2.value < 6) {
        alert("write pass greater then 6 word")
        return false;
    }
    signInWithEmailAndPassword(auth, email2.value, password2.value).then(
        function(success) {
            sendResult.id = success.user.uid
            sendResult.email = email2.value
            swal({
                title: "Congratulations",
                text: "Login Sucessfuly",
                timer: 2000
            });
            login.style.display = "none";
            main.style.display = "block"
            Question()
        }).catch(
        function(error) {
            swal({
                title: "Sorry!",
                text: "Some thing went wrong plz try Again",
                timer: 2000
            });
        })
}
var index = 0
var right = 0
var sendResult = {}

function Question() {
    if (index < questionData.length) {
        questionNumber.innerHTML = questionData[index].question
        questionIndex.innerHTML = `Question Number ${index + 1}/${questionData.length}`
        options.innerHTML = ""
        for (var i = 0; i < questionData[index].options.length; i++) {
            options.innerHTML += `<div class="col-md-6 mt-2" >
<div class="p-2 shadow-lg rounded bg-white text-sucess">
    <button   onclick="recive('${questionData[index].options[i]}','${questionData[index].answer}')" class="btn w-100 text-success">${questionData[index].options[i]}</button>
</div>
</div>`
        }
    } else {
        main.style.display = "none"
        resuldata.style.display = "block"
        result.innerHTML = `Your Result ${right}/${questionData.length}`
        sendResult.result = right
        var refe = ref(database, `Results/${sendResult.id}`)
        set(refe, sendResult)
        grade.style.color = "skyBlue"
        if (right === 7) {
            grade.innerHTML = `Your grade is A+1`

        } else if (right === 6) {
            grade.innerHTML = `Your grade is A`

        } else if (right === 5) {
            grade.innerHTML = `Your grade is B`

        } else if (right === 4) {
            grade.innerHTML = `Your grade is C`

        } else if (right === 3) {
            grade.innerHTML = `Your grade is D`

        } else {
            grade.innerHTML = `You are Fail Bater luck next Time`
            grade.style.color = "red"
        }
    }

}
window.change = function() {
    index++
    Question()
}
window.recive = function(que, ans) {
    if (que === ans) {
        right++
    }
    change()
}