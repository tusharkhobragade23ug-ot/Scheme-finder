function findSchemes() {

  let income = parseInt(document.getElementById("income").value);
 let occupation = document.getElementById("occupation").value.toLowerCase();
let caste = document.getElementById("caste").value.toLowerCase();

  fetch("schemes.json")
    .then(response => response.json())
    .then(data => {

      let results = data.filter(scheme => {
        return (scheme.occupation === occupation || scheme.occupation === "any") &&
               income <= scheme.incomeLimit &&
               (scheme.caste === caste || scheme.caste === "any");
      });

      let output = "";

      if (results.length === 0) {
       output = `<div class="alert alert-danger">No schemes found</div>`;
      } else {
        results.forEach(scheme => {
          output += "<div class='card p-3 mb-3'>";
          output += "<h5>" + scheme.name + "</h5>";
          output += "<p>" + scheme.description + "</p>";
          output += "</div>";
        });
      }

      document.getElementById("result").innerHTML = output;

    });
}