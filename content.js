chrome.storage.sync.get(null, (data) => {
  const website = window.location.hostname;
  if (data[website]) {
    alert(`Saved credentials for ${website}: 
    Username: ${data[website].username}
    Password: ${data[website].password}`);
  }
});