import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Error } from "./Pages/Error";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { Homepage } from "./Pages/Homepage";
import { Navbar } from "./Components/Navbar";
import { Recipe } from "./Pages/Recipe";
import { MyRecipeNew } from "./Pages/MyRecipeNew";
import { MyRecipes } from "./Pages/MyRecipes";
import { MyRecipeEdit } from "./Pages/MyRecipeEdit";
import { RecipesSaved } from "./Pages/RecipesSaved";

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="register" element={<Register />} />
            <Route path="recipes/:id" element={<Recipe />} />
            <Route path="myrecipes" element={<MyRecipes />} />
            <Route path="myrecipes/new" element={<MyRecipeNew />} />
            <Route path="myrecipes/edit/:id" element={<MyRecipeEdit />} />
            <Route path="recipes/saved" element={<RecipesSaved />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
