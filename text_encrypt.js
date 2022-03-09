var codedString = "";
var msg = "";
var keypass = "WingsMaker";
document.getElementById("result").innerHTML = keypass ;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const keystring = urlParams.get('key')
const dectxt = urlParams.get('dec')
const enctxt = urlParams.get('enc')
if (keystring != null) {
	keypass = keystring;
	document.getElementById("result").innerHTML = keystring;
}
if (dectxt != null) {
	msg =  CryptoJS.Rabbit.decrypt(dectxt, keypass).toString(CryptoJS.enc.Utf8);
	document.getElementById("msg").value = msg;
}
if (enctxt != null) {
	msg =  CryptoJS.Rabbit.encrypt(enctxt, keypass);
	document.getElementById("msg").value = msg;
}

function reset() {
	document.getElementById("msg").innerHTML = "";
}

function definekey() {
	if (typeof keypass == 'undefined') {
		keypass = "";
	}
	if (keypass=="") {
		keypass = document.getElementById("result").innerHTML;
		keypass = keypass.replace("</b>","<b>").split("<b>")[1];
	}
	var txt = prompt("Enter key pass code:",keypass);
	if (txt == null) txt = "";
	if (txt == "") {
		keypass = "WingsMaker";
		document.getElementById("result").innerHTML = "<b>WingsMaker</b>";
	} else {
		keypass = txt;
		document.getElementById("result").innerHTML = "<b>" + txt + "</b>";
	}
}

function encryption() {
	msg = document.getElementById('msg').value;
	if (msg=="") {
	alert("There is nothing to encrypt.");
return;
}
if (typeof keypass == 'undefined') {
	keypass = "";
}
if (keypass=="") {
	keypass = document.getElementById("result").innerHTML;
	keypass = keypass.replace("</b>","<b>").split("<b>")[1];
}
if (keypass=="") {
	alert("Please load the passphrase file!");
return;
}
	codedString =  CryptoJS.Rabbit.encrypt(msg, keypass);
	document.getElementById("msg").value = codedString;
}

function decryption() {
	msg = document.getElementById('msg').value;
	if (msg=="") {
		alert("There is nothing to decrypt.");
	return;
	}		  
	if (typeof keypass == 'undefined') {
		keypass = "";
	}
	if (keypass=="") {
		keypass = document.getElementById("result").innerHTML;
		keypass = keypass.replace("</b>","<b>").split("<b>")[1];
	}
	if (keypass=="") {
		alert("Please load the passphrase file!");
	return;
	}
	codedString =  CryptoJS.Rabbit.decrypt(msg, keypass).toString(CryptoJS.enc.Utf8);
	document.getElementById("msg").value = codedString;
}
