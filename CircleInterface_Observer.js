/**
 * CircleInterface_Observer1 which responds to event 1
 * @param subject The subject which this observer attachs on
 * @param interest The event that the new observer interests in
 */
function CircleInterface_Observer1(subject,interest){
	this.subject = subject;
	subject.attachObserver(this,interest);
	this.update = function(){
		alert("Menu pops up");
	}
}

/**
 * CircleInterface_Observer2 which responds to event 2
 * @param subject The subject which this observer attachs on
 * @param interest The event that the new observer interests in
 */
function CircleInterface_Observer2(subject,interest){
	this.subject = subject;
	subject.attachObserver(this,interest);
	this.update = function(){
		alert("Menu disappears");
	}
}

/**
 * CircleInterface_Observer3 which responds to event 3
 * @param subject The subject which this observer attachs on
 * @param interest The event that the new observer interests in
 */
function CircleInterface_Observer3(subject,interest){
	this.subject = subject;
	subject.attachObserver(this,interest);
	this.update = function(){
		alert("Select a new selection(tuple)");
	}
}

/**
 * CircleInterface_Observer4 which responds to event 4
 * @param subject The subject which this observer attachs on
 * @param interest The event that the new observer interests in
 */
function CircleInterface_Observer4(subject,interest){
	this.subject = subject;
	subject.attachObserver(this,interest);
	this.update = function(){
		alert("Deselect an existed selection(tuple)");
	}
}

/**
 * CircleInterface_Observer5 which responds to event 5
 * @param subject The subject which this observer attachs on
 * @param interest The event that the new observer interests in
 */
function CircleInterface_Observer5(subject,interest){
	this.subject = subject;
	subject.attachObserver(this,interest);
	this.update = function(){
		var selections = [];
		selections = this.subject.getState();
	
		var string="";
		for(var i=0; i< selections.length; i++){
			string = string + '<' + selections[i] + '>' + '\n';
		}
		alert("Updated current state:\n"+string);
	}
}