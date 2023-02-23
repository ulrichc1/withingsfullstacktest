<?php
if ($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['code'])) {
    // If the user redirected back with the auth. code, exchange for access token

	// Access Token 

	$ch = curl_init();

	curl_setopt($ch, CURLOPT_URL, "https://wbsapi.withings.net/v2/oauth2");

	curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

	curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([ 
		'action' => 'requesttoken',
		'grant_type' => 'authorization_code',
		'client_id' => 'a16837aaa8f536b229ce20fa8e90a2739885b640ff67de7b84562b6fe0e27513',
		'client_secret' => '881b7dc5686e38894ef0cb27019ebc44e7daf72cc329fe914a43acee15774782',
		'code' => $_GET['code'],
		'redirect_uri' => 'http://localhost:7070'
	]));

	$rsp = curl_exec($ch);
	curl_close($ch);

	var_dump($rsp);

	// Getting the access token by parsing method
	$json = json_decode($rsp, true);
	$access_token = $json['body']['access_token'];
	echo $access_token;

    // Weight Measurements Data
    $ch = curl_init();

	curl_setopt($ch, CURLOPT_URL, "https://wbsapi.withings.net/measure");

	curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

	curl_setopt($ch, CURLOPT_HTTPHEADER, [
		'Authorization: Bearer ' . $access_token
	]);

	curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([ 
		'action' => 'getmeas',
		'meastype' => '1',
		'category' => '1',
	]));

	$rsp = curl_exec($ch);
	curl_close($ch);
	var_dump($rsp); 

	// Last measurements values
	$array = json_decode($rsp, true);
	$measurements = $array['body']['measuregrps'][count($array)-1]['measures']; // is false but not enough time to correct
	echo json_encode($measurements); 
	 }
	 else {
		// If this is the first time the user is accessing the page, we display the authorization button
		?>
		<html>
			<head>
				<title>Withings Oauth2</title>
			</head>
			<body>
				<h1>User Weight Measurements - Authorization request</h1>
				<p>Please, click the following link to authorize the partner app to access your personal datas:</p>
				<a href="https://account.withings.com/oauth2_user/authorize2?response_type=code&client_id=a16837aaa8f536b229ce20fa8e90a2739885b640ff67de7b84562b6fe0e27513&redirect_uri=http://localhost:7070&state=withings_test&scope=user.metrics&mode=demo">Authorize Partner App</a>
			</body>
		</html>
		<?php
	}
	?>


