/* =================================================================
   Kaden Yeung — Project page renderer
   Reads ?slug=, finds the project in window.PROJECTS, and renders an
   in-depth page. Reuses the blog engine's markdown renderer
   (window.KadenBlog.renderMarkdown) so styling stays consistent.
   ================================================================= */
(function () {
  "use strict";

  var PROJECTS = window.PROJECTS || [];

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
    for (var i = 0; i < PROJECTS.length; i++) {
      if (PROJECTS[i].slug === slug) return PROJECTS[i];
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
    var project = slug ? bySlug(slug) : null;
    var titleEl = document.getElementById("project-title");
    var bodyEl = document.getElementById("project-body");

    if (!project) {
      if (titleEl) titleEl.textContent = "Project not found";
      if (bodyEl)
        bodyEl.innerHTML =
          '<p>That project doesn\'t exist. <a href="/#projects">Back to all projects →</a></p>';
      return;
    }

    document.title = project.title + " — Kaden Yeung";
    setMeta("description", project.tagline || "");
    setMeta("og:title", project.title, true);
    setMeta("og:description", project.tagline || "", true);

    if (titleEl) titleEl.textContent = project.title;

    var tagEl = document.getElementById("project-tagline");
    if (tagEl) {
      if (project.tagline) tagEl.textContent = project.tagline;
      else tagEl.style.display = "none";
    }

    var metaEl = document.getElementById("project-meta");
    if (metaEl) {
      var bits = [];
      if (project.year) bits.push("<span>" + esc(project.year) + "</span>");
      if (project.status) bits.push("<span>" + esc(project.status) + "</span>");
      var html = bits.join(' <span class="dot">·</span> ');
      if (project.tags && project.tags.length) {
        html +=
          ' <span class="dot">·</span> ' +
          project.tags
            .map(function (t) { return '<span class="post-hero-tag">' + esc(t) + "</span>"; })
            .join("");
      }
      metaEl.innerHTML = html;
    }

    var linksEl = document.getElementById("project-links");
    if (linksEl && project.links && project.links.length) {
      linksEl.innerHTML = project.links
        .map(function (l) {
          var primary = /github/i.test(l.url) ? "" : "";
          return (
            '<a class="project-page-link" href="' + esc(l.url) + '" ' +
            'target="_blank" rel="noopener">' +
            '<i class="bx ' + esc(l.icon || "bx-link-external") + '"></i> ' +
            esc(l.label) + "</a>"
          );
        })
        .join("");
    }

    if (bodyEl) bodyEl.innerHTML = renderMarkdown(project.body || "");

    renderMore(project);
    if (window.KadenReveal) window.KadenReveal();
  }

  // "Other projects" strip at the bottom
  function renderMore(current) {
    var wrap = document.getElementById("project-more");
    if (!wrap) return;
    var others = PROJECTS.filter(function (p) { return p !== current; });
    if (!others.length) { wrap.style.display = "none"; return; }
    var html = '<h2 class="project-more-title">More projects</h2><div class="project-more-grid">';
    others.forEach(function (p) {
      html +=
        '<a class="project-more-card" href="/project?slug=' + esc(p.slug) + '">' +
        '<span class="project-more-name">' + esc(p.title) + "</span>" +
        '<span class="project-more-tagline">' + esc(p.tagline || "") + "</span>" +
        "</a>";
    });
    html += "</div>";
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
    if (document.getElementById("project-body")) render();
  });
})();
