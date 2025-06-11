const questions = [ // jautājumu masīvs
    {
        question: "Kā rīkosieties, ieraugot attēlā redzamo ceļa zīmi?",
        image: "image/1.png",
        answers: [
            { text: "Raidīsiet garus skaņas signālus, lai aizbaidītu savvaļas dzīvniekus.", correct: false },
            { text: "Ievērosiet īpašu piesardzību un izvēlēsieties atbilstošu ātrumu.", correct: true },
            { text: "Ieslēgsiet visas iespējamās apgaismes ierīces, lai dzīvnieki jūs savlaicīgi pamanītu un neskrietu uz ceļa.", correct: false }
        ]
    },
    {
        question: "Kurā attēlā pareizāk tiek veikta cietušā izvilkšana no ceļu satiksmes negadījumā iekļuvušā automobiļa?",
        image: "image/2.png",
        answers: [
            { text: "A.", correct: false },
            { text: "B.", correct: true },
            { text: "Abi paņēmieni ir pareizi.", correct: false }
        ]
    },
    {
        question: "Kurš no vadītājiem ir ieņēmis pareizu stāvokli uz brauktuves, lai brauktu pa loku?",
        image: "image/3.png",
        answers: [
            { text: "Abu automobiļu vadītāji.", correct: false },
            { text: "Tikai vieglā automobiļa vadītājs.", correct: false },
            { text: "Tikai kravas automobiļa vadītājs.", correct: true }
        ]
    },
    {
        question: "Ko apzīmē attēlotais ceļa apzīmējums?",
        image: "image/4.png",
        answers: [
            { text: "Uz brauktuves izveidotu mākslīgu paaugstinājumu (ātrumvalni).", correct: false },
            { text: "Gājēju pāreju.", correct: true },
            { text: "Riteņbraucēju celiņu.", correct: false }
        ]
    },
    {
        question: "Ko norāda attēlotā ceļa zīme?",
        image: "image/5.png",
        answers: [
            { text: "Stāvvietu lielveikala klientu transportlīdzekļiem.", correct: false },
            { text: "Vietu, kur aizliegts apstāties mehāniskajiem transportlīdzekļiem.", correct: false },
            { text: "Autobusu un trolejbusu pieturvietu.", correct: true }
        ]
    },
    {
        question: "Kā rīkosieties, ja tuvojas operatīvais transportlīdzeklis ar iedegtu mirgojošu zilu un sarkanu bākuguni un ieslēgtu speciālu skaņas signālu?",
        image: "image/6.png",
        answers: [
            { text: "Turpināsiet braukt pa iecerēto maršrutu.", correct: false },
            { text: "Nekavējoties apstāsieties brauktuves labajā malā.", correct: true },
            { text: "Nekavējoties apstāsieties.", correct: false }
        ]
    },
    {
        question: "Kā rīkosieties, šķērsojot krustojumu, attēlotajā situācijā?",
        image: "image/7.png",
        answers: [
            { text: "Dosiet ceļu tikai kravas automobiļa vadītājam..", correct: false },
            { text: "Dosiet ceļu abu automobiļu vadītājiem.", correct: true },
            { text: "Šķērsosiet krustojumu pirmais.", correct: false }
        ]
    },
    {
        question: "Kādā attālumā no pretim braucošā transportlīdzekļa tālās gaismas jāpārslēdz uz tuvajām?",
        image: "image/8.png",
        answers: [
            { text: "Vismaz 150 metru attālumā.", correct: true },
            { text: "Tikai tad, kad pretimbraucošais periodiski pārslēdz lukturu gaismu.", correct: false },
            { text: "Tikai tad, kad pretim braucošais ieslēdz avārjas gaismas signalizaciju.", correct: false }
        ]
    },
    {
        question: "Kādu piekabi atļauts vilkt ar vieglo automobili, kura pilna masa ir 2000kg, ja autovadītājam ir B kategorijas vadītāja apliecība?",
        image: "image/9.png",
        answers: [
            { text: "Piekabi, kuras pašmasa nepārsniedz 1500 kg.", correct: false },
            { text: "Piekabi, kuras pilna masa nepārsniedz 1500kg.", correct: true },
            { text: "Piekabi, kuras faktiskā masa nepārsniedz 1500kg.", correct: false }
        ]
    },
    {
        question: "Ko apzīmē attēlotais ceļa apzīmējums bultas uz brauktuves?",
        image: "image/10.png",
        answers: [
            { text: "Apzīmē joslu, kur mainīsies braukšanas virziens uz pretējo.", correct: true },
            { text: "Brīdina par tuvojošos ceļa sašaurinājumu.", correct: false },
            { text: "Apzīmē apdzīšanas joslu.", correct: false }
        ]
    }
];

const questionElement = document.getElementById('question'); // iegūst jautājuma elementu
const answerButtons = document.getElementById('answer-buttons'); // iegūst atbilžu pogu konteineru
const nextButtons = document.getElementById('next-btn'); // iegūst nākamās pogas konteineru
const questionImage = document.getElementById('question-image'); // iegūst jautājuma attēla elementu

let currentQuestionIndex = 0; // pašreizējais jautājuma indekss
let score = 0; // rezultāts
let timerInterval; // taimeris
let timeLeft = 600; // laiks sekundēs (10 minūtes)

