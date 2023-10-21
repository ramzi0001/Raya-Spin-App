const wheel = document.getElementById("wheel").getContext('2d');
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
let username = "";
//Object that stores values of minimum and maximum angle for a value
//  jsoaLyqFyDep

const gifts = localStorage.getItem('gifts')?JSON.parse(localStorage.getItem('gifts')):[{value:"1"},{value:"2"},{value:"3"},{value:"4"},{value:"5"},{value:"6"}];

document.getElementById("inputfield1").value = gifts[0].value;
document.getElementById("inputfield2").value = gifts[1].value;
document.getElementById("inputfield3").value = gifts[2].value;
document.getElementById("inputfield4").value = gifts[3].value;
document.getElementById("inputfield5").value = gifts[4].value;
document.getElementById("inputfield6").value = gifts[5].value;

$("#imgfile1").attr('src',gifts[0].img);
$("#imgfile2").attr('src',gifts[1].img);
$("#imgfile3").attr('src',gifts[2].img);
$("#imgfile4").attr('src',gifts[3].img);
$("#imgfile5").attr('src',gifts[4].img);
$("#imgfile6").attr('src',gifts[5].img);

//  JSON.stringify() // to string
//  JSON.parse() // to obj

let users = localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):[];
loadTable();
const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: gifts[0].value, img: gifts[0].img },
  { minDegree: 31, maxDegree: 90, value: gifts[1].value , img: gifts[1].img },
  { minDegree: 91, maxDegree: 150, value: gifts[2].value , img: gifts[2].img },
  { minDegree: 151, maxDegree: 210, value: gifts[3].value, img: gifts[3].img },
  { minDegree: 211, maxDegree: 270, value: gifts[4].value, img: gifts[4].img },
  { minDegree: 271, maxDegree: 330, value: gifts[5].value, img: gifts[5].img },
  { minDegree: 331, maxDegree: 360, value: gifts[0].value, img: gifts[0].img },
];
//Size of each piece
const data = [16,16,16,16,16,16];
//background color for each piece
var pieColors = [
  "#e91430",
  "#f1a3a3",
  "#e91430",
  "#f1a3a3",
  "#e91430",
  "#f1a3a3",
];
//Create chart


let myChart = new Chart(wheel, {
  //Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],

  //Chart Type Pie
  type: "pie",
  data: {
    //Labels(values which are to be displayed on chart)
    labels: [gifts[1].value,gifts[0].value,gifts[5].value,gifts[4].value,gifts[3].value,gifts[2].value],
    
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },


  options: {
  
    //Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      
      //display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => { 
          if (context.chart.data.labels[context.dataIndex].length > 10) {
            firstPart = context.chart.data.labels[context.dataIndex].substring(0, 10);
            secondPart = context.chart.data.labels[context.dataIndex].substring(10,30);
            return firstPart + "-\r\n" +  secondPart;
          }else{ 
            return context.chart.data.labels[context.dataIndex] ;
          }
          // return context.chart.data.labels[context.dataIndex].split(' ')[0] +   "\r\n" + context.chart.data.labels[context.dataIndex]  ;
        },
        // font: { size: 15 },
        align : 'end',
        clamp : true ,
        // anchor : 'center',
        // offset : 25 ,
      },
      
    },
    
  },
});

function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}

//display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    //if the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<div style="display: flex;justify-content: center;align-items: center;"> <img src="${i.img?i.img:"asset/img/gift2.png"}" style="margin-right:4px;" width="40" height="40" alt="Image"><p> ${username} Win : ${i.value}</p></div>`;
      document.getElementById("usernameWin").innerHTML = username ;
      document.getElementById("giftWin").innerHTML = i.value ;
      $("#imgWin").attr('src',i.img?i.img:"asset/img/gift2.png");
      window.setTimeout(() => { 
        loadPage('win');
      },3000);
      spinBtn.disabled = false;
      // spinBtn.style.background = "radial-gradient(#fdcf3b 50%, #d88a40 85%)" ;

      var today = new Date();
      var day = today.getDate() + "";
      var month = (today.getMonth() + 1) + "";
      var year = today.getFullYear() + "";
      var hour = today.getHours() + "";
      var minutes = today.getMinutes() + "";
      var seconds = today.getSeconds() + "";

      day = checkZero(day);
      month = checkZero(month);
      year = checkZero(year);
      hour = checkZero(hour);
      minutes = checkZero(minutes);
      seconds = checkZero(seconds);

      const date_ = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds;

      users.unshift({
        username: username,
        gift: i.value,
        date: date_
      });
      localStorage.setItem('users', JSON.stringify(users));
      document.getElementById("username").value = "";
      loadTable();
      break;
    }
  }
};

