console.log("✅ content.js loaded");

window.addEventListener("load", () => {
  setTimeout(() => {
    console.log("⏳ Scanning for code...");

    let candidates = [];

    document.querySelectorAll("div, span, td, p, strong, b").forEach(el => {
      const text = el.innerText || "";
      const match = text.match(/\b\d{4,8}\b/);
      if (match) {
        candidates.push(match[0]);
      }
    });

    if (candidates.length > 0) {
      const code = candidates[0];
      navigator.clipboard.writeText(code)
        .then(() => {
          console.log("✅ Copied code:", code);
          showToast("✅ Code copied!");
        })
        .catch(err => {
          console.error("❌ Copy failed:", err);
          showToast("❌ Copy failed");
        });
    } else {
      console.log("🚫 No code found.");
    }
  }, 500);
});

// Toast notification
function showToast(message) {
  const toast = document.createElement("div");
  toast.innerText = message;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.background = "#333";
  toast.style.color = "#fff";
  toast.style.padding = "10px 15px";
  toast.style.borderRadius = "5px";
  toast.style.zIndex = 9999;
  toast.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
  toast.style.fontSize = "14px";
  toast.style.opacity = "0.9";

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}
