import React, {useContext, useState} from "react";
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import {randomQuestion, isCorrectAnswer} from "../server/questions";

export const QuestionContext = React.createContext({randomQuestion})

function FrontPage(){
    return null;
}

export function ShowQuestion(){
    return null;
}

function ShowAnswer(){
    return null;
}

export function Quiz(){
    const [questionsAnswered, setQuestionsAnswered] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState(0);

    return (<div><Routes>
        <Route path={"/"} element={<FrontPage questionsAnswered={questionsAnswered} correctAnswer={correctAnswer}/>}/>
    </Routes></div>);
}