const PhonebookForm = ({
  handleClick,
  newName,
  newNumber,
  newPersonName,
  newPersonNumber
}) => {
  return(
    <form onSubmit={handleClick}>
        <div>
          name: <input value={newName} onChange={newPersonName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={newPersonNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )}
export default PhonebookForm;