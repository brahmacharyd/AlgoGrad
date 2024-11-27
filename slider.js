document.addEventListener("DOMContentLoaded", function () {
    const sliderItems = document.querySelectorAll(".slider-item");

    // Define the colors for the box-shadow and text color dynamically
    const shadowColors = [
        "rgba(255, 150, 150, 0.3)",  // Light red shadow for the first item
        "rgba(150, 255, 150, 0.3)",  // Light green shadow for the second item
        "rgba(204, 255, 204, 0.3)", // Very light green shadow for the third item
        "rgba(255, 255, 150, 0.3)",  // Light yellow shadow for the fourth item
        "rgba(150, 150, 255, 0.3)",  // Light blue shadow for the fifth item
        "rgba(255, 205, 140, 0.3)", // Light orange shadow for the sixth item
        "rgba(140, 120, 255, 0.3)"   // Light indigo shadow for the seventh item
    ];
    

    // Loop through the items and assign a unique box-shadow and text color
    sliderItems.forEach((item, index) => {
        const colorIndex = index % shadowColors.length; // Loop the colors if there are more items
        const textColor = shadowColors[colorIndex]; // Use the same color for text

        // Apply the box-shadow and text color
        item.style.color = textColor; // Set the text color
        item.style.boxShadow = `0px 0px 0px 0.4px ${shadowColors[colorIndex]}, 0.25px 0.25px 10px rgba(0, 0, 0, 0.2)`; // Set the box-shadow
    });
});
