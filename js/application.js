$(document).ready(() => {

// listen for keypress - need to fix this to only listen for ENTER key (key 13)
  $("#search").on("click", () => {

// pass input value to variable, format, and pass to another variable. Need to update input field to have drop downs for Android or iOS apps
    var searchType = $('input[name=searchType]:checked').val()+"=";
    var input = $("#appid").val()
    var newData = input.split(" ").join(',');

    // console.log(newData)

// api call - will update to pull Android and iOS apps from single API. 448999087 or com.thechive.Chive
    var url = "https://itunes.apple.com/lookup?"+searchType+newData
    // var url = "http://api.searchman.io/v1/ios/us/apps?appIds="+newData+"&apiKey=xxxxxxxxxxxxxx"
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: url
    }).done((response) => {

// pass response to variable and loop through each object and display in UI
      var apps = response.results
      $(apps).each(function (index, value) {
        $("table").append(
          "<tr>" +
              "<td>" + "<img src="+value.artworkUrl60+">" + "</td>" +
              "<td>" + "<a href="+value.trackViewUrl+">" + value.trackName  + "</a>" + "</td>" +
              "<td>" + value.sellerName + "</td>" +
              "<td>" + value.bundleId + "</td>" +
              "<td>" + value.trackId + "</td>" +
              "<td>" + value.primaryGenreName + "</td>" +
              "<td>" + value.currentVersionReleaseDate.slice(0,-10) + "</td>" +
              "<td>" + value.averageUserRating + "</td>" +
              "<td>" + value.trackContentRating + "</td>" +
              // "<td>" + "<a href="+value.trackViewUrl+">" + "Click Here" + "</a>" + "</td>" +
              "<td>" + value.trackViewUrl + "</td>" +
              "<td>" + value.minimumOsVersion + "</td>" +
              "<td>" + value.version + "</td>" +
          "</tr>"
        )
      })
      $("a").attr('target','_blank');
      $('#appid').val(" ");
      console.log("success");
    }).fail((response) => {
      swal("Error", "Please verify that the data entered corresponds with your 'Search by' selection", "error");
      console.log("Ajax get request failed.");
    })
  })

// get current date and time for excel file name
  var currentdate = new Date();
    var datetime = "App_Search_"
    + (currentdate.getMonth() + 1)  + "."
                + currentdate.getDate() + "."
                + currentdate.getFullYear();
                // + currentdate.getHours() + ":"
                // + currentdate.getMinutes();


// export data to excel. Need to fix download to use custom export button
  $("#download").on("click", () => {
    $("table").tableExport({
      formats: ['csv'],
      filename: datetime,
      exportButtons: true
      // ignoreCols: 0
    });

  })

})
