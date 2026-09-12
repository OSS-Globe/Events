# Contributing to OSS Events

First off, thank you for considering contributing to OSS Events! It's people like you that make OSS Globe such a great community.

## Adding or Updating an Event

Currently, all event data is stored in `data/events.json`. To add a new event or update an existing one:

1. Fork this repository.
2. Edit `data/events.json` to include your changes. Please follow the existing schema and ensure dates are in ISO 8601 format (`YYYY-MM-DD`).
3. If you are adding a new event, please provide accurate latitude and longitude for the location so it appears correctly on the globe.
4. Submit a Pull Request with a clear description of the event you added or updated.

### Event Data Schema

```json
{
  "id": "unique-event-slug-year",
  "name": "Event Name",
  "description": "A short description of the event.",
  "placeholderDescription": false,
  "type": "conference", // conference, summit, forum, community-day, member-meeting, themed-week
  "startDate": "YYYY-MM-DD", // null if TBA
  "endDate": "YYYY-MM-DD",
  "location": {
    "city": "City Name",
    "country": "Country Name", // null if virtual
    "lat": 0.0000, // null if virtual
    "lng": 0.0000  // null if virtual
  },
  "online": false,
  "hybrid": false,
  "officialWebsite": "https://...",
  "registrationLink": "https://...",
  "organizer": "Organizer Name",
  "tags": ["tag1", "tag2"],
  "cfp": {
    "status": "open", // closed, open, none, tba, unknown
    "closesOn": "YYYY-MM-DD" // optional
  },
  "lastUpdated": "YYYY-MM-DD"
}
```

## Contributing to the Website

If you'd like to help build the website itself:

1. Fork the repository.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server.
4. Make your changes and test them locally.
5. Submit a Pull Request.

Please check the issues tab for "good first issue" or "help wanted" tags!
