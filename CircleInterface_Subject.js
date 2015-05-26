/**
 * This this the subject in observer pattern
 * @author Xiaorui Dong Created in summer 2010
 */

/**
 * The array stores the svg interface and the corresponding javascript object
 */
var object=[];

/**
 * The constructor of the concentric circles interface. It is used 
 * @param svgName The name of the concentric circles control interface. Different names are needed for different control interface if there are multiple control interfaces in a single web page. 
 * 		  Also, it is the id of the SVG code section embeded in the XUL file
 * @param xb The center x-axis coodiante of the basic conentric graph 
 * @param yb The center y-axis coodiante of the basic conentric graph
 * @param rb The radius of the innermost circle, and the width between every consecutive circle
 * @param sb The space between every two pieces in the basic concentric circle shape
 * @param rm The radius of the menu graph
 * @param sm The space between every two pieces	in the menu shape
 * @param xt The x-axis coodiante of the display attributes area 
 * @param yt The y-axis coodiante of the display attributes area
 * @param st The space between the coherent two text lines
 * @param attributesCol	The attributes of the columns of the matrix 
 * @param attributesRow The attributes of the rows of the matrix 
 * @param attributesM The attributes of the access rights 
 */
function CircleInterface_Subject(svgName,xb,yb,rb,sb,rm,sm,xt,yt,st,attributesCol,attributesRow,attributesM){
	//Class variables
	object[svgName] = this;
	this.observers = [];
    this.selection = [];
    this.menuRegion;
    this.menuSelection = [];
	this.xlinkns = "http://www.w3.org/1999/xlink";
	this.svgNS = "http://www.w3.org/2000/svg";
	this.svgName = svgName;
	this.xb = xb;
	this.yb = yb;
	this.rb = rb;
	this.sb = sb;
	this.rm = rm;
	this.sm = sm;
	this.xt = xt;
	this.yt = yt;
	this.st = st;
	this.attributesCol = attributesCol;
	this.attributesRow = attributesRow;
	this.attributesM = attributesM;
	this.clipPathLength = 1.5*(this.rb/2+this.rb*(this.attributesRow.length-1));
	
	
	//Class functions
	this.checkInput = checkInput;
	this.attachObserver = attachObserver;
	this.detachObserver = detachObserver;
	this.notifyObservers = notifyObservers;
	this.frame =frame;
	this.menu = menu;
	this.basicCircle = basicCircle;
	this.attributesDisplayArea = attributesDisplayArea;
	this.updateSelection = updateSelection;
	this.getState = getState;

	
	//Check the validity of the input
	var valid = this.checkInput();


	//If all the inputs are valid then call the following
	if(valid == 1){
		this.frame();
		this.menu();
		this.basicCircle();
		this.attributesDisplayArea();
	}
}


/**
 * This function is used for adding a new observer. It builds the communication between the subject and objects.
 * @param observer The new observer that will be added to this subject
 * @param interest The event that the new observer interests in, and the interest is a list of number which stands for different event
 *		Menu pops up	1
 *		Menu disappears	2
 *		Selection a new selection(tuple)	3
 *		Deselect an existed selection(tuple)	4
 *		Update the set of selection which stands for the current state	5
 */
function attachObserver(observer,interest){
    this.observers.push([observer,interest]);
}


/**
 * This function is used for detaching a existing observer. It cuts off the communication between the subject and objects
 * @param observer The existing observer that will be deleted from the subject 
 */
function detachObserver(observer){
    for(var i=0; i<this.observers.length; i++){
    	if(observer == this.observers[i][0]){
    		this.observers.splice(i,1);
    	}
    }
}


/**
 * This function invokes the update() function in observers
 * @param event A number stands for different evet:
 *		Menu pops up	1
 *		Menu disappears	2
 *		Selection a new selection(tuple)	3
 *		Deselect an existed selection(tuple)	4
 *		Update the set of selection which stands for the current state	5
 */
function notifyObservers(event){
	//alert("Current event is: "+event);	//Use this alert to let you know which event is invoked
    for (var i=0; i<this.observers.length; i++){
    	for(var j=0; j<this.observers[i][1].length; j++){
    		if(this.observers[i][1][j] == event){
        		this.observers[i][0].update();
        	}
        }
    }
}


