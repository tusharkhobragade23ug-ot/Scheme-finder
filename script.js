window.findSchemes = function () {

  let income = parseInt(document.getElementById("income").value) || 0;
  let caste = document.getElementById("caste").value.toLowerCase();
  let occupation = document.getElementById("occupation").value.toLowerCase();
  let disability = document.getElementById("disability").value.toLowerCase();

  let age = parseInt(document.getElementById("age").value) || 0;
  let gender = document.getElementById("gender").value.toLowerCase();
  let maritalStatus = document.getElementById("maritalStatus").value.toLowerCase();
  let ration = document.getElementById("ration").value.toLowerCase();
  let category = document.getElementById("category").value.toLowerCase();

  fetch("schemes.json")
    .then(res => res.json())
    .then(data => {

      let results = data.filter(scheme => {

        if (income && income > scheme.incomeLimit) return false;

        if (caste && scheme.caste !== "any" && scheme.caste !== caste) return false;

        if (occupation && scheme.occupation !== "any" && scheme.occupation !== occupation) return false;

        if (disability && scheme.disability !== "any" && scheme.disability !== disability) return false;

        if (age && (age < scheme.ageMin || age > scheme.ageMax)) return false;

        if (gender && scheme.gender !== "any" && scheme.gender !== gender) return false;

        if (maritalStatus && scheme.maritalStatus !== "any" && scheme.maritalStatus !== maritalStatus) return false;

        if (ration && scheme.rationCategory !== "any" && scheme.rationCategory !== ration) return false;

        if (category && scheme.category !== category) return false;

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
              <span class="badge bg-secondary mb-2">${scheme.category}</span>
              <p>${scheme.description}</p>
              <a href="${scheme.link}" target="_blank" class="scheme-btn">
                View Details
              </a>
            </div>
          `;
        });
      }

      document.getElementById("result").innerHTML = output;
    });
};