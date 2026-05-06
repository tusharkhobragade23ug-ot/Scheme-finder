window.findSchemes = function () {

  let income = parseInt(document.getElementById("income").value) || 0;

  let occupation = document.getElementById("occupation").value.toLowerCase();
  let caste = document.getElementById("caste").value.toLowerCase();
  let disability = document.getElementById("disability").value.toLowerCase();

  fetch("https://tusharkhobragade23ug-ot.github.io/Scheme-finder/schemes.json")
    .then(response => response.json())
    .then(data => {

      let results = data.filter(scheme => {

        // income
        if (income > scheme.incomeLimit) return false;

        // caste
        if (caste && scheme.caste !== "any" && scheme.caste !== caste)
          return false;

        // occupation
        if (occupation && scheme.occupation !== "any" && scheme.occupation !== occupation)
          return false;

        if (disability === "yes") {
          if (scheme.disability !== "yes") return false;
        }
        else if (disability === "no") {
          if (scheme.disability === "yes") return false;
        }

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
                View Details
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
};