/**
 * Update the current state which is a set of selections. Update by adding the selections to "selection" variable.
 */
function updateSelection(){
	for(var i=0; i<this.menuSelection.length; i++){
		var singleSelection = [];
		singleSelection.push(this.menuRegion.getAttribute("attrRow"));
		singleSelection.push(this.menuRegion.getAttribute("attrCol"));
		singleSelection.push(this.menuSelection[i]);
		
		
		//Push a new selection in the "selection"
		this.selection.push(singleSelection);
	}
	
	//clear the menu selection since the data in "menuSelection" is passed to the "selection"
	this.menuSelection = [];
	this.notifyObservers(5);
}


/**
 * Check the input tuple exists or not
 * @param singleSelection the input tuple which will be checked for its existance
 * @return -1 if the tuple does not exist
 * @return otherwise return the index of the tuple
 */
function checkExist(singleSelection){
	for(var i=0; i<this.selection.length; i++){
		var j=0;
		while(this.selection[i][j] == singleSelection[j]){
			j++;
			if(j == singleSelection.length){
				return i;
			}
		}
	}


	//There is no duplicate selection
	return -1;
}


/**
 * Check the validity of the inputs
 * @return 1 if the input is valid
 * @return 0 if the input is not valid 
 */
function checkInput(){

	if(this.xb<0||this.yb<0){
		alert("The coordinates of the center of the basic concentric circles should be greater than zero");
		return 0;			//Returnning 0 means the input is not valid
	}
	if(this.rb<0){
		alert("The radius of the basic concentric circles should be greater than zero");
		return 0;
	}
	if(this.sb<0){
		alert("The space between every two pieces of the basic concentric circles should be greater than zero");
		return 0;
	}
	if(this.rm<0){
		alert("The radius of the menu should be greater than zero");
		return 0;
	}
	if(this.sm<0){
		alert("The space between every two pieces of the menu should be greater than zero");
		return 0;
	}
	if(this.xt<0||this.yt<0){
		alert("The coordinates of the text area for displaying attributes should be greater than zero");
		return 0;			//Returnning 0 means the input is not valid
	}
	if(this.st<0){
		alert("The space between the coherent two text lines should be greater than zero");
		return 0;			//Returnning 0 means the input is not valid
	}
	if(this.attributesCol.length == 0 || this.attributesRow.length == 0){
		alert("The lenght of the attributesCol or attributesRow must be greater than 0");
		return 0;
	}
	
	return 1;
}


/**
 * This is the getState() function in observer pattern. It will return the current state
 */
function getState(){
    return this.selection;
}


/**
 * Create the framework(structure) of the code of the concentric circles 
 */
