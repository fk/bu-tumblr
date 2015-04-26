# Brooklyn United Blog

## Stack
This is written using:
1. React
2. Flux
3. Koa.js
4. ES6/Babel
5. Gulp

## Usage
To run using the koa server, run gulp watch. To build for deployment to Tubmlr,
run `NODE_ENV=production gulp`, and then upload the public assets to Tumblr,
and reference them in the tumblr template. Make sure the markup has the
following markup:

```html
<!doctype>
<html lang="en">
<head>
  <title>Brooklyn United Blog</title>
  <link rel="stylesheet" href="(ref to app.min.css)"></link>
</head>
<body>
  <div id="root"></div>
  <script src="(ref to bundle.min.js)"></script>
</body>
</html>
```
