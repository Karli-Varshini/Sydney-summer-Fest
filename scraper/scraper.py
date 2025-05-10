import requests
from bs4 import BeautifulSoup
import json

def scrape_eventbrite():
    url = 'https://www.eventbrite.com.au/d/australia--sydney/events--may-2025/'
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    events = []

    for event_card in soup.select('.eds-event-card-content__content'):
        title = event_card.select_one('.eds-event-card-content__title').get_text(strip=True)
        date = event_card.select_one('.eds-event-card-content__sub-title').get_text(strip=True)
        location = "Sydney, Australia"
        description = "Event description here."
        image = "images/default.jpg"
        url = event_card.find_parent('a')['href']
        events.append({
            'title': title,
            'date': date,
            'location': location,
            'description': description,
            'image': image,
            'url': url
        })
    return events

if __name__ == "__main__":
    events = scrape_eventbrite()
    with open('../data/events.json', 'w') as f:
        json.dump(events, f, indent=2)
