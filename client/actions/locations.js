import axios from 'axios';
import { browserHistory } from 'react-router';

export function setMapLocations(locations){
  return {
    type: "SET_MAP_LOCATIONS",
    locations
  }
}
