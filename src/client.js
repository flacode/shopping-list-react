import axios from 'axios/lib/axios'
const API = "http://127.0.0.1:5000/api/";
let token;
let apiClient;
let url;

apiClient = {
    registerUser: (user, success, message) => {
        url = API + "auth/register";
        axios.post(url, user)
          .then(response => {
              success(response.data.message)
          })
          .catch((error) => {
                message(error.response.data.message);
                console.log("Server error: " + error.response.data.message);
          });
    },
}

export default apiClient;