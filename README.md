# Flight Planner

Flight planner React project done using the Kiwi.com flight-search Api

## Stack
* Javascript (just vanilla)
* React
* [Reactstrap](https://reactstrap.github.io/)
* Bootstrap
* [Bootstrap Icons](https://github.com/twbs/icons)
* Webpack

### Process
* Make skeleton components with text
* Setup routing/verify it's working
* Position everything 'correctly' with Bootstrap/Reactstrap
* Make smaller subcomponents
* Add actual content
* Optimize
* Deploy to Github pages

### Optimization
```
- React Lazy loading / webpack
- Split code into chunks (code-splitting) separating bundle chunks/vendors etc.
- Split library of airports into separate JSON files
```

### Funny problems
**Green outline flashing around multiple components:**
Took me a while to figure out this one; at first I thought the issue was Reactstrap doing something strange with animations/style toggling which I had no influence over, but the issue was actually with React & Bootstrap.

**Solution:**
Remove the following from bootstrap.min.css where the style is green(ish)
```
.dropdown-toggle:focus
```

### Installation

Run this:

```
npm i
```

### Build

Run this:

```
npm run build
```

### Deploy

*This will be updated...*

## Acknowledgments
* [Tomasz Kajtoch](https://tsh.io/blog/code-splitting-with-react-webpack-for-frontend-optimisation/) - Guide on code splitting
* [Glenn Stovall](https://glennstovall.com/roll-your-own-redux/) - Very useful useContext/useReducer hook guide
* [Enmanuel Durán](https://enmascript.com/articles/2018/10/12/the-power-of-dynamic-imports-in-javascript-and-react) - Dynamically importing library/db json files
* [Atta Comsian](https://attacomsian.com/blog/javascript-fetch-api) - Refreshing take on fetch/then error handling
