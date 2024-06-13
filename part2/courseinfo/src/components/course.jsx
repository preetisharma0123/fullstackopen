import Header from "./header";
import Parts from "./parts";
import Total from "./total";

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <Header name={course.name} />
          <Parts parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </div>
  );
}

export default Course;