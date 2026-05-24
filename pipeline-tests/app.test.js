const request = require('supertest');
const assert = require('assert');
const app = require('../app');

describe('SIT223 Express App Smoke Tests', function () {
  it('should return the home page message', async function () {
    const response = await request(app).get('/');

    assert.strictEqual(response.status, 200);
    assert.ok(response.text.includes('SIT223 Jenkins DevOps Pipeline'));
  });

  it('should return health status UP', async function () {
    const response = await request(app).get('/health');

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.status, 'UP');
    assert.strictEqual(response.body.service, 'Express Jenkins Pipeline App');
  });

  it('should return pipeline stage information', async function () {
    const response = await request(app).get('/api/info');

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.project, 'SIT223 7.3HD DevOps Pipeline');
    assert.ok(response.body.pipelineStages.includes('Build'));
    assert.ok(response.body.pipelineStages.includes('Monitoring'));
  });
});