var row_count=5,col_count=1;
var points=new Array();
points["1"]=new Array(10,20,30,40,50);
//alert(points);
var xlables=new Array();
xlables["1"]="Category 1";
xlables["2"]="Category 2";
xlables["3"]="Category 3";
xlables["4"]="Category 4";
xlables["5"]="Category 5";
var colors=new Array();
colors["1"]="#0000ff";
var chart;
var chartType=0;
var code_content=0;
	$(document).ready(setUp);
	function setUp()
	{
		var Categories=$("td[class='0']");
		for(i=1;i<Categories.length-1;i++)
		Categories[i].firstChild.onchange=changeLables;
		var first_col=$("td[class='1']");
		first_col[0].firstChild.onchange=changeLegacy;
		for(i=1;i<first_col.length-1;i++)
		first_col[i].firstChild.onchange=drow;
		//Categories[Categories.length-1].firstChild.onchange=setColor;
		//alert(Categories.length);
		//document.getElementById("result").onmouseup=showMenu;
		//document.getElementById("result").onContextMenu=function (){return false;}
		document.onclick=removeMenu;
		//document.getElementById("chartMenu").onchange=convertChart;
		chart = ChartDrawer.NewChart("left");
		chart.setChartType(ChartType.Column);
		chart.AddSeries(points["1"],"#0000ff");
		chart.setXLabels(xlables);
	}		
	function drow(e)
	{
		change_points(e);
		redrow();
		
	}
	function redrow()
	{
	chart = ChartDrawer.NewChart("left");
	if(chartType==0)
	chart.setChartType(ChartType.Column);
	if(chartType==1)
	chart.setChartType(ChartType.Line);
	for(col in points)
	chart.AddSeries(points[col],colors[col]);
	}
	function change_points(e)
	{
		var index=e.target.parentNode.className;
		var order=parseInt(e.target.parentNode.parentNode.className -1);
		if(order <= points[index].length)
		{
		if(/^[0-9][0-9]*$/.test(e.target.value))
		{
		points[index][order]=e.target.value;
		if(order+1 == points[index].length)
		{
		var tdElememts=$("td[class='" +index+ "']");
		for(i=order+2;i<tdElememts.length;i++)
		{
		if(/^[0-9][0-9]*$/.test(tdElememts[i].firstChild.value))
		points[index][++order]=tdElememts[i].firstChild.value;
		else
		break;
		}
		}
		}
		else if(order < points[index].length)
		{
		var temp=new Array();
		for(i=0;i<order;i++)
		temp[i]=points[index][i];
		points[index]=temp;
		}
		}
		//alert(points);
	}

	function addColumn()
	{
		var index=document.getElementsByTagName("td").length/document.getElementsByTagName("tr").length;
		points[index]=new Array();
		var rows=document.getElementsByTagName("tr");
		var cell=document.createElement("td");
		var txt=document.createElement("input");
		txt.type='text';
		txt.onchange=changeLegacy;
		var cell_count=document.getElementsByTagName("td").length/document.getElementsByTagName("tr").length;
		cell.className=cell_count;
		txt.value="Series "+(++col_count);
		cell.appendChild(txt);
		rows[0].appendChild(cell);
		for(i=1;i<rows.length-1;i++)
		{
		cell=document.createElement("td");
		cell.className=cell_count;
		txt=document.createElement("input");
		txt.type='text';
		txt.onchange=drow;
		cell.appendChild(txt);
		rows[i].appendChild(cell);
		}
		cell=document.createElement("td");
		cell.className=cell_count;
		txt=document.createElement("input");
		txt.type='color';
		txt.value="#0000ff";
		colors[cell_count]="#0000ff";
		txt.onchange=setColor;
		cell.appendChild(txt);
		rows[rows.length-1].appendChild(cell);
	}
	
	function addRow()
	{
		var cell_count=document.getElementsByTagName("td").length/document.getElementsByTagName("tr").length;
		var row=document.createElement("tr");
		row.className=document.getElementsByTagName("tr").length-1;
		var cell=document.createElement("td");
		cell.className=0;
		var txt=document.createElement("input");
		txt.type='text';
		txt.onchange=changeLables;
		txt.value="Category "+(++row_count);
		xlables[row.className]=txt.value;
		cell.appendChild(txt);
		row.appendChild(cell);
		for(i=1;i<cell_count;i++)
		{
		cell=document.createElement("td");
		cell.className=i;
		txt=document.createElement("input");
		txt.type='text';
		txt.onchange=drow;
		cell.appendChild(txt);
		row.appendChild(cell);
		}
		$("#color_row").before(row);
	}
	function showMenu(e)
	{
	
		if(e.which==3)
		{		
			removeMenu();
			var menu=document.createElement("select");
			menu.id="menu";
			menu.multiple=true;
			menu.style.position = "relative";//absolute
			menu.style.top=(screen.heighte-e.screenY)+'px';
			menu.style.left=(screen.width-e.screenX)+'px';
			var option=document.createElement("option");
			option.text="Add Row";
			option.onclick=function (){addRow(); this.selected=false; e.target.removeChild(menu);};
			menu.appendChild(option);
			var option=document.createElement("option");
			option.text="Add Column";
			option.onclick=function (){addColumn(); this.selected=false; e.target.removeChild(menu);};
			menu.appendChild(option);
			e.target.appendChild(menu);
			
	}
		return false;
	}
	function removeMenu()
	{
		if(menu=document.getElementById("menu"))
		{
		document.getElementById("result").removeChild(menu);
		}
	}
	function setColor(e)
	{
		colors[e.target.parentNode.className]=e.target.value;
		redrow();	
	
	}
	function changeLables(e)
	{
		xlables[e.target.parentNode.parentNode.className]=e.target.value;
		chart.setXLabels(xlables);
	}
	function convertChart(menu)
	{
		if(menu.options.selectedIndex==0)
		{
		chartType=0;
		chart.setChartType(ChartType.Column);
		}
		else
		{
		chartType=1;
		chart.setChartType(ChartType.Line);
		}
	}
	function showCode()
	{
		if(!code_content)
		{
		document.getElementById("left").innerText=document.getElementById("left").innerHTML;
		code_content=1;
		}
	}
	function showChart()
	{
		if(code_content)
		{
		document.getElementById("left").innerHTML=document.getElementById("left").innerText;
		code_content=0;
		}
	}
	function changeLegacy(e){alert("changeLegacy")}