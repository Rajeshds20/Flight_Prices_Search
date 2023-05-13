import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';

function App() {

  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");

  const [cities, setCities] = useState([]);
  const [flights, setFlights] = useState([]);
  const [searched, setSearched] = useState(false);


  const handleSelect1 = (e) => {
    setSelectedOption1(e.target.value);
  };

  const handleSelect2 = (e) => {
    setSelectedOption2(e.target.value);
  };


  useEffect(() => {

    axios.get("http://localhost:5000/cities").then((response) => {
      setCities(response.data);
    });
  }, []);


  const handleSearch = () => {
    if (selectedOption1 === "" || selectedOption2 === "") {
      alert("Please select both the options");
      return;
    }
    setSearched(true);
    axios.post("http://localhost:5000/flights/search/", {
      from: selectedOption1,
      to: selectedOption2
    }).then((response) => {
      console.log(response.data);
      setFlights(response.data);
    });
  };


  return (
    <div className="App">
      <h1 style={{ color: "blueviolet" }}> Flight Price Finder</h1 >
      <h4 style={{ color: "blueviolet" }}>Find the best flight deals</h4>
      <h4 style={{ color: "blueviolet" }}>Search for flights</h4>

      <label htmlFor="options1" style={{ fontSize: "24px", color: "Green" }}>From: </label>
      <select style={{ borderRadius: "10px", fontSize: "24px" }} required id="options1" value={selectedOption1} onChange={handleSelect1}>
        <option value="">--Please choose an option--</option>
        {
          cities.map((city, index) => {
            return (
              <option key={index} value={city}>{city}</option>
            );
          })
        }
      </select>
      <br />
      <br />

      <label htmlFor="options2" style={{ fontSize: "24px", color: "Red" }}>To: </label>
      <select style={{ borderRadius: "10px", fontSize: "24px" }} required id="options2" value={selectedOption2} onChange={handleSelect2}>
        <option value="">--Please choose an option--</option>
        {
          cities.map((city, index) => {
            return (
              <option key={index} value={city}>{city}</option>
            );
          })
        }
      </select>
      <br />
      <br />

      <button onClick={handleSearch} style={{ cursor: "pointer", color: "blue", backgroundColor: "biege" }}><h2 style={{ margin: "0px" }}>Search</h2></button>
      <br />
      <br />

      {
        searched && (
          flights.length !== 0 ? (
            <div>
              <h2 style={{ color: "green" }}>Available Flights :</h2>

              <table align='center' style={{ border: "1px solid black", fontSize: "24px", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ width: "20%", border: "1px solid black", borderCollapse: "collapse" }}>Flight No.</th>
                    <th style={{ width: "20%", border: "1px solid black", borderCollapse: "collapse" }}>From</th>
                    <th style={{ width: "20%", border: "1px solid black", borderCollapse: "collapse" }}>To</th>
                    <th style={{ width: "20%", border: "1px solid black", borderCollapse: "collapse" }}>Service</th>
                    <th style={{ width: "20%", border: "1px solid black", borderCollapse: "collapse" }}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    flights.map((flight, index) => {
                      return (
                        <tr key={index}>
                          <td style={{ border: "1px solid black", borderCollapse: "collapse" }}>{Math.floor(Math.random() * 100000)}</td>
                          <td style={{ border: "1px solid black", borderCollapse: "collapse" }}>{flight.from}</td>
                          <td style={{ border: "1px solid black", borderCollapse: "collapse" }}>{flight.to}</td>
                          <td style={{ border: "1px solid black", borderCollapse: "collapse" }}>{flight.service}</td>
                          <td style={{ border: "1px solid black", borderCollapse: "collapse" }}>{flight.price}</td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          )
            : (
              <div>
                <h3 align="center" style={{ color: "red" }}>No Flights Available Right Now</h3>
              </div>
            )
        )
      }
    </div >
  );
}

export default App;
