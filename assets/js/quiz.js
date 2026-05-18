//quizの定義
const quiz = [
    {
        question: 'ゲーム市場、最も売れたゲーム機は次のうちどれ？',
        answers: [
            'スーパーファミコン',
            'PlayStation2',
            'Nintendo Switch',
            'Nintendo DS'
        ],
        correct: 'Nintendo DS'
    },
    {
        question: '真・三國無双シリーズで2026年現在も絶賛されているナンバリングタイトルは次のうちどれ',
        answers: [
            '真・三國無双2',
            '真・三國無双4',
            '真・三國無双7',
        ],
        correct: '真・三國無双2'
    },
    {
        question: '2026年に発売される鬼武者シリーズのタイトルは次のうちどれ',
        answers: [
            '鬼武者',
            '鬼武者2',
            '新鬼武者DAWN OF DREAMS',
            '鬼武者Way of Sword'
        ],
        correct: '鬼武者Way of Sword'
    }
];

//quizLengthの定義
const quizLength = quiz.length;
let quizIndex = 0;
let score = 0;
const flex = document.querySelector('.flex');

quiz[0].answers.forEach((answers) => {
    let button = document.createElement('button');
    button.textContent = answers;
    button.classList.add('primary');
    flex.appendChild(button);
});
const $button = document.querySelectorAll('button');
//buttonLengthの定義 buttonLengthはbuttonとlengthの合わさったもの
const buttonLength = $button.length;

document.querySelector('.ques-txt').textContent = quiz[quizIndex].question;

//setupQuiz = () => (アロー関数) {...}
const setupQuiz = () => {

    //documentの中からclass="ques-txt"を探せと命令してそこにquiz[quizIndex]を流し込めと命令
    document.querySelector('.ques-txt').textContent = quiz[quizIndex].question;
    let buttonIndex = 0;

    //while文 buttonIndexよりbuttonLengthが大きい時
    while(buttonIndex < buttonLength) {
        $button[buttonIndex].textContent = quiz[quizIndex].answers [buttonIndex];
        buttonIndex++;
    }
}
//ここで実行しろと命令
setupQuiz();

//clickHandlerの定義 e = Event
const clickHandler = (e) => {

    //if / if文(もし〇〇であれば) / else (そうでない時の処理) 
    if (quiz[quizIndex].correct === e.target.textContent) {
        window.alert('正解');
        score++;
    } else {
        window.alert('残念...不正解');
    }
    quizIndex++;

    //まだ問題が続く時はsetupQuizを呼ぶ
    if(quizIndex < quizLength) {
        setupQuiz();
    
    //問題がこれ以上なければ終了のアラート共にscoreを知らせる
    } else {
        window.alert('終了！あなたの正解数は' + score + '/' + quizLength + 'です');
    }
};

//handlerIndexの定義
let handlerIndex = 0;

//while文 handlerIndexよりbuttonLengthが大きければ
while (handlerIndex < buttonLength) {

    //$buttonのclickEvent
    $button[handlerIndex].addEventListener('click', (e) => {
        clickHandler(e);
    });
    handlerIndex++;
};

