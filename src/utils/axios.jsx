 import axios from "axios";

 const instance = axios.create({
  
    baseURL:"https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOWUzMjkzZjcwZTA5YmQ4MzA3ZTk2OWNkMjZlYWQzZSIsInN1YiI6IjY1Y2YyNDliNjBjNzUxMDE3YjY5NTYyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.saDK7UzBVjeRJz4gXaACXJLH_47Urgigl1dEVADKIR8'
      }
 })

 export default instance;