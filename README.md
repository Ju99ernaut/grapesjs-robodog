# Grapesjs Robodog

[WIP] [`Robodog`](https://uppy.io/docs/robodog/) file uploader for intergrating [`transloadit`](https://transloadit.com) into `grapesjs`.

### HTML
```html
<link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet">
<script src="https://unpkg.com/grapesjs"></script>
<link href="https://unpkg.com/@blocomposer/grapesjs-robodog/dist/grapesjs-robodog.min.css" rel="stylesheet">
<script src="https://unpkg.com/@blocomposer/grapesjs-robodog"></script>

<div id="gjs"></div>
```

### JS
```js
const editor = grapesjs.init({
	container: '#gjs',
  height: '100%',
  fromElement: true,
  storageManager: false,
  plugins: ['grapesjs-robodog'],
});
```

### CSS
```css
body, html {
  margin: 0;
  height: 100%;
}
```


## Summary

* Plugin name: `grapesjs-robodog`



## Options

| Option | Description | Default |
|-|-|-
| `btnEl` | Custom button element which triggers Uppy modal | ` ` |
| `btnText` | Text for the button in case the custom one is not provided | `Add images` |
| `theme` | Uppy's filepicker theme | `dark` |
| `params` | Transloadit params | `{...}` |
| `uppyOpts` | Uppy's options | `{...}` |
| `dashboardOpts` | Uppy's dashboard options | `{...}` |
| `companionUrl` | Uppy companion url | `https://companion.uppy.io` |
| `onComplete` | On complete upload callback | `console.log('successful files:', assets)` |
| `onFailed` | On failed upload callback | `console.log('failed files:', assets)` |



## Download

* CDN
  * `https://unpkg.com/@blocomposer/grapesjs-robodog`
* NPM
  * `npm i @blocomposer/grapesjs-robodog`
* GIT
  * `git clone https://github.com/Ju99ernaut/grapesjs-robodog.git`



## Usage

Directly in the browser
```html
<link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet"/>
<link href="https://unpkg.com/@blocomposer/grapesjs-robodog/dist/grapesjs-robodog.min.css" rel="stylesheet">
<script src="https://unpkg.com/grapesjs"></script>
<script src="path/to/grapesjs-robodog.min.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  var editor = grapesjs.init({
      container: '#gjs',
      // ...
      plugins: ['grapesjs-robodog'],
      pluginsOpts: {
        'grapesjs-robodog': { /* options */ }
      }
  });
</script>
```

Modern javascript
```js
import grapesjs from 'grapesjs';
import plugin from '@blocomposer/grapesjs-robodog';
import 'grapesjs/dist/css/grapes.min.css';
import '@blocomposer/grapesjs-robodog/dist/grapesjs-robodog.min.css';

const editor = grapesjs.init({
  container : '#gjs',
  // ...
  plugins: [plugin],
  pluginsOpts: {
    [plugin]: { /* options */ }
  }
  // or
  plugins: [
    editor => plugin(editor, { /* options */ }),
  ],
});
```



## Development

Clone the repository

```sh
$ git clone https://github.com/Ju99ernaut/grapesjs-robodog.git
$ cd grapesjs-robodog
```

Install dependencies

```sh
$ npm i
```

Build css

```sh
$ npm run build:css
```

Start the dev server

```sh
$ npm start
```

Build the source

```sh
$ npm run build
```



## License

MIT
