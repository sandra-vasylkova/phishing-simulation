const form = document.getElementById("demoForm");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const course = document.getElementById("password").value.trim();

  if (username.length < 1) {
    alert("Geben Sie Ihren Benutzernamen ein.");
    return;
  }

  if (course.length < 1) {
    alert("Geben Sie Ihr Passwort ein.");
    return;
  }

  document.getElementById("shownUsername").textContent = username;
  document.getElementById("shownPassword").textContent = password;
  document.getElementById("result").style.display = "block";

  const response = await fetch("/api/save-player", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  if (!response.ok) {
    alert("Daten konnten nicht gespeichert werden.");
    return;
  }

  const saved = await response.json();

  localStorage.setItem("Username", saved.username);
  localStorage.setItem("Password", saved.password);

  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
});
