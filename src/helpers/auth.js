const jwt = require("jsonwebtoken");

const Auth = {
    authenticate(token, exp) {
        localStorage.setItem('itoken', token);
        localStorage.setItem('exp', exp);
    },

    signout() {
        localStorage.removeItem('itoken');
        localStorage.removeItem('exp');
    },

    getAuth() {
        //TODO: verify token for more security
        try {
            let token = localStorage.getItem('itoken');
            let decodedToken = jwt.decode(token);
            // let tokenRole = decodedToken['role'];
            return decodedToken;
        } catch (error) {
            return undefined;
        }
    },

    getToken() {
        let nowUnixEpoch = Math.round(Date.now() / 1000);
        let expUnixEpoch = Number(localStorage.getItem('exp'));
        if ((expUnixEpoch - nowUnixEpoch) <= 120) {
            return undefined;
        } else {
            return localStorage.getItem('itoken');
        }
    },
    checkTokenValid() {
        let token = localStorage.getItem('itoken');
        let decodedToken = jwt.decode(token);
        let currentDate = new Date();
        // JWT exp is in seconds
        if (decodedToken && decodedToken.exp * 1000 >= currentDate.getTime()) {
            return true;
        }

        return false;
    }

};

export default Auth;