function frame(){

	//Create svg definition section 
	var defs = document.createElementNS(this.svgNS,"defs");
	defs.setAttribute("id",this.svgName+"defs");
	document.getElementById(this.svgName).appendChild(defs);


	//Create the basic shape
	var basicCircleShape = document.createElementNS(this.svgNS,"g");
	basicCircleShape.setAttribute("id",this.svgName+"basicCircleShape");
	basicCircleShape.setAttribute("onmouseover","mouseoverBasicCircle(evt,'"+this.svgName+"')");
	basicCircleShape.setAttribute("onclick","mouseclickBasicCircle(evt,'"+this.svgName+"')");
	basicCircleShape.setAttribute("onmouseout","mouseoutBasicCircle(evt,'"+this.svgName+"')");
	document.getElementById(this.svgName).appendChild(basicCircleShape);


	//Area for displaying colume attribtues
	var basicCircleColAttributes = document.createElementNS(this.svgNS,"text");
	basicCircleColAttributes.setAttribute("id",this.svgName+"basicCircleColAttributes");
	basicCircleColAttributes.setAttribute("style","font-size:16pt; text-anchor:middle;");
	document.getElementById(this.svgName).appendChild(basicCircleColAttributes);


	//clipPath for the basic circle
	var basicShapeClip = document.createElementNS(this.svgNS,"clipPath");
	basicShapeClip.setAttribute("id",this.svgName+"basicShapeClip");
	document.getElementById(this.svgName+"defs").appendChild(basicShapeClip);


	//clipPath for the menu
    var menuShapeClip = document.createElementNS(this.svgNS,"clipPath");
	menuShapeClip.setAttribute("id",this.svgName+"menuShapeClip");
	document.getElementById(this.svgName+"defs").appendChild(menuShapeClip);


	//Create the menu shape
	var menuShape = document.createElementNS(this.svgNS,"g");
	menuShape.setAttribute("id",this.svgName+"menuShape");
	menuShape.setAttribute("onmouseover","mouseoverMenu(evt,'"+this.svgName+"')");
	menuShape.setAttribute("onmouseout","mouseoutMenu(evt,'"+this.svgName+"')");
	menuShape.setAttribute( "onclick", "mouseclickMenu(evt,'"+this.svgName+"')");
	document.getElementById(this.svgName+"defs").appendChild(menuShape);


	//The following means: <use id="menu" xlink:href="#menuShape" x="0" y="0"  onclick="mouseclickMenu(evt)"/>
	var menu = document.createElementNS(this.svgNS,"use");
	menu.setAttribute( "id", this.svgName+"menu");
	menu.setAttributeNS(this.xlinkns, "xlink:href", "#"+this.svgName+"menuShape");
	menu.setAttribute( "x", "0");
	menu.setAttribute( "y", "0");
	document.getElementById(this.svgName+"defs").appendChild(menu);


	//Area for displaying popup menu
	var popup = document.createElementNS(this.svgNS,"g");
	popup.setAttribute("id",this.svgName+"popup");
	popup.setAttribute("selected",0);
	document.getElementById(this.svgName).appendChild(popup);	


	//Area for displaying some info
	var attributeDisplayArea = document.createElementNS(this.svgNS,"g");
	attributeDisplayArea.setAttribute("id",this.svgName+"attributeDisplayArea");
	document.getElementById(this.svgName).appendChild(attributeDisplayArea);
}
	
	
/**
 * Create the display area for displaying the attributes of the region where the mouse is.
 */
function attributesDisplayArea(){
	var text = document.createElementNS(this.svgNS,"text");
	text.setAttribute("x",this.xt);
	text.setAttribute("font-size","20px");

	for(var i=1; i<=4; i++){
		text.setAttribute("y",this.yt+this.st*(i-1));
		text.setAttribute("id",this.svgName+"text"+i);
		newText = text.cloneNode(true);
		document.getElementById(this.svgName+"attributeDisplayArea").appendChild(newText);
	}
} 
	
	
/**
 * Create the popup menu which contains options defined in "attributeM"
 */
