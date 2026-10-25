/* =================================================================
   Kaden Yeung — Blog engine
   Markdown → article HTML · index grid · reader · prev/next
   Served over http/https (Vercel). Fetches markdown from /blog/posts/.
   ================================================================= */
(function () {
  "use strict";

  var POSTS = (window.BLOG_POSTS || []).slice().sort(function (a, b) {
    return (b.date || "").localeCompare(a.date || "");
  });

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Reveal-on-scroll for elements injected after page load.
  window.KadenReveal = function () {
    var prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var els = document.querySelectorAll("[data-reveal]:not(.is-visible)");
    if (!els.length) return;
    if (!("IntersectionObserver" in window) || prefersReduced) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var obs = new IntersectionObserver(
      function (entries, o) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            o.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach(function (el) { obs.observe(el); });
  };

  function bySlug(slug) {
    for (var i = 0; i < POSTS.length; i++) {
      if (POSTS[i].slug === slug) return POSTS[i];
    }
    return null;
  }

  function imgPath(p) {
    // markdown references images as "images/x" — they live in /blog/images/
    return String(p).replace(/^(\.\/)?images\//, "/blog/images/");
  }

  // Cruft lines emitted by the Substack export that we never want to show.
  var CRUFT = [
    "subscribed",
    "leave a comment",
    "message kaden",
    "thanks for reading! subscribe for free to receive new posts and support my work.",
    "subscribe for more (free, goes straight to your email.)",
    "subscribe for more",
    "if you enjoy my newsletter, plz drop your email to subscribe and share to your friends!",
  ];

  function isCruft(line) {
    var t = line.trim().toLowerCase();
    if (!t) return false;
    for (var i = 0; i < CRUFT.length; i++) {
      if (t === CRUFT[i] || t.indexOf(CRUFT[i]) === 0) return true;
    }
    return false;
  }

  /* ---------- markdown preprocessing ---------- */
  function stripHeader(lines) {
    // Remove the leading "# Title", "_subtitle_", "Source: ..." and the first
    // horizontal rule — these are rendered from metadata in the page hero.
    var out = [];
    var seenRule = false;
    var headerZone = true;
    for (var i = 0; i < lines.length; i++) {
      var raw = lines[i];
      var t = raw.trim();
      if (headerZone) {
        if (t === "") { continue; }
        if (/^#\s/.test(t)) { continue; }           // title H1
        if (/^_.*_$/.test(t)) { continue; }          // italic subtitle
        if (/^Source:/i.test(t)) { continue; }       // source url
        if (t === "---" || t === "***") { seenRule = true; headerZone = false; continue; }
        // first real content reached without a rule
        headerZone = false;
      }
      if (!seenRule && /^Source:/i.test(t)) continue;
      out.push(raw);
    }
    return out;
  }

  function figureHtml(srcs, caption) {
    var cap = caption
      ? '<figcaption class="post-figcaption">' + esc(caption) + "</figcaption>"
      : "";
    if (srcs.length === 1) {
      return (
        '\n\n<figure class="post-figure">' +
        '<img src="' + esc(imgPath(srcs[0])) + '" alt="' + esc(caption || "") +
        '" loading="lazy" decoding="async" />' +
        cap +
        "</figure>\n\n"
      );
    }
    var imgs = srcs
      .map(function (s) {
        return (
          '<img src="' + esc(imgPath(s)) + '" alt="" loading="lazy" decoding="async" />'
        );
      })
      .join("");
    var cls = srcs.length === 2 ? "post-gallery is-two" : "post-gallery";
    return (
      '\n\n<figure class="post-figure ' + cls + '">' +
      '<div class="post-gallery-grid">' + imgs + "</div>" +
      cap +
      "</figure>\n\n"
    );
  }

  function transformImages(lines) {
    var out = [];
    var imgRe = /^\[IMAGE:\s*(.+?)\]\s*$/;
    for (var i = 0; i < lines.length; i++) {
      var m = lines[i].match(imgRe);
      if (!m) { out.push(lines[i]); continue; }
      var srcs = [];
      while (i < lines.length) {
        var mm = lines[i].match(imgRe);
        if (!mm) break;
        srcs.push(mm[1].trim());
        i++;
      }
      // optional caption = the next non-empty content line, if it's plain text
      var caption = "";
      if (i < lines.length) {
        var next = lines[i].trim();
        var plain =
          next &&
          !/^#/.test(next) &&
          !/^[-*]\s/.test(next) &&
          !/^>/.test(next) &&
          !imgRe.test(next);
        if (plain) { caption = next; i++; }
      }
      i--; // the for-loop will ++ again
      out.push(figureHtml(srcs, caption));
    }
    return out;
  }

  function preprocess(raw) {
    var text = String(raw)
      // a stray Substack editor artifact that prefixes one paragraph
      .replace(
        /Text within this block will maintain its original spacing when published\s*/g,
        ""
      );
    var lines = text.split(/\r?\n/);
    lines = stripHeader(lines);
    lines = lines.filter(function (l) { return !isCruft(l); });
    // drop empty headings like "###" or "#### "
    lines = lines.filter(function (l) {
      return !/^#{1,6}\s*$/.test(l.trim());
    });
    lines = transformImages(lines);
    // collapse 3+ blank lines to a single blank line
    var joined = lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
    return joined;
  }

  function renderMarkdown(raw) {
    var md = preprocess(raw);
    if (window.marked && typeof window.marked.parse === "function") {
      window.marked.setOptions({ breaks: true, gfm: true });
      return window.marked.parse(md);
    }
    // ultra-minimal fallback if marked failed to load
    return "<pre>" + esc(md) + "</pre>";
  }

  function readingTime(raw) {
    var words = String(raw).trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / 220));
  }

  /* ---------- blog index ---------- */
  function renderIndex(root) {
    if (!POSTS.length) {
      root.innerHTML = '<p class="blog-empty">No posts yet. Check back soon.</p>';
      return;
    }

    var limit = parseInt(root.getAttribute("data-limit"), 10);
    var posts = limit > 0 ? POSTS.slice(0, limit) : POSTS;

    var html = '<ul class="list">';
    posts.forEach(function (p) {
      html +=
        '<li><a href="/post.html?slug=' + esc(p.slug) + '">' + esc(p.title) + "</a>" +
        '<span class="date">' + esc(p.dateLabel || p.date) + "</span></li>";
    });
    html += "</ul>";

    root.innerHTML = html;
  }

  /* ---------- single post ---------- */
  function getParam(name) {
    var m = new RegExp("[?&]" + name + "=([^&]+)").exec(window.location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : null;
  }

  function renderPost() {
    var slug = getParam("slug");
    var post = slug ? bySlug(slug) : null;
    var titleEl = document.getElementById("post-title");
    var bodyEl = document.getElementById("post-body");

    if (!post) {
      if (titleEl) titleEl.textContent = "Post not found";
      if (bodyEl)
        bodyEl.innerHTML =
          '<p>Sorry, that article doesn\'t exist. <a href="/blog.html">Back to all writing →</a></p>';
      return;
    }

    // Hero / metadata
    document.title = post.title + " | Kaden Yeung";
    setMeta("description", post.excerpt || post.subtitle || "");
    setMeta("og:title", post.title, true);
    setMeta("og:description", post.excerpt || post.subtitle || "", true);

    if (titleEl) titleEl.textContent = post.title;
    var subEl = document.getElementById("post-subtitle");
    if (subEl) {
      if (post.subtitle) subEl.textContent = post.subtitle;
      else subEl.style.display = "none";
    }
    var metaEl = document.getElementById("post-meta");
    if (metaEl) {
      metaEl.innerHTML =
        esc(post.dateLabel || post.date) +
        ' <span class="sep">·</span> <span id="post-readtime"></span>';
    }

    var coverEl = document.getElementById("post-cover");
    if (coverEl) {
      if (post.cover) {
        coverEl.innerHTML =
          '<img src="/blog/images/' + esc(post.cover) + '" alt="" decoding="async" />';
      } else {
        coverEl.style.display = "none";
      }
    }

    // Body
    fetch("/blog/posts/" + post.file)
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.text();
      })
      .then(function (raw) {
        if (bodyEl) bodyEl.innerHTML = renderMarkdown(raw);
        var rtEl = document.getElementById("post-readtime");
        if (rtEl) rtEl.textContent = readingTime(raw) + " min read";
        renderPrevNext(post);
      })
      .catch(function (err) {
        if (bodyEl) {
          bodyEl.innerHTML =
            '<p class="blog-empty">Couldn\'t load this article.<br><small>' +
            esc(err.message) +
            "</small></p>" +
            '<p><small>If you opened this file directly from disk, run a local server ' +
            "(e.g. <code>python3 -m http.server</code>); browsers block <code>fetch</code> on <code>file://</code>. " +
            "On the live site it works automatically.</small></p>";
        }
      });
  }

  function renderPrevNext(post) {
    var wrap = document.getElementById("post-nav");
    if (!wrap) return;
    var idx = POSTS.indexOf(post);
    var newer = idx > 0 ? POSTS[idx - 1] : null; // sorted newest-first
    var older = idx < POSTS.length - 1 ? POSTS[idx + 1] : null;
    var links = [];
    if (older) {
      links.push('Older: <a href="/post.html?slug=' + esc(older.slug) + '">' + esc(older.title) + "</a>");
    }
    if (newer) {
      links.push('Newer: <a href="/post.html?slug=' + esc(newer.slug) + '">' + esc(newer.title) + "</a>");
    }
    wrap.innerHTML = links.join("<br />");
  }

  function setMeta(name, content, isProp) {
    if (!content) return;
    var sel = isProp
      ? 'meta[property="' + name + '"]'
      : 'meta[name="' + name + '"]';
    var el = document.querySelector(sel);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(isProp ? "property" : "name", name);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  }

  /* ---------- expose for the Studio live preview ---------- */
  window.KadenBlog = {
    renderMarkdown: renderMarkdown,
    posts: POSTS,
  };

  /* ---------- boot ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    var indexRoot = document.getElementById("blog-index");
    if (indexRoot) renderIndex(indexRoot);
    if (document.getElementById("post-body")) renderPost();
  });
})();
