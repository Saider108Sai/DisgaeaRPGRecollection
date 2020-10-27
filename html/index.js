var g_sortIndex = 0;

// --------------------------------------------------------------------------
/// @brief 条件でソート 
// --------------------------------------------------------------------------
function compareSort( a , b )
{
	if( a.flag[g_sortIndex] < b.flag[g_sortIndex] )
	{
		return 1;
	}
	else
	if( a.flag[g_sortIndex] == b.flag[g_sortIndex] )
	{
		return 0;
	}
	return -1;
}

// --------------------------------------------------------------------------
/// @brief 名前でソート 
// --------------------------------------------------------------------------
function compareShortName( a , b )
{
	if( a.name < b.name )
	{
		return 1;
	}
	else
	if( a.name == b.name )
	{
		return 0;
	}

	return -1;
}

// --------------------------------------------------------------------------
/// @brief 名前でソート 
// --------------------------------------------------------------------------
function compareName( a , b )
{
	if( a.sort && b.sort )
	{
		if( a.sort > b.sort )
		{
			return 1;
		}
		else
		if( a.sort == b.sort )
		{
			return 0;
		}
	}
	else
	if( a.sort )
	{
		if( a.sort > b.name )
		{
			return 1;
		}
		else
		if( a.sort == b.name )
		{
			return 0;
		}
	}
	else
	if( b.sort )
	{
		if( a.name > b.sort )
		{
			return 1;
		}
		else
		if( a.name == b.sort )
		{
			return 0;
		}
	}
	else
	if( a.name > b.name )
	{
		return 1;
	}
	else
	if( a.name == b.name )
	{
		return 0;
	}
	return -1;
}

// --------------------------------------------------------------------------
/// @brief url パラメータ分割 
// --------------------------------------------------------------------------
function getUrlParameter()
{
	var result = new Object;
	let url_parameter=location.search.substring(1).split('&');
	for(let i=0;url_parameter[i];i++)
	{
		let parameter_key = url_parameter[i].split('=');
		result[parameter_key[0]]=parameter_key[1];
	}
	return result;
}

// --------------------------------------------------------------------------
/// @brief 読み込み時処理 
// --------------------------------------------------------------------------
function onLoaded()
{
	var url_parameter = getUrlParameter();
	if( url_parameter.sort )
	{
		g_sortIndex = url_parameter["sort"] - 1;
	}


	let table = document.getElementById('targetTable');
	var i,j;

	// 読み込み 
	$.getJSON("data.json" , function(data)
	{
		console.log(data.length);
		console.log(`${data[0].名前}`);

		data.sort( compareShortName );
		data.sort( compareName );
		// ソート命令があったら 
		if( url_parameter.sort )
		{
			data.sort( compareSort );
		}

		//		alert('成功' + data.length );
		for(var i = 0; i < data.length; i++)
		{
			let newRow = table.insertRow();
			let newCell = newRow.insertCell();
			let newText = document.createTextNode( data[i].name );
			newCell.appendChild(newText);

			for( j = 0 ; j < data[i].flag.length ; j = j + 1 )
			{
				newCell = newRow.insertCell();
	
				if( data[i].flag[j] == 0 )
				{
					newText = document.createTextNode( "―" );
				}
				else
				{
					newText = document.createTextNode( "○" );
				}
				newCell.appendChild(newText);
			}
		}
	});
}
