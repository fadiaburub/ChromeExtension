// Define an empty array to store leads
let leadsList = []

// Get the input element, button elements, and list element from the HTML
const inputElement = document.getElementById("input-el")
const inputButton = document.getElementById("input-btn")
const listElement = document.getElementById("ul-el")
const deleteButton = document.getElementById("delete-btn")

// Retrieve leads from local storage if available
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("leadsList"))

// If leads exist in local storage, assign them to the leadsList array and render them
if (leadsFromLocalStorage) {
leadsList = leadsFromLocalStorage
renderLeads(leadsList)
}

// Add an event listener to the "Save Tab" button
const tabButton = document.getElementById("tab-btn")

tabButton.addEventListener("click", function() {
// Use the Chrome API to get the currently active tab
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
// Add the URL of the active tab to the leadsList array
leadsList.push(tabs[0].url)
// Store the updated leadsList array in local storage
localStorage.setItem("leadsList", JSON.stringify(leadsList))
// Render the updated leadsList
renderLeads(leadsList)
})
})

// Function to render the leadsList array
function renderLeads(leads) {
let listItems = ""
for (let i = 0; i < leads.length; i++) {
listItems += <li> <a target='_blank' href='${leads[i]}'> ${leads[i]} </a> </li> 
}
listElement.innerHTML = listItems
}

// Add an event listener to the "Delete All" button
deleteButton.addEventListener("dblclick", function() {
// Clear the local storage
localStorage.clear()
// Reset the leadsList array
leadsList = []
// Render the empty leadsList
renderLeads(leadsList)
})

// Add an event listener to the "Save Input" button
inputButton.addEventListener("click", function() {
// Add the input value to the leadsList array
leadsList.push(inputElement.value);
// Clear the input field
inputElement.value = ""
// Store the updated leadsList array in local storage
localStorage.setItem("leadsList", JSON.stringify(leadsList))
// Render the updated leadsList
renderLeads(leadsList)
})