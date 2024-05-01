import axios from 'axios';
import Auth from '../helpers/auth';
const jwt = require("jsonwebtoken");

class AuthClass {

    login = (email, password) => {
        var LOGIN_API_PATH = `${process.env.REACT_APP_API_URL}/api/login`;

        const data = {
            email,
            password
        }

        return new Promise((resolve, reject) => {
            axios.post(LOGIN_API_PATH, data)
                .then(res => {

                    const token = res.headers.authorization;

                    let decodedToken = jwt.decode(token);
                    Auth.authenticate(token, decodedToken.exp);
                    resolve(res)
                }).catch(e => {
                    reject(e.response)
                })
        })
    }

    getAuthUser = () => {

        var LOGIN_API_PATH = `${process.env.REACT_APP_API_URL}/api/user`;

        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: LOGIN_API_PATH,
                headers: {
                    'content-type': 'application/json',
                    'authorization': 'Bearer ' + localStorage.getItem('itoken')
                }
            }).then(res => {
                resolve(res.data)
            }).catch(e => {
                reject(e.response)
            })
        })
    }

    register = (data) => {

        var REGISTER_API_PATH = `${process.env.REACT_APP_API_URL}/api/vendor/registerVendor`;

        return new Promise((resolve, reject) => {
            axios.post(REGISTER_API_PATH, data)
                .then(res => {
                    resolve(res)
                }).catch(e => {
                    reject(e.response)
                })
        })
    }

}
const AuthServices = new AuthClass();
export {
    AuthServices
};