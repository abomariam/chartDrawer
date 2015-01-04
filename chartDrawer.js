var ChartDrawer = ChartDrawer || {}

var ChartType = {
    Line: "line",
    Column: "column"
}

ChartDrawer.NewChart = function(div1){
    
    var b = document.getElementById(div1);
    
    var height = b.offsetHeight;
    var width = b.offsetWidth;
    
    var chartType = ChartType.Line;
    var bgColor = "#FFF";
    
    var top_padding = 20;
    var bottom_padding = 50;
    var left_padding = 40;
    var right_padding = 20;
    
    var txtHeight = 10;
    
    var x_factor = 100;
    var x_count = 5;
    var y_factor = 100;
    var y_max = 100;
    var y_lines_count = 10;
    
    
    var svgns = "http://www.w3.org/2000/svg";
    
    var svg1 = document.createElementNS(svgns,"svg");


    var values = [];
    var colors = ["Green","Red", "Blue"];
    var XLabels = [];
    
    window.addEventListener("resize",chartDrawer);
    chartDrawer();
    
    
    function deleteSeries(no){
        values = values.slice(0,no).concat(values.slice(no+1,values.length))
    }
    function setSeries(no, series) {
        values[no] = series;
        chartDrawer();
    }
    function setBackGround(color){
        bgColor = color;
        chartDrawer();
    }
    
    function setChartType(type){
        chartType = type;
        if (type == ChartType.Column) {
            x_count++;
        }
        chartDrawer();
    }
    function setXLabels (labels){
        XLabels = labels;
        chartDrawer();
        
    }
    function AddSeries (series,color){
        if (color) {
            colors[values.length] = color;
        }
        values[values.length] = series;
        chartDrawer();
    }
    
    function chartDrawer(){
        
        b.innerHTML = "";
        svg1.innerHTML = "";
        svg1.setAttribute("height",height);
        svg1.setAttribute("width",width);
        svg1.style.backgroundColor = bgColor;
        b.appendChild(svg1);
        
        Recalculate_Diminsions();
        Recalculate_factors(values);
        prepareSVG(svg1,x_count);
        
        DrawXLabels(svg1,XLabels);
        DrawYLabels(svg1);
        
        if (chartType == ChartType.Line) {
            drawLines(svg1,values);
        }
        else if (chartType == ChartType.Column) {
            drawColumns(svg1,values);
        }
        
        
        //svg1.setAttribute("transform","scale(.5)");
        
        
        function Recalculate_Diminsions() {
            height = b.offsetHeight;
            width = b.offsetWidth;
        }
        function Recalculate_factors(points) {
            
            for(var i = 0; i<points.length; i++){
                x_count = Math.max(x_count,points[i].length);
            }
            x_count = x_count > 5 ? x_count : 5;
            x_factor = (width - (left_padding + right_padding)) / (x_count-1);
            
            
            for(var i = 0; i<points.length; i++){
                y_max = Math.max(y_max,Math.max.apply(null,points[i]));
            }
            y_max = Math.round(y_max) || 100;
            y_factor = (height - (top_padding + bottom_padding)) / y_max;
            
        }
        
        function prepareSVG(svg, points_count){
            
            
            var attributes = {"stroke":"black","stroke-width":"2"};
            var y_axies = createLine(left_padding,top_padding,left_padding,height - bottom_padding,attributes);
            var x_axies = createLine(left_padding,height - bottom_padding,width - right_padding,height - bottom_padding,attributes);
            
            
            points_count = points_count || 5;
            
            attributes["stroke-dasharray"]="2,2";
            attributes["opacity"] = ".3";
            attributes["stroke-width"] = "1";
            for(var i = 0; i<= points_count;i++){
                svg.appendChild(createLine(left_padding + i*x_factor,top_padding,left_padding + i*x_factor,height - bottom_padding,attributes));
            }
            
            for(var i = 0; i<=y_lines_count;i++){
                var y = top_padding+(i*(height - (top_padding+ bottom_padding))/y_lines_count);
                svg.appendChild(createLine(left_padding,y,width - right_padding,y,attributes));
            }
            svg.appendChild(y_axies);
            svg.appendChild(x_axies);
            
        }
        
        function drawColumns(svg,points){
            
            var seriesCount = points.length > 2 ? points.length : 2 ;
            var columnWidth = (x_factor*.90) / seriesCount;
            
            
            for(var j = 0; j<points.length; j++){
                var series = points[j];
        
                var attribute = {"fill":colors[j],"stroke-width":"1","stroke":"Black"};
                
                for(var i = 0; i<series.length;i++){
                    var y = series[i];
                    
                    var c = createColumn(i*x_factor + j*columnWidth + left_padding + 1,
                                         height - bottom_padding - (y*y_factor),
                                         columnWidth,
                                         (y*y_factor) - 1,
                                         attribute);
                    
                    svg.appendChild(c);
                    
                    
                }
            }
            
        }
        function drawLines(svg,points) {
            
            for(var j = 0; j<points.length; j++){
                var line = points[j];
                var y1 = line[0];
        
                var attribute = {"stroke":colors[j],"stroke-width":"2"};
                
                for(var i = 1; i<line.length;i++){
                    var y2 = line[i];
                    
                    var l = createLine((i-1)*x_factor + left_padding,
                                       height - bottom_padding - (y1*y_factor),
                                       i*x_factor + left_padding,
                                       height - bottom_padding - (y2*y_factor),
                                       attribute);
                
                    svg.appendChild(l);
                    
                    y1 = y2;
                }
            }
            
        }
        
        
        function createColumn(x,y,width,height,attributes) {
            var c = document.createElementNS(svgns,"rect");
            
            c.setAttribute("x",x);
            c.setAttribute("y",y);
            c.setAttribute("width",width);
            c.setAttribute("height",height);
            
            for(var x1 in attributes){
                c.setAttribute(x1,attributes[x1]);
            }                
            return c;
        }
        function createLine(x1,y1,x2,y2,attributes){
            var l = document.createElementNS(svgns,"line");
        
            l.setAttribute("x1",x1);
            l.setAttribute("y1",y1);
            l.setAttribute("x2",x2);
            l.setAttribute("y2",y2);
            for(var x in attributes){
                l.setAttribute(x,attributes[x]);
            }                
            return l;
        }
    }    
    
    function DrawXLabels(svg,labels){
        for(var i = 0; i<labels.length; i++){
            var txt = document.createElementNS(svgns,"text");
            txt.textContent = labels[i];
            
            var x = left_padding + i*x_factor;
            var y = height - bottom_padding + txtHeight;
            
            txt.setAttribute("x", x);
            txt.setAttribute("y", y);
            
            txt.setAttribute("transform","rotate(60, " + x + "," + y + ")");
            
            svg.appendChild(txt);
        }
    
    }
    
    function DrawYLabels(svg){
        for(var i = 0; i<=y_lines_count;i++){
            
            var y = top_padding+(i*(height - (top_padding+ bottom_padding))/y_lines_count);
            var x = left_padding;
            
            var txt = document.createElementNS(svgns,"text");

            txt.textContent = Math.round(y_max -( i* y_max /10)) + ".";
            
            txt.setAttribute("x", x);
            txt.setAttribute("y", y);
            txt.style.textAnchor = "end";
            txt.style.fontSize = ".7em";
            
            //txt.setAttribute("transform","rotate(30, " + x + "," + y + ")");
            
            svg.appendChild(txt);
            
        }
        
    }
    
    return {
            AddSeries : AddSeries,
            setXLabels : setXLabels,
            setChartType : setChartType,
            setBackGround : setBackGround,
            setSeries:setSeries,
			deleteSeries:deleteSeries
        };
    
};
