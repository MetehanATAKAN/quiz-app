import React, { useState, useEffect } from "react";
import Table from "../../components/Table/table";
import { useSelector } from "react-redux";
import './resultTable.css';


const ResultTable = () => {

  const { answers } = useSelector((state) => state.quizApp);

  const [tableData, setTableData] = useState();
  const tableHeader = [
    "ID",
    "QUESTION",
    "CORRECT ANSWER",
    "USER ANSWER",
    "SCORE",
  ];

  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    setTableData(
      answers.map((item, index) => ({
        id: index + 1,
        question: item.title,
        correctAnswer: item.stylishs.find(
          (sty) => sty.id === item.correctAnswer
        ).answer,
        userAnswer: item.userAnswer
          ? item.stylishs.find((sty) => sty.id === item.userAnswer).answer
          : "-",
        score: item.correctAnswer === item.userAnswer ? 10 : 0,
      }))
    );
  }, [answers]);

  useEffect(() => {
    answers.map(item => {
        if(item.correctAnswer === item.userAnswer) {
            setTotalScore(prev => prev + 10);
        }
        return item
    })
  }, [answers])


   /**quiz leave confirm */
   useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
        window.location.href = "/";
    };

    window.history.pushState(null, null, window.location.pathname); 
    window.addEventListener('popstate', handleBackButton); 
    return () => {
      window.removeEventListener('popstate', handleBackButton); 
    };
  }, []);

  return (
    <div className="result-table">
    <h2>QUIZ RESULT</h2>
     {
        tableData &&  <Table header={tableHeader} data={tableData} />
     }
     <div className="total-score">
        TOTAL SCORE : <span className="score"> {totalScore / 2} </span>
     </div>
    </div>
  );
};

export default ResultTable;
