"use strict";
const { cos, sin, sqrt, acos, round, max, min, atan2, PI, pow, random, hypot } = Math;
function FromHex(n, a, b) {
    return parseInt(n.substr(a, b, 16) / 255);
}
class Pt {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    set(x, y) {
        this.x = x;
        this.y = y;
    }
    copy(alt) {
        this.x = alt.x;
        this.y = alt.y;
    }
    /**
     * Renvoie le vecteur correspondant à ce vecteur multiplié par un nombre
     * @param n échelle
     */
    scale(n) {
        return new Pt(this.x * n, this.y * n);
    }
    /**
     * Renvoie la distance entre ce vecteur et un autre
     * @param alt second point
     */
    dist(alt) {
        return hypot(this.x - alt.x, this.y - alt.y);
    }
    /**
     * Renvoie le vecteur correspondant à ce vecteur divisé par un nombre
     * @param n échelle
     */
    divide(n) {
        return n == 0 ? new Pt(this.x, this.y) : new Pt(this.x / n, this.y / n);
    }
    /**
     * Renvoie le vecteur unité correspondant à ce vecteur
     */
    get unit() {
        return Pt.Divide(this, hypot(this.x, this.y));
    }
    /**
     * Renvoie le vecteur perpendiculaire à ce vecteur
     * The normal vector, often simply called the "normal," to a surface is a vector
     * which is perpendicular to the surface at a given point.
     * https://mathworld.wolfram.com/NormalVector.html
     */
    get normal() {
        const u = Pt.Unit(this);
        return new Pt(-u.y, u.x);
    }
    /**
     * Renvoie le vecteur correspondant à l'addition d'un autre vecteur à ce vecteur
     * @param alt vecteur à ajouter
     */
    add(alt) {
        return new Pt(this.x + alt.x, this.y + alt.y);
    }
    /**
     * Renvoie le vecteur correspondant à la soustraction d'un autre vecteur de ce vecteur
     * @param alt vecteur à soustraire
     */
    sub(alt) {
        return new Pt(this.x - alt.x, this.y - alt.y);
    }
    /**
     * Renvoie le produit de ce vecteur avec un autre
     * Si le dot product est négatif, les vecteurs sont dans des directions opposées.
     * Si le dot product vaut zéro, les vecteurs sont perpendiculaires.
     * The dot product between two UNIT vectors is the cosine of the angle between those two vectors.
     * @param alt second Pt
     */
    dot(alt) {
        return (this.x * alt.x) + (this.y * alt.y);
    }
    /**
     * Multiplie un vecteur par un nombre
     * @param p vecteur à multiplier
     * @param n échelle
     */
    static Scale(p, n) {
        return new Pt(p.x * n, p.y * n);
    }
    /**
     * Distance entre deux points
     * @param p premier point
     * @param alt second point
     */
    static Dist(p, alt) {
        return hypot(p.x - alt.x, p.y - alt.y);
    }
    /**
     * Divise un vecteur par un nombre
     * @param p vecteur à diviser
     * @param n échelle
     */
    static Divide(p, n) {
        return n == 0 ? new Pt(p.x, p.y) : new Pt(p.x / n, p.y / n);
    }
    /**
     * Renvoie le vecteur unité
     * @param p vecteur à normer
     */
    static Unit(p) {
        return Pt.Divide(p, hypot(p.x, p.y));
    }
    /**
     * Renvoie le vecteur perpendiculaire
     * @param p vecteur dont on cherche la normale
     */
    static Normal(p) {
        const u = Pt.Unit(p);
        return new Pt(-u.y, u.x);
    }
    /**
     * Renvoie l'addition du second au premier vecteur
     * @param p vecteur de base
     * @param alt vecteur à ajouter
     */
    static Add(p, alt) {
        return new Pt(p.x + alt.x, p.y + alt.y);
    }
    /**
     * Renvoie la soustraction du second vecteur du premier
     * @param p vecteur de base
     * @param alt vecteur à soustraire
     */
    static Substract(p, alt) {
        return new Pt(p.x - alt.x, p.y - alt.y);
    }
    /**
     * Produit de deux vecteurs, qui ont une magnitude et une direction.
     * Le dot product est négatif : si les deux vecteurs sont dans des directions opposées.
     * Le dot est zéro si les vecteurs sont perpendiculaires.
     * Le dot est le même si on commence par le premier ou le second point
     * @param p premier Pt (ordre indifférent)
     * @param alt second Pt (ordre indifférent)
     */
    static Dot(p, alt) {
        return (p.x * alt.x) + (p.y * alt.y);
    }
    static InPolygon(p, poly) {
        var inside = false;
        let j = poly.length - 1;
        for (let i = 0; i < poly.length; i++) {
            if (poly[i].x < p.y && poly[j].y >= p.y || poly[j].y < p.y && poly[i].y >= p.y) {
                if (poly[i].x + (p.y - poly[i].y) / (poly[j].y - poly[i].y) * (poly[j].x - poly[i].x) < p.x) {
                    inside = !inside;
                }
            }
            j = i;
        }
        return inside;
    }
    static Rotate(p, radians) {
        const c = cos(radians), s = sin(radians);
        return new Pt(p.x * c + p.y * s, p.x * -s + p.y * c);
    }
}
class Color extends Float32Array {
    constructor(n, a = 1) {
        super([0, 0, 0, 0]);
        this.a = a;
        if (typeof n == "number") {
            [this.r, this.g, this.b] = [((n >> 16) & 0xff) / 255, ((n >> 8) & 0xff) / 255, (n & 0xFF) / 255];
        }
        else if (typeof n == "object") {
            [this.r, this.g, this.b, this.a] = [n.r, n.g, n.b, n.a];
        }
        else {
            if (n.length === 7) {
                [this.r, this.g, this.b] = [FromHex(n,1, 2), FromHex(n, 3, 2), FromHex(n, 5, 2)];
            } else {
                throw ("Parsing de la couleur " + n + " impossible");
            }
        }
        this.set([this.r, this.g, this.b, this.a]);
    }
    static FromScale(n) {
        return new Color({ r: n[0], g: n[1], b: n[2], a: 1 });
    }
}
Color.black = new Color({ r: 0, g: 0, b: 0, a: 1 });
Color.white = new Color("#FFFFFF", 1);
Color.red = new Color("#FF0000", 1);
Color.green = new Color(0x00FF00, 1);
Color.blue = new Color({ r: .2, g: .2, b: 1, a: 1 });
Color.magenta = new Color({ r: 1, g: 0, b: 1, a: 1 });
Color.yellow = new Color({ r: 1, g: 1, b: 0, a: 1 });
Color.cyan = new Color({ r: 0, g: 1, b: 1, a: 1 });
class DisplayObject {
    constructor() {
        this._created = false;
        this.graphics = [];
        this.transform = new Float32Array([0, 0, 0, 0, 0, 0, 1, 1, 1]);
    }
    init(program) {
        if (this._created)
            return;
        let gl = program.gl;
        this.gl = gl;
        this.vao = gl.createVertexArray();
        gl.bindVertexArray(this.vao);
        const buff = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buff);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 24, 0);
        gl.enableVertexAttribArray(1);
        gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 24, 8);
        this.buffer = buff;
        this._created = true;
    }
    exec(s) {
        if (!this._created)
            this.init(s.program);
        const pos = new Float32Array(this.graphics.map(c => c.pos).flat()); // yess !
        const gl = this.gl, lg = pos.length / 6;
        gl.bindVertexArray(this.vao);
        gl.uniformMatrix3fv(gl.getUniformLocation(s.program.program, "trans"), false, this.transform);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, pos, gl.DYNAMIC_DRAW);
        gl.drawArrays(gl.TRIANGLES, 0, lg);
    }
    get stage() {
        return this._stage;
    }
    set stage(value) {
        this._stage = value;
    }
}
class Programmer {
    constructor(stage, name) {
        this.name = name;
        this.uniforms = new Map();
        this.attributes = new Map();
        const gl = stage.canvas.getContext("webgl2");
        const program = gl.createProgram();
        this.program = program;
        this.gl = gl;
        // transparences
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        this.compile(`#version 300 es
        precision highp float;
        in vec2 position;
        in vec4 color;
        uniform mat3 trans;
        uniform float size;
        uniform vec2 resolution;
        out vec4 pixcolor;

        vec2 transform(vec2 v) {
            vec3 translation = trans[0];
            float angle = radians(trans[1][2]);
            mat3 rotation = mat3(cos(angle), -sin(angle), 0, sin(angle), cos(angle), 0, 0, 0, 1.0);
            mat3 scale = mat3(trans[2][0],0,0,0,trans[2][1],0,0,0,1.0);
            vec3 r = vec3(v, 1.0);
            r *= rotation;
            r += translation;
            r *= scale;
            return vec2((r.xy / resolution * 2.0) - 1.0) * vec2(1, -1);
        }

        void main() {
            vec2 pos = transform(position);
            vec2 clipSpace = pos;
            gl_PointSize = size;
            gl_Position = vec4(clipSpace, 0, 1);
            pixcolor = color;
        }`, `#version 300 es
        precision highp float;
        
        in vec4 pixcolor;
        out vec4 outColor; 

        void main() {
            outColor = pixcolor;
        }`);
        this.createAttribute("position");
        this.createAttribute("color");
        this.createUniform("resolution");
        this.createUniform("size");
        this.createUniform("trans");
        stage.program = this;
        stage.programs.set(this.name, this);
    }
    /**
     * Crée et ajoute un attribut à la liste
     * @param name identifiant de l'attribut
     */
    createAttribute(name) {
        let a = this.gl.getAttribLocation(this.program, name);
        if (a == -1)
            throw new RangeError("Construction : l'attribute " + name + " n'existe pas");
        this.attributes.set(name, a);
        return a;
    }
    /**
     * Crée et ajoute un uniform à la liste
     * @param name identifiant de l'uniform
     */
    createUniform(name) {
        let u = this.gl.getUniformLocation(this.program, name);
        if (u == null)
            throw new RangeError("Construction : l'uniform " + name + " n'existe pas");
        this.uniforms.set(name, u);
        return u;
    }
    getAttr(key) {
        if (this.attributes.has(key))
            return this.attributes.get(key);
        throw new RangeError("Lecture : l'attribute " + key + " n'existe pas");
    }
    getUni(key) {
        if (this.uniforms.has(key))
            return this.uniforms.get(key);
        throw new RangeError("Lecture : l'uniform " + key + " n'existe pas");
    }
    compile(vertexSource, fragmentSource) {
        const program = this.program, gl = this.gl;
        const vs = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vs, vertexSource);
        gl.compileShader(vs);
        let info = gl.getShaderInfoLog(vs);
        if (info !== "")
            throw "VERTEX SHADER FAIL : " + info;
        gl.attachShader(program, vs);
        const fs = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fs, fragmentSource);
        gl.compileShader(fs);
        info = gl.getShaderInfoLog(fs);
        if (info !== "")
            throw "FRAGMENT SHADER FAIL : " + info;
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        gl.useProgram(program);
    }
}
class GrCmd {
    constructor(s, pos) {
        this.pos = pos;
        s.graphics.push(this);
    }
}
class DisplayObjectContainer extends DisplayObject {
    constructor() {
        super(...arguments);
        this.children = [];
    }
    addChild(s) {
        if (s.parent)
            s.parent.removeChild(s);
        this.children.push(s);
        s.stage = this.stage;
        s.parent = this;
    }
    removeChild(s) {
        if (s.parent === this && s.index > -1)
            this.children.splice(s.index, 1);
        s.parent = undefined;
        s.stage = undefined;
    }
}
class Sprite2D extends DisplayObjectContainer {
    clear() {
        this.graphics = [];
        this.children.forEach(s => s.clear());
    }
    translate(tx, ty) {
        this.transform[0] = tx;
        this.transform[1] = ty;
        this.children.forEach(s => s.translate(tx, ty));
    }
    rotate(degrees, pivotX = 0, pivotY = 0) {
        this.transform[3] = pivotX;
        this.transform[4] = pivotY;
        this.transform[5] = degrees;
        this.children.forEach(s => s.rotate(degrees, pivotX, pivotY));
    }
    scale(amount) {
        this.transform[6] = amount;
        this.transform[7] = amount;
        this.transform[8] = 1;
        this.children.forEach(s => s.scale(amount));
    }
    plot(c, x, y, plotSize) {
        const m = plotSize / 2, [r, g, b, a] = [c.r, c.g, c.b, c.a];
        new GrCmd(this, [
            x - m, y - m, r, g, b, a,
            x - m, y + m, r, g, b, a,
            x + m, y + m, r, g, b, a,
            x - m, y - m, r, g, b, a,
            x + m, y + m, r, g, b, a,
            x + m, y - m, r, g, b, a,
        ]);
    }
    drawCircle(c, cx, cy, rx, border, thickness = 1) {
        this.drawEllipse(c, cx, cy, rx, rx, border, thickness);
    }
    drawEllipse(c, cx, cy, rx, ry, border, thickness = 1) {
        const pt = new Pt(cx + rx, cy), alt = new Pt(0, 0), [r, g, b, a] = c;
        let angle = 0;
        const pts = [], eb = [];
        for (let i = 1; i <= 32; i++) {
            angle = i / 32 * 2 * Math.PI;
            alt.set(cx + rx * cos(angle), cy + ry * sin(angle));
            pts.push(cx, cy, r, g, b, a, pt.x, pt.y, r, g, b, a, alt.x, alt.y, r, g, b, a); // un triangle
            if (border)
                eb.push(pt.x, pt.y, alt.x, alt.y);
            pt.copy(alt);
        }
        new GrCmd(this, pts);
        if (border)
            this.drawPolyline(border, eb, thickness);
    }
    drawLine(c, sx, sy, ex, ey, thickness = 1) {
        const start = new Pt(sx, sy), end = new Pt(ex, ey), [r, g, b, a] = c;
        const perp = start.sub(end).normal.scale(thickness / 2); // perpendiculaire au segment
        let [A, B, C, D] = [start.sub(perp), start.add(perp), end.add(perp), end.sub(perp)];
        new GrCmd(this, [
            A.x, A.y, r, g, b, a,
            B.x, B.y, r, g, b, a,
            C.x, C.y, r, g, b, a,
            A.x, A.y, r, g, b, a,
            C.x, C.y, r, g, b, a,
            D.x, D.y, r, g, b, a
        ]);
    }
    drawPolyline(c, pts, thickness = 1) {
        const [r, g, b, a] = c, vert = [];
        for (let i = 0; i < pts.length; i += 4) {
            let [sx, sy, ex, ey] = pts.slice(i, i + 4);
            const start = new Pt(sx, sy), end = new Pt(ex, ey);
            const perp = start.sub(end).normal.scale(thickness / 2); // perpendiculaire au segment
            let [A, B, C, D] = [start.sub(perp), start.add(perp), end.add(perp), end.sub(perp)];
            vert.push(A.x, A.y, r, g, b, a, B.x, B.y, r, g, b, a, C.x, C.y, r, g, b, a, A.x, A.y, r, g, b, a, C.x, C.y, r, g, b, a, D.x, D.y, r, g, b, a);
        }
        new GrCmd(this, vert);
    }
    curveCubic(c, dx, dy, ax, ay, bx, by, x, y, thickness = 1) {
        const resolution = 0.01, verts = []; // résolution = finesse des pas entre 0 et 1 
        for (var t = 0.0; t < 1; t += resolution) {
            let s = cubic(dx, dy, ax, ay, bx, by, x, y, t);
            let e = cubic(dx, dy, ax, ay, bx, by, x, y, t + resolution);
            verts.push(s.x, s.y, e.x, e.y);
        }
        this.drawPolyline(c, verts, thickness);
        function cubic(dx, dy, ax, ay, bx, by, x, y, t) {
            const t2 = t * t, t3 = t2 * t, mt = 1 - t, mt2 = mt * mt, mt3 = mt2 * mt;
            return {
                x: dx * mt3 + 3 * ax * mt2 * t + 3 * bx * mt * t2 + x * t3,
                y: dy * mt3 + 3 * ay * mt2 * t + 3 * by * mt * t2 + y * t3
            };
        }
    }
    curveQuadratic(c, dx, dy, ax, ay, x, y, thickness = 1) {
        const resolution = 0.01, verts = []; // résolution = finesse du pas (entre 0 et 1) 
        for (var t = 0.0; t < 1; t += resolution) {
            let s = quadratic(dx, dy, ax, ay, x, y, t);
            let e = quadratic(dx, dy, ax, ay, x, y, t + resolution);
            verts.push(s.x, s.y, e.x, e.y);
        }
        this.drawPolyline(c, verts, thickness);
        function quadratic(dx, dy, ax, ay, x, y, t) {
            const t2 = t * t, mt = 1 - t, mt2 = mt * mt;
            return { x: dx * mt2 + ax * 2 * mt * t + x * t2, y: dy * mt2 + ay * 2 * mt * t + y * t2 };
        }
    }
    fillRect(c, x, y, width, height) {
        const [x1, y1, x2, y2] = [x, y, x + width, y + height], [r, g, b, a] = c;
        new GrCmd(this, [
            x1, y1, r, g, b, a,
            x1, y2, r, g, b, a,
            x2, y1, r, g, b, a,
            x1, y2, r, g, b, a,
            x2, y2, r, g, b, a,
            x2, y1, r, g, b, a,
        ]);
    }
    drawRect3D(c, x, y, width, height, up) {
        this.fillRect(c, x, y, width, height);
        this.drawLine(up ? Color.black : Color.white, x, y, x, y + height, 1);
        this.drawLine(up ? Color.black : Color.white, x, y + height, x + width, y + height, 1);
        this.drawLine(up ? Color.white : Color.black, x, y, x + width, y, 1);
        this.drawLine(up ? Color.white : Color.black, x + width, y, x + width, y + height, 1);
    }
    strokeRect(c, x, y, width, height, thickness) {
        const [x1, y1, x2, y2] = [x, y, x + width, y + height];
        this.drawLine(c, x1, y1, x2, y1, thickness);
        this.drawLine(c, x2, y1, x2, y2, thickness);
        this.drawLine(c, x2, y2, x1, y2, thickness);
        this.drawLine(c, x1, y2, x1, y1, thickness);
    }
    get index() {
        if (!this.parent)
            return -1;
        return this.parent.children.indexOf(this);
    }
    draw() {
        const stage = this.stage;
        if (stage) {
            this.exec(stage);
            this.children.forEach(s => s.draw());
        }
    }
}
class Stage2D extends DisplayObjectContainer {
    constructor() {
        super();
        this.programs = new Map();
        this.children = [];
        this.plotSize = 3;
        this._stage = this;
        this.canvas = document.createElement("canvas");
        this.canvas.style.position = "absolute";
        document.body.appendChild(this.canvas);
        this.program = new Programmer(this, "flat");
    }
    animate(callback) {
        const stage = this;
        const program = this.program.program, gl = this.program.gl;
        gl.useProgram(program);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        animation();
        function animation() {
            callback();
            stage.children.forEach(s => s.draw());
            requestAnimationFrame(animation);
        }
    }
    update() {
        const gl = this.program.gl;
        gl.viewport(0, 0, this.width, this.height);
        this.program.gl.uniform2fv(this.program.getUni("resolution"), new Float32Array([this.width, this.height]));
    }
    setPosition(x, y) {
        this.left = x;
        this.top = y;
    }
    setSize(width, height) {
        this.width = width;
        this.height = height;
    }
    get borderStyle() { return this.canvas.style.border; }
    set borderStyle(value) { this.canvas.style.border = value; }
    get backgroundColor() { return this.canvas.style.backgroundColor; }
    set backgroundColor(value) { this.canvas.style.backgroundColor = value; }
    get left() { return parseInt(this.canvas.style.left); }
    set left(value) { this.canvas.style.left = value + "px"; }
    get top() { return parseInt(this.canvas.style.top); }
    set top(value) { this.canvas.style.top = value + "px"; }
    get width() { return this.canvas.width; }
    set width(value) {
        this.canvas.width = value;
        this.canvas.style.width = value + "px";
        this.update();
    }
    get height() { return this.canvas.height; }
    set height(value) {
        this.canvas.height = value;
        this.canvas.style.height = value + "px";
        this.update();
    }
}


