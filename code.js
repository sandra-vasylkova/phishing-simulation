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
});
