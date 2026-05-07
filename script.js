window.findSchemes = function () {

  let income = parseInt(document.getElementById("income").value) || 0;
  let caste = document.getElementById("caste").value.toLowerCase();
  let occupation = document.getElementById("occupation").value.toLowerCase();
  let disability = document.getElementById("disability").value.toLowerCase();
  let gender = document.getElementById("gender").value.toLowerCase();
  let ration = document.getElementById("ration").value.toLowerCase();
  let category = document.getElementById("category").value.toLowerCase();

  if (!income && !caste && !occupation && !disability && !gender && !ration && !category) {
    document.getElementById("result").innerHTML =
      "<div class='scheme-box'>Please select at least one filter</div>";
    return;
  }

  fetch("schemes.json")
    .then(res => res.json())
    .then(data => {

      let results = data.filter(scheme => {

        if (income && income > scheme.incomeLimit) return false;
        if (caste && scheme.caste !== caste) return false;

        if (occupation && scheme.occupation !== "any" && scheme.occupation !== occupation)
          return false;

        if (disability && scheme.disability !== "any" && scheme.disability !== disability)
          return false;

        if (gender && scheme.gender !== "any" && scheme.gender !== gender)
          return false;

        if (ration && scheme.rationCategory !== "any" && scheme.rationCategory !== ration)
          return false;

        if (category && scheme.category !== category)
          return false;

        return true;
      });

      let output = "";

      if (results.length === 0) {
        document.getElementById("result").innerHTML = `
          <div class='scheme-box'>
            No schemes found<br>
            <small>Try changing filters</small>
          </div>
        `;
        return;
      }

      results.forEach(scheme => {
        output += `
          <div class="scheme-box">
            <h4>${scheme.name}</h4>
            <span class="badge bg-secondary mb-2">
              ${scheme.category || "general"}
            </span>
            <p>${scheme.description}</p>
            <a href="${scheme.link}" target="_blank" class="scheme-btn">
              View Details
            </a>
          </div>
        `;
      });

      document.getElementById("result").innerHTML =
        `<p><b>${results.length}</b> schemes found</p>` + output;
    })
    .catch(err => console.error(err));
};


window.resetFilters = function () {

  document.getElementById("income").value = "";
  document.getElementById("caste").value = "";
  document.getElementById("occupation").value = "";
  document.getElementById("disability").value = "";
  document.getElementById("gender").value = "";
  document.getElementById("ration").value = "";
  document.getElementById("category").value = "";

  document.getElementById("result").innerHTML =
    "<div class='scheme-box'>Filters cleared</div>";
};


window.submitFeedback = function () {

  let name = document.getElementById("username").value;
  let feedback = document.getElementById("feedback").value;

  if (!feedback) {
    document.getElementById("feedbackMsg").innerText =
      "Please enter feedback";
    return;
  }

  let allFeedback = JSON.parse(localStorage.getItem("feedbackList")) || [];

  allFeedback.push({
    name: name || "Anonymous",
    feedback: feedback
  });

  localStorage.setItem("feedbackList", JSON.stringify(allFeedback));

  document.getElementById("username").value = "";
  document.getElementById("feedback").value = "";

  document.getElementById("feedbackMsg").innerText =
    "Thank you! Feedback submitted";
};