let questions = JSON.parse(localStorage.getItem("questions")) || [];

function showQuestionForm() {
    const form = document.getElementById("questionForm");

    if (form.style.display === "block") {
        form.style.display = "none";
    } else {
        form.style.display = "block";
    }
}

function addQuestion() {
    const question = document.getElementById("newQuestion").value.trim();
    const option1 = document.getElementById("option1").value.trim();
    const option2 = document.getElementById("option2").value.trim();
    const option3 = document.getElementById("option3").value.trim();
    const option4 = document.getElementById("option4").value.trim();
    const correctAnswer = document.getElementById("correctAnswer").value;

    if (
        !question ||
        !option1 ||
        !option2 ||
        !option3 ||
        !option4 ||
        correctAnswer === ""
    ) {
        alert("Please fill all fields.");
        return;
    }

    const newQuestion = {
        question: question,
        options: [option1, option2, option3, option4],
        correctAnswer: Number(correctAnswer)
    };

    questions.push(newQuestion);

    localStorage.setItem("questions", JSON.stringify(questions));

    clearForm();
    displayQuestions();
}

function displayQuestions() {
    const questionList = document.getElementById("questionList");
    const questionCount = document.getElementById("questionCount");

    questionList.innerHTML = "";

    questionCount.textContent = questions.length;

    questions.forEach((q, index) => {
        const questionDiv = document.createElement("div");

        questionDiv.className = "question-card";

        questionDiv.innerHTML = `
            <h3>Q${index + 1}. ${q.question}</h3>

            <p>1. ${q.options[0]}</p>
            <p>2. ${q.options[1]}</p>
            <p>3. ${q.options[2]}</p>
            <p>4. ${q.options[3]}</p>

            <strong>
                Correct Answer: Option ${q.correctAnswer + 1}
            </strong>

            <br><br>

            <button onclick="deleteQuestion(${index})">
                Delete
            </button>
        `;

        questionList.appendChild(questionDiv);
    });
}

function deleteQuestion(index) {
    if (confirm("Are you sure you want to delete this question?")) {
        questions.splice(index, 1);

        localStorage.setItem("questions", JSON.stringify(questions));

        displayQuestions();
    }
}

function clearForm() {
    document.getElementById("newQuestion").value = "";
    document.getElementById("option1").value = "";
    document.getElementById("option2").value = "";
    document.getElementById("option3").value = "";
    document.getElementById("option4").value = "";
    document.getElementById("correctAnswer").value = "";
}

// Page load hone par questions show karo
displayQuestions();
