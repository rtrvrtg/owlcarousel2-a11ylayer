# Owl Carousel v2 Accessibility Layer

Accessibility layer for [Owl Carousel v2](https://github.com/smashingboxes/OwlCarousel2).

## Authorship

Written by [Geoffrey Roberts](mailto:g.roberts@blackicemedia.com)

## License

MIT

## Features

* Keyboard control (arrow keys)
* Focusable controls & panes
* ARIA attributes for visibility

## Requirements

* jQuery
* Owl Carousel v2

## Features

* Adds WAI-ARIA visibility and role hinting attributes
* Adds keyboard navigation (arrow keys for previous/next, enter keys on controls)

### TODO

* Screen-readable text descriptions

## Installation

In the `<head>` of your page, after you set up your jQuery, Owl Carousel and jquery-throttle-debounce `<script>` items, add the following:

```html
<script type="text/javascript" src="owlcarousel2-a11ylayer.js"></script>
```

## Usage

Once you've installed the accessibility layer plugin, it gets used automatically when you instantiate Owl Carousel.

## Changelog

### v0.2

Fixed a bunch of nasty bugs, brought up to date with latest OCv2 API.

### v0.1

Initial commit

## @TODO

* Text description of behaviour and changes
