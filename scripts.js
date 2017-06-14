
var timer,x;
$(document).ready(function(){

	$("#break button").on("click", function(){
		var bval = parseInt($("#break .time").val());

		if($(this).hasClass("add")) 
			bval += 5;
		else
		{
			bval -= 5;
		}

		if(bval<0) bval = 0;
		$("#break .time").val(bval);
	});

	$("#pomodoro button").on("click", function(){
		var pval = parseInt($("#pomodoro .time").val());

		if($(this).hasClass("add")) 
			pval += 5;
		else
			pval -= 5;

		if(pval < 0) pval = 0;

		$("#pomodoro .time").val(pval);

		if($("#start").length)
		{
			var ptime = $("#pomodoro .time").val();
			if(parseInt(ptime) < 10)
			{
				$("#current-time span:nth-child(1)").html("0" + ptime);
			}
			else
				$("#current-time span:nth-child(1)").html(ptime);
		}

	});

	$("#controls").on("click","#start",function(){
		clearInterval(timer);

		if(checkInvalidity())
			alert("Enter valid values");
		else{	
			x = 0;
			startTimer($("#pomodoro .time").val(),0);
			$(this).prop({"id" : "pause"});
			$(this).html("Pause");
		}

	});

	$("#break .time, #pomodoro .time").on("keyup",function(e){
		if(e.keyCode == 13)
		{

			clearInterval(timer);	

			if(checkInvalidity())
				alert("Enter valid values.");
			else{
				x = 0;
				startTimer($("#pomodoro .time").val(),0);
				$("#start").prop({"id" : "pause"});
				$("#resume").prop({"id" : "pause"});
				$("#pause").html("Pause");
			}
		}

		else if($("#start").length)
		{
			var ptime = $("#pomodoro .time").val();
			var iptime = parseInt(ptime);
			if(iptime < 1 || !ptime)
			{
				$("#current-time span:nth-child(1)").html("00");
			}
			else if(iptime < 10)
			{
				$("#current-time span:nth-child(1)").html(0 + ptime);
			}
			else if(iptime >= 10)
				$("#current-time span:nth-child(1)").html(ptime);
		}

	});

	$("#controls").on("click", "#pause", function(){
		$("#message").html("Paused");	
		clearInterval(timer);
		$("#pause").prop({"id" : "resume"});
		$("#resume").html("Resume");
	});

	$("#controls").on("click", "#resume", function(){
		var pmin = parseInt($("#current-time span:nth-child(1)").html());
		var psec = parseInt($("#current-time span:nth-child(2)").html());
		clearInterval(timer);
		startTimer(pmin, psec);
		$("#resume").prop({"id" : "pause"});
		$("#pause").html("Pause");

	});

	$("#controls").on("click", "#reset", function(){
		clearInterval(timer);
		$("#current-time span:nth-child(1)").html("25");
		$("#current-time span:nth-child(2)").html("00");
		$("#controls button:nth-child(1)").prop({"id" : "start"});
		$("#pomodoro .time").val(25);
		$("#break .time").val(5);
		$("#start").html("Start");
		$("#message").html("Let's Start!");
	});
});

function checkInvalidity()
{
	return (!$("#pomodoro .time").val()||!($("#break .time").val())||$("#pomodoro .time").val()<0||$("#break .time").val()<0);
}

function startTimer(pmin,psec)
{
	if(x == 0)
		$("#message").html("Keep Going!");
	else $("#message").html("Break");
	var start = new Date();
	timer = setInterval(function(){

		var present = new Date();

		var disptime = ((pmin*60*1000) + (psec*1000)) - (present-start);
		disptime = Math.floor(disptime/1000.0);

		var minutes = Math.floor(disptime / 60.0);
		var seconds = disptime % 60;

		if(seconds < 0)
		{
			$("#current-time").html("<span>00</span>:<span>00</span>");
			clearInterval(timer);
			if(x == 0)
			{
				x = 1;
				console.log("x pomodoro"+x);
				startTimer($("#break .time").val(), 0);
			}
			else{
				x = 0;
				startTimer($("#pomodoro .time").val(), 0);
			}
		}

		if(seconds >= 0 && minutes >= 0)
		{

			if(seconds < 10) seconds = "0"+seconds;
			if(minutes < 10) minutes = "0"+minutes;
			$("#current-time").html("<span>" + minutes + "</span>:<span>" + seconds + "</span>");
		}
	}, 200);
}
