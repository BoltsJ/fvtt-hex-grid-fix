"use strict";

import { libWrapper } from "./shim.js";
import { FixedHexagonalGrid } from "./fixedhexgrid.js";

Hooks.once("init", () => {
  libWrapper.register(
    "fvtt-hex-grid-fix",
    "GridLayer.prototype.draw",
    async function ({ type = null, dimensions = null, gridColor = null, gridAlpha = null } = {}) {
      await CanvasLayer.prototype.draw.apply(this);

      // Get grid data
      const gt = type !== null ? type : this.type;

      // Grid configuration
      let grid;
      let gridOptions = {
        dimensions: dimensions || canvas.dimensions,
        color: gridColor || canvas.scene.data.gridColor.replace("#", "0x") || "0x000000",
        alpha: gridAlpha || canvas.scene.data.gridAlpha,
        columns: [CONST.GRID_TYPES.HEXODDQ, CONST.GRID_TYPES.HEXEVENQ].includes(gt),
        even: [CONST.GRID_TYPES.HEXEVENR, CONST.GRID_TYPES.HEXEVENQ].includes(gt),
      };

      // Gridless
      if (gt === CONST.GRID_TYPES.GRIDLESS) grid = new BaseGrid(gridOptions);
      // Square grid
      else if (gt === CONST.GRID_TYPES.SQUARE) grid = new SquareGrid(gridOptions);
      // Hexagonal grid
      else grid = new FixedHexagonalGrid(gridOptions);

      // Draw the highlight layer
      this.highlightLayers = {};
      this.highlight = this.addChild(new PIXI.Container());

      // Draw the grid
      this.grid = this.addChild(grid.draw());
      return this;
    },
    "OVERRIDE"
  );
});
