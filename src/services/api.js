import axios from 'axios';
import md5 from 'js-md5';

const PUBLIC_KEY = 'c146058717b086c76ee83042e6b83fce';
const PRIVATE_KEY = '196f861c531044705e2d6d19c52f07b315581170';

const timestamp = Number(new Date().getTime())
const hash = md5.create()
hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY)


const api = axios.create({
  baseURL: `https://gateway.marvel.com/v1/public/`,
})

export default api;

