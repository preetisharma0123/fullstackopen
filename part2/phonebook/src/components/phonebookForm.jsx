const PhonebookForm = ({
  onSubmit,
  newName,
  newNumber,
  newPersonName,
  newPersonNumber
}) => {
  return(
    <form onSubmit={onSubmit}>
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