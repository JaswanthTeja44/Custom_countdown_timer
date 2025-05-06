    const form = document.getElementById('timerForm');
    const countdownDisplay = document.getElementById('countdownDisplay');
    const errorText = document.getElementById('errorText');
    const themeSelector = document.getElementById('themeSelector');

    let intervalId;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      clearInterval(intervalId);

      const datetimeInput = document.getElementById('datetimeInput').value;
      const targetDate = new Date(datetimeInput);
      const now = new Date();

      if (isNaN(targetDate) || targetDate <= now) {
        errorText.classList.remove('hidden');
        countdownDisplay.classList.add('hidden');
        return;
      }

      errorText.classList.add('hidden');
      countdownDisplay.classList.remove('hidden');

      intervalId = setInterval(() => {
        const current = new Date();
        const diff = targetDate - current;

        if (diff <= 0) {
          clearInterval(intervalId);
          alert('Countdown Finished!');
          countdownDisplay.classList.add('hidden');
          return;
        }

        const seconds = Math.floor((diff / 1000) % 60);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
      }, 1000);
    });

    themeSelector.addEventListener('change', (e) => {
      if (e.target.value === 'dark') {
        document.documentElement.style.setProperty('--bg-color', '#111827');
        document.documentElement.style.setProperty('--text-color', '#f9fafb');
        document.documentElement.style.setProperty('--secondary-color', '#1e293b');
      } else {
        document.documentElement.style.setProperty('--bg-color', '#f9fafb');
        document.documentElement.style.setProperty('--text-color', '#1f2937');
        document.documentElement.style.setProperty('--secondary-color', '#e0e7ff');
      }
    });

