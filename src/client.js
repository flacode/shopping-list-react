import axios from 'axios/lib/axios'
const API = "http://127.0.0.1:5000/api/";
let token;
let url;

const registerUser = (user, success, message) => {
    url = API + "auth/register";
    axios.post(url, user)
    .then(response => {
        success(response.data.message)
    })
    .catch((error) => {
        // handle API generated errors
        if(error.response){
            message(error.response.data.message);
            console.log("Server error: " + error.response.data.message);
        } else {

            // handle network server errors
            message("Network error, please try again later");
            console.log(error);
        }
    });
}

const Client = { registerUser }
export default Client;