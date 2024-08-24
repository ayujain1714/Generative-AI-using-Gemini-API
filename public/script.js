const prmpt = document.getElementById("prmpt");
const btn = document.getElementById("submit");
const res = document.getElementById("response");
const form = document.getElementById("input");

btn.addEventListener("click", async (event) => {
  event.preventDefault();
  if (!prmpt.value.trim()) {
    window.alert("Enter prompt");
  } else {
    showPseudoContent();
    console.log("fetching data");
    const p = await fetch("/sendprmpt", {
      method: "POST",
      body: new URLSearchParams(new FormData(form)),
    }).catch((err) => (res.innerHTML = "Error : " + err));
    data = await p.json();
    res.innerHTML = data.message;
    form.reset();
  }
});

function showPseudoContent() {
  if (document.getElementById("instruct")) {
    document.getElementById("instruct").style.display = "none";
  }
  if (document.getElementById("load")) {
    document.getElementById("load").style.display = "block";
  }
}
