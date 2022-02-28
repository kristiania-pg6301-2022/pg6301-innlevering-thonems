import React, {useContext, useState} from "react";
import {randomQuestion, isCorrectAnswer} from "../server/questions";
import {Routes} from "react-router-dom";

function FrontPage(){
    return null;
}

export function Quiz(){
    const [questionsAnswered, setQuestionsAnswered] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState(0);

    return (<div><Routes>
        <Route path={"/"} element={<FrontPage questionsAnswered={questionsAnswered} correctAnswer={correctAnswer}/>}/>
    </Routes></div>);
}