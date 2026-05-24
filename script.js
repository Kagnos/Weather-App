fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/dayton?key=FRKPALS6NRC22D5HDJUWEA5ZA")
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
      console.log(response.description)
    });