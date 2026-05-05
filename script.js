function findSchemes() {
  let income = parseInt(document.getElementById("income").value);
  let occupation = document.getElementById("occupation").value.toLowerCase();
  let caste = document.getElementById("caste").value.toLowerCase();
  let disability = document.getElementById("disability").value.toLowerCase();

  fetch("schemes.json")
    .then(response => response.json())
    .then(data => {

      let results = data.filter(scheme => {

        // 🔴 MAIN FILTER → income
        if (income > scheme.incomeLimit) return false;

        // optional caste
        if (scheme.caste && scheme.caste !== "any" && scheme.caste !== caste)
          return false;

        // optional occupation
        if (scheme.occupation && scheme.occupation !== "any" && scheme.occupation !== occupation)
          return false;

        // optional disability
        if (scheme.disability && scheme.disability !== disability)
          return false;

        return true;
      });

      let output = "";

      if (results.length === 0) {
        output += `
  <div class="scheme-box">
    <h4>${scheme.name}</h4>
    <p>${scheme.description}</p>
    <small>${scheme.details || ""}</small><br>

    <a href="${scheme.link}" target="_blank" class="scheme-btn">
      View Full Details
    </a>
  </div>
`;
      }

      document.getElementById("result").innerHTML = output;
    })
    .catch(error => {
      console.log("ERROR:", error);
    });
}
