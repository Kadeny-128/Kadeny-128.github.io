/* =================================================================
   Kaden Yeung — Experience page renderer
   Reads ?slug=, finds the role in window.EXPERIENCE, and renders an
   in-depth page. Reuses the blog engine's markdown renderer
   (window.KadenBlog.renderMarkdown) so styling stays consistent.
   ================================================================= */
(function () {
  "use strict";

  var EXPERIENCE = window.EXPERIENCE || [];

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function getParam(name) {
    var m = new RegExp("[?&]" + name + "=([^&]+)").exec(window.location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : null;
  }

  function bySlug(slug) {
    for (var i = 0; i < EXPERIENCE.length; i++) {
      if (EXPERIENCE[i].slug === slug) return EXPERIENCE[i];
    }
    return null;
  }

  function renderMarkdown(md) {
    if (window.KadenBlog && window.KadenBlog.renderMarkdown) {
      return window.KadenBlog.renderMarkdown(md);
    }
    return "<pre>" + esc(md) + "</pre>";
  }

  function render() {
    var slug = getParam("slug");
    var item = slug ? bySlug(slug) : null;
    var titleEl = document.getElementById("experience-title");
    var bodyEl = document.getElementById("experience-body");

    if (!item) {
      if (titleEl) titleEl.textContent = "Role not found";
      if (bodyEl)
        bodyEl.innerHTML =
          '<p>That role doesn\'t exist. <a href="/#experience">Back to experience →</a></p>';
      return;
    }

    document.title = item.company + " | Kaden Yeung";
    setMeta("description", item.tagline || "");
    setMeta("og:title", item.company, true);
    setMeta("og:description", item.tagline || "", true);

    if (titleEl) titleEl.textContent = item.company;

    var tagEl = document.getElementById("experience-tagline");
    if (tagEl) {
      if (item.tagline) tagEl.textContent = item.tagline;
      else tagEl.style.display = "none";
    }

    var metaEl = document.getElementById("experience-meta");
    if (metaEl) {
      var bits = [];
      if (item.role) bits.push("<span>" + esc(item.role) + "</span>");
      if (item.period) bits.push("<span>" + esc(item.period) + "</span>");
      var html = bits.join(' <span class="sep">·</span> ');
      metaEl.innerHTML = html;
    }

    var linksEl = document.getElementById("experience-links");
    if (linksEl && item.links && item.links.length) {
      linksEl.innerHTML = item.links
        .map(function (l) {
          return (
            '<a href="' + esc(l.url) + '" ' +
            'target="_blank" rel="noopener">' + esc(l.label) + "</a>"
          );
        })
        .join("");
    }

    if (bodyEl) bodyEl.innerHTML = renderMarkdown(item.body || "");

    renderMore(item);
  }

  // "More experience" strip at the bottom
  function renderMore(current) {
    var wrap = document.getElementById("experience-more");
    if (!wrap) return;
    var others = EXPERIENCE.filter(function (p) { return p !== current; });
    if (!others.length) { wrap.style.display = "none"; return; }
    var html = '<h2>more experience</h2><ul class="list">';
    others.forEach(function (p) {
      html +=
        '<li><a href="/experience.html?slug=' + esc(p.slug) + '">' + esc(p.company) + "</a>" +
        '<span class="note">' + esc(p.tagline || "") + "</span></li>";
    });
    html += "</ul>";
    wrap.innerHTML = html;
  }

  function setMeta(name, content, isProp) {
    if (!content) return;
    var sel = isProp ? 'meta[property="' + name + '"]' : 'meta[name="' + name + '"]';
    var el = document.querySelector(sel);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(isProp ? "property" : "name", name);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("experience-body")) render();
  });
})();
