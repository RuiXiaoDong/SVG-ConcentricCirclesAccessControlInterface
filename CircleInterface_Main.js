/**
 * This function is equivalent to the main function in Java
 * @param svgName The name of the concentric circles control interface. Different names are needed for different control interface if there are multiple control interfaces in a single web page. 
 * 		  Also, it is the id of the SVG code section embeded in the XUL file
 * @param xb The x-axis coodiante of the basic conentric graph 
 * @param yb The y-axis coodiante of the basic conentric graph
 * @param rb The radius of the innermost circle, and the width between every consecutive circle
 * @param sb The space between every two pieces of the basic concentric circle shape
 * @param rm The radius of the menu graph
 * @param sm The space between every two pieces	of the menu shape
 * @param xt The x-axis coodiante of the displaying text area 
 * @param yt The y-axis coodiante of the displaying text area 
 * @param st The space between the consecutive text lines
 * @param attributesCol	The attributes (options) of the columns
 * @param attributesRow The attributes (options) of the rows
 * @param attributesM The attributes (options) of the menu
 */
function main(svgName,xb,yb,rb,sb,rm,sm,xt,yt,st,attributesCol,attributesRow,attributesM){
	//Create a new subject for the ellipse Interface control
	circleInterface = new CircleInterface_Subject(svgName,xb,yb,rb,sb,rm,sm,xt,yt,st,attributesCol,attributesRow,attributesM);

	//Create a new observer for the ellipse Interface control
	observer1 = new CircleInterface_Observer1(circleInterface,[1]);
	observer2 = new CircleInterface_Observer2(circleInterface,[2]);
	observer3 = new CircleInterface_Observer3(circleInterface,[3]);
	observer4 = new CircleInterface_Observer4(circleInterface,[4]);
	observer5 = new CircleInterface_Observer5(circleInterface,[5]);
}