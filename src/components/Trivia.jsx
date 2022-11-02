import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import src_sounds_play from "../assets/src_sounds_play.wav";
import src_sounds_correct from "../assets/src_sounds_correct.wav";
import src_sounds_wrong from "../assets/src_sounds_wrong.wav";
function Trivia({ data, setStop, questionNumber, SetQuestionNumber }) {
  //   console.log(data.question + "qq");
  const [question, setQuestion] = useState(null);
  const [selectAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  const [letsPlay] = useSound(src_sounds_play);
  const [correctAnswer] = useSound(src_sounds_correct);
  const [wrongAnswer] = useSound(src_sounds_wrong);
  useEffect(() => {
    letsPlay();
  }, [letsPlay]);
  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);
  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };
  const handleClick = (a) => {
    setSelectedAnswer(a);
    setClassName("answer active");
    delay(3000, () =>
      setClassName(a.correct ? "answer correct" : "answer wrong")
    );
    delay(5000, () => {
      if (a.correct) {
        correctAnswer();
        delay(1000, () => {
          SetQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
      } else {
        wrongAnswer();
        delay(1000, () => {
          setStop(true);
        });
      }
    });
  };
  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>

      <div className="answers">
        {question?.answers.map((a) => (
          <div
            className={selectAnswer === a ? className : "answer"}
            onClick={() => handleClick(a)}
          >
            {a.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trivia;
