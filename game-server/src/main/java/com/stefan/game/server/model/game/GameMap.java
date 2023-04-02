package com.stefan.game.server.model.game;

import com.stefan.game.server.model.game.tiles.TerrainType;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;

import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.util.List;
import java.util.Queue;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.BiFunction;

/**
 * https://stackoverflow.com/questions/1838656/how-do-i-represent-a-hextile-hex-grid-in-memory
 *
 * @author Stefan Ivanov
 * @since 23.11.2022
 */
@Slf4j
public class GameMap {

    private final String mapName;
    private int[][] field;
    private int[][] copyField;

    public GameMap(String mapName) {
        this.mapName = mapName;
    }

    public TerrainType getTileAtCoordinates(Coordinates coordinates) {
        return TerrainType.fromIndex(field[coordinates.x()][coordinates.y()]);
    }

    public void initMap() {
        try {
//            var file = ResourceUtils.getFile("classpath:maps/" + mapName);
//            var scanner = new Scanner(new FileInputStream(file));

//            List<String> lines = new ArrayList<>();
//            while (scanner.hasNext()) {
//                lines.add(scanner.nextLine());
//            }

            var lines = List.of("1 1 1 1 1 1 1", "1 0 0 0 0 0 1", "1 0 0 0 0 0 1", "1 0 0 0 0 0 1", "1 0 0 0 0 0 1", "1 0 0 0 0 0 1", "1 1 1 1 1 1 1");

            field = lines.stream()
                    .map(line -> Arrays.stream(line.split(" "))
                            .map(Integer::valueOf)
                            .map(TerrainType::fromIndex)
                            .mapToInt(TerrainType::getMappingIndex)
                            .toArray())
                    .toArray(int[][]::new);
            copyField = lines.stream()
                    .map(line -> Arrays.stream(line.split(" "))
                            .map(Integer::valueOf)
                            .map(TerrainType::fromIndex)
                            .mapToInt(TerrainType::getMappingIndex)
                            .toArray())
                    .toArray(int[][]::new);
//        } catch (FileNotFoundException e) {
//            log.error("Error loading file: {}", mapName, e);
//            throw new RuntimeException(e);
        } catch (Exception e) {
            log.error("Error generating the map", e);
            throw e;
        }
    }

    public boolean isMovePossible(Coordinates from, Coordinates to) {
        // Queue
        Queue<Coordinates> q = new LinkedList<>();
        int[][] dir
                = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        // Insert the top right corner.
        q.add(from);

        // Until queue is empty
        while (q.size() > 0) {
            var p = (q.peek());
            q.remove();

            // Mark as visited
            copyField[p.x()][p.y()] = 5;

            // Destination is reached.
            if (p.x() == to.x() && p.y() == to.y()) {
                return true;
            }

            // Check all four directions
            for (int i = 0; i < 4; i++) {

                // Using the direction array
                int a = p.x() + dir[i][0];
                int b = p.y() + dir[i][1];

                // Not blocked and valid
                if (a >= 0 && b >= 0 && a < to.x() && b < to.y()
                        && copyField[a][b] != -1) {
                    if (a == to.x() - 1 && b == to.y() - 1)
                        return true;

                    q.add(new Coordinates(a, b));
                }
            }
        }
        return false;
    }

    public void draw(int[][] matrix) {
        final int pad = 9;
        final BiFunction<Integer, Integer, String> write = (x, y) -> String.format("%s,%s", x, y);
        for (int i = 0; i < matrix.length; i++) {
            if (i % 2 == 0) {
                System.out.print(StringUtils.center("", pad / 2));
            }

            for (int j = 0; j < matrix[i].length; j++) {
                System.out.print("|" + StringUtils.center(write.apply(i, j), pad));
            }
            System.out.println();
            System.out.println(StringUtils.repeat(" - ", matrix.length * pad / 2));
        }

        System.out.println();
        System.out.println();
        System.out.println();
    }

