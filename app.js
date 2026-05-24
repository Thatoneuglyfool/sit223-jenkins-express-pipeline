const express = require('./index');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('SIT223 Jenkins DevOps Pipeline - Express App is running');
});

app.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    service: 'Express Jenkins Pipeline App',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/info', (req, res) => {
  res.json({
    project: 'SIT223 7.3HD DevOps Pipeline',
    framework: 'Express',
    pipelineStages: [
      'Build',
      'Test',
      'Code Quality',
      'Security',
      'Deploy',
      'Release',
      'Monitoring'
    ]
  });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Application running on http://localhost:${port}`);
  });
}

module.exports = app;