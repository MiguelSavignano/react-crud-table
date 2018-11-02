import axios from 'axios'

export class CatsService {
  constructor(url, endpoint){
    this.url = url
    this.endpoint = endpoint
  }

  async index(){
    const { data } = await axios.get(`${this.url}/${this.endpoint}`)
    return data
  }
  create(){

  }
  async update({id, ...attributes}){
    const { data } = await axios.put(`${this.url}/${this.endpoint}/${id}`, attributes)
    return data
  }
  destroy(){

  }
}

const url = process.env.API_URL || "http://localhost:3000"
const service = new CatsService(url, "cats")

export default service
global.service = service
