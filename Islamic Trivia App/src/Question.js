export default function Question({ question, handleChoiceClick, showAnswers }) {


      function setBackground(choice, question){
        
        if(showAnswers){
          if (choice === question.answer){
            return{backgroundColor: '#7DF9FF'}
          }
          else if (choice === question.selectedChoice){
              return {backgroundColor: '#FFCCCB'}
            }
            return
          } else {
          if(choice === question.selectedChoice){
            return {backgroundColor: '#a4dfe3'}
          }
            return {backgroundColor: '#ebccae97'}
        }
      }


      return (
        <div id='question'>
          <h1 id='question-text'>
          ⇒  {question.question}
          </h1>
          <div id="choices">
            {question.choices.map((choice, index) => (
              <button
              style={setBackground(choice, question)}
              key={index}
              className='choiceButton'
              name={question.questionId}
              value={choice}
              onClick={(e)=> handleChoiceClick(e, question.questionId, choice)}>{choice}</button>
            )
            )}
  
          </div>
        </div>
      )
    }
  
    