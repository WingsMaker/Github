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

function group_barchart( csv, max_y_value, grouphead, status_list, aoa, canvas_id1, chart_title1, canvas_id2, chart_title2, canvas_id3, chart_title3  ) {
	var lines = csv.split(";");
	var cnt = lines.length;
	var hh = 0.0;
	var txt = "";	
	var table_html = "";
	var item_counts = [];
	var arr_items = [];
	var inst_list = [];
	var item_list = [];
	var grouping = [];
	var grouping_list = [];
	var column_sum = [];
	var row_sum = [];
	var inst_projs = [];
	var barColors = [
	  "#b91d47",
	  "#00aba9",
	  "#2b5797",
	  "#e8c3b9",
	  "#1e7145",
	  "green",
	  "cyan",
	  "brown",
	  "blue",
	  "yellow",
	  "orange",
	  "brown",
	  "red"
	];
	var grand_total = 0;
	nn = status_list.length;
	for ( ii=0; ii < status_list.length; ii ++ ) {
		column_sum.push(0);
	}
	table_html = "<table class='table' style='font-size:10px'><tr><th scope='col'>" + grouphead + "</th>";
	for ( jj=0; jj < status_list.length; jj ++ ) {
		arr_items.push( 0.0 );
		table_html = table_html +"<th scope='col'>" + status_list[jj] + "</th>";
	}
	table_html = table_html + "</tr>";
	for ( ii=0; ii < cnt; ii ++ ) {
		item_counts.push( arr_items );
		row_sum.push(0);
		linedata = lines[ii].split(",");
		grouping.push( linedata[0] );
	}

	for( var gg=0; gg < cnt; gg++ ) {
		linedata = lines[gg].split(",");
		kk = linedata.length;
		table_html = table_html + "<tr>";
		institution_id = -1;
		for( jj=0; jj < kk; jj++ ) {					
			txt = linedata[jj];
			if( jj == 0 ) {
				for ( var ll=0; ll < cnt; ll ++ ) {
					var inst = grouping[ll];
					if ( txt.match(inst) ) {
						institution_id = ll;
						grouping_list.push( txt );
					}
				}
				item_list = [];
			} else {
				if (institution_id >= 0) {
					hh = stringtonumber(txt);
					item_list.push( hh );
					item_counts[institution_id][jj - 1] = hh;
					column_sum[jj - 1] = column_sum[jj - 1] + hh;
					row_sum[gg] = row_sum[gg] + hh;
				}
			}
			table_html = table_html + '<td>' + txt + '</td>';
		}
		inst_list.push( item_list );
		inst_projs.push( txt );
		table_html = table_html + "<td>" + row_sum[gg] + "</td>" + "</tr>";
	}
	nn = status_list.length;
	if ( nn > 0 ) {
		table_html = table_html + "<tr style = 'font-weight: bold'><td>TOTAL</td>";
		for (jj = 0; jj < nn; jj++) {
			hh = column_sum[jj];
			table_html = table_html + '<td>' + hh + '</td>';
			grand_total = grand_total + hh;
		}
		table_html = table_html + "<td>" + grand_total + "</td>" + "</tr>";		
	}

	table_html = table_html + "</table>";
	if (aoa.length > 0) {
		document.getElementById(aoa).innerHTML = table_html;
	}
	max_y_value = max_y_value + 5;
	var f = parseFloat(max_y_value/5);
	max_y_value = 5 * parseInt( String(f).split(".")[0] );
	var inst_datasets = [];
	for (jj = 0; jj < grouping_list.length; jj++) {
		inst_datasets.push( { label: grouping_list[jj],backgroundColor: barColors[jj], data: inst_list[jj] } );
	};

	if (canvas_id1.length > 0) {
		new Chart(canvas_id1, {
			type: 'bar',
			data: {
			  labels: status_list,
			  datasets: inst_datasets
			},
			options: {
			  title: {
				display: true,
				text: chart_title1
			  },
			  scales: {
				yAxes: [{ticks: {min: 0, max: max_y_value}}]
			  }		  
			}
		});
	}

	if (canvas_id2.length > 0) {
		new Chart(canvas_id2, {
		  type: "horizontalBar",
		  data: {
		  labels: grouping,
		  datasets: [{
			backgroundColor: barColors,
			data: row_sum
		  }]
		},
		  options: {
			legend: {display: false},
			title: {
			  display: true,
			  text: chart_title2
			},
			scales: {
			  xAxes: [{ticks: {min: 0, max: max_y_value}}]
			}
		  }
		});		
	}

	if (canvas_id3.length > 0) {
		new Chart(canvas_id3, {
		  type: "pie",
		  data: {
			labels: status_list1,
			datasets: [{
			  backgroundColor: barColors,
			  data: column_sum
			}]
		  },
		  options: {
			title: {
			  display: true,
			  text: chart_title3
			}
		  }
		});		
	}
}
