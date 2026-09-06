(function () {
  var KEY = "cheng-theme";
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");
  var share = document.getElementById("share-btn");
  var toast = document.getElementById("toast");
  var meta = document.querySelector('meta[name="theme-color"]');

  function isDark() { return root.classList.contains("dark"); }

  function apply(theme) {
    var dark = theme === "dark";
    root.classList.toggle("dark", dark);
    root.style.colorScheme = theme;
    if (meta) meta.setAttribute("content", dark ? "#12110f" : "#f4f1ea");
    if (toggle) toggle.setAttribute("aria-label", dark ? "切換為淺色主題" : "切換為深色主題");
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
    });
    toggle.setAttribute("aria-label", isDark() ? "切換為淺色主題" : "切換為深色主題");
  }

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () { toast.classList.remove("show"); }, 1800);
  }

  if (share) {
    share.addEventListener("click", async function () {
      var url = window.location.href;
      var data = { title: "林澄", text: "林澄 — 產品設計師 · 影像", url: url };
      if (navigator.share) {
        try { await navigator.share(data); return; }
        catch (err) { if (err && err.name === "AbortError") return; }
      }
      try {
        await navigator.clipboard.writeText(url);
        showToast("已複製連結");
      } catch (e) {
        showToast("無法複製連結");
      }
    });
  }
})();
