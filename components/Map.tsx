/// <reference path="../node_modules/react-google-maps/types/index.d.ts" />

import { Box } from "@chakra-ui/react";
import React from "react";
import {
  GoogleMap,
  withGoogleMap,
  Marker,
  withScriptjs,
} from "react-google-maps";

export default function MapCreate(sight: any, setSight: any) {
  const GMap = () => {
    return (
      <GoogleMap
        defaultZoom={16}
        defaultCenter={{
          lat: sight.sight.location["x_"],
          lng: sight.sight.location["N_"],
        }}
        defaultOptions={{
          disableDefaultUI: true,
        }}
        onClick={(e) => {
          sight.setSight({
            ...sight.sight,
            location: { x_: e.latLng.lat(), N_: e.latLng.lng() },
          });
        }}
      >
        <Marker
          key={sight.id}
          position={{
            lat: sight.sight.location["x_"],
            lng: sight.sight.location["N_"],
          }}
        />
      </GoogleMap>
    );
  };

  const ScriptedMap = withScriptjs(withGoogleMap(GMap));

  return (
    <Box w="100%" h="100%">
      {/* errors are a bug in react-google-maps -- should have a type, not never */}
      <ScriptedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing&key=${process.env.gcpApiKey}`}
        loadingElement={<Box h="100%" />}
        containerElement={<Box h="100%" />}
        mapElement={<Box h="100%" />}
      />
    </Box>
  );
}
