const ListRecipes = (props) => {
  console.log(props.searchResults);
  return (
    <ul>
      {props.searchResults.map((result) => (
        <div key={result._id}>
          <h3>{result.name}</h3>
          <div>
            <img
              src={result.image}
              alt="imgrecipe"
              style={{
                width: "200px",
              }}
            />
          </div>
        </div>
      ))}
    </ul>
  );
};

export default ListRecipes;
