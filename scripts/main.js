document.addEventListener('DOMContentLoaded', () => {
  fetch('data/events.json')
    .then(response => response.json())
    .then(events => {
      const container = document.getElementById('events-container');
      events.forEach(event => {
        const card = document.createElement('div');
        card.className = 'event-card';
        card.innerHTML = `
          <img src="${event.image}" alt="${event.title}" />
          <div class="content">
            <h3>${event.title}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p>${event.description}</p>
            <a href="#" class="get-tickets" data-url="${event.url}">GET TICKETS</a>
          </div>
        `;
        container.appendChild(card);
      });
      document.querySelectorAll('.get-tickets').forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          const url = e.target.getAttribute('data-url');
          const email = prompt('Enter your email ID:');
          if (email) {
            window.open(url, '_blank');
          }
        });
      });
    })
    .catch(error => console.error('Error loading events:', error));
});