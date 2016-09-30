# Gabion

## Stack

1. [React](https://facebook.github.io/react/)
2. Flux ([Alt](http://alt.js.org/))
3. [Koa](http://koajs.com/)
4. ES6/[Babel](https://babeljs.io/)/[Webpack](http://webpack.github.io/)
5. [Gulp](http://gulpjs.com/)

## Usage

To run using the Koa server, run `gulp watch`. To build for deployment to Tumblr,
run `NODE_ENV=production gulp` or `npm run production` and then upload the public assets to Tumblr,
and reference them in the Tumblr template:

```html
<!doctype>
<html lang="en">
<head>
  <title>Gabion</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="stylesheet" href="http://static.tumblr.com/app.min.css"></link>
</head>
<body>
  <div id="root"></div>
  <script src="http://static.tumblr.com/bundle.min.js"></script>
</body>
</html>
```
