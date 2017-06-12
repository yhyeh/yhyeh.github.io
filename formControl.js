//////Option//////
obstacles = new Array();
obstacles[0] = ["請先設定障礙"]
obstacles[1] = ["超缺錢","想省錢","正常吃","微奢侈","超奢侈"];
obstacles[2] = ["不太餓","餓了","超餓"];
obstacles[3] = ["減肥中QQ","增肥中ㄏㄏ"];
obstacles[4] = ["超熱","熱","舒適","冷"];
obstacles[5] = ["垃圾級","均衡一下","養生級"];
obstacles[6] = ["酸","甜","苦","辣","鹹"];
////////////////
function renew(formId,index){ //renew limit option according to obstacles
	var o;
	if(formId == "order1"){
	  o = document.getElementById("limit1");
	}
	else if(formId == "order2"){
	  o = document.getElementById("limit2");
	}
	else if(formId == "order3"){
	  o = document.getElementById("limit3");
	}

	for(var i = 0;i < obstacles[index].length;i++)
		o.options[i]=new Option(obstacles[index][i], obstacles[index][i]);
	o.length=obstacles[index].length;
}

function btnEnable(){ // foolproof feature for submit button
	document.getElementById("notsatisfied").disabled = false;
	document.getElementById("recommand").disabled = true;
	document.getElementById("refill").disabled = false;
	document.getElementById("notsatisfied").className = "clickable";
	document.getElementById("recommand").className = "disclickable";
	document.getElementById("refill").className = "clickable";
	var temp=["condition1","condition2","condition3","limit1","limit2","limit3"];
	for(var i = 0;i < 6;i++){
		document.getElementById(temp[i]).disabled = true;
		document.getElementById(temp[i]).style.backgroundColor = "#BBBBBB";
		document.getElementById(temp[i]).style.color = "#888888";
	}
}

function checkObs(){ //At least choose one obstacle, or the button will be disabled
	if(document.getElementById("condition1").selectedIndex != 0){
		document.getElementById("recommand").disabled = false;
		document.getElementById("recommand").className = "clickable";
	}
	else{
		document.getElementById("recommand").disabled = true;
		document.getElementById("recommand").className = "disclickable";
		document.getElementById("notsatisfied").disabled = true;
		document.getElementById("notsatisfied").className = "disclickable";
		document.getElementById("refill").disabled = true;
		document.getElementById("refill").className = "disclickable";
		document.getElementById("result").style.visibility = "hidden";
	}
}
var repeatTimes = -1; //count the times that user has asked to change the result
function showResult(){ //determine which food will be recommanded by system and print it out
	repeatTimes++;
	if(repeatTimes == 0){
		for(var i = 0;i < foods.length;i++){
			foods[i].mWeight = 0;
		}
		var cdt = new Array();
		cdt[0] = document.getElementById("condition1").selectedIndex;
		cdt[1] = document.getElementById("condition2").selectedIndex;
		cdt[2] = document.getElementById("condition3").selectedIndex;
		var lmt = new Array();
		lmt[0] = document.getElementById("limit1").selectedIndex;
		lmt[1] = document.getElementById("limit2").selectedIndex;
		lmt[2] = document.getElementById("limit3").selectedIndex;
		for(var i = 0;i < foods.length;i++){ //count the weight according to the condition provided by user
			for(var j = 0;j < cdt.length;j++){
				if(cdt[j] == 0)
					continue;
				if(cdt[j] != 6){//其他
					if(foods[i].mProperty[cdt[j]] == lmt[j]){
						foods[i].mWeight += (cdt.length-j);
					}
					else if(foods[i].mProperty[cdt[j]] != -1){
						foods[i].mWeight -= 1;
					}
				}
				else{//特別想吃的味道
					for(var k = 0;k < foods[i].mProperty[6].length;k++)
						if(foods[i].mProperty[6][k] == lmt[j])
							foods[i].mWeight += (cdt.length-j);
				}
			}
		}
		foods.sort(function(a,b){return b.mWeight - a.mWeight});
	}
	if(repeatTimes >= 3/*foods.length*/){
		window.alert("不可以挑食ㄛˊˇˋ");
		location.reload();
		return;
	}
	document.getElementById("result").innerHTML = "障礙排除 ※ " + foods[repeatTimes].mName;
}
