import React, { useState, useEffect } from 'react'
import './App.css';

function App() {
  const [gameTitle, setGameTitle] = useState("");
  const [searchedGames, setSearchedGames] = useState([]);
  const [topDeals, setTopDeals] = useState([])
  function searchForGames() {
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=3`)
      .then(res => res.json())
      .then(data => { setSearchedGames(data) })
  }

  useEffect(() => {
    fetch(`https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15&upperPrice=20&pageSize=3`)
      .then(res => res.json())
      .then(data => { setTopDeals(data) })
  }, [])
  return (
    <div className="App">

      <div className="searchSection">
        <h1>Search for a Game</h1>
        <input type="text" className="textBox"onChange={(event) => { setGameTitle(event.target.value) }} placeholder="minecraft..." />
        <button onClick={() => { searchForGames() }} className="searchBtn">Click to Search</button>
        <div className='searchedGamesList'>
          {searchedGames && searchedGames.map((game, key) => {
            return <div key={key} className="searchGame">
              <h1>{game.external}</h1>
              <img src={game.thumb} />
              <p>Cheapest Price:  $<b>{game.cheapest}</b></p>
            </div>
          })}
        </div>
      </div>
      <div className="dealsSection">
        <h1>This is deals section</h1>
        <div className='topDealsList'>
          {topDeals && topDeals.map((game, key) => {
            return <div key={key} className="topDeal">
              <h1>{game.internalName}</h1>
            <div className='normalPrice'> Normal Price:<p><b>{game.normalPrice}</b></p>  Offer Price:<p>{game.salePrice}</p></div> 
             
              Savings:<p><b>{game.savings}</b></p>

              <img src={game.thumb} />
            </div>
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
