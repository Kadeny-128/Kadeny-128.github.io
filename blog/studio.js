/* =================================================================
   Kaden Yeung — Writing Studio
   In-browser editor: live preview, autosave, and publish-export.
   ================================================================= */
(function () {
  "use strict";

  var $ = function (id) { return document.getElementById(id); };
  var KEY = "kaden-studio-draft-v1";

  var fields = {
    title: $("f-title"),
    subtitle: $("f-subtitle"),
    date: $("f-date"),
    slug: $("f-slug"),
    tags: $("f-tags"),
    cover: $("f-cover"),
    excerpt: $("f-excerpt"),
    body: $("editor"),
  };

  var slugTouched = false;

  /* ---------- helpers ---------- */
  function slugify(s) {
    return String(s)
      .toLowerCase()
      .trim()
      .replace(/['’".,!?:;()]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60);
  }

  function todayISO() {
    var d = new Date();
    return d.toISOString().slice(0, 10);
  }

  function monthLabel(iso) {
    if (!iso) return "";
    var parts = iso.split("-");
    var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var m = parseInt(parts[1], 10) - 1;
    return (months[m] || "") + " " + parts[0];
  }

  function tagList() {
    return fields.tags.value
      .split(",")
      .map(function (t) { return t.trim(); })
      .filter(Boolean);
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* ---------- the markdown file we generate ---------- */
  function buildMarkdown() {
    var lines = [];
    lines.push("# " + (fields.title.value || "Untitled"));
    lines.push("");
    if (fields.subtitle.value) {
      lines.push("_" + fields.subtitle.value + "_");
      lines.push("");
    }
    lines.push("---");
    lines.push("");
    lines.push(fields.body.value.trim());
    lines.push("");
    return lines.join("\n");
  }

  function buildEntry() {
    var slug = fields.slug.value || slugify(fields.title.value) || "untitled";
    var date = fields.date.value || todayISO();
    var tags = tagList();
    var obj = [
      "  {",
      '    slug: "' + slug + '",',
      '    title: ' + JSON.stringify(fields.title.value || "Untitled") + ",",
      '    subtitle: ' + JSON.stringify(fields.subtitle.value || "") + ",",
      '    date: "' + date + '",',
      '    dateLabel: "' + monthLabel(date) + '",',
      "    tags: " + JSON.stringify(tags) + ",",
      '    cover: ' + JSON.stringify(fields.cover.value || "") + ",",
      "    excerpt: " + JSON.stringify(fields.excerpt.value || "") + ",",
      '    file: "' + slug + '.md",',
      "  },",
    ];
    return obj.join("\n");
  }

  /* ---------- live preview ---------- */
  function updatePreview() {
    $("pv-title").textContent = fields.title.value || "Untitled";
    var sub = $("pv-subtitle");
    if (fields.subtitle.value) { sub.style.display = ""; sub.textContent = fields.subtitle.value; }
    else { sub.style.display = "none"; }

    var meta = $("pv-meta");
    var tags = tagList();
    var html = "<span>" + esc(monthLabel(fields.date.value) || "Draft") + "</span>";
    if (tags.length) {
      html += ' <span class="dot">·</span> ' +
        tags.map(function (t) { return '<span class="post-hero-tag">' + esc(t) + "</span>"; }).join("");
    }
    meta.innerHTML = html;

    var cover = $("pv-cover");
    if (fields.cover.value) {
      cover.style.display = "";
      cover.innerHTML =
        '<img src="/blog/images/' + esc(fields.cover.value) + '" alt="" />';
      var cimg = cover.querySelector("img");
      if (cimg) {
        cimg.onerror = function () { cover.style.display = "none"; };
      }
    } else {
      cover.style.display = "none";
    }

    var body = $("pv-body");
    if (window.KadenBlog && window.KadenBlog.renderMarkdown) {
      body.innerHTML = window.KadenBlog.renderMarkdown(fields.body.value || "");
    } else {
      body.textContent = fields.body.value || "";
    }
  }

  /* ---------- autosave ---------- */
  function save() {
    var data = {};
    Object.keys(fields).forEach(function (k) { data[k] = fields[k].value; });
    data.slugTouched = slugTouched;
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
      $("status").textContent = "Saved · " + new Date().toLocaleTimeString();
    } catch (e) {
      $("status").textContent = "Couldn't autosave (storage blocked).";
    }
  }

  function load() {
    try {
      var data = JSON.parse(localStorage.getItem(KEY) || "{}");
      Object.keys(fields).forEach(function (k) {
        if (data[k] != null) fields[k].value = data[k];
      });
      slugTouched = !!data.slugTouched;
    } catch (e) { /* ignore */ }
    if (!fields.date.value) fields.date.value = todayISO();
  }

  /* ---------- toolbar (wrap / insert at selection) ---------- */
  function surround(before, after, placeholder) {
    var ta = fields.body;
    var s = ta.selectionStart, e = ta.selectionEnd;
    var val = ta.value;
    var sel = val.slice(s, e) || placeholder || "";
    var next = val.slice(0, s) + before + sel + after + val.slice(e);
    ta.value = next;
    ta.focus();
    ta.selectionStart = s + before.length;
    ta.selectionEnd = s + before.length + sel.length;
    onInput();
  }

  function insertBlock(text) {
    var ta = fields.body;
    var s = ta.selectionStart;
    var val = ta.value;
    var pre = val.slice(0, s);
    var pad = pre && !/\n\n$/.test(pre) ? (pre.endsWith("\n") ? "\n" : "\n\n") : "";
    var next = pre + pad + text + "\n" + val.slice(s);
    ta.value = next;
    ta.focus();
    var pos = pre.length + pad.length + text.length + 1;
    ta.selectionStart = ta.selectionEnd = pos;
    onInput();
  }

  var toolActions = {
    h2: function () { insertBlock("## Section heading"); },
    h3: function () { insertBlock("### Smaller heading"); },
    bold: function () { surround("**", "**", "bold text"); },
    italic: function () { surround("_", "_", "italic text"); },
    link: function () { surround("[", "](https://)", "link text"); },
    quote: function () { insertBlock("> A quote worth pulling out."); },
    list: function () { insertBlock("- First item\n- Second item"); },
    image: function () {
      insertBlock("[IMAGE: images/your-image.jpg]\nOptional caption");
    },
  };

  /* ---------- clipboard ---------- */
  function copy(text, label) {
    var done = function () { toast(label + " copied"); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text, done); });
    } else {
      fallbackCopy(text, done);
    }
    // also surface it so it can always be selected manually
    var out = $("output");
    out.style.display = "block";
    out.textContent = text;
  }

  function fallbackCopy(text, cb) {
    var ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
    cb();
  }

  function download(filename, text) {
    var blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  /* ---------- toast ---------- */
  var toastTimer;
  function toast(msg) {
    var el = $("toast");
    el.textContent = msg;
    el.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("is-visible"); }, 2200);
  }

  /* ---------- events ---------- */
  function onInput() {
    if (!slugTouched) {
      fields.slug.value = slugify(fields.title.value);
    }
    updatePreview();
    save();
  }

  function bind() {
    Object.keys(fields).forEach(function (k) {
      fields[k].addEventListener("input", onInput);
    });
    fields.slug.addEventListener("input", function () { slugTouched = true; });

    document.getElementById("toolbar").addEventListener("click", function (e) {
      var btn = e.target.closest(".tool-btn");
      if (!btn) return;
      var action = toolActions[btn.getAttribute("data-md")];
      if (action) action();
    });

    $("btn-download").addEventListener("click", function () {
      var slug = fields.slug.value || slugify(fields.title.value) || "untitled";
      download(slug + ".md", buildMarkdown());
      toast("Downloaded " + slug + ".md");
    });
    $("btn-copy-md").addEventListener("click", function () { copy(buildMarkdown(), "Markdown"); });
    $("btn-copy-entry").addEventListener("click", function () { copy(buildEntry(), "Index entry"); });
    $("btn-clear").addEventListener("click", function () {
      if (!confirm("Start a new post? Your current draft will be cleared.")) return;
      Object.keys(fields).forEach(function (k) { fields[k].value = ""; });
      slugTouched = false;
      fields.date.value = todayISO();
      $("output").style.display = "none";
      onInput();
      toast("New draft");
    });

    // Tab inserts two spaces in the editor instead of leaving the field
    fields.body.addEventListener("keydown", function (e) {
      if (e.key === "Tab") {
        e.preventDefault();
        surround("  ", "", "");
      }
    });
  }

  /* ---------- boot ---------- */
  load();
  bind();
  updatePreview();
})();