function menu(){
	
	var path = document.createElementNS(this.svgNS,"path");
	var length = this.attributesM.length;
	var angle = 360/length;
	var r = this.rb/2+this.rb*(this.attributesRow.length-1);	//The radius of the outermost circle

	//Create proper clip path
	if(length >= 3){
		path.setAttribute("d","M "+(this.clipPathLength*Math.tan(angle*Math.PI/360)-this.sm)+" "+(-this.clipPathLength)+" L 0 0 L "+(-this.clipPathLength*Math.tan(angle*Math.PI/360)+this.sm)+" "+(-this.clipPathLength));
	}
	else if(length == 2){
		path.setAttribute("d","M "+(-this.clipPathLength)+" "+(-this.clipPathLength)+" L "+this.clipPathLength+" "+(-this.clipPathLength)+" L "+this.clipPathLength+" "+(-this.sm)+" L "+(-this.clipPathLength)+" "+this.sm);
	}
	document.getElementById(this.svgName+"menuShapeClip").appendChild(path);
	
		
	if(length > 1){

		//Create the path where the comments appended
		var menuOutmost = document.createElementNS(this.svgNS,"path");

		menuOutmost.setAttribute("id",this.svgName+"menuOutmost");
		menuOutmost.setAttribute("d","M 0 "+(-this.rm)+" A "+(this.rm)+" "+(this.rm)+", 0, 1, 1, -1"+(-this.rm)+" Z");
		menuOutmost.setAttribute("style", "fill:none;");
		document.getElementById(this.svgName+"menuShape").appendChild(menuOutmost);


		//Create comments displaying area
		var menuCircleAttributes = document.createElementNS(this.svgNS,"text");
		menuCircleAttributes.setAttribute( "id", this.svgName+"menuCircleAttributes");
		menuCircleAttributes.setAttribute( "style", "font-size:16pt; text-anchor:middle;");
		document.getElementById(this.svgName+"menuShape").appendChild(menuCircleAttributes);
	

		//Attach the comments
		var position=0;				//The start point of the clip path
		var textPath = document.createElementNS(this.svgNS,"textPath");
		for(var k=0;k<=length;k++){
			textPath.setAttributeNS(this.xlinkns, "xlink:href", "#"+this.svgName+"menuOutmost");
			textPath.setAttribute( "startOffset", ""+position+"%");

			if(position==100){
				textPath.textContent = this.attributesM[0];
			}
			else{
				textPath.textContent = this.attributesM[k];
			}

			var newTextPath = textPath.cloneNode(true);
			position = position+100/length;
			document.getElementById(this.svgName+"menuCircleAttributes").appendChild(newTextPath);
		}	


		//Background circle which is used for covering and disable the basic shape functionalities temporarily
		var circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
		circle.setAttribute("cx", 0);
		circle.setAttribute("cy", 0);
		circle.setAttribute("r", 3*r);
		circle.setAttribute("id", this.svgName+"bCircle");
		circle.setAttribute("fill","#ffffff");
		circle.setAttribute("style","fill-opacity:0.0;");
		document.getElementById(this.svgName+"menuShape").appendChild(circle);


		//Create a new menu piece by piece
		var rotate = 0;
		var circle = document.createElementNS(this.svgNS,"circle");
		for(var i=0;i<length;i++){
		
			//Create menu piece item
			circle.setAttribute("cx",0);
			circle.setAttribute("cy",0);
			circle.setAttribute("r",this.rm);
			circle.setAttribute("selected",0);
			circle.setAttribute("style", "fill:#FF8000; fill-opacity:0.5");	
			circle.setAttribute("attr", this.attributesM[i]);
			circle.setAttribute("clip-path", "url(#"+this.svgName+"menuShapeClip)");
			circle.setAttribute("transform", "rotate("+rotate+",0,0)");


			//Rotate the menu piece item
			rotate=rotate+angle;
			var newCircle = circle.cloneNode(true);
			document.getElementById(this.svgName+"menuShape").appendChild(newCircle);
		}
	}
}


/**
 * Create the basic concentric circles. It adds details to the framework created by "frame()" function
 */
