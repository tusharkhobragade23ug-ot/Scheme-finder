window.findSchemes = function () {

  let income = parseInt(document.getElementById("income").value) || 0;

  let caste = document.getElementById("caste").value.toLowerCase();
  let occupation = document.getElementById("occupation").value.toLowerCase();
  let disability = document.getElementById("disability").value.toLowerCase();

  let age = parseInt(document.getElementById("age").value) || 0;
  let gender = document.getElementById("gender").value.toLowerCase();
  let maritalStatus = document.getElementById("maritalStatus").value.toLowerCase();
  let ration = document.getElementById("ration").value.toLowerCase();

  fetch("https://tusharkhobragade23ug-ot.github.io/Scheme-finder/schemes.json")
    .then(response => response.json())
    .then(data => {

      let results = data.filter(scheme => {

        // income
        if (income && income > scheme.incomeLimit) return false;

        // caste
        if (caste && scheme.caste !== "any" && scheme.caste !== caste)
          return false;

        // occupation
        if (occupation && scheme.occupation !== "any" && scheme.occupation !== occupation)
          return false;

        // disability
        if (disability && scheme.disability !== "any" && scheme.disability !== disability)
          return false;

        // age
        if (age && (age < scheme.ageMin || age > scheme.ageMax))
          return false;

        // gender
        if (gender && scheme.gender !== "any" && scheme.gender !== gender)
          return false;

        // marital status
        if (maritalStatus && scheme.maritalStatus !== "any" && scheme.maritalStatus !== maritalStatus)
          return false;

        // ration category (NEW)
        if (ration && scheme.rationCategory !== "any" && scheme.rationCategory !== ration)
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