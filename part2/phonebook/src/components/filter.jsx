const Filter = ({filterValue,handleFilterChange}) => {
  return(
    <div>
        Filter <input value={filterValue} onChange={handleFilterChange} />
      </div>
    )}
export default Filter;