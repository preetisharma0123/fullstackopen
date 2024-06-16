import { useState, useEffect } from 'react';
import Person from './components/person.jsx';
import Filter from './components/filter.jsx';
import PhonebookForm from './components/phonebookForm.jsx';
import phonebookService from './services/phonebook';
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterValue, setFilter] = useState('');
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    phonebookService.getAll().then((initialData) => {
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


  // add person to phonebook
  const handleClick = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    //validate that the person's name and number exists
    const nameAndNumberExists = persons.find(
      (person) =>
        person.name === personObject.name &&
        person.number === personObject.number
    );

    //validate that the person's name exists
    const personNameExists = persons.find(
      (person) => person.name === personObject.name
    );

    //validate that the person's number exists
    const personNumberExists = persons.find(
      (person) => person.number === personObject.number
    );

    const confirmUpdate = (person) => {
      if (
        window.confirm(
          `${personNameExists.name} is already added to phonebook, do you want to replace the old number ${personNameExists.number} with this new one?`
        )
      ) {
        phonebookService
          .update(personNameExists.id, personObject)
          .then((returnedData) => {
            setPersons(
              persons.map((person) =>
                person.id !== returnedData.id ? person : returnedData
              )
            );
            setMessage(`Updated ${returnedData.name}'s number`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setErrorMessage(
              `${error.message} - Information of '${person.name}' has already been removed from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            setPersons(persons.filter((p) => p.id !== person.id));
          });
      }
    };

    // check if name and number exists and show alert
    nameAndNumberExists
      ? alert(
          `${nameAndNumberExists.name} is already added to phonebook with number ${nameAndNumberExists.number}`
        )
      : personNumberExists && personNameExists
      ? alert(
          `${personNumberExists.name} is already added to phonebook with number ${personNumberExists.number}`
        )
      : // check if only the number already exists and show alert
      !personNameExists && personNumberExists
      ? alert(
          `${personNumberExists.name} is already added to phonebook with number ${personNumberExists.number}`
        )
      : // update existing record if only the name exists
      personNameExists && !personNumberExists
      ? confirmUpdate(personNameExists)
      : // create new record if new record does not exist
        phonebookService
          .create(personObject)
          .then((returnedData) => {
            setPersons(persons.concat(returnedData));
            setMessage(`Added ${returnedData.name}`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            console.log(error.response.data.error);
            setErrorMessage(`${error.response.data.error}`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
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
