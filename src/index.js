console.log("%c HI", "color: firebrick");

function createNewDog(dogMessage) {
  const newDog = document.createElement("div");
  const dogPhoto = document.createElement("img");
  dogPhoto.src = dogMessage;
  newDog.appendChild(dogPhoto);

  return newDog;
}

function listBreeds(breed) {
  const breedList = document.querySelector("#dog-breeds");
  const newBreed = document.createElement("li");
  newBreed.textContent = breed;
  newBreed.classList.add("color-change");

  return breedList;
}

document.addEventListener("DOMContentLoaded", () => {
  const allDogs = document.querySelector("#dog-image-container");
  function fetchAndRender(allDogs) {
    fetch("https://dog.ceo/api/breeds/image/random/4")
      .then((r) => r.json())
      .then((data) => {
        const dogImages = data.message;
        dogImages.forEach((dogMessage) => {
          const addNewDog = createNewDog(dogMessage);
          allDogs.appendChild(addNewDog);
        });
      })
      .catch((error) => {
        console.error("Failed to let the dogs out", error);
      });
  }
  fetchAndRender(allDogs);

  const breedContainer = document.querySelector("#dog-breeds");
  const breedDropdown = document.querySelector("#breed-dropdown");

  function addDogBreeds(selectedLetter) {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((r) => r.json())
      .then((data) => {
        const dogBreed = Object.keys(data.message);
        const filteredBreeds = dogBreed.filter((breed) =>
          breed.startsWith(selectedLetter)
        );

        breedContainer.innerHTML = " ";

        filteredBreeds.forEach((breed) => {
          const newBreed = listBreeds(breed);
          breedList.appendChild(newBreed);
        });
      })
      .catch((error) => {
        console.error("Failed to retrieve breeds", error);
      });
  }

  breedDropdown.addEventListener("change", (e) => {
    const selectedLetter = e.target.value;
    addDogBreeds(selectedLetter);
  });

  addDogBreeds("a");
});

document.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.style.color = "blue";
  }
});
