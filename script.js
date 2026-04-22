let currentDay = "";

let exercises = [
{
  name: "Push Ups",
  category: "Chest",
  image: "gifs/pushup.webp",
},
{
  name: "Dumbbell bench press",
  category: "Chest",
  image: "gifs/dumblebp.webp",
},
{
  name: "Chest flys",
  category: "Chest",
  image: "gifs/chestfly.webp",
},
{
  name: "Barbell Bench Press.",
  category: "Chest",
  image: "gifs/barbellbp.webp",
},
{
  name: "Cable Crossover",
  category: "Chest",
  image: "gifs/cablecross.webp",
},
{
  name: "Dumbbell Chest Flys",
  category: "Chest",
  image: "gifs/dumbelcf.webp",
},
{
  name: "Machine Chest Press",
  category: "Chest",
  image: "gifs/chestpress.webp",
},
{
  name: "squats",
  category: "Legs",
  image: "gifs/squat.webp",
},
{
  name: "leg press",
  category: "Legs",
  image: "gifs/legpress.webp",
},
{
  name: "leg extension",
  category: "Legs",
  image: "gifs/legextension.webp",
},
{
  name: "calf raise",
  category: "Legs",
  image: "gifs/calfraise.webp",
},
{
name: "Plank",
category: "Core",
image: "gifs/plank.webp"
},
{
name: "Bicep Curl",
category: "Arms",
image: "gifs/curl.webp"
},
{
name: "Shoulder Press",
category: "Shoulders",
image: "gifs/sholderpr.webp"
},
{
  name: "machine pull",
  category: "Back",
  image: "gifs/machinepullbk.webp",
},
];

function openDay(day) {

currentDay = day;

document.getElementById("home").classList.add("hidden");
document.getElementById("dayScreen").classList.remove("hidden");

document.getElementById("dayTitle").innerText = day + " Workout";

showExercises();
loadSavedExercises();

}

function goBack() {

document.getElementById("home").classList.remove("hidden");
document.getElementById("dayScreen").classList.add("hidden");

}

function showExercises() {

let search = document.getElementById("search").value.toLowerCase();
let category = document.getElementById("category").value;

let container = document.getElementById("exerciseList");

container.innerHTML = "<h3>Available Exercises</h3>";

exercises.forEach(exercise => {

if (
(exercise.name.toLowerCase().includes(search)) &&
(category === "All" || exercise.category === category)
) {

let div = document.createElement("div");

div.className = "exercise";

div.innerHTML = `
<img 
class="exercise-img"
src="${exercise.image}">

<div>
<p>${exercise.name}</p>
<small>${exercise.category}</small>
</div>

<button onclick="addExercise('${exercise.name}', '${exercise.image}', '${exercise.video}', '${exercise.category}')">Add</button>
`;

container.appendChild(div);

}

});

}

function addExercise(name, start, end, category) {

let saved = JSON.parse(localStorage.getItem(currentDay)) || [];

saved.push({
name: name,
start: start,
end: end,
category: category,
sets: 3,
reps: 10,
weight: "",
timer: 60
});

localStorage.setItem(currentDay, JSON.stringify(saved));

loadSavedExercises();

}

function loadSavedExercises() {

let saved = JSON.parse(localStorage.getItem(currentDay)) || [];

let container = document.getElementById("exerciseList");

let oldWorkout = document.getElementById("selectedWorkout");
if (oldWorkout) {
oldWorkout.remove();
}

let selectedSection = document.createElement("div");

selectedSection.id = "selectedWorkout";
selectedSection.innerHTML = "<h3>Your Workout</h3>";

saved.forEach((ex, index) => {

let div = document.createElement("div");

div.className = "selected";

div.innerHTML = `
<img 
class="exercise-img"
src="${ex.start}"
data-start="${ex.start}"
data-end="${ex.end}">

<div class="exerciseInfo">
<p>${ex.name}</p>

<div class="inputs">
<label>Sets</label>
<input type="number" value="${ex.sets}" onchange="updateExercise(${index}, 'sets', this.value)">

<label>Reps</label>
<input type="number" value="${ex.reps}" onchange="updateExercise(${index}, 'reps', this.value)">

<label>Weight</label>
<input type="text" value="${ex.weight}" placeholder="kg" onchange="updateExercise(${index}, 'weight', this.value)">

<label>Timer</label>
<input type="number" value="${ex.timer}" onchange="updateExercise(${index}, 'timer', this.value)">
</div>

<div class="controls">
<button onclick="moveUp(${index})">⬆</button>
<button onclick="moveDown(${index})">⬇</button>
<button onclick="deleteExercise(${index})">❌</button>
</div>

</div>
`;

selectedSection.appendChild(div);

});

container.appendChild(selectedSection);


}

function deleteExercise(index) {

let saved = JSON.parse(localStorage.getItem(currentDay)) || [];

saved.splice(index, 1);

localStorage.setItem(currentDay, JSON.stringify(saved));

loadSavedExercises();

}

function moveUp(index) {

let saved = JSON.parse(localStorage.getItem(currentDay)) || [];

if (index === 0) return;

[saved[index], saved[index - 1]] = [saved[index - 1], saved[index]];

localStorage.setItem(currentDay, JSON.stringify(saved));

loadSavedExercises();

}

function moveDown(index) {

let saved = JSON.parse(localStorage.getItem(currentDay)) || [];

if (index === saved.length - 1) return;

[saved[index], saved[index + 1]] = [saved[index + 1], saved[index]];

localStorage.setItem(currentDay, JSON.stringify(saved));

loadSavedExercises();

}

function updateExercise(index, field, value) {

let saved = JSON.parse(localStorage.getItem(currentDay)) || [];

saved[index][field] = value;

localStorage.setItem(currentDay, JSON.stringify(saved));

}






