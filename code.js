const form = document.getElementById("demoForm");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username.length < 1) {
    alert("Geben Sie Ihren Benutzernamen ein.");
    return;
  }

  if (password.length < 1) {
    alert("Geben Sie Ihr Passwort ein.");
    return;
  }

  const response = await fetch("/api/savedData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  const data = await response.json();
  console.log(response.status, data);

  if (!response.ok) {
    alert("Fehler: " + data.error);
    return;
  }

  alert("Gespeichert.");
});
