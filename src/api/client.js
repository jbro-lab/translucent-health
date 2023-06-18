import axios from "axios";

const client = axios.create({
    // BELOW IS THE SSL CERT ERROR, CHANGED https://localhost TO http://localhost FOR SERVER
    baseURL: "https://jbro-lab.github.io/Translucent-Health-Data/",
    headers: {
     "accept" : "application/json",
     "Content-Type": "application/json",
    }
  });

  export default client;