function loadTable(){ 
  let table = '<tr class="header"> <th style="width:40%;">Username</th> <th style="width:20%;">GIFT</th> <th style="width:20%;">Date</th> <th style="width:20%;">Action</th> </tr>';
  let i = 0 ;
  users.forEach(element => {
    table +=  `<tr>
                <td>${element.username}</td>
                <td>${element.gift}</td>
                <td>${element.date}</td>
                <td>     
                  <button type="button" onclick="deleteUser(${i})" style="background-color: #f44336;" class="config-btn">DELETE</button>
                </td>
              </tr>`;
    i++;
  });
  document.getElementById("myTable").innerHTML = table;
}

function deleteUser(index){ 
  if (confirm('Are you sure you want to delete this User into the database?')) {
    // Save it!
    users.splice(index,1);
    localStorage.setItem('users', JSON.stringify(users));
    loadTable();
  }

}

//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
spinBtn.addEventListener("click", () => {
  username = document.getElementById("username").value
  if(username == "" || users.map(item => item.username).includes(username)){ 
    (username=="")?alert("username is empty!"):alert("username alredy exist!");  
  }else if(!spinBtn.disabled){ 
    spinBtn.disabled = true;
    // spinBtn.style.background = "radial-gradient(#ddd9c9 50%, #9d846c 85%)" ;
    //Empty final value
    finalValue.innerHTML = `<p>Good Luck!</p>`;
    //Generate random degrees to stop at
    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
    let rund = false ;
    if(randomDegree > 210 && randomDegree < 271){ 
      randomDegree = Math.floor(Math.random() * (265 - 0 + 1) + 0);
      rund = true ;
    }
    if(randomDegree > 270 && randomDegree < 331 && !rund){ 
      randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
      if(randomDegree > 270 && randomDegree < 331 ){ 
        randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
      }
    }
    //Interval for rotation animation
    let rotationInterval = window.setInterval(() => {
      //Set rotation for piechart
      /*
      Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
      */
      myChart.options.rotation = myChart.options.rotation + resultValue;

      //Update chart with new value;
      myChart.update();
      //If rotation>360 reset it back to 0
      if (myChart.options.rotation >= 360) {
        count += 1;
        resultValue -= 5;
        myChart.options.rotation = 0;
      } else if (count > 15 && myChart.options.rotation == randomDegree) {
        valueGenerator(randomDegree);
        clearInterval(rotationInterval);
        count = 0;
        resultValue = 101;
      }
    }, 40);
  }
});



// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

$('#inputfile1').change( function(event) {
  var fReader = new FileReader();
  fReader.readAsDataURL(event.target.files[0]);
  fReader.onloadend = function(e){
    var img = $("#imgfile1");
    img.src = e.target.result;
    $("#imgfile1").attr('src',img.src);
  }
});

$('#inputfile2').change( function(event) {
  var fReader = new FileReader();
  fReader.readAsDataURL(event.target.files[0]);
  fReader.onloadend = function(e){
    var img = $("#imgfile2");
    img.src = e.target.result;
    $("#imgfile2").attr('src',img.src);
  }
});
$('#inputfile3').change( function(event) {
  var fReader = new FileReader();
  fReader.readAsDataURL(event.target.files[0]);
  fReader.onloadend = function(e){
    var img = $("#imgfile3");
    img.src = e.target.result;
    $("#imgfile3").attr('src',img.src);
  }
});
$('#inputfile4').change( function(event) {
  var fReader = new FileReader();
  fReader.readAsDataURL(event.target.files[0]);
  fReader.onloadend = function(e){
    var img = $("#imgfile4");
    img.src = e.target.result;
    $("#imgfile4").attr('src',img.src);
  }
});
$('#inputfile5').change( function(event) {
  var fReader = new FileReader();
  fReader.readAsDataURL(event.target.files[0]);
  fReader.onloadend = function(e){
    var img = $("#imgfile5");
    img.src = e.target.result;
    $("#imgfile5").attr('src',img.src);
  }
});
$('#inputfile6').change( function(event) {
  var fReader = new FileReader();
  fReader.readAsDataURL(event.target.files[0]);
  fReader.onloadend = function(e){
    var img = $("#imgfile6");
    img.src = e.target.result;
    $("#imgfile6").attr('src',img.src);
  }
});

