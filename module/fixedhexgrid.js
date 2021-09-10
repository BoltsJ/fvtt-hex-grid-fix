export class FixedHexagonalGrid extends HexagonalGrid {
  constructor(options) {
    super(options);
    const size = options.dimensions.size;
    if (this.columns) {
      this.w = (size * 2) / Math.sqrt(3);
      this.h = size;
    } else {
      this.w = size;
      this.h = (size * 2) / Math.sqrt(3);
    }
  }

  /**
   * See https://www.redblobgames.com/grids/hexagons/ for reference
   * @override
   */
  cubeToOffset(q, r, s) {
    const offset = this.options.even ? -1 : 1;

    // Column orientation
    if (this.options.columns) {
      const col = q;
      const row = s + (q - offset * (q & 1)) / 2;
      return { row, col };
    }

    // Row orientation
    else {
      const row = s;
      const col = q + (s - offset * (s & 1)) / 2;
      return { row, col };
    }
  }
}
