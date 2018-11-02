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

  async create({id, ...attributes}){
    const { data } = await axios.post(`${this.url}/${this.endpoint}`, attributes)
    return data
  }

  async update({id, ...attributes}){
    const { data } = await axios.put(`${this.url}/${this.endpoint}/${id}`, attributes)
    return data
  }

  async destroy(id){
    const { data } = await axios.delete(`${this.url}/${this.endpoint}/${id}`)
    return data
  }
}

const url = process.env.API_URL || "http://localhost:3000"
const service = new CatsService(url, "cats")

export default service
global.service = service