function startQuiz() { // sāk viktorīnu
    currentQuestionIndex = 0; // iestata jautājuma indeksu uz 0
    score = 0; // atiestata rezultātu
    nextButtons.innerHTML = "Nākamais"; // iestata nākamās pogas tekstu
    showQuestion(); // parāda pirmo jautājumu
    startTimer(); // sāk taimeri
}

function showQuestion() { // parāda pašreizējo jautājumu
    resetState(); // atiestata pogas un stāvokli
    let currentQuestion = questions[currentQuestionIndex]; // iegūst pašreizējo jautājumu
    let questionNo = currentQuestionIndex + 1; // jautājuma numurs
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question; // iestata jautājuma tekstu

    // Parāda attēlu, ja ir norādīts ceļš
    if (currentQuestion.image) {
        questionImage.src = currentQuestion.image;
        questionImage.style.display = "block";
    } else {
        questionImage.style.display = "none";
    }

    currentQuestion.answers.forEach(answer => { // izveido atbilžu pogas
        const button = document.createElement('button'); // izveido pogu
        button.innerHTML = answer.text; // iestata pogas tekstu
        button.classList.add('btn'); // pievieno klasi
        answerButtons.appendChild(button); // pievieno pogu konteineram
        if (answer.correct) {
            button.dataset.correct = answer.correct; // pievieno datu atribūtu, ja atbilde ir pareiza
        }
        button.addEventListener('click', selectAnswer); // pievieno notikuma klausītāju
    });
}

function resetState() { // atiestata atbilžu pogas un nākamās pogas stāvokli
    nextButtons.style.display = 'none'; // paslēpj nākamās pogas
    while (answerButtons.firstChild) { // noņem visas atbildes pogas
        answerButtons.removeChild(answerButtons.firstChild); // noņem pirmo "bērnu" no atbilžu konteineru
    }
}

function selectAnswer(e) { // apstrādā atbildes izvēli
    const selectedButton = e.target; // iegūst izvēlēto pogu
    const isCorrect = selectedButton.dataset.correct === "true"; // pārbauda, vai atbilde ir pareiza
    if (isCorrect) {
        selectedButton.classList.add('pareizi'); // pievieno pareizai atbildei klasi
        score++; // palielina rezultātu
    } else {
        selectedButton.classList.add('nepareizi'); // pievieno nepareizai atbildei klasi
    }
     
    Array.from(answerButtons.children).forEach (button => { // iterē caur visām atbilžu pogām
        if (button.dataset.correct === "true") { // pārbauda, vai atbilde ir pareiza
            button.classList.add('pareizi'); // pievieno pareizai atbildei klasi
        }
        button.disabled = true; // atslēdz visas atbildes pogas
    });
    nextButtons.style.display = 'block'; // parāda nākamās pogas, kad atbilde ir izvēlēta 
}

function showScore(timeIsUp = false) { // parāda rezultātu vai apstrādā laika beigas
    resetState(); // atiestata stāvokli
    if (timeIsUp) {
        // Paslēpj testu un parāda "Sākt testu" pogu
        appDiv.style.display = 'none';
        startBtn.style.display = 'block';
        startBtn.innerText = "Sākt testu";
        // Paslēpj attēlu
        questionImage.style.display = "none";
        // Atjauno laiku uz sākumu
        const timerElement = document.getElementById('timer');
        if (timerElement) timerElement.textContent = "10:00";
        alert("Laiks beidzies!");
    } else {
        questionElement.innerHTML = `Jūsu rezultāts: ${score} no ${questions.length}`;
        nextButtons.innerHTML = 'Sākt no jauna';
        nextButtons.style.display = 'block';
    }
    clearInterval(timerInterval); // apstādina taimeri
}

function handleNextButton() { // apstrādā nākamās pogas klikšķi
    currentQuestionIndex++; // palielina pašreizējo jautājuma indeksu
    if (currentQuestionIndex < questions.length) { // pārbauda, vai ir vēl jautājumi
        showQuestion(); // ja ir, parāda nākamo jautājumu
    } else {
        showScore(); // ja nav, parāda rezultātu
    }
}

function startTimer() { // sāk taimeri
    clearInterval(timerInterval); // apstādina iepriekšējo taimeri, ja tāds ir
    timeLeft = 300; 
    updateTimerDisplay(); // atjauno laika attēlojumu
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showScore(true); // norāda, ka beidzies laiks
        }
    }, 1000);
}

function updateTimerDisplay() { // atjauno taimeri uz ekrāna
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        let min = Math.floor(timeLeft / 60);
        let sec = timeLeft % 60;
        timerElement.textContent = `${min}:${sec.toString().padStart(2, '0')}`;
    }
}

// Sākt testu pogas funkcionalitāte
const startBtn = document.getElementById('start-btn'); // iegūst sākt pogu
const appDiv = document.querySelector('.app'); // iegūst testa konteineru
if (startBtn) {
    startBtn.addEventListener('click', () => { // pievieno notikuma klausītāju pogai
        startBtn.style.display = 'none'; // paslēpj pogu
        appDiv.style.display = 'block'; // parāda testu
        startQuiz(); // sāk testu
    });
}

nextButtons.addEventListener('click', () => { // pievieno notikuma klausītāju nākamās pogas
    if (currentQuestionIndex < questions.length) { // pārbauda, vai ir vēl jautājumi
        handleNextButton(); // ja ir, izsauc handleNextButton funkciju
    } else {
        startQuiz(); // ja nav, sāk viktorīnu no jauna
    }
});

window.onload = function() { // kad lapa tiek ielādēta
   
}