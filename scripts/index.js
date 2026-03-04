// Loading All levels to create Buttons
const loadingAllLevels = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayAllLevelButtons(data.data));
};
// Displaying ALl level Buttons
const displayAllLevelButtons = (datas) => {
  // getting the button container
  const buttonContainer = document.getElementById("button-container");

  // Iterating All the array elements
  datas.forEach((data) => {
    //  Creating The button
    const buttonDiv = document.createElement("div");
    buttonDiv.innerHTML = `
            <button onclick = "loadingWords(${data.level_no})" class="btn btn-outline btn-primary">
                <i class="fa-solid fa-book-open"></i> Lesson - ${data["level_no"]}
            </button>
        `;
    // Appending Button to the button container
    buttonContainer.append(buttonDiv);
  });
};
// loading words by level
const loadingWords = (levelNo) => {
  // fetching The words by level
  const url = `https://openapi.programming-hero.com/api/level/${levelNo}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWords(data.data)); // passing to the display function
};
// display words By level
const displayLevelWords = (words) => {
  // Getting the vocabulary Card container
  const vocabCardContainer = document.getElementById(
    "vocabulary-card-container",
  );
  if (words.length === 0) {
    vocabCardContainer.innerHTML = `
        <div class="col-span-full p-2 md:p-20 space-y-4">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-[#79716B] text-[1rem]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-medium text-[2rem]">নেক্সট Lesson এ যান</h2>
        </div>
    `;
    return;
  }
  vocabCardContainer.innerHTML = "";

  // iterating through the words
  words.forEach((word) => {
    // creating the Cards
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="space-y-5 bg-white p-[50px] h-full">
        <div>
          <h1 class="font-bold text-[2rem]">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h1>
        </div>
        <div class="space-y-5">
          <p class="font-medium text-[1.25rem]">Meaning /Pronounciation</p>
          <h1 class="font-semibold text-[2rem] text-[#18181B]">
            "${word.meaning ? word.meaning : "শব্দের অর্থ পাওয়া যায়নি"}"
          </h1>
        </div>
        <div class="flex justify-between items-center">
          <button class="btn btn-soft">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button class="btn btn-soft">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
    </div>
        `;

    // Appending the card to the container
    vocabCardContainer.append(card);
  });
};

loadingAllLevels();

// Search Function implement
document.getElementById('search-button').addEventListener('click',() =>{
  const input = document.getElementById('search-input');
  const inputValue = input.value.trim().toLowerCase();
  
  const url = "https://openapi.programming-hero.com/api/words/all";
  fetch(url)
  .then(res => res.json())
  .then(data => {
    const words = data.data;
    
    const matchedWords = words.filter((word) => word.word.toLowerCase().includes(inputValue));
    
    displayLevelWords(matchedWords);
  })

});
