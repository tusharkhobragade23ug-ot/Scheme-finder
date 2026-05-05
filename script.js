function findSchemes() {

  let income = parseInt(document.getElementById("income").value) || 0;

  let occupation = document.getElementById("occupation").value;
  let caste = document.getElementById("caste").value;
  let disability = document.getElementById("disability").value;

  // safe lowercase
  occupation = occupation ? occupation.toLowerCase() : "";
  caste = caste ? caste.toLowerCase() : "";
  disability = disability ? disability.toLowerCase() : "";

  fetch("schemes.json")
    .then(response => response.json())
    .then(data => {

      let results = data.filter(scheme => {

        // income filter
        if (income > scheme.incomeLimit) return false;

        // caste filter
        if (caste && scheme.caste !== "any" && scheme.caste !== caste)
          return false;

        // occupation filter
        if (occupation && scheme.occupation !== "any" && scheme.occupation !== occupation)
          return false;

        // disability filter
        if (scheme.disability && scheme.disability !== disability)
          return false;

        return true;
      });

      let output = "";

      if (results.length === 0) {
        output = "<div class='scheme-box'>No schemes found</div>";
      } else {
        results.forEach(scheme => {
          output += `
            <div class="scheme-box">
              <h4>${scheme.name}</h4>
              <p>${scheme.description}</p>
              <a href="${scheme.link}" target="_blank" class="scheme-btn">
                View Full Details
              </a>
            </div>
          `;
        });
      }

      document.getElementById("result").innerHTML = output;
    })
    .catch(error => {
      console.error("ERROR:", error);
    });
}
