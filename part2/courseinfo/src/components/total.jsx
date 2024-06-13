const Total = ({parts}) => {
	return (
		<p>
			<strong>Total number of Exercises: </strong>
			{parts.reduce(
				(accumulator, current) => accumulator + current.exercises,
				0
			)}
		</p>
	);
};

export default Total;