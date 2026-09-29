const request = require('supertest');
const app = require('../app');

describe('Student Task Manager API', () => {
  test('GET /tasks should return 200', async () => {
    const response = await request(app).get('/tasks');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /tasks should create a task', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({ task: 'Complete Jenkins Assignment' });

    expect(response.statusCode).toBe(201);
    expect(response.body.text).toBe('Complete Jenkins Assignment');
  });

  test('POST /tasks should reject empty task', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({ task: '' });

    expect(response.statusCode).toBe(400);
  });
});
