// // server.js

// const express = require('express');
// const axios = require('axios');
// const app = express();
// const cors = require('cors');

// const clientId = '252815931106-ghbote4aal4alf8643e3q0528bkrv46c.apps.googleusercontent.com';
// const clientSecret = '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';
// const redirectUri = 'http://localhost:3000';

// app.use(cors());

// app.get('/callback', async (req, res) => {
//   const code = req.query.code;

//   try {
//     const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
//       code,
//       client_id: clientId,
//       client_secret: clientSecret,
//       redirect_uri: redirectUri,
//       grant_type: 'authorization_code',
//     });

//     const accessToken = tokenResponse.data.access_token;
//     const idToken = tokenResponse.data.id_token;

//     console.log('Access Token:', accessToken);
//     console.log('ID Token:', idToken);

//     // Send the access token back to the client
//     res.json({ accessToken });
//   } catch (error) {
//     console.error('Error exchanging code for tokens:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.listen(3001, () => {
//   console.log('Server is running on port 3001');
// });

// server.js

const express = require('express');
const axios = require('axios');
const app = express();

const clientId = '252815931106-ghbote4aal4alf8643e3q0528bkrv46c.apps.googleusercontent.com';
const clientSecret = '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';
const redirectUri = 'http://localhost:3001/callback';

app.get('/callback', async (req, res) => {
  const code = req.query.code;

  try {
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    });

    const accessToken = tokenResponse.data.access_token;
    const idToken = tokenResponse.data.id_token;

    console.log('Access Token:', accessToken);
    console.log('ID Token:', idToken);

    // Send both tokens back to the client
    res.json({ accessToken, idToken });
  } catch (error) {
    console.error('Error exchanging code for tokens:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
