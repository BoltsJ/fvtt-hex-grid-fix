export class FixedHexagonalGrid extends HexagonalGrid {
  constructor(...args) {
    super(...args);
    this.w = (this.w * 2) / Math.sqrt(3);
    this.h = (this.h * 2) / Math.sqrt(3);
  }

  getSnappedPosition(x, y, interval = 1) {
    // Only use new logic for interval 2, which is used for tmplates and map pins
    if (interval !== 2) return super.getSnappedPosition(x, y, interval);

    const [x0, y0] = this.getCenter(x, y);

    // Find the nearest point in the set of the center and vertices
    // get an array of points representing the vertices of the cell
    const points = this.hexPoints.map(p => {
      return { x: x0 + (p[0] - 0.5) * this.w, y: y0 + (p[1] - 0.5) * this.h };
    });

    // Find the closest point to the snap location
    return points.reduce(
      (r, p) => {
        if ((x - p.x) ** 2 + (y - p.y) ** 2 >= (x - r.x) ** 2 + (y - r.y) ** 2) {
          return r;
        } else {
          return p;
        }
      },
      { x: x0, y: y0 }
    );
  }
}
