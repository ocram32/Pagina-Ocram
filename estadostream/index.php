<?php
// Function to generate and retrieve the App Access Token
function getAppAccessToken($clientId, $clientSecret) {
    $url = 'https://id.twitch.tv/oauth2/token';
    $data = array(
        'client_id' => $clientId,
        'client_secret' => $clientSecret,
        'grant_type' => 'client_credentials'
    );

    // Create and send a POST request to retrieve the App Access Token
    $options = array(
        'http' => array(
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($data)
        )
    );
    $context = stream_context_create($options);
    $response = file_get_contents($url, false, $context);

    // Decode the response JSON and retrieve the App Access Token
    $responseData = json_decode($response, true);
    $appAccessToken = $responseData['access_token'];

    return $appAccessToken;
}

// Function to get the stream status using the App Access Token
function getStreamStatus($username, $appAccessToken) {
    $url = 'https://api.twitch.tv/helix/streams?user_login=' . $username;
    $headers = array(
        'Client-ID: b1wf2uwc9fyu0tl741tozqgq2sjc69',
        'Authorization: Bearer ' . $appAccessToken
    );

    // Create and send a GET request to the Twitch API to get the stream status
    $options = array(
        'http' => array(
            'header' => implode("\r\n", $headers),
            'method' => 'GET'
        )
    );
    $context = stream_context_create($options);
    $response = file_get_contents($url, false, $context);

    // Decode the response JSON
    $data = json_decode($response, true);

    // Check if the user is currently streaming or not
    if (isset($data['data'][0])) {
        // The user is currently streaming
        $streamTitle = $data['data'][0]['title'];
        $viewerCount = $data['data'][0]['viewer_count'];

        // Output the stream status HTML
        echo '<div style="text-align: center; font-family: Roboto;">';
        echo '<img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Red_circle.gif" alt="En Vivo" style="height: 1em; vertical-align: middle;">';
        echo '<strong>¡Estoy <span style="color: red;">EN VIVO</span> en este momento!</strong><br>';
        echo 'Título de la transmisión: ' . $streamTitle . ' (' . $viewerCount . ' espectadores)<br>';
        echo '<iframe src="https://player.twitch.tv/?channel=ocr4m" frameborder="0" allowfullscreen scrolling="no" height="378" width="620"></iframe><br>';
        echo '<button style="background-color: purple; color: white;">Ver en Twitch</button>';
        echo '</div>';
    } else {
        // The user is not currently streaming
        echo '<div style="text-align: center; font-family: Roboto;">';
        echo 'No estoy en vivo en este momento.<br>';
        echo 'Puedes seguirme para que te notifique cuando esté en línea.<br>';
        echo '<button style="background-color: purple; color: white;">Seguir en Twitch</button>';
        echo '</div>';
    }
}

// Set your Twitch client ID and client secret
$clientID = 'b1wf2uwc9fyu0tl741tozqgq2sjc69';
$clientSecret = '6dn2ud0e97hx3eu3rklqlk79osjhyg';

// Generate the App Access Token
$appAccessToken = getAppAccessToken($clientID, $clientSecret);

// Call the function to get the stream status of the user "ocr4m"
getStreamStatus('vector', $appAccessToken);
?>