$('#inputfile1').click( function(event) {

  $("#imgfile1").attr('src','asset/img/gift2.png');

});
$('#inputfile2').click( function(event) {

  $("#imgfile2").attr('src','asset/img/gift2.png');

});
$('#inputfile3').click( function(event) {

  $("#imgfile3").attr('src','asset/img/gift2.png');

});
$('#inputfile4').click( function(event) {

  $("#imgfile4").attr('src','asset/img/gift2.png');

});
$('#inputfile5').click( function(event) {

  $("#imgfile5").attr('src','asset/img/gift2.png');

});
$('#inputfile6').click( function(event) {

  $("#imgfile6").attr('src','asset/img/gift2.png');

});

function saveGifts() { 

    // jQuery methods go here...
    const inputfield1 = {value : document.getElementById("inputfield1").value, img : $("#imgfile1").attr('src')};
    const inputfield2 = {value : document.getElementById("inputfield2").value, img : $("#imgfile2").attr('src')};
    const inputfield3 = {value : document.getElementById("inputfield3").value, img : $("#imgfile3").attr('src')};
    const inputfield4 = {value : document.getElementById("inputfield4").value, img : $("#imgfile4").attr('src')};
    const inputfield5 = {value : document.getElementById("inputfield5").value, img : $("#imgfile5").attr('src')};
    const inputfield6 = {value : document.getElementById("inputfield6").value, img : $("#imgfile6").attr('src')};

    localStorage.setItem('gifts', JSON.stringify([inputfield1,inputfield2,inputfield3,inputfield4,inputfield5,inputfield6])) ;
    window.location.reload();

}
function clearUsers(){ 

  if (confirm('Are you sure you want to delete All Users into the database?')) {
    localStorage.removeItem('users');
    users = [];
    loadTable();
  }
}

async function  download_users(){ 

    var CsvString = "Username, Gift, Date\r\n";
    users.forEach( row =>  {
      CsvString += row.username +", "+ row.gift +", "+ row.date + "\r\n";
    });

    // const handle = await window.showSaveFilePicker();
    // const writable = await handle.createWritable();

    // await writable.write(CsvString);
    // await writable.close();


    CsvString = "data:application/csv," + encodeURIComponent(CsvString);
    var x = document.createElement("A");
    x.setAttribute("href", CsvString.replace("\"", "").trim());
    x.setAttribute("download", "users_data.csv");
    document.body.appendChild(x);

    let textArea =  document.createElement("textarea") ;
    textArea.value = CsvString ;
    document.body.appendChild(textArea);
    textArea.select();
    // navigator.clipboard.writeText(texttoCopy);
    // range.selectNode(texttoCopy);
    // window.getSelection().removeAllRanges();
    // window.getSelection().addRange(range);
    document.execCommand("copy");
    document.body.removeChild(textArea);
    // window.getSelection().removeAllRanges();
    
    x.click();
    x.remove();
}
function myFunction() {
  // Declare variables
  var input, filter, table, tr, username, i, txtValueName,txtValueGift, gift;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    username = tr[i].getElementsByTagName("td")[0];
    gift = tr[i].getElementsByTagName("td")[1];
    if (username || gift) {
      txtValueName = username.textContent || username.innerText;
      txtValueGift = gift.textContent || gift.innerText;
      if ((txtValueName.toUpperCase().indexOf(filter) > -1) || (txtValueGift.toUpperCase().indexOf(filter) > -1)) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
loadPage('home');
function loadPage(page){ 
  document.getElementById('user').style.display = "none" ;
  document.getElementById('gift').style.display = "none" ;
  document.getElementById('home').style.display = "none" ;
  document.getElementById('win').style.display = "none" ;
  document.getElementById(page).style.display = "block" ;
  
}

