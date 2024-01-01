
function ask_gemini(qn) {
	let msg;
	let url;
	let prompt_text;
	let requestBody;
	let payload;
	let result;

	// to use Google Gemini Pro
	url = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyCHNsZU2T8NYy_VTfOT1q9Bgow_y-Hp_ss";
	prompt_text = {
		'text': encodeURIComponent(qn)
	}
	parts = {
		"parts": prompt_text
	}
	requestBody = {
		"contents": parts
	}
	payload = {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(requestBody)
	}
	return fetch(url, payload)
	.then(response => response.json())
	.then(content => content.candidates[0].content)
	.then(parts => parts.parts[0].text)
	.then((msg) => {
		msg = decodeURIComponent(msg);
		addChat(qn, msg);
		document.getElementById("input").value = "";
	})
	.catch(error => {
		msg = "Error calling api : " + error;
		addChat(qn, msg);
		document.getElementById("input").value = "";
	});
}


function ask_palm(prompt) {
	let msg;
	let url;
	let prompt_text;
	let requestBody;
	let payload;
	let result;
	msg = "";
	url = "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=AIzaSyCHNsZU2T8NYy_VTfOT1q9Bgow_y-Hp_ss";
	prompt_text = {
		'text': prompt
	}
	requestBody = {
		"prompt": prompt_text
	}
	payload = {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(requestBody)
	}
	return fetch(url, payload)
	.then(response => response.json())
	.then(data => data.candidates[0].output)
	.then((msg) => {
		addChat(prompt, msg);
		document.getElementById("input").value = "";
	})
	.catch(error => {
		msg = "Error calling api : " + error;
		addChat(prompt, msg);
		document.getElementById("input").value = "";
	});
}
