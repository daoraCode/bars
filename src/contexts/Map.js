import { createContext, useState, useEffect } from "react";

import barsTemplate from '../bars.json'

const MapContext = createContext();

const MapContextProvider = props => {
    // initial state definition
    const [location, setLocation] = useState(null);
    const [bars, setBars] = useState(barsTemplate);

    // componentDidMount hooks useEffect => in order to get user location and update state's value
    useEffect(() => {
        console.log("Getting the localization point.")

        navigator.geolocation.getCurrentPosition(
            location => {
                console.log(location.coords.latitude);
                console.log(location.coords.longitude);
                const loc = {
                    lat: location.coords.latitude,
                    lng: location.coords.longitude
                }
                console.log('msg', loc);                
                setLocation(loc);
            },
            error => {
                console.log(error);
            }
        )
    }, [])

    console.log('state location :', location);
    // constant value object
    // expose all states/functions of context
    const value = {
        location: location,
        bars: bars
    }

    // provider
    return (
        <MapContext.Provider value={value}>
            {props.children}
        </MapContext.Provider>
    );
}

// exported contexts
export {
    MapContext,
    MapContextProvider
}