    @Override
    public String toString() {
        draw(field);
        draw(copyField);
        return "";
//        return "GameMap{" +
//                "field=" + System.lineSeparator() + Arrays.stream(field)
//                .map(Arrays::toString)
//                .collect(Collectors.joining(System.lineSeparator())) +
//                System.lineSeparator() +
//                "copyField=" + System.lineSeparator() + Arrays.stream(copyField)
//                .map(Arrays::toString)
//                .collect(Collectors.joining(System.lineSeparator())) +
//                System.lineSeparator() +
//                '}';
    }

    public static void main(String[] args) {
        var map = new GameMap("");
        map.initMap();
        map.isMovePossible(new Coordinates(1, 2), new Coordinates(4, 4));
        System.out.println(map);
        new MyCanvas(map.field);
    }

    static class MyCanvas extends JPanel implements MouseListener {
        Image img;
        int[][] matrix;

        public MyCanvas(int[][] matrix) {
            this.matrix = matrix;
            JFrame frame = new JFrame("Demo");
            frame.add(this);
            frame.setSize(550, 250);
            frame.setVisible(true);
            frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            this.addMouseListener(this);
        }

        @Override
        public void paintComponent(Graphics g) {
            Map<Point, Hex> map = new HashMap<>();
            Layout l = new Layout(Layout.pointy, new Point(30, 30), new Point(0, 0));
            for (int i = 0; i < matrix.length; i++) {
                for (int j = 0; j < matrix[i].length; j++) {
                    map.put(new Point(i, j), new Hex(i, j, -i - j));
                }
            }

            AtomicInteger i = new AtomicInteger();
            map.forEach((key, value) -> {
                int width = 10;
                int height = 10;

                g.drawArc((int) key.x + i.get() * width, (int)key.y + i.get() * height, width, height, 0, 120);
                i.addAndGet(10);
            });
        }

        @Override
        public void mouseClicked(MouseEvent e) {
            int x = e.getX();
            int y = e.getY();

            Graphics g = img.getGraphics();
            g.fillOval(x, y, 3, 3);
            g.dispose();
        }

        @Override
        public void mousePressed(MouseEvent e) {

        }

        @Override
        public void mouseReleased(MouseEvent e) {

        }

        @Override
        public void mouseEntered(MouseEvent e) {

        }

        @Override
        public void mouseExited(MouseEvent e) {

        }
    }
}

final class Point {
    public final double x;
    public final double y;

    Point(double x, double y) {
        this.x = x;
        this.y = y;
    }

    public double x() {return x;}

    public double y() {return y;}

    @Override
    public boolean equals(Object obj) {
        if (obj == this) return true;
        if (obj == null || obj.getClass() != this.getClass()) return false;
        var that = (Point) obj;
        return Double.doubleToLongBits(this.x) == Double.doubleToLongBits(that.x) &&
                Double.doubleToLongBits(this.y) == Double.doubleToLongBits(that.y);
    }

    @Override
    public int hashCode() {
        return Objects.hash(x, y);
    }

    @Override
    public String toString() {
        return "Point[" +
                "x=" + x + ", " +
                "y=" + y + ']';
    }

}

class Hex {
    public Hex(int x, int y, int z) {
        this.x = x;
        this.y = y;
        this.z = z;
        if (x + y + z != 0) throw new IllegalArgumentException("q + r + s must be 0");
    }

    public final int x;
    public final int y;
    public final int z;

    public Hex add(Hex b) {
        return new Hex(x + b.x, y + b.y, z + b.z);
    }


    public Hex subtract(Hex b) {
        return new Hex(x - b.x, y - b.y, z - b.z);
    }


    public Hex scale(int k) {
        return new Hex(x * k, y * k, z * k);
    }


    public Hex rotateLeft() {
        return new Hex(-z, -x, -y);
    }


    public Hex rotateRight() {
        return new Hex(-y, -z, -x);
    }

