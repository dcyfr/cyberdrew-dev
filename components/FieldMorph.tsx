"use client";

import { useEffect, useRef } from "react";

/**
 * The render, morphing.
 *
 * The star at the centre of the plate is the part worth looking at, and a PNG
 * cannot change shape. This samples that render through a radial displacement
 * so the arms extend, retract and undulate continuously: the same artwork, no
 * longer holding still.
 *
 * The displacement TAPERS TO ZERO AT THE RING. That is the point rather than a
 * detail. The mass inside is free to move and the boundary does not, which is
 * the argument the whole page is making, drawn instead of written. Warping the
 * ring too would say the opposite thing.
 *
 * WebGL because this is a per-pixel warp. An SVG feDisplacementMap over a
 * 1100px plate costs tens of milliseconds a frame on the CPU; a fragment
 * shader costs well under one on the GPU, which is the difference between a
 * decoration that is free and one that is rude.
 *
 * Everything degrades to the plain <img> underneath: no WebGL, no texture, a
 * lost context, or prefers-reduced-motion all leave the static plate exactly
 * as it was. The canvas only ever paints once it has something better.
 */

/** Ring radius as a fraction of plate height. Matches the render and AgentField. */
const RING_R = 0.465;

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;
varying vec2 v_uv;
uniform sampler2D u_tex;
uniform float u_time;
uniform float u_aspect;
uniform float u_ring;

void main() {
  // Aspect-corrected centre-relative coords, so the polar maths is circular
  // on a 2.4:1 plate rather than elliptical.
  vec2 p = (v_uv - 0.5) * vec2(u_aspect, 1.0);
  float r = length(p);
  float a = atan(p.y, p.x);

  // Full effect through the mass, nothing left by the time we reach the ring.
  float taper = 1.0 - smoothstep(u_ring * 0.52, u_ring * 0.97, r);

  // Harmonics on the star's own symmetry. 6 pumps the arms, 3 and 9 break the
  // symmetry so it never looks like a rotating cog, 12 adds fine chop. All at
  // different rates and directions, so the pattern does not repeat on any
  // period a viewer can catch.
  float w =
      0.058 * sin(6.0 * a + u_time * 0.33)
    + 0.034 * sin(3.0 * a - u_time * 0.21 + 1.7)
    + 0.021 * sin(9.0 * a + u_time * 0.47 + 0.6)
    + 0.014 * sin(12.0 * a - u_time * 0.29 + 2.3)
    + 0.020 * sin(u_time * 0.16);

  // Radius scaling, not offsetting: arms grow and shrink from the centre
  // outward, which is how this shape would actually breathe.
  vec2 uv2 = (p / (1.0 + w * taper)) / vec2(u_aspect, 1.0) + 0.5;
  gl_FragColor = texture2D(u_tex, uv2);
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export function FieldMorph({ src }: { src: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;

    const gl =
      (canvas.getContext("webgl", { alpha: true, antialias: false, premultipliedAlpha: true }) as
        | WebGLRenderingContext
        | null) ?? null;
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = vs && fs ? gl.createProgram() : null;
    if (!vs || !fs || !prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    // One full-screen triangle pair.
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uAspect = gl.getUniformLocation(prog, "u_aspect");
    const uRing = gl.getUniformLocation(prog, "u_ring");

    let raf = 0;
    let running = false;
    let ready = false;
    let start = 0;
    let disposed = false;

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    // The plate is not a power of two, so no mipmaps and clamp at the edges.
    // Clamping is also what keeps the corners sane when the warp samples
    // slightly outside the texture.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      if (disposed) return;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      ready = true;
      // Only now does the canvas have anything better than the <img> beneath.
      canvas.style.opacity = "1";
      resize();
      if (visible) startLoop();
    };
    img.src = src;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uAspect, rect.width / rect.height);
      gl.uniform1f(uRing, RING_R);
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!start) start = now;
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    let visible = false;
    const startLoop = () => {
      if (running || !ready) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stopLoop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && !document.hidden) startLoop();
        else stopLoop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stopLoop();
      else if (visible) startLoop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // A dropped GPU context must not leave a blank canvas over the artwork.
    const onLost = (e: Event) => {
      e.preventDefault();
      stopLoop();
      canvas.style.opacity = "0";
    };
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      disposed = true;
      stopLoop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onLost);
      gl.deleteTexture(tex);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [src]);

  // Starts transparent: the static plate underneath is what shows until the
  // texture is uploaded and there is genuinely something better to draw.
  return <canvas className="plate-morph" ref={canvasRef} aria-hidden="true" style={{ opacity: 0 }} />;
}
