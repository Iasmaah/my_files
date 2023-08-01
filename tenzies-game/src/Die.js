export default function Die(props){
    return (
        <div 
        className="die-bg" 
        id={props.isHeld? 'die-bg': ''
        } 
        onClick={props.holdDice}
        >
            <h1 className="die-num">
                {props.value}
            </h1>
        </div>
    )
}