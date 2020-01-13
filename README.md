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

### Optimization:
```
- React Lazy loading / webpack
- Split code into chunks (code-splitting) separating bundle chunks/vendors etc.
- Split library of airports into separate JSON files
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

### Dist

Open this:

```
dist/index.html
```

## Acknowledgments
* [Tomasz Kajtoch](https://tsh.io/blog/code-splitting-with-react-webpack-for-frontend-optimisation/) - Guide on code splitting
* [Glenn Stovall](https://glennstovall.com/roll-your-own-redux/) - Very useful useContext/useReducer hook guide
* [Enmanuel Durán](https://enmascript.com/articles/2018/10/12/the-power-of-dynamic-imports-in-javascript-and-react) - Dynamically importing library/db json files
