function stringtonumber(txt) {
	var ch = "";
	var nn = 0;
	for (ii=0;ii<txt.length;ii++) {
		ch = txt.substring(ii,ii+1);
		mm = parseInt(ch);
		if( isNaN(mm) == false ) {
			nn = nn*10 + mm;
		}
	}
	return nn;
}

function processData( csv, grouphead, grouping, status_list, aoa, canvas_id, chart_title ) {
	var lines = csv.split(";");
	var cnt = lines.length;
	var hh = 0;
	var txt = "";	
	var table_html = "";
	var item_counts = [];
	var arr_items = [];
	var inst_list = [];
	var item_list = [];
	var grouping_list = [];
	var max_y_value = 0;
	var column_sum = [ 0 ];
	var barColors = [
	  "#b91d47",
	  "#00aba9",
	  "#2b5797",
	  "#e8c3b9",
	  "#1e7145",
	  "orange",
	  "brown",
	  "red"
	];	
	table_html = "<table class='table' style='font-size:10px'><tr><th scope='col'>" + grouphead + "</th>";
	for ( jj=0; jj < status_list.length; jj ++ ) {
		arr_items.push( 0 );
		column_sum.push( 0 );
		table_html = table_html +"<th scope='col'>" + status_list[jj] + "</th>";
	}
	table_html = table_html + "</tr>";
	for ( ii=0; ii < grouping.length; ii ++ ) {
		item_counts.push( arr_items );
	}
	for( var gg=0; gg < cnt; gg++ ) {
		linedata = lines[gg].split(",");
		kk = linedata.length;
		table_html = table_html + "<tr>";
		institution_id = -1;
		for( jj=0; jj < kk; jj++ ) {					
			txt = linedata[jj];
			if( jj == 0 ) {
				for ( var ll=0; ll < grouping.length; ll ++ ) {
					var inst = grouping[ll];
					if ( txt.match(inst) ) {
						institution_id = ll;
						ll = grouping.length + 1;
						grouping_list.push( txt );
					}
				}
				item_list = [];
			} else {
				if (institution_id >= 0) {
					hh = stringtonumber(txt);
					item_list.push( hh );
					item_counts[institution_id][jj - 1] = hh;
					column_sum[jj] = column_sum[jj] + hh;
					if (hh > max_y_value) {
						max_y_value = hh;
					}
				}
			}
			table_html = table_html + '<td>' + txt + '</td>';
		}
		inst_list.push( item_list );
		table_html = table_html + "</tr>";
	}
	table_html = table_html + "<tr style = 'font-weight: bold'><td>TOTAL</td>";
	column_sum.shift();
	nn = column_sum.length;
	for (jj = 0; jj < nn; jj++) {
		table_html = table_html + '<td>' + column_sum[0] + '</td>';
		column_sum.shift();
	}
	table_html = table_html + "</tr></table>";
	if (aoa.length > 0) {
		document.getElementById(aoa).innerHTML = table_html;
	}
	max_y_value = max_y_value + 5;
	var f = parseFloat(max_y_value/5);
	max_y_value = 5 * parseInt( String(f).split(".")[0] );
	var inst_datasets = [];
	for (jj = 0; jj < grouping_list.length; jj++) {
		inst_datasets.push( { label: grouping_list[jj],backgroundColor: barColors[jj],data: inst_list[jj] } );
	};
	if (canvas_id.length > 0) {
		new Chart(canvas_id, {
			type: 'bar',
			data: {
			  labels: status_list,
			  datasets: inst_datasets
			},
			options: {
			  title: {
				display: true,
				text: chart_title
			  },
			  scales: {
				yAxes: [{ticks: {min: 0, max:max_y_value}}]
			  }		  
			}
		});
	}
}