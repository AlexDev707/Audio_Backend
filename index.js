const app = require('./src/app');

const port = process.env.PORT;
if (!port) {
  console.log('No port provided');
  process.exit(1);
}

app.listen(port, () => console.log(`Server is running on port ${port}`));
