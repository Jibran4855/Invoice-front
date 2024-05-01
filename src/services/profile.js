
import axios from 'axios';

class ProfileClass {

    updateProfile = async (data) => {
        var PROFILE_API_PATH = `${process.env.REACT_APP_API_URL}/api/update/me`;
        return new Promise((resolve, reject) => {
            axios({
                method: 'PUT',
                url: PROFILE_API_PATH,
                data: data,
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

}
const ProfileServices = new ProfileClass
export { ProfileServices };