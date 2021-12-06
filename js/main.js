var on = OmegaNum;

var game = {
P: [on(0)],
maxlayer: on(1),
pmode: 0,
prestigeaim: 1
}

function maxPrestige() {
let j;
let k=1;
for (j=0; j<game.P.length; j++) {
if (game.P[j].gte(10)) k=j+1
}
return k
}

function updateText() {
let t = "";
for (i=0;i<game.maxlayer;i++) {
	os=on.sqrt(game.P[i].div(10))
	if (game.P[i].lt(10)) t += "You have " + game.P[i].notation() + " <span class='nobr'>P<span class='supsub'><br>" + i + "</span></span>" + (i>=1 ? (", multiplying the previous layer by " + on.sqrt(game.P[i].plus(1).pow(2.5)).root(i).notation()) : "") + "(" + on.div(game.P[i].minus(os.floor().pow(2).mul(10)), os.floor().plus(1).pow(2).mul(10).minus(os.floor().pow(2).mul(10))).mul(100).floor().toString() + "%)<br>"
	else t += "You have " + game.P[i].notation() + " <span class='nobr'>P<span class='supsub'><br>" + i + "</span></span>" + (i>=1 ? (", multiplying the previous layer by " + on.sqrt(game.P[i].plus(1).pow(2.5)).root(i).notation()) : "") + ". You can prestige it for " + on.sqrt(game.P[i].div(10)).floor().notation() + " <span class='nobr'>P<span class='supsub'><br>" + (i+1) + "</span></span>" + "(" + on.div(game.P[i].minus(os.floor().pow(2).mul(10)), os.floor().plus(1).pow(2).mul(10).minus(os.floor().pow(2).mul(10))).mul(100).floor().toString() + "%)<br>"
}
document.getElementById("ptext").innerHTML = t
document.getElementById("p").innerHTML = (game.pmode ? maxPrestige() : on(game.prestigeaim).notation())
document.getElementById("pmode").innerHTML = "Mode:<br>" + ["Custom", "Max"][game.pmode]
document.getElementById("cm").style.display = (!game.pmode ? "inline" : "none")
}

setInterval(updateText, 1/60)

function prestige(a) {
if (game.P[a-1].gte(10)) {
if (game.maxlayer < a+1) {game.P.push(on(0)); game.maxlayer = game.maxlayer.plus(1)}
game.P[a] = game.P[a].plus(on.sqrt(game.P[a-1].div(10)).floor().mul((game.P.length>=a+2) ? (on.sqrt(game.P[a+1].plus(1).pow(2.5)).root(a+1)) : (1)))
game.P[a-1] = on(0)
}
}

/*
$(document).ready(function() {
	$(window).keydown(function(event){
		if(event.keyCode == 13) {
			event.preventDefault()
			return false
		}
	})
})
*/