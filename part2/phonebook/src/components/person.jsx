const Person = ({ person, removePerson }) => {
  return(
  <div>
    <p>{person.name} {person.number}</p>
    <button onClick={removePerson}> Delete</button>
  </div> 
  )
}

export default Person;