function basicCircle(){

	var path = document.createElementNS(this.svgNS,"path");
	var textPath = document.createElementNS(this.svgNS,"textPath");
	var text = document.createElementNS(this.svgNS,"text");
	var length = this.attributesCol.length;						//Count how many column the interface has
	var r = this.rb/2+this.rb*(this.attributesRow.length-1);	//The radius of the outermost circle
	var angle = 360/length;										//The angle of each piece
	

	//Add a path where the comments around the basic circle attach
	var basicOutmost = document.createElementNS(this.svgNS,"path");
	basicOutmost.setAttribute("d","M "+this.xb+" "+(this.yb-r)+" A "+r+" "+r+", 0, 1, 1, "+(this.xb-1)+" "+(this.yb-r)+" Z");
	basicOutmost.setAttribute("id",this.svgName+"basicOutmost");
	basicOutmost.setAttribute("style", "fill:none;");
	document.getElementById(this.svgName+"basicCircleShape").appendChild(basicOutmost);


	//Add column attributes
	var position=0;								//The start point of the clip path
	for(var k=0;k<=this.attributesCol.length;k++){
		textPath.setAttributeNS(this.xlinkns, "xlink:href", "#"+this.svgName+"basicOutmost");
		textPath.setAttribute( "startOffset", ""+position+"%");
		if(position==100){
			textPath.textContent = this.attributesCol[0];
		}
		else{
			textPath.textContent = this.attributesCol[k];
		}
		var newTextPath = textPath.cloneNode(true);
		position = position+100/length;
		document.getElementById(this.svgName+"basicCircleColAttributes").appendChild(newTextPath);
	}


	//Create proper clip path
	if(length >= 3){
		path.setAttribute("d","M "+(this.xb+this.clipPathLength*Math.tan(angle*Math.PI/360)-this.sb)+" "+(this.yb-this.clipPathLength)+" L "+this.xb+" "+this.yb+" L "+(this.xb-this.clipPathLength*Math.tan(angle*Math.PI/360)+this.sb)+" "+(this.yb-this.clipPathLength));
	}
	if(length ==2){
		path.setAttribute("d","M "+(this.xb-this.clipPathLength)+" "+(this.yb-this.clipPathLength)+" L "+(this.xb+this.clipPathLength)+" "+(this.yb-this.clipPathLength)+ " L "+(this.xb+this.clipPathLength)+" "+(this.yb-this.sb)+ " L "+(this.xb-this.clipPathLength)+" "+(this.yb+this.sb));
	}
	document.getElementById(this.svgName+"basicShapeClip").appendChild(path);

	
	//Create the concentric circles piece by piece
	var rotate = 0; 										//The initial stating spot
	var color = 1;											//The color switch
	r = this.rb/2+this.rb*(this.attributesRow.length-1);
	for(var j=0;j<this.attributesRow.length;j++){		
		
		var circle = document.createElementNS(this.svgNS,"circle");
		circle.setAttribute("cx", this.xb);
		circle.setAttribute("cy", this.yb);
		circle.setAttribute("style","fill:#FFFFFF");
		circle.setAttribute("r", r);
		var newCircle = circle.cloneNode(true);
		document.getElementById(this.svgName+"basicCircleShape").appendChild(newCircle);	
		
		
		//Add the row comment
		text.setAttribute( "x", this.xb);
		text.setAttribute( "y", (this.yb-r+this.rb/2));
		text.setAttribute( "style", "font-size:12pt; text-anchor:middle;");
		text.textContent = this.attributesRow[j];
		var newText = text.cloneNode(true);
		document.getElementById(this.svgName+"basicCircleShape").appendChild(newText);


		for(var i=0;i<this.attributesCol.length;i++){
			circle.setAttribute("cx", this.xb);
			circle.setAttribute("cy", this.yb);
			circle.setAttribute("r", r);
			circle.setAttribute("attrRow", this.attributesRow[j]);
			circle.setAttribute("attrCol", this.attributesCol[i]);
			circle.setAttribute("attrM", "");	
			circle.setAttribute("selected", 0); 				//"Selected" attribute is used for checking whether the area is selected or not								
		
			if(length != 1)
				circle.setAttribute("clip-path", "url(#"+this.svgName+"basicShapeClip)" ); 
			circle.setAttribute("transform","rotate("+rotate+","+this.xb+","+this.yb+")");

			if(color==1){										
				circle.setAttribute("style","fill:#1e90ff; fill-opacity:0.7");
				circle.setAttribute("defaultFill", "#1e90ff");
			}
			else{
				circle.setAttribute("style","fill:#ffffff; fill-opacity:0.7");
				circle.setAttribute("defaultFill", "#ffffff");
			}
			var newCircle = circle.cloneNode(true);
			document.getElementById(this.svgName+"basicCircleShape").appendChild(newCircle);
			
			rotate=rotate+angle;							//Create the next piece
		}


		r = r - this.rb;									//Reduce the radius in order to create circles from outside to inside
		color = (color+1)%2;								//The color switch
	}
}


/**
 * Show the attributes of the mouseover area dynamically
 * @param svgName The name of the concentric graph. Different names are needed for different graph if you have multi graph in one web page.Also,it is the id of the SVG section embeded in the XUL file
 * @param evt The event stores the mouse action
 */
function showAttr(svgName,evt){
	var text;

	text = document.getElementById(svgName+"text1");
	text.textContent= "Row: "+evt.target.getAttribute("attrRow");

	text = document.getElementById(svgName+"text2");
	text.textContent = "Colomn: "+evt.target.getAttribute("attrCol");

	text = document.getElementById(svgName+"text3");
	text.textContent = "Menu: "+evt.target.getAttribute("attrM");			

	text = document.getElementById(svgName+"text4");
	text.textContent = "Selected :"+evt.target.getAttribute("selected");
}


