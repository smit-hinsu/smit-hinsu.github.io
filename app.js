/* ============================================================
   Single-page navigation + book detail modal
   ============================================================ */
(function () {
  'use strict';

  /* ---- Book metadata (order-independent lookup) ---- */
  var BOOKS = {
    'singularity':          { title: 'The Singularity is Near',       author: 'Ray Kurzweil',      cover: 'covers/singularity.jpg' },
    'metaphors':            { title: 'Metaphors We Live By',          author: 'George Lakoff',     cover: 'covers/metaphors.jpg',     review: 'rev-metaphors' },
    'behave':               { title: 'Behave',                        author: 'Robert M. Sapolsky',cover: 'covers/behave.jpg' },
    'selfish-gene':         { title: 'The Selfish Gene',              author: 'Richard Dawkins',   cover: 'covers/selfish-gene.jpg' },
    'thinking-fast-slow':   { title: 'Thinking, Fast and Slow',       author: 'Daniel Kahneman',   cover: 'covers/thinking-fast-slow.jpg' },
    'righteous-mind':       { title: 'The Righteous Mind',            author: 'Jonathan Haidt',    cover: 'covers/righteous-mind.jpg' },
    'thinking-systems':     { title: 'Thinking in Systems',           author: 'Donella H. Meadows',cover: 'covers/thinking-systems.jpg' },
    'bad-samaritans':       { title: 'Bad Samaritans',                author: 'Ha-Joon Chang',     cover: 'covers/bad-samaritans.jpg', review: 'rev-bad-samaritans' },
    'disunited':            { title: 'Disunited Nations',             author: 'Peter Zeihan',      cover: 'covers/disunited.jpg' },
    'never-split':          { title: 'Never Split the Difference',    author: 'Chris Voss',        cover: 'covers/never-split.jpg',   review: 'rev-never-split' },
    'crucial-conversations':{ title: 'Crucial Conversations',         author: 'Kerry Patterson',   cover: 'covers/crucial-conversations.jpg' },
    'gtd':                  { title: 'Getting Things Done',           author: 'David Allen',       cover: 'covers/gtd.jpg' },
    'ove':                  { title: 'A Man Called Ove',              author: 'Fredrik Backman',   cover: 'covers/ove.jpg' },

    'genius-makers':        { title: 'Genius Makers',                 author: 'Cade Metz',            cover: 'covers/genius-makers.jpg' },
    'code-breaker':         { title: 'The Code Breaker',              author: 'Walter Isaacson',      cover: 'covers/code-breaker.jpg',   review: 'rev-code-breaker' },
    'incognito':            { title: 'Incognito',                     author: 'David Eagleman',       cover: 'covers/incognito.jpg' },
    'science-storytelling': { title: 'The Science of Storytelling',   author: 'Will Storr',           cover: 'covers/science-storytelling.jpg', review: 'rev-science-storytelling' },
    'feynman':              { title: "Surely You're Joking, Mr. Feynman!", author: 'Richard P. Feynman', cover: 'covers/feynman.jpg' },
    'idea-factory':         { title: 'The Idea Factory',              author: 'Jon Gertner',          cover: 'covers/idea-factory.jpg' },
    'school-of-life':       { title: 'The School of Life',            author: 'Alain de Botton',      cover: 'covers/school-of-life.jpg', review: 'rev-school-of-life' },
    'talk-to-someone':      { title: 'Maybe You Should Talk to Someone', author: 'Lori Gottlieb',     cover: 'covers/talk-to-someone.jpg', review: 'rev-talk-to-someone' },
    'shah-rukh':            { title: 'Desperately Seeking Shah Rukh',  author: 'Shrayana Bhattacharya', cover: 'covers/shah-rukh.jpg',    review: 'rev-shah-rukh' },
    'trade-wars':           { title: 'Trade Wars Are Class Wars',     author: 'Matthew C. Klein',     cover: 'covers/trade-wars.jpg' },
    'broken-money':         { title: 'Broken Money',                  author: 'Lyn Alden',            cover: 'covers/broken-money.jpg' },
    'buffett':              { title: 'Buffett',                       author: 'Roger Lowenstein',     cover: 'covers/buffett.jpg' },
    'world-ends':           { title: 'This Is How They Tell Me the World Ends', author: 'Nicole Perlroth', cover: 'covers/world-ends.jpg' },
    'how-not-to-die':       { title: 'How Not to Die',                author: 'Michael Greger',       cover: 'covers/how-not-to-die.jpg' },
    'zero-to-one':          { title: 'Zero to One',                   author: 'Peter Thiel',          cover: 'covers/zero-to-one.jpg' },
    'understanding-power':  { title: 'Understanding Power',           author: 'Noam Chomsky',         cover: 'covers/understanding-power.jpg' },

    'silk-roads':           { title: 'The Silk Roads',                author: 'Peter Frankopan',      cover: 'covers/more/r25812847.jpg' },
    'world-order':          { title: 'World Order',                   author: 'Henry Kissinger',      cover: 'covers/more/r20821140.jpg' },
    'secret-success':       { title: 'The Secret of Our Success',     author: 'Joseph Henrich',       cover: 'covers/more/r25761655.jpg' },
    'vital-question':       { title: 'The Vital Question',            author: 'Nick Lane',            cover: 'covers/more/r23316494.jpg' },
    'antifragile':          { title: 'Antifragile',                   author: 'Nassim Nicholas Taleb',cover: 'covers/more/r13530973.jpg' },
    'the-prince':           { title: 'The Prince',                    author: 'Niccolò Machiavelli',  cover: 'covers/more/r28862.jpg' },
    'elon-musk':            { title: 'Elon Musk',                     author: 'Walter Isaacson',      cover: 'covers/more/r122765395.jpg' },
    'invent-wander':        { title: 'Invent and Wander',            author: 'Jeff Bezos',           cover: 'covers/more/r54505323.jpg' },
    'discipline-freedom':   { title: 'Discipline Equals Freedom',     author: 'Jocko Willink',        cover: 'covers/more/r34431560.jpg' }
  };

  var VIEWS = ['about', 'reading', 'blog'];
  var panels = {}, links = {};

  document.querySelectorAll('.panel').forEach(function (p) { panels[p.id] = p; });
  document.querySelectorAll('.nav__link').forEach(function (a) { links[a.dataset.view] = a; });

  /* ---- GoatCounter (cookieless): per-section pageviews + click events ---- */
  var gcInited = false;
  function gcCount(vars) {
    if (window.goatcounter && window.goatcounter.count) window.goatcounter.count(vars);
  }
  function gcSlug(s) {
    return (s || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }
  function gcClick(label) {
    gcCount({ path: 'click:' + gcSlug(label), title: 'Click: ' + label, event: true });
  }

  function showView(id, push) {
    if (VIEWS.indexOf(id) === -1) id = 'about';
    VIEWS.forEach(function (v) {
      if (panels[v]) panels[v].classList.toggle('is-active', v === id);
      if (links[v])  links[v].classList.toggle('is-current', v === id);
    });
    if (push && location.hash !== '#' + id) history.pushState(null, '', '#' + id);
    var main = document.querySelector('.main');
    if (main) main.scrollTop = 0;
    window.scrollTo(0, 0);
    // Count section switches as pageviews (initial load is auto-counted as "/").
    if (gcInited) gcCount({ path: '/#' + id, title: 'Section: ' + id });
    gcInited = true;
  }

  document.querySelectorAll('.nav__link').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      showView(a.dataset.view, true);
    });
  });

  window.addEventListener('popstate', function () {
    showView((location.hash || '#about').slice(1), false);
  });

  /* ---- Book modal ---- */
  var modal   = document.getElementById('modal');
  var mCover  = document.getElementById('m-cover');
  var mTitle  = document.getElementById('m-title');
  var mAuthor = document.getElementById('m-author');
  var mReview = document.getElementById('m-review');

  function openBook(key) {
    var b = BOOKS[key];
    if (!b) return;
    mCover.src = b.cover;
    mCover.alt = b.title;
    mTitle.textContent = b.title;
    mAuthor.textContent = b.author;
    mReview.innerHTML = '';
    if (b.review) {
      var tpl = document.getElementById(b.review);
      if (tpl) mReview.appendChild(tpl.content.cloneNode(true));
    } else {
      mReview.innerHTML = '<p class="modal__norev">No written note for this one — just a five-star favorite.</p>';
    }
    modal.hidden = false;
    document.body.classList.add('modal-open');
    gcCount({ path: 'book:' + key, title: 'Book: ' + b.title, event: true });
  }

  function closeBook() {
    modal.hidden = true;
    document.body.classList.remove('modal-open');
  }

  document.querySelectorAll('.bk').forEach(function (btn) {
    btn.addEventListener('click', function () { openBook(btn.dataset.book); });
  });
  modal.querySelectorAll('[data-close]').forEach(function (el) {
    el.addEventListener('click', closeBook);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) closeBook();
  });

  /* ---- Email: assembled at runtime so the plain address isn't in the HTML source ---- */
  function armEmail(el) {
    var revealed = false;
    function reveal() {
      if (revealed) return;
      revealed = true;
      el.href = 'mailto:' + (el.dataset.e || '').split('').reverse().join('');
    }
    ['mouseenter', 'focus', 'touchstart'].forEach(function (ev) {
      el.addEventListener(ev, reveal, { once: true });
    });
    el.addEventListener('click', reveal);
  }
  document.querySelectorAll('.js-email').forEach(armEmail);

  /* ---- Hide the Blog tab until there's at least one post ---- */
  if (document.querySelectorAll('#blog .post').length === 0) {
    if (links.blog) links.blog.style.display = 'none';
    var bi = VIEWS.indexOf('blog');
    if (bi > -1) VIEWS.splice(bi, 1);
  }

  /* ---- Track clicks on links that leave the page (external + CV) and the email ---- */
  document.querySelectorAll('a[target="_blank"], a.js-email').forEach(function (a) {
    a.addEventListener('click', function () {
      gcClick(a.dataset.gc || a.textContent.trim());
    });
  });

  /* ---- Init ---- */
  document.getElementById('year').textContent = new Date().getFullYear();
  showView((location.hash || '#about').slice(1), false);
})();