// -------------------------- Implémentation -------------------------------------

window.onload = () => {
    const stage = new Stage2D();
    const stageX = 20, stageY = 20, stageWidth = 1024, stageHeight = 768;
    stage.setPosition(stageX, stageY);
    stage.setSize(stageWidth, stageHeight);
    stage.backgroundColor = "#666699";
    stage.borderStyle = "1px solid red";
    const cols = [
        [1, 0, 0], [0, 1, 0], [0, 0, 1], [1, 1, 0], [0, 1, 1], [1, 0, 1],
        [.5, 1, .5], [.5, 1, 1], [1, .5, 1], [1, 1, .5], [.5, .5, 1], [1, .5, .5],
        [.5, 1, .5], [0, 0, 0], [1, 1, 1], [.5, 0, .5], [.5, 0, 0], [0, .5, 0],
        [0, 0, .5], [.5, .5, 0], [0, .5, .5], [.5, 0, .5]
    ];
    const nightBackground = new Sprite2D();
    const movingLines = new Sprite2D();
    const circles = new Sprite2D();
    const smiley = new Sprite2D();
    stage.addChild(nightBackground); // order matters !
    stage.addChild(movingLines);
    stage.addChild(circles);
    circles.addChild(smiley);
    let dy = 150, fy = 600, dv = 1, fv = 2, mv = 1.001, mx = stageWidth / 2, my = stageHeight / 2, nbPlots = 1500, plotSize = 6;
    let r, g, b;
    for (let j = 0; j < nbPlots; j++) {
        r = random(), g = random(), b = random();
        nightBackground.plot(new Color({ r: r, g: g, b: b, a: 1 }), (r * stageWidth) - mx, (g * stageHeight) - my, plotSize);
    }
    nightBackground.translate(mx, my);
    function create() {
        movingLines.clear();
        for (let i = 0; i < 50; i++) {
            movingLines.drawLine(Color.yellow, 512, dy, i * 21, fy);
            movingLines.drawLine(Color.cyan, 0, dy, i * 21, fy);
            movingLines.drawLine(Color.black, 1024, dy, i * 21, fy);
            movingLines.fillRect(Color.magenta, 2 + i * 21, dy - 16, 12, 14);
            movingLines.strokeRect(Color.green, 2 + i * 21, fy + 4, 12, 14, 1);
            movingLines.drawRect3D(new Color(0x666666), 2 + i * 21, dy + 50, 19, 14, true);
        }
        circles.clear();
        for (let c = 0; c < cols.length; c++) {
            circles.drawCircle(Color.FromScale(cols[c]), c * 44 + 30, my, 16, Color.white, 2);
            circles.drawCircle(Color.FromScale(cols[c]), (fy + 150) + (150 * sin(c)), dy + (100 * cos(c)), 10);
            circles.drawEllipse(Color.FromScale(cols[c]), c * 44 + 50, fy, 20, 40);
        }
        smiley.clear();
        smiley.drawEllipse(Color.yellow, 50, 55, 45, 50, Color.black, 3);
        smiley.drawEllipse(Color.black, 34, 35, 15, 18); // oeil gauche
        smiley.drawEllipse(Color.black, 62, 35, 15, 18); // oeil droit
        smiley.curveQuadratic(Color.yellow, 16, 35, 25, 20, 45, 35, 3); // sourcil oeil gauche
        smiley.curveQuadratic(Color.yellow, 50, 35, 65, 20, 80, 35, 3); // sourcil oeil droit
        smiley.curveCubic(Color.black, 20, 65, 30, 90, 70, 90, 80, 65, 4); // courbe cubique bouche
    }
    create();
    stage.animate(animation);
    function animation() {
        create();
        animateSmiley();
        dy += dv;
        fy += fv;
        if (dy > 700 || dy < 2)
            dv = -dv;
        if (fy > 740 || fy < 2)
            fv = -fv;
        rotateScaleLines();
        animateBackground();
    }
    function rotateScaleLines() {
        movingLines.rotate(cos(mv), mx, my);
        movingLines.scale(1 + sin(mv));
        mv += 0.01;
    }
    function animateSmiley() {
        smiley.translate(fy * 1.25, dy * .95);
        smiley.scale((100 + dy) / 600);
        smiley.rotate(dy, 100, 100);
    }
    function animateBackground() {
        nightBackground.rotate(dy);
    }
};