    static public ArrayList<Hex> directions = new ArrayList<Hex>() {{
        add(new Hex(1, 0, -1));
        add(new Hex(1, -1, 0));
        add(new Hex(0, -1, 1));
        add(new Hex(-1, 0, 1));
        add(new Hex(-1, 1, 0));
        add(new Hex(0, 1, -1));
    }};

    static public Hex direction(int direction) {
        return Hex.directions.get(direction);
    }


    public Hex neighbor(int direction) {
        return add(Hex.direction(direction));
    }

    static public ArrayList<Hex> diagonals = new ArrayList<Hex>() {{
        add(new Hex(2, -1, -1));
        add(new Hex(1, -2, 1));
        add(new Hex(-1, -1, 2));
        add(new Hex(-2, 1, 1));
        add(new Hex(-1, 2, -1));
        add(new Hex(1, 1, -2));
    }};

    public Hex diagonalNeighbor(int direction) {
        return add(Hex.diagonals.get(direction));
    }


    public int length() {
        return (int) ((Math.abs(x) + Math.abs(y) + Math.abs(z)) / 2);
    }


    public int distance(Hex b) {
        return subtract(b).length();
    }

}

class FractionalHex {
    public FractionalHex(double q, double r, double s) {
        this.q = q;
        this.r = r;
        this.s = s;
        if (Math.round(q + r + s) != 0) throw new IllegalArgumentException("q + r + s must be 0");
    }

    public final double q;
    public final double r;
    public final double s;

    public Hex hexRound() {
        int qi = (int) (Math.round(q));
        int ri = (int) (Math.round(r));
        int si = (int) (Math.round(s));
        double q_diff = Math.abs(qi - q);
        double r_diff = Math.abs(ri - r);
        double s_diff = Math.abs(si - s);
        if (q_diff > r_diff && q_diff > s_diff) {
            qi = -ri - si;
        } else if (r_diff > s_diff) {
            ri = -qi - si;
        } else {
            si = -qi - ri;
        }
        return new Hex(qi, ri, si);
    }


    public FractionalHex hexLerp(FractionalHex b, double t) {
        return new FractionalHex(q * (1.0 - t) + b.q * t, r * (1.0 - t) + b.r * t, s * (1.0 - t) + b.s * t);
    }


    static public ArrayList<Hex> hexLinedraw(Hex a, Hex b) {
        int N = a.distance(b);
        FractionalHex a_nudge = new FractionalHex(a.x + 1e-06, a.y + 1e-06, a.z - 2e-06);
        FractionalHex b_nudge = new FractionalHex(b.x + 1e-06, b.y + 1e-06, b.z - 2e-06);
        ArrayList<Hex> results = new ArrayList<Hex>() {{}};
        double step = 1.0 / Math.max(N, 1);
        for (int i = 0; i <= N; i++) {
            results.add(a_nudge.hexLerp(b_nudge, step * i).hexRound());
        }
        return results;
    }

}

class OffsetCoord {
    public OffsetCoord(int col, int row) {
        this.col = col;
        this.row = row;
    }

    public final int col;
    public final int row;
    static public int EVEN = 1;
    static public int ODD = -1;

    static public OffsetCoord qoffsetFromCube(int offset, Hex h) {
        int col = h.x;
        int row = h.y + (int) ((h.x + offset * (h.x & 1)) / 2);
        if (offset != OffsetCoord.EVEN && offset != OffsetCoord.ODD) {
            throw new IllegalArgumentException("offset must be EVEN (+1) or ODD (-1)");
        }
        return new OffsetCoord(col, row);
    }


    static public Hex qoffsetToCube(int offset, OffsetCoord h) {
        int q = h.col;
        int r = h.row - (int) ((h.col + offset * (h.col & 1)) / 2);
        int s = -q - r;
        if (offset != OffsetCoord.EVEN && offset != OffsetCoord.ODD) {
            throw new IllegalArgumentException("offset must be EVEN (+1) or ODD (-1)");
        }
        return new Hex(q, r, s);
    }


