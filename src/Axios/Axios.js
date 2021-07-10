import axios from 'axios'
import { baseUrl } from '../Const/Const'

const instance = axios.create({
    baseURL: baseUrl,
});

export default instance