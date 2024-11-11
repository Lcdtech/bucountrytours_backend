// utils/colorUtils.js
const colors = [
    '#FF5733', // Red
    '#33FF57', // Green
    '#3357FF', // Blue
    '#F3FF33', // Yellow
    '#FF33F3', // Pink
    '#33FFF3', // Cyan
  ];
  
  function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  module.exports = { getRandomColor };
  