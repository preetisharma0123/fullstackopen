import { useState, useEffect } from 'react';
import Person from './components/person.jsx';
import Filter from './components/filter.jsx';
import PhonebookForm from './components/phonebookForm.jsx';
import phonebookService from './services/phonebook';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterValue, setFilter] = useState('');

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialData => {
        setPersons(initialData);
      });
  }, []);

  const namesToShow = filterValue
    ? persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))
    : persons;

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const newPersonName = (event) => {
    setNewName(event.target.value);
  };

  const newPersonNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    };

    if (persons.some(person => person.name === newPerson.name)) {
      alert(`${newName} is already added to phonebook`);
    } else if (persons.some(person => person.number === newPerson.number)) {
      alert(`${newNumber} is already added to phonebook`);
    } else {
      phonebookService.create(newPerson)
        .then((returnedPerson) => {
          console.log('Person added:', returnedPerson);
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
        })
    }
  };

  //delete phonebook record
  const removePersonOf = (id,name) =>{
    if (window.confirm(`Do you really want to delete ${name}?`)){
      phonebookService
      .deletePerson(id)
      .then((returnedData) => {
        setPersons(persons.filter(person => person.id !==id));
        console.log("Deleted")
      })
    }

  }


  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter value={filterValue} onChange={handleFilterChange} />

      <PhonebookForm 
        onSubmit={handleClick}
        newName={newName}
        newPersonName={newPersonName}
        newNumber={newNumber}
        newPersonNumber={newPersonNumber}
      />
      <h2>Numbers</h2>
      <ul>
        {namesToShow.map(person => 
          <Person 
            key={person.id} 
            person={person} 
            removePerson={()=>removePersonOf(person.id,person.name)}
            />
        )}
      </ul>
    </div>
  );
};

export default App;
