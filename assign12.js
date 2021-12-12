function sendData(){
    const startCity = document.getElementsByName("startCity")[0].value;
    const startState = document.getElementsByName("startState")[0].value;
    const endCity = document.getElementsByName("endCity")[0].value;
    const endState = document.getElementsByName("endState")[0].value;

    if (startCity.length >0 && startState.length>0 && endCity.length >0 && endState.length>0){
      const queryString = "?startCity="+startCity+"&startState="+startState+"&endCity="+endCity+"&endState="+endState;
      let URL = "/cgi-bin/cs213/mileageAjaxJSON"+queryString;
      let request = new XMLHttpRequest();
              request.open("GET", URL, true);
              request.send();

              request.onreadystatechange = function() {
                  if (this.readyState == 4 && this.status == 200) {
                      let jsonObj = JSON.parse(this.responseText);
                      console.log(jsonObj);
                      let htmlTable = `<table class="mainTable">
                          <tr>
                              <th>Start City</th>
                              <th>Start State</th>
                              <th>End City</th>
                              <th>End State</th>
                              <th>Miles</th>
                              <th>Travel Mode</th>
                          </tr>`;
                      if (jsonObj.trip) {
                          htmlTable += `<tr>
                                          <td>${jsonObj.trip.startcity}</td>
                                          <td>${jsonObj.trip.startstate}</td>
                                          <td>${jsonObj.trip.endcity}</td>
                                          <td>${jsonObj.trip.endstate}</td>
                                          <td>${jsonObj.trip.miles}</td>`;
                              if (jsonObj.trip.tmode){
                                  htmlTable += `<td>${jsonObj.trip.tmode.join(', ')}</td>`;
                              }else{
                                  htmlTable += `<td></td>`;
                              }
                      }
                      htmlTable += `</table>`;
                      document.getElementById("tableResult").innerHTML = htmlTable;

                  }
              };
    }else{
        alert("All fields are required!");
    }
  }