<link href="https://cdn.jsdelivr.net/npm/@uvarov.frontend/vanilla-calendar/build/vanilla-calendar.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@uvarov.frontend/vanilla-calendar/build/themes/light.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@uvarov.frontend/vanilla-calendar/build/themes/dark.min.css" rel="stylesheet">
<!-- Plugin JS -->
<script src="https://cdn.jsdelivr.net/npm/@uvarov.frontend/vanilla-calendar/build/vanilla-calendar.min.js" defer></script>

## events

Mauris felis diam, pellentesque vel lacinia ac, dictum a nunc. Mauris mattis nunc sed mi sagittis et facilisis tortor volutpat. Etiam tincidunt urna mattis erat placerat placerat ac eu tellus.

<div id="calendar"></div>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const calendar = new VanillaCalendar('#calendar');
    calendar.init();
  });
</script>