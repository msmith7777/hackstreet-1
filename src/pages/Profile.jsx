import React, { useState, useEffect } from "react";
import HeaderShift from "../components/HeaderShift";
import "../cssFiles/Profile.css";
import "../App.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Profile() {
  const [favoriteHouses, setFavoriteHouses] = useState([]);
  const savePrice = () => {};
  const saveWalkscore = () => {};
  const [scores, setScore] = useState([]);

//Accesses the list of favorite houses top be used in the profile.
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favoriteHouses")) || [];
    setFavoriteHouses(favorites);
    sortHousesByPrice();
  }, []);
//Allows for user to remove a house from the favorites on the profile page.
  const removeFromFavorites = (id) => {
    const updatedFavorites = favoriteHouses.filter((house) => house.id !== id);
    setFavoriteHouses(updatedFavorites);
    localStorage.setItem("favoriteHouses", JSON.stringify(updatedFavorites));
  };
//Sorts the list of favorite houses in terms of price.
  const sortHousesByPrice = () => {
    const sortedHouses = [...favoriteHouses].sort((a, b) => a.price - b.price);
    setFavoriteHouses(sortedHouses);
  };
//Calculates "score" of a house with input from the user, and saves that score to a seperate array, keeping track of house IDs,
//and then sorts the list based on score..
const decisionMatrix = () => {
  for (let i = 0; i < favoriteHouses.length; i++) {
  setScore.indexOf(i).setHouse = favoriteHouses.indexOf(i);
  setScore.indexOf(i).setScore = (favoriteHouses.walkscore / 10) * saveWalkscore + 
  (1 - (favoriteHouses.indexOf(i).price - favoriteHouses.indexOf(0).price) / (favoriteHouses.indexOf(favoriteHouses.length - 1).price
   - favoriteHouses.indexOf(0).price)) * 10 * savePrice;
}
const sortedScores = [...scores].sort((a, b) => a.score - b.score);
for (let i = 0; i < favoriteHouses.length; i++) {
  favoriteHouses.indexOf(i) = sortedScores(i).house;
}
}



  return (
    <div className="App">
      <HeaderShift />
      <h1>Please rate the following qualities of your desired house, on a scale from 1-10.</h1>

      <label for="price">Price:</label>
      <input type="number" id ="inputtedPrice" name="price" onChange={savePrice} min = "0" max = "10"></input>
      <label for="walkscore">Walkscore:</label>
      <input type="number" id ="inputtedWalkscore" name="walkscore" onChange={saveWalkscore} min = "0" max = "10"></input>
      <h1>Favorites</h1>
    <button onClick={decisionMatrix}>Sort favorite houses based on preference.</button>
      {favoriteHouses.map((house) => {
  return (
    <div key={house.id}>
      <p>House ID: {house.id}</p>
      <p>ZipCode: {house.zipCodes}</p>
      <p>Price: {house.price}</p>
      <button onClick={() => removeFromFavorites(house.id)}>
        Remove from Favorites
      </button>
    </div>
  );
})}
    </div>
  );
}


export default Profile;
