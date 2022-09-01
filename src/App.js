import logo from './logo.svg';
import './App.css';
import React,{useEffect,useState} from 'react';
import Recipe from './Recipe'

function App() {

  const APP_ID = '6f67e6ac';
  const APP_KEY = '20f95ee834b25c095517d212502ff002';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query,setQuery] = useState('chicken');

  useEffect(() => {
    getRecipes();
  },[query])
  
  // or we can write like this (async getRecipes(){})
  // any external request that you fertching must make with async await or using .then
  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json()
    setRecipes(data.hits)
    console.log(data.hits)
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('')
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className= "search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        {/* the value will cause the input cannot be write with anything. therefore we are using onChange event in order to let us write anything in the input */}
        <button className='search-button' type="submit">
          Search
        </button>
      </form>
      <div className='recipes'>
        {recipes.map(recipe =>(
          <Recipe 
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
