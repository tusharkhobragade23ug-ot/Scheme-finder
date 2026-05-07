window.findSchemes = function () {

  let income = parseInt(document.getElementById("income").value) || 0;
  let caste = document.getElementById("caste").value.toLowerCase();
  let occupation = document.getElementById("occupation").value.toLowerCase();
  let disability = document.getElementById("disability").value.toLowerCase();
  let gender = document.getElementById("gender").value.toLowerCase(); // 
  let ration = document.getElementById("ration").value.toLowerCase();
  let category = document.getElementById("category").value.toLowerCase();
  document.getElementById("result").innerHTML =
    "<div class='scheme-box'>Filters cleared. Please select options.</div>";
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

  // Clear fields
  document.getElementById("username").value = "";
  document.getElementById("feedback").value = "";

  document.getElementById("feedbackMsg").innerText =
    "Thank you! Feedback submitted ";
};

  // Stop empty search
  if (!income && !caste && !occupation && !disability && !gender && !ration && !category) {
    document.getElementById("result").innerHTML =
      "<div class='scheme-box'>Please select at least one filter</div>";
    return;
  }

  fetch("schemes.json")
    .then(res => res.json())
    .then(data => {

      let results = data.filter(scheme => {

        // Income
        if (income && income > scheme.incomeLimit) return false;

        // Strict caste
        if (caste && scheme.caste !== caste) return false;

        // Occupation
        if (occupation && scheme.occupation !== "any" && scheme.occupation !== occupation)
          return false;

        // Disability
        if (disability && scheme.disability !== "any" && scheme.disability !== disability)
          return false;

        // Gender filter
        if (gender && scheme.gender !== "any" && scheme.gender !== gender)
          return false;

        // Ration
        if (ration && scheme.rationCategory !== "any" && scheme.rationCategory !== ration)
          return false;

        // Category
        if (category && scheme.category !== category)
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
      }

      document.getElementById("result").innerHTML = output;
    })
    .catch(err => console.error(err));
};