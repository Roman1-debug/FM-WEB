// fm.js

const player = document.getElementById("fmPlayer");
const newStationButton = document.getElementById("newStation");
const playPauseButton = document.getElementById("playPause");
const stationName = document.getElementById("stationName");
const stationUrl = document.getElementById("stationUrl");

// Fetch and play a random station
async function fetchStation() {
  try {
    const response = await fetch("https://de1.api.radio-browser.info/json/stations/bycountry/India");

    // Check if response is valid
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const stations = await response.json();

    if (stations.length > 0) {
      const station = stations[Math.floor(Math.random() * stations.length)];
      
      if (station.url_resolved && station.url_resolved.startsWith("http")) {
        player.src = station.url_resolved;
        player.play();

        stationName.textContent = `Now Playing: ${station.name}`;
        stationUrl.textContent = `Stream URL: ${station.url_resolved}`;
      } else {
        stationName.textContent = "Error: Invalid station URL.";
        stationUrl.textContent = "";
      }
    } else {
      stationName.textContent = "Error: No stations found.";
      stationUrl.textContent = "";
    }
  } catch (error) {
    console.error("Error fetching station:", error);
    stationName.textContent = "Error: Unable to fetch station.";
    stationUrl.textContent = "Check your internet connection or try again later.";
  }
}

// Play/Pause functionality
playPauseButton.addEventListener("click", () => {
  if (player.paused) {
    player.play();
    playPauseButton.textContent = "Pause";
  } else {
    player.pause();
    playPauseButton.textContent = "Play";
  }
});

// Event listener for the button
newStationButton.addEventListener("click", async () => {
  await fetchStation();
  player.play();
});

// Fetch the first station on page load
fetchStation();