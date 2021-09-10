# Hex Grid Fixes

 * Fixes the incorrect scaling on measurements.
 * Fixes incorrect conversion from cubic coordinates to row/column coordinates

## Warning

This module changes how the grid is calculated from the grid size. This means that the grid shifts and will need to be adjusted back. Because the math for hexes involve irrational numbers, it's not really possible to do this perfectly, but you can get close by running the following code snippet on each scene.

```js
canvas.scene.update({ grid: Math.round(canvas.scene.data.grid * 0.5 * Math.sqrt(3)) });
```

## Screenshots

Before:

![Before](https://github.com/BoltsJ/fvtt-hex-grid-fix/blob/default/before.png?raw=true)

After:

![After](https://github.com/BoltsJ/fvtt-hex-grid-fix/blob/default/after.png?raw=true)
