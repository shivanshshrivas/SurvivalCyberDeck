// theme.js

// Default theme
var theme = {
    primaryColor: "#2b2b2b",
    textColor: "#ffffff",
    buttonColor: "#3b3b3b",
    buttonHoverColor: "#505050",
    fontSize: 18
};

// Function to toggle Light/Dark Mode
function toggleTheme() {
    if (theme.primaryColor === "#2b2b2b") {
        theme.primaryColor = "#ffffff";  // Light mode
        theme.textColor = "#000000";
        theme.buttonColor = "#cccccc";
        theme.buttonHoverColor = "#aaaaaa";
    } else {
        theme.primaryColor = "#2b2b2b";  // Dark mode
        theme.textColor = "#ffffff";
        theme.buttonColor = "#3b3b3b";
        theme.buttonHoverColor = "#505050";
    }
}
