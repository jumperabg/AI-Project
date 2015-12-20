$(document).ready(function() {
  var data = {};
  var creatures = [];
  for (var j = 0; j < 4; j++) {
    creatures.push({
      x: 0,
      y: 0
    });
  }
  var canvas = $("#myCanvas")[0];
  var canvasContainer = $("#canvas-container");
  canvas.width = canvasContainer.width();
  var ctx = canvas.getContext("2d");

  function drawTheCanvas() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff00";
    ctx.font = "12px Arial";
    ctx.fillText("A[0,0]", 60, 190);

    ctx.fillStyle = "#ff3300";
    ctx.font = "12px Arial";
    ctx.fillText("A[0,1]", 100, 190);

    ctx.fillStyle = "#ffff00";
    ctx.font = "12px Arial";
    ctx.fillText("A[1,0]", 140, 190);

    ctx.fillStyle = "#33ccff";
    ctx.font = "12px Arial";
    ctx.fillText("A[1,1]", 180, 190);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "12px Arial";
    ctx.fillText("0", 25, 155);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "12px Arial";
    ctx.fillText("0.5", 15, 105);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "12px Arial";
    ctx.fillText("1", 25, 55);



    //draw coordinate system

    ctx.setLineDash([0, 0]);
    ctx.beginPath();
    ctx.moveTo(40, 150);
    ctx.lineTo(canvas.width, 150);
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();

    ctx.setLineDash([5, 15]);
    ctx.beginPath();
    ctx.moveTo(40, 100);
    ctx.lineTo(canvas.width, 100);
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();

    ctx.setLineDash([0, 0]);
    ctx.beginPath();
    ctx.moveTo(40, 50);
    ctx.lineTo(canvas.width, 50);
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(39, 0);
    ctx.lineTo(39, 201);
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();
  }
  drawTheCanvas();

  function draw(creature, canvas, color) {
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = color;
    ctx.fillRect(creature.x, creature.y, 2, 2);
  }

  function setDataOnDOM(data) {
    $("#iteration").html(data.iteration);
    $("#output1").html(data.output1);
    $("#output2").html(data.output2);
    $("#output3").html(data.output3);
    $("#output4").html(data.output4);
  }

  var myNetwork, learningRate, test;
  $("#clearCanvas").on("click", function() {
    ctx.globalAlpha = 1;
    drawTheCanvas();
    ctx.globalAlpha = 0.2;
  });
  $("#startLoop").on("click", function() {
    //create the network
    myNetwork = new Architect.Perceptron(2, 3, 1);

    // train the network
    learningRate = 0.3;

    i = 1; //  set your counter to 1
    test = 0.5;
    myLoop();

    $("#startLoop").prop('disabled', true);
  });

  var hideShowTable = 2;
  $("#hideTable").on("click", function() {
    if (hideShowTable % 2 === 0) {
      $("table").hide();
      $("#hideTable").text('Show Info');
    } else {
      $("table").show();
      $("#hideTable").text('Hide Info');
    }
    hideShowTable++;
  });

  function drawTheLines() {
    var output1 = myNetwork.activate([0, 0]);
    myNetwork.propagate(learningRate, [0]);
    // 0,1 => 1
    var output2 = myNetwork.activate([0, 1]);
    myNetwork.propagate(learningRate, [1]);
    // 1,0 => 1
    var output3 = myNetwork.activate([1, 0]);
    myNetwork.propagate(learningRate, [1]);
    // 1,1 => 0
    var output4 = myNetwork.activate([1, 1]);
    myNetwork.propagate(learningRate, [0]);
    // console.log(Math.floor(output[0] * 100), Math.floor(output[0] * 100));
    test += 0.5;
    creatures[0].x = output1[0] * 100 + test;
    creatures[0].y = output1[0] * 100 + 50;

    creatures[1].x = output2[0] * 100 + test;
    creatures[1].y = output2[0] * 100 + 50;

    creatures[2].x = output3[0] * 100 + test;
    creatures[2].y = output3[0] * 100 + 50;

    creatures[3].x = output4[0] * 100 + test;
    creatures[3].y = output4[0] * 100 + 50;

    draw(creatures[0], canvas, "#00ff00");
    draw(creatures[1], canvas, "#ff3300");
    draw(creatures[2], canvas, "#ffff00");
    draw(creatures[3], canvas, "#33ccff");

    data = {
      iteration: i,
      output1: output1, //000
      output2: output2, //011
      output3: output3, //101
      output4: output4 //110
    };
    setDataOnDOM(data);
  }

  var testCanvas = {
    x: 0,
    y: 0
  };

  function myLoop() { //  create a loop function
    //
    // for (var i = 0; i < 1500; i++) {
    //   drawTheLines();
    // }
    setTimeout(function() { //  call a 3s setTimeout when the loop is called
      drawTheLines();
      if (i < 1200) { //  if the counter < 10, call the loop function
        i++;
        myLoop(); //  ..  again which will trigger another
      } else {
        $("#startLoop").prop('disabled', false);
      } //  ..  setTimeout()
    }, 1);
  }

  // myLoop(); //  start the loop
});
