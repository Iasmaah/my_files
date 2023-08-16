import Intro from './Intro'
import './index.css'
import { useEffect, useState } from 'react'
import Svg from './Svg'
import IntroSvg from './IntroSvg'
import Question from './Question'

export default function App() {
    const [game, setGame] = useState(false)
    const [showAnswers, setShowAnswers] = useState(false)
    const [questionsData, setQuestionsData] = useState([])
    const [allComplete, setAllComplete] = useState(false)
    const [result, setResult] = useState(0)

    const startGame = () => {
        if (!game) {
            setGame(true)
            setAllComplete(false)
            setShowAnswers(false)
        }
    }

    async function getQuestions() {
        const APIURL = 'http://localhost:3500/questions'
        const response = await fetch(APIURL)
        const questions = await response.json()
        return questions
    }

    useEffect(() => {
        getQuestions().then(data => {
            const randomIndexesArray = []
            while (randomIndexesArray.length < 5) {
                let num = Math.ceil(Math.random() * 20);
                if (!randomIndexesArray.includes(num)) {
                    randomIndexesArray.push(num);
                }
            }

            const fiveRandomQuestions = data.filter(item => randomIndexesArray.includes(item.id))
            setQuestionsData(fiveRandomQuestions.map(obj => ({
                selectedChoice: undefined,
                questionId: obj.id,
                question: obj.question,
                choices: obj.choices,
                answer: obj.answer
            })))
        })

    }
        , [game])

    const handleChoiceClick = (e, qId, choice) => {
        e.preventDefault()
        setQuestionsData(prev => (
            prev.map(q => {
                if (q.questionId === qId) {
                    return { ...q, selectedChoice: choice }
                }
                return q
            })
        ))
    }

    useEffect(() => {
        setAllComplete(questionsData.every(question => question.selectedChoice !== undefined))
    }, [questionsData])


    const quests = questionsData.map(function (question, index) {
        return (<Question
            key={index}
            question={question}
            handleChoiceClick={handleChoiceClick}
            showAnswers={showAnswers}
        />)
    })


    function handleCheck(e) {
        e.preventDefault()
        var count = 0
        for (let i = 0; i < 5; i++) {
            const question = questionsData[i]
            if (question.selectedChoice === question.answer) count += 1
        }
        setResult(count)
        setShowAnswers(true)
    }



    return (
        <>
            {
                game ?
                    <>
                        <Svg />
                        <div id='container'>
                            <form>
                                {quests}
                                <div id='button-container'>
                                    {game ?
                                        showAnswers ?
                                            <>
                                                <h1>{`SCORE ${result}/5`}</h1>
                                                <button
                                                    // disabled={!allComplete} 
                                                    className='styledbtn checkBtn'
                                                    onClick={startGame}
                                                    id='check-btn'> Play again </button>
                                            </> :
                                            <button
                                                disabled={!allComplete}
                                                className={!allComplete ? 'styledbtn' : 'styledbtn checkBtn'}
                                                type='submit'
                                                onClick={handleCheck}
                                                id='check-btn'> Check answers </button>
                                        :
                                        <></>
                                    }
                                </div>
                            </form>
                        </div>
                    </>
                    :
                    <>
                        <IntroSvg />
                        <Intro game={game} startGame={startGame} />
                    </>
            }

        </>
    )
}
