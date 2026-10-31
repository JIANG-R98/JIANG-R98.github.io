(function () {
  'use strict';

  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');
  var themeMeta = document.getElementById('theme-color');
  var systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  var storageKey = 'jiang-site-theme';

  function readStoredTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function applyTheme(theme, persist) {
    root.dataset.theme = theme;

    if (themeMeta) {
      themeMeta.setAttribute('content', theme === 'dark' ? '#12110f' : '#f7f3ec');
    }

    if (toggle) {
      var isDark = theme === 'dark';
      toggle.setAttribute('aria-label', isDark ? '切换到浅色模式' : '切换到深色模式');
      toggle.setAttribute('aria-pressed', String(isDark));
    }

    if (persist) {
      try {
        localStorage.setItem(storageKey, theme);
      } catch (error) {
        /* 隐私模式下忽略存储失败 */
      }
    }
  }

  var storedTheme = readStoredTheme();
  applyTheme(
    storedTheme === 'dark' || storedTheme === 'light'
      ? storedTheme
      : (systemTheme.matches ? 'dark' : 'light'),
    false
  );

  if (toggle) {
    toggle.addEventListener('click', function () {
      applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
    });
  }

  function followSystemTheme(event) {
    if (!readStoredTheme()) {
      applyTheme(event.matches ? 'dark' : 'light', false);
    }
  }

  if (typeof systemTheme.addEventListener === 'function') {
    systemTheme.addEventListener('change', followSystemTheme);
  } else if (typeof systemTheme.addListener === 'function') {
    systemTheme.addListener(followSystemTheme);
  }

  document.querySelectorAll('[data-copy]').forEach(function (button) {
    button.addEventListener('click', function () {
      var value = button.getAttribute('data-copy') || '';
      var status = document.getElementById('copy-status');

      function finish(copied) {
        button.textContent = copied ? '已复制' : '请手动复制';
        if (status) {
          status.textContent = copied ? '邮箱已复制到剪贴板' : '复制失败，已选中邮箱，请手动复制';
        }
        if (!copied) {
          var emailLink = button.parentElement.querySelector('a[href^="mailto:"]');
          if (emailLink && window.getSelection) {
            var range = document.createRange();
            range.selectNodeContents(emailLink);
            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
          }
        }
        window.setTimeout(function () {
          button.textContent = '复制';
          if (status) {
            status.textContent = '';
          }
        }, 2400);
      }

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(value).then(
          function () { finish(true); },
          function () { finish(false); }
        );
        return;
      }

      var helper = document.createElement('textarea');
      helper.value = value;
      helper.setAttribute('readonly', '');
      helper.style.position = 'fixed';
      helper.style.opacity = '0';
      document.body.appendChild(helper);
      helper.select();

      var copied = false;
      try {
        copied = document.execCommand('copy');
      } catch (error) {
        copied = false;
      }

      document.body.removeChild(helper);
      finish(copied);
    });
  });

  var year = document.getElementById('year');
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();
