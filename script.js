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

uploadData();

starButton.addEventListener("click", () => {
  saveDataLocally(starProduct);
});

fireButton.addEventListener("click", () => {
  saveDataLocally(fireProduct);
});

function saveDataLocally(productObject) {
  // get locally stored data
  const localStoredData = JSON.parse(localStorage.getItem("data"));

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

  uploadData();
}

function uploadData() {
  // save data locally
  localStorage.setItem("data", JSON.stringify(data));

  // get locally stored data
  const localStoredData = JSON.parse(localStorage.getItem("data"));

  live_sales_input.value = localStoredData.totalLiveSales;
  live_achievements_input.value = localStoredData.totalLiveAchivements;
  total_commission_input.value = localStoredData.totalCommision;
  total_revenue_input.value = localStoredData.totalRevenue;
  live_sales_count.innerHTML = localStoredData.totalNumberOfLiveSale;
  live_achievements_count.innerHTML =
    localStoredData.totalNumberOfLiveAchivements;
}
