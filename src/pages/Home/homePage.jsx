import React, { useEffect, useState } from "react";
import Input from "../../components/Input/input";
import Button from "../../components/Button/button";
import "./homePage.css";
import Header from "../../components/Header/Header";
import { useDispatch } from "react-redux";
import { handleChangeQuestion, handleQuizCompleted, handleUserName, quizTimer } from "../../redux/slices/quiz";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [inputError, setInputError] = useState(false);

  const handleButton = () => {
    if(name) {
      dispatch(handleUserName(name));
      navigate('/quiz');
      setInputError(false);
    }
    else setInputError(true);
  }

  useEffect(() => {
    dispatch(quizTimer(30));
    dispatch(handleQuizCompleted(false));
    dispatch(handleUserName(''));
    dispatch(handleChangeQuestion(0));
  }, [dispatch])
  
  return (
    <div className="home">
      <Header />
      <div className="home-page">
        <div className="elements">
          <Input value={name} setValue={setName} placeholder="Name" isError={inputError} />
          <Button name="start" onClick={handleButton} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
