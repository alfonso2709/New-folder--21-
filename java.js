
// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", function () {
  mainNav.classList.toggle("open");
  menuToggle.setAttribute(
    "aria-expanded",
    mainNav.classList.contains("open")
  );
});

mainNav.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});


// RECIPE INFORMATION

const recipes = {
  turkey: {
    title: "Herb-roasted turkey",
    description: "A classic centerpiece with a fragrant herb-and-citrus feel.",
    ingredients: [
      "Turkey, fully thawed",
      "Butter or olive oil",
      "Fresh rosemary, thyme and sage",
      "Lemon and garlic",
      "Salt and black pepper"
    ],
    method: "Season the turkey with herbs, lemon, garlic and butter. Roast using a trusted recipe for its exact weight. Confirm the thickest parts reach 165°F with a food thermometer before serving."
  },

  carrots: {
    title: "Maple-glazed carrots",
    description: "A colorful side that brings sweetness to the savory spread.",
    ingredients: [
      "Carrots",
      "Pure maple syrup",
      "Olive oil or butter",
      "Fresh thyme",
      "Salt and pepper"
    ],
    method: "Toss carrots with maple syrup, oil, thyme, salt and pepper. Roast at 425°F until tender and lightly caramelized."
  },

  pie: {
    title: "Classic pumpkin pie",
    description: "A cozy, gently spiced Thanksgiving dessert.",
    ingredients: [
      "Pie crust",
      "Pumpkin puree",
      "Evaporated milk",
      "Eggs",
      "Brown sugar and pumpkin spice"
    ],
    method: "Whisk the filling until smooth. Pour into the prepared crust and bake following a trusted pumpkin pie recipe until the center is set. Cool before slicing."
  }
};


// RECIPE POPUP

const modal = document.getElementById("recipeModal");

document.querySelectorAll(".recipe-button").forEach(function (button) {
  button.addEventListener("click", function () {

    const recipe = recipes[button.dataset.recipe];

    document.getElementById("modalTitle").textContent =
      recipe.title;

    document.getElementById("modalDescription").textContent =
      recipe.description;

    document.getElementById("modalIngredients").innerHTML =
      recipe.ingredients.map(item => `<li>${item}</li>`).join("");

    document.getElementById("modalMethod").textContent =
      recipe.method;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});


// CLOSE RECIPE POPUP

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

modal.querySelectorAll("[data-close]").forEach(function (element) {
  element.addEventListener("click", closeModal);
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});


// GRATITUDE GARDEN

const gratitudeForm = document.getElementById("gratitudeForm");
const gratitudeInput = document.getElementById("gratitudeInput");
const gardenWall = document.getElementById("gardenWall");

let gratitudeNotes = 0;

gratitudeForm.addEventListener("submit", function (event) {

  event.preventDefault();

  const noteText = gratitudeInput.value.trim();

  if (!noteText) {
    return;
  }

  const empty = gardenWall.querySelector(".empty-garden");

  if (empty) {
    empty.remove();
  }

  const note = document.createElement("div");

  note.className = "gratitude-note";
  note.textContent = noteText;

  note.style.setProperty(
    "--tilt",
    (Math.random() * 4 - 2).toFixed(1) + "deg"
  );

  gardenWall.appendChild(note);

  gratitudeNotes++;

  document.getElementById("noteCount").textContent =
    gratitudeNotes + (gratitudeNotes === 1 ? " NOTE" : " NOTES");

  gratitudeInput.value = "";
  gratitudeInput.focus();
});


// PERSONALIZED THANKSGIVING PLANNER

document.getElementById("planForm").addEventListener(
  "submit",
  function (event) {

    event.preventDefault();

    const name = document.getElementById("hostName").value.trim();

    const guests = document.getElementById("guestCount").value;

    const mood = document.querySelector(
      'input[name="mood"]:checked'
    ).value;

    let moodTip =
      "Use soft lighting, a few candles, and a playlist everyone can add to.";

    if (mood === "Rustic & relaxed") {
      moodTip =
        "Bring out natural textures, simple serving boards, and a help-yourself drinks station.";
    }

    if (mood === "Bright & playful") {
      moodTip =
        "Mix cheerful colors, playful place cards, and a table game everyone can join.";
    }

    const result = document.getElementById("planResult");

    result.innerHTML = `
      <p class="eyebrow">YOUR LITTLE HOSTING PLAN</p>

      <h3>
        ${name ? "A lovely gathering, " + escapeHTML(name) + "!" : "Your gathering is taking shape!"}
      </h3>

      <p><b>${guests} guests · ${mood}</b></p>

      <p>${moodTip}</p>

      <ul>
        <li>Set out one welcome note for each guest.</li>
        <li>Choose two dishes you can prepare ahead.</li>
        <li>Ask one guest to bring a favorite dessert or side.</li>
        <li>Leave time after dinner for stories and gratitude.</li>
      </ul>
    `;

    result.hidden = false;

    result.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });

  }
);


// PROTECT USER-ENTERED NAME

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, function (char) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char];
  });
}
