const express = require('express');
const axios = require('axios');

const app = express();

// Configuración de la API de Twitch Helix
const clientId = "b1wf2uwc9fyu0tl741tozqgq2sjc69";
const clientSecret = "slq56t35mtdvbbvl8yk53zu6aq6jog";

// Ruta para obtener el estado de transmisión de un usuario
app.get('/stream-status/:username', async (req, res) => {
  const username = req.params.username;

  try {
    // Obtener el token de acceso
    const { data } = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`);
    const accessToken = data.access_token;

    // Realizar la solicitud a la API de Twitch Helix
    const response = await axios.get(`https://api.twitch.tv/helix/streams?user_login=${username}`, {
      headers: {
        'Client-ID': clientId,
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const streamData = response.data.data[0];

    if (!streamData) {
      res.json({ status: 'offline' });
    } else {
      res.json({ status: 'live', stream: streamData });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el estado de transmisión' });
  }
});

// Ruta para servir el archivo index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
