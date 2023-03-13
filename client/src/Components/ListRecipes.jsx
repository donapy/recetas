const ListRecipes = (props) => {
  return (
    <ul>
      {props.searchResults.map((result) => (
        <li key={result.id}>{result.title}</li>
      ))}
    </ul>
  );
};

export default ListRecipes;
