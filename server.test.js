const request = require('supertest')
const app = require('./app');

describe('Health endpoint', () => {
  test('should return status code 200', async () => {
    const res = await request(app)
      .get('/health')
    expect(res.statusCode).toEqual(200)
  })
})

describe('Ready endpoint', () => {
  test('should return status code 200', async () => {
    const res = await request(app)
      .get('/ready')
    expect(res.statusCode).toEqual(200)
  })
})

describe('App endpoint', () => {
  test('should return status code 200', async () => {
    const res = await request(app)
      .get('/')
    expect(res.statusCode).toEqual(200)
  })
})