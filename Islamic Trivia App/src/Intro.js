export default function Intro({game, startGame}){
    return (
        <div id='intro-div'>
        <h1 id='title'>Islamic Trivia</h1>
        {/* <p>A group game. It's better with a friend!</p> */}
        <button className='styledbtn' id='intro-btn' onClick={startGame}>Start quiz</button>
    </div>
    )
   
}