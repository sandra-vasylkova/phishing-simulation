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

  try {
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

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { error: text };
    }

    console.log(response.status, data);

    if (!response.ok) {
      document.getElementById("successMessage").style.display = "none";
      alert("Fehler: " + data.error);
      return;
    }

    document.getElementById("successMessage").style.display = "block";

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  } catch (error) {
    console.error(error);
    document.getElementById("successMessage").style.display = "none";
    alert("Verbindung zur API fehlgeschlagen.");
  }
});
