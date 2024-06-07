import { useState } from 'react';

const Button = ({handleClick,text}) => {

  return(
    <div>  
      <button onClick={handleClick}> {text} </button>
    </div>
  )
};

const Anecdotes = ({title,text, vote}) => {

  return(
    <div>
      <h2>{title}</h2>
      <p>{text}</p>
      <p> Has {vote} votes</p>
      </div>
  )
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(new Array(anecdotes.length).fill(0));

  const lenAnecdotes = anecdotes.length
  console.log(lenAnecdotes)
  
  const handleAnecdote = () => {
    const newAnecdote = Math.floor(Math.random() * lenAnecdotes);
    setSelected(newAnecdote)
  };
 
  const handleVote = () => {
    const anecdotesVotes = [...vote];
    anecdotesVotes[selected] += 1;

    setVote(anecdotesVotes);
  };

  console.log(vote)

 const getMaxVotes = () => {
    const maxVoteIndex = vote.indexOf(Math.max(...vote));
    return maxVoteIndex;
  };

  return (
    <div>
      <Anecdotes title="Anecdote of the day" text={anecdotes[selected]} vote={vote[selected]}/>
      <Button handleClick={handleAnecdote} text= "Next Anecdote"/>
      <Button handleClick={handleVote} text= "Vote"/>
      <Anecdotes title="Anecdote with most votes" text={anecdotes[getMaxVotes()]} vote={vote[getMaxVotes()]} />

    </div>

  )
}

export default App