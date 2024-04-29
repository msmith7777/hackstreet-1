import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import '../cssFiles/FindHome.css';
import houseListings from '../data/houseListings.json';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';


const API_KEY = "Wxjc846YDgHe8OcA9A7J7dHj8EH9UnIb";

function FindHome() {

  //data from prev page
  const { zipCodes } = useParams();
  const { city } = useParams();
  const { state  } = useParams();

  //dropdowns
  const [forSale, setForSale] = useState(false)
  const [price, setPrice] = useState(false)
  const [bedBath, setBedBath] = useState(false)
  const [homeType, setHomeType] = useState(false)
  const [hosDis, setHosDis] = useState(false)
  const [transport, setTransport] = useState(false)

  //dropdown text
  const [selectedSaleOption, setSelectedSaleOption] = useState('For Sale');
  const [priceButtonText, setPriceButtonText] = useState('Price');
  const [bedBathText, setBedBathText] = useState('Beds + Baths');
  const [selectedHomeOption, setSelectedHomeOption] = useState('Home Type');
  const [hospitalText, setHospitalText] = useState('Hospital Distance');
  const [transportText, setTransportText] = useState('Public Transportation')

  //variables
  const [minimum, setMinimum] = useState('');
  const [maximum, setMaximum] = useState('');
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [hospitalDistance, setHospitalDistance]= useState("");


  const mapElement = useRef();
  const [map, setMap] = useState(null);

  const [marker, setMarker] = useState(null);

  const updateMap = () => {

    if (marker) {
      marker.remove();
    }

    const url = `https://api.tomtom.com/search/2/structuredGeocode.json?key=${API_KEY}&countryCode=US&postalCode=${zipCodes}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        
        //Centerin de Map
        const { lat, lon } = data.results[0].position;
        setLatitude(lat);
        setLongitude(lon);

        map.setCenter([lon, lat]);

        //csv tings
        const filteredListings = houseListings.filter(listing => listing.Zipcode == zipCodes);
        setFilteredListings(filteredListings);

        filteredListings.forEach(listing => {
          const { Latitude, Longitude} = listing;
          const marker = new tt.Marker().setLngLat([Longitude, Latitude]).addTo(map);
          setMarker(marker);
        });
 
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {

    const url = `https://api.tomtom.com/search/2/structuredGeocode.json?key=${API_KEY}&countryCode=US&postalCode=${zipCodes}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {

        const { lat, lon } = data.results[0].position;

        let map = tt.map({
          key: API_KEY,
          container: mapElement.current,
          center: [lon, lat],
          zoom: 10
        });
        setMap(map);
      });
  }, []); 

  const changeMax = (event) => {
    let value = event.target.value;
    if (!value.startsWith('$')) {
      value = '$' + value;
    }
    setMaximum(value);
  };

  const changeMin = (event) => {
    let value = event.target.value;
    if (!value.startsWith('$')) {
      value = '$' + value;
    }
    setMinimum(value);
  };

  const changeHosDist = (event) => {
    let value = event.target.value;
    setHospitalDistance(value);
  };

  const priceRange = () => {
    setPriceButtonText(`${minimum} - ${maximum}`);

    if (minimum == '$' || maximum == '$') {
      setPriceButtonText(`Price`);
    }

    else if (minimum && maximum) {
      setPriceButtonText('${minimum} - ${maximum}');
    } 
    
    else if (minimum) {
      setPriceButtonText(`${minimum}+`);
    } 
    
    else if (maximum) {
      setPriceButtonText(`Up To ${maximum}`);
    } 
  };

  const hospitalFilter = () => {
    if (hospitalDistance == '') {
      setHospitalText(`Hospital Distance`)
    }
    if (hospitalDistance) {
      setHospitalText(`Up to ${hospitalDistance} miles from Hospital`)
    }
  }

  const bedButton = (buttonId) => {
    setBeds(buttonId);
  };
  
  const bathButton = (buttonId) => {
    setBaths(buttonId);
  };

  const bedBathEnter = () => {
    if (beds && baths) {
      setBedBathText( `${beds}+ Bed, ${baths}+ Bath`);
    }
    else if(beds) {
      setBedBathText(`${beds}+ Beds`)
    }
    else if(baths) {
      setBedBathText(`${baths}+ Baths`)
    }
  };

  const closeAllDropdowns = () => {
    setForSale(false);
    setBedBath(false);
    setPrice(false);
    setHomeType(false);
    setHosDis(false);
    setTransport(false);
  };

  return (
    <div className="homeBody">
      <Header />
      <div class="mapTextDiv">
        <div ref={mapElement} className="mapContainer" /> 

        <div class="findText">
          <p class="cityState"><b>Houses and Real Estate Properties Near {city}, {state}</b></p>

          <div className="optionNorm">
          
          <div className="dropdown">
            <div className="dropdown-btn" onClick={(e) => { closeAllDropdowns(); setForSale(!forSale); }}> {selectedSaleOption}
            <FontAwesomeIcon icon={faCaretDown} /></div>
            {forSale && (
              <div className="dropdown-content sale" style={{ zIndex: 1 }}>
                <div className="dropdown-item saleItem">
                  <label>
                    <input type="radio" value="For Sale" checked={selectedSaleOption === 'For Sale'} onChange={(e) => setSelectedSaleOption(e.target.value)}/> For Sale
                  </label>
                </div>
                
                <div className="dropdown-item saleItem">
                  <label>
                    <input type="radio" value="For Rent" checked={selectedSaleOption === 'For Rent'} onChange={(e) => setSelectedSaleOption(e.target.value)}/> For Rent
                  </label>
                </div>
            </div>
            )}
          </div>

          <div className="dropdown">
            <div className="dropdown-btn bedsYBath" onClick={(e) => { closeAllDropdowns(); setBedBath(!bedBath); }}  > {bedBathText}
            <FontAwesomeIcon icon={faCaretDown} /></div>
            
            {bedBath && (
              <div className="dropdown-content bedsContent" style={{ zIndex: 1 }}>

                <div className="bedButtons priceTextInput max">
                  <div className="dropdown-item priceID bed">Beds: </div>
                  <button className={`numButton ${beds === '1' ? 'active' : undefined}`} onClick={() => bedButton('1')}> 1+ </button>
                  <button className={`numButton ${beds === '2' ? 'active' : undefined}`} onClick={() => bedButton('2')}> 2+ </button>
                  <button className={`numButton ${beds === '3' ? 'active' : undefined}`} onClick={() => bedButton('3')}> 3+ </button>
                  <button className={`numButton ${beds === '4' ? 'active' : undefined}`} onClick={() => bedButton('4')}> 4+ </button>
                  <button className={`numButton ${beds === '5' ? 'active' : undefined}`} onClick={() => bedButton('5')}> 5+ </button>
                </div>
              
              <div className="bedButtons priceTextInput max">
                  <div className="dropdown-item priceID">Baths: </div>
                  <button className={`numButton ${baths === '1' ? 'active' : undefined}`} onClick={() => bathButton('1')}> 1+ </button>
                  <button className={`numButton ${baths === '1.5' ? 'active' : undefined}`} onClick={() => bathButton('1.5')}> 1.5+ </button>
                  <button className={`numButton ${baths === '2' ? 'active' : undefined}`} onClick={() => bathButton('2')}> 2+ </button>
                  <button className={`numButton ${baths === '3' ? 'active' : undefined}`} onClick={() => bathButton('3')}> 3+ </button>
                  <button className={`numButton ${baths === '4' ? 'active' : undefined}`} onClick={() => bathButton('4')}> 4+ </button>
                </div>

                
              <button className="bedBathEnter" onClick={bedBathEnter}>Enter</button>
            </div>
            )}
          </div>

          <div className="dropdown">
            <div className="dropdown-btn priceButt" onClick={(e) => { closeAllDropdowns();  setPrice(!price); }} > {priceButtonText}
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
            
            {price && (
              <div className="dropdown-content priceContent" style={{ zIndex: 1 }}>
              <div className="priceTextInput max">
                <div className="dropdown-item priceID">Minimum: </div>
                <input 
                  inputMode="number"
                  name="Minimum"
                  value={minimum}
                  onChange={changeMin}
                  className="min"
                  placeholder='Enter Minimum Price'
                />
              </div>
              
              <div className="priceTextInput max">
                <div className="dropdown-item priceID">Maximum: </div>
                <input 
                    inputMode="number"
                    name="Maximum"
                    value={maximum}
                    onChange={changeMax}
                    className="min"
                    placeholder='Enter Maximum Price'
                  />
                </div>
                
                <button className="priceEnter" onClick={priceRange}>Enter</button>
            </div>
            )}
          </div>

          <div className="dropdown">
            <div className="dropdown-btn" onClick={(e) => { closeAllDropdowns();  setHomeType(!homeType); }} >{selectedHomeOption}
            <FontAwesomeIcon icon={faCaretDown} /></div>
            {homeType && (
              <div className="dropdown-content sale" style={{ zIndex: 1 }}>
                <div className="dropdown-item saleItem">
                  <label>
                    <input type="radio" value="House" checked={selectedHomeOption === 'House'} onChange={(e) => setSelectedHomeOption(e.target.value)}/> House
                  </label>
                </div>
                
                <div className="dropdown-item saleItem">
                  <label>
                    <input type="radio" value="Townhouse" checked={selectedHomeOption === 'Townhouse'} onChange={(e) => setSelectedHomeOption(e.target.value)}/> Townhouse
                  </label>
                </div>

                <div className="dropdown-item saleItem">
                  <label>
                    <input type="radio" value="Condo" checked={selectedHomeOption === 'Condo'} onChange={(e) => setSelectedHomeOption(e.target.value)}/> Condo
                  </label>
                </div>

                <div className="dropdown-item saleItem">
                  <label>
                    <input type="radio" value="Multi-Family" checked={selectedHomeOption === 'Multi-Family'} onChange={(e) => setSelectedHomeOption(e.target.value)}/> Multi-Family
                  </label>
                </div>

                <div className="dropdown-item saleItem">
                  <label>
                    <input type="radio" value="Apartment" checked={selectedHomeOption === 'Apartment'} onChange={(e) => setSelectedHomeOption(e.target.value)}/> Apartment
                  </label>
                </div>

            </div>
            )}
          </div>
          
          </div>

          <div className="optionNew">
          
          <div className="dropdown">
            <div className="dropdown-btn hosButt" onClick={(e) => { closeAllDropdowns();  setHosDis(!hosDis); }} > {hospitalText}
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
            
            {hosDis && (
              <div className="dropdown-content" style={{ zIndex: 1 }}>
              <div className="priceTextInput max">
                <div className="dropdown-item priceID">Distance: </div>
                <input 
                  inputMode="number"
                  name="hospitalDistance"
                  value={hospitalDistance}
                  onChange={changeHosDist}
                  className="min"
                  placeholder='Enter Maximum Distance'
                />
              </div>
                
                <button className="priceEnter" onClick={hospitalFilter}>Enter</button>
            </div>
            )}
          </div>

          <div className="dropdown">
            <div className="dropdown-btn transport" onClick={(e) => { closeAllDropdowns();  setTransport(!transport); }} > {transportText}
            <FontAwesomeIcon icon={faCaretDown} /></div>
            {transport && (
              <div className="dropdown-content transportContent" style={{ zIndex: 1 }}>
                <div className="dropdown-item saleItem">
                  <label>
                    <input type="radio" value="Public Transportation is Important" checked={transportText === 'Important'} onChange={(e) => setTransportText(e.target.value)}/> Important
                  </label>
                </div>
                
                <div className="dropdown-item saleItem">
                  <label>
                    <input type="radio" value="Public Transportation is Not Important" checked={transportText === 'Not Importsnt'} onChange={(e) => setTransportText(e.target.value)}/> Not Important
                  </label>
                </div>
            </div>
            )}
          </div>
          
          </div>

        </div>
      </div>
    </div>
  );
}

export default FindHome;