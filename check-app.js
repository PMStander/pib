import http from 'http';

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('Response received successfully');
    console.log(`Body length: ${data.length} bytes`);
    console.log('First 200 characters:');
    console.log(data.substring(0, 200));
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.end();
