import http from 'http';

const API_BASE_URL = 'http://localhost:3000';

class IncomeRepository {
  async makeRequest(url) {
    return new Promise ((resolve, reject) => {
      http.get(url, res => {
        res.on('data', data => resolve(JSON.parse(data)))
        res.on('error', reject)
      })
    }) 
  }

  async getConversions() {
    const url = API_BASE_URL + '/convert'
    const { results } = await this.makeRequest(url)
    return results
  }
}

export default IncomeRepository;