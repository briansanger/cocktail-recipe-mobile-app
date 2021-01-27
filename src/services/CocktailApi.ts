import axios from "axios";

const baseUrl = "https://www.thecocktaildb.com/api";
const respFormat = "json";
const version = "v1";
const apiKey = "1";

async function getDrinksByIngredients(ingredient: string) {
  return axios
    .get(baseUrl + `/${respFormat}/${version}/${apiKey}/filter.php`, {
      params: {
        i: ingredient
      }
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    })
}

async function getDrinkById(drinkId: string) {
  return axios
    .get(baseUrl + `/${respFormat}/${version}/${apiKey}/lookup.php`, {
      params: {
        i: drinkId
      }
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    })
}

async function getRandomDrink() {
  return axios
    .get(baseUrl + `/${respFormat}/${version}/${apiKey}/random.php`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    })
}

async function getIngredients() {
  return axios
  .get(baseUrl + `/${respFormat}/${version}/${apiKey}/list.php`, {
    params: {
      i: "list"
    }
  })    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    })
}

async function getSearchResults(searchTerm: string) {
  return axios
    .get(baseUrl + `/${respFormat}/${version}/${apiKey}/search.php`, {
      params: {
        s: searchTerm
      }
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    })
}

export { getDrinksByIngredients, getDrinkById, getRandomDrink, getIngredients, getSearchResults };