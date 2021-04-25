import React, { Component, useState } from 'react';
import { useCurrentUser } from '@/hooks/index';
import Slider from 'react-input-slider';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import GPSicon from "../svg/gps"
import NoGpsIcons from "../svg/Gpsno"
import Cloudy from "../svg/cloudy"
import Scattered from "../svg/scattered"
import CloudyWindy from "../svg/cloudyWindy"
import PartlyCloudy from "../svg/partlyCloudy"
import Sunny from "../svg/sunny"
import Thunderstorms from "../svg/tstorms"
import Windy from "../svg/windy"
import Snow from "../svg/snow"
import Rain from "../svg/rain"
import Fire from "../svg/fire"
import Smoke from "../svg/smoke"

export default function PostEditor() {
  const lat = localStorage.getItem('Latitude');
  const lon = localStorage.getItem('Longitude');
  const [user] = useCurrentUser();
  const [msg, setMsg] = useState(null);
  const [state, setState] = useState({ x: 55});
  const [size, setSize] = useState({ x: 16});
  const [water, setWater] = useState({ x: 55});
  const [startdate, setStartDate] = useState(new Date());
  const [fly, setFly] = useState(null);
  const [location, setLocation] = useState(null);
  const [cfs, setCfs] = useState(null);
  const [river, setRiver] = useState(null);
  const Lattitude = localStorage.getItem('Latitude');
  const Longitude = localStorage.getItem('Longitude');
  const c  = (state.x - 32) * 5/9
  const wc  = (water.x - 32) * 5/9
  const l = ( size.x / 0.39370) 
  const [weather, setWeather] = useState("Sunny");

  if (!user) {
    return (
      <div>
        Please sign in to post
      </div>
    );
  }


  const onCfs = (event) => {
    setCfs(event.target.value);
  };
  const onChange = (event) => {
    setFly(event.target.value);
  };

  const onLocation = (event) => {
    // sets the state property for the location
    setLocation(event.target.value);
  };
  const onRiver = (event) => {
    // sets the state property for the location
    setRiver(event.target.value);
  };



  async function hanldeSubmit(e) {
    e.preventDefault();
    window.scrollTo(0, 0);
    const body = {
      startdate: e.currentTarget.startdate.value,
      location: e.currentTarget.location.value,
      weather: e.currentTarget.weather.value,
      AirTemp: e.currentTarget.AirTemp.value,
      content: e.currentTarget.content.value,
      lat: e.currentTarget.lat.value,
      lon: e.currentTarget.lon.value,
      algae: e.currentTarget.algae.value,
      temperature: e.currentTarget.temperature.value,
    };

    if (!e.currentTarget.content.value) return;
    e.currentTarget.content.value = '';
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      setMsg('Thank you, your data has been added');
      setTimeout(() => setMsg(null), 10000);
    }
  }
  return (
    <div className="container">
    <div>
      <form onSubmit={hanldeSubmit} autoComplete="off">
        <span className="alert">{msg}</span>
    <div className="header">
    <p>Posting as: <b>{user ? user.name : null}</b></p>
    </div>
    <h2>Date</h2>
   <section className="location">
     <div className="block">
     <h3>Choose Date and Time:</h3>
        <DatePicker selected={startdate} onChange={date => setStartDate(date)}
        showTimeSelect
          dateFormat="Pp"/>
   <div className="hidden">
        <input 
          name="startdate"
          type="text"
          value={new Date(startdate).toLocaleString()}
        />
   </div>
   <div>
   
    </div>
     </div>
</section>
<h2>Location:</h2>
<section className="location">
  <h3>Select Location:</h3>
    <div className="block">
        <select name="location">
          <option value="Roaring Fork River - Upstream of Aspen">Roaring Fork River - Upstream of Aspen</option>
          <option value="Roaring Fork River - Aspen - Carbondale">Roaring Fork River - Aspen - Basalt</option>
          <option value="Roaring Fork River - Carbondale to Mouth">Roaring Fork River - Carbondale to Mouth</option>
          <option value="Fryingpan River above Reudi">Fryingpan River above Reudi</option>
          <option value="Fryingpan River below Reudi">Fryingpan River below Reudi</option>
          <option value="Crystal River usptream of Marble">Crystal River usptream of Marble</option>
          <option value="Crystal River Marble to Redstone">Crystal River Marble to Redstone</option>
          <option value="Crystal River Redstone to Mouth">Crystal River Redstone to Mouth</option>
          <option value="Maroon Creek">Maroon Creek</option>
          <option value="Castle Creek">Castle Creek</option>
          <option value="Snowmass Creek">Snowmass Creek</option>
          <option value="Cattle Creek">Cattle Creek</option>
          <option value="Colorado River Near Glenwood Springs">Colorado River Near Glenwood Springs</option>
          <option value="No Name Creek">No Name Creek</option>
        </select> 
        </div>
        <h3>Your current location:</h3>
   <div className="col-2l">
     <div className="center">Lat</div>
     <div>
       <input 
        name="lat"
        type="text"
         value={Lattitude}
      /></div>
   </div>
   <div className="col-2l">
     <div className="center">Lon</div>
     <div>
     <input 
        name="lon"
        type="text"
        value={Longitude} 
        />
     </div>
   </div>
   <div>
            <p><b>Note </b>Use the values already provided unless your sample location and your current location differ. In this case, use the GPS coordinates you noted from your sample location.</p>
            <p>If the <b>Lat</b> and <b>Lon</b> fields are blank, please enter your gps position or allow your web browser to access your location and then re-load this page.</p>
            <p>Safari on iPhone users will need to use Chrome, or Firefox to allow automatic geolocation. </p>
            <p>If manually entering your GPS location, please note the following:</p>
            <ul>
              <li>
              <p>The GPS format to enter should resemble <b>Lat:</b> <span className="emphasis">39.123456</span> <b>Lon:</b> <span className="emphasis">-107.123456</span></p>
              </li>
              <li><p>Do not use degrees and seconds, your location will not appear on our maps.</p></li>
            </ul>
    </div>
        <div>
        </div>
</section>
          <h2>Weather Conditions</h2>
        <section className="location">
        <div className="block">
        <input
        className="hidden"
            name="weather"
            type="text"
            placeholder={weather}
            value={weather}
          />

          <h3>Weather:</h3>
          {weather === "Sunny" && <Sunny style="weather_icon"/>}
          {weather === "PtCLD" && <PartlyCloudy  style="weather_icon" />}
          {weather === "Cld" && <Cloudy style="weather_icon" />}
          {weather === "CldWind" && <CloudyWindy style="weather_icon"/>}
          {weather === "Rain" && <Rain style="weather_icon"/>}
          {weather === "Scattered" && <Scattered style="weather_icon" />}
          {weather === "Wind" && <Windy  style="weather_icon" />}
          {weather === "ScatteredTStorm" && <Thunderstorms  style="weather_icon"/>}
          {weather === "Snow" && <Snow  style="weather_icon"/>}
          {weather === "Fire" && <Fire  style="weather_icon_alert"/>}
          {weather === "Smoke" && <Smoke  style="weather_icon"/>}
          <div className="grid-ish">

  <div className="center weather_button">
    <div>  <Sunny style="small_icon"/></div>
    <div onClick={() => setWeather("Sunny")}>Sunny</div>
  </div>
  <div className="center weather_button">
    <div>  <PartlyCloudy style="small_icon"/></div>
    <div onClick={() => setWeather("PtCLD")}>Partly Cloudy</div>
  </div>
  <div className="center weather_button">
    <div>  <Cloudy style="small_icon"/></div>
    <div onClick={() => setWeather("Cld")}>Cloudy</div>
  </div>
  <div className="center weather_button">
    <div>  <CloudyWindy style="small_icon"/></div>
    <div onClick={() => setWeather("CldWind")}>Cloudy Windy</div>
  </div>
  <div className="center weather_button">
    <div>  <Windy style="small_icon"/></div>
    <div onClick={() => setWeather("Wind")}>Windy</div>
  </div>

  <div className="center weather_button">
    <div>  <Rain style="small_icon"/></div>
    <div onClick={() => setWeather("Rain")}>Rain</div>
  </div>
  <div className="center weather_button">
    <div>  <Scattered style="small_icon"/></div>
    <div onClick={() => setWeather("Scattered")}>Scattered Showers</div>
  </div>
  <div className="center weather_button">
    <div>  <Thunderstorms style="small_icon"/></div>
    <div onClick={() => setWeather("ScatteredTStorm")}>Thunderstorms</div>
  </div>
  <div className="center weather_button">
    <div>  <Fire style="small_icon"/></div>
    <div onClick={() => setWeather("Fire")}>Fire</div>
  </div>
  <div className="center weather_button">
    <div>  <Smoke style="small_icon"/></div>
    <div onClick={() => setWeather("Smoke")}>Smoke</div>
  </div>
</div>

    <div className="block">
       <h3>Air Temerature:</h3>
        <p>{state.x}<sup>º</sup>F ~ {c.toFixed(0)}<sup>º</sup>C</p>
    </div>
    <div> 
        <Slider
        className="slider"
        axis="x"
        xstep={1}
        xmin={0}
        xmax={110}
        x={state.x}
        onChange={({ x }) => setState({ x: parseFloat(x.toFixed(2)) })}
      />
    </div>
          <div className="hidden">
         <input
            name="AirTemp"
            type="text"
            required="true"
            value={state.x}
          />
         </div>
         <div>
         <div className="block">
           <h3>Water Temperature:</h3>
          {water.x}<sup>º</sup>F ~ {wc.toFixed(0)}<sup>º</sup>C
           </div>
         <div>
           <Slider
              axis="x"
              xstep={1}
              xmin={32}
              xmax={100}
              x={water.x}
              onChange={({ x }) => setWater({ x: parseFloat(x.toFixed(2)) })}
            />
    </div>

         <div className="hidden">
      <input
            name="temperature"
            type="text"
            placeholder={water.x}
            value={water.x}
            required="true"
          />
          </div>
        </div>
        </div>
        </section>
        <section>
          <h2>Algae Observation</h2>
          <select name="algae">
            <option value="Minimal algae">Very little or no algae</option>
            <option value="Algae present in the shallows">Algae in the shallow water</option>
            <option value="Algae present in deeper water">Algae in deeper water</option>
            <option value="Abundant algae">Abundant algae</option>
            <option value="Drifting clumps of algae">Drifting clumps of algae</option>
            <option value="Bright green slime">Bright green slime</option>
            <option value="Foul oder">Foul Oder</option>
          </select>
        </section>
    
        <section>
          <h2>Notes:</h2>
          <div>
          <textarea
            name="content"
            rows="4"
            cols="50"
            required="false"
            placeholder="Please describe the area that you sampled..."
          />
        </div>
        </section>
        
        <button type="submit">Add</button>
      </form>
    </div>
    </div>
  );
}
