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
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff00";
  ctx.font = "12px Arial";
  ctx.fillText("A[0,0]", 20, 190);

  ctx.fillStyle = "#ff3300";
  ctx.font = "12px Arial";
  ctx.fillText("A[0,1]", 60, 190);

  ctx.fillStyle = "#ffff00";
  ctx.font = "12px Arial";
  ctx.fillText("A[1,0]", 100, 190);

  ctx.fillStyle = "#33ccff";
  ctx.font = "12px Arial";
  ctx.fillText("A[1,1]", 140, 190);

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


  $("#restartLoop").on("click", function() {
    myLoop();
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
  
  // create the network
  var inputLayer = new Layer(2);
  var hiddenLayer = new Layer(3);
  var outputLayer = new Layer(1);

  inputLayer.project(hiddenLayer);
  hiddenLayer.project(outputLayer);

  var myNetwork = new Network({
    input: inputLayer,
    hidden: [hiddenLayer],
    output: outputLayer
  });

  // train the network
  var learningRate = 0.3;

  var i = 1; //  set your counter to 1
  var test = 0.5;

  function myLoop() { //  create a loop function
    setTimeout(function() { //  call a 3s setTimeout when the loop is called

      // var output = myNetwork.activate([Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.width)]);
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

      // ctx.fillStyle = "#000000";
      // ctx.fillRect(0, 0, 250, 40);
      // ctx.fillStyle = "#FFFFFF";
      // ctx.font = "30px Arial";
      //
      // ctx.fillText("Iteration " + i, 10, 35);
      data = {
        iteration: i,
        output1: output1, //000
        output2: output2, //011
        output3: output3, //101
        output4: output4 //110
      };
      setDataOnDOM(data);
      // console.log(data);

      if (i < 1500) { //  if the counter < 10, call the loop function
        i++;
        myLoop(); //  ..  again which will trigger another
      } //  ..  setTimeout()
    }, 20);
  }

  myLoop(); //  start the loop
});
