const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
const nextBtn = document.getElementById("next-btn"); // Get the "Next" button

// Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: '😔 Try Again 😔' },
  { minDegree: 31, maxDegree: 90, value: 'One more' },
  { minDegree: 91, maxDegree: 150, value: 'Food delivery 🍕' },
  { minDegree: 151, maxDegree: 210, value: '🏆 Arcadia Pass 🎲' },
  { minDegree: 211, maxDegree: 270, value: '😔 Try Again 😔' },
  { minDegree: 271, maxDegree: 330, value: '🏆 1$ 🏆' },
  { minDegree: 331, maxDegree: 360, value: '😔 Try Again 😔' },
];

// Counter for the number of spins
let spinCount = 0;
const maxSpins = 2; // Set the maximum number of spins here

// Size of each piece
const data = [16, 16, 16, 16, 16, 16];
// Background color for each piece
var pieColors = [
  "#fe4576",
  "#313e7f",
  "#fe4576",
  "#313e7f",
  "#fe4576",
  "#313e7f",
];
// Create chart
let myChart = new Chart(wheel, {
  // Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  // Chart Type Pie
  type: "pie",
  data: {
    // Labels (values which are to be displayed on chart)
    labels: ['Mud', 'Again', '1$', 'Again', 'Arcadia', 'Glovo'],
    // Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    // Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      // Hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      // Display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 20 },
      },
    },
  },
});

// Display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    // If the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>${i.value}</p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};

// Spinner count
let count = 0;
// 100 rotations for animation and last rotation for result
let resultValue = 101;
// Number of attempts
let attempts = 0;

// Start spinning
spinBtn.addEventListener("click", () => {
  // Disable spin button during the spin
  spinBtn.disabled = true;
  
  // Increase attempts
  attempts++;

  // Empty final value
  finalValue.innerHTML = `<p>Good Luck!</p>`;

  // Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  // Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    // Set rotation for pie chart
    /*
    Initially to make the pie chart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on the last rotation, we rotate by 1 degree at a time.
    */
    myChart.options.rotation = myChart.options.rotation + resultValue;
    // Update chart with new value;
    myChart.update();
    // If rotation > 360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
      
      // If one attempt is completed, show the "Next" button
      if (attempts === 1) {
        nextBtn.style.display = "block";
        // Redirect to 'adsparo.html' when the "Next" button is clicked
        nextBtn.addEventListener("click", () => {
          window.location.href = "adsparo.html";
        });
      }
    }
  }, 10);
});
