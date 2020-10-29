import axios from "axios";

const url = "http://swapi.dev/api/planets/1";

export const getData = () => axios.get(url);
