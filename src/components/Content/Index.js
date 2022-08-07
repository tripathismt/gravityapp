import React, { useRef } from "react";
import stylec from "./Content.module.css";
import drop from './2.png'
import {
  // LoadScript,
  GoogleMap,
  Marker,
  Autocomplete,
  useJsApiLoader,
  DirectionsRenderer,
  
} from "@react-google-maps/api";
import { useState } from "react";

const center = { lat: 28.9, lng: 77 };

 function Content() {
  const {isLoaded , loadError} = useJsApiLoader({
    
    // PLEASE ADD YOUR OWN GOOGLE API KEY

    googleMapsApiKey:"AIzaSyCTa03Ee4VMxdjlK3DxqVEqgWEH6cnz-EA",
    libraries:['places']
  })
  // AIzaSyDgkXjaHoQZLVdGAFiqw79AKedVJ_mFq9Q

   const [distance, setDistance] = useState('')
   const [directionsResponse,setDirectionsResponse]=useState(null)
   const originRef=useRef()
   const destinationref=useRef()

   if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }


   if(!isLoaded){
    return(<div>LOADING.....</div>)
   }

   async function calculateRoute(){
    if(originRef.current.value===''||destinationref.current.value==='')
       return    
     
       // eslint-disable-next-line no-undef
   const directionService=new window.google.maps.DirectionsService()
   // eslint-disable-next-line no-undef
   const results=await direction({
         origin:originRef.current.value ,
         destination:destinationref.current.value,
         // eslint-disable-next-line no-undef
         travelMode:google.maps.TravelMode.DRIVING
   })
  // eslint-disable-next-line no-undef
   setDirectionsResponse(results)
   setDistance(results.routes[0].legs[0].distance.text)

   }



  return (
      <div className={stylec.content}>
        {/* title bar */}
        <div className={stylec.header}>
          <p>
            Let`s calculate <b>distance</b> from google maps
          </p>
        </div>

        {/* container tag  */}
        <div className={stylec.container}>
          <div className={stylec.inputContainer}>
            {/* input container start */}
            <div className={stylec.location}>
              <label htmlFor="">Origin</label>
              <br />
          <Autocomplete>

              <input
                className={stylec.input}
                type="text"
                placeholder="Delhi"
                ref={originRef}
                autoFocus
              />
              
          </Autocomplete>
          <img className={stylec.drop} src={drop} alt='drop' />
            </div>

            <div className={stylec.btndiv}>
              <button className={stylec.btn} onClick={calculateRoute}>calculate</button>
            </div>

            <div className={stylec.location}>
              <label htmlFor="">Destination</label>
              <br />

              <Autocomplete>
                  <input className={stylec.input} type="text" placeholder="Mumbai"  ref={destinationref}/>
              </Autocomplete>
                  <img className={stylec.drop} src={drop} alt='drop' />
            </div>

            <div className={stylec.info}>
              <div className={stylec.data}>
                <div className={stylec.disData}>
                  <div className={stylec.distance}>Distance</div>
                  <div className={stylec.km}>{distance}</div>
                </div>
              </div>

              <div className={stylec.detail}>
                <p>
                  {" "}
                  The Distance between <b>Mumbai</b> and <b>Delhi</b> is{" "}
                  <b>{distance}</b>.{" "}
                </p>
              </div>
            </div>
          </div>

          {/* end of input container */}

          {/* map container */}

          <div className={stylec.mapContainer}>
            {/* <LoadScript> */}
              
            <GoogleMap
                center={center}
                zoom={12}
                mapContainerStyle={{ width: "100%", height: "100%" }}
              >
                <Marker position={center}  />
                {directionsResponse && <DirectionsRenderer/>}
              </GoogleMap>
            {/* </LoadScript> */}
              
          </div>

          {/* map class container end */}
        </div>
      </div>
    
  );
}

export default (Content)