    static public OffsetCoord roffsetFromCube(int offset, Hex h) {
        int col = h.x + (int) ((h.y + offset * (h.y & 1)) / 2);
        int row = h.y;
        if (offset != OffsetCoord.EVEN && offset != OffsetCoord.ODD) {
            throw new IllegalArgumentException("offset must be EVEN (+1) or ODD (-1)");
        }
        return new OffsetCoord(col, row);
    }


    static public Hex roffsetToCube(int offset, OffsetCoord h) {
        int q = h.col - (int) ((h.row + offset * (h.row & 1)) / 2);
        int r = h.row;
        int s = -q - r;
        if (offset != OffsetCoord.EVEN && offset != OffsetCoord.ODD) {
            throw new IllegalArgumentException("offset must be EVEN (+1) or ODD (-1)");
        }
        return new Hex(q, r, s);
    }

}

class DoubledCoord {
    public DoubledCoord(int col, int row) {
        this.col = col;
        this.row = row;
    }

    public final int col;
    public final int row;

    static public DoubledCoord qdoubledFromCube(Hex h) {
        int col = h.x;
        int row = 2 * h.y + h.x;
        return new DoubledCoord(col, row);
    }


    public Hex qdoubledToCube() {
        int q = col;
        int r = (int) ((row - col) / 2);
        int s = -q - r;
        return new Hex(q, r, s);
    }


    static public DoubledCoord rdoubledFromCube(Hex h) {
        int col = 2 * h.x + h.y;
        int row = h.y;
        return new DoubledCoord(col, row);
    }


    public Hex rdoubledToCube() {
        int q = (int) ((col - row) / 2);
        int r = row;
        int s = -q - r;
        return new Hex(q, r, s);
    }

}

class Orientation {
    public Orientation(double f0, double f1, double f2, double f3, double b0, double b1, double b2, double b3, double start_angle) {
        this.f0 = f0;
        this.f1 = f1;
        this.f2 = f2;
        this.f3 = f3;
        this.b0 = b0;
        this.b1 = b1;
        this.b2 = b2;
        this.b3 = b3;
        this.start_angle = start_angle;
    }

    public final double f0;
    public final double f1;
    public final double f2;
    public final double f3;
    public final double b0;
    public final double b1;
    public final double b2;
    public final double b3;
    public final double start_angle;
}

class Layout {
    public Layout(Orientation orientation, Point size, Point origin) {
        this.orientation = orientation;
        this.size = size;
        this.origin = origin;
    }

    public final Orientation orientation;
    public final Point size;
    public final Point origin;
    static public Orientation pointy = new Orientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5);
    static public Orientation flat = new Orientation(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0), 2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0);

    public Point hexToPixel(Hex h) {
        Orientation M = orientation;
        double x = (M.f0 * h.x + M.f1 * h.y) * size.x;
        double y = (M.f2 * h.x + M.f3 * h.y) * size.y;
        return new Point(x + origin.x, y + origin.y);
    }


    public FractionalHex pixelToHex(Point p) {
        Orientation M = orientation;
        Point pt = new Point((p.x - origin.x) / size.x, (p.y - origin.y) / size.y);
        double q = M.b0 * pt.x + M.b1 * pt.y;
        double r = M.b2 * pt.x + M.b3 * pt.y;
        return new FractionalHex(q, r, -q - r);
    }


    public Point hexCornerOffset(int corner) {
        Orientation M = orientation;
        double angle = 2.0 * Math.PI * (M.start_angle - corner) / 6.0;
        return new Point(size.x * Math.cos(angle), size.y * Math.sin(angle));
    }


    public ArrayList<Point> polygonCorners(Hex h) {
        ArrayList<Point> corners = new ArrayList<Point>() {{}};
        Point center = hexToPixel(h);
        for (int i = 0; i < 6; i++) {
            Point offset = hexCornerOffset(i);
            corners.add(new Point(center.x + offset.x, center.y + offset.y));
        }
        return corners;
    }

}
