# OSS Events

OSS Events is a community-maintained directory and discovery platform for open-source conferences, summits, hackathons, and meetups worldwide. 

Built as the first major project under the OSS Globe organization, this platform aims to solve the discovery problem in the open-source ecosystem by providing a single, actively maintained atlas of where and when the community is gathering.

If you find this project useful or want to support our mission, please consider giving the repository a star ⭐! It helps more people discover the project.

## The Contribution Loop

This project relies on the community to keep the event data accurate and up to date. The architecture is designed to make contributing as straightforward as possible:

1. A user visits the site and notices an upcoming event is missing (or has incorrect details).
2. The user submits a Pull Request modifying `data/events.json`.
3. A maintainer reviews and merges the PR.
4. The Next.js application automatically rebuilds and deploys via Vercel.
5. The global event directory is immediately updated for everyone.

## Adding or Updating an Event

All event data is statically stored in `data/events.json`. The website has no backend database, meaning every event is tracked via version control.

To add an event:
1. Fork this repository.
2. Add your event to `data/events.json` following the required schema.
3. Submit a Pull Request.

For detailed instructions on the data schema and how to submit a PR, please read our [Contributing Guide](CONTRIBUTING.md).

## Local Development

The project is built using Next.js (App Router), Tailwind CSS, and react-globe.gl for the interactive 3D map.

### Prerequisites
- Node.js 18.17 or later
- npm, pnpm, or yarn

### Setup

1. Clone the repository
```bash
git clone https://github.com/OSS-Globe/events.git
cd events
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The application will automatically reload if you change any of the source files.

## Architecture & Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS v4
- **Interactive Map:** react-globe.gl (WebGL/Three.js)
- **Data Layer:** Static JSON (`data/events.json`)
- **Deployment:** Vercel

The application heavily utilizes Next.js Static Site Generation (SSG). Because the event data is stored in a local JSON file, all dynamic routes (such as individual event pages, country directories, and category tags) are pre-rendered at build time. This ensures maximum performance and allows Search Engines to properly index every event using Schema.org JSON-LD tags.

## License

This project is open source and available under the MIT License. See the [LICENSE](LICENSE) file for more information.
