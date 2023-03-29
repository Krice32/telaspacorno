const data = JSON.stringify({
    "email": "murilo.paxi@gmail.com",
    "password": "Ehi@2020"
  });
  
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
    }
  });
  
  xhr.open("POST", "https://dev-senac-umbrella-api.azurewebsites.net/api/Authenticate/login");
  xhr.setRequestHeader("Content-Type", "application/json");
  
  xhr.send(data);