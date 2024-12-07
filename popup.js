// Save Password
// Save Password
document.getElementById("save-password-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const website = document.getElementById("website").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  chrome.storage.sync.set({ [website]: { username, password } }, () => {
    alert("Password saved!");
    // Clear the input fields
    document.getElementById("save-password-form").reset();
    loadPasswords();
  });
});


// Generate Password
document.getElementById("generate-password").addEventListener("click", () => {
  const password = generatePassword();
  document.getElementById("generated-password").textContent = password;
});

function generatePassword() {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// Toggle Saved Passwords
document.getElementById("toggle-passwords").addEventListener("click", () => {
  const savedPasswordsDiv = document.getElementById("saved-passwords");
  const isVisible = savedPasswordsDiv.style.display === "block";
  savedPasswordsDiv.style.display = isVisible ? "none" : "block";
  document.getElementById("toggle-passwords").textContent = isVisible ? "Show Saved Passwords" : "Hide Saved Passwords";
});

// Load Saved Passwords
function loadPasswords() {
  chrome.storage.sync.get(null, (data) => {
    const passwordList = document.getElementById("password-list");
    passwordList.innerHTML = "";
    for (const [website, credentials] of Object.entries(data)) {
      const li = document.createElement("li");
      
      // Website name
      const websiteSpan = document.createElement("span");
      websiteSpan.textContent = website;
      websiteSpan.style.cursor = "pointer";
      websiteSpan.style.textDecoration = "underline";
      li.appendChild(websiteSpan);

      // Dropdown container
      const detailsDiv = document.createElement("div");
      detailsDiv.style.display = "none";
      detailsDiv.style.marginTop = "5px";

      // Username and password
      detailsDiv.innerHTML = `
        <p>Username: ${credentials.username}</p>
        <p>Password: ${credentials.password}</p>
      `;
      li.appendChild(detailsDiv);

      // Toggle visibility of details
      websiteSpan.addEventListener("click", () => {
        detailsDiv.style.display = detailsDiv.style.display === "block" ? "none" : "block";
      });

      passwordList.appendChild(li);
    }
  });
}

// Initialize
loadPasswords();