/**
 * Attach circle menu to the corresponding place where the mouse is
 * @param evt The event stores the mouse action
 * @param svgName The name of the concentric circles control interface. Different names are needed for different control interface if there are multiple control interfaces in a single web page. 
 * 		  Also, it is the id of the SVG code section embeded in the XUL file
 */
function attachMenu(evt,svgName){
	var Menu = document.getElementById(svgName+"menu");
	var MenuShape = document.getElementById(svgName+"menuShape");
	var attrRow= object[svgName].menuRegion.getAttribute("attrRow");
	var attrCol= object[svgName].menuRegion.getAttribute("attrCol");
	
	
	//Restore menu
	for(var i=0;i<MenuShape.childNodes.length;i++){
  		var node = MenuShape.childNodes[i];
  	  	if(node.nodeType == 1 && node.getAttribute("attr") !=null){
  	  		node.setAttribute("selected", 0);											//"Selected" = 0 means the region is NOT selected
  	  		node.setAttribute("style", "fill:#FF8000; fill-opacity:0.5");
  	  	}
	}


	//Show the selected menu pieces
	for(var i=0;i<MenuShape.childNodes.length;i++){
  		var node = MenuShape.childNodes[i];
  	  	if(node.nodeType == 1 && node.getAttribute("attr") !=null){
  	  		var attr = node.getAttribute("attr");
  	  		
  	  		//Search "attr" in the class variable "selection" 
  	  		for(var j=0; j<object[svgName].selection.length; j++){
  	  			if(object[svgName].selection[j][0] == attrRow){
					if(object[svgName].selection[j][1] == attrCol){
						if(object[svgName].selection[j][2] == attr){
							node.setAttribute("selected", 1);
							node.setAttribute("style", "fill:#FF8000; fill-opacity:0.9");
							object[svgName].selection.splice(j,1);
							j--;
						}
					}
				}
  	  		}
  	 	}
  	}


  	//Change center coordinator x y to be the current mouse's position
	Menu.setAttribute("x",evt.pageX);
	Menu.setAttribute("y",evt.pageY);
	var newMenu = Menu.cloneNode(true);
	document.getElementById(svgName+"popup").appendChild(newMenu);
	
	
	//Invoke the corresponding event
	object[svgName].notifyObservers(1);
}
	
	
/** 
 * Remove the popup menu from the interface
 * @param svgName The name of the concentric circles control interface. Different names are needed for different control interface if there are multiple control interfaces in a single web page. 
 * 		  Also, it is the id of the SVG code section embeded in the XUL file
 */
function removeMenu(svgName){
	var element = document.getElementById(svgName+"popup");
	if (element.hasChildNodes()){
		while (element.childNodes.length >= 1 ){
			element.removeChild(element.firstChild);       
		} 
	}


	//Invoke the corresponding event
	object[svgName].notifyObservers(2);
}


/**
 * This function is called when the mouse is over the basic circle
 * @param evt The event stores the mouse action
 * @param svgName The name of the concentric circles control interface. Different names are needed for different control interface if there are multiple control interfaces in a single web page. 
 * 		  Also, it is the id of the SVG code section embeded in the XUL file
 */
function mouseoverBasicCircle(evt,svgName){
	if(evt.target.getAttribute("selected") == 0 || evt.target.getAttribute("selected") == 1){
		evt.target.setAttribute("style", "fill:#8AFB17; fill-opacity:0.5");
		showAttr(svgName,evt);
	}
}
	
	
/**
 * This function is called when the mouse is out of the basic circle
 * @param evt The event stores the mouse action
 * @param svgName The name of the concentric circles control interface. Different names are needed for different control interface if there are multiple control interfaces in a single web page. 
 * 		  Also, it is the id of the SVG code section embeded in the XUL file
 */
function mouseoutBasicCircle(evt,svgName){
	if(evt.target.getAttribute("selected") == 0){
		var defaultColor=evt.target.getAttribute("defaultFill");
		evt.target.setAttribute("style", "fill:"+defaultColor+"; fill-opacity:0.7");
	}
}


