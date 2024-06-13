import Part from "./part";

const Parts = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <div key={part.id}>
          <Part part={part} />
        </div>
      ))}
    </div>
  );
};

export default Parts;
