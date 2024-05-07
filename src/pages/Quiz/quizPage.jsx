import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QuizAsync, handleChangeAnswer, handleChangeQuestion, handleQuizCompleted, quizTimer } from "../../redux/slices/quiz";
import Loading from "../../components/Loading/loading";
import Button from "../../components/Button/button";
import { CircularProgressbar  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "./quizPage.css";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {
  const dispatch = useDispatch();
  const { answers, loading, quizTimerDuration, questionId } = useSelector((state) => state.quizApp);

  const navigate = useNavigate();

 
  const completeTimer = () => {
    if(questionId >= 9) {
      navigate('/quiz-result');
      dispatch(handleQuizCompleted(true));
    }
    else {
      dispatch(handleChangeQuestion(questionId + 1));
      dispatch(quizTimer(30));
    }
  }

  const handleAnswer = (question,answerKey) => {
  
    dispatch(handleChangeAnswer({
      question:question,answerKey:answerKey
    }));
  }

  useEffect(() => {
    dispatch(QuizAsync());
  }, [dispatch]);

  
  useEffect(() => {
    const interval = setInterval(() => {
      if (quizTimerDuration > 0) {
        dispatch(quizTimer(quizTimerDuration - 1));
      }
      else {
        if(questionId >= 9) {
          navigate('/quiz-result');
          dispatch(handleQuizCompleted(true));
        }
        else completeTimer();
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  }, [quizTimerDuration]);


  /**quiz leave confirm */
  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      if (window.confirm("Are you sure you want to leave Quiz?")) {
        window.location.href = "/";
      }
    };

    window.history.pushState(null, null, window.location.pathname); 
    window.addEventListener('popstate', handleBackButton); 
    return () => {
      window.removeEventListener('popstate', handleBackButton); 
    };
  }, []);

  return (
    <div className="page quiz-page">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="main-quiz">
            {
              <div className="questions">
                <div className="header">
                  <div className="question-number">
                    {" "}
                    {`Question ${questionId + 1}/10`}{" "}
                  </div>
                  <div style={{ width: 75, height: 75 }}>
                  <CircularProgressbar 
                  maxValue={30} 
                  value={quizTimerDuration} 
                  text={`${quizTimerDuration}`}
                   />
                  </div>
                </div>
                <div className="question">
                  {answers[questionId]?.title}
                </div>

                <div className="answers">
                  {answers[questionId]?.stylishs.map((sty, i) => (
                    <button
                      onClick={() =>
                        handleAnswer(answers[questionId]?.id, sty.id)
                      }
                      className={`answer ${sty.isActive && "active"}`}
                      key={i}
                      disabled={quizTimerDuration > 20}
                    >
                      {sty.answer}
                    </button>
                  ))}
                </div>
              </div>
            }
          </div>
          <div className="next-button">
            <Button name="next" onClick={completeTimer} disabled={quizTimerDuration > 20} />
          </div>
        </>
      )}
    </div>
  );
};

export default QuizPage;
