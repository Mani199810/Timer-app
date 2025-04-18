# Project running instruction
in the repository run this command
## for install all packages
  >Timer-app> npm i
## for run the app
  >Timer-app> npm start

## Assumptions Made During Development
LocalStorage for Persistence
All timer data and history are stored locally using localStorage. No backend integration is assumed.

Single Device Usage
Timers are assumed to run on a single session/browser. Timers do not persist countdowns in the background when the tab is closed.

No External Timer Libraries
The app uses setInterval for timer functionality without using advanced scheduler libraries.

Simplified Theme Logic
Theme support is built with a simple toggle and basic CSS variables. It does not use a full design system or CSS-in-JS libraries.

UI Responsiveness via Bootstrap
Bootstrap is used for layout and responsiveness. Custom styles are minimal and scoped to Bootstrap classes.

Export is JSON Only
Exporting timer history is implemented as a JSON download. No CSV or PDF support is included by default.

Category Input is Free Text
Users manually enter category names. There is no autocomplete or dropdown population from existing categories.
