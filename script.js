// Product A info
let starProduct = {
  emoji: "⭐",
  revenue: 200,
  commision: 50,
};

// Product B info
let fireProduct = {
  emoji: "🔥",
  revenue: 300,
  commision: 75,
};

// 💰 at 2500 revenue
// 🔔 at first
// 🏆 at 15

let data = {
  totalCommision: 0,
  totalRevenue: 0,
  achivements: "",
  totalLiveSales: "",
  totalNumberOfLiveSale: 0,
  totalLiveAchivements: "",
  totalNumberOfLiveAchivements: 0,
};

const starButton = document.querySelector(".start_product");
const fireButton = document.querySelector(".fire_product");
const live_sales_input = document.querySelector(".live_sales_input");
const live_achievements_input = document.querySelector(
  ".live_achievements_input"
);
const total_commission_input = document.querySelector(
  ".total_commission_input"
);
const total_revenue_input = document.querySelector(".total_revenue_input");
const live_sales_count = document.querySelector(".live_sales_count");
const live_achievements_count = document.querySelector(
  ".live_achievements_count"
);

const clearAllIcon = document.querySelector(".clearAllIcon");

uploadData();

starButton.addEventListener("click", () => {
  saveDataLocally(starProduct);
});

fireButton.addEventListener("click", () => {
  saveDataLocally(fireProduct);
});

function saveDataLocally(productObject) {
  // get locally stored data
  const localStoredData = JSON.parse(localStorage.getItem("data")) || data;

  data.totalCommision =
    localStoredData.totalCommision + productObject.commision;
  data.totalRevenue = localStoredData.totalRevenue + productObject.revenue;
  data.totalLiveSales = localStoredData.totalLiveSales + productObject.emoji;
  data.totalNumberOfLiveSale = localStoredData.totalNumberOfLiveSale + 1;

  if (
    data.totalNumberOfLiveSale >= 1 &&
    !data.totalLiveAchivements.includes("🔔")
  ) {
    data.totalNumberOfLiveAchivements = data.totalNumberOfLiveAchivements + 1;
    data.totalLiveAchivements = "🔔";
  }
  if (data.totalRevenue >= 2500 && !data.totalLiveAchivements.includes("💰")) {
    data.totalNumberOfLiveAchivements += 1;
    data.totalLiveAchivements = data.totalLiveAchivements + "💰";
  }
  if (
    data.totalNumberOfLiveSale >= 15 &&
    !data.totalLiveAchivements.includes("🏆")
  ) {
    data.totalNumberOfLiveAchivements += 1;
    data.totalLiveAchivements = data.totalLiveAchivements + "🏆";
  }
  // save data locally
  localStorage.setItem("data", JSON.stringify(data));
  uploadData();
}

function uploadData() {
  console.log(localStorage.length);
  if (localStorage.length == 0) {
    localStorage.setItem("data", JSON.stringify(data));
    return;
  }
  const localStoredData = JSON.parse(localStorage.getItem("data"));

  live_sales_input.value = localStoredData.totalLiveSales;
  live_achievements_input.value = localStoredData.totalLiveAchivements;
  total_commission_input.value = localStoredData.totalCommision;
  total_revenue_input.value = localStoredData.totalRevenue;
  live_sales_count.innerHTML = localStoredData.totalNumberOfLiveSale;
  live_achievements_count.innerHTML =
    localStoredData.totalNumberOfLiveAchivements;
}

clearAllIcon.addEventListener("click", () => {
  localStorage.clear();
  Object.keys(data).forEach((key) => {
    if (typeof data[key] === "number") data[key] = 0; // Reset numbers to 0
    else data[key] = ""; // Reset strings to empty
  });
  live_sales_input.value = "";
  live_achievements_input.value = "";
  total_commission_input.value = "";
  total_revenue_input.value = "";
  live_sales_count.innerHTML = 0;
  live_achievements_count.innerHTML = 0;
});
