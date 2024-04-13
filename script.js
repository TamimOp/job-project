// Fetch the JSON data
let destinations;
fetch("destinations.json")
  .then((response) => response.json())
  .then((data) => {
    destinations = data;
    flatpickr("#Depart", {
      dateFormat: "d-m-y",
      minDate: "today",
      onClose: function (selectedDates) {
        this.close();
      },
    });
    flatpickr("#Return", {
      dateFormat: "d-m-y",
      minDate: "today",
      onClose: function (selectedDates) {
        this.close();
      },
    });

    const fromInput = document.getElementById("From");
    const toInput = document.getElementById("To");

    function handleInput(event) {
      const inputValue = event.target.value.trim();
      if (inputValue === "") {
        clearSuggestions(event.target);
      } else {
        const suggestions = filterDestinations(inputValue);
        displaySuggestions(event.target, suggestions);
      }
    }

    function filterDestinations(inputValue) {
      return destinations.filter((destination) => {
        const regex = new RegExp(inputValue, "i");
        return (
          destination.city.match(regex) ||
          destination.code.match(regex) ||
          destination.country.match(regex)
        );
      });
    }

    function displaySuggestions(input, suggestions) {
      clearSuggestions(input);
      const suggestionList = document.createElement("ul");
      suggestionList.classList.add(
        "suggestion-list",
        "absolute",
        "w-half",
        "bg-white",
        "border",
        "border-gray-300",
        "shadow-md",
        "rounded-md",
        "z-10",
        "overflow-y-auto",
        "max-h-48", // Limit max height for scrolling
        "py-1"
      );
      suggestions.forEach((suggestion) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${suggestion.city}, ${suggestion.country} (${suggestion.code})`;
        listItem.classList.add(
          "cursor-pointer",
          "hover:bg-gray-100",
          "px-4",
          "py-2"
        );
        listItem.addEventListener("click", () => {
          input.value = `${suggestion.city}, ${suggestion.country} (${suggestion.code})`;
          clearSuggestions(input);
        });
        suggestionList.appendChild(listItem);
      });
      input.parentNode.appendChild(suggestionList);
    }

    function clearSuggestions(input) {
      const suggestionList = input.parentNode.querySelector(".suggestion-list");
      if (suggestionList) {
        suggestionList.remove();
      }
    }

    fromInput.addEventListener("input", handleInput);
    toInput.addEventListener("input", handleInput);
  });
const swapButton = document.getElementById("swapButton");
if (swapButton) {
  swapButton.addEventListener("click", () => {
    const fromInput = document.getElementById("From");
    const toInput = document.getElementById("To");
    if (fromInput && toInput) {
      const fromValue = fromInput.value;
      fromInput.value = toInput.value;
      toInput.value = fromValue;
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const adultsPlusButtons = document.querySelectorAll(".adult-plus");
  const adultsMinusButtons = document.querySelectorAll(".adult-minus");
  const adultsCount = document.querySelector(".adult-count");
  let adultCounter = 0;

  const childrenPlusButtons = document.querySelectorAll(".child-plus");
  const childrenMinusButtons = document.querySelectorAll(".child-minus");
  const childrenCount = document.querySelector(".child-count");
  let childCounter = 0;

  const cabinClassButton = document.getElementById("CabinClass");
  const cabinClassSection = document.querySelector(".class_section");

  function updateTravellersAndCabinClass() {
    const selectedOption = document.getElementById("subject").value;
    cabinClassButton.querySelector("span").textContent = `${
      adultCounter + childCounter
    } Travellers, ${selectedOption}`;
  }

  function toggleCabinClassSection() {
    if (cabinClassSection.style.display === "none") {
      cabinClassSection.style.display = "block";
    } else {
      cabinClassSection.style.display = "none";
    }
  }

  cabinClassButton.addEventListener("click", toggleCabinClassSection);

  adultsPlusButtons.forEach((button) => {
    button.addEventListener("click", function () {
      adultCounter++;
      adultsCount.textContent = adultCounter;
      updateTravellersAndCabinClass();
    });
  });

  adultsMinusButtons.forEach((button) => {
    button.addEventListener("click", function () {
      if (adultCounter > 0) {
        adultCounter--;
        adultsCount.textContent = adultCounter;
        updateTravellersAndCabinClass();
      }
    });
  });

  childrenPlusButtons.forEach((button) => {
    button.addEventListener("click", function () {
      childCounter++;
      childrenCount.textContent = childCounter;
      updateTravellersAndCabinClass();
    });
  });

  childrenMinusButtons.forEach((button) => {
    button.addEventListener("click", function () {
      if (childCounter > 0) {
        childCounter--;
        childrenCount.textContent = childCounter;
        updateTravellersAndCabinClass();
      }
    });
  });
});
