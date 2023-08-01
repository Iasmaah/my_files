import Die from './Die'
import { useEffect, useState } from "react";
import { nanoid } from 'nanoid'

export default function App(){
    
    // states
    const [dice, setDice] = useState(AllNewDice())
    const [tenzies, setTenzies] = useState(false)
    const [rolls, setRolls] = useState(0)
    const [timer,  setTimer] = useState(false)
    const [counter, setCounter] = useState(0)
    const [myBestTimeText, setMyBestTimeText] = useState('')
    let tracker;

    // acknowledge winning state
    useEffect(()=>{
        const heldDice = dice.filter(die => die.isHeld !== true)
        const heldNum = dice[0].value
        const isAllSame = dice.filter(die => die.value !== heldNum)
        if(heldDice.length === 0 && isAllSame.length === 0){
            setTimer(false)
            setTenzies(true)
            const currentBestTime = bestTime(Math.floor(counter/60), counter%60)
            setMyBestTimeText(`Best time:  ${currentBestTime[0]} minutes and ${currentBestTime[1]} seconds!`)
        }
    }   
    ,[dice])
    
    // functions
    function AllNewDice(){
        // returns an array of 10 dice
        const diceArr = []
        for (let i=0; i<10; i++){
            diceArr[i] = generateDie()
        }
        return diceArr
    }

    function generateDie(){
        return {
            id: nanoid(),
            value: Math.ceil(Math.random(10)*6),
            isHeld: false,
        }
    }

    function handleClick(){
        // roll new dice
        if (!tenzies && timer){
            setDice(oldState => oldState.map(die => {
                if(!die.isHeld){
                    return(generateDie())
                }
                return die
            }))
            setRolls(oldState => oldState + 1)
        } 
        // start game
        else if (!tenzies && !timer){
            setTimer(true)
        }
        // reset game
        else {
            setDice(AllNewDice())
            setTenzies(false)
            setRolls(0)
            setCounter(0)
            setTimer(true)
        }
    }
    
    function holdDice(id){
        setDice(oldState => oldState.map(die => {
            if (die.id === id){
                return {
                    ...die,
                    isHeld: !die.isHeld
                }
            }
            return die
        })
    )}

    const DiceElements = dice.map(die => {
        return (<Die 
            key={die.id}
            holdDice = {()=> holdDice(die.id)}
            value={die.value}
            isHeld={die.isHeld}
        />)
    })

    //************************************************** */
    function twoDigit(num){
        const text =  num <= 9? '0'+ num : num
        return text
       } 

    // run tracker only when timer changes
    useEffect(()=> {
        if(timer) {
             tracker = setInterval(()=> setCounter(prev => prev +1), 1000);
        }
        return ()=> {
            clearInterval(tracker)
        }
    }, [timer])

    //*********************************************** ************/
    // use localstorage to update best time
    function bestTime(mins, secs){
        // do we have a current key in LS? if not, set one
        if (!localStorage.getItem('time')){
            localStorage.setItem('time', JSON.stringify([mins, secs]))
        }
        else { // we compare the current best time with key from LS
            const prev = JSON.parse(localStorage.getItem('time'))
            const latestTime = [mins, secs]
            if (latestTime[0] < prev[0]){
                localStorage.setItem('time', JSON.stringify(latestTime))
            }
            else if (latestTime[0] == prev[0] && latestTime[1] < prev[1]){
                localStorage.setItem('time', JSON.stringify(latestTime))
            }
        }
        // we return bestTime as an array
        return JSON.parse(localStorage.getItem('time'))
    }
    
    return (
        <main>
            <h1 id={tenzies?'won-state':''}> {tenzies? 'YOU WON!': 'Tenzies'}</h1>
            {tenzies &&
            <p>{myBestTimeText }</p>
            }
            <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div id='dice-container'>
                {DiceElements}
            </div>
            <h3 id='rolls'><span>Rolls: {rolls}</span> Time:{` ${twoDigit(Math.floor(counter/60)).toString()} : ${twoDigit(counter%60).toString()}`}</h3>
            <button id='btn' onClick={handleClick}>{tenzies? 'New Game': timer? 'Roll':'Start'}</button>
            
        </main>
    )
}