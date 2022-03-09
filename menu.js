menu_type = 1; // 0 for horizontal , 1 for vertical
fetch("https://wingsmaker.github.io/Github/menu.csv").then( r => r.text() ).then( t => processData(t) );

function processData(csv) {
	var menu_txt = '<div class="navbar" id="myNavbar">';
	var menu_grp = '';
	var menu_item = 0;
	lines = csv.split("\n");
	cnt = lines.length;
	for( ii=0; ii < cnt; ii++ ) {
		linedata = lines[ii].split(",");
		if (linedata[0] != '') {
			if (linedata[0] != menu_grp) {
				if (linedata[1] == '') {
					if (menu_item == 0) {
						menu_txt += '</div></div>';
					}
				} else {
					if (menu_grp != '') {
						menu_txt += '</div></div>';
					}
					menu_grp = linedata[0];
					if (menu_type==0) {
						menu_txt += '<div class="subnav"><button class="subnavbtn">' + menu_grp;
						menu_txt += '<i class="fa fa-caret-down"></i></button><div class="subnav-content">';
					} else {
						menu_txt += '<div class="dropdown"><button class="dropbtn">' + menu_grp;
						menu_txt += '<i class="fa fa-caret-down"></i></button><div class="dropdown-content">';
					}
				}
			}
			if (linedata[1] == '') {
				menu_txt += '<a href="' + linedata[2]  + '">' + linedata[0] + '</a>';
				menu_item = 1;
			} else {
				url = linedata[2].replace('\r','').replace('\n','');
				menu_txt += '<a href="' + url  + '">' + linedata[1] + '</a>';
				menu_item = 0;
			}
		}
	}				
	if (menu_item == 0) {
		menu_txt += '</div></div>';
	}
	menu_txt += "<a onclick='skypeShareKeyDownHandler(event)' class='skype-share'>Skype</a></div>";
	document.getElementById("menu").innerHTML = menu_txt;
}

function do_searchbar(e){
	if(e.keyCode == 13){
		do_search('g');
	}
}

function do_search(search_mode) {
	var search_prefix = "";
	var txt  = document.getElementById("searchbar").value;
	if (search_mode=="g") {
		search_prefix = "https://www.google.com.sg/search?q=";
	}
	if (search_mode=="b") {
		search_prefix = "https://www.bing.com/search?q=";		
	}
	if (search_mode=="h") {
		search_prefix = "https://www.healthhub.sg/search?k=";
	}
	if (search_prefix != "") {
		var url = search_prefix + txt.split(' ').filter(function(x) { return x.length > 0 } ).join('+');
		window.open(url);
	}
}