/**
 * This function is called when the mouse is clicked on the basic circle
 * @param evt The event stores the mouse action
 * @param svgName The name of the concentric circles control interface. Different names are needed for different control interface if there are multiple control interfaces in a single web page. 
 * 		  Also, it is the id of the SVG code section embeded in the XUL file
 */
function mouseclickBasicCircle(evt,svgName){
	object[svgName].menuRegion = evt.target;

	if(evt.target.getAttribute("selected") == 0 || evt.target.getAttribute("selected") == 1){

		//If there "attributesM" is an empty set or it only has one element, then there is no need to pop up the menu. Otherwise, the menu pops up
		if(object[svgName].attributesM.length > 1){
			evt.target.setAttribute("selected",1);											//"Selected" = 1 means the area is selected
			evt.target.setAttribute("style", "fill:#8AFB17; fill-opacity:0.5");	
			attachMenu(evt,svgName);														//attach the menu to the mouse location
		}
		else if(object[svgName].attributesM.length == 1){
			if(evt.target.getAttribute("selected") == 0){									//"Selected" = 0 in evt.target means the current region has NOT been selected yet
				evt.target.setAttribute("selected", 1);										//"Selected" = 1 means the region is selected now
				evt.target.setAttribute("attrM", object[svgName].attributesM[0]);
				evt.target.setAttribute("style", "fill:#8AFB17; fill-opacity:0.5");
				
				
				//Add the selected selection(tuple) to the curent state (a set of selections)
				var singleSelection = [evt.target.getAttribute("attrRow"),evt.target.getAttribute("attrCol"),evt.target.getAttribute("attrM")];
				object[svgName].selection.push(singleSelection);
				object[svgName].notifyObservers(3);											//Event 3: A new selection (tuple) is selected
				object[svgName].notifyObservers(5);											//Event 5: The new selection (tuple) is added to the curent state (a set of selections)
			}
			else if(evt.target.getAttribute("selected") == 1){								//"Selected=1" in evt.target means the current region was selected before

				//Remove the selection(tuple) from the curent state (a set of selections)
				var attrRow = evt.target.getAttribute("attrRow");
				var attrCol = evt.target.getAttribute("attrCol");
				var attrM = evt.target.getAttribute("attrM");
				for(var j=0; j<object[svgName].selection.length; j++){
  	  				if(object[svgName].selection[j][0] == attrRow){
						if(object[svgName].selection[j][1] == attrCol){
							if(object[svgName].selection[j][2] == attrM){
								object[svgName].selection.splice(j,1);
								object[svgName].notifyObservers(4);
								object[svgName].notifyObservers(5);
								break;
							}
						}
					}
  	  			}
  	  			
  	  			evt.target.setAttribute("selected", 0);										//"Selected" = 0 means the region is NOT selected
				var defaultColor = evt.target.getAttribute("defaultFill");
				evt.target.setAttribute("attrM", "");
				evt.target.setAttribute("style", "fill:"+defaultColor+"; fill-opacity:0.7");
			}
		}
		else if(object[svgName].attributesM.length == 0){
			if(evt.target.getAttribute("selected") == 0){									//"Selected" = 0 in evt.target means the current region has NOT been selected yet
				evt.target.setAttribute("selected", 1);										//"Selected" = 1 means the region is selected now
				evt.target.setAttribute("style", "fill:#8AFB17; fill-opacity:0.5");
				
				
				//Add the selected selection(tuple) to the curent state (a set of selections)
				var singleSelection = [evt.target.getAttribute("attrRow"),evt.target.getAttribute("attrCol")];
				object[svgName].selection.push(singleSelection);
				object[svgName].notifyObservers(3);											//Event 3: A new selection (tuple) is selected
				object[svgName].notifyObservers(5);											//Event 5: The new selection (tuple) is added to the curent state (a set of selections)
			}
			else if(evt.target.getAttribute("selected") == 1){								//"Selected=1" in evt.target means the current region was selected before

				//Remove the selection(tuple) from the curent state (a set of selections)
				var attrRow = evt.target.getAttribute("attrRow");
				var attrCol = evt.target.getAttribute("attrCol");
				for(var j=0; j<object[svgName].selection.length; j++){
  	  				if(object[svgName].selection[j][0] == attrRow){
						if(object[svgName].selection[j][1] == attrCol){
							object[svgName].selection.splice(j,1);
							object[svgName].notifyObservers(4);								//Event 4: A existing selection (tuple) is deselected
							object[svgName].notifyObservers(5);
							break;
						}
					}
  	  			}
  	  			
  	  			evt.target.setAttribute("selected", 0);										//"Selected" = 0 means the region is NOT selected
				var defaultColor = evt.target.getAttribute("defaultFill");
				evt.target.setAttribute("style", "fill:"+defaultColor+"; fill-opacity:0.7");
			}
		}
	}
}


