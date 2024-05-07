import './App.css';
import HomePage from './pages/Home/homePage';
import {
  useLocation,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import QuizPage from './pages/Quiz/quizPage';
import ResultTable from './pages/ResultTable/resultTable';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


const App = () => {

  const { userName,quizCompleted } = useSelector((state) => state.quizApp);

  const location = useLocation();
  const navigate = useNavigate();

  const router = [
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "/quiz",
      element: <QuizPage />,

    },
    {
      path: "/quiz-result",
      element: <ResultTable />,
      
    },
  ];

  const handleLocation =(pathName) => {
    
    if(pathName === '/') {
      if(!userName) {
        navigate('/');
      }
    }
    else if(pathName === '/quiz'){
      if(!userName) {
        navigate('/');
      }
      else if(userName && quizCompleted) {
        navigate('/quiz-result');
      }
    }
    else if(pathName === '/quiz-result') {
      if(!userName) {
        navigate('/');
      }
      else if(!quizCompleted) {
        navigate('/quiz');
      }
    }
  }
  
  useEffect(() => {
  handleLocation(location.pathname);
  }, [location.pathname])

  
  return (
    <div className='App'>
      <Routes>
      {
        router.map((rout, key) => (
          <Route key={key} path={rout.path} element={rout.element} />
        ))
      }
    </Routes>
    </div>
  );
}

export default App;
