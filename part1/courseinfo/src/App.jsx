const Header = (props) => {
  return (
    <div>
      <p>Course: {props.course}</p>
    </div>
  )
}

const Part = (props) => {
  console.log("Part", props)
  return (
    <div> 
      <p>Part: {props.part.name}, Exercises: {props.part.exercises} </p> 
    </div>
    )
}
const Content = (props) => {
  console.log("Content", props)
  return (
    <div> 
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} /> 
 
    </div>
    )
}

const Total = (props) => {
  console.log("total", props)
  return (
    <div> 
      <p>Total: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises } </p> 

    </div>
    )
}

const App = () => {

  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course = {course.name} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
      
    </div>
  )
}

export default App