/**
 * This function is called when the mouse is over the menu
 * @param evt The event stores the mouse action
 * @param svgName The name of the concentric circles control interface. Different names are needed for different control interface if there are multiple control interfaces in a single web page. 
 * 		  Also, it is the id of the SVG code section embeded in the XUL file
 */
function mouseoverMenu(evt,svgName){
	if(evt.target.getAttribute("selected") == 0){
		evt.target.setAttribute("style", "fill:#FF8000; fill-opacity:0.9");
	}
}


/**
 * This function is called when the mouse moves out of the menu
 * @param evt The event stores the mouse action
 * @param svgName The name of the concentric circles control interface. Different names are needed for different control interface if there are multiple control interfaces in a single web page. 
 * 		  Also, it is the id of the SVG code section embeded in the XUL file
 */
function mouseoutMenu(evt,svgName){
	if(evt.target.getAttribute("selected") == 0){
		evt.target.setAttribute("style", "fill:#FF8000; fill-opacity:0.5");
	}
}


/**
 * This function is called when the mouse is clicked in the menu
 * @param evt The event stores the mouse action
 * @param svgName The name of the concentric circles control interface. Different names are needed for different control interface if there are multiple control interfaces in a single web page. 
 * 		  Also, it is the id of the SVG code section embeded in the XUL file
 */
function mouseclickMenu(evt,svgName){

	if(evt.target.getAttribute("id") == svgName+"bCircle"){							//If the mouse clicks the area except the menu area, then the menu will disappear and the menu selections will be stored
		var content="";
		var targetShape = evt.currentTarget;


		//Get the menu selection
		for(var i=0;i<targetShape.childNodes.length;i++){
  	  		var node = targetShape.childNodes[i];
			if(node.nodeType == 1 && node.getAttribute("selected") == 1){
				object[svgName].menuSelection.push(node.getAttribute("attr"));		//Store the menu selection into class varible "menuSelection"
			}
		}


	 	//Store the selection into the "attrM" of the selected region
		for(var i=0;i<object[svgName].menuSelection.length;i++){
			content = content + object[svgName].menuSelection[i] +' ';
		}


		//Check whether there is a menu selection
		if(content == ""){
			//There is no menu selection
			var defaultColor = object[svgName].menuRegion.getAttribute("defaultFill");
			object[svgName].menuRegion.setAttribute("selected",0);					//"Selected=0" in evt.target means the current region has NOT been selected yet
			object[svgName].menuRegion.setAttribute("attrM", "");					//Restore the "attrM" attribute
			object[svgName].menuRegion.setAttribute("style", "fill:"+defaultColor+"; fill-opacity:0.7");		//Restore the color
		}
		else{
			object[svgName].menuRegion.setAttribute("attrM",content.trim());		//Store the selections in "attrM"
		}


		//Remove the menu
		removeMenu(svgName);
		//Update the menu selections
		object[svgName].updateSelection();
	}
	else if(evt.target.getAttribute("selected") == 0){								//"Selected=0" in evt.target means the current region has NOT been selected yet
		evt.target.setAttribute("selected", 1);
		evt.target.setAttribute("style", "fill:#FF8000; fill-opacity:0.9");
		object[svgName].notifyObservers(3);											//A selection (tuple) is selected
	}
	else if(evt.target.getAttribute("selected") == 1){								//"Selected=1" in evt.target means the current region was selected before
		evt.target.setAttribute("selected", 0);
		evt.target.setAttribute("style", "fill:#FF8000; fill-opacity:0.5");
		object[svgName].notifyObservers(4);											//Deselect a selection (tuple)
	}	
}