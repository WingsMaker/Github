(window.webpackJsonp = window.webpackJsonp || []).push([
	[0],
	[function(e, t, r) {
		"use strict";
		var o = "undefined" !== typeof Uint8Array && "undefined" !== typeof Uint16Array && "undefined" !== typeof Int32Array;

		function a(e, t) {
			return Object.prototype.hasOwnProperty.call(e, t)
		}
		t.assign = function(e) {
			for(var t = Array.prototype.slice.call(arguments, 1); t.length;) {
				var r = t.shift();
				if(r) {
					if("object" !== typeof r) throw new TypeError(r + "must be non-object");
					for(var o in r) a(r, o) && (e[o] = r[o])
				}
			}
			return e
		}, t.shrinkBuf = function(e, t) {
			return e.length === t ? e : e.subarray ? e.subarray(0, t) : (e.length = t, e)
		};
		var n = {
				arraySet: function(e, t, r, o, a) {
					if(t.subarray && e.subarray) e.set(t.subarray(r, r + o), a);
					else
						for(var n = 0; n < o; n++) e[a + n] = t[r + n]
				},
				flattenChunks: function(e) {
					var t, r, o, a, n, s;
					for(o = 0, t = 0, r = e.length; t < r; t++) o += e[t].length;
					for(s = new Uint8Array(o), a = 0, t = 0, r = e.length; t < r; t++) n = e[t], s.set(n, a), a += n.length;
					return s
				}
			},
			s = {
				arraySet: function(e, t, r, o, a) {
					for(var n = 0; n < o; n++) e[a + n] = t[r + n]
				},
				flattenChunks: function(e) {
					return [].concat.apply([], e)
				}
			};
		t.setTyped = function(e) {
			e ? (t.Buf8 = Uint8Array, t.Buf16 = Uint16Array, t.Buf32 = Int32Array, t.assign(t, n)) : (t.Buf8 = Array, t.Buf16 = Array, t.Buf32 = Array, t.assign(t, s))
		}, t.setTyped(o)
	}, function(e, t, r) {
		"use strict";
		e.exports = {
			2: "need dictionary",
			1: "stream end",
			0: "",
			"-1": "file error",
			"-2": "stream error",
			"-3": "data error",
			"-4": "insufficient memory",
			"-5": "buffer error",
			"-6": "incompatible version"
		}
	}, function(e, t, r) {
		(function(t) {
			! function() {
				var t = {};
				e.exports = t,
					function(e, t) {
						e.toRGBA8 = function(t) {
							var r = t.width,
								o = t.height;
							if(null == t.tabs.acTL) return [e.toRGBA8.decodeImage(t.data, r, o, t).buffer];
							var a = [];
							null == t.frames[0].data && (t.frames[0].data = t.data);
							for(var n, s = new Uint8Array(r * o * 4), i = 0; i < t.frames.length; i++) {
								var l = t.frames[i],
									d = l.rect.x,
									c = l.rect.y,
									u = l.rect.width,
									f = l.rect.height,
									h = e.toRGBA8.decodeImage(l.data, u, f, t);
								if(0 == i ? n = h : 0 == l.blend ? e._copyTile(h, u, f, n, r, o, d, c, 0) : 1 == l.blend && e._copyTile(h, u, f, n, r, o, d, c, 1), a.push(n.buffer), n = n.slice(0), 0 == l.dispose);
								else if(1 == l.dispose) e._copyTile(s, u, f, n, r, o, d, c, 0);
								else if(2 == l.dispose) {
									for(var k = i - 1; 2 == t.frames[k].dispose;) k--;
									n = new Uint8Array(a[k]).slice(0)
								}
							}
							return a
						}, e.toRGBA8.decodeImage = function(t, r, o, a) {
							var n = r * o,
								s = e.decode._getBPP(a),
								i = Math.ceil(r * s / 8),
								l = new Uint8Array(4 * n),
								d = new Uint32Array(l.buffer),
								c = a.ctype,
								u = a.depth,
								f = e._bin.readUshort;
							if(6 == c) {
								var h = n << 2;
								if(8 == u)
									for(var k = 0; k < h; k++) l[k] = t[k];
								if(16 == u)
									for(k = 0; k < h; k++) l[k] = t[k << 1]
							} else if(2 == c) {
								var B = a.tabs.tRNS,
									m = -1,
									w = -1,
									v = -1;
								if(B && (m = B[0], w = B[1], v = B[2]), 8 == u)
									for(k = 0; k < n; k++) {
										var _ = 3 * k;
										l[x = k << 2] = t[_], l[x + 1] = t[_ + 1], l[x + 2] = t[_ + 2], l[x + 3] = 255, -1 != m && t[_] == m && t[_ + 1] == w && t[_ + 2] == v && (l[x + 3] = 0)
									}
								if(16 == u)
									for(k = 0; k < n; k++) {
										_ = 6 * k;
										l[x = k << 2] = t[_], l[x + 1] = t[_ + 2], l[x + 2] = t[_ + 4], l[x + 3] = 255, -1 != m && f(t, _) == m && f(t, _ + 2) == w && f(t, _ + 4) == v && (l[x + 3] = 0)
									}
							} else if(3 == c) {
								var b = a.tabs.PLTE,
									p = a.tabs.tRNS,
									g = p ? p.length : 0;
								if(1 == u)
									for(var C = 0; C < o; C++) {
										var P = C * i,
											y = C * r;
										for(k = 0; k < r; k++) {
											var x = y + k << 2,
												z = 3 * (M = t[P + (k >> 3)] >> 7 - ((7 & k) << 0) & 1);
											l[x] = b[z], l[x + 1] = b[z + 1], l[x + 2] = b[z + 2], l[x + 3] = M < g ? p[M] : 255
										}
									}
								if(2 == u)
									for(C = 0; C < o; C++)
										for(P = C * i, y = C * r, k = 0; k < r; k++) {
											x = y + k << 2, z = 3 * (M = t[P + (k >> 2)] >> 6 - ((3 & k) << 1) & 3);
											l[x] = b[z], l[x + 1] = b[z + 1], l[x + 2] = b[z + 2], l[x + 3] = M < g ? p[M] : 255
										}
								if(4 == u)
									for(C = 0; C < o; C++)
										for(P = C * i, y = C * r, k = 0; k < r; k++) {
											x = y + k << 2, z = 3 * (M = t[P + (k >> 1)] >> 4 - ((1 & k) << 2) & 15);
											l[x] = b[z], l[x + 1] = b[z + 1], l[x + 2] = b[z + 2], l[x + 3] = M < g ? p[M] : 255
										}
								if(8 == u)
									for(k = 0; k < n; k++) {
										var M;
										x = k << 2, z = 3 * (M = t[k]);
										l[x] = b[z], l[x + 1] = b[z + 1], l[x + 2] = b[z + 2], l[x + 3] = M < g ? p[M] : 255
									}
							} else if(4 == c) {
								if(8 == u)
									for(k = 0; k < n; k++) {
										x = k << 2;
										var A = t[L = k << 1];
										l[x] = A, l[x + 1] = A, l[x + 2] = A, l[x + 3] = t[L + 1]
									}
								if(16 == u)
									for(k = 0; k < n; k++) {
										var L;
										x = k << 2, A = t[L = k << 2];
										l[x] = A, l[x + 1] = A, l[x + 2] = A, l[x + 3] = t[L + 2]
									}
							} else if(0 == c) {
								m = a.tabs.tRNS ? a.tabs.tRNS : -1;
								if(1 == u)
									for(k = 0; k < n; k++) {
										var S = (A = 255 * (t[k >> 3] >> 7 - (7 & k) & 1)) == 255 * m ? 0 : 255;
										d[k] = S << 24 | A << 16 | A << 8 | A
									}
								if(2 == u)
									for(k = 0; k < n; k++) {
										S = (A = 85 * (t[k >> 2] >> 6 - ((3 & k) << 1) & 3)) == 85 * m ? 0 : 255;
										d[k] = S << 24 | A << 16 | A << 8 | A
									}
								if(4 == u)
									for(k = 0; k < n; k++) {
										S = (A = 17 * (t[k >> 1] >> 4 - ((1 & k) << 2) & 15)) == 17 * m ? 0 : 255;
										d[k] = S << 24 | A << 16 | A << 8 | A
									}
								if(8 == u)
									for(k = 0; k < n; k++) {
										S = (A = t[k]) == m ? 0 : 255;
										d[k] = S << 24 | A << 16 | A << 8 | A
									}
								if(16 == u)
									for(k = 0; k < n; k++) {
										A = t[k << 1], S = f(t, k << 1) == m ? 0 : 255;
										d[k] = S << 24 | A << 16 | A << 8 | A
									}
							}
							return l
						}, e.decode = function(t) {
							for(var r, o = new Uint8Array(t), a = 8, n = e._bin, s = n.readUshort, i = n.readUint, l = {
									tabs: {},
									frames: []
								}, d = new Uint8Array(o.length), c = 0, u = 0, f = [137, 80, 78, 71, 13, 10, 26, 10], h = 0; h < 8; h++)
								if(o[h] != f[h]) throw "The input is not a PNG file!";
							for(; a < o.length;) {
								var k = n.readUint(o, a);
								a += 4;
								var B = n.readASCII(o, a, 4);
								if(a += 4, "IHDR" == B) e.decode._IHDR(o, a, l);
								else if("IDAT" == B) {
									for(h = 0; h < k; h++) d[c + h] = o[a + h];
									c += k
								} else if("acTL" == B) l.tabs[B] = {
									num_frames: i(o, a),
									num_plays: i(o, a + 4)
								}, r = new Uint8Array(o.length);
								else if("fcTL" == B) {
									if(0 != u)(P = l.frames[l.frames.length - 1]).data = e.decode._decompress(l, r.slice(0, u), P.rect.width, P.rect.height), u = 0;
									var m = {
											x: i(o, a + 12),
											y: i(o, a + 16),
											width: i(o, a + 4),
											height: i(o, a + 8)
										},
										w = s(o, a + 22);
									w = s(o, a + 20) / (0 == w ? 100 : w);
									var v = {
										rect: m,
										delay: Math.round(1e3 * w),
										dispose: o[a + 24],
										blend: o[a + 25]
									};
									l.frames.push(v)
								} else if("fdAT" == B) {
									for(h = 0; h < k - 4; h++) r[u + h] = o[a + h + 4];
									u += k - 4
								} else if("pHYs" == B) l.tabs[B] = [n.readUint(o, a), n.readUint(o, a + 4), o[a + 8]];
								else if("cHRM" == B) {
									l.tabs[B] = [];
									for(h = 0; h < 8; h++) l.tabs[B].push(n.readUint(o, a + 4 * h))
								} else if("tEXt" == B) {
									null == l.tabs[B] && (l.tabs[B] = {});
									var _ = n.nextZero(o, a),
										b = n.readASCII(o, a, _ - a),
										p = n.readASCII(o, _ + 1, a + k - _ - 1);
									l.tabs[B][b] = p
								} else if("iTXt" == B) {
									null == l.tabs[B] && (l.tabs[B] = {});
									_ = 0;
									var g = a;
									_ = n.nextZero(o, g);
									b = n.readASCII(o, g, _ - g), o[g = _ + 1], o[g + 1];
									g += 2, _ = n.nextZero(o, g);
									n.readASCII(o, g, _ - g);
									g = _ + 1, _ = n.nextZero(o, g);
									n.readUTF8(o, g, _ - g);
									g = _ + 1;
									p = n.readUTF8(o, g, k - (g - a));
									l.tabs[B][b] = p
								} else if("PLTE" == B) l.tabs[B] = n.readBytes(o, a, k);
								else if("hIST" == B) {
									var C = l.tabs.PLTE.length / 3;
									l.tabs[B] = [];
									for(h = 0; h < C; h++) l.tabs[B].push(s(o, a + 2 * h))
								} else if("tRNS" == B) 3 == l.ctype ? l.tabs[B] = n.readBytes(o, a, k) : 0 == l.ctype ? l.tabs[B] = s(o, a) : 2 == l.ctype && (l.tabs[B] = [s(o, a), s(o, a + 2), s(o, a + 4)]);
								else if("gAMA" == B) l.tabs[B] = n.readUint(o, a) / 1e5;
								else if("sRGB" == B) l.tabs[B] = o[a];
								else if("bKGD" == B) 0 == l.ctype || 4 == l.ctype ? l.tabs[B] = [s(o, a)] : 2 == l.ctype || 6 == l.ctype ? l.tabs[B] = [s(o, a), s(o, a + 2), s(o, a + 4)] : 3 == l.ctype && (l.tabs[B] = o[a]);
								else if("IEND" == B) {
									var P;
									if(0 != u)(P = l.frames[l.frames.length - 1]).data = e.decode._decompress(l, r.slice(0, u), P.rect.width, P.rect.height), u = 0;
									l.data = e.decode._decompress(l, d, l.width, l.height);
									break
								}
								a += k;
								n.readUint(o, a);
								a += 4
							}
							return delete l.compress, delete l.interlace, delete l.filter, l
						}, e.decode._decompress = function(t, r, o, a) {
							return 0 == t.compress && (r = e.decode._inflate(r)), 0 == t.interlace ? r = e.decode._filterZero(r, t, 0, o, a) : 1 == t.interlace && (r = e.decode._readInterlace(r, t)), r
						}, e.decode._inflate = function(e) {
							return t.inflate(e)
						}, e.decode._readInterlace = function(t, r) {
							for(var o = r.width, a = r.height, n = e.decode._getBPP(r), s = n >> 3, i = Math.ceil(o * n / 8), l = new Uint8Array(a * i), d = 0, c = [0, 0, 4, 0, 2, 0, 1], u = [0, 4, 0, 2, 0, 1, 0], f = [8, 8, 8, 4, 4, 2, 2], h = [8, 8, 4, 4, 2, 2, 1], k = 0; k < 7;) {
								for(var B = f[k], m = h[k], w = 0, v = 0, _ = c[k]; _ < a;) _ += B, v++;
								for(var b = u[k]; b < o;) b += m, w++;
								var p = Math.ceil(w * n / 8);
								e.decode._filterZero(t, r, d, w, v);
								for(var g = 0, C = c[k]; C < a;) {
									for(var P = u[k], y = d + g * p << 3; P < o;) {
										var x;
										if(1 == n) x = (x = t[y >> 3]) >> 7 - (7 & y) & 1, l[C * i + (P >> 3)] |= x << 7 - ((3 & P) << 0);
										if(2 == n) x = (x = t[y >> 3]) >> 6 - (7 & y) & 3, l[C * i + (P >> 2)] |= x << 6 - ((3 & P) << 1);
										if(4 == n) x = (x = t[y >> 3]) >> 4 - (7 & y) & 15, l[C * i + (P >> 1)] |= x << 4 - ((1 & P) << 2);
										if(n >= 8)
											for(var z = C * i + P * s, M = 0; M < s; M++) l[z + M] = t[(y >> 3) + M];
										y += n, P += m
									}
									g++, C += B
								}
								w * v != 0 && (d += v * (1 + p)), k += 1
							}
							return l
						}, e.decode._getBPP = function(e) {
							return [1, null, 3, 1, 2, null, 4][e.ctype] * e.depth
						}, e.decode._filterZero = function(t, r, o, a, n) {
							var s = e.decode._getBPP(r),
								i = Math.ceil(a * s / 8),
								l = e.decode._paeth;
							s = Math.ceil(s / 8);
							for(var d = 0; d < n; d++) {
								var c = o + d * i,
									u = c + d + 1,
									f = t[u - 1];
								if(0 == f)
									for(var h = 0; h < i; h++) t[c + h] = t[u + h];
								else if(1 == f) {
									for(h = 0; h < s; h++) t[c + h] = t[u + h];
									for(h = s; h < i; h++) t[c + h] = t[u + h] + t[c + h - s] & 255
								} else if(0 == d) {
									for(h = 0; h < s; h++) t[c + h] = t[u + h];
									if(2 == f)
										for(h = s; h < i; h++) t[c + h] = 255 & t[u + h];
									if(3 == f)
										for(h = s; h < i; h++) t[c + h] = t[u + h] + (t[c + h - s] >> 1) & 255;
									if(4 == f)
										for(h = s; h < i; h++) t[c + h] = t[u + h] + l(t[c + h - s], 0, 0) & 255
								} else {
									if(2 == f)
										for(h = 0; h < i; h++) t[c + h] = t[u + h] + t[c + h - i] & 255;
									if(3 == f) {
										for(h = 0; h < s; h++) t[c + h] = t[u + h] + (t[c + h - i] >> 1) & 255;
										for(h = s; h < i; h++) t[c + h] = t[u + h] + (t[c + h - i] + t[c + h - s] >> 1) & 255
									}
									if(4 == f) {
										for(h = 0; h < s; h++) t[c + h] = t[u + h] + l(0, t[c + h - i], 0) & 255;
										for(h = s; h < i; h++) t[c + h] = t[u + h] + l(t[c + h - s], t[c + h - i], t[c + h - s - i]) & 255
									}
								}
							}
							return t
						}, e.decode._paeth = function(e, t, r) {
							var o = e + t - r,
								a = Math.abs(o - e),
								n = Math.abs(o - t),
								s = Math.abs(o - r);
							return a <= n && a <= s ? e : n <= s ? t : r
						}, e.decode._IHDR = function(t, r, o) {
							var a = e._bin;
							o.width = a.readUint(t, r), r += 4, o.height = a.readUint(t, r), r += 4, o.depth = t[r], r++, o.ctype = t[r], r++, o.compress = t[r], r++, o.filter = t[r], r++, o.interlace = t[r], r++
						}, e._bin = {
							nextZero: function(e, t) {
								for(; 0 != e[t];) t++;
								return t
							},
							readUshort: function(e, t) {
								return e[t] << 8 | e[t + 1]
							},
							writeUshort: function(e, t, r) {
								e[t] = r >> 8 & 255, e[t + 1] = 255 & r
							},
							readUint: function(e, t) {
								return 16777216 * e[t] + (e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3])
							},
							writeUint: function(e, t, r) {
								e[t] = r >> 24 & 255, e[t + 1] = r >> 16 & 255, e[t + 2] = r >> 8 & 255, e[t + 3] = 255 & r
							},
							readASCII: function(e, t, r) {
								for(var o = "", a = 0; a < r; a++) o += String.fromCharCode(e[t + a]);
								return o
							},
							writeASCII: function(e, t, r) {
								for(var o = 0; o < r.length; o++) e[t + o] = r.charCodeAt(o)
							},
							readBytes: function(e, t, r) {
								for(var o = [], a = 0; a < r; a++) o.push(e[t + a]);
								return o
							},
							pad: function(e) {
								return e.length < 2 ? "0" + e : e
							},
							readUTF8: function(t, r, o) {
								for(var a, n = "", s = 0; s < o; s++) n += "%" + e._bin.pad(t[r + s].toString(16));
								try {
									a = decodeURIComponent(n)
								} catch(i) {
									return e._bin.readASCII(t, r, o)
								}
								return a
							}
						}, e._copyTile = function(e, t, r, o, a, n, s, i, l) {
							for(var d = Math.min(t, a), c = Math.min(r, n), u = 0, f = 0, h = 0; h < c; h++)
								for(var k = 0; k < d; k++)
									if(s >= 0 && i >= 0 ? (u = h * t + k << 2, f = (i + h) * a + s + k << 2) : (u = (-i + h) * t - s + k << 2, f = h * a + k << 2), 0 == l) o[f] = e[u], o[f + 1] = e[u + 1], o[f + 2] = e[u + 2], o[f + 3] = e[u + 3];
									else if(1 == l) {
								var B = e[u + 3] * (1 / 255),
									m = e[u] * B,
									w = e[u + 1] * B,
									v = e[u + 2] * B,
									_ = o[f + 3] * (1 / 255),
									b = o[f] * _,
									p = o[f + 1] * _,
									g = o[f + 2] * _,
									C = 1 - B,
									P = B + _ * C,
									y = 0 == P ? 0 : 1 / P;
								o[f + 3] = 255 * P, o[f + 0] = (m + b * C) * y, o[f + 1] = (w + p * C) * y, o[f + 2] = (v + g * C) * y
							} else if(2 == l) {
								B = e[u + 3], m = e[u], w = e[u + 1], v = e[u + 2], _ = o[f + 3], b = o[f], p = o[f + 1], g = o[f + 2];
								B == _ && m == b && w == p && v == g ? (o[f] = 0, o[f + 1] = 0, o[f + 2] = 0, o[f + 3] = 0) : (o[f] = m, o[f + 1] = w, o[f + 2] = v, o[f + 3] = B)
							} else if(3 == l) {
								B = e[u + 3], m = e[u], w = e[u + 1], v = e[u + 2], _ = o[f + 3], b = o[f], p = o[f + 1], g = o[f + 2];
								if(B == _ && m == b && w == p && v == g) continue;
								if(B < 220 && _ > 20) return !1
							}
							return !0
						}, e.encode = function(t, r, o, a, n, s) {
							null == a && (a = 0), null == s && (s = !1);
							for(var i = new Uint8Array(t[0].byteLength * t.length + 100), l = [137, 80, 78, 71, 13, 10, 26, 10], d = 0; d < 8; d++) i[d] = l[d];
							var c = 8,
								u = e._bin,
								f = e.crc.crc,
								h = u.writeUint,
								k = u.writeUshort,
								B = u.writeASCII,
								m = e.encode.compressPNG(t, r, o, a, s);
							h(i, c, 13), B(i, c += 4, "IHDR"), h(i, c += 4, r), h(i, c += 4, o), i[c += 4] = m.depth, i[++c] = m.ctype, i[++c] = 0, i[++c] = 0, i[++c] = 0, h(i, ++c, f(i, c - 17, 17)), h(i, c += 4, 1), B(i, c += 4, "sRGB"), i[c += 4] = 1, h(i, ++c, f(i, c - 5, 5)), c += 4;
							var w = t.length > 1;
							if(w && (h(i, c, 8), B(i, c += 4, "acTL"), h(i, c += 4, t.length), h(i, c += 4, 0), h(i, c += 4, f(i, c - 12, 12)), c += 4), 3 == m.ctype) {
								h(i, c, 3 * (x = m.plte.length)), B(i, c += 4, "PLTE"), c += 4;
								for(d = 0; d < x; d++) {
									var v = 3 * d,
										_ = m.plte[d],
										b = 255 & _,
										p = _ >> 8 & 255,
										g = _ >> 16 & 255;
									i[c + v + 0] = b, i[c + v + 1] = p, i[c + v + 2] = g
								}
								if(h(i, c += 3 * x, f(i, c - 3 * x - 4, 3 * x + 4)), c += 4, m.gotAlpha) {
									h(i, c, x), B(i, c += 4, "tRNS"), c += 4;
									for(d = 0; d < x; d++) i[c + d] = m.plte[d] >> 24 & 255;
									h(i, c += x, f(i, c - x - 4, x + 4)), c += 4
								}
							}
							for(var C = 0, P = 0; P < m.frames.length; P++) {
								var y = m.frames[P];
								w && (h(i, c, 26), B(i, c += 4, "fcTL"), h(i, c += 4, C++), h(i, c += 4, y.rect.width), h(i, c += 4, y.rect.height), h(i, c += 4, y.rect.x), h(i, c += 4, y.rect.y), k(i, c += 4, n[P]), k(i, c += 2, 1e3), i[c += 2] = y.dispose, i[++c] = y.blend, h(i, ++c, f(i, c - 30, 30)), c += 4);
								var x, z = y.cimg;
								h(i, c, (x = z.length) + (0 == P ? 0 : 4));
								var M = c += 4;
								B(i, c, 0 == P ? "IDAT" : "fdAT"), c += 4, 0 != P && (h(i, c, C++), c += 4);
								for(d = 0; d < x; d++) i[c + d] = z[d];
								h(i, c += x, f(i, M, c - M)), c += 4
							}
							return h(i, c, 0), B(i, c += 4, "IEND"), h(i, c += 4, f(i, c - 4, 4)), c += 4, i.buffer.slice(0, c)
						}, e.encode.compressPNG = function(t, r, o, a, n) {
							for(var s = e.encode.compress(t, r, o, a, !1, n), i = 0; i < t.length; i++) {
								var l = s.frames[i],
									d = (l.rect.width, l.rect.height),
									c = l.bpl,
									u = l.bpp,
									f = new Uint8Array(d * c + d);
								l.cimg = e.encode._filterZero(l.img, d, u, c, f)
							}
							return s
						}, e.encode.compress = function(t, r, o, a, n, s) {
							null == s && (s = !1);
							for(var i = 6, l = 8, d = 4, c = 255, u = 0; u < t.length; u++)
								for(var f = new Uint8Array(t[u]), h = f.length, k = 0; k < h; k += 4) c &= f[k + 3];
							var B = 255 != c,
								m = {},
								w = [];
							if(0 != t.length && (m[0] = 0, w.push(0), 0 != a && a--), 0 != a) {
								var v = e.quantize(t, a, n);
								t = v.bufs;
								for(k = 0; k < v.plte.length; k++) {
									null == m[b = v.plte[k].est.rgba] && (m[b] = w.length, w.push(b))
								}
							} else
								for(u = 0; u < t.length; u++) {
									var _ = new Uint32Array(t[u]);
									for(h = _.length, k = 0; k < h; k++) {
										var b = _[k];
										if((k < r || b != _[k - 1] && b != _[k - r]) && null == m[b] && (m[b] = w.length, w.push(b), w.length >= 300)) break
									}
								}
							var p = !!B && n,
								g = w.length;
							g <= 256 && 0 == s && (l = g <= 2 ? 1 : g <= 4 ? 2 : g <= 16 ? 4 : 8, n && (l = 8), B = !0);
							var C = [];
							for(u = 0; u < t.length; u++) {
								var P = new Uint8Array(t[u]),
									y = new Uint32Array(P.buffer),
									x = 0,
									z = 0,
									M = r,
									A = o,
									L = 0;
								if(0 != u && !p) {
									for(var S = n || 1 == u || 2 == C[C.length - 2].dispose ? 1 : 2, I = 0, N = 1e9, E = 0; E < S; E++) {
										for(var U = new Uint8Array(t[u - 1 - E]), T = new Uint32Array(t[u - 1 - E]), R = r, O = o, Z = -1, D = -1, F = 0; F < o; F++)
											for(var X = 0; X < r; X++) {
												y[k = F * r + X] != T[k] && (X < R && (R = X), X > Z && (Z = X), F < O && (O = F), F > D && (D = F))
											}
										var j = -1 == Z ? 1 : (Z - R + 1) * (D - O + 1);
										j < N && (N = j, I = E, -1 == Z ? (x = z = 0, M = A = 1) : (x = R, z = O, M = Z - R + 1, A = D - O + 1))
									}
									U = new Uint8Array(t[u - 1 - I]);
									1 == I && (C[C.length - 1].dispose = 2);
									var q = new Uint8Array(M * A * 4);
									new Uint32Array(q.buffer);
									e._copyTile(U, r, o, q, M, A, -x, -z, 0), e._copyTile(P, r, o, q, M, A, -x, -z, 3) ? (e._copyTile(P, r, o, q, M, A, -x, -z, 2), L = 1) : (e._copyTile(P, r, o, q, M, A, -x, -z, 0), L = 0), P = q, y = new Uint32Array(P.buffer)
								}
								var H = 4 * M;
								if(g <= 256 && 0 == s) {
									H = Math.ceil(l * M / 8);
									for(q = new Uint8Array(H * A), F = 0; F < A; F++) {
										k = F * H;
										var G = F * M;
										if(8 == l)
											for(X = 0; X < M; X++) q[k + X] = m[y[G + X]];
										else if(4 == l)
											for(X = 0; X < M; X++) q[k + (X >> 1)] |= m[y[G + X]] << 4 - 4 * (1 & X);
										else if(2 == l)
											for(X = 0; X < M; X++) q[k + (X >> 2)] |= m[y[G + X]] << 6 - 2 * (3 & X);
										else if(1 == l)
											for(X = 0; X < M; X++) q[k + (X >> 3)] |= m[y[G + X]] << 7 - 1 * (7 & X)
									}
									P = q, i = 3, d = 1
								} else if(0 == B && 1 == t.length) {
									q = new Uint8Array(M * A * 3);
									var K = M * A;
									for(k = 0; k < K; k++) {
										var Y = 3 * k,
											V = 4 * k;
										q[Y] = P[V], q[Y + 1] = P[V + 1], q[Y + 2] = P[V + 2]
									}
									P = q, i = 2, d = 3, H = 3 * M
								}
								C.push({
									rect: {
										x: x,
										y: z,
										width: M,
										height: A
									},
									img: P,
									bpl: H,
									bpp: d,
									blend: L,
									dispose: p ? 1 : 0
								})
							}
							return {
								ctype: i,
								depth: l,
								plte: w,
								gotAlpha: B,
								frames: C
							}
						}, e.encode._filterZero = function(r, o, a, n, s) {
							for(var i = [], l = 0; l < 5; l++)
								if(!(o * n > 5e5) || 2 != l && 3 != l && 4 != l) {
									for(var d = 0; d < o; d++) e.encode._filterLine(s, r, d, n, a, l);
									if(i.push(t.deflate(s)), 1 == a) break
								}
							for(var c, u = 1e9, f = 0; f < i.length; f++) i[f].length < u && (c = f, u = i[f].length);
							return i[c]
						}, e.encode._filterLine = function(t, r, o, a, n, s) {
							var i = o * a,
								l = i + o,
								d = e.decode._paeth;
							if(t[l] = s, l++, 0 == s)
								for(var c = 0; c < a; c++) t[l + c] = r[i + c];
							else if(1 == s) {
								for(c = 0; c < n; c++) t[l + c] = r[i + c];
								for(c = n; c < a; c++) t[l + c] = r[i + c] - r[i + c - n] + 256 & 255
							} else if(0 == o) {
								for(c = 0; c < n; c++) t[l + c] = r[i + c];
								if(2 == s)
									for(c = n; c < a; c++) t[l + c] = r[i + c];
								if(3 == s)
									for(c = n; c < a; c++) t[l + c] = r[i + c] - (r[i + c - n] >> 1) + 256 & 255;
								if(4 == s)
									for(c = n; c < a; c++) t[l + c] = r[i + c] - d(r[i + c - n], 0, 0) + 256 & 255
							} else {
								if(2 == s)
									for(c = 0; c < a; c++) t[l + c] = r[i + c] + 256 - r[i + c - a] & 255;
								if(3 == s) {
									for(c = 0; c < n; c++) t[l + c] = r[i + c] + 256 - (r[i + c - a] >> 1) & 255;
									for(c = n; c < a; c++) t[l + c] = r[i + c] + 256 - (r[i + c - a] + r[i + c - n] >> 1) & 255
								}
								if(4 == s) {
									for(c = 0; c < n; c++) t[l + c] = r[i + c] + 256 - d(0, r[i + c - a], 0) & 255;
									for(c = n; c < a; c++) t[l + c] = r[i + c] + 256 - d(r[i + c - n], r[i + c - a], r[i + c - n - a]) & 255
								}
							}
						}, e.crc = {
							table: function() {
								for(var e = new Uint32Array(256), t = 0; t < 256; t++) {
									for(var r = t, o = 0; o < 8; o++) 1 & r ? r = 3988292384 ^ r >>> 1 : r >>>= 1;
									e[t] = r
								}
								return e
							}(),
							update: function(t, r, o, a) {
								for(var n = 0; n < a; n++) t = e.crc.table[255 & (t ^ r[o + n])] ^ t >>> 8;
								return t
							},
							crc: function(t, r, o) {
								return 4294967295 ^ e.crc.update(4294967295, t, r, o)
							}
						}, e.quantize = function(t, r, o) {
							for(var a = [], n = 0, s = 0; s < t.length; s++) a.push(e.encode.alphaMul(new Uint8Array(t[s]), o)), n += t[s].byteLength;
							var i = new Uint8Array(n),
								l = new Uint32Array(i.buffer),
								d = 0;
							for(s = 0; s < a.length; s++) {
								for(var c = a[s], u = c.length, f = 0; f < u; f++) i[d + f] = c[f];
								d += u
							}
							var h = {
								i0: 0,
								i1: i.length,
								bst: null,
								est: null,
								tdst: 0,
								left: null,
								right: null
							};
							h.bst = e.quantize.stats(i, h.i0, h.i1), h.est = e.quantize.estats(h.bst);
							for(var k = [h]; k.length < r;) {
								var B = 0,
									m = 0;
								for(s = 0; s < k.length; s++) k[s].est.L > B && (B = k[s].est.L, m = s);
								if(B < .001) break;
								var w = k[m],
									v = e.quantize.splitPixels(i, l, w.i0, w.i1, w.est.e, w.est.eMq255),
									_ = {
										i0: w.i0,
										i1: v,
										bst: null,
										est: null,
										tdst: 0,
										left: null,
										right: null
									};
								_.bst = e.quantize.stats(i, _.i0, _.i1), _.est = e.quantize.estats(_.bst);
								var b = {
									i0: v,
									i1: w.i1,
									bst: null,
									est: null,
									tdst: 0,
									left: null,
									right: null
								};
								b.bst = {
									R: [],
									m: [],
									N: w.bst.N - _.bst.N
								};
								for(s = 0; s < 16; s++) b.bst.R[s] = w.bst.R[s] - _.bst.R[s];
								for(s = 0; s < 4; s++) b.bst.m[s] = w.bst.m[s] - _.bst.m[s];
								b.est = e.quantize.estats(b.bst), w.left = _, w.right = b, k[m] = _, k.push(b)
							}
							k.sort((function(e, t) {
								return t.bst.N - e.bst.N
							}));
							for(var p = 0; p < a.length; p++) {
								var g = e.quantize.planeDst,
									C = new Uint8Array(a[p].buffer),
									P = new Uint32Array(a[p].buffer),
									y = C.length;
								for(s = 0; s < y; s += 4) {
									for(var x = C[s] * (1 / 255), z = C[s + 1] * (1 / 255), M = C[s + 2] * (1 / 255), A = C[s + 3] * (1 / 255), L = h; L.left;) L = g(L.est, x, z, M, A) <= 0 ? L.left : L.right;
									P[s >> 2] = L.est.rgba
								}
								a[p] = P.buffer
							}
							return {
								bufs: a,
								plte: k
							}
						}, e.quantize.getNearest = function(t, r, o, a, n) {
							if(null == t.left) return t.tdst = e.quantize.dist(t.est.q, r, o, a, n), t;
							var s = e.quantize.planeDst(t.est, r, o, a, n),
								i = t.left,
								l = t.right;
							s > 0 && (i = t.right, l = t.left);
							var d = e.quantize.getNearest(i, r, o, a, n);
							if(d.tdst <= s * s) return d;
							var c = e.quantize.getNearest(l, r, o, a, n);
							return c.tdst < d.tdst ? c : d
						}, e.quantize.planeDst = function(e, t, r, o, a) {
							var n = e.e;
							return n[0] * t + n[1] * r + n[2] * o + n[3] * a - e.eMq
						}, e.quantize.dist = function(e, t, r, o, a) {
							var n = t - e[0],
								s = r - e[1],
								i = o - e[2],
								l = a - e[3];
							return n * n + s * s + i * i + l * l
						}, e.quantize.splitPixels = function(t, r, o, a, n, s) {
							var i = e.quantize.vecDot;
							a -= 4;
							for(; o < a;) {
								for(; i(t, o, n) <= s;) o += 4;
								for(; i(t, a, n) > s;) a -= 4;
								if(o >= a) break;
								var l = r[o >> 2];
								r[o >> 2] = r[a >> 2], r[a >> 2] = l, o += 4, a -= 4
							}
							for(; i(t, o, n) > s;) o -= 4;
							return o + 4
						}, e.quantize.vecDot = function(e, t, r) {
							return e[t] * r[0] + e[t + 1] * r[1] + e[t + 2] * r[2] + e[t + 3] * r[3]
						}, e.quantize.stats = function(e, t, r) {
							for(var o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], a = [0, 0, 0, 0], n = r - t >> 2, s = t; s < r; s += 4) {
								var i = e[s] * (1 / 255),
									l = e[s + 1] * (1 / 255),
									d = e[s + 2] * (1 / 255),
									c = e[s + 3] * (1 / 255);
								a[0] += i, a[1] += l, a[2] += d, a[3] += c, o[0] += i * i, o[1] += i * l, o[2] += i * d, o[3] += i * c, o[5] += l * l, o[6] += l * d, o[7] += l * c, o[10] += d * d, o[11] += d * c, o[15] += c * c
							}
							return o[4] = o[1], o[8] = o[2], o[12] = o[3], o[9] = o[6], o[13] = o[7], o[14] = o[11], {
								R: o,
								m: a,
								N: n
							}
						}, e.quantize.estats = function(t) {
							var r = t.R,
								o = t.m,
								a = t.N,
								n = o[0],
								s = o[1],
								i = o[2],
								l = o[3],
								d = 0 == a ? 0 : 1 / a,
								c = [r[0] - n * n * d, r[1] - n * s * d, r[2] - n * i * d, r[3] - n * l * d, r[4] - s * n * d, r[5] - s * s * d, r[6] - s * i * d, r[7] - s * l * d, r[8] - i * n * d, r[9] - i * s * d, r[10] - i * i * d, r[11] - i * l * d, r[12] - l * n * d, r[13] - l * s * d, r[14] - l * i * d, r[15] - l * l * d],
								u = c,
								f = e.M4,
								h = [.5, .5, .5, .5],
								k = 0,
								B = 0;
							if(0 != a)
								for(var m = 0; m < 10 && (h = f.multVec(u, h), B = Math.sqrt(f.dot(h, h)), h = f.sml(1 / B, h), !(Math.abs(B - k) < 1e-9)); m++) k = B;
							var w = [n * d, s * d, i * d, l * d],
								v = f.dot(f.sml(255, w), h),
								_ = w[3] < .001 ? 0 : 1 / w[3];
							return {
								Cov: c,
								q: w,
								e: h,
								L: k,
								eMq255: v,
								eMq: f.dot(h, w),
								rgba: (Math.round(255 * w[3]) << 24 | Math.round(255 * w[2] * _) << 16 | Math.round(255 * w[1] * _) << 8 | Math.round(255 * w[0] * _) << 0) >>> 0
							}
						}, e.M4 = {
							multVec: function(e, t) {
								return [e[0] * t[0] + e[1] * t[1] + e[2] * t[2] + e[3] * t[3], e[4] * t[0] + e[5] * t[1] + e[6] * t[2] + e[7] * t[3], e[8] * t[0] + e[9] * t[1] + e[10] * t[2] + e[11] * t[3], e[12] * t[0] + e[13] * t[1] + e[14] * t[2] + e[15] * t[3]]
							},
							dot: function(e, t) {
								return e[0] * t[0] + e[1] * t[1] + e[2] * t[2] + e[3] * t[3]
							},
							sml: function(e, t) {
								return [e * t[0], e * t[1], e * t[2], e * t[3]]
							}
						}, e.encode.alphaMul = function(e, t) {
							for(var r = new Uint8Array(e.length), o = e.length >> 2, a = 0; a < o; a++) {
								var n = a << 2,
									s = e[n + 3];
								t && (s = s < 128 ? 0 : 255);
								var i = s * (1 / 255);
								r[n + 0] = e[n + 0] * i, r[n + 1] = e[n + 1] * i, r[n + 2] = e[n + 2] * i, r[n + 3] = s
							}
							return r
						}
					}(t, r(11))
			}()
		}).call(this, r(10))
	}, function(e, t, r) {
		"use strict";
		e.exports = function(e, t, r, o) {
			for(var a = 65535 & e | 0, n = e >>> 16 & 65535 | 0, s = 0; 0 !== r;) {
				r -= s = r > 2e3 ? 2e3 : r;
				do {
					n = n + (a = a + t[o++] | 0) | 0
				} while (--s);
				a %= 65521, n %= 65521
			}
			return a | n << 16 | 0
		}
	}, function(e, t, r) {
		"use strict";
		var o = function() {
			for(var e, t = [], r = 0; r < 256; r++) {
				e = r;
				for(var o = 0; o < 8; o++) e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
				t[r] = e
			}
			return t
		}();
		e.exports = function(e, t, r, a) {
			var n = o,
				s = a + r;
			e ^= -1;
			for(var i = a; i < s; i++) e = e >>> 8 ^ n[255 & (e ^ t[i])];
			return -1 ^ e
		}
	}, function(e, t, r) {
		"use strict";
		var o = r(0),
			a = !0,
			n = !0;
		try {
			String.fromCharCode.apply(null, [0])
		} catch(d) {
			a = !1
		}
		try {
			String.fromCharCode.apply(null, new Uint8Array(1))
		} catch(d) {
			n = !1
		}
		for(var s = new o.Buf8(256), i = 0; i < 256; i++) s[i] = i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1;

		function l(e, t) {
			if(t < 65534 && (e.subarray && n || !e.subarray && a)) return String.fromCharCode.apply(null, o.shrinkBuf(e, t));
			for(var r = "", s = 0; s < t; s++) r += String.fromCharCode(e[s]);
			return r
		}
		s[254] = s[254] = 1, t.string2buf = function(e) {
			var t, r, a, n, s, i = e.length,
				l = 0;
			for(n = 0; n < i; n++) 55296 === (64512 & (r = e.charCodeAt(n))) && n + 1 < i && 56320 === (64512 & (a = e.charCodeAt(n + 1))) && (r = 65536 + (r - 55296 << 10) + (a - 56320), n++), l += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4;
			for(t = new o.Buf8(l), s = 0, n = 0; s < l; n++) 55296 === (64512 & (r = e.charCodeAt(n))) && n + 1 < i && 56320 === (64512 & (a = e.charCodeAt(n + 1))) && (r = 65536 + (r - 55296 << 10) + (a - 56320), n++), r < 128 ? t[s++] = r : r < 2048 ? (t[s++] = 192 | r >>> 6, t[s++] = 128 | 63 & r) : r < 65536 ? (t[s++] = 224 | r >>> 12, t[s++] = 128 | r >>> 6 & 63, t[s++] = 128 | 63 & r) : (t[s++] = 240 | r >>> 18, t[s++] = 128 | r >>> 12 & 63, t[s++] = 128 | r >>> 6 & 63, t[s++] = 128 | 63 & r);
			return t
		}, t.buf2binstring = function(e) {
			return l(e, e.length)
		}, t.binstring2buf = function(e) {
			for(var t = new o.Buf8(e.length), r = 0, a = t.length; r < a; r++) t[r] = e.charCodeAt(r);
			return t
		}, t.buf2string = function(e, t) {
			var r, o, a, n, i = t || e.length,
				d = new Array(2 * i);
			for(o = 0, r = 0; r < i;)
				if((a = e[r++]) < 128) d[o++] = a;
				else if((n = s[a]) > 4) d[o++] = 65533, r += n - 1;
			else {
				for(a &= 2 === n ? 31 : 3 === n ? 15 : 7; n > 1 && r < i;) a = a << 6 | 63 & e[r++], n--;
				n > 1 ? d[o++] = 65533 : a < 65536 ? d[o++] = a : (a -= 65536, d[o++] = 55296 | a >> 10 & 1023, d[o++] = 56320 | 1023 & a)
			}
			return l(d, o)
		}, t.utf8border = function(e, t) {
			var r;
			for((t = t || e.length) > e.length && (t = e.length), r = t - 1; r >= 0 && 128 === (192 & e[r]);) r--;
			return r < 0 || 0 === r ? t : r + s[e[r]] > t ? r : t
		}
	}, function(e, t, r) {
		"use strict";
		e.exports = function() {
			this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0
		}
	}, function(e, t, r) {
		"use strict";
		e.exports = {
			Z_NO_FLUSH: 0,
			Z_PARTIAL_FLUSH: 1,
			Z_SYNC_FLUSH: 2,
			Z_FULL_FLUSH: 3,
			Z_FINISH: 4,
			Z_BLOCK: 5,
			Z_TREES: 6,
			Z_OK: 0,
			Z_STREAM_END: 1,
			Z_NEED_DICT: 2,
			Z_ERRNO: -1,
			Z_STREAM_ERROR: -2,
			Z_DATA_ERROR: -3,
			Z_BUF_ERROR: -5,
			Z_NO_COMPRESSION: 0,
			Z_BEST_SPEED: 1,
			Z_BEST_COMPRESSION: 9,
			Z_DEFAULT_COMPRESSION: -1,
			Z_FILTERED: 1,
			Z_HUFFMAN_ONLY: 2,
			Z_RLE: 3,
			Z_FIXED: 4,
			Z_DEFAULT_STRATEGY: 0,
			Z_BINARY: 0,
			Z_TEXT: 1,
			Z_UNKNOWN: 2,
			Z_DEFLATED: 8
		}
	}, function(e, t, r) {
		var o;
		"undefined" !== typeof self && self, o = function() {
			return function(e) {
				var t = {};

				function r(o) {
					if(t[o]) return t[o].exports;
					var a = t[o] = {
						i: o,
						l: !1,
						exports: {}
					};
					return e[o].call(a.exports, a, a.exports, r), a.l = !0, a.exports
				}
				return r.m = e, r.c = t, r.d = function(e, t, o) {
					r.o(e, t) || Object.defineProperty(e, t, {
						configurable: !1,
						enumerable: !0,
						get: o
					})
				}, r.n = function(e) {
					var t = e && e.__esModule ? function() {
						return e.default
					} : function() {
						return e
					};
					return r.d(t, "a", t), t
				}, r.o = function(e, t) {
					return Object.prototype.hasOwnProperty.call(e, t)
				}, r.p = "", r(r.s = 3)
			}([function(e, t, r) {
				"use strict";
				Object.defineProperty(t, "__esModule", {
					value: !0
				});
				var o = function() {
					function e(e, t) {
						this.width = t, this.height = e.length / t, this.data = e
					}
					return e.createEmpty = function(t, r) {
						return new e(new Uint8ClampedArray(t * r), t)
					}, e.prototype.get = function(e, t) {
						return !(e < 0 || e >= this.width || t < 0 || t >= this.height) && !!this.data[t * this.width + e]
					}, e.prototype.set = function(e, t, r) {
						this.data[t * this.width + e] = r ? 1 : 0
					}, e.prototype.setRegion = function(e, t, r, o, a) {
						for(var n = t; n < t + o; n++)
							for(var s = e; s < e + r; s++) this.set(s, n, !!a)
					}, e
				}();
				t.BitMatrix = o
			}, function(e, t, r) {
				"use strict";
				Object.defineProperty(t, "__esModule", {
					value: !0
				});
				var o = r(2);
				t.addOrSubtractGF = function(e, t) {
					return e ^ t
				};
				var a = function() {
					function e(e, t, r) {
						this.primitive = e, this.size = t, this.generatorBase = r, this.expTable = new Array(this.size), this.logTable = new Array(this.size);
						for(var a = 1, n = 0; n < this.size; n++) this.expTable[n] = a, (a *= 2) >= this.size && (a = (a ^ this.primitive) & this.size - 1);
						for(n = 0; n < this.size - 1; n++) this.logTable[this.expTable[n]] = n;
						this.zero = new o.default(this, Uint8ClampedArray.from([0])), this.one = new o.default(this, Uint8ClampedArray.from([1]))
					}
					return e.prototype.multiply = function(e, t) {
						return 0 === e || 0 === t ? 0 : this.expTable[(this.logTable[e] + this.logTable[t]) % (this.size - 1)]
					}, e.prototype.inverse = function(e) {
						if(0 === e) throw new Error("Can't invert 0");
						return this.expTable[this.size - this.logTable[e] - 1]
					}, e.prototype.buildMonomial = function(e, t) {
						if(e < 0) throw new Error("Invalid monomial degree less than 0");
						if(0 === t) return this.zero;
						var r = new Uint8ClampedArray(e + 1);
						return r[0] = t, new o.default(this, r)
					}, e.prototype.log = function(e) {
						if(0 === e) throw new Error("Can't take log(0)");
						return this.logTable[e]
					}, e.prototype.exp = function(e) {
						return this.expTable[e]
					}, e
				}();
				t.default = a
			}, function(e, t, r) {
				"use strict";
				Object.defineProperty(t, "__esModule", {
					value: !0
				});
				var o = r(1),
					a = function() {
						function e(e, t) {
							if(0 === t.length) throw new Error("No coefficients.");
							this.field = e;
							var r = t.length;
							if(r > 1 && 0 === t[0]) {
								for(var o = 1; o < r && 0 === t[o];) o++;
								if(o === r) this.coefficients = e.zero.coefficients;
								else {
									this.coefficients = new Uint8ClampedArray(r - o);
									for(var a = 0; a < this.coefficients.length; a++) this.coefficients[a] = t[o + a]
								}
							} else this.coefficients = t
						}
						return e.prototype.degree = function() {
							return this.coefficients.length - 1
						}, e.prototype.isZero = function() {
							return 0 === this.coefficients[0]
						}, e.prototype.getCoefficient = function(e) {
							return this.coefficients[this.coefficients.length - 1 - e]
						}, e.prototype.addOrSubtract = function(t) {
							var r;
							if(this.isZero()) return t;
							if(t.isZero()) return this;
							var a = this.coefficients,
								n = t.coefficients;
							a.length > n.length && (a = (r = [n, a])[0], n = r[1]);
							for(var s = new Uint8ClampedArray(n.length), i = n.length - a.length, l = 0; l < i; l++) s[l] = n[l];
							for(l = i; l < n.length; l++) s[l] = o.addOrSubtractGF(a[l - i], n[l]);
							return new e(this.field, s)
						}, e.prototype.multiply = function(t) {
							if(0 === t) return this.field.zero;
							if(1 === t) return this;
							for(var r = this.coefficients.length, o = new Uint8ClampedArray(r), a = 0; a < r; a++) o[a] = this.field.multiply(this.coefficients[a], t);
							return new e(this.field, o)
						}, e.prototype.multiplyPoly = function(t) {
							if(this.isZero() || t.isZero()) return this.field.zero;
							for(var r = this.coefficients, a = r.length, n = t.coefficients, s = n.length, i = new Uint8ClampedArray(a + s - 1), l = 0; l < a; l++)
								for(var d = r[l], c = 0; c < s; c++) i[l + c] = o.addOrSubtractGF(i[l + c], this.field.multiply(d, n[c]));
							return new e(this.field, i)
						}, e.prototype.multiplyByMonomial = function(t, r) {
							if(t < 0) throw new Error("Invalid degree less than 0");
							if(0 === r) return this.field.zero;
							for(var o = this.coefficients.length, a = new Uint8ClampedArray(o + t), n = 0; n < o; n++) a[n] = this.field.multiply(this.coefficients[n], r);
							return new e(this.field, a)
						}, e.prototype.evaluateAt = function(e) {
							var t = 0;
							if(0 === e) return this.getCoefficient(0);
							var r = this.coefficients.length;
							if(1 === e) return this.coefficients.forEach((function(e) {
								t = o.addOrSubtractGF(t, e)
							})), t;
							t = this.coefficients[0];
							for(var a = 1; a < r; a++) t = o.addOrSubtractGF(this.field.multiply(e, t), this.coefficients[a]);
							return t
						}, e
					}();
				t.default = a
			}, function(e, t, r) {
				"use strict";
				Object.defineProperty(t, "__esModule", {
					value: !0
				});
				var o = r(4),
					a = r(5),
					n = r(11),
					s = r(12);

				function i(e) {
					var t = s.locate(e);
					if(!t) return null;
					for(var r = 0, o = t; r < o.length; r++) {
						var i = o[r],
							l = n.extract(e, i),
							d = a.decode(l.matrix);
						if(d) return {
							binaryData: d.bytes,
							data: d.text,
							chunks: d.chunks,
							version: d.version,
							location: {
								topRightCorner: l.mappingFunction(i.dimension, 0),
								topLeftCorner: l.mappingFunction(0, 0),
								bottomRightCorner: l.mappingFunction(i.dimension, i.dimension),
								bottomLeftCorner: l.mappingFunction(0, i.dimension),
								topRightFinderPattern: i.topRight,
								topLeftFinderPattern: i.topLeft,
								bottomLeftFinderPattern: i.bottomLeft,
								bottomRightAlignmentPattern: i.alignmentPattern
							}
						}
					}
					return null
				}
				var l = {
					inversionAttempts: "attemptBoth"
				};

				function d(e, t, r, a) {
					void 0 === a && (a = {});
					var n = l;
					Object.keys(n || {}).forEach((function(e) {
						n[e] = a[e] || n[e]
					}));
					var s = "attemptBoth" === n.inversionAttempts || "invertFirst" === n.inversionAttempts,
						d = "onlyInvert" === n.inversionAttempts || "invertFirst" === n.inversionAttempts,
						c = o.binarize(e, t, r, s),
						u = c.binarized,
						f = c.inverted,
						h = i(d ? f : u);
					return h || "attemptBoth" !== n.inversionAttempts && "invertFirst" !== n.inversionAttempts || (h = i(d ? u : f)), h
				}
				d.default = d, t.default = d
			}, function(e, t, r) {
				"use strict";
				Object.defineProperty(t, "__esModule", {
					value: !0
				});
				var o = r(0);

				function a(e, t, r) {
					return e < t ? t : e > r ? r : e
				}
				var n = function() {
					function e(e, t) {
						this.width = e, this.data = new Uint8ClampedArray(e * t)
					}
					return e.prototype.get = function(e, t) {
						return this.data[t * this.width + e]
					}, e.prototype.set = function(e, t, r) {
						this.data[t * this.width + e] = r
					}, e
				}();
				t.binarize = function(e, t, r, s) {
					if(e.length !== t * r * 4) throw new Error("Malformed data passed to binarizer.");
					for(var i = new n(t, r), l = 0; l < t; l++)
						for(var d = 0; d < r; d++) {
							var c = e[4 * (d * t + l) + 0],
								u = e[4 * (d * t + l) + 1],
								f = e[4 * (d * t + l) + 2];
							i.set(l, d, .2126 * c + .7152 * u + .0722 * f)
						}
					for(var h = Math.ceil(t / 8), k = Math.ceil(r / 8), B = new n(h, k), m = 0; m < k; m++)
						for(var w = 0; w < h; w++) {
							var v = 0,
								_ = 1 / 0,
								b = 0;
							for(d = 0; d < 8; d++)
								for(l = 0; l < 8; l++) {
									var p = i.get(8 * w + l, 8 * m + d);
									v += p, _ = Math.min(_, p), b = Math.max(b, p)
								}
							var g = v / Math.pow(8, 2);
							if(b - _ <= 24 && (g = _ / 2, m > 0 && w > 0)) {
								var C = (B.get(w, m - 1) + 2 * B.get(w - 1, m) + B.get(w - 1, m - 1)) / 4;
								_ < C && (g = C)
							}
							B.set(w, m, g)
						}
					var P = o.BitMatrix.createEmpty(t, r),
						y = null;
					for(s && (y = o.BitMatrix.createEmpty(t, r)), m = 0; m < k; m++)
						for(w = 0; w < h; w++) {
							for(var x = a(w, 2, h - 3), z = a(m, 2, k - 3), M = (v = 0, -2); M <= 2; M++)
								for(var A = -2; A <= 2; A++) v += B.get(x + M, z + A);
							var L = v / 25;
							for(M = 0; M < 8; M++)
								for(A = 0; A < 8; A++) {
									l = 8 * w + M, d = 8 * m + A;
									var S = i.get(l, d);
									P.set(l, d, S <= L), s && y.set(l, d, !(S <= L))
								}
						}
					return s ? {
						binarized: P,
						inverted: y
					} : {
						binarized: P
					}
				}
			}, function(e, t, r) {
				"use strict";
				Object.defineProperty(t, "__esModule", {
					value: !0
				});
				var o = r(0),
					a = r(6),
					n = r(9),
					s = r(10);

				function i(e, t) {
					for(var r = e ^ t, o = 0; r;) o++, r &= r - 1;
					return o
				}

				function l(e, t) {
					return t << 1 | e
				}
				var d = [{
						bits: 21522,
						formatInfo: {
							errorCorrectionLevel: 1,
							dataMask: 0
						}
					}, {
						bits: 20773,
						formatInfo: {
							errorCorrectionLevel: 1,
							dataMask: 1
						}
					}, {
						bits: 24188,
						formatInfo: {
							errorCorrectionLevel: 1,
							dataMask: 2
						}
					}, {
						bits: 23371,
						formatInfo: {
							errorCorrectionLevel: 1,
							dataMask: 3
						}
					}, {
						bits: 17913,
						formatInfo: {
							errorCorrectionLevel: 1,
							dataMask: 4
						}
					}, {
						bits: 16590,
						formatInfo: {
							errorCorrectionLevel: 1,
							dataMask: 5
						}
					}, {
						bits: 20375,
						formatInfo: {
							errorCorrectionLevel: 1,
							dataMask: 6
						}
					}, {
						bits: 19104,
						formatInfo: {
							errorCorrectionLevel: 1,
							dataMask: 7
						}
					}, {
						bits: 30660,
						formatInfo: {
							errorCorrectionLevel: 0,
							dataMask: 0
						}
					}, {
						bits: 29427,
						formatInfo: {
							errorCorrectionLevel: 0,
							dataMask: 1
						}
					}, {
						bits: 32170,
						formatInfo: {
							errorCorrectionLevel: 0,
							dataMask: 2
						}
					}, {
						bits: 30877,
						formatInfo: {
							errorCorrectionLevel: 0,
							dataMask: 3
						}
					}, {
						bits: 26159,
						formatInfo: {
							errorCorrectionLevel: 0,
							dataMask: 4
						}
					}, {
						bits: 25368,
						formatInfo: {
							errorCorrectionLevel: 0,
							dataMask: 5
						}
					}, {
						bits: 27713,
						formatInfo: {
							errorCorrectionLevel: 0,
							dataMask: 6
						}
					}, {
						bits: 26998,
						formatInfo: {
							errorCorrectionLevel: 0,
							dataMask: 7
						}
					}, {
						bits: 5769,
						formatInfo: {
							errorCorrectionLevel: 3,
							dataMask: 0
						}
					}, {
						bits: 5054,
						formatInfo: {
							errorCorrectionLevel: 3,
							dataMask: 1
						}
					}, {
						bits: 7399,
						formatInfo: {
							errorCorrectionLevel: 3,
							dataMask: 2
						}
					}, {
						bits: 6608,
						formatInfo: {
							errorCorrectionLevel: 3,
							dataMask: 3
						}
					}, {
						bits: 1890,
						formatInfo: {
							errorCorrectionLevel: 3,
							dataMask: 4
						}
					}, {
						bits: 597,
						formatInfo: {
							errorCorrectionLevel: 3,
							dataMask: 5
						}
					}, {
						bits: 3340,
						formatInfo: {
							errorCorrectionLevel: 3,
							dataMask: 6
						}
					}, {
						bits: 2107,
						formatInfo: {
							errorCorrectionLevel: 3,
							dataMask: 7
						}
					}, {
						bits: 13663,
						formatInfo: {
							errorCorrectionLevel: 2,
							dataMask: 0
						}
					}, {
						bits: 12392,
						formatInfo: {
							errorCorrectionLevel: 2,
							dataMask: 1
						}
					}, {
						bits: 16177,
						formatInfo: {
							errorCorrectionLevel: 2,
							dataMask: 2
						}
					}, {
						bits: 14854,
						formatInfo: {
							errorCorrectionLevel: 2,
							dataMask: 3
						}
					}, {
						bits: 9396,
						formatInfo: {
							errorCorrectionLevel: 2,
							dataMask: 4
						}
					}, {
						bits: 8579,
						formatInfo: {
							errorCorrectionLevel: 2,
							dataMask: 5
						}
					}, {
						bits: 11994,
						formatInfo: {
							errorCorrectionLevel: 2,
							dataMask: 6
						}
					}, {
						bits: 11245,
						formatInfo: {
							errorCorrectionLevel: 2,
							dataMask: 7
						}
					}],
					c = [function(e) {
						return(e.y + e.x) % 2 === 0
					}, function(e) {
						return e.y % 2 === 0
					}, function(e) {
						return e.x % 3 === 0
					}, function(e) {
						return(e.y + e.x) % 3 === 0
					}, function(e) {
						return(Math.floor(e.y / 2) + Math.floor(e.x / 3)) % 2 === 0
					}, function(e) {
						return e.x * e.y % 2 + e.x * e.y % 3 === 0
					}, function(e) {
						return(e.y * e.x % 2 + e.y * e.x % 3) % 2 === 0
					}, function(e) {
						return((e.y + e.x) % 2 + e.y * e.x % 3) % 2 === 0
					}];

				function u(e, t, r) {
					for(var a = c[r.dataMask], n = e.height, s = function(e) {
							var t = 17 + 4 * e.versionNumber,
								r = o.BitMatrix.createEmpty(t, t);
							r.setRegion(0, 0, 9, 9, !0), r.setRegion(t - 8, 0, 8, 9, !0), r.setRegion(0, t - 8, 9, 8, !0);
							for(var a = 0, n = e.alignmentPatternCenters; a < n.length; a++)
								for(var s = n[a], i = 0, l = e.alignmentPatternCenters; i < l.length; i++) {
									var d = l[i];
									6 === s && 6 === d || 6 === s && d === t - 7 || s === t - 7 && 6 === d || r.setRegion(s - 2, d - 2, 5, 5, !0)
								}
							return r.setRegion(6, 9, 1, t - 17, !0), r.setRegion(9, 6, t - 17, 1, !0), e.versionNumber > 6 && (r.setRegion(t - 11, 0, 3, 6, !0), r.setRegion(0, t - 11, 6, 3, !0)), r
						}(t), i = [], d = 0, u = 0, f = !0, h = n - 1; h > 0; h -= 2) {
						6 === h && h--;
						for(var k = 0; k < n; k++)
							for(var B = f ? n - 1 - k : k, m = 0; m < 2; m++) {
								var w = h - m;
								if(!s.get(w, B)) {
									u++;
									var v = e.get(w, B);
									a({
										y: B,
										x: w
									}) && (v = !v), d = l(v, d), 8 === u && (i.push(d), u = 0, d = 0)
								}
							}
						f = !f
					}
					return i
				}

				function f(e) {
					var t = function(e) {
						var t = e.height,
							r = Math.floor((t - 17) / 4);
						if(r <= 6) return s.VERSIONS[r - 1];
						for(var o = 0, a = 5; a >= 0; a--)
							for(var n = t - 9; n >= t - 11; n--) o = l(e.get(n, a), o);
						var d = 0;
						for(n = 5; n >= 0; n--)
							for(a = t - 9; a >= t - 11; a--) d = l(e.get(n, a), d);
						for(var c, u = 1 / 0, f = 0, h = s.VERSIONS; f < h.length; f++) {
							var k = h[f];
							if(k.infoBits === o || k.infoBits === d) return k;
							var B = i(o, k.infoBits);
							B < u && (c = k, u = B), (B = i(d, k.infoBits)) < u && (c = k, u = B)
						}
						return u <= 3 ? c : void 0
					}(e);
					if(!t) return null;
					var r = function(e) {
						for(var t = 0, r = 0; r <= 8; r++) 6 !== r && (t = l(e.get(r, 8), t));
						for(var o = 7; o >= 0; o--) 6 !== o && (t = l(e.get(8, o), t));
						var a = e.height,
							n = 0;
						for(o = a - 1; o >= a - 7; o--) n = l(e.get(8, o), n);
						for(r = a - 8; r < a; r++) n = l(e.get(r, 8), n);
						for(var s = 1 / 0, c = null, u = 0, f = d; u < f.length; u++) {
							var h = f[u],
								k = h.bits,
								B = h.formatInfo;
							if(k === t || k === n) return B;
							var m = i(t, k);
							m < s && (c = B, s = m), t !== n && (m = i(n, k)) < s && (c = B, s = m)
						}
						return s <= 3 ? c : null
					}(e);
					if(!r) return null;
					var o = function(e, t, r) {
						var o = t.errorCorrectionLevels[r],
							a = [],
							n = 0;
						if(o.ecBlocks.forEach((function(e) {
								for(var t = 0; t < e.numBlocks; t++) a.push({
									numDataCodewords: e.dataCodewordsPerBlock,
									codewords: []
								}), n += e.dataCodewordsPerBlock + o.ecCodewordsPerBlock
							})), e.length < n) return null;
						e = e.slice(0, n);
						for(var s = o.ecBlocks[0].dataCodewordsPerBlock, i = 0; i < s; i++)
							for(var l = 0, d = a; l < d.length; l++) d[l].codewords.push(e.shift());
						if(o.ecBlocks.length > 1) {
							var c = o.ecBlocks[0].numBlocks,
								u = o.ecBlocks[1].numBlocks;
							for(i = 0; i < u; i++) a[c + i].codewords.push(e.shift())
						}
						for(; e.length > 0;)
							for(var f = 0, h = a; f < h.length; f++) h[f].codewords.push(e.shift());
						return a
					}(u(e, t, r), t, r.errorCorrectionLevel);
					if(!o) return null;
					for(var c = o.reduce((function(e, t) {
							return e + t.numDataCodewords
						}), 0), f = new Uint8ClampedArray(c), h = 0, k = 0, B = o; k < B.length; k++) {
						var m = B[k],
							w = n.decode(m.codewords, m.codewords.length - m.numDataCodewords);
						if(!w) return null;
						for(var v = 0; v < m.numDataCodewords; v++) f[h++] = w[v]
					}
					try {
						return a.decode(f, t.versionNumber)
					} catch(_) {
						return null
					}
				}
				t.decode = function(e) {
					if(null == e) return null;
					var t = f(e);
					if(t) return t;
					for(var r = 0; r < e.width; r++)
						for(var o = r + 1; o < e.height; o++) e.get(r, o) !== e.get(o, r) && (e.set(r, o, !e.get(r, o)), e.set(o, r, !e.get(o, r)));
					return f(e)
				}
			}, function(e, t, r) {
				"use strict";
				Object.defineProperty(t, "__esModule", {
					value: !0
				});
				var o, a, n = r(7),
					s = r(8);

				function i(e, t) {
						for(var r = [], o = "", a = [10, 12, 14][t], n = e.readBits(a); n >= 3;) {
							if((d = e.readBits(10)) >= 1e3) throw new Error("Invalid numeric value above 999");
							var s = Math.floor(d / 100),
								i = Math.floor(d / 10) % 10,
								l = d % 10;
							r.push(48 + s, 48 + i, 48 + l), o += s.toString() + i.toString() + l.toString(), n -= 3
						}
						if(2 === n) {
							if((d = e.readBits(7)) >= 100) throw new Error("Invalid numeric value above 99");
							s = Math.floor(d / 10), i = d % 10, r.push(48 + s, 48 + i), o += s.toString() + i.toString()
						} else if(1 === n) {
							var d;
							if((d = e.readBits(4)) >= 10) throw new Error("Invalid numeric value above 9");
							r.push(48 + d), o += d.toString()
						}
						return {
							bytes: r,
							text: o
						}
					}! function(e) {
						e.Numeric = "numeric", e.Alphanumeric = "alphanumeric", e.Byte = "byte", e.Kanji = "kanji", e.ECI = "eci"
					}(o = t.Mode || (t.Mode = {})),
					function(e) {
						e[e.Terminator = 0] = "Terminator", e[e.Numeric = 1] = "Numeric", e[e.Alphanumeric = 2] = "Alphanumeric", e[e.Byte = 4] = "Byte", e[e.Kanji = 8] = "Kanji", e[e.ECI = 7] = "ECI"
					}(a || (a = {}));
				var l = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ", "$", "%", "*", "+", "-", ".", "/", ":"];

				function d(e, t) {
					for(var r = [], o = "", a = [9, 11, 13][t], n = e.readBits(a); n >= 2;) {
						var s = e.readBits(11),
							i = Math.floor(s / 45),
							d = s % 45;
						r.push(l[i].charCodeAt(0), l[d].charCodeAt(0)), o += l[i] + l[d], n -= 2
					}
					return 1 === n && (i = e.readBits(6), r.push(l[i].charCodeAt(0)), o += l[i]), {
						bytes: r,
						text: o
					}
				}

				function c(e, t) {
					for(var r = [], o = "", a = [8, 16, 16][t], n = e.readBits(a), s = 0; s < n; s++) {
						var i = e.readBits(8);
						r.push(i)
					}
					try {
						o += decodeURIComponent(r.map((function(e) {
							return "%" + ("0" + e.toString(16)).substr(-2)
						})).join(""))
					} catch(l) {}
					return {
						bytes: r,
						text: o
					}
				}

				function u(e, t) {
					for(var r = [], o = "", a = [8, 10, 12][t], n = e.readBits(a), i = 0; i < n; i++) {
						var l = e.readBits(13),
							d = Math.floor(l / 192) << 8 | l % 192;
						d += d < 7936 ? 33088 : 49472, r.push(d >> 8, 255 & d), o += String.fromCharCode(s.shiftJISTable[d])
					}
					return {
						bytes: r,
						text: o
					}
				}
				t.decode = function(e, t) {
					for(var r, s, l, f, h = new n.BitStream(e), k = t <= 9 ? 0 : t <= 26 ? 1 : 2, B = {
							text: "",
							bytes: [],
							chunks: [],
							version: t
						}; h.available() >= 4;) {
						var m = h.readBits(4);
						if(m === a.Terminator) return B;
						if(m === a.ECI) 0 === h.readBits(1) ? B.chunks.push({
							type: o.ECI,
							assignmentNumber: h.readBits(7)
						}) : 0 === h.readBits(1) ? B.chunks.push({
							type: o.ECI,
							assignmentNumber: h.readBits(14)
						}) : 0 === h.readBits(1) ? B.chunks.push({
							type: o.ECI,
							assignmentNumber: h.readBits(21)
						}) : B.chunks.push({
							type: o.ECI,
							assignmentNumber: -1
						});
						else if(m === a.Numeric) {
							var w = i(h, k);
							B.text += w.text, (r = B.bytes).push.apply(r, w.bytes), B.chunks.push({
								type: o.Numeric,
								text: w.text
							})
						} else if(m === a.Alphanumeric) {
							var v = d(h, k);
							B.text += v.text, (s = B.bytes).push.apply(s, v.bytes), B.chunks.push({
								type: o.Alphanumeric,
								text: v.text
							})
						} else if(m === a.Byte) {
							var _ = c(h, k);
							B.text += _.text, (l = B.bytes).push.apply(l, _.bytes), B.chunks.push({
								type: o.Byte,
								bytes: _.bytes,
								text: _.text
							})
						} else if(m === a.Kanji) {
							var b = u(h, k);
							B.text += b.text, (f = B.bytes).push.apply(f, b.bytes), B.chunks.push({
								type: o.Kanji,
								bytes: b.bytes,
								text: b.text
							})
						}
					}
					if(0 === h.available() || 0 === h.readBits(h.available())) return B
				}
			}, function(e, t, r) {
				"use strict";
				Object.defineProperty(t, "__esModule", {
					value: !0
				});
				var o = function() {
					function e(e) {
						this.byteOffset = 0, this.bitOffset = 0, this.bytes = e
					}
					return e.prototype.readBits = function(e) {
						if(e < 1 || e > 32 || e > this.available()) throw new Error("Cannot read " + e.toString() + " bits");
						var t = 0;
						if(this.bitOffset > 0) {
							var r = 8 - this.bitOffset,
								o = e < r ? e : r,
								a = 255 >> 8 - o << (n = r - o);
							t = (this.bytes[this.byteOffset] & a) >> n, e -= o, this.bitOffset += o, 8 === this.bitOffset && (this.bitOffset = 0, this.byteOffset++)
						}
						if(e > 0) {
							for(; e >= 8;) t = t << 8 | 255 & this.bytes[this.byteOffset], this.byteOffset++, e -= 8;
							var n;
							if(e > 0) a = 255 >> (n = 8 - e) << n, t = t << e | (this.bytes[this.byteOffset] & a) >> n, this.bitOffset += e
						}
						return t
					}, e.prototype.available = function() {
						return 8 * (this.bytes.length - this.byteOffset) - this.bitOffset
					}, e
				}();
				t.BitStream = o
			}, function(e, t, r) {
				"use strict";
				Object.defineProperty(t, "__esModule", {
					value: !0
				}), t.shiftJISTable = {
					32: 32,
					33: 33,
					34: 34,
					35: 35,
					36: 36,
					37: 37,
					38: 38,
					39: 39,
					40: 40,
					41: 41,
					42: 42,
					43: 43,
					44: 44,
					45: 45,
					46: 46,
					47: 47,
					48: 48,
					49: 49,
					50: 50,
					51: 51,
					52: 52,
					53: 53,
					54: 54,
					55: 55,
					56: 56,
					57: 57,
					58: 58,
					59: 59,
					60: 60,
					61: 61,
					62: 62,
					63: 63,
					64: 64,
					65: 65,
					66: 66,
					67: 67,
					68: 68,
					69: 69,
					70: 70,
					71: 71,
					72: 72,
					73: 73,
					74: 74,
					75: 75,
					76: 76,
					77: 77,
					78: 78,
					79: 79,
					80: 80,
					81: 81,
					82: 82,
					83: 83,
					84: 84,
					85: 85,
					86: 86,
					87: 87,
					88: 88,
					89: 89,
					90: 90,
					91: 91,
					92: 165,
					93: 93,
					94: 94,
					95: 95,
					96: 96,
					97: 97,
					98: 98,
					99: 99,
					100: 100,
					101: 101,
					102: 102,
					103: 103,
					104: 104,
					105: 105,
					106: 106,
					107: 107,
					108: 108,
					109: 109,
					110: 110,
					111: 111,
					112: 112,
					113: 113,
					114: 114,
					115: 115,
					116: 116,
					117: 117,
					118: 118,
					119: 119,
					120: 120,
					121: 121,
					122: 122,
					123: 123,
					124: 124,
					125: 125,
					126: 8254,
					33088: 12288,
					33089: 12289,
					33090: 12290,
					33091: 65292,
					33092: 65294,
					33093: 12539,
					33094: 65306,
					33095: 65307,
					33096: 65311,
					33097: 65281,
					33098: 12443,
					33099: 12444,
					33100: 180,
					33101: 65344,
					33102: 168,
					33103: 65342,
					33104: 65507,
					33105: 65343,
					33106: 12541,
					33107: 12542,
					33108: 12445,
					33109: 12446,
					33110: 12291,
					33111: 20189,
					33112: 12293,
					33113: 12294,
					33114: 12295,
					33115: 12540,
					33116: 8213,
					33117: 8208,
					33118: 65295,
					33119: 92,
					33120: 12316,
					33121: 8214,
					33122: 65372,
					33123: 8230,
					33124: 8229,
					33125: 8216,
					33126: 8217,
					33127: 8220,
					33128: 8221,
					33129: 65288,
					33130: 65289,
					33131: 12308,
					33132: 12309,
					33133: 65339,
					33134: 65341,
					33135: 65371,
					33136: 65373,
					33137: 12296,
					33138: 12297,
					33139: 12298,
					33140: 12299,
					33141: 12300,
					33142: 12301,
					33143: 12302,
					33144: 12303,
					33145: 12304,
					33146: 12305,
					33147: 65291,
					33148: 8722,
					33149: 177,
					33150: 215,
					33152: 247,
					33153: 65309,
					33154: 8800,
					33155: 65308,
					33156: 65310,
					33157: 8806,
					33158: 8807,
					33159: 8734,
					33160: 8756,
					33161: 9794,
					33162: 9792,
					33163: 176,
					33164: 8242,
					33165: 8243,
					33166: 8451,
					33167: 65509,
					33168: 65284,
					33169: 162,
					33170: 163,
					33171: 65285,
					33172: 65283,
					33173: 65286,
					33174: 65290,
					33175: 65312,
					33176: 167,
					33177: 9734,
					33178: 9733,
					33179: 9675,
					33180: 9679,
					33181: 9678,
					33182: 9671,
					33183: 9670,
					33184: 9633,
					33185: 9632,
					33186: 9651,
					33187: 9650,
					33188: 9661,
					33189: 9660,
					33190: 8251,
					33191: 12306,
					33192: 8594,
					33193: 8592,
					33194: 8593,
					33195: 8595,
					33196: 12307,
					33208: 8712,
					33209: 8715,
					33210: 8838,
					33211: 8839,
					33212: 8834,
					33213: 8835,
					33214: 8746,
					33215: 8745,
					33224: 8743,
					33225: 8744,
					33226: 172,
					33227: 8658,
					33228: 8660,
					33229: 8704,
					33230: 8707,
					33242: 8736,
					33243: 8869,
					33244: 8978,
					33245: 8706,
					33246: 8711,
					33247: 8801,
					33248: 8786,
					33249: 8810,
					33250: 8811,
					33251: 8730,
					33252: 8765,
					33253: 8733,
					33254: 8757,
					33255: 8747,
					33256: 8748,
					33264: 8491,
					33265: 8240,
					33266: 9839,
					33267: 9837,
					33268: 9834,
					33269: 8224,
					33270: 8225,
					33271: 182,
					33276: 9711,
					33359: 65296,
					33360: 65297,
					33361: 65298,
					33362: 65299,
					33363: 65300,
					33364: 65301,
					33365: 65302,
					33366: 65303,
					33367: 65304,
					33368: 65305,
					33376: 65313,
					33377: 65314,
					33378: 65315,
					33379: 65316,
					33380: 65317,
					33381: 65318,
					33382: 65319,
					33383: 65320,
					33384: 65321,
					33385: 65322,
					33386: 65323,
					33387: 65324,
					33388: 65325,
					33389: 65326,
					33390: 65327,
					33391: 65328,
					33392: 65329,
					33393: 65330,
					33394: 65331,
					33395: 65332,
					33396: 65333,
					33397: 65334,
					33398: 65335,
					33399: 65336,
					33400: 65337,
					33401: 65338,
					33409: 65345,
					33410: 65346,
					33411: 65347,
					33412: 65348,
					33413: 65349,
					33414: 65350,
					33415: 65351,
					33416: 65352,
					33417: 65353,
					33418: 65354,
					33419: 65355,
					33420: 65356,
					33421: 65357,
					33422: 65358,
					33423: 65359,
					33424: 65360,
					33425: 65361,
					33426: 65362,
					33427: 65363,
					33428: 65364,
					33429: 65365,
					33430: 65366,
					33431: 65367,
					33432: 65368,
					33433: 65369,
					33434: 65370,
					33439: 12353,
					33440: 12354,
					33441: 12355,
					33442: 12356,
					33443: 12357,
					33444: 12358,
					33445: 12359,
					33446: 12360,
					33447: 12361,
					33448: 12362,
					33449: 12363,
					33450: 12364,
					33451: 12365,
					33452: 12366,
					33453: 12367,
					33454: 12368,
					33455: 12369,
					33456: 12370,
					33457: 12371,
					33458: 12372,
					33459: 12373,
					33460: 12374,
					33461: 12375,
					33462: 12376,
					33463: 12377,
					33464: 12378,
					33465: 12379,
					33466: 12380,
					33467: 12381,
					33468: 12382,
					33469: 12383,
					33470: 12384,
					33471: 12385,
					33472: 12386,
					33473: 12387,
					33474: 12388,
					33475: 12389,
					33476: 12390,
					33477: 12391,
					33478: 12392,
					33479: 12393,
					33480: 12394,
					33481: 12395,
					33482: 12396,
					33483: 12397,
					33484: 12398,
					33485: 12399,
					33486: 12400,
					33487: 12401,
					33488: 12402,
					33489: 12403,
					33490: 12404,
					33491: 12405,
					33492: 12406,
					33493: 12407,
					33494: 12408,
					33495: 12409,
					33496: 12410,
					33497: 12411,
					33498: 12412,
					33499: 12413,
					33500: 12414,
					33501: 12415,
					33502: 12416,
					33503: 12417,
					33504: 12418,
					33505: 12419,
					33506: 12420,
					33507: 12421,
					33508: 12422,
					33509: 12423,
					33510: 12424,
					33511: 12425,
					33512: 12426,
					33513: 12427,
					33514: 12428,
					33515: 12429,
					33516: 12430,
					33517: 12431,
					33518: 12432,
					33519: 12433,
					33520: 12434,
					33521: 12435,
					33600: 12449,
					33601: 12450,
					33602: 12451,
					33603: 12452,
					33604: 12453,
					33605: 12454,
					33606: 12455,
					33607: 12456,
					33608: 12457,
					33609: 12458,
					33610: 12459,
					33611: 12460,
					33612: 12461,
					33613: 12462,
					33614: 12463,
					33615: 12464,
					33616: 12465,
					33617: 12466,
					33618: 12467,
					33619: 12468,
					33620: 12469,
					33621: 12470,
					33622: 12471,
					33623: 12472,
					33624: 12473,
					33625: 12474,
					33626: 12475,
					33627: 12476,
					33628: 12477,
					33629: 12478,
					33630: 12479,
					33631: 12480,
					33632: 12481,
					33633: 12482,
					33634: 12483,
					33635: 12484,
					33636: 12485,
					33637: 12486,
					33638: 12487,
					33639: 12488,
					33640: 12489,
					33641: 12490,
					33642: 12491,
					33643: 12492,
					33644: 12493,
					33645: 12494,
					33646: 12495,
					33647: 12496,
					33648: 12497,
					33649: 12498,
					33650: 12499,
					33651: 12500,
					33652: 12501,
					33653: 12502,
					33654: 12503,
					33655: 12504,
					33656: 12505,
					33657: 12506,
					33658: 12507,
					33659: 12508,
					33660: 12509,
					33661: 12510,
					33662: 12511,
					33664: 12512,
					33665: 12513,
					33666: 12514,
					33667: 12515,
					33668: 12516,
					33669: 12517,
					33670: 12518,
					33671: 12519,
					33672: 12520,
					33673: 12521,
					33674: 12522,
					33675: 12523,
					33676: 12524,
					33677: 12525,
					33678: 12526,
					33679: 12527,
					33680: 12528,
					33681: 12529,
					33682: 12530,
					33683: 12531,
					33684: 12532,
					33685: 12533,
					33686: 12534,
					33695: 913,
					33696: 914,
					33697: 915,
					33698: 916,
					33699: 917,
					33700: 918,
					33701: 919,
					33702: 920,
					33703: 921,
					33704: 922,
					33705: 923,
					33706: 924,
					33707: 925,
					33708: 926,
					33709: 927,
					33710: 928,
					33711: 929,
					33712: 931,
					33713: 932,
					33714: 933,
					33715: 934,
					33716: 935,
					33717: 936,
					33718: 937,
					33727: 945,
					33728: 946,
					33729: 947,
					33730: 948,
					33731: 949,
					33732: 950,
					33733: 951,
					33734: 952,
					33735: 953,
					33736: 954,
					33737: 955,
					33738: 956,
					33739: 957,
					33740: 958,
					33741: 959,
					33742: 960,
					33743: 961,
					33744: 963,
					33745: 964,
					33746: 965,
					33747: 966,
					33748: 967,
					33749: 968,
					33750: 969,
					33856: 1040,
					33857: 1041,
					33858: 1042,
					33859: 1043,
					33860: 1044,
					33861: 1045,
					33862: 1025,
					33863: 1046,
					33864: 1047,
					33865: 1048,
					33866: 1049,
					33867: 1050,
					33868: 1051,
					33869: 1052,
					33870: 1053,
					33871: 1054,
					33872: 1055,
					33873: 1056,
					33874: 1057,
					33875: 1058,
					33876: 1059,
					33877: 1060,
					33878: 1061,
					33879: 1062,
					33880: 1063,
					33881: 1064,
					33882: 1065,
					33883: 1066,
					33884: 1067,
					33885: 1068,
					33886: 1069,
					33887: 1070,
					33888: 1071,
					33904: 1072,
					33905: 1073,
					33906: 1074,
					33907: 1075,
					33908: 1076,
					33909: 1077,
					33910: 1105,
					33911: 1078,
					33912: 1079,
					33913: 1080,
					33914: 1081,
					33915: 1082,
					33916: 1083,
					33917: 1084,
					33918: 1085,
					33920: 1086,
					33921: 1087,
					33922: 1088,
					33923: 1089,
					33924: 1090,
					33925: 1091,
					33926: 1092,
					33927: 1093,
					33928: 1094,
					33929: 1095,
					33930: 1096,
					33931: 1097,
					33932: 1098,
					33933: 1099,
					33934: 1100,
					33935: 1101,
					33936: 1102,
					33937: 1103,
					33951: 9472,
					33952: 9474,
					33953: 9484,
					33954: 9488,
					33955: 9496,
					33956: 9492,
					33957: 9500,
					33958: 9516,
					33959: 9508,
					33960: 9524,
					33961: 9532,
					33962: 9473,
					33963: 9475,
					33964: 9487,
					33965: 9491,
					33966: 9499,
					33967: 9495,
					33968: 9507,
					33969: 9523,
					33970: 9515,
					33971: 9531,
					33972: 9547,
					33973: 9504,
					33974: 9519,
					33975: 9512,
					33976: 9527,
					33977: 9535,
					33978: 9501,
					33979: 9520,
					33980: 9509,
					33981: 9528,
					33982: 9538,
					34975: 20124,
					34976: 21782,
					34977: 23043,
					34978: 38463,
					34979: 21696,
					34980: 24859,
					34981: 25384,
					34982: 23030,
					34983: 36898,
					34984: 33909,
					34985: 33564,
					34986: 31312,
					34987: 24746,
					34988: 25569,
					34989: 28197,
					34990: 26093,
					34991: 33894,
					34992: 33446,
					34993: 39925,
					34994: 26771,
					34995: 22311,
					34996: 26017,
					34997: 25201,
					34998: 23451,
					34999: 22992,
					35e3: 34427,
					35001: 39156,
					35002: 32098,
					35003: 32190,
					35004: 39822,
					35005: 25110,
					35006: 31903,
					35007: 34999,
					35008: 23433,
					35009: 24245,
					35010: 25353,
					35011: 26263,
					35012: 26696,
					35013: 38343,
					35014: 38797,
					35015: 26447,
					35016: 20197,
					35017: 20234,
					35018: 20301,
					35019: 20381,
					35020: 20553,
					35021: 22258,
					35022: 22839,
					35023: 22996,
					35024: 23041,
					35025: 23561,
					35026: 24799,
					35027: 24847,
					35028: 24944,
					35029: 26131,
					35030: 26885,
					35031: 28858,
					35032: 30031,
					35033: 30064,
					35034: 31227,
					35035: 32173,
					35036: 32239,
					35037: 32963,
					35038: 33806,
					35039: 34915,
					35040: 35586,
					35041: 36949,
					35042: 36986,
					35043: 21307,
					35044: 20117,
					35045: 20133,
					35046: 22495,
					35047: 32946,
					35048: 37057,
					35049: 30959,
					35050: 19968,
					35051: 22769,
					35052: 28322,
					35053: 36920,
					35054: 31282,
					35055: 33576,
					35056: 33419,
					35057: 39983,
					35058: 20801,
					35059: 21360,
					35060: 21693,
					35061: 21729,
					35062: 22240,
					35063: 23035,
					35064: 24341,
					35065: 39154,
					35066: 28139,
					35067: 32996,
					35068: 34093,
					35136: 38498,
					35137: 38512,
					35138: 38560,
					35139: 38907,
					35140: 21515,
					35141: 21491,
					35142: 23431,
					35143: 28879,
					35144: 32701,
					35145: 36802,
					35146: 38632,
					35147: 21359,
					35148: 40284,
					35149: 31418,
					35150: 19985,
					35151: 30867,
					35152: 33276,
					35153: 28198,
					35154: 22040,
					35155: 21764,
					35156: 27421,
					35157: 34074,
					35158: 39995,
					35159: 23013,
					35160: 21417,
					35161: 28006,
					35162: 29916,
					35163: 38287,
					35164: 22082,
					35165: 20113,
					35166: 36939,
					35167: 38642,
					35168: 33615,
					35169: 39180,
					35170: 21473,
					35171: 21942,
					35172: 23344,
					35173: 24433,
					35174: 26144,
					35175: 26355,
					35176: 26628,
					35177: 27704,
					35178: 27891,
					35179: 27945,
					35180: 29787,
					35181: 30408,
					35182: 31310,
					35183: 38964,
					35184: 33521,
					35185: 34907,
					35186: 35424,
					35187: 37613,
					35188: 28082,
					35189: 30123,
					35190: 30410,
					35191: 39365,
					35192: 24742,
					35193: 35585,
					35194: 36234,
					35195: 38322,
					35196: 27022,
					35197: 21421,
					35198: 20870,
					35200: 22290,
					35201: 22576,
					35202: 22852,
					35203: 23476,
					35204: 24310,
					35205: 24616,
					35206: 25513,
					35207: 25588,
					35208: 27839,
					35209: 28436,
					35210: 28814,
					35211: 28948,
					35212: 29017,
					35213: 29141,
					35214: 29503,
					35215: 32257,
					35216: 33398,
					35217: 33489,
					35218: 34199,
					35219: 36960,
					35220: 37467,
					35221: 40219,
					35222: 22633,
					35223: 26044,
					35224: 27738,
					35225: 29989,
					35226: 20985,
					35227: 22830,
					35228: 22885,
					35229: 24448,
					35230: 24540,
					35231: 25276,
					35232: 26106,
					35233: 27178,
					35234: 27431,
					35235: 27572,
					35236: 29579,
					35237: 32705,
					35238: 35158,
					35239: 40236,
					35240: 40206,
					35241: 40644,
					35242: 23713,
					35243: 27798,
					35244: 33659,
					35245: 20740,
					35246: 23627,
					35247: 25014,
					35248: 33222,
					35249: 26742,
					35250: 29281,
					35251: 20057,
					35252: 20474,
					35253: 21368,
					35254: 24681,
					35255: 28201,
					35256: 31311,
					35257: 38899,
					35258: 19979,
					35259: 21270,
					35260: 20206,
					35261: 20309,
					35262: 20285,
					35263: 20385,
					35264: 20339,
					35265: 21152,
					35266: 21487,
					35267: 22025,
					35268: 22799,
					35269: 23233,
					35270: 23478,
					35271: 23521,
					35272: 31185,
					35273: 26247,
					35274: 26524,
					35275: 26550,
					35276: 27468,
					35277: 27827,
					35278: 28779,
					35279: 29634,
					35280: 31117,
					35281: 31166,
					35282: 31292,
					35283: 31623,
					35284: 33457,
					35285: 33499,
					35286: 33540,
					35287: 33655,
					35288: 33775,
					35289: 33747,
					35290: 34662,
					35291: 35506,
					35292: 22057,
					35293: 36008,
					35294: 36838,
					35295: 36942,
					35296: 38686,
					35297: 34442,
					35298: 20420,
					35299: 23784,
					35300: 25105,
					35301: 29273,
					35302: 30011,
					35303: 33253,
					35304: 33469,
					35305: 34558,
					35306: 36032,
					35307: 38597,
					35308: 39187,
					35309: 39381,
					35310: 20171,
					35311: 20250,
					35312: 35299,
					35313: 22238,
					35314: 22602,
					35315: 22730,
					35316: 24315,
					35317: 24555,
					35318: 24618,
					35319: 24724,
					35320: 24674,
					35321: 25040,
					35322: 25106,
					35323: 25296,
					35324: 25913,
					35392: 39745,
					35393: 26214,
					35394: 26800,
					35395: 28023,
					35396: 28784,
					35397: 30028,
					35398: 30342,
					35399: 32117,
					35400: 33445,
					35401: 34809,
					35402: 38283,
					35403: 38542,
					35404: 35997,
					35405: 20977,
					35406: 21182,
					35407: 22806,
					35408: 21683,
					35409: 23475,
					35410: 23830,
					35411: 24936,
					35412: 27010,
					35413: 28079,
					35414: 30861,
					35415: 33995,
					35416: 34903,
					35417: 35442,
					35418: 37799,
					35419: 39608,
					35420: 28012,
					35421: 39336,
					35422: 34521,
					35423: 22435,
					35424: 26623,
					35425: 34510,
					35426: 37390,
					35427: 21123,
					35428: 22151,
					35429: 21508,
					35430: 24275,
					35431: 25313,
					35432: 25785,
					35433: 26684,
					35434: 26680,
					35435: 27579,
					35436: 29554,
					35437: 30906,
					35438: 31339,
					35439: 35226,
					35440: 35282,
					35441: 36203,
					35442: 36611,
					35443: 37101,
					35444: 38307,
					35445: 38548,
					35446: 38761,
					35447: 23398,
					35448: 23731,
					35449: 27005,
					35450: 38989,
					35451: 38990,
					35452: 25499,
					35453: 31520,
					35454: 27179,
					35456: 27263,
					35457: 26806,
					35458: 39949,
					35459: 28511,
					35460: 21106,
					35461: 21917,
					35462: 24688,
					35463: 25324,
					35464: 27963,
					35465: 28167,
					35466: 28369,
					35467: 33883,
					35468: 35088,
					35469: 36676,
					35470: 19988,
					35471: 39993,
					35472: 21494,
					35473: 26907,
					35474: 27194,
					35475: 38788,
					35476: 26666,
					35477: 20828,
					35478: 31427,
					35479: 33970,
					35480: 37340,
					35481: 37772,
					35482: 22107,
					35483: 40232,
					35484: 26658,
					35485: 33541,
					35486: 33841,
					35487: 31909,
					35488: 21e3,
					35489: 33477,
					35490: 29926,
					35491: 20094,
					35492: 20355,
					35493: 20896,
					35494: 23506,
					35495: 21002,
					35496: 21208,
					35497: 21223,
					35498: 24059,
					35499: 21914,
					35500: 22570,
					35501: 23014,
					35502: 23436,
					35503: 23448,
					35504: 23515,
					35505: 24178,
					35506: 24185,
					35507: 24739,
					35508: 24863,
					35509: 24931,
					35510: 25022,
					35511: 25563,
					35512: 25954,
					35513: 26577,
					35514: 26707,
					35515: 26874,
					35516: 27454,
					35517: 27475,
					35518: 27735,
					35519: 28450,
					35520: 28567,
					35521: 28485,
					35522: 29872,
					35523: 29976,
					35524: 30435,
					35525: 30475,
					35526: 31487,
					35527: 31649,
					35528: 31777,
					35529: 32233,
					35530: 32566,
					35531: 32752,
					35532: 32925,
					35533: 33382,
					35534: 33694,
					35535: 35251,
					35536: 35532,
					35537: 36011,
					35538: 36996,
					35539: 37969,
					35540: 38291,
					35541: 38289,
					35542: 38306,
					35543: 38501,
					35544: 38867,
					35545: 39208,
					35546: 33304,
					35547: 20024,
					35548: 21547,
					35549: 23736,
					35550: 24012,
					35551: 29609,
					35552: 30284,
					35553: 30524,
					35554: 23721,
					35555: 32747,
					35556: 36107,
					35557: 38593,
					35558: 38929,
					35559: 38996,
					35560: 39e3,
					35561: 20225,
					35562: 20238,
					35563: 21361,
					35564: 21916,
					35565: 22120,
					35566: 22522,
					35567: 22855,
					35568: 23305,
					35569: 23492,
					35570: 23696,
					35571: 24076,
					35572: 24190,
					35573: 24524,
					35574: 25582,
					35575: 26426,
					35576: 26071,
					35577: 26082,
					35578: 26399,
					35579: 26827,
					35580: 26820,
					35648: 27231,
					35649: 24112,
					35650: 27589,
					35651: 27671,
					35652: 27773,
					35653: 30079,
					35654: 31048,
					35655: 23395,
					35656: 31232,
					35657: 32e3,
					35658: 24509,
					35659: 35215,
					35660: 35352,
					35661: 36020,
					35662: 36215,
					35663: 36556,
					35664: 36637,
					35665: 39138,
					35666: 39438,
					35667: 39740,
					35668: 20096,
					35669: 20605,
					35670: 20736,
					35671: 22931,
					35672: 23452,
					35673: 25135,
					35674: 25216,
					35675: 25836,
					35676: 27450,
					35677: 29344,
					35678: 30097,
					35679: 31047,
					35680: 32681,
					35681: 34811,
					35682: 35516,
					35683: 35696,
					35684: 25516,
					35685: 33738,
					35686: 38816,
					35687: 21513,
					35688: 21507,
					35689: 21931,
					35690: 26708,
					35691: 27224,
					35692: 35440,
					35693: 30759,
					35694: 26485,
					35695: 40653,
					35696: 21364,
					35697: 23458,
					35698: 33050,
					35699: 34384,
					35700: 36870,
					35701: 19992,
					35702: 20037,
					35703: 20167,
					35704: 20241,
					35705: 21450,
					35706: 21560,
					35707: 23470,
					35708: 24339,
					35709: 24613,
					35710: 25937,
					35712: 26429,
					35713: 27714,
					35714: 27762,
					35715: 27875,
					35716: 28792,
					35717: 29699,
					35718: 31350,
					35719: 31406,
					35720: 31496,
					35721: 32026,
					35722: 31998,
					35723: 32102,
					35724: 26087,
					35725: 29275,
					35726: 21435,
					35727: 23621,
					35728: 24040,
					35729: 25298,
					35730: 25312,
					35731: 25369,
					35732: 28192,
					35733: 34394,
					35734: 35377,
					35735: 36317,
					35736: 37624,
					35737: 28417,
					35738: 31142,
					35739: 39770,
					35740: 20136,
					35741: 20139,
					35742: 20140,
					35743: 20379,
					35744: 20384,
					35745: 20689,
					35746: 20807,
					35747: 31478,
					35748: 20849,
					35749: 20982,
					35750: 21332,
					35751: 21281,
					35752: 21375,
					35753: 21483,
					35754: 21932,
					35755: 22659,
					35756: 23777,
					35757: 24375,
					35758: 24394,
					35759: 24623,
					35760: 24656,
					35761: 24685,
					35762: 25375,
					35763: 25945,
					35764: 27211,
					35765: 27841,
					35766: 29378,
					35767: 29421,
					35768: 30703,
					35769: 33016,
					35770: 33029,
					35771: 33288,
					35772: 34126,
					35773: 37111,
					35774: 37857,
					35775: 38911,
					35776: 39255,
					35777: 39514,
					35778: 20208,
					35779: 20957,
					35780: 23597,
					35781: 26241,
					35782: 26989,
					35783: 23616,
					35784: 26354,
					35785: 26997,
					35786: 29577,
					35787: 26704,
					35788: 31873,
					35789: 20677,
					35790: 21220,
					35791: 22343,
					35792: 24062,
					35793: 37670,
					35794: 26020,
					35795: 27427,
					35796: 27453,
					35797: 29748,
					35798: 31105,
					35799: 31165,
					35800: 31563,
					35801: 32202,
					35802: 33465,
					35803: 33740,
					35804: 34943,
					35805: 35167,
					35806: 35641,
					35807: 36817,
					35808: 37329,
					35809: 21535,
					35810: 37504,
					35811: 20061,
					35812: 20534,
					35813: 21477,
					35814: 21306,
					35815: 29399,
					35816: 29590,
					35817: 30697,
					35818: 33510,
					35819: 36527,
					35820: 39366,
					35821: 39368,
					35822: 39378,
					35823: 20855,
					35824: 24858,
					35825: 34398,
					35826: 21936,
					35827: 31354,
					35828: 20598,
					35829: 23507,
					35830: 36935,
					35831: 38533,
					35832: 20018,
					35833: 27355,
					35834: 37351,
					35835: 23633,
					35836: 23624,
					35904: 25496,
					35905: 31391,
					35906: 27795,
					35907: 38772,
					35908: 36705,
					35909: 31402,
					35910: 29066,
					35911: 38536,
					35912: 31874,
					35913: 26647,
					35914: 32368,
					35915: 26705,
					35916: 37740,
					35917: 21234,
					35918: 21531,
					35919: 34219,
					35920: 35347,
					35921: 32676,
					35922: 36557,
					35923: 37089,
					35924: 21350,
					35925: 34952,
					35926: 31041,
					35927: 20418,
					35928: 20670,
					35929: 21009,
					35930: 20804,
					35931: 21843,
					35932: 22317,
					35933: 29674,
					35934: 22411,
					35935: 22865,
					35936: 24418,
					35937: 24452,
					35938: 24693,
					35939: 24950,
					35940: 24935,
					35941: 25001,
					35942: 25522,
					35943: 25658,
					35944: 25964,
					35945: 26223,
					35946: 26690,
					35947: 28179,
					35948: 30054,
					35949: 31293,
					35950: 31995,
					35951: 32076,
					35952: 32153,
					35953: 32331,
					35954: 32619,
					35955: 33550,
					35956: 33610,
					35957: 34509,
					35958: 35336,
					35959: 35427,
					35960: 35686,
					35961: 36605,
					35962: 38938,
					35963: 40335,
					35964: 33464,
					35965: 36814,
					35966: 39912,
					35968: 21127,
					35969: 25119,
					35970: 25731,
					35971: 28608,
					35972: 38553,
					35973: 26689,
					35974: 20625,
					35975: 27424,
					35976: 27770,
					35977: 28500,
					35978: 31348,
					35979: 32080,
					35980: 34880,
					35981: 35363,
					35982: 26376,
					35983: 20214,
					35984: 20537,
					35985: 20518,
					35986: 20581,
					35987: 20860,
					35988: 21048,
					35989: 21091,
					35990: 21927,
					35991: 22287,
					35992: 22533,
					35993: 23244,
					35994: 24314,
					35995: 25010,
					35996: 25080,
					35997: 25331,
					35998: 25458,
					35999: 26908,
					36e3: 27177,
					36001: 29309,
					36002: 29356,
					36003: 29486,
					36004: 30740,
					36005: 30831,
					36006: 32121,
					36007: 30476,
					36008: 32937,
					36009: 35211,
					36010: 35609,
					36011: 36066,
					36012: 36562,
					36013: 36963,
					36014: 37749,
					36015: 38522,
					36016: 38997,
					36017: 39443,
					36018: 40568,
					36019: 20803,
					36020: 21407,
					36021: 21427,
					36022: 24187,
					36023: 24358,
					36024: 28187,
					36025: 28304,
					36026: 29572,
					36027: 29694,
					36028: 32067,
					36029: 33335,
					36030: 35328,
					36031: 35578,
					36032: 38480,
					36033: 20046,
					36034: 20491,
					36035: 21476,
					36036: 21628,
					36037: 22266,
					36038: 22993,
					36039: 23396,
					36040: 24049,
					36041: 24235,
					36042: 24359,
					36043: 25144,
					36044: 25925,
					36045: 26543,
					36046: 28246,
					36047: 29392,
					36048: 31946,
					36049: 34996,
					36050: 32929,
					36051: 32993,
					36052: 33776,
					36053: 34382,
					36054: 35463,
					36055: 36328,
					36056: 37431,
					36057: 38599,
					36058: 39015,
					36059: 40723,
					36060: 20116,
					36061: 20114,
					36062: 20237,
					36063: 21320,
					36064: 21577,
					36065: 21566,
					36066: 23087,
					36067: 24460,
					36068: 24481,
					36069: 24735,
					36070: 26791,
					36071: 27278,
					36072: 29786,
					36073: 30849,
					36074: 35486,
					36075: 35492,
					36076: 35703,
					36077: 37264,
					36078: 20062,
					36079: 39881,
					36080: 20132,
					36081: 20348,
					36082: 20399,
					36083: 20505,
					36084: 20502,
					36085: 20809,
					36086: 20844,
					36087: 21151,
					36088: 21177,
					36089: 21246,
					36090: 21402,
					36091: 21475,
					36092: 21521,
					36160: 21518,
					36161: 21897,
					36162: 22353,
					36163: 22434,
					36164: 22909,
					36165: 23380,
					36166: 23389,
					36167: 23439,
					36168: 24037,
					36169: 24039,
					36170: 24055,
					36171: 24184,
					36172: 24195,
					36173: 24218,
					36174: 24247,
					36175: 24344,
					36176: 24658,
					36177: 24908,
					36178: 25239,
					36179: 25304,
					36180: 25511,
					36181: 25915,
					36182: 26114,
					36183: 26179,
					36184: 26356,
					36185: 26477,
					36186: 26657,
					36187: 26775,
					36188: 27083,
					36189: 27743,
					36190: 27946,
					36191: 28009,
					36192: 28207,
					36193: 28317,
					36194: 30002,
					36195: 30343,
					36196: 30828,
					36197: 31295,
					36198: 31968,
					36199: 32005,
					36200: 32024,
					36201: 32094,
					36202: 32177,
					36203: 32789,
					36204: 32771,
					36205: 32943,
					36206: 32945,
					36207: 33108,
					36208: 33167,
					36209: 33322,
					36210: 33618,
					36211: 34892,
					36212: 34913,
					36213: 35611,
					36214: 36002,
					36215: 36092,
					36216: 37066,
					36217: 37237,
					36218: 37489,
					36219: 30783,
					36220: 37628,
					36221: 38308,
					36222: 38477,
					36224: 38917,
					36225: 39321,
					36226: 39640,
					36227: 40251,
					36228: 21083,
					36229: 21163,
					36230: 21495,
					36231: 21512,
					36232: 22741,
					36233: 25335,
					36234: 28640,
					36235: 35946,
					36236: 36703,
					36237: 40633,
					36238: 20811,
					36239: 21051,
					36240: 21578,
					36241: 22269,
					36242: 31296,
					36243: 37239,
					36244: 40288,
					36245: 40658,
					36246: 29508,
					36247: 28425,
					36248: 33136,
					36249: 29969,
					36250: 24573,
					36251: 24794,
					36252: 39592,
					36253: 29403,
					36254: 36796,
					36255: 27492,
					36256: 38915,
					36257: 20170,
					36258: 22256,
					36259: 22372,
					36260: 22718,
					36261: 23130,
					36262: 24680,
					36263: 25031,
					36264: 26127,
					36265: 26118,
					36266: 26681,
					36267: 26801,
					36268: 28151,
					36269: 30165,
					36270: 32058,
					36271: 33390,
					36272: 39746,
					36273: 20123,
					36274: 20304,
					36275: 21449,
					36276: 21766,
					36277: 23919,
					36278: 24038,
					36279: 24046,
					36280: 26619,
					36281: 27801,
					36282: 29811,
					36283: 30722,
					36284: 35408,
					36285: 37782,
					36286: 35039,
					36287: 22352,
					36288: 24231,
					36289: 25387,
					36290: 20661,
					36291: 20652,
					36292: 20877,
					36293: 26368,
					36294: 21705,
					36295: 22622,
					36296: 22971,
					36297: 23472,
					36298: 24425,
					36299: 25165,
					36300: 25505,
					36301: 26685,
					36302: 27507,
					36303: 28168,
					36304: 28797,
					36305: 37319,
					36306: 29312,
					36307: 30741,
					36308: 30758,
					36309: 31085,
					36310: 25998,
					36311: 32048,
					36312: 33756,
					36313: 35009,
					36314: 36617,
					36315: 38555,
					36316: 21092,
					36317: 22312,
					36318: 26448,
					36319: 32618,
					36320: 36001,
					36321: 20916,
					36322: 22338,
					36323: 38442,
					36324: 22586,
					36325: 27018,
					36326: 32948,
					36327: 21682,
					36328: 23822,
					36329: 22524,
					36330: 30869,
					36331: 40442,
					36332: 20316,
					36333: 21066,
					36334: 21643,
					36335: 25662,
					36336: 26152,
					36337: 26388,
					36338: 26613,
					36339: 31364,
					36340: 31574,
					36341: 32034,
					36342: 37679,
					36343: 26716,
					36344: 39853,
					36345: 31545,
					36346: 21273,
					36347: 20874,
					36348: 21047,
					36416: 23519,
					36417: 25334,
					36418: 25774,
					36419: 25830,
					36420: 26413,
					36421: 27578,
					36422: 34217,
					36423: 38609,
					36424: 30352,
					36425: 39894,
					36426: 25420,
					36427: 37638,
					36428: 39851,
					36429: 30399,
					36430: 26194,
					36431: 19977,
					36432: 20632,
					36433: 21442,
					36434: 23665,
					36435: 24808,
					36436: 25746,
					36437: 25955,
					36438: 26719,
					36439: 29158,
					36440: 29642,
					36441: 29987,
					36442: 31639,
					36443: 32386,
					36444: 34453,
					36445: 35715,
					36446: 36059,
					36447: 37240,
					36448: 39184,
					36449: 26028,
					36450: 26283,
					36451: 27531,
					36452: 20181,
					36453: 20180,
					36454: 20282,
					36455: 20351,
					36456: 21050,
					36457: 21496,
					36458: 21490,
					36459: 21987,
					36460: 22235,
					36461: 22763,
					36462: 22987,
					36463: 22985,
					36464: 23039,
					36465: 23376,
					36466: 23629,
					36467: 24066,
					36468: 24107,
					36469: 24535,
					36470: 24605,
					36471: 25351,
					36472: 25903,
					36473: 23388,
					36474: 26031,
					36475: 26045,
					36476: 26088,
					36477: 26525,
					36478: 27490,
					36480: 27515,
					36481: 27663,
					36482: 29509,
					36483: 31049,
					36484: 31169,
					36485: 31992,
					36486: 32025,
					36487: 32043,
					36488: 32930,
					36489: 33026,
					36490: 33267,
					36491: 35222,
					36492: 35422,
					36493: 35433,
					36494: 35430,
					36495: 35468,
					36496: 35566,
					36497: 36039,
					36498: 36060,
					36499: 38604,
					36500: 39164,
					36501: 27503,
					36502: 20107,
					36503: 20284,
					36504: 20365,
					36505: 20816,
					36506: 23383,
					36507: 23546,
					36508: 24904,
					36509: 25345,
					36510: 26178,
					36511: 27425,
					36512: 28363,
					36513: 27835,
					36514: 29246,
					36515: 29885,
					36516: 30164,
					36517: 30913,
					36518: 31034,
					36519: 32780,
					36520: 32819,
					36521: 33258,
					36522: 33940,
					36523: 36766,
					36524: 27728,
					36525: 40575,
					36526: 24335,
					36527: 35672,
					36528: 40235,
					36529: 31482,
					36530: 36600,
					36531: 23437,
					36532: 38635,
					36533: 19971,
					36534: 21489,
					36535: 22519,
					36536: 22833,
					36537: 23241,
					36538: 23460,
					36539: 24713,
					36540: 28287,
					36541: 28422,
					36542: 30142,
					36543: 36074,
					36544: 23455,
					36545: 34048,
					36546: 31712,
					36547: 20594,
					36548: 26612,
					36549: 33437,
					36550: 23649,
					36551: 34122,
					36552: 32286,
					36553: 33294,
					36554: 20889,
					36555: 23556,
					36556: 25448,
					36557: 36198,
					36558: 26012,
					36559: 29038,
					36560: 31038,
					36561: 32023,
					36562: 32773,
					36563: 35613,
					36564: 36554,
					36565: 36974,
					36566: 34503,
					36567: 37034,
					36568: 20511,
					36569: 21242,
					36570: 23610,
					36571: 26451,
					36572: 28796,
					36573: 29237,
					36574: 37196,
					36575: 37320,
					36576: 37675,
					36577: 33509,
					36578: 23490,
					36579: 24369,
					36580: 24825,
					36581: 20027,
					36582: 21462,
					36583: 23432,
					36584: 25163,
					36585: 26417,
					36586: 27530,
					36587: 29417,
					36588: 29664,
					36589: 31278,
					36590: 33131,
					36591: 36259,
					36592: 37202,
					36593: 39318,
					36594: 20754,
					36595: 21463,
					36596: 21610,
					36597: 23551,
					36598: 25480,
					36599: 27193,
					36600: 32172,
					36601: 38656,
					36602: 22234,
					36603: 21454,
					36604: 21608,
					36672: 23447,
					36673: 23601,
					36674: 24030,
					36675: 20462,
					36676: 24833,
					36677: 25342,
					36678: 27954,
					36679: 31168,
					36680: 31179,
					36681: 32066,
					36682: 32333,
					36683: 32722,
					36684: 33261,
					36685: 33311,
					36686: 33936,
					36687: 34886,
					36688: 35186,
					36689: 35728,
					36690: 36468,
					36691: 36655,
					36692: 36913,
					36693: 37195,
					36694: 37228,
					36695: 38598,
					36696: 37276,
					36697: 20160,
					36698: 20303,
					36699: 20805,
					36700: 21313,
					36701: 24467,
					36702: 25102,
					36703: 26580,
					36704: 27713,
					36705: 28171,
					36706: 29539,
					36707: 32294,
					36708: 37325,
					36709: 37507,
					36710: 21460,
					36711: 22809,
					36712: 23487,
					36713: 28113,
					36714: 31069,
					36715: 32302,
					36716: 31899,
					36717: 22654,
					36718: 29087,
					36719: 20986,
					36720: 34899,
					36721: 36848,
					36722: 20426,
					36723: 23803,
					36724: 26149,
					36725: 30636,
					36726: 31459,
					36727: 33308,
					36728: 39423,
					36729: 20934,
					36730: 24490,
					36731: 26092,
					36732: 26991,
					36733: 27529,
					36734: 28147,
					36736: 28310,
					36737: 28516,
					36738: 30462,
					36739: 32020,
					36740: 24033,
					36741: 36981,
					36742: 37255,
					36743: 38918,
					36744: 20966,
					36745: 21021,
					36746: 25152,
					36747: 26257,
					36748: 26329,
					36749: 28186,
					36750: 24246,
					36751: 32210,
					36752: 32626,
					36753: 26360,
					36754: 34223,
					36755: 34295,
					36756: 35576,
					36757: 21161,
					36758: 21465,
					36759: 22899,
					36760: 24207,
					36761: 24464,
					36762: 24661,
					36763: 37604,
					36764: 38500,
					36765: 20663,
					36766: 20767,
					36767: 21213,
					36768: 21280,
					36769: 21319,
					36770: 21484,
					36771: 21736,
					36772: 21830,
					36773: 21809,
					36774: 22039,
					36775: 22888,
					36776: 22974,
					36777: 23100,
					36778: 23477,
					36779: 23558,
					36780: 23567,
					36781: 23569,
					36782: 23578,
					36783: 24196,
					36784: 24202,
					36785: 24288,
					36786: 24432,
					36787: 25215,
					36788: 25220,
					36789: 25307,
					36790: 25484,
					36791: 25463,
					36792: 26119,
					36793: 26124,
					36794: 26157,
					36795: 26230,
					36796: 26494,
					36797: 26786,
					36798: 27167,
					36799: 27189,
					36800: 27836,
					36801: 28040,
					36802: 28169,
					36803: 28248,
					36804: 28988,
					36805: 28966,
					36806: 29031,
					36807: 30151,
					36808: 30465,
					36809: 30813,
					36810: 30977,
					36811: 31077,
					36812: 31216,
					36813: 31456,
					36814: 31505,
					36815: 31911,
					36816: 32057,
					36817: 32918,
					36818: 33750,
					36819: 33931,
					36820: 34121,
					36821: 34909,
					36822: 35059,
					36823: 35359,
					36824: 35388,
					36825: 35412,
					36826: 35443,
					36827: 35937,
					36828: 36062,
					36829: 37284,
					36830: 37478,
					36831: 37758,
					36832: 37912,
					36833: 38556,
					36834: 38808,
					36835: 19978,
					36836: 19976,
					36837: 19998,
					36838: 20055,
					36839: 20887,
					36840: 21104,
					36841: 22478,
					36842: 22580,
					36843: 22732,
					36844: 23330,
					36845: 24120,
					36846: 24773,
					36847: 25854,
					36848: 26465,
					36849: 26454,
					36850: 27972,
					36851: 29366,
					36852: 30067,
					36853: 31331,
					36854: 33976,
					36855: 35698,
					36856: 37304,
					36857: 37664,
					36858: 22065,
					36859: 22516,
					36860: 39166,
					36928: 25325,
					36929: 26893,
					36930: 27542,
					36931: 29165,
					36932: 32340,
					36933: 32887,
					36934: 33394,
					36935: 35302,
					36936: 39135,
					36937: 34645,
					36938: 36785,
					36939: 23611,
					36940: 20280,
					36941: 20449,
					36942: 20405,
					36943: 21767,
					36944: 23072,
					36945: 23517,
					36946: 23529,
					36947: 24515,
					36948: 24910,
					36949: 25391,
					36950: 26032,
					36951: 26187,
					36952: 26862,
					36953: 27035,
					36954: 28024,
					36955: 28145,
					36956: 30003,
					36957: 30137,
					36958: 30495,
					36959: 31070,
					36960: 31206,
					36961: 32051,
					36962: 33251,
					36963: 33455,
					36964: 34218,
					36965: 35242,
					36966: 35386,
					36967: 36523,
					36968: 36763,
					36969: 36914,
					36970: 37341,
					36971: 38663,
					36972: 20154,
					36973: 20161,
					36974: 20995,
					36975: 22645,
					36976: 22764,
					36977: 23563,
					36978: 29978,
					36979: 23613,
					36980: 33102,
					36981: 35338,
					36982: 36805,
					36983: 38499,
					36984: 38765,
					36985: 31525,
					36986: 35535,
					36987: 38920,
					36988: 37218,
					36989: 22259,
					36990: 21416,
					36992: 36887,
					36993: 21561,
					36994: 22402,
					36995: 24101,
					36996: 25512,
					36997: 27700,
					36998: 28810,
					36999: 30561,
					37e3: 31883,
					37001: 32736,
					37002: 34928,
					37003: 36930,
					37004: 37204,
					37005: 37648,
					37006: 37656,
					37007: 38543,
					37008: 29790,
					37009: 39620,
					37010: 23815,
					37011: 23913,
					37012: 25968,
					37013: 26530,
					37014: 36264,
					37015: 38619,
					37016: 25454,
					37017: 26441,
					37018: 26905,
					37019: 33733,
					37020: 38935,
					37021: 38592,
					37022: 35070,
					37023: 28548,
					37024: 25722,
					37025: 23544,
					37026: 19990,
					37027: 28716,
					37028: 30045,
					37029: 26159,
					37030: 20932,
					37031: 21046,
					37032: 21218,
					37033: 22995,
					37034: 24449,
					37035: 24615,
					37036: 25104,
					37037: 25919,
					37038: 25972,
					37039: 26143,
					37040: 26228,
					37041: 26866,
					37042: 26646,
					37043: 27491,
					37044: 28165,
					37045: 29298,
					37046: 29983,
					37047: 30427,
					37048: 31934,
					37049: 32854,
					37050: 22768,
					37051: 35069,
					37052: 35199,
					37053: 35488,
					37054: 35475,
					37055: 35531,
					37056: 36893,
					37057: 37266,
					37058: 38738,
					37059: 38745,
					37060: 25993,
					37061: 31246,
					37062: 33030,
					37063: 38587,
					37064: 24109,
					37065: 24796,
					37066: 25114,
					37067: 26021,
					37068: 26132,
					37069: 26512,
					37070: 30707,
					37071: 31309,
					37072: 31821,
					37073: 32318,
					37074: 33034,
					37075: 36012,
					37076: 36196,
					37077: 36321,
					37078: 36447,
					37079: 30889,
					37080: 20999,
					37081: 25305,
					37082: 25509,
					37083: 25666,
					37084: 25240,
					37085: 35373,
					37086: 31363,
					37087: 31680,
					37088: 35500,
					37089: 38634,
					37090: 32118,
					37091: 33292,
					37092: 34633,
					37093: 20185,
					37094: 20808,
					37095: 21315,
					37096: 21344,
					37097: 23459,
					37098: 23554,
					37099: 23574,
					37100: 24029,
					37101: 25126,
					37102: 25159,
					37103: 25776,
					37104: 26643,
					37105: 26676,
					37106: 27849,
					37107: 27973,
					37108: 27927,
					37109: 26579,
					37110: 28508,
					37111: 29006,
					37112: 29053,
					37113: 26059,
					37114: 31359,
					37115: 31661,
					37116: 32218,
					37184: 32330,
					37185: 32680,
					37186: 33146,
					37187: 33307,
					37188: 33337,
					37189: 34214,
					37190: 35438,
					37191: 36046,
					37192: 36341,
					37193: 36984,
					37194: 36983,
					37195: 37549,
					37196: 37521,
					37197: 38275,
					37198: 39854,
					37199: 21069,
					37200: 21892,
					37201: 28472,
					37202: 28982,
					37203: 20840,
					37204: 31109,
					37205: 32341,
					37206: 33203,
					37207: 31950,
					37208: 22092,
					37209: 22609,
					37210: 23720,
					37211: 25514,
					37212: 26366,
					37213: 26365,
					37214: 26970,
					37215: 29401,
					37216: 30095,
					37217: 30094,
					37218: 30990,
					37219: 31062,
					37220: 31199,
					37221: 31895,
					37222: 32032,
					37223: 32068,
					37224: 34311,
					37225: 35380,
					37226: 38459,
					37227: 36961,
					37228: 40736,
					37229: 20711,
					37230: 21109,
					37231: 21452,
					37232: 21474,
					37233: 20489,
					37234: 21930,
					37235: 22766,
					37236: 22863,
					37237: 29245,
					37238: 23435,
					37239: 23652,
					37240: 21277,
					37241: 24803,
					37242: 24819,
					37243: 25436,
					37244: 25475,
					37245: 25407,
					37246: 25531,
					37248: 25805,
					37249: 26089,
					37250: 26361,
					37251: 24035,
					37252: 27085,
					37253: 27133,
					37254: 28437,
					37255: 29157,
					37256: 20105,
					37257: 30185,
					37258: 30456,
					37259: 31379,
					37260: 31967,
					37261: 32207,
					37262: 32156,
					37263: 32865,
					37264: 33609,
					37265: 33624,
					37266: 33900,
					37267: 33980,
					37268: 34299,
					37269: 35013,
					37270: 36208,
					37271: 36865,
					37272: 36973,
					37273: 37783,
					37274: 38684,
					37275: 39442,
					37276: 20687,
					37277: 22679,
					37278: 24974,
					37279: 33235,
					37280: 34101,
					37281: 36104,
					37282: 36896,
					37283: 20419,
					37284: 20596,
					37285: 21063,
					37286: 21363,
					37287: 24687,
					37288: 25417,
					37289: 26463,
					37290: 28204,
					37291: 36275,
					37292: 36895,
					37293: 20439,
					37294: 23646,
					37295: 36042,
					37296: 26063,
					37297: 32154,
					37298: 21330,
					37299: 34966,
					37300: 20854,
					37301: 25539,
					37302: 23384,
					37303: 23403,
					37304: 23562,
					37305: 25613,
					37306: 26449,
					37307: 36956,
					37308: 20182,
					37309: 22810,
					37310: 22826,
					37311: 27760,
					37312: 35409,
					37313: 21822,
					37314: 22549,
					37315: 22949,
					37316: 24816,
					37317: 25171,
					37318: 26561,
					37319: 33333,
					37320: 26965,
					37321: 38464,
					37322: 39364,
					37323: 39464,
					37324: 20307,
					37325: 22534,
					37326: 23550,
					37327: 32784,
					37328: 23729,
					37329: 24111,
					37330: 24453,
					37331: 24608,
					37332: 24907,
					37333: 25140,
					37334: 26367,
					37335: 27888,
					37336: 28382,
					37337: 32974,
					37338: 33151,
					37339: 33492,
					37340: 34955,
					37341: 36024,
					37342: 36864,
					37343: 36910,
					37344: 38538,
					37345: 40667,
					37346: 39899,
					37347: 20195,
					37348: 21488,
					37349: 22823,
					37350: 31532,
					37351: 37261,
					37352: 38988,
					37353: 40441,
					37354: 28381,
					37355: 28711,
					37356: 21331,
					37357: 21828,
					37358: 23429,
					37359: 25176,
					37360: 25246,
					37361: 25299,
					37362: 27810,
					37363: 28655,
					37364: 29730,
					37365: 35351,
					37366: 37944,
					37367: 28609,
					37368: 35582,
					37369: 33592,
					37370: 20967,
					37371: 34552,
					37372: 21482,
					37440: 21481,
					37441: 20294,
					37442: 36948,
					37443: 36784,
					37444: 22890,
					37445: 33073,
					37446: 24061,
					37447: 31466,
					37448: 36799,
					37449: 26842,
					37450: 35895,
					37451: 29432,
					37452: 40008,
					37453: 27197,
					37454: 35504,
					37455: 20025,
					37456: 21336,
					37457: 22022,
					37458: 22374,
					37459: 25285,
					37460: 25506,
					37461: 26086,
					37462: 27470,
					37463: 28129,
					37464: 28251,
					37465: 28845,
					37466: 30701,
					37467: 31471,
					37468: 31658,
					37469: 32187,
					37470: 32829,
					37471: 32966,
					37472: 34507,
					37473: 35477,
					37474: 37723,
					37475: 22243,
					37476: 22727,
					37477: 24382,
					37478: 26029,
					37479: 26262,
					37480: 27264,
					37481: 27573,
					37482: 30007,
					37483: 35527,
					37484: 20516,
					37485: 30693,
					37486: 22320,
					37487: 24347,
					37488: 24677,
					37489: 26234,
					37490: 27744,
					37491: 30196,
					37492: 31258,
					37493: 32622,
					37494: 33268,
					37495: 34584,
					37496: 36933,
					37497: 39347,
					37498: 31689,
					37499: 30044,
					37500: 31481,
					37501: 31569,
					37502: 33988,
					37504: 36880,
					37505: 31209,
					37506: 31378,
					37507: 33590,
					37508: 23265,
					37509: 30528,
					37510: 20013,
					37511: 20210,
					37512: 23449,
					37513: 24544,
					37514: 25277,
					37515: 26172,
					37516: 26609,
					37517: 27880,
					37518: 34411,
					37519: 34935,
					37520: 35387,
					37521: 37198,
					37522: 37619,
					37523: 39376,
					37524: 27159,
					37525: 28710,
					37526: 29482,
					37527: 33511,
					37528: 33879,
					37529: 36015,
					37530: 19969,
					37531: 20806,
					37532: 20939,
					37533: 21899,
					37534: 23541,
					37535: 24086,
					37536: 24115,
					37537: 24193,
					37538: 24340,
					37539: 24373,
					37540: 24427,
					37541: 24500,
					37542: 25074,
					37543: 25361,
					37544: 26274,
					37545: 26397,
					37546: 28526,
					37547: 29266,
					37548: 30010,
					37549: 30522,
					37550: 32884,
					37551: 33081,
					37552: 33144,
					37553: 34678,
					37554: 35519,
					37555: 35548,
					37556: 36229,
					37557: 36339,
					37558: 37530,
					37559: 38263,
					37560: 38914,
					37561: 40165,
					37562: 21189,
					37563: 25431,
					37564: 30452,
					37565: 26389,
					37566: 27784,
					37567: 29645,
					37568: 36035,
					37569: 37806,
					37570: 38515,
					37571: 27941,
					37572: 22684,
					37573: 26894,
					37574: 27084,
					37575: 36861,
					37576: 37786,
					37577: 30171,
					37578: 36890,
					37579: 22618,
					37580: 26626,
					37581: 25524,
					37582: 27131,
					37583: 20291,
					37584: 28460,
					37585: 26584,
					37586: 36795,
					37587: 34086,
					37588: 32180,
					37589: 37716,
					37590: 26943,
					37591: 28528,
					37592: 22378,
					37593: 22775,
					37594: 23340,
					37595: 32044,
					37596: 29226,
					37597: 21514,
					37598: 37347,
					37599: 40372,
					37600: 20141,
					37601: 20302,
					37602: 20572,
					37603: 20597,
					37604: 21059,
					37605: 35998,
					37606: 21576,
					37607: 22564,
					37608: 23450,
					37609: 24093,
					37610: 24213,
					37611: 24237,
					37612: 24311,
					37613: 24351,
					37614: 24716,
					37615: 25269,
					37616: 25402,
					37617: 25552,
					37618: 26799,
					37619: 27712,
					37620: 30855,
					37621: 31118,
					37622: 31243,
					37623: 32224,
					37624: 33351,
					37625: 35330,
					37626: 35558,
					37627: 36420,
					37628: 36883,
					37696: 37048,
					37697: 37165,
					37698: 37336,
					37699: 40718,
					37700: 27877,
					37701: 25688,
					37702: 25826,
					37703: 25973,
					37704: 28404,
					37705: 30340,
					37706: 31515,
					37707: 36969,
					37708: 37841,
					37709: 28346,
					37710: 21746,
					37711: 24505,
					37712: 25764,
					37713: 36685,
					37714: 36845,
					37715: 37444,
					37716: 20856,
					37717: 22635,
					37718: 22825,
					37719: 23637,
					37720: 24215,
					37721: 28155,
					37722: 32399,
					37723: 29980,
					37724: 36028,
					37725: 36578,
					37726: 39003,
					37727: 28857,
					37728: 20253,
					37729: 27583,
					37730: 28593,
					37731: 3e4,
					37732: 38651,
					37733: 20814,
					37734: 21520,
					37735: 22581,
					37736: 22615,
					37737: 22956,
					37738: 23648,
					37739: 24466,
					37740: 26007,
					37741: 26460,
					37742: 28193,
					37743: 30331,
					37744: 33759,
					37745: 36077,
					37746: 36884,
					37747: 37117,
					37748: 37709,
					37749: 30757,
					37750: 30778,
					37751: 21162,
					37752: 24230,
					37753: 22303,
					37754: 22900,
					37755: 24594,
					37756: 20498,
					37757: 20826,
					37758: 20908,
					37760: 20941,
					37761: 20992,
					37762: 21776,
					37763: 22612,
					37764: 22616,
					37765: 22871,
					37766: 23445,
					37767: 23798,
					37768: 23947,
					37769: 24764,
					37770: 25237,
					37771: 25645,
					37772: 26481,
					37773: 26691,
					37774: 26812,
					37775: 26847,
					37776: 30423,
					37777: 28120,
					37778: 28271,
					37779: 28059,
					37780: 28783,
					37781: 29128,
					37782: 24403,
					37783: 30168,
					37784: 31095,
					37785: 31561,
					37786: 31572,
					37787: 31570,
					37788: 31958,
					37789: 32113,
					37790: 21040,
					37791: 33891,
					37792: 34153,
					37793: 34276,
					37794: 35342,
					37795: 35588,
					37796: 35910,
					37797: 36367,
					37798: 36867,
					37799: 36879,
					37800: 37913,
					37801: 38518,
					37802: 38957,
					37803: 39472,
					37804: 38360,
					37805: 20685,
					37806: 21205,
					37807: 21516,
					37808: 22530,
					37809: 23566,
					37810: 24999,
					37811: 25758,
					37812: 27934,
					37813: 30643,
					37814: 31461,
					37815: 33012,
					37816: 33796,
					37817: 36947,
					37818: 37509,
					37819: 23776,
					37820: 40199,
					37821: 21311,
					37822: 24471,
					37823: 24499,
					37824: 28060,
					37825: 29305,
					37826: 30563,
					37827: 31167,
					37828: 31716,
					37829: 27602,
					37830: 29420,
					37831: 35501,
					37832: 26627,
					37833: 27233,
					37834: 20984,
					37835: 31361,
					37836: 26932,
					37837: 23626,
					37838: 40182,
					37839: 33515,
					37840: 23493,
					37841: 37193,
					37842: 28702,
					37843: 22136,
					37844: 23663,
					37845: 24775,
					37846: 25958,
					37847: 27788,
					37848: 35930,
					37849: 36929,
					37850: 38931,
					37851: 21585,
					37852: 26311,
					37853: 37389,
					37854: 22856,
					37855: 37027,
					37856: 20869,
					37857: 20045,
					37858: 20970,
					37859: 34201,
					37860: 35598,
					37861: 28760,
					37862: 25466,
					37863: 37707,
					37864: 26978,
					37865: 39348,
					37866: 32260,
					37867: 30071,
					37868: 21335,
					37869: 26976,
					37870: 36575,
					37871: 38627,
					37872: 27741,
					37873: 20108,
					37874: 23612,
					37875: 24336,
					37876: 36841,
					37877: 21250,
					37878: 36049,
					37879: 32905,
					37880: 34425,
					37881: 24319,
					37882: 26085,
					37883: 20083,
					37884: 20837,
					37952: 22914,
					37953: 23615,
					37954: 38894,
					37955: 20219,
					37956: 22922,
					37957: 24525,
					37958: 35469,
					37959: 28641,
					37960: 31152,
					37961: 31074,
					37962: 23527,
					37963: 33905,
					37964: 29483,
					37965: 29105,
					37966: 24180,
					37967: 24565,
					37968: 25467,
					37969: 25754,
					37970: 29123,
					37971: 31896,
					37972: 20035,
					37973: 24316,
					37974: 20043,
					37975: 22492,
					37976: 22178,
					37977: 24745,
					37978: 28611,
					37979: 32013,
					37980: 33021,
					37981: 33075,
					37982: 33215,
					37983: 36786,
					37984: 35223,
					37985: 34468,
					37986: 24052,
					37987: 25226,
					37988: 25773,
					37989: 35207,
					37990: 26487,
					37991: 27874,
					37992: 27966,
					37993: 29750,
					37994: 30772,
					37995: 23110,
					37996: 32629,
					37997: 33453,
					37998: 39340,
					37999: 20467,
					38e3: 24259,
					38001: 25309,
					38002: 25490,
					38003: 25943,
					38004: 26479,
					38005: 30403,
					38006: 29260,
					38007: 32972,
					38008: 32954,
					38009: 36649,
					38010: 37197,
					38011: 20493,
					38012: 22521,
					38013: 23186,
					38014: 26757,
					38016: 26995,
					38017: 29028,
					38018: 29437,
					38019: 36023,
					38020: 22770,
					38021: 36064,
					38022: 38506,
					38023: 36889,
					38024: 34687,
					38025: 31204,
					38026: 30695,
					38027: 33833,
					38028: 20271,
					38029: 21093,
					38030: 21338,
					38031: 25293,
					38032: 26575,
					38033: 27850,
					38034: 30333,
					38035: 31636,
					38036: 31893,
					38037: 33334,
					38038: 34180,
					38039: 36843,
					38040: 26333,
					38041: 28448,
					38042: 29190,
					38043: 32283,
					38044: 33707,
					38045: 39361,
					38046: 40614,
					38047: 20989,
					38048: 31665,
					38049: 30834,
					38050: 31672,
					38051: 32903,
					38052: 31560,
					38053: 27368,
					38054: 24161,
					38055: 32908,
					38056: 30033,
					38057: 30048,
					38058: 20843,
					38059: 37474,
					38060: 28300,
					38061: 30330,
					38062: 37271,
					38063: 39658,
					38064: 20240,
					38065: 32624,
					38066: 25244,
					38067: 31567,
					38068: 38309,
					38069: 40169,
					38070: 22138,
					38071: 22617,
					38072: 34532,
					38073: 38588,
					38074: 20276,
					38075: 21028,
					38076: 21322,
					38077: 21453,
					38078: 21467,
					38079: 24070,
					38080: 25644,
					38081: 26001,
					38082: 26495,
					38083: 27710,
					38084: 27726,
					38085: 29256,
					38086: 29359,
					38087: 29677,
					38088: 30036,
					38089: 32321,
					38090: 33324,
					38091: 34281,
					38092: 36009,
					38093: 31684,
					38094: 37318,
					38095: 29033,
					38096: 38930,
					38097: 39151,
					38098: 25405,
					38099: 26217,
					38100: 30058,
					38101: 30436,
					38102: 30928,
					38103: 34115,
					38104: 34542,
					38105: 21290,
					38106: 21329,
					38107: 21542,
					38108: 22915,
					38109: 24199,
					38110: 24444,
					38111: 24754,
					38112: 25161,
					38113: 25209,
					38114: 25259,
					38115: 26e3,
					38116: 27604,
					38117: 27852,
					38118: 30130,
					38119: 30382,
					38120: 30865,
					38121: 31192,
					38122: 32203,
					38123: 32631,
					38124: 32933,
					38125: 34987,
					38126: 35513,
					38127: 36027,
					38128: 36991,
					38129: 38750,
					38130: 39131,
					38131: 27147,
					38132: 31800,
					38133: 20633,
					38134: 23614,
					38135: 24494,
					38136: 26503,
					38137: 27608,
					38138: 29749,
					38139: 30473,
					38140: 32654,
					38208: 40763,
					38209: 26570,
					38210: 31255,
					38211: 21305,
					38212: 30091,
					38213: 39661,
					38214: 24422,
					38215: 33181,
					38216: 33777,
					38217: 32920,
					38218: 24380,
					38219: 24517,
					38220: 30050,
					38221: 31558,
					38222: 36924,
					38223: 26727,
					38224: 23019,
					38225: 23195,
					38226: 32016,
					38227: 30334,
					38228: 35628,
					38229: 20469,
					38230: 24426,
					38231: 27161,
					38232: 27703,
					38233: 28418,
					38234: 29922,
					38235: 31080,
					38236: 34920,
					38237: 35413,
					38238: 35961,
					38239: 24287,
					38240: 25551,
					38241: 30149,
					38242: 31186,
					38243: 33495,
					38244: 37672,
					38245: 37618,
					38246: 33948,
					38247: 34541,
					38248: 39981,
					38249: 21697,
					38250: 24428,
					38251: 25996,
					38252: 27996,
					38253: 28693,
					38254: 36007,
					38255: 36051,
					38256: 38971,
					38257: 25935,
					38258: 29942,
					38259: 19981,
					38260: 20184,
					38261: 22496,
					38262: 22827,
					38263: 23142,
					38264: 23500,
					38265: 20904,
					38266: 24067,
					38267: 24220,
					38268: 24598,
					38269: 25206,
					38270: 25975,
					38272: 26023,
					38273: 26222,
					38274: 28014,
					38275: 29238,
					38276: 31526,
					38277: 33104,
					38278: 33178,
					38279: 33433,
					38280: 35676,
					38281: 36e3,
					38282: 36070,
					38283: 36212,
					38284: 38428,
					38285: 38468,
					38286: 20398,
					38287: 25771,
					38288: 27494,
					38289: 33310,
					38290: 33889,
					38291: 34154,
					38292: 37096,
					38293: 23553,
					38294: 26963,
					38295: 39080,
					38296: 33914,
					38297: 34135,
					38298: 20239,
					38299: 21103,
					38300: 24489,
					38301: 24133,
					38302: 26381,
					38303: 31119,
					38304: 33145,
					38305: 35079,
					38306: 35206,
					38307: 28149,
					38308: 24343,
					38309: 25173,
					38310: 27832,
					38311: 20175,
					38312: 29289,
					38313: 39826,
					38314: 20998,
					38315: 21563,
					38316: 22132,
					38317: 22707,
					38318: 24996,
					38319: 25198,
					38320: 28954,
					38321: 22894,
					38322: 31881,
					38323: 31966,
					38324: 32027,
					38325: 38640,
					38326: 25991,
					38327: 32862,
					38328: 19993,
					38329: 20341,
					38330: 20853,
					38331: 22592,
					38332: 24163,
					38333: 24179,
					38334: 24330,
					38335: 26564,
					38336: 20006,
					38337: 34109,
					38338: 38281,
					38339: 38491,
					38340: 31859,
					38341: 38913,
					38342: 20731,
					38343: 22721,
					38344: 30294,
					38345: 30887,
					38346: 21029,
					38347: 30629,
					38348: 34065,
					38349: 31622,
					38350: 20559,
					38351: 22793,
					38352: 29255,
					38353: 31687,
					38354: 32232,
					38355: 36794,
					38356: 36820,
					38357: 36941,
					38358: 20415,
					38359: 21193,
					38360: 23081,
					38361: 24321,
					38362: 38829,
					38363: 20445,
					38364: 33303,
					38365: 37610,
					38366: 22275,
					38367: 25429,
					38368: 27497,
					38369: 29995,
					38370: 35036,
					38371: 36628,
					38372: 31298,
					38373: 21215,
					38374: 22675,
					38375: 24917,
					38376: 25098,
					38377: 26286,
					38378: 27597,
					38379: 31807,
					38380: 33769,
					38381: 20515,
					38382: 20472,
					38383: 21253,
					38384: 21574,
					38385: 22577,
					38386: 22857,
					38387: 23453,
					38388: 23792,
					38389: 23791,
					38390: 23849,
					38391: 24214,
					38392: 25265,
					38393: 25447,
					38394: 25918,
					38395: 26041,
					38396: 26379,
					38464: 27861,
					38465: 27873,
					38466: 28921,
					38467: 30770,
					38468: 32299,
					38469: 32990,
					38470: 33459,
					38471: 33804,
					38472: 34028,
					38473: 34562,
					38474: 35090,
					38475: 35370,
					38476: 35914,
					38477: 37030,
					38478: 37586,
					38479: 39165,
					38480: 40179,
					38481: 40300,
					38482: 20047,
					38483: 20129,
					38484: 20621,
					38485: 21078,
					38486: 22346,
					38487: 22952,
					38488: 24125,
					38489: 24536,
					38490: 24537,
					38491: 25151,
					38492: 26292,
					38493: 26395,
					38494: 26576,
					38495: 26834,
					38496: 20882,
					38497: 32033,
					38498: 32938,
					38499: 33192,
					38500: 35584,
					38501: 35980,
					38502: 36031,
					38503: 37502,
					38504: 38450,
					38505: 21536,
					38506: 38956,
					38507: 21271,
					38508: 20693,
					38509: 21340,
					38510: 22696,
					38511: 25778,
					38512: 26420,
					38513: 29287,
					38514: 30566,
					38515: 31302,
					38516: 37350,
					38517: 21187,
					38518: 27809,
					38519: 27526,
					38520: 22528,
					38521: 24140,
					38522: 22868,
					38523: 26412,
					38524: 32763,
					38525: 20961,
					38526: 30406,
					38528: 25705,
					38529: 30952,
					38530: 39764,
					38531: 40635,
					38532: 22475,
					38533: 22969,
					38534: 26151,
					38535: 26522,
					38536: 27598,
					38537: 21737,
					38538: 27097,
					38539: 24149,
					38540: 33180,
					38541: 26517,
					38542: 39850,
					38543: 26622,
					38544: 40018,
					38545: 26717,
					38546: 20134,
					38547: 20451,
					38548: 21448,
					38549: 25273,
					38550: 26411,
					38551: 27819,
					38552: 36804,
					38553: 20397,
					38554: 32365,
					38555: 40639,
					38556: 19975,
					38557: 24930,
					38558: 28288,
					38559: 28459,
					38560: 34067,
					38561: 21619,
					38562: 26410,
					38563: 39749,
					38564: 24051,
					38565: 31637,
					38566: 23724,
					38567: 23494,
					38568: 34588,
					38569: 28234,
					38570: 34001,
					38571: 31252,
					38572: 33032,
					38573: 22937,
					38574: 31885,
					38575: 27665,
					38576: 30496,
					38577: 21209,
					38578: 22818,
					38579: 28961,
					38580: 29279,
					38581: 30683,
					38582: 38695,
					38583: 40289,
					38584: 26891,
					38585: 23167,
					38586: 23064,
					38587: 20901,
					38588: 21517,
					38589: 21629,
					38590: 26126,
					38591: 30431,
					38592: 36855,
					38593: 37528,
					38594: 40180,
					38595: 23018,
					38596: 29277,
					38597: 28357,
					38598: 20813,
					38599: 26825,
					38600: 32191,
					38601: 32236,
					38602: 38754,
					38603: 40634,
					38604: 25720,
					38605: 27169,
					38606: 33538,
					38607: 22916,
					38608: 23391,
					38609: 27611,
					38610: 29467,
					38611: 30450,
					38612: 32178,
					38613: 32791,
					38614: 33945,
					38615: 20786,
					38616: 26408,
					38617: 40665,
					38618: 30446,
					38619: 26466,
					38620: 21247,
					38621: 39173,
					38622: 23588,
					38623: 25147,
					38624: 31870,
					38625: 36016,
					38626: 21839,
					38627: 24758,
					38628: 32011,
					38629: 38272,
					38630: 21249,
					38631: 20063,
					38632: 20918,
					38633: 22812,
					38634: 29242,
					38635: 32822,
					38636: 37326,
					38637: 24357,
					38638: 30690,
					38639: 21380,
					38640: 24441,
					38641: 32004,
					38642: 34220,
					38643: 35379,
					38644: 36493,
					38645: 38742,
					38646: 26611,
					38647: 34222,
					38648: 37971,
					38649: 24841,
					38650: 24840,
					38651: 27833,
					38652: 30290,
					38720: 35565,
					38721: 36664,
					38722: 21807,
					38723: 20305,
					38724: 20778,
					38725: 21191,
					38726: 21451,
					38727: 23461,
					38728: 24189,
					38729: 24736,
					38730: 24962,
					38731: 25558,
					38732: 26377,
					38733: 26586,
					38734: 28263,
					38735: 28044,
					38736: 29494,
					38737: 29495,
					38738: 30001,
					38739: 31056,
					38740: 35029,
					38741: 35480,
					38742: 36938,
					38743: 37009,
					38744: 37109,
					38745: 38596,
					38746: 34701,
					38747: 22805,
					38748: 20104,
					38749: 20313,
					38750: 19982,
					38751: 35465,
					38752: 36671,
					38753: 38928,
					38754: 20653,
					38755: 24188,
					38756: 22934,
					38757: 23481,
					38758: 24248,
					38759: 25562,
					38760: 25594,
					38761: 25793,
					38762: 26332,
					38763: 26954,
					38764: 27096,
					38765: 27915,
					38766: 28342,
					38767: 29076,
					38768: 29992,
					38769: 31407,
					38770: 32650,
					38771: 32768,
					38772: 33865,
					38773: 33993,
					38774: 35201,
					38775: 35617,
					38776: 36362,
					38777: 36965,
					38778: 38525,
					38779: 39178,
					38780: 24958,
					38781: 25233,
					38782: 27442,
					38784: 27779,
					38785: 28020,
					38786: 32716,
					38787: 32764,
					38788: 28096,
					38789: 32645,
					38790: 34746,
					38791: 35064,
					38792: 26469,
					38793: 33713,
					38794: 38972,
					38795: 38647,
					38796: 27931,
					38797: 32097,
					38798: 33853,
					38799: 37226,
					38800: 20081,
					38801: 21365,
					38802: 23888,
					38803: 27396,
					38804: 28651,
					38805: 34253,
					38806: 34349,
					38807: 35239,
					38808: 21033,
					38809: 21519,
					38810: 23653,
					38811: 26446,
					38812: 26792,
					38813: 29702,
					38814: 29827,
					38815: 30178,
					38816: 35023,
					38817: 35041,
					38818: 37324,
					38819: 38626,
					38820: 38520,
					38821: 24459,
					38822: 29575,
					38823: 31435,
					38824: 33870,
					38825: 25504,
					38826: 30053,
					38827: 21129,
					38828: 27969,
					38829: 28316,
					38830: 29705,
					38831: 30041,
					38832: 30827,
					38833: 31890,
					38834: 38534,
					38835: 31452,
					38836: 40845,
					38837: 20406,
					38838: 24942,
					38839: 26053,
					38840: 34396,
					38841: 20102,
					38842: 20142,
					38843: 20698,
					38844: 20001,
					38845: 20940,
					38846: 23534,
					38847: 26009,
					38848: 26753,
					38849: 28092,
					38850: 29471,
					38851: 30274,
					38852: 30637,
					38853: 31260,
					38854: 31975,
					38855: 33391,
					38856: 35538,
					38857: 36988,
					38858: 37327,
					38859: 38517,
					38860: 38936,
					38861: 21147,
					38862: 32209,
					38863: 20523,
					38864: 21400,
					38865: 26519,
					38866: 28107,
					38867: 29136,
					38868: 29747,
					38869: 33256,
					38870: 36650,
					38871: 38563,
					38872: 40023,
					38873: 40607,
					38874: 29792,
					38875: 22593,
					38876: 28057,
					38877: 32047,
					38878: 39006,
					38879: 20196,
					38880: 20278,
					38881: 20363,
					38882: 20919,
					38883: 21169,
					38884: 23994,
					38885: 24604,
					38886: 29618,
					38887: 31036,
					38888: 33491,
					38889: 37428,
					38890: 38583,
					38891: 38646,
					38892: 38666,
					38893: 40599,
					38894: 40802,
					38895: 26278,
					38896: 27508,
					38897: 21015,
					38898: 21155,
					38899: 28872,
					38900: 35010,
					38901: 24265,
					38902: 24651,
					38903: 24976,
					38904: 28451,
					38905: 29001,
					38906: 31806,
					38907: 32244,
					38908: 32879,
					38976: 34030,
					38977: 36899,
					38978: 37676,
					38979: 21570,
					38980: 39791,
					38981: 27347,
					38982: 28809,
					38983: 36034,
					38984: 36335,
					38985: 38706,
					38986: 21172,
					38987: 23105,
					38988: 24266,
					38989: 24324,
					38990: 26391,
					38991: 27004,
					38992: 27028,
					38993: 28010,
					38994: 28431,
					38995: 29282,
					38996: 29436,
					38997: 31725,
					38998: 32769,
					38999: 32894,
					39e3: 34635,
					39001: 37070,
					39002: 20845,
					39003: 40595,
					39004: 31108,
					39005: 32907,
					39006: 37682,
					39007: 35542,
					39008: 20525,
					39009: 21644,
					39010: 35441,
					39011: 27498,
					39012: 36036,
					39013: 33031,
					39014: 24785,
					39015: 26528,
					39016: 40434,
					39017: 20121,
					39018: 20120,
					39019: 39952,
					39020: 35435,
					39021: 34241,
					39022: 34152,
					39023: 26880,
					39024: 28286,
					39025: 30871,
					39026: 33109,
					39071: 24332,
					39072: 19984,
					39073: 19989,
					39074: 20010,
					39075: 20017,
					39076: 20022,
					39077: 20028,
					39078: 20031,
					39079: 20034,
					39080: 20054,
					39081: 20056,
					39082: 20098,
					39083: 20101,
					39084: 35947,
					39085: 20106,
					39086: 33298,
					39087: 24333,
					39088: 20110,
					39089: 20126,
					39090: 20127,
					39091: 20128,
					39092: 20130,
					39093: 20144,
					39094: 20147,
					39095: 20150,
					39096: 20174,
					39097: 20173,
					39098: 20164,
					39099: 20166,
					39100: 20162,
					39101: 20183,
					39102: 20190,
					39103: 20205,
					39104: 20191,
					39105: 20215,
					39106: 20233,
					39107: 20314,
					39108: 20272,
					39109: 20315,
					39110: 20317,
					39111: 20311,
					39112: 20295,
					39113: 20342,
					39114: 20360,
					39115: 20367,
					39116: 20376,
					39117: 20347,
					39118: 20329,
					39119: 20336,
					39120: 20369,
					39121: 20335,
					39122: 20358,
					39123: 20374,
					39124: 20760,
					39125: 20436,
					39126: 20447,
					39127: 20430,
					39128: 20440,
					39129: 20443,
					39130: 20433,
					39131: 20442,
					39132: 20432,
					39133: 20452,
					39134: 20453,
					39135: 20506,
					39136: 20520,
					39137: 20500,
					39138: 20522,
					39139: 20517,
					39140: 20485,
					39141: 20252,
					39142: 20470,
					39143: 20513,
					39144: 20521,
					39145: 20524,
					39146: 20478,
					39147: 20463,
					39148: 20497,
					39149: 20486,
					39150: 20547,
					39151: 20551,
					39152: 26371,
					39153: 20565,
					39154: 20560,
					39155: 20552,
					39156: 20570,
					39157: 20566,
					39158: 20588,
					39159: 20600,
					39160: 20608,
					39161: 20634,
					39162: 20613,
					39163: 20660,
					39164: 20658,
					39232: 20681,
					39233: 20682,
					39234: 20659,
					39235: 20674,
					39236: 20694,
					39237: 20702,
					39238: 20709,
					39239: 20717,
					39240: 20707,
					39241: 20718,
					39242: 20729,
					39243: 20725,
					39244: 20745,
					39245: 20737,
					39246: 20738,
					39247: 20758,
					39248: 20757,
					39249: 20756,
					39250: 20762,
					39251: 20769,
					39252: 20794,
					39253: 20791,
					39254: 20796,
					39255: 20795,
					39256: 20799,
					39257: 20800,
					39258: 20818,
					39259: 20812,
					39260: 20820,
					39261: 20834,
					39262: 31480,
					39263: 20841,
					39264: 20842,
					39265: 20846,
					39266: 20864,
					39267: 20866,
					39268: 22232,
					39269: 20876,
					39270: 20873,
					39271: 20879,
					39272: 20881,
					39273: 20883,
					39274: 20885,
					39275: 20886,
					39276: 20900,
					39277: 20902,
					39278: 20898,
					39279: 20905,
					39280: 20906,
					39281: 20907,
					39282: 20915,
					39283: 20913,
					39284: 20914,
					39285: 20912,
					39286: 20917,
					39287: 20925,
					39288: 20933,
					39289: 20937,
					39290: 20955,
					39291: 20960,
					39292: 34389,
					39293: 20969,
					39294: 20973,
					39296: 20976,
					39297: 20981,
					39298: 20990,
					39299: 20996,
					39300: 21003,
					39301: 21012,
					39302: 21006,
					39303: 21031,
					39304: 21034,
					39305: 21038,
					39306: 21043,
					39307: 21049,
					39308: 21071,
					39309: 21060,
					39310: 21067,
					39311: 21068,
					39312: 21086,
					39313: 21076,
					39314: 21098,
					39315: 21108,
					39316: 21097,
					39317: 21107,
					39318: 21119,
					39319: 21117,
					39320: 21133,
					39321: 21140,
					39322: 21138,
					39323: 21105,
					39324: 21128,
					39325: 21137,
					39326: 36776,
					39327: 36775,
					39328: 21164,
					39329: 21165,
					39330: 21180,
					39331: 21173,
					39332: 21185,
					39333: 21197,
					39334: 21207,
					39335: 21214,
					39336: 21219,
					39337: 21222,
					39338: 39149,
					39339: 21216,
					39340: 21235,
					39341: 21237,
					39342: 21240,
					39343: 21241,
					39344: 21254,
					39345: 21256,
					39346: 30008,
					39347: 21261,
					39348: 21264,
					39349: 21263,
					39350: 21269,
					39351: 21274,
					39352: 21283,
					39353: 21295,
					39354: 21297,
					39355: 21299,
					39356: 21304,
					39357: 21312,
					39358: 21318,
					39359: 21317,
					39360: 19991,
					39361: 21321,
					39362: 21325,
					39363: 20950,
					39364: 21342,
					39365: 21353,
					39366: 21358,
					39367: 22808,
					39368: 21371,
					39369: 21367,
					39370: 21378,
					39371: 21398,
					39372: 21408,
					39373: 21414,
					39374: 21413,
					39375: 21422,
					39376: 21424,
					39377: 21430,
					39378: 21443,
					39379: 31762,
					39380: 38617,
					39381: 21471,
					39382: 26364,
					39383: 29166,
					39384: 21486,
					39385: 21480,
					39386: 21485,
					39387: 21498,
					39388: 21505,
					39389: 21565,
					39390: 21568,
					39391: 21548,
					39392: 21549,
					39393: 21564,
					39394: 21550,
					39395: 21558,
					39396: 21545,
					39397: 21533,
					39398: 21582,
					39399: 21647,
					39400: 21621,
					39401: 21646,
					39402: 21599,
					39403: 21617,
					39404: 21623,
					39405: 21616,
					39406: 21650,
					39407: 21627,
					39408: 21632,
					39409: 21622,
					39410: 21636,
					39411: 21648,
					39412: 21638,
					39413: 21703,
					39414: 21666,
					39415: 21688,
					39416: 21669,
					39417: 21676,
					39418: 21700,
					39419: 21704,
					39420: 21672,
					39488: 21675,
					39489: 21698,
					39490: 21668,
					39491: 21694,
					39492: 21692,
					39493: 21720,
					39494: 21733,
					39495: 21734,
					39496: 21775,
					39497: 21780,
					39498: 21757,
					39499: 21742,
					39500: 21741,
					39501: 21754,
					39502: 21730,
					39503: 21817,
					39504: 21824,
					39505: 21859,
					39506: 21836,
					39507: 21806,
					39508: 21852,
					39509: 21829,
					39510: 21846,
					39511: 21847,
					39512: 21816,
					39513: 21811,
					39514: 21853,
					39515: 21913,
					39516: 21888,
					39517: 21679,
					39518: 21898,
					39519: 21919,
					39520: 21883,
					39521: 21886,
					39522: 21912,
					39523: 21918,
					39524: 21934,
					39525: 21884,
					39526: 21891,
					39527: 21929,
					39528: 21895,
					39529: 21928,
					39530: 21978,
					39531: 21957,
					39532: 21983,
					39533: 21956,
					39534: 21980,
					39535: 21988,
					39536: 21972,
					39537: 22036,
					39538: 22007,
					39539: 22038,
					39540: 22014,
					39541: 22013,
					39542: 22043,
					39543: 22009,
					39544: 22094,
					39545: 22096,
					39546: 29151,
					39547: 22068,
					39548: 22070,
					39549: 22066,
					39550: 22072,
					39552: 22123,
					39553: 22116,
					39554: 22063,
					39555: 22124,
					39556: 22122,
					39557: 22150,
					39558: 22144,
					39559: 22154,
					39560: 22176,
					39561: 22164,
					39562: 22159,
					39563: 22181,
					39564: 22190,
					39565: 22198,
					39566: 22196,
					39567: 22210,
					39568: 22204,
					39569: 22209,
					39570: 22211,
					39571: 22208,
					39572: 22216,
					39573: 22222,
					39574: 22225,
					39575: 22227,
					39576: 22231,
					39577: 22254,
					39578: 22265,
					39579: 22272,
					39580: 22271,
					39581: 22276,
					39582: 22281,
					39583: 22280,
					39584: 22283,
					39585: 22285,
					39586: 22291,
					39587: 22296,
					39588: 22294,
					39589: 21959,
					39590: 22300,
					39591: 22310,
					39592: 22327,
					39593: 22328,
					39594: 22350,
					39595: 22331,
					39596: 22336,
					39597: 22351,
					39598: 22377,
					39599: 22464,
					39600: 22408,
					39601: 22369,
					39602: 22399,
					39603: 22409,
					39604: 22419,
					39605: 22432,
					39606: 22451,
					39607: 22436,
					39608: 22442,
					39609: 22448,
					39610: 22467,
					39611: 22470,
					39612: 22484,
					39613: 22482,
					39614: 22483,
					39615: 22538,
					39616: 22486,
					39617: 22499,
					39618: 22539,
					39619: 22553,
					39620: 22557,
					39621: 22642,
					39622: 22561,
					39623: 22626,
					39624: 22603,
					39625: 22640,
					39626: 27584,
					39627: 22610,
					39628: 22589,
					39629: 22649,
					39630: 22661,
					39631: 22713,
					39632: 22687,
					39633: 22699,
					39634: 22714,
					39635: 22750,
					39636: 22715,
					39637: 22712,
					39638: 22702,
					39639: 22725,
					39640: 22739,
					39641: 22737,
					39642: 22743,
					39643: 22745,
					39644: 22744,
					39645: 22757,
					39646: 22748,
					39647: 22756,
					39648: 22751,
					39649: 22767,
					39650: 22778,
					39651: 22777,
					39652: 22779,
					39653: 22780,
					39654: 22781,
					39655: 22786,
					39656: 22794,
					39657: 22800,
					39658: 22811,
					39659: 26790,
					39660: 22821,
					39661: 22828,
					39662: 22829,
					39663: 22834,
					39664: 22840,
					39665: 22846,
					39666: 31442,
					39667: 22869,
					39668: 22864,
					39669: 22862,
					39670: 22874,
					39671: 22872,
					39672: 22882,
					39673: 22880,
					39674: 22887,
					39675: 22892,
					39676: 22889,
					39744: 22904,
					39745: 22913,
					39746: 22941,
					39747: 20318,
					39748: 20395,
					39749: 22947,
					39750: 22962,
					39751: 22982,
					39752: 23016,
					39753: 23004,
					39754: 22925,
					39755: 23001,
					39756: 23002,
					39757: 23077,
					39758: 23071,
					39759: 23057,
					39760: 23068,
					39761: 23049,
					39762: 23066,
					39763: 23104,
					39764: 23148,
					39765: 23113,
					39766: 23093,
					39767: 23094,
					39768: 23138,
					39769: 23146,
					39770: 23194,
					39771: 23228,
					39772: 23230,
					39773: 23243,
					39774: 23234,
					39775: 23229,
					39776: 23267,
					39777: 23255,
					39778: 23270,
					39779: 23273,
					39780: 23254,
					39781: 23290,
					39782: 23291,
					39783: 23308,
					39784: 23307,
					39785: 23318,
					39786: 23346,
					39787: 23248,
					39788: 23338,
					39789: 23350,
					39790: 23358,
					39791: 23363,
					39792: 23365,
					39793: 23360,
					39794: 23377,
					39795: 23381,
					39796: 23386,
					39797: 23387,
					39798: 23397,
					39799: 23401,
					39800: 23408,
					39801: 23411,
					39802: 23413,
					39803: 23416,
					39804: 25992,
					39805: 23418,
					39806: 23424,
					39808: 23427,
					39809: 23462,
					39810: 23480,
					39811: 23491,
					39812: 23495,
					39813: 23497,
					39814: 23508,
					39815: 23504,
					39816: 23524,
					39817: 23526,
					39818: 23522,
					39819: 23518,
					39820: 23525,
					39821: 23531,
					39822: 23536,
					39823: 23542,
					39824: 23539,
					39825: 23557,
					39826: 23559,
					39827: 23560,
					39828: 23565,
					39829: 23571,
					39830: 23584,
					39831: 23586,
					39832: 23592,
					39833: 23608,
					39834: 23609,
					39835: 23617,
					39836: 23622,
					39837: 23630,
					39838: 23635,
					39839: 23632,
					39840: 23631,
					39841: 23409,
					39842: 23660,
					39843: 23662,
					39844: 20066,
					39845: 23670,
					39846: 23673,
					39847: 23692,
					39848: 23697,
					39849: 23700,
					39850: 22939,
					39851: 23723,
					39852: 23739,
					39853: 23734,
					39854: 23740,
					39855: 23735,
					39856: 23749,
					39857: 23742,
					39858: 23751,
					39859: 23769,
					39860: 23785,
					39861: 23805,
					39862: 23802,
					39863: 23789,
					39864: 23948,
					39865: 23786,
					39866: 23819,
					39867: 23829,
					39868: 23831,
					39869: 23900,
					39870: 23839,
					39871: 23835,
					39872: 23825,
					39873: 23828,
					39874: 23842,
					39875: 23834,
					39876: 23833,
					39877: 23832,
					39878: 23884,
					39879: 23890,
					39880: 23886,
					39881: 23883,
					39882: 23916,
					39883: 23923,
					39884: 23926,
					39885: 23943,
					39886: 23940,
					39887: 23938,
					39888: 23970,
					39889: 23965,
					39890: 23980,
					39891: 23982,
					39892: 23997,
					39893: 23952,
					39894: 23991,
					39895: 23996,
					39896: 24009,
					39897: 24013,
					39898: 24019,
					39899: 24018,
					39900: 24022,
					39901: 24027,
					39902: 24043,
					39903: 24050,
					39904: 24053,
					39905: 24075,
					39906: 24090,
					39907: 24089,
					39908: 24081,
					39909: 24091,
					39910: 24118,
					39911: 24119,
					39912: 24132,
					39913: 24131,
					39914: 24128,
					39915: 24142,
					39916: 24151,
					39917: 24148,
					39918: 24159,
					39919: 24162,
					39920: 24164,
					39921: 24135,
					39922: 24181,
					39923: 24182,
					39924: 24186,
					39925: 40636,
					39926: 24191,
					39927: 24224,
					39928: 24257,
					39929: 24258,
					39930: 24264,
					39931: 24272,
					39932: 24271,
					4e4: 24278,
					40001: 24291,
					40002: 24285,
					40003: 24282,
					40004: 24283,
					40005: 24290,
					40006: 24289,
					40007: 24296,
					40008: 24297,
					40009: 24300,
					40010: 24305,
					40011: 24307,
					40012: 24304,
					40013: 24308,
					40014: 24312,
					40015: 24318,
					40016: 24323,
					40017: 24329,
					40018: 24413,
					40019: 24412,
					40020: 24331,
					40021: 24337,
					40022: 24342,
					40023: 24361,
					40024: 24365,
					40025: 24376,
					40026: 24385,
					40027: 24392,
					40028: 24396,
					40029: 24398,
					40030: 24367,
					40031: 24401,
					40032: 24406,
					40033: 24407,
					40034: 24409,
					40035: 24417,
					40036: 24429,
					40037: 24435,
					40038: 24439,
					40039: 24451,
					40040: 24450,
					40041: 24447,
					40042: 24458,
					40043: 24456,
					40044: 24465,
					40045: 24455,
					40046: 24478,
					40047: 24473,
					40048: 24472,
					40049: 24480,
					40050: 24488,
					40051: 24493,
					40052: 24508,
					40053: 24534,
					40054: 24571,
					40055: 24548,
					40056: 24568,
					40057: 24561,
					40058: 24541,
					40059: 24755,
					40060: 24575,
					40061: 24609,
					40062: 24672,
					40064: 24601,
					40065: 24592,
					40066: 24617,
					40067: 24590,
					40068: 24625,
					40069: 24603,
					40070: 24597,
					40071: 24619,
					40072: 24614,
					40073: 24591,
					40074: 24634,
					40075: 24666,
					40076: 24641,
					40077: 24682,
					40078: 24695,
					40079: 24671,
					40080: 24650,
					40081: 24646,
					40082: 24653,
					40083: 24675,
					40084: 24643,
					40085: 24676,
					40086: 24642,
					40087: 24684,
					40088: 24683,
					40089: 24665,
					40090: 24705,
					40091: 24717,
					40092: 24807,
					40093: 24707,
					40094: 24730,
					40095: 24708,
					40096: 24731,
					40097: 24726,
					40098: 24727,
					40099: 24722,
					40100: 24743,
					40101: 24715,
					40102: 24801,
					40103: 24760,
					40104: 24800,
					40105: 24787,
					40106: 24756,
					40107: 24560,
					40108: 24765,
					40109: 24774,
					40110: 24757,
					40111: 24792,
					40112: 24909,
					40113: 24853,
					40114: 24838,
					40115: 24822,
					40116: 24823,
					40117: 24832,
					40118: 24820,
					40119: 24826,
					40120: 24835,
					40121: 24865,
					40122: 24827,
					40123: 24817,
					40124: 24845,
					40125: 24846,
					40126: 24903,
					40127: 24894,
					40128: 24872,
					40129: 24871,
					40130: 24906,
					40131: 24895,
					40132: 24892,
					40133: 24876,
					40134: 24884,
					40135: 24893,
					40136: 24898,
					40137: 24900,
					40138: 24947,
					40139: 24951,
					40140: 24920,
					40141: 24921,
					40142: 24922,
					40143: 24939,
					40144: 24948,
					40145: 24943,
					40146: 24933,
					40147: 24945,
					40148: 24927,
					40149: 24925,
					40150: 24915,
					40151: 24949,
					40152: 24985,
					40153: 24982,
					40154: 24967,
					40155: 25004,
					40156: 24980,
					40157: 24986,
					40158: 24970,
					40159: 24977,
					40160: 25003,
					40161: 25006,
					40162: 25036,
					40163: 25034,
					40164: 25033,
					40165: 25079,
					40166: 25032,
					40167: 25027,
					40168: 25030,
					40169: 25018,
					40170: 25035,
					40171: 32633,
					40172: 25037,
					40173: 25062,
					40174: 25059,
					40175: 25078,
					40176: 25082,
					40177: 25076,
					40178: 25087,
					40179: 25085,
					40180: 25084,
					40181: 25086,
					40182: 25088,
					40183: 25096,
					40184: 25097,
					40185: 25101,
					40186: 25100,
					40187: 25108,
					40188: 25115,
					40256: 25118,
					40257: 25121,
					40258: 25130,
					40259: 25134,
					40260: 25136,
					40261: 25138,
					40262: 25139,
					40263: 25153,
					40264: 25166,
					40265: 25182,
					40266: 25187,
					40267: 25179,
					40268: 25184,
					40269: 25192,
					40270: 25212,
					40271: 25218,
					40272: 25225,
					40273: 25214,
					40274: 25234,
					40275: 25235,
					40276: 25238,
					40277: 25300,
					40278: 25219,
					40279: 25236,
					40280: 25303,
					40281: 25297,
					40282: 25275,
					40283: 25295,
					40284: 25343,
					40285: 25286,
					40286: 25812,
					40287: 25288,
					40288: 25308,
					40289: 25292,
					40290: 25290,
					40291: 25282,
					40292: 25287,
					40293: 25243,
					40294: 25289,
					40295: 25356,
					40296: 25326,
					40297: 25329,
					40298: 25383,
					40299: 25346,
					40300: 25352,
					40301: 25327,
					40302: 25333,
					40303: 25424,
					40304: 25406,
					40305: 25421,
					40306: 25628,
					40307: 25423,
					40308: 25494,
					40309: 25486,
					40310: 25472,
					40311: 25515,
					40312: 25462,
					40313: 25507,
					40314: 25487,
					40315: 25481,
					40316: 25503,
					40317: 25525,
					40318: 25451,
					40320: 25449,
					40321: 25534,
					40322: 25577,
					40323: 25536,
					40324: 25542,
					40325: 25571,
					40326: 25545,
					40327: 25554,
					40328: 25590,
					40329: 25540,
					40330: 25622,
					40331: 25652,
					40332: 25606,
					40333: 25619,
					40334: 25638,
					40335: 25654,
					40336: 25885,
					40337: 25623,
					40338: 25640,
					40339: 25615,
					40340: 25703,
					40341: 25711,
					40342: 25718,
					40343: 25678,
					40344: 25898,
					40345: 25749,
					40346: 25747,
					40347: 25765,
					40348: 25769,
					40349: 25736,
					40350: 25788,
					40351: 25818,
					40352: 25810,
					40353: 25797,
					40354: 25799,
					40355: 25787,
					40356: 25816,
					40357: 25794,
					40358: 25841,
					40359: 25831,
					40360: 33289,
					40361: 25824,
					40362: 25825,
					40363: 25260,
					40364: 25827,
					40365: 25839,
					40366: 25900,
					40367: 25846,
					40368: 25844,
					40369: 25842,
					40370: 25850,
					40371: 25856,
					40372: 25853,
					40373: 25880,
					40374: 25884,
					40375: 25861,
					40376: 25892,
					40377: 25891,
					40378: 25899,
					40379: 25908,
					40380: 25909,
					40381: 25911,
					40382: 25910,
					40383: 25912,
					40384: 30027,
					40385: 25928,
					40386: 25942,
					40387: 25941,
					40388: 25933,
					40389: 25944,
					40390: 25950,
					40391: 25949,
					40392: 25970,
					40393: 25976,
					40394: 25986,
					40395: 25987,
					40396: 35722,
					40397: 26011,
					40398: 26015,
					40399: 26027,
					40400: 26039,
					40401: 26051,
					40402: 26054,
					40403: 26049,
					40404: 26052,
					40405: 26060,
					40406: 26066,
					40407: 26075,
					40408: 26073,
					40409: 26080,
					40410: 26081,
					40411: 26097,
					40412: 26482,
					40413: 26122,
					40414: 26115,
					40415: 26107,
					40416: 26483,
					40417: 26165,
					40418: 26166,
					40419: 26164,
					40420: 26140,
					40421: 26191,
					40422: 26180,
					40423: 26185,
					40424: 26177,
					40425: 26206,
					40426: 26205,
					40427: 26212,
					40428: 26215,
					40429: 26216,
					40430: 26207,
					40431: 26210,
					40432: 26224,
					40433: 26243,
					40434: 26248,
					40435: 26254,
					40436: 26249,
					40437: 26244,
					40438: 26264,
					40439: 26269,
					40440: 26305,
					40441: 26297,
					40442: 26313,
					40443: 26302,
					40444: 26300,
					40512: 26308,
					40513: 26296,
					40514: 26326,
					40515: 26330,
					40516: 26336,
					40517: 26175,
					40518: 26342,
					40519: 26345,
					40520: 26352,
					40521: 26357,
					40522: 26359,
					40523: 26383,
					40524: 26390,
					40525: 26398,
					40526: 26406,
					40527: 26407,
					40528: 38712,
					40529: 26414,
					40530: 26431,
					40531: 26422,
					40532: 26433,
					40533: 26424,
					40534: 26423,
					40535: 26438,
					40536: 26462,
					40537: 26464,
					40538: 26457,
					40539: 26467,
					40540: 26468,
					40541: 26505,
					40542: 26480,
					40543: 26537,
					40544: 26492,
					40545: 26474,
					40546: 26508,
					40547: 26507,
					40548: 26534,
					40549: 26529,
					40550: 26501,
					40551: 26551,
					40552: 26607,
					40553: 26548,
					40554: 26604,
					40555: 26547,
					40556: 26601,
					40557: 26552,
					40558: 26596,
					40559: 26590,
					40560: 26589,
					40561: 26594,
					40562: 26606,
					40563: 26553,
					40564: 26574,
					40565: 26566,
					40566: 26599,
					40567: 27292,
					40568: 26654,
					40569: 26694,
					40570: 26665,
					40571: 26688,
					40572: 26701,
					40573: 26674,
					40574: 26702,
					40576: 26803,
					40577: 26667,
					40578: 26713,
					40579: 26723,
					40580: 26743,
					40581: 26751,
					40582: 26783,
					40583: 26767,
					40584: 26797,
					40585: 26772,
					40586: 26781,
					40587: 26779,
					40588: 26755,
					40589: 27310,
					40590: 26809,
					40591: 26740,
					40592: 26805,
					40593: 26784,
					40594: 26810,
					40595: 26895,
					40596: 26765,
					40597: 26750,
					40598: 26881,
					40599: 26826,
					40600: 26888,
					40601: 26840,
					40602: 26914,
					40603: 26918,
					40604: 26849,
					40605: 26892,
					40606: 26829,
					40607: 26836,
					40608: 26855,
					40609: 26837,
					40610: 26934,
					40611: 26898,
					40612: 26884,
					40613: 26839,
					40614: 26851,
					40615: 26917,
					40616: 26873,
					40617: 26848,
					40618: 26863,
					40619: 26920,
					40620: 26922,
					40621: 26906,
					40622: 26915,
					40623: 26913,
					40624: 26822,
					40625: 27001,
					40626: 26999,
					40627: 26972,
					40628: 27e3,
					40629: 26987,
					40630: 26964,
					40631: 27006,
					40632: 26990,
					40633: 26937,
					40634: 26996,
					40635: 26941,
					40636: 26969,
					40637: 26928,
					40638: 26977,
					40639: 26974,
					40640: 26973,
					40641: 27009,
					40642: 26986,
					40643: 27058,
					40644: 27054,
					40645: 27088,
					40646: 27071,
					40647: 27073,
					40648: 27091,
					40649: 27070,
					40650: 27086,
					40651: 23528,
					40652: 27082,
					40653: 27101,
					40654: 27067,
					40655: 27075,
					40656: 27047,
					40657: 27182,
					40658: 27025,
					40659: 27040,
					40660: 27036,
					40661: 27029,
					40662: 27060,
					40663: 27102,
					40664: 27112,
					40665: 27138,
					40666: 27163,
					40667: 27135,
					40668: 27402,
					40669: 27129,
					40670: 27122,
					40671: 27111,
					40672: 27141,
					40673: 27057,
					40674: 27166,
					40675: 27117,
					40676: 27156,
					40677: 27115,
					40678: 27146,
					40679: 27154,
					40680: 27329,
					40681: 27171,
					40682: 27155,
					40683: 27204,
					40684: 27148,
					40685: 27250,
					40686: 27190,
					40687: 27256,
					40688: 27207,
					40689: 27234,
					40690: 27225,
					40691: 27238,
					40692: 27208,
					40693: 27192,
					40694: 27170,
					40695: 27280,
					40696: 27277,
					40697: 27296,
					40698: 27268,
					40699: 27298,
					40700: 27299,
					40768: 27287,
					40769: 34327,
					40770: 27323,
					40771: 27331,
					40772: 27330,
					40773: 27320,
					40774: 27315,
					40775: 27308,
					40776: 27358,
					40777: 27345,
					40778: 27359,
					40779: 27306,
					40780: 27354,
					40781: 27370,
					40782: 27387,
					40783: 27397,
					40784: 34326,
					40785: 27386,
					40786: 27410,
					40787: 27414,
					40788: 39729,
					40789: 27423,
					40790: 27448,
					40791: 27447,
					40792: 30428,
					40793: 27449,
					40794: 39150,
					40795: 27463,
					40796: 27459,
					40797: 27465,
					40798: 27472,
					40799: 27481,
					40800: 27476,
					40801: 27483,
					40802: 27487,
					40803: 27489,
					40804: 27512,
					40805: 27513,
					40806: 27519,
					40807: 27520,
					40808: 27524,
					40809: 27523,
					40810: 27533,
					40811: 27544,
					40812: 27541,
					40813: 27550,
					40814: 27556,
					40815: 27562,
					40816: 27563,
					40817: 27567,
					40818: 27570,
					40819: 27569,
					40820: 27571,
					40821: 27575,
					40822: 27580,
					40823: 27590,
					40824: 27595,
					40825: 27603,
					40826: 27615,
					40827: 27628,
					40828: 27627,
					40829: 27635,
					40830: 27631,
					40832: 40638,
					40833: 27656,
					40834: 27667,
					40835: 27668,
					40836: 27675,
					40837: 27684,
					40838: 27683,
					40839: 27742,
					40840: 27733,
					40841: 27746,
					40842: 27754,
					40843: 27778,
					40844: 27789,
					40845: 27802,
					40846: 27777,
					40847: 27803,
					40848: 27774,
					40849: 27752,
					40850: 27763,
					40851: 27794,
					40852: 27792,
					40853: 27844,
					40854: 27889,
					40855: 27859,
					40856: 27837,
					40857: 27863,
					40858: 27845,
					40859: 27869,
					40860: 27822,
					40861: 27825,
					40862: 27838,
					40863: 27834,
					40864: 27867,
					40865: 27887,
					40866: 27865,
					40867: 27882,
					40868: 27935,
					40869: 34893,
					40870: 27958,
					40871: 27947,
					40872: 27965,
					40873: 27960,
					40874: 27929,
					40875: 27957,
					40876: 27955,
					40877: 27922,
					40878: 27916,
					40879: 28003,
					40880: 28051,
					40881: 28004,
					40882: 27994,
					40883: 28025,
					40884: 27993,
					40885: 28046,
					40886: 28053,
					40887: 28644,
					40888: 28037,
					40889: 28153,
					40890: 28181,
					40891: 28170,
					40892: 28085,
					40893: 28103,
					40894: 28134,
					40895: 28088,
					40896: 28102,
					40897: 28140,
					40898: 28126,
					40899: 28108,
					40900: 28136,
					40901: 28114,
					40902: 28101,
					40903: 28154,
					40904: 28121,
					40905: 28132,
					40906: 28117,
					40907: 28138,
					40908: 28142,
					40909: 28205,
					40910: 28270,
					40911: 28206,
					40912: 28185,
					40913: 28274,
					40914: 28255,
					40915: 28222,
					40916: 28195,
					40917: 28267,
					40918: 28203,
					40919: 28278,
					40920: 28237,
					40921: 28191,
					40922: 28227,
					40923: 28218,
					40924: 28238,
					40925: 28196,
					40926: 28415,
					40927: 28189,
					40928: 28216,
					40929: 28290,
					40930: 28330,
					40931: 28312,
					40932: 28361,
					40933: 28343,
					40934: 28371,
					40935: 28349,
					40936: 28335,
					40937: 28356,
					40938: 28338,
					40939: 28372,
					40940: 28373,
					40941: 28303,
					40942: 28325,
					40943: 28354,
					40944: 28319,
					40945: 28481,
					40946: 28433,
					40947: 28748,
					40948: 28396,
					40949: 28408,
					40950: 28414,
					40951: 28479,
					40952: 28402,
					40953: 28465,
					40954: 28399,
					40955: 28466,
					40956: 28364,
					161: 65377,
					162: 65378,
					163: 65379,
					164: 65380,
					165: 65381,
					166: 65382,
					167: 65383,
					168: 65384,
					169: 65385,
					170: 65386,
					171: 65387,
					172: 65388,
					173: 65389,
					174: 65390,
					175: 65391,
					176: 65392,
					177: 65393,
					178: 65394,
					179: 65395,
					180: 65396,
					181: 65397,
					182: 65398,
					183: 65399,
					184: 65400,
					185: 65401,
					186: 65402,
					187: 65403,
					188: 65404,
					189: 65405,
					190: 65406,
					191: 65407,
					192: 65408,
					193: 65409,
					194: 65410,
					195: 65411,
					196: 65412,
					197: 65413,
					198: 65414,
					199: 65415,
					200: 65416,
					201: 65417,
					202: 65418,
					203: 65419,
					204: 65420,
					205: 65421,
					206: 65422,
					207: 65423,
					208: 65424,
					209: 65425,
					210: 65426,
					211: 65427,
					212: 65428,
					213: 65429,
					214: 65430,
					215: 65431,
					216: 65432,
					217: 65433,
					218: 65434,
					219: 65435,
					220: 65436,
					221: 65437,
					222: 65438,
					223: 65439,
					57408: 28478,
					57409: 28435,
					57410: 28407,
					57411: 28550,
					57412: 28538,
					57413: 28536,
					57414: 28545,
					57415: 28544,
					57416: 28527,
					57417: 28507,
					57418: 28659,
					57419: 28525,
					57420: 28546,
					57421: 28540,
					57422: 28504,
					57423: 28558,
					57424: 28561,
					57425: 28610,
					57426: 28518,
					57427: 28595,
					57428: 28579,
					57429: 28577,
					57430: 28580,
					57431: 28601,
					57432: 28614,
					57433: 28586,
					57434: 28639,
					57435: 28629,
					57436: 28652,
					57437: 28628,
					57438: 28632,
					57439: 28657,
					57440: 28654,
					57441: 28635,
					57442: 28681,
					57443: 28683,
					57444: 28666,
					57445: 28689,
					57446: 28673,
					57447: 28687,
					57448: 28670,
					57449: 28699,
					57450: 28698,
					57451: 28532,
					57452: 28701,
					57453: 28696,
					57454: 28703,
					57455: 28720,
					57456: 28734,
					57457: 28722,
					57458: 28753,
					57459: 28771,
					57460: 28825,
					57461: 28818,
					57462: 28847,
					57463: 28913,
					57464: 28844,
					57465: 28856,
					57466: 28851,
					57467: 28846,
					57468: 28895,
					57469: 28875,
					57470: 28893,
					57472: 28889,
					57473: 28937,
					57474: 28925,
					57475: 28956,
					57476: 28953,
					57477: 29029,
					57478: 29013,
					57479: 29064,
					57480: 29030,
					57481: 29026,
					57482: 29004,
					57483: 29014,
					57484: 29036,
					57485: 29071,
					57486: 29179,
					57487: 29060,
					57488: 29077,
					57489: 29096,
					57490: 29100,
					57491: 29143,
					57492: 29113,
					57493: 29118,
					57494: 29138,
					57495: 29129,
					57496: 29140,
					57497: 29134,
					57498: 29152,
					57499: 29164,
					57500: 29159,
					57501: 29173,
					57502: 29180,
					57503: 29177,
					57504: 29183,
					57505: 29197,
					57506: 29200,
					57507: 29211,
					57508: 29224,
					57509: 29229,
					57510: 29228,
					57511: 29232,
					57512: 29234,
					57513: 29243,
					57514: 29244,
					57515: 29247,
					57516: 29248,
					57517: 29254,
					57518: 29259,
					57519: 29272,
					57520: 29300,
					57521: 29310,
					57522: 29314,
					57523: 29313,
					57524: 29319,
					57525: 29330,
					57526: 29334,
					57527: 29346,
					57528: 29351,
					57529: 29369,
					57530: 29362,
					57531: 29379,
					57532: 29382,
					57533: 29380,
					57534: 29390,
					57535: 29394,
					57536: 29410,
					57537: 29408,
					57538: 29409,
					57539: 29433,
					57540: 29431,
					57541: 20495,
					57542: 29463,
					57543: 29450,
					57544: 29468,
					57545: 29462,
					57546: 29469,
					57547: 29492,
					57548: 29487,
					57549: 29481,
					57550: 29477,
					57551: 29502,
					57552: 29518,
					57553: 29519,
					57554: 40664,
					57555: 29527,
					57556: 29546,
					57557: 29544,
					57558: 29552,
					57559: 29560,
					57560: 29557,
					57561: 29563,
					57562: 29562,
					57563: 29640,
					57564: 29619,
					57565: 29646,
					57566: 29627,
					57567: 29632,
					57568: 29669,
					57569: 29678,
					57570: 29662,
					57571: 29858,
					57572: 29701,
					57573: 29807,
					57574: 29733,
					57575: 29688,
					57576: 29746,
					57577: 29754,
					57578: 29781,
					57579: 29759,
					57580: 29791,
					57581: 29785,
					57582: 29761,
					57583: 29788,
					57584: 29801,
					57585: 29808,
					57586: 29795,
					57587: 29802,
					57588: 29814,
					57589: 29822,
					57590: 29835,
					57591: 29854,
					57592: 29863,
					57593: 29898,
					57594: 29903,
					57595: 29908,
					57596: 29681,
					57664: 29920,
					57665: 29923,
					57666: 29927,
					57667: 29929,
					57668: 29934,
					57669: 29938,
					57670: 29936,
					57671: 29937,
					57672: 29944,
					57673: 29943,
					57674: 29956,
					57675: 29955,
					57676: 29957,
					57677: 29964,
					57678: 29966,
					57679: 29965,
					57680: 29973,
					57681: 29971,
					57682: 29982,
					57683: 29990,
					57684: 29996,
					57685: 30012,
					57686: 30020,
					57687: 30029,
					57688: 30026,
					57689: 30025,
					57690: 30043,
					57691: 30022,
					57692: 30042,
					57693: 30057,
					57694: 30052,
					57695: 30055,
					57696: 30059,
					57697: 30061,
					57698: 30072,
					57699: 30070,
					57700: 30086,
					57701: 30087,
					57702: 30068,
					57703: 30090,
					57704: 30089,
					57705: 30082,
					57706: 30100,
					57707: 30106,
					57708: 30109,
					57709: 30117,
					57710: 30115,
					57711: 30146,
					57712: 30131,
					57713: 30147,
					57714: 30133,
					57715: 30141,
					57716: 30136,
					57717: 30140,
					57718: 30129,
					57719: 30157,
					57720: 30154,
					57721: 30162,
					57722: 30169,
					57723: 30179,
					57724: 30174,
					57725: 30206,
					57726: 30207,
					57728: 30204,
					57729: 30209,
					57730: 30192,
					57731: 30202,
					57732: 30194,
					57733: 30195,
					57734: 30219,
					57735: 30221,
					57736: 30217,
					57737: 30239,
					57738: 30247,
					57739: 30240,
					57740: 30241,
					57741: 30242,
					57742: 30244,
					57743: 30260,
					57744: 30256,
					57745: 30267,
					57746: 30279,
					57747: 30280,
					57748: 30278,
					57749: 30300,
					57750: 30296,
					57751: 30305,
					57752: 30306,
					57753: 30312,
					57754: 30313,
					57755: 30314,
					57756: 30311,
					57757: 30316,
					57758: 30320,
					57759: 30322,
					57760: 30326,
					57761: 30328,
					57762: 30332,
					57763: 30336,
					57764: 30339,
					57765: 30344,
					57766: 30347,
					57767: 30350,
					57768: 30358,
					57769: 30355,
					57770: 30361,
					57771: 30362,
					57772: 30384,
					57773: 30388,
					57774: 30392,
					57775: 30393,
					57776: 30394,
					57777: 30402,
					57778: 30413,
					57779: 30422,
					57780: 30418,
					57781: 30430,
					57782: 30433,
					57783: 30437,
					57784: 30439,
					57785: 30442,
					57786: 34351,
					57787: 30459,
					57788: 30472,
					57789: 30471,
					57790: 30468,
					57791: 30505,
					57792: 30500,
					57793: 30494,
					57794: 30501,
					57795: 30502,
					57796: 30491,
					57797: 30519,
					57798: 30520,
					57799: 30535,
					57800: 30554,
					57801: 30568,
					57802: 30571,
					57803: 30555,
					57804: 30565,
					57805: 30591,
					57806: 30590,
					57807: 30585,
					57808: 30606,
					57809: 30603,
					57810: 30609,
					57811: 30624,
					57812: 30622,
					57813: 30640,
					57814: 30646,
					57815: 30649,
					57816: 30655,
					57817: 30652,
					57818: 30653,
					57819: 30651,
					57820: 30663,
					57821: 30669,
					57822: 30679,
					57823: 30682,
					57824: 30684,
					57825: 30691,
					57826: 30702,
					57827: 30716,
					57828: 30732,
					57829: 30738,
					57830: 31014,
					57831: 30752,
					57832: 31018,
					57833: 30789,
					57834: 30862,
					57835: 30836,
					57836: 30854,
					57837: 30844,
					57838: 30874,
					57839: 30860,
					57840: 30883,
					57841: 30901,
					57842: 30890,
					57843: 30895,
					57844: 30929,
					57845: 30918,
					57846: 30923,
					57847: 30932,
					57848: 30910,
					57849: 30908,
					57850: 30917,
					57851: 30922,
					57852: 30956,
					57920: 30951,
					57921: 30938,
					57922: 30973,
					57923: 30964,
					57924: 30983,
					57925: 30994,
					57926: 30993,
					57927: 31001,
					57928: 31020,
					57929: 31019,
					57930: 31040,
					57931: 31072,
					57932: 31063,
					57933: 31071,
					57934: 31066,
					57935: 31061,
					57936: 31059,
					57937: 31098,
					57938: 31103,
					57939: 31114,
					57940: 31133,
					57941: 31143,
					57942: 40779,
					57943: 31146,
					57944: 31150,
					57945: 31155,
					57946: 31161,
					57947: 31162,
					57948: 31177,
					57949: 31189,
					57950: 31207,
					57951: 31212,
					57952: 31201,
					57953: 31203,
					57954: 31240,
					57955: 31245,
					57956: 31256,
					57957: 31257,
					57958: 31264,
					57959: 31263,
					57960: 31104,
					57961: 31281,
					57962: 31291,
					57963: 31294,
					57964: 31287,
					57965: 31299,
					57966: 31319,
					57967: 31305,
					57968: 31329,
					57969: 31330,
					57970: 31337,
					57971: 40861,
					57972: 31344,
					57973: 31353,
					57974: 31357,
					57975: 31368,
					57976: 31383,
					57977: 31381,
					57978: 31384,
					57979: 31382,
					57980: 31401,
					57981: 31432,
					57982: 31408,
					57984: 31414,
					57985: 31429,
					57986: 31428,
					57987: 31423,
					57988: 36995,
					57989: 31431,
					57990: 31434,
					57991: 31437,
					57992: 31439,
					57993: 31445,
					57994: 31443,
					57995: 31449,
					57996: 31450,
					57997: 31453,
					57998: 31457,
					57999: 31458,
					58e3: 31462,
					58001: 31469,
					58002: 31472,
					58003: 31490,
					58004: 31503,
					58005: 31498,
					58006: 31494,
					58007: 31539,
					58008: 31512,
					58009: 31513,
					58010: 31518,
					58011: 31541,
					58012: 31528,
					58013: 31542,
					58014: 31568,
					58015: 31610,
					58016: 31492,
					58017: 31565,
					58018: 31499,
					58019: 31564,
					58020: 31557,
					58021: 31605,
					58022: 31589,
					58023: 31604,
					58024: 31591,
					58025: 31600,
					58026: 31601,
					58027: 31596,
					58028: 31598,
					58029: 31645,
					58030: 31640,
					58031: 31647,
					58032: 31629,
					58033: 31644,
					58034: 31642,
					58035: 31627,
					58036: 31634,
					58037: 31631,
					58038: 31581,
					58039: 31641,
					58040: 31691,
					58041: 31681,
					58042: 31692,
					58043: 31695,
					58044: 31668,
					58045: 31686,
					58046: 31709,
					58047: 31721,
					58048: 31761,
					58049: 31764,
					58050: 31718,
					58051: 31717,
					58052: 31840,
					58053: 31744,
					58054: 31751,
					58055: 31763,
					58056: 31731,
					58057: 31735,
					58058: 31767,
					58059: 31757,
					58060: 31734,
					58061: 31779,
					58062: 31783,
					58063: 31786,
					58064: 31775,
					58065: 31799,
					58066: 31787,
					58067: 31805,
					58068: 31820,
					58069: 31811,
					58070: 31828,
					58071: 31823,
					58072: 31808,
					58073: 31824,
					58074: 31832,
					58075: 31839,
					58076: 31844,
					58077: 31830,
					58078: 31845,
					58079: 31852,
					58080: 31861,
					58081: 31875,
					58082: 31888,
					58083: 31908,
					58084: 31917,
					58085: 31906,
					58086: 31915,
					58087: 31905,
					58088: 31912,
					58089: 31923,
					58090: 31922,
					58091: 31921,
					58092: 31918,
					58093: 31929,
					58094: 31933,
					58095: 31936,
					58096: 31941,
					58097: 31938,
					58098: 31960,
					58099: 31954,
					58100: 31964,
					58101: 31970,
					58102: 39739,
					58103: 31983,
					58104: 31986,
					58105: 31988,
					58106: 31990,
					58107: 31994,
					58108: 32006,
					58176: 32002,
					58177: 32028,
					58178: 32021,
					58179: 32010,
					58180: 32069,
					58181: 32075,
					58182: 32046,
					58183: 32050,
					58184: 32063,
					58185: 32053,
					58186: 32070,
					58187: 32115,
					58188: 32086,
					58189: 32078,
					58190: 32114,
					58191: 32104,
					58192: 32110,
					58193: 32079,
					58194: 32099,
					58195: 32147,
					58196: 32137,
					58197: 32091,
					58198: 32143,
					58199: 32125,
					58200: 32155,
					58201: 32186,
					58202: 32174,
					58203: 32163,
					58204: 32181,
					58205: 32199,
					58206: 32189,
					58207: 32171,
					58208: 32317,
					58209: 32162,
					58210: 32175,
					58211: 32220,
					58212: 32184,
					58213: 32159,
					58214: 32176,
					58215: 32216,
					58216: 32221,
					58217: 32228,
					58218: 32222,
					58219: 32251,
					58220: 32242,
					58221: 32225,
					58222: 32261,
					58223: 32266,
					58224: 32291,
					58225: 32289,
					58226: 32274,
					58227: 32305,
					58228: 32287,
					58229: 32265,
					58230: 32267,
					58231: 32290,
					58232: 32326,
					58233: 32358,
					58234: 32315,
					58235: 32309,
					58236: 32313,
					58237: 32323,
					58238: 32311,
					58240: 32306,
					58241: 32314,
					58242: 32359,
					58243: 32349,
					58244: 32342,
					58245: 32350,
					58246: 32345,
					58247: 32346,
					58248: 32377,
					58249: 32362,
					58250: 32361,
					58251: 32380,
					58252: 32379,
					58253: 32387,
					58254: 32213,
					58255: 32381,
					58256: 36782,
					58257: 32383,
					58258: 32392,
					58259: 32393,
					58260: 32396,
					58261: 32402,
					58262: 32400,
					58263: 32403,
					58264: 32404,
					58265: 32406,
					58266: 32398,
					58267: 32411,
					58268: 32412,
					58269: 32568,
					58270: 32570,
					58271: 32581,
					58272: 32588,
					58273: 32589,
					58274: 32590,
					58275: 32592,
					58276: 32593,
					58277: 32597,
					58278: 32596,
					58279: 32600,
					58280: 32607,
					58281: 32608,
					58282: 32616,
					58283: 32617,
					58284: 32615,
					58285: 32632,
					58286: 32642,
					58287: 32646,
					58288: 32643,
					58289: 32648,
					58290: 32647,
					58291: 32652,
					58292: 32660,
					58293: 32670,
					58294: 32669,
					58295: 32666,
					58296: 32675,
					58297: 32687,
					58298: 32690,
					58299: 32697,
					58300: 32686,
					58301: 32694,
					58302: 32696,
					58303: 35697,
					58304: 32709,
					58305: 32710,
					58306: 32714,
					58307: 32725,
					58308: 32724,
					58309: 32737,
					58310: 32742,
					58311: 32745,
					58312: 32755,
					58313: 32761,
					58314: 39132,
					58315: 32774,
					58316: 32772,
					58317: 32779,
					58318: 32786,
					58319: 32792,
					58320: 32793,
					58321: 32796,
					58322: 32801,
					58323: 32808,
					58324: 32831,
					58325: 32827,
					58326: 32842,
					58327: 32838,
					58328: 32850,
					58329: 32856,
					58330: 32858,
					58331: 32863,
					58332: 32866,
					58333: 32872,
					58334: 32883,
					58335: 32882,
					58336: 32880,
					58337: 32886,
					58338: 32889,
					58339: 32893,
					58340: 32895,
					58341: 32900,
					58342: 32902,
					58343: 32901,
					58344: 32923,
					58345: 32915,
					58346: 32922,
					58347: 32941,
					58348: 20880,
					58349: 32940,
					58350: 32987,
					58351: 32997,
					58352: 32985,
					58353: 32989,
					58354: 32964,
					58355: 32986,
					58356: 32982,
					58357: 33033,
					58358: 33007,
					58359: 33009,
					58360: 33051,
					58361: 33065,
					58362: 33059,
					58363: 33071,
					58364: 33099,
					58432: 38539,
					58433: 33094,
					58434: 33086,
					58435: 33107,
					58436: 33105,
					58437: 33020,
					58438: 33137,
					58439: 33134,
					58440: 33125,
					58441: 33126,
					58442: 33140,
					58443: 33155,
					58444: 33160,
					58445: 33162,
					58446: 33152,
					58447: 33154,
					58448: 33184,
					58449: 33173,
					58450: 33188,
					58451: 33187,
					58452: 33119,
					58453: 33171,
					58454: 33193,
					58455: 33200,
					58456: 33205,
					58457: 33214,
					58458: 33208,
					58459: 33213,
					58460: 33216,
					58461: 33218,
					58462: 33210,
					58463: 33225,
					58464: 33229,
					58465: 33233,
					58466: 33241,
					58467: 33240,
					58468: 33224,
					58469: 33242,
					58470: 33247,
					58471: 33248,
					58472: 33255,
					58473: 33274,
					58474: 33275,
					58475: 33278,
					58476: 33281,
					58477: 33282,
					58478: 33285,
					58479: 33287,
					58480: 33290,
					58481: 33293,
					58482: 33296,
					58483: 33302,
					58484: 33321,
					58485: 33323,
					58486: 33336,
					58487: 33331,
					58488: 33344,
					58489: 33369,
					58490: 33368,
					58491: 33373,
					58492: 33370,
					58493: 33375,
					58494: 33380,
					58496: 33378,
					58497: 33384,
					58498: 33386,
					58499: 33387,
					58500: 33326,
					58501: 33393,
					58502: 33399,
					58503: 33400,
					58504: 33406,
					58505: 33421,
					58506: 33426,
					58507: 33451,
					58508: 33439,
					58509: 33467,
					58510: 33452,
					58511: 33505,
					58512: 33507,
					58513: 33503,
					58514: 33490,
					58515: 33524,
					58516: 33523,
					58517: 33530,
					58518: 33683,
					58519: 33539,
					58520: 33531,
					58521: 33529,
					58522: 33502,
					58523: 33542,
					58524: 33500,
					58525: 33545,
					58526: 33497,
					58527: 33589,
					58528: 33588,
					58529: 33558,
					58530: 33586,
					58531: 33585,
					58532: 33600,
					58533: 33593,
					58534: 33616,
					58535: 33605,
					58536: 33583,
					58537: 33579,
					58538: 33559,
					58539: 33560,
					58540: 33669,
					58541: 33690,
					58542: 33706,
					58543: 33695,
					58544: 33698,
					58545: 33686,
					58546: 33571,
					58547: 33678,
					58548: 33671,
					58549: 33674,
					58550: 33660,
					58551: 33717,
					58552: 33651,
					58553: 33653,
					58554: 33696,
					58555: 33673,
					58556: 33704,
					58557: 33780,
					58558: 33811,
					58559: 33771,
					58560: 33742,
					58561: 33789,
					58562: 33795,
					58563: 33752,
					58564: 33803,
					58565: 33729,
					58566: 33783,
					58567: 33799,
					58568: 33760,
					58569: 33778,
					58570: 33805,
					58571: 33826,
					58572: 33824,
					58573: 33725,
					58574: 33848,
					58575: 34054,
					58576: 33787,
					58577: 33901,
					58578: 33834,
					58579: 33852,
					58580: 34138,
					58581: 33924,
					58582: 33911,
					58583: 33899,
					58584: 33965,
					58585: 33902,
					58586: 33922,
					58587: 33897,
					58588: 33862,
					58589: 33836,
					58590: 33903,
					58591: 33913,
					58592: 33845,
					58593: 33994,
					58594: 33890,
					58595: 33977,
					58596: 33983,
					58597: 33951,
					58598: 34009,
					58599: 33997,
					58600: 33979,
					58601: 34010,
					58602: 34e3,
					58603: 33985,
					58604: 33990,
					58605: 34006,
					58606: 33953,
					58607: 34081,
					58608: 34047,
					58609: 34036,
					58610: 34071,
					58611: 34072,
					58612: 34092,
					58613: 34079,
					58614: 34069,
					58615: 34068,
					58616: 34044,
					58617: 34112,
					58618: 34147,
					58619: 34136,
					58620: 34120,
					58688: 34113,
					58689: 34306,
					58690: 34123,
					58691: 34133,
					58692: 34176,
					58693: 34212,
					58694: 34184,
					58695: 34193,
					58696: 34186,
					58697: 34216,
					58698: 34157,
					58699: 34196,
					58700: 34203,
					58701: 34282,
					58702: 34183,
					58703: 34204,
					58704: 34167,
					58705: 34174,
					58706: 34192,
					58707: 34249,
					58708: 34234,
					58709: 34255,
					58710: 34233,
					58711: 34256,
					58712: 34261,
					58713: 34269,
					58714: 34277,
					58715: 34268,
					58716: 34297,
					58717: 34314,
					58718: 34323,
					58719: 34315,
					58720: 34302,
					58721: 34298,
					58722: 34310,
					58723: 34338,
					58724: 34330,
					58725: 34352,
					58726: 34367,
					58727: 34381,
					58728: 20053,
					58729: 34388,
					58730: 34399,
					58731: 34407,
					58732: 34417,
					58733: 34451,
					58734: 34467,
					58735: 34473,
					58736: 34474,
					58737: 34443,
					58738: 34444,
					58739: 34486,
					58740: 34479,
					58741: 34500,
					58742: 34502,
					58743: 34480,
					58744: 34505,
					58745: 34851,
					58746: 34475,
					58747: 34516,
					58748: 34526,
					58749: 34537,
					58750: 34540,
					58752: 34527,
					58753: 34523,
					58754: 34543,
					58755: 34578,
					58756: 34566,
					58757: 34568,
					58758: 34560,
					58759: 34563,
					58760: 34555,
					58761: 34577,
					58762: 34569,
					58763: 34573,
					58764: 34553,
					58765: 34570,
					58766: 34612,
					58767: 34623,
					58768: 34615,
					58769: 34619,
					58770: 34597,
					58771: 34601,
					58772: 34586,
					58773: 34656,
					58774: 34655,
					58775: 34680,
					58776: 34636,
					58777: 34638,
					58778: 34676,
					58779: 34647,
					58780: 34664,
					58781: 34670,
					58782: 34649,
					58783: 34643,
					58784: 34659,
					58785: 34666,
					58786: 34821,
					58787: 34722,
					58788: 34719,
					58789: 34690,
					58790: 34735,
					58791: 34763,
					58792: 34749,
					58793: 34752,
					58794: 34768,
					58795: 38614,
					58796: 34731,
					58797: 34756,
					58798: 34739,
					58799: 34759,
					58800: 34758,
					58801: 34747,
					58802: 34799,
					58803: 34802,
					58804: 34784,
					58805: 34831,
					58806: 34829,
					58807: 34814,
					58808: 34806,
					58809: 34807,
					58810: 34830,
					58811: 34770,
					58812: 34833,
					58813: 34838,
					58814: 34837,
					58815: 34850,
					58816: 34849,
					58817: 34865,
					58818: 34870,
					58819: 34873,
					58820: 34855,
					58821: 34875,
					58822: 34884,
					58823: 34882,
					58824: 34898,
					58825: 34905,
					58826: 34910,
					58827: 34914,
					58828: 34923,
					58829: 34945,
					58830: 34942,
					58831: 34974,
					58832: 34933,
					58833: 34941,
					58834: 34997,
					58835: 34930,
					58836: 34946,
					58837: 34967,
					58838: 34962,
					58839: 34990,
					58840: 34969,
					58841: 34978,
					58842: 34957,
					58843: 34980,
					58844: 34992,
					58845: 35007,
					58846: 34993,
					58847: 35011,
					58848: 35012,
					58849: 35028,
					58850: 35032,
					58851: 35033,
					58852: 35037,
					58853: 35065,
					58854: 35074,
					58855: 35068,
					58856: 35060,
					58857: 35048,
					58858: 35058,
					58859: 35076,
					58860: 35084,
					58861: 35082,
					58862: 35091,
					58863: 35139,
					58864: 35102,
					58865: 35109,
					58866: 35114,
					58867: 35115,
					58868: 35137,
					58869: 35140,
					58870: 35131,
					58871: 35126,
					58872: 35128,
					58873: 35148,
					58874: 35101,
					58875: 35168,
					58876: 35166,
					58944: 35174,
					58945: 35172,
					58946: 35181,
					58947: 35178,
					58948: 35183,
					58949: 35188,
					58950: 35191,
					58951: 35198,
					58952: 35203,
					58953: 35208,
					58954: 35210,
					58955: 35219,
					58956: 35224,
					58957: 35233,
					58958: 35241,
					58959: 35238,
					58960: 35244,
					58961: 35247,
					58962: 35250,
					58963: 35258,
					58964: 35261,
					58965: 35263,
					58966: 35264,
					58967: 35290,
					58968: 35292,
					58969: 35293,
					58970: 35303,
					58971: 35316,
					58972: 35320,
					58973: 35331,
					58974: 35350,
					58975: 35344,
					58976: 35340,
					58977: 35355,
					58978: 35357,
					58979: 35365,
					58980: 35382,
					58981: 35393,
					58982: 35419,
					58983: 35410,
					58984: 35398,
					58985: 35400,
					58986: 35452,
					58987: 35437,
					58988: 35436,
					58989: 35426,
					58990: 35461,
					58991: 35458,
					58992: 35460,
					58993: 35496,
					58994: 35489,
					58995: 35473,
					58996: 35493,
					58997: 35494,
					58998: 35482,
					58999: 35491,
					59e3: 35524,
					59001: 35533,
					59002: 35522,
					59003: 35546,
					59004: 35563,
					59005: 35571,
					59006: 35559,
					59008: 35556,
					59009: 35569,
					59010: 35604,
					59011: 35552,
					59012: 35554,
					59013: 35575,
					59014: 35550,
					59015: 35547,
					59016: 35596,
					59017: 35591,
					59018: 35610,
					59019: 35553,
					59020: 35606,
					59021: 35600,
					59022: 35607,
					59023: 35616,
					59024: 35635,
					59025: 38827,
					59026: 35622,
					59027: 35627,
					59028: 35646,
					59029: 35624,
					59030: 35649,
					59031: 35660,
					59032: 35663,
					59033: 35662,
					59034: 35657,
					59035: 35670,
					59036: 35675,
					59037: 35674,
					59038: 35691,
					59039: 35679,
					59040: 35692,
					59041: 35695,
					59042: 35700,
					59043: 35709,
					59044: 35712,
					59045: 35724,
					59046: 35726,
					59047: 35730,
					59048: 35731,
					59049: 35734,
					59050: 35737,
					59051: 35738,
					59052: 35898,
					59053: 35905,
					59054: 35903,
					59055: 35912,
					59056: 35916,
					59057: 35918,
					59058: 35920,
					59059: 35925,
					59060: 35938,
					59061: 35948,
					59062: 35960,
					59063: 35962,
					59064: 35970,
					59065: 35977,
					59066: 35973,
					59067: 35978,
					59068: 35981,
					59069: 35982,
					59070: 35988,
					59071: 35964,
					59072: 35992,
					59073: 25117,
					59074: 36013,
					59075: 36010,
					59076: 36029,
					59077: 36018,
					59078: 36019,
					59079: 36014,
					59080: 36022,
					59081: 36040,
					59082: 36033,
					59083: 36068,
					59084: 36067,
					59085: 36058,
					59086: 36093,
					59087: 36090,
					59088: 36091,
					59089: 36100,
					59090: 36101,
					59091: 36106,
					59092: 36103,
					59093: 36111,
					59094: 36109,
					59095: 36112,
					59096: 40782,
					59097: 36115,
					59098: 36045,
					59099: 36116,
					59100: 36118,
					59101: 36199,
					59102: 36205,
					59103: 36209,
					59104: 36211,
					59105: 36225,
					59106: 36249,
					59107: 36290,
					59108: 36286,
					59109: 36282,
					59110: 36303,
					59111: 36314,
					59112: 36310,
					59113: 36300,
					59114: 36315,
					59115: 36299,
					59116: 36330,
					59117: 36331,
					59118: 36319,
					59119: 36323,
					59120: 36348,
					59121: 36360,
					59122: 36361,
					59123: 36351,
					59124: 36381,
					59125: 36382,
					59126: 36368,
					59127: 36383,
					59128: 36418,
					59129: 36405,
					59130: 36400,
					59131: 36404,
					59132: 36426,
					59200: 36423,
					59201: 36425,
					59202: 36428,
					59203: 36432,
					59204: 36424,
					59205: 36441,
					59206: 36452,
					59207: 36448,
					59208: 36394,
					59209: 36451,
					59210: 36437,
					59211: 36470,
					59212: 36466,
					59213: 36476,
					59214: 36481,
					59215: 36487,
					59216: 36485,
					59217: 36484,
					59218: 36491,
					59219: 36490,
					59220: 36499,
					59221: 36497,
					59222: 36500,
					59223: 36505,
					59224: 36522,
					59225: 36513,
					59226: 36524,
					59227: 36528,
					59228: 36550,
					59229: 36529,
					59230: 36542,
					59231: 36549,
					59232: 36552,
					59233: 36555,
					59234: 36571,
					59235: 36579,
					59236: 36604,
					59237: 36603,
					59238: 36587,
					59239: 36606,
					59240: 36618,
					59241: 36613,
					59242: 36629,
					59243: 36626,
					59244: 36633,
					59245: 36627,
					59246: 36636,
					59247: 36639,
					59248: 36635,
					59249: 36620,
					59250: 36646,
					59251: 36659,
					59252: 36667,
					59253: 36665,
					59254: 36677,
					59255: 36674,
					59256: 36670,
					59257: 36684,
					59258: 36681,
					59259: 36678,
					59260: 36686,
					59261: 36695,
					59262: 36700,
					59264: 36706,
					59265: 36707,
					59266: 36708,
					59267: 36764,
					59268: 36767,
					59269: 36771,
					59270: 36781,
					59271: 36783,
					59272: 36791,
					59273: 36826,
					59274: 36837,
					59275: 36834,
					59276: 36842,
					59277: 36847,
					59278: 36999,
					59279: 36852,
					59280: 36869,
					59281: 36857,
					59282: 36858,
					59283: 36881,
					59284: 36885,
					59285: 36897,
					59286: 36877,
					59287: 36894,
					59288: 36886,
					59289: 36875,
					59290: 36903,
					59291: 36918,
					59292: 36917,
					59293: 36921,
					59294: 36856,
					59295: 36943,
					59296: 36944,
					59297: 36945,
					59298: 36946,
					59299: 36878,
					59300: 36937,
					59301: 36926,
					59302: 36950,
					59303: 36952,
					59304: 36958,
					59305: 36968,
					59306: 36975,
					59307: 36982,
					59308: 38568,
					59309: 36978,
					59310: 36994,
					59311: 36989,
					59312: 36993,
					59313: 36992,
					59314: 37002,
					59315: 37001,
					59316: 37007,
					59317: 37032,
					59318: 37039,
					59319: 37041,
					59320: 37045,
					59321: 37090,
					59322: 37092,
					59323: 25160,
					59324: 37083,
					59325: 37122,
					59326: 37138,
					59327: 37145,
					59328: 37170,
					59329: 37168,
					59330: 37194,
					59331: 37206,
					59332: 37208,
					59333: 37219,
					59334: 37221,
					59335: 37225,
					59336: 37235,
					59337: 37234,
					59338: 37259,
					59339: 37257,
					59340: 37250,
					59341: 37282,
					59342: 37291,
					59343: 37295,
					59344: 37290,
					59345: 37301,
					59346: 37300,
					59347: 37306,
					59348: 37312,
					59349: 37313,
					59350: 37321,
					59351: 37323,
					59352: 37328,
					59353: 37334,
					59354: 37343,
					59355: 37345,
					59356: 37339,
					59357: 37372,
					59358: 37365,
					59359: 37366,
					59360: 37406,
					59361: 37375,
					59362: 37396,
					59363: 37420,
					59364: 37397,
					59365: 37393,
					59366: 37470,
					59367: 37463,
					59368: 37445,
					59369: 37449,
					59370: 37476,
					59371: 37448,
					59372: 37525,
					59373: 37439,
					59374: 37451,
					59375: 37456,
					59376: 37532,
					59377: 37526,
					59378: 37523,
					59379: 37531,
					59380: 37466,
					59381: 37583,
					59382: 37561,
					59383: 37559,
					59384: 37609,
					59385: 37647,
					59386: 37626,
					59387: 37700,
					59388: 37678,
					59456: 37657,
					59457: 37666,
					59458: 37658,
					59459: 37667,
					59460: 37690,
					59461: 37685,
					59462: 37691,
					59463: 37724,
					59464: 37728,
					59465: 37756,
					59466: 37742,
					59467: 37718,
					59468: 37808,
					59469: 37804,
					59470: 37805,
					59471: 37780,
					59472: 37817,
					59473: 37846,
					59474: 37847,
					59475: 37864,
					59476: 37861,
					59477: 37848,
					59478: 37827,
					59479: 37853,
					59480: 37840,
					59481: 37832,
					59482: 37860,
					59483: 37914,
					59484: 37908,
					59485: 37907,
					59486: 37891,
					59487: 37895,
					59488: 37904,
					59489: 37942,
					59490: 37931,
					59491: 37941,
					59492: 37921,
					59493: 37946,
					59494: 37953,
					59495: 37970,
					59496: 37956,
					59497: 37979,
					59498: 37984,
					59499: 37986,
					59500: 37982,
					59501: 37994,
					59502: 37417,
					59503: 38e3,
					59504: 38005,
					59505: 38007,
					59506: 38013,
					59507: 37978,
					59508: 38012,
					59509: 38014,
					59510: 38017,
					59511: 38015,
					59512: 38274,
					59513: 38279,
					59514: 38282,
					59515: 38292,
					59516: 38294,
					59517: 38296,
					59518: 38297,
					59520: 38304,
					59521: 38312,
					59522: 38311,
					59523: 38317,
					59524: 38332,
					59525: 38331,
					59526: 38329,
					59527: 38334,
					59528: 38346,
					59529: 28662,
					59530: 38339,
					59531: 38349,
					59532: 38348,
					59533: 38357,
					59534: 38356,
					59535: 38358,
					59536: 38364,
					59537: 38369,
					59538: 38373,
					59539: 38370,
					59540: 38433,
					59541: 38440,
					59542: 38446,
					59543: 38447,
					59544: 38466,
					59545: 38476,
					59546: 38479,
					59547: 38475,
					59548: 38519,
					59549: 38492,
					59550: 38494,
					59551: 38493,
					59552: 38495,
					59553: 38502,
					59554: 38514,
					59555: 38508,
					59556: 38541,
					59557: 38552,
					59558: 38549,
					59559: 38551,
					59560: 38570,
					59561: 38567,
					59562: 38577,
					59563: 38578,
					59564: 38576,
					59565: 38580,
					59566: 38582,
					59567: 38584,
					59568: 38585,
					59569: 38606,
					59570: 38603,
					59571: 38601,
					59572: 38605,
					59573: 35149,
					59574: 38620,
					59575: 38669,
					59576: 38613,
					59577: 38649,
					59578: 38660,
					59579: 38662,
					59580: 38664,
					59581: 38675,
					59582: 38670,
					59583: 38673,
					59584: 38671,
					59585: 38678,
					59586: 38681,
					59587: 38692,
					59588: 38698,
					59589: 38704,
					59590: 38713,
					59591: 38717,
					59592: 38718,
					59593: 38724,
					59594: 38726,
					59595: 38728,
					59596: 38722,
					59597: 38729,
					59598: 38748,
					59599: 38752,
					59600: 38756,
					59601: 38758,
					59602: 38760,
					59603: 21202,
					59604: 38763,
					59605: 38769,
					59606: 38777,
					59607: 38789,
					59608: 38780,
					59609: 38785,
					59610: 38778,
					59611: 38790,
					59612: 38795,
					59613: 38799,
					59614: 38800,
					59615: 38812,
					59616: 38824,
					59617: 38822,
					59618: 38819,
					59619: 38835,
					59620: 38836,
					59621: 38851,
					59622: 38854,
					59623: 38856,
					59624: 38859,
					59625: 38876,
					59626: 38893,
					59627: 40783,
					59628: 38898,
					59629: 31455,
					59630: 38902,
					59631: 38901,
					59632: 38927,
					59633: 38924,
					59634: 38968,
					59635: 38948,
					59636: 38945,
					59637: 38967,
					59638: 38973,
					59639: 38982,
					59640: 38991,
					59641: 38987,
					59642: 39019,
					59643: 39023,
					59644: 39024,
					59712: 39025,
					59713: 39028,
					59714: 39027,
					59715: 39082,
					59716: 39087,
					59717: 39089,
					59718: 39094,
					59719: 39108,
					59720: 39107,
					59721: 39110,
					59722: 39145,
					59723: 39147,
					59724: 39171,
					59725: 39177,
					59726: 39186,
					59727: 39188,
					59728: 39192,
					59729: 39201,
					59730: 39197,
					59731: 39198,
					59732: 39204,
					59733: 39200,
					59734: 39212,
					59735: 39214,
					59736: 39229,
					59737: 39230,
					59738: 39234,
					59739: 39241,
					59740: 39237,
					59741: 39248,
					59742: 39243,
					59743: 39249,
					59744: 39250,
					59745: 39244,
					59746: 39253,
					59747: 39319,
					59748: 39320,
					59749: 39333,
					59750: 39341,
					59751: 39342,
					59752: 39356,
					59753: 39391,
					59754: 39387,
					59755: 39389,
					59756: 39384,
					59757: 39377,
					59758: 39405,
					59759: 39406,
					59760: 39409,
					59761: 39410,
					59762: 39419,
					59763: 39416,
					59764: 39425,
					59765: 39439,
					59766: 39429,
					59767: 39394,
					59768: 39449,
					59769: 39467,
					59770: 39479,
					59771: 39493,
					59772: 39490,
					59773: 39488,
					59774: 39491,
					59776: 39486,
					59777: 39509,
					59778: 39501,
					59779: 39515,
					59780: 39511,
					59781: 39519,
					59782: 39522,
					59783: 39525,
					59784: 39524,
					59785: 39529,
					59786: 39531,
					59787: 39530,
					59788: 39597,
					59789: 39600,
					59790: 39612,
					59791: 39616,
					59792: 39631,
					59793: 39633,
					59794: 39635,
					59795: 39636,
					59796: 39646,
					59797: 39647,
					59798: 39650,
					59799: 39651,
					59800: 39654,
					59801: 39663,
					59802: 39659,
					59803: 39662,
					59804: 39668,
					59805: 39665,
					59806: 39671,
					59807: 39675,
					59808: 39686,
					59809: 39704,
					59810: 39706,
					59811: 39711,
					59812: 39714,
					59813: 39715,
					59814: 39717,
					59815: 39719,
					59816: 39720,
					59817: 39721,
					59818: 39722,
					59819: 39726,
					59820: 39727,
					59821: 39730,
					59822: 39748,
					59823: 39747,
					59824: 39759,
					59825: 39757,
					59826: 39758,
					59827: 39761,
					59828: 39768,
					59829: 39796,
					59830: 39827,
					59831: 39811,
					59832: 39825,
					59833: 39830,
					59834: 39831,
					59835: 39839,
					59836: 39840,
					59837: 39848,
					59838: 39860,
					59839: 39872,
					59840: 39882,
					59841: 39865,
					59842: 39878,
					59843: 39887,
					59844: 39889,
					59845: 39890,
					59846: 39907,
					59847: 39906,
					59848: 39908,
					59849: 39892,
					59850: 39905,
					59851: 39994,
					59852: 39922,
					59853: 39921,
					59854: 39920,
					59855: 39957,
					59856: 39956,
					59857: 39945,
					59858: 39955,
					59859: 39948,
					59860: 39942,
					59861: 39944,
					59862: 39954,
					59863: 39946,
					59864: 39940,
					59865: 39982,
					59866: 39963,
					59867: 39973,
					59868: 39972,
					59869: 39969,
					59870: 39984,
					59871: 40007,
					59872: 39986,
					59873: 40006,
					59874: 39998,
					59875: 40026,
					59876: 40032,
					59877: 40039,
					59878: 40054,
					59879: 40056,
					59880: 40167,
					59881: 40172,
					59882: 40176,
					59883: 40201,
					59884: 40200,
					59885: 40171,
					59886: 40195,
					59887: 40198,
					59888: 40234,
					59889: 40230,
					59890: 40367,
					59891: 40227,
					59892: 40223,
					59893: 40260,
					59894: 40213,
					59895: 40210,
					59896: 40257,
					59897: 40255,
					59898: 40254,
					59899: 40262,
					59900: 40264,
					59968: 40285,
					59969: 40286,
					59970: 40292,
					59971: 40273,
					59972: 40272,
					59973: 40281,
					59974: 40306,
					59975: 40329,
					59976: 40327,
					59977: 40363,
					59978: 40303,
					59979: 40314,
					59980: 40346,
					59981: 40356,
					59982: 40361,
					59983: 40370,
					59984: 40388,
					59985: 40385,
					59986: 40379,
					59987: 40376,
					59988: 40378,
					59989: 40390,
					59990: 40399,
					59991: 40386,
					59992: 40409,
					59993: 40403,
					59994: 40440,
					59995: 40422,
					59996: 40429,
					59997: 40431,
					59998: 40445,
					59999: 40474,
					6e4: 40475,
					60001: 40478,
					60002: 40565,
					60003: 40569,
					60004: 40573,
					60005: 40577,
					60006: 40584,
					60007: 40587,
					60008: 40588,
					60009: 40594,
					60010: 40597,
					60011: 40593,
					60012: 40605,
					60013: 40613,
					60014: 40617,
					60015: 40632,
					60016: 40618,
					60017: 40621,
					60018: 38753,
					60019: 40652,
					60020: 40654,
					60021: 40655,
					60022: 40656,
					60023: 40660,
					60024: 40668,
					60025: 40670,
					60026: 40669,
					60027: 40672,
					60028: 40677,
					60029: 40680,
					60030: 40687,
					60032: 40692,
					60033: 40694,
					60034: 40695,
					60035: 40697,
					60036: 40699,
					60037: 40700,
					60038: 40701,
					60039: 40711,
					60040: 40712,
					60041: 30391,
					60042: 40725,
					60043: 40737,
					60044: 40748,
					60045: 40766,
					60046: 40778,
					60047: 40786,
					60048: 40788,
					60049: 40803,
					60050: 40799,
					60051: 40800,
					60052: 40801,
					60053: 40806,
					60054: 40807,
					60055: 40812,
					60056: 40810,
					60057: 40823,
					60058: 40818,
					60059: 40822,
					60060: 40853,
					60061: 40860,
					60062: 40864,
					60063: 22575,
					60064: 27079,
					60065: 36953,
					60066: 29796,
					60067: 20956,
					60068: 29081
				}
			}, function(e, t, r) {
				"use strict";
				Object.defineProperty(t, "__esModule", {
					value: !0
				});
				var o = r(1),
					a = r(2);
				t.decode = function(e, t) {
					var r = new Uint8ClampedArray(e.length);
					r.set(e);
					for(var n = new o.default(285, 256, 0), s = new a.default(n, r), i = new Uint8ClampedArray(t), l = !1, d = 0; d < t; d++) {
						var c = s.evaluateAt(n.exp(d + n.generatorBase));
						i[i.length - 1 - d] = c, 0 !== c && (l = !0)
					}
					if(!l) return r;
					var u = new a.default(n, i),
						f = function(e, t, r, o) {
							var a;
							t.degree() < r.degree() && (t = (a = [r, t])[0], r = a[1]);
							for(var n = t, s = r, i = e.zero, l = e.one; s.degree() >= o / 2;) {
								var d = n,
									c = i;
								if(i = l, (n = s).isZero()) return null;
								s = d;
								for(var u = e.zero, f = n.getCoefficient(n.degree()), h = e.inverse(f); s.degree() >= n.degree() && !s.isZero();) {
									var k = s.degree() - n.degree(),
										B = e.multiply(s.getCoefficient(s.degree()), h);
									u = u.addOrSubtract(e.buildMonomial(k, B)), s = s.addOrSubtract(n.multiplyByMonomial(k, B))
								}
								if(l = u.multiplyPoly(i).addOrSubtract(c), s.degree() >= n.degree()) return null
							}
							var m = l.getCoefficient(0);
							if(0 === m) return null;
							var w = e.inverse(m);
							return [l.multiply(w), s.multiply(w)]
						}(n, n.buildMonomial(t, 1), u, t);
					if(null === f) return null;
					var h = function(e, t) {
						var r = t.degree();
						if(1 === r) return [t.getCoefficient(1)];
						for(var o = new Array(r), a = 0, n = 1; n < e.size && a < r; n++) 0 === t.evaluateAt(n) && (o[a] = e.inverse(n), a++);
						return a !== r ? null : o
					}(n, f[0]);
					if(null == h) return null;
					for(var k = function(e, t, r) {
							for(var a = r.length, n = new Array(a), s = 0; s < a; s++) {
								for(var i = e.inverse(r[s]), l = 1, d = 0; d < a; d++) s !== d && (l = e.multiply(l, o.addOrSubtractGF(1, e.multiply(r[d], i))));
								n[s] = e.multiply(t.evaluateAt(i), e.inverse(l)), 0 !== e.generatorBase && (n[s] = e.multiply(n[s], i))
							}
							return n
						}(n, f[1], h), B = 0; B < h.length; B++) {
						var m = r.length - 1 - n.log(h[B]);
						if(m < 0) return null;
						r[m] = o.addOrSubtractGF(r[m], k[B])
					}
					return r
				}
			}, function(e, t, r) {
				"use strict";
				Object.defineProperty(t, "__esModule", {
					value: !0
				}), t.VERSIONS = [{
					infoBits: null,
					versionNumber: 1,
					alignmentPatternCenters: [],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 7,
						ecBlocks: [{
							numBlocks: 1,
							dataCodewordsPerBlock: 19
						}]
					}, {
						ecCodewordsPerBlock: 10,
						ecBlocks: [{
							numBlocks: 1,
							dataCodewordsPerBlock: 16
						}]
					}, {
						ecCodewordsPerBlock: 13,
						ecBlocks: [{
							numBlocks: 1,
							dataCodewordsPerBlock: 13
						}]
					}, {
						ecCodewordsPerBlock: 17,
						ecBlocks: [{
							numBlocks: 1,
							dataCodewordsPerBlock: 9
						}]
					}]
				}, {
					infoBits: null,
					versionNumber: 2,
					alignmentPatternCenters: [6, 18],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 10,
						ecBlocks: [{
							numBlocks: 1,
							dataCodewordsPerBlock: 34
						}]
					}, {
						ecCodewordsPerBlock: 16,
						ecBlocks: [{
							numBlocks: 1,
							dataCodewordsPerBlock: 28
						}]
					}, {
						ecCodewordsPerBlock: 22,
						ecBlocks: [{
							numBlocks: 1,
							dataCodewordsPerBlock: 22
						}]
					}, {
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 1,
							dataCodewordsPerBlock: 16
						}]
					}]
				}, {
					infoBits: null,
					versionNumber: 3,
					alignmentPatternCenters: [6, 22],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 15,
						ecBlocks: [{
							numBlocks: 1,
							dataCodewordsPerBlock: 55
						}]
					}, {
						ecCodewordsPerBlock: 26,
						ecBlocks: [{
							numBlocks: 1,
							dataCodewordsPerBlock: 44
						}]
					}, {
						ecCodewordsPerBlock: 18,
						ecBlocks: [{
							numBlocks: 2,
							dataCodewordsPerBlock: 17
						}]
					}, {
						ecCodewordsPerBlock: 22,
						ecBlocks: [{
							numBlocks: 2,
							dataCodewordsPerBlock: 13
						}]
					}]
				}, {
					infoBits: null,
					versionNumber: 4,
					alignmentPatternCenters: [6, 26],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 20,
						ecBlocks: [{
							numBlocks: 1,
							dataCodewordsPerBlock: 80
						}]
					}, {
						ecCodewordsPerBlock: 18,
						ecBlocks: [{
							numBlocks: 2,
							dataCodewordsPerBlock: 32
						}]
					}, {
						ecCodewordsPerBlock: 26,
						ecBlocks: [{
							numBlocks: 2,
							dataCodewordsPerBlock: 24
						}]
					}, {
						ecCodewordsPerBlock: 16,
						ecBlocks: [{
							numBlocks: 4,
							dataCodewordsPerBlock: 9
						}]
					}]
				}, {
					infoBits: null,
					versionNumber: 5,
					alignmentPatternCenters: [6, 30],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 26,
						ecBlocks: [{
							numBlocks: 1,
							dataCodewordsPerBlock: 108
						}]
					}, {
						ecCodewordsPerBlock: 24,
						ecBlocks: [{
							numBlocks: 2,
							dataCodewordsPerBlock: 43
						}]
					}, {
						ecCodewordsPerBlock: 18,
						ecBlocks: [{
							numBlocks: 2,
							dataCodewordsPerBlock: 15
						}, {
							numBlocks: 2,
							dataCodewordsPerBlock: 16
						}]
					}, {
						ecCodewordsPerBlock: 22,
						ecBlocks: [{
							numBlocks: 2,
							dataCodewordsPerBlock: 11
						}, {
							numBlocks: 2,
							dataCodewordsPerBlock: 12
						}]
					}]
				}, {
					infoBits: null,
					versionNumber: 6,
					alignmentPatternCenters: [6, 34],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 18,
						ecBlocks: [{
							numBlocks: 2,
							dataCodewordsPerBlock: 68
						}]
					}, {
						ecCodewordsPerBlock: 16,
						ecBlocks: [{
							numBlocks: 4,
							dataCodewordsPerBlock: 27
						}]
					}, {
						ecCodewordsPerBlock: 24,
						ecBlocks: [{
							numBlocks: 4,
							dataCodewordsPerBlock: 19
						}]
					}, {
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 4,
							dataCodewordsPerBlock: 15
						}]
					}]
				}, {
					infoBits: 31892,
					versionNumber: 7,
					alignmentPatternCenters: [6, 22, 38],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 20,
						ecBlocks: [{
							numBlocks: 2,
							dataCodewordsPerBlock: 78
						}]
					}, {
						ecCodewordsPerBlock: 18,
						ecBlocks: [{
							numBlocks: 4,
							dataCodewordsPerBlock: 31
						}]
					}, {
						ecCodewordsPerBlock: 18,
						ecBlocks: [{
							numBlocks: 2,
							dataCodewordsPerBlock: 14
						}, {
							numBlocks: 4,
							dataCodewordsPerBlock: 15
						}]
					}, {
						ecCodewordsPerBlock: 26,
						ecBlocks: [{
							numBlocks: 4,
							dataCodewordsPerBlock: 13
						}, {
							numBlocks: 1,
							dataCodewordsPerBlock: 14
						}]
					}]
				}, {
					infoBits: 34236,
					versionNumber: 8,
					alignmentPatternCenters: [6, 24, 42],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 24,
						ecBlocks: [{
							numBlocks: 2,
							dataCodewordsPerBlock: 97
						}]
					}, {
						ecCodewordsPerBlock: 22,
						ecBlocks: [{
							numBlocks: 2,
							dataCodewordsPerBlock: 38
						}, {
							numBlocks: 2,
							dataCodewordsPerBlock: 39
						}]
					}, {
						ecCodewordsPerBlock: 22,
						ecBlocks: [{
							numBlocks: 4,
							dataCodewordsPerBlock: 18
						}, {
							numBlocks: 2,
							dataCodewordsPerBlock: 19
						}]
					}, {
						ecCodewordsPerBlock: 26,
						ecBlocks: [{
							numBlocks: 4,
							dataCodewordsPerBlock: 14
						}, {
							numBlocks: 2,
							dataCodewordsPerBlock: 15
						}]
					}]
				}, {
					infoBits: 39577,
					versionNumber: 9,
					alignmentPatternCenters: [6, 26, 46],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 2,
							dataCodewordsPerBlock: 116
						}]
					}, {
						ecCodewordsPerBlock: 22,
						ecBlocks: [{
							numBlocks: 3,
							dataCodewordsPerBlock: 36
						}, {
							numBlocks: 2,
							dataCodewordsPerBlock: 37
						}]
					}, {
						ecCodewordsPerBlock: 20,
						ecBlocks: [{
							numBlocks: 4,
							dataCodewordsPerBlock: 16
						}, {
							numBlocks: 4,
							dataCodewordsPerBlock: 17
						}]
					}, {
						ecCodewordsPerBlock: 24,
						ecBlocks: [{
							numBlocks: 4,
							dataCodewordsPerBlock: 12
						}, {
							numBlocks: 4,
							dataCodewordsPerBlock: 13
						}]
					}]
				}, {
					infoBits: 42195,
					versionNumber: 10,
					alignmentPatternCenters: [6, 28, 50],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 18,
						ecBlocks: [{
							numBlocks: 2,
							dataCodewordsPerBlock: 68
						}, {
							numBlocks: 2,
							dataCodewordsPerBlock: 69
						}]
					}, {
						ecCodewordsPerBlock: 26,
						ecBlocks: [{
							numBlocks: 4,
							dataCodewordsPerBlock: 43
						}, {
							numBlocks: 1,
							dataCodewordsPerBlock: 44
						}]
					}, {
						ecCodewordsPerBlock: 24,
						ecBlocks: [{
							numBlocks: 6,
							dataCodewordsPerBlock: 19
						}, {
							numBlocks: 2,
							dataCodewordsPerBlock: 20
						}]
					}, {
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 6,
							dataCodewordsPerBlock: 15
						}, {
							numBlocks: 2,
							dataCodewordsPerBlock: 16
						}]
					}]
				}, {
					infoBits: 48118,
					versionNumber: 11,
					alignmentPatternCenters: [6, 30, 54],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 20,
						ecBlocks: [{
							numBlocks: 4,
							dataCodewordsPerBlock: 81
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 1,
							dataCodewordsPerBlock: 50
						}, {
							numBlocks: 4,
							dataCodewordsPerBlock: 51
						}]
					}, {
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 4,
							dataCodewordsPerBlock: 22
						}, {
							numBlocks: 4,
							dataCodewordsPerBlock: 23
						}]
					}, {
						ecCodewordsPerBlock: 24,
						ecBlocks: [{
							numBlocks: 3,
							dataCodewordsPerBlock: 12
						}, {
							numBlocks: 8,
							dataCodewordsPerBlock: 13
						}]
					}]
				}, {
					infoBits: 51042,
					versionNumber: 12,
					alignmentPatternCenters: [6, 32, 58],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 24,
						ecBlocks: [{
							numBlocks: 2,
							dataCodewordsPerBlock: 92
						}, {
							numBlocks: 2,
							dataCodewordsPerBlock: 93
						}]
					}, {
						ecCodewordsPerBlock: 22,
						ecBlocks: [{
							numBlocks: 6,
							dataCodewordsPerBlock: 36
						}, {
							numBlocks: 2,
							dataCodewordsPerBlock: 37
						}]
					}, {
						ecCodewordsPerBlock: 26,
						ecBlocks: [{
							numBlocks: 4,
							dataCodewordsPerBlock: 20
						}, {
							numBlocks: 6,
							dataCodewordsPerBlock: 21
						}]
					}, {
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 7,
							dataCodewordsPerBlock: 14
						}, {
							numBlocks: 4,
							dataCodewordsPerBlock: 15
						}]
					}]
				}, {
					infoBits: 55367,
					versionNumber: 13,
					alignmentPatternCenters: [6, 34, 62],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 26,
						ecBlocks: [{
							numBlocks: 4,
							dataCodewordsPerBlock: 107
						}]
					}, {
						ecCodewordsPerBlock: 22,
						ecBlocks: [{
							numBlocks: 8,
							dataCodewordsPerBlock: 37
						}, {
							numBlocks: 1,
							dataCodewordsPerBlock: 38
						}]
					}, {
						ecCodewordsPerBlock: 24,
						ecBlocks: [{
							numBlocks: 8,
							dataCodewordsPerBlock: 20
						}, {
							numBlocks: 4,
							dataCodewordsPerBlock: 21
						}]
					}, {
						ecCodewordsPerBlock: 22,
						ecBlocks: [{
							numBlocks: 12,
							dataCodewordsPerBlock: 11
						}, {
							numBlocks: 4,
							dataCodewordsPerBlock: 12
						}]
					}]
				}, {
					infoBits: 58893,
					versionNumber: 14,
					alignmentPatternCenters: [6, 26, 46, 66],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 3,
							dataCodewordsPerBlock: 115
						}, {
							numBlocks: 1,
							dataCodewordsPerBlock: 116
						}]
					}, {
						ecCodewordsPerBlock: 24,
						ecBlocks: [{
							numBlocks: 4,
							dataCodewordsPerBlock: 40
						}, {
							numBlocks: 5,
							dataCodewordsPerBlock: 41
						}]
					}, {
						ecCodewordsPerBlock: 20,
						ecBlocks: [{
							numBlocks: 11,
							dataCodewordsPerBlock: 16
						}, {
							numBlocks: 5,
							dataCodewordsPerBlock: 17
						}]
					}, {
						ecCodewordsPerBlock: 24,
						ecBlocks: [{
							numBlocks: 11,
							dataCodewordsPerBlock: 12
						}, {
							numBlocks: 5,
							dataCodewordsPerBlock: 13
						}]
					}]
				}, {
					infoBits: 63784,
					versionNumber: 15,
					alignmentPatternCenters: [6, 26, 48, 70],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 22,
						ecBlocks: [{
							numBlocks: 5,
							dataCodewordsPerBlock: 87
						}, {
							numBlocks: 1,
							dataCodewordsPerBlock: 88
						}]
					}, {
						ecCodewordsPerBlock: 24,
						ecBlocks: [{
							numBlocks: 5,
							dataCodewordsPerBlock: 41
						}, {
							numBlocks: 5,
							dataCodewordsPerBlock: 42
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 5,
							dataCodewordsPerBlock: 24
						}, {
							numBlocks: 7,
							dataCodewordsPerBlock: 25
						}]
					}, {
						ecCodewordsPerBlock: 24,
						ecBlocks: [{
							numBlocks: 11,
							dataCodewordsPerBlock: 12
						}, {
							numBlocks: 7,
							dataCodewordsPerBlock: 13
						}]
					}]
				}, {
					infoBits: 68472,
					versionNumber: 16,
					alignmentPatternCenters: [6, 26, 50, 74],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 24,
						ecBlocks: [{
							numBlocks: 5,
							dataCodewordsPerBlock: 98
						}, {
							numBlocks: 1,
							dataCodewordsPerBlock: 99
						}]
					}, {
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 7,
							dataCodewordsPerBlock: 45
						}, {
							numBlocks: 3,
							dataCodewordsPerBlock: 46
						}]
					}, {
						ecCodewordsPerBlock: 24,
						ecBlocks: [{
							numBlocks: 15,
							dataCodewordsPerBlock: 19
						}, {
							numBlocks: 2,
							dataCodewordsPerBlock: 20
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 3,
							dataCodewordsPerBlock: 15
						}, {
							numBlocks: 13,
							dataCodewordsPerBlock: 16
						}]
					}]
				}, {
					infoBits: 70749,
					versionNumber: 17,
					alignmentPatternCenters: [6, 30, 54, 78],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 1,
							dataCodewordsPerBlock: 107
						}, {
							numBlocks: 5,
							dataCodewordsPerBlock: 108
						}]
					}, {
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 10,
							dataCodewordsPerBlock: 46
						}, {
							numBlocks: 1,
							dataCodewordsPerBlock: 47
						}]
					}, {
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 1,
							dataCodewordsPerBlock: 22
						}, {
							numBlocks: 15,
							dataCodewordsPerBlock: 23
						}]
					}, {
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 2,
							dataCodewordsPerBlock: 14
						}, {
							numBlocks: 17,
							dataCodewordsPerBlock: 15
						}]
					}]
				}, {
					infoBits: 76311,
					versionNumber: 18,
					alignmentPatternCenters: [6, 30, 56, 82],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 5,
							dataCodewordsPerBlock: 120
						}, {
							numBlocks: 1,
							dataCodewordsPerBlock: 121
						}]
					}, {
						ecCodewordsPerBlock: 26,
						ecBlocks: [{
							numBlocks: 9,
							dataCodewordsPerBlock: 43
						}, {
							numBlocks: 4,
							dataCodewordsPerBlock: 44
						}]
					}, {
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 17,
							dataCodewordsPerBlock: 22
						}, {
							numBlocks: 1,
							dataCodewordsPerBlock: 23
						}]
					}, {
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 2,
							dataCodewordsPerBlock: 14
						}, {
							numBlocks: 19,
							dataCodewordsPerBlock: 15
						}]
					}]
				}, {
					infoBits: 79154,
					versionNumber: 19,
					alignmentPatternCenters: [6, 30, 58, 86],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 3,
							dataCodewordsPerBlock: 113
						}, {
							numBlocks: 4,
							dataCodewordsPerBlock: 114
						}]
					}, {
						ecCodewordsPerBlock: 26,
						ecBlocks: [{
							numBlocks: 3,
							dataCodewordsPerBlock: 44
						}, {
							numBlocks: 11,
							dataCodewordsPerBlock: 45
						}]
					}, {
						ecCodewordsPerBlock: 26,
						ecBlocks: [{
							numBlocks: 17,
							dataCodewordsPerBlock: 21
						}, {
							numBlocks: 4,
							dataCodewordsPerBlock: 22
						}]
					}, {
						ecCodewordsPerBlock: 26,
						ecBlocks: [{
							numBlocks: 9,
							dataCodewordsPerBlock: 13
						}, {
							numBlocks: 16,
							dataCodewordsPerBlock: 14
						}]
					}]
				}, {
					infoBits: 84390,
					versionNumber: 20,
					alignmentPatternCenters: [6, 34, 62, 90],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 3,
							dataCodewordsPerBlock: 107
						}, {
							numBlocks: 5,
							dataCodewordsPerBlock: 108
						}]
					}, {
						ecCodewordsPerBlock: 26,
						ecBlocks: [{
							numBlocks: 3,
							dataCodewordsPerBlock: 41
						}, {
							numBlocks: 13,
							dataCodewordsPerBlock: 42
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 15,
							dataCodewordsPerBlock: 24
						}, {
							numBlocks: 5,
							dataCodewordsPerBlock: 25
						}]
					}, {
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 15,
							dataCodewordsPerBlock: 15
						}, {
							numBlocks: 10,
							dataCodewordsPerBlock: 16
						}]
					}]
				}, {
					infoBits: 87683,
					versionNumber: 21,
					alignmentPatternCenters: [6, 28, 50, 72, 94],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 4,
							dataCodewordsPerBlock: 116
						}, {
							numBlocks: 4,
							dataCodewordsPerBlock: 117
						}]
					}, {
						ecCodewordsPerBlock: 26,
						ecBlocks: [{
							numBlocks: 17,
							dataCodewordsPerBlock: 42
						}]
					}, {
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 17,
							dataCodewordsPerBlock: 22
						}, {
							numBlocks: 6,
							dataCodewordsPerBlock: 23
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 19,
							dataCodewordsPerBlock: 16
						}, {
							numBlocks: 6,
							dataCodewordsPerBlock: 17
						}]
					}]
				}, {
					infoBits: 92361,
					versionNumber: 22,
					alignmentPatternCenters: [6, 26, 50, 74, 98],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 2,
							dataCodewordsPerBlock: 111
						}, {
							numBlocks: 7,
							dataCodewordsPerBlock: 112
						}]
					}, {
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 17,
							dataCodewordsPerBlock: 46
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 7,
							dataCodewordsPerBlock: 24
						}, {
							numBlocks: 16,
							dataCodewordsPerBlock: 25
						}]
					}, {
						ecCodewordsPerBlock: 24,
						ecBlocks: [{
							numBlocks: 34,
							dataCodewordsPerBlock: 13
						}]
					}]
				}, {
					infoBits: 96236,
					versionNumber: 23,
					alignmentPatternCenters: [6, 30, 54, 74, 102],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 4,
							dataCodewordsPerBlock: 121
						}, {
							numBlocks: 5,
							dataCodewordsPerBlock: 122
						}]
					}, {
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 4,
							dataCodewordsPerBlock: 47
						}, {
							numBlocks: 14,
							dataCodewordsPerBlock: 48
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 11,
							dataCodewordsPerBlock: 24
						}, {
							numBlocks: 14,
							dataCodewordsPerBlock: 25
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 16,
							dataCodewordsPerBlock: 15
						}, {
							numBlocks: 14,
							dataCodewordsPerBlock: 16
						}]
					}]
				}, {
					infoBits: 102084,
					versionNumber: 24,
					alignmentPatternCenters: [6, 28, 54, 80, 106],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 6,
							dataCodewordsPerBlock: 117
						}, {
							numBlocks: 4,
							dataCodewordsPerBlock: 118
						}]
					}, {
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 6,
							dataCodewordsPerBlock: 45
						}, {
							numBlocks: 14,
							dataCodewordsPerBlock: 46
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 11,
							dataCodewordsPerBlock: 24
						}, {
							numBlocks: 16,
							dataCodewordsPerBlock: 25
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 30,
							dataCodewordsPerBlock: 16
						}, {
							numBlocks: 2,
							dataCodewordsPerBlock: 17
						}]
					}]
				}, {
					infoBits: 102881,
					versionNumber: 25,
					alignmentPatternCenters: [6, 32, 58, 84, 110],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 26,
						ecBlocks: [{
							numBlocks: 8,
							dataCodewordsPerBlock: 106
						}, {
							numBlocks: 4,
							dataCodewordsPerBlock: 107
						}]
					}, {
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 8,
							dataCodewordsPerBlock: 47
						}, {
							numBlocks: 13,
							dataCodewordsPerBlock: 48
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 7,
							dataCodewordsPerBlock: 24
						}, {
							numBlocks: 22,
							dataCodewordsPerBlock: 25
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 22,
							dataCodewordsPerBlock: 15
						}, {
							numBlocks: 13,
							dataCodewordsPerBlock: 16
						}]
					}]
				}, {
					infoBits: 110507,
					versionNumber: 26,
					alignmentPatternCenters: [6, 30, 58, 86, 114],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 10,
							dataCodewordsPerBlock: 114
						}, {
							numBlocks: 2,
							dataCodewordsPerBlock: 115
						}]
					}, {
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 19,
							dataCodewordsPerBlock: 46
						}, {
							numBlocks: 4,
							dataCodewordsPerBlock: 47
						}]
					}, {
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 28,
							dataCodewordsPerBlock: 22
						}, {
							numBlocks: 6,
							dataCodewordsPerBlock: 23
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 33,
							dataCodewordsPerBlock: 16
						}, {
							numBlocks: 4,
							dataCodewordsPerBlock: 17
						}]
					}]
				}, {
					infoBits: 110734,
					versionNumber: 27,
					alignmentPatternCenters: [6, 34, 62, 90, 118],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 8,
							dataCodewordsPerBlock: 122
						}, {
							numBlocks: 4,
							dataCodewordsPerBlock: 123
						}]
					}, {
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 22,
							dataCodewordsPerBlock: 45
						}, {
							numBlocks: 3,
							dataCodewordsPerBlock: 46
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 8,
							dataCodewordsPerBlock: 23
						}, {
							numBlocks: 26,
							dataCodewordsPerBlock: 24
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 12,
							dataCodewordsPerBlock: 15
						}, {
							numBlocks: 28,
							dataCodewordsPerBlock: 16
						}]
					}]
				}, {
					infoBits: 117786,
					versionNumber: 28,
					alignmentPatternCenters: [6, 26, 50, 74, 98, 122],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 3,
							dataCodewordsPerBlock: 117
						}, {
							numBlocks: 10,
							dataCodewordsPerBlock: 118
						}]
					}, {
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 3,
							dataCodewordsPerBlock: 45
						}, {
							numBlocks: 23,
							dataCodewordsPerBlock: 46
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 4,
							dataCodewordsPerBlock: 24
						}, {
							numBlocks: 31,
							dataCodewordsPerBlock: 25
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 11,
							dataCodewordsPerBlock: 15
						}, {
							numBlocks: 31,
							dataCodewordsPerBlock: 16
						}]
					}]
				}, {
					infoBits: 119615,
					versionNumber: 29,
					alignmentPatternCenters: [6, 30, 54, 78, 102, 126],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 7,
							dataCodewordsPerBlock: 116
						}, {
							numBlocks: 7,
							dataCodewordsPerBlock: 117
						}]
					}, {
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 21,
							dataCodewordsPerBlock: 45
						}, {
							numBlocks: 7,
							dataCodewordsPerBlock: 46
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 1,
							dataCodewordsPerBlock: 23
						}, {
							numBlocks: 37,
							dataCodewordsPerBlock: 24
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 19,
							dataCodewordsPerBlock: 15
						}, {
							numBlocks: 26,
							dataCodewordsPerBlock: 16
						}]
					}]
				}, {
					infoBits: 126325,
					versionNumber: 30,
					alignmentPatternCenters: [6, 26, 52, 78, 104, 130],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 5,
							dataCodewordsPerBlock: 115
						}, {
							numBlocks: 10,
							dataCodewordsPerBlock: 116
						}]
					}, {
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 19,
							dataCodewordsPerBlock: 47
						}, {
							numBlocks: 10,
							dataCodewordsPerBlock: 48
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 15,
							dataCodewordsPerBlock: 24
						}, {
							numBlocks: 25,
							dataCodewordsPerBlock: 25
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 23,
							dataCodewordsPerBlock: 15
						}, {
							numBlocks: 25,
							dataCodewordsPerBlock: 16
						}]
					}]
				}, {
					infoBits: 127568,
					versionNumber: 31,
					alignmentPatternCenters: [6, 30, 56, 82, 108, 134],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 13,
							dataCodewordsPerBlock: 115
						}, {
							numBlocks: 3,
							dataCodewordsPerBlock: 116
						}]
					}, {
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 2,
							dataCodewordsPerBlock: 46
						}, {
							numBlocks: 29,
							dataCodewordsPerBlock: 47
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 42,
							dataCodewordsPerBlock: 24
						}, {
							numBlocks: 1,
							dataCodewordsPerBlock: 25
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 23,
							dataCodewordsPerBlock: 15
						}, {
							numBlocks: 28,
							dataCodewordsPerBlock: 16
						}]
					}]
				}, {
					infoBits: 133589,
					versionNumber: 32,
					alignmentPatternCenters: [6, 34, 60, 86, 112, 138],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 17,
							dataCodewordsPerBlock: 115
						}]
					}, {
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 10,
							dataCodewordsPerBlock: 46
						}, {
							numBlocks: 23,
							dataCodewordsPerBlock: 47
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 10,
							dataCodewordsPerBlock: 24
						}, {
							numBlocks: 35,
							dataCodewordsPerBlock: 25
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 19,
							dataCodewordsPerBlock: 15
						}, {
							numBlocks: 35,
							dataCodewordsPerBlock: 16
						}]
					}]
				}, {
					infoBits: 136944,
					versionNumber: 33,
					alignmentPatternCenters: [6, 30, 58, 86, 114, 142],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 17,
							dataCodewordsPerBlock: 115
						}, {
							numBlocks: 1,
							dataCodewordsPerBlock: 116
						}]
					}, {
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 14,
							dataCodewordsPerBlock: 46
						}, {
							numBlocks: 21,
							dataCodewordsPerBlock: 47
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 29,
							dataCodewordsPerBlock: 24
						}, {
							numBlocks: 19,
							dataCodewordsPerBlock: 25
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 11,
							dataCodewordsPerBlock: 15
						}, {
							numBlocks: 46,
							dataCodewordsPerBlock: 16
						}]
					}]
				}, {
					infoBits: 141498,
					versionNumber: 34,
					alignmentPatternCenters: [6, 34, 62, 90, 118, 146],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 13,
							dataCodewordsPerBlock: 115
						}, {
							numBlocks: 6,
							dataCodewordsPerBlock: 116
						}]
					}, {
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 14,
							dataCodewordsPerBlock: 46
						}, {
							numBlocks: 23,
							dataCodewordsPerBlock: 47
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 44,
							dataCodewordsPerBlock: 24
						}, {
							numBlocks: 7,
							dataCodewordsPerBlock: 25
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 59,
							dataCodewordsPerBlock: 16
						}, {
							numBlocks: 1,
							dataCodewordsPerBlock: 17
						}]
					}]
				}, {
					infoBits: 145311,
					versionNumber: 35,
					alignmentPatternCenters: [6, 30, 54, 78, 102, 126, 150],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 12,
							dataCodewordsPerBlock: 121
						}, {
							numBlocks: 7,
							dataCodewordsPerBlock: 122
						}]
					}, {
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 12,
							dataCodewordsPerBlock: 47
						}, {
							numBlocks: 26,
							dataCodewordsPerBlock: 48
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 39,
							dataCodewordsPerBlock: 24
						}, {
							numBlocks: 14,
							dataCodewordsPerBlock: 25
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 22,
							dataCodewordsPerBlock: 15
						}, {
							numBlocks: 41,
							dataCodewordsPerBlock: 16
						}]
					}]
				}, {
					infoBits: 150283,
					versionNumber: 36,
					alignmentPatternCenters: [6, 24, 50, 76, 102, 128, 154],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 6,
							dataCodewordsPerBlock: 121
						}, {
							numBlocks: 14,
							dataCodewordsPerBlock: 122
						}]
					}, {
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 6,
							dataCodewordsPerBlock: 47
						}, {
							numBlocks: 34,
							dataCodewordsPerBlock: 48
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 46,
							dataCodewordsPerBlock: 24
						}, {
							numBlocks: 10,
							dataCodewordsPerBlock: 25
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 2,
							dataCodewordsPerBlock: 15
						}, {
							numBlocks: 64,
							dataCodewordsPerBlock: 16
						}]
					}]
				}, {
					infoBits: 152622,
					versionNumber: 37,
					alignmentPatternCenters: [6, 28, 54, 80, 106, 132, 158],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 17,
							dataCodewordsPerBlock: 122
						}, {
							numBlocks: 4,
							dataCodewordsPerBlock: 123
						}]
					}, {
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 29,
							dataCodewordsPerBlock: 46
						}, {
							numBlocks: 14,
							dataCodewordsPerBlock: 47
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 49,
							dataCodewordsPerBlock: 24
						}, {
							numBlocks: 10,
							dataCodewordsPerBlock: 25
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 24,
							dataCodewordsPerBlock: 15
						}, {
							numBlocks: 46,
							dataCodewordsPerBlock: 16
						}]
					}]
				}, {
					infoBits: 158308,
					versionNumber: 38,
					alignmentPatternCenters: [6, 32, 58, 84, 110, 136, 162],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 4,
							dataCodewordsPerBlock: 122
						}, {
							numBlocks: 18,
							dataCodewordsPerBlock: 123
						}]
					}, {
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 13,
							dataCodewordsPerBlock: 46
						}, {
							numBlocks: 32,
							dataCodewordsPerBlock: 47
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 48,
							dataCodewordsPerBlock: 24
						}, {
							numBlocks: 14,
							dataCodewordsPerBlock: 25
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 42,
							dataCodewordsPerBlock: 15
						}, {
							numBlocks: 32,
							dataCodewordsPerBlock: 16
						}]
					}]
				}, {
					infoBits: 161089,
					versionNumber: 39,
					alignmentPatternCenters: [6, 26, 54, 82, 110, 138, 166],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 20,
							dataCodewordsPerBlock: 117
						}, {
							numBlocks: 4,
							dataCodewordsPerBlock: 118
						}]
					}, {
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 40,
							dataCodewordsPerBlock: 47
						}, {
							numBlocks: 7,
							dataCodewordsPerBlock: 48
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 43,
							dataCodewordsPerBlock: 24
						}, {
							numBlocks: 22,
							dataCodewordsPerBlock: 25
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 10,
							dataCodewordsPerBlock: 15
						}, {
							numBlocks: 67,
							dataCodewordsPerBlock: 16
						}]
					}]
				}, {
					infoBits: 167017,
					versionNumber: 40,
					alignmentPatternCenters: [6, 30, 58, 86, 114, 142, 170],
					errorCorrectionLevels: [{
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 19,
							dataCodewordsPerBlock: 118
						}, {
							numBlocks: 6,
							dataCodewordsPerBlock: 119
						}]
					}, {
						ecCodewordsPerBlock: 28,
						ecBlocks: [{
							numBlocks: 18,
							dataCodewordsPerBlock: 47
						}, {
							numBlocks: 31,
							dataCodewordsPerBlock: 48
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 34,
							dataCodewordsPerBlock: 24
						}, {
							numBlocks: 34,
							dataCodewordsPerBlock: 25
						}]
					}, {
						ecCodewordsPerBlock: 30,
						ecBlocks: [{
							numBlocks: 20,
							dataCodewordsPerBlock: 15
						}, {
							numBlocks: 61,
							dataCodewordsPerBlock: 16
						}]
					}]
				}]
			}, function(e, t, r) {
				"use strict";
				Object.defineProperty(t, "__esModule", {
					value: !0
				});
				var o = r(0);

				function a(e, t, r, o) {
					var a = e.x - t.x + r.x - o.x,
						n = e.y - t.y + r.y - o.y;
					if(0 === a && 0 === n) return {
						a11: t.x - e.x,
						a12: t.y - e.y,
						a13: 0,
						a21: r.x - t.x,
						a22: r.y - t.y,
						a23: 0,
						a31: e.x,
						a32: e.y,
						a33: 1
					};
					var s = t.x - r.x,
						i = o.x - r.x,
						l = t.y - r.y,
						d = o.y - r.y,
						c = s * d - i * l,
						u = (a * d - i * n) / c,
						f = (s * n - a * l) / c;
					return {
						a11: t.x - e.x + u * t.x,
						a12: t.y - e.y + u * t.y,
						a13: u,
						a21: o.x - e.x + f * o.x,
						a22: o.y - e.y + f * o.y,
						a23: f,
						a31: e.x,
						a32: e.y,
						a33: 1
					}
				}
				t.extract = function(e, t) {
					for(var r, n, s = function(e, t, r, o) {
							var n = a(e, t, r, o);
							return {
								a11: n.a22 * n.a33 - n.a23 * n.a32,
								a12: n.a13 * n.a32 - n.a12 * n.a33,
								a13: n.a12 * n.a23 - n.a13 * n.a22,
								a21: n.a23 * n.a31 - n.a21 * n.a33,
								a22: n.a11 * n.a33 - n.a13 * n.a31,
								a23: n.a13 * n.a21 - n.a11 * n.a23,
								a31: n.a21 * n.a32 - n.a22 * n.a31,
								a32: n.a12 * n.a31 - n.a11 * n.a32,
								a33: n.a11 * n.a22 - n.a12 * n.a21
							}
						}({
							x: 3.5,
							y: 3.5
						}, {
							x: t.dimension - 3.5,
							y: 3.5
						}, {
							x: t.dimension - 6.5,
							y: t.dimension - 6.5
						}, {
							x: 3.5,
							y: t.dimension - 3.5
						}), i = a(t.topLeft, t.topRight, t.alignmentPattern, t.bottomLeft), l = (n = s, {
							a11: (r = i).a11 * n.a11 + r.a21 * n.a12 + r.a31 * n.a13,
							a12: r.a12 * n.a11 + r.a22 * n.a12 + r.a32 * n.a13,
							a13: r.a13 * n.a11 + r.a23 * n.a12 + r.a33 * n.a13,
							a21: r.a11 * n.a21 + r.a21 * n.a22 + r.a31 * n.a23,
							a22: r.a12 * n.a21 + r.a22 * n.a22 + r.a32 * n.a23,
							a23: r.a13 * n.a21 + r.a23 * n.a22 + r.a33 * n.a23,
							a31: r.a11 * n.a31 + r.a21 * n.a32 + r.a31 * n.a33,
							a32: r.a12 * n.a31 + r.a22 * n.a32 + r.a32 * n.a33,
							a33: r.a13 * n.a31 + r.a23 * n.a32 + r.a33 * n.a33
						}), d = o.BitMatrix.createEmpty(t.dimension, t.dimension), c = function(e, t) {
							var r = l.a13 * e + l.a23 * t + l.a33;
							return {
								x: (l.a11 * e + l.a21 * t + l.a31) / r,
								y: (l.a12 * e + l.a22 * t + l.a32) / r
							}
						}, u = 0; u < t.dimension; u++)
						for(var f = 0; f < t.dimension; f++) {
							var h = c(f + .5, u + .5);
							d.set(f, u, e.get(Math.floor(h.x), Math.floor(h.y)))
						}
					return {
						matrix: d,
						mappingFunction: c
					}
				}
			}, function(e, t, r) {
				"use strict";
				Object.defineProperty(t, "__esModule", {
					value: !0
				});
				var o = function(e, t) {
					return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2))
				};

				function a(e) {
					return e.reduce((function(e, t) {
						return e + t
					}))
				}

				function n(e, t, r, a) {
					var n, s, i, l, d = [{
							x: Math.floor(e.x),
							y: Math.floor(e.y)
						}],
						c = Math.abs(t.y - e.y) > Math.abs(t.x - e.x);
					c ? (n = Math.floor(e.y), s = Math.floor(e.x), i = Math.floor(t.y), l = Math.floor(t.x)) : (n = Math.floor(e.x), s = Math.floor(e.y), i = Math.floor(t.x), l = Math.floor(t.y));
					for(var u = Math.abs(i - n), f = Math.abs(l - s), h = Math.floor(-u / 2), k = n < i ? 1 : -1, B = s < l ? 1 : -1, m = !0, w = n, v = s; w !== i + k; w += k) {
						var _ = c ? v : w,
							b = c ? w : v;
						if(r.get(_, b) !== m && (m = !m, d.push({
								x: _,
								y: b
							}), d.length === a + 1)) break;
						if((h += f) > 0) {
							if(v === l) break;
							v += B, h -= u
						}
					}
					for(var p = [], g = 0; g < a; g++) d[g] && d[g + 1] ? p.push(o(d[g], d[g + 1])) : p.push(0);
					return p
				}

				function s(e, t, r, o) {
					var a, s = t.y - e.y,
						i = t.x - e.x,
						l = n(e, t, r, Math.ceil(o / 2)),
						d = n(e, {
							x: e.x - i,
							y: e.y - s
						}, r, Math.ceil(o / 2)),
						c = l.shift() + d.shift() - 1;
					return(a = d.concat(c)).concat.apply(a, l)
				}

				function i(e, t) {
					var r = a(e) / a(t),
						o = 0;
					return t.forEach((function(t, a) {
						o += Math.pow(e[a] - t * r, 2)
					})), {
						averageSize: r,
						error: o
					}
				}

				function l(e, t, r) {
					try {
						var o = s(e, {
								x: -1,
								y: e.y
							}, r, t.length),
							a = s(e, {
								x: e.x,
								y: -1
							}, r, t.length),
							n = s(e, {
								x: Math.max(0, e.x - e.y) - 1,
								y: Math.max(0, e.y - e.x) - 1
							}, r, t.length),
							l = s(e, {
								x: Math.min(r.width, e.x + e.y) + 1,
								y: Math.min(r.height, e.y + e.x) + 1
							}, r, t.length),
							d = i(o, t),
							c = i(a, t),
							u = i(n, t),
							f = i(l, t),
							h = Math.sqrt(d.error * d.error + c.error * c.error + u.error * u.error + f.error * f.error),
							k = (d.averageSize + c.averageSize + u.averageSize + f.averageSize) / 4;
						return h + (Math.pow(d.averageSize - k, 2) + Math.pow(c.averageSize - k, 2) + Math.pow(u.averageSize - k, 2) + Math.pow(f.averageSize - k, 2)) / k
					} catch(B) {
						return 1 / 0
					}
				}

				function d(e, t) {
					for(var r = Math.round(t.x); e.get(r, Math.round(t.y));) r--;
					for(var o = Math.round(t.x); e.get(o, Math.round(t.y));) o++;
					for(var a = (r + o) / 2, n = Math.round(t.y); e.get(Math.round(a), n);) n--;
					for(var s = Math.round(t.y); e.get(Math.round(a), s);) s++;
					return {
						x: a,
						y: (n + s) / 2
					}
				}

				function c(e, t, r, n, i) {
					var d, c, u;
					try {
						d = function(e, t, r, n) {
							var i = (a(s(e, r, n, 5)) / 7 + a(s(e, t, n, 5)) / 7 + a(s(r, e, n, 5)) / 7 + a(s(t, e, n, 5)) / 7) / 4;
							if(i < 1) throw new Error("Invalid module size");
							var l = Math.round(o(e, t) / i),
								d = Math.round(o(e, r) / i),
								c = Math.floor((l + d) / 2) + 7;
							switch(c % 4) {
								case 0:
									c++;
									break;
								case 2:
									c--
							}
							return {
								dimension: c,
								moduleSize: i
							}
						}(n, r, i, e), c = d.dimension, u = d.moduleSize
					} catch(v) {
						return null
					}
					var f = r.x - n.x + i.x,
						h = r.y - n.y + i.y,
						k = (o(n, i) + o(n, r)) / 2 / u,
						B = 1 - 3 / k,
						m = {
							x: n.x + B * (f - n.x),
							y: n.y + B * (h - n.y)
						},
						w = t.map((function(t) {
							var r = (t.top.startX + t.top.endX + t.bottom.startX + t.bottom.endX) / 4,
								n = (t.top.y + t.bottom.y + 1) / 2;
							if(e.get(Math.floor(r), Math.floor(n))) {
								var s = [t.top.endX - t.top.startX, t.bottom.endX - t.bottom.startX, t.bottom.y - t.top.y + 1];
								return a(s), {
									x: r,
									y: n,
									score: l({
										x: Math.floor(r),
										y: Math.floor(n)
									}, [1, 1, 1], e) + o({
										x: r,
										y: n
									}, m)
								}
							}
						})).filter((function(e) {
							return !!e
						})).sort((function(e, t) {
							return e.score - t.score
						}));
					return {
						alignmentPattern: k >= 15 && w.length ? w[0] : m,
						dimension: c
					}
				}
				t.locate = function(e) {
					for(var t = [], r = [], n = [], s = [], i = function(o) {
							for(var i = 0, l = !1, d = [0, 0, 0, 0, 0], c = function(t) {
									var n = e.get(t, o);
									if(n === l) i++;
									else {
										d = [d[1], d[2], d[3], d[4], i], i = 1, l = n;
										var c = a(d) / 7,
											u = Math.abs(d[0] - c) < c && Math.abs(d[1] - c) < c && Math.abs(d[2] - 3 * c) < 3 * c && Math.abs(d[3] - c) < c && Math.abs(d[4] - c) < c && !n,
											f = a(d.slice(-3)) / 3,
											h = Math.abs(d[2] - f) < f && Math.abs(d[3] - f) < f && Math.abs(d[4] - f) < f && n;
										if(u) {
											var k = t - d[3] - d[4],
												B = k - d[2],
												m = {
													startX: B,
													endX: k,
													y: o
												};
											(w = r.filter((function(e) {
												return B >= e.bottom.startX && B <= e.bottom.endX || k >= e.bottom.startX && B <= e.bottom.endX || B <= e.bottom.startX && k >= e.bottom.endX && d[2] / (e.bottom.endX - e.bottom.startX) < 1.5 && d[2] / (e.bottom.endX - e.bottom.startX) > .5
											}))).length > 0 ? w[0].bottom = m : r.push({
												top: m,
												bottom: m
											})
										}
										if(h) {
											var w, v = t - d[4],
												_ = v - d[3];
											m = {
												startX: _,
												y: o,
												endX: v
											}, (w = s.filter((function(e) {
												return _ >= e.bottom.startX && _ <= e.bottom.endX || v >= e.bottom.startX && _ <= e.bottom.endX || _ <= e.bottom.startX && v >= e.bottom.endX && d[2] / (e.bottom.endX - e.bottom.startX) < 1.5 && d[2] / (e.bottom.endX - e.bottom.startX) > .5
											}))).length > 0 ? w[0].bottom = m : s.push({
												top: m,
												bottom: m
											})
										}
									}
								}, u = -1; u <= e.width; u++) c(u);
							t.push.apply(t, r.filter((function(e) {
								return e.bottom.y !== o && e.bottom.y - e.top.y >= 2
							}))), r = r.filter((function(e) {
								return e.bottom.y === o
							})), n.push.apply(n, s.filter((function(e) {
								return e.bottom.y !== o
							}))), s = s.filter((function(e) {
								return e.bottom.y === o
							}))
						}, u = 0; u <= e.height; u++) i(u);
					t.push.apply(t, r.filter((function(e) {
						return e.bottom.y - e.top.y >= 2
					}))), n.push.apply(n, s);
					var f = t.filter((function(e) {
						return e.bottom.y - e.top.y >= 2
					})).map((function(t) {
						var r = (t.top.startX + t.top.endX + t.bottom.startX + t.bottom.endX) / 4,
							o = (t.top.y + t.bottom.y + 1) / 2;
						if(e.get(Math.round(r), Math.round(o))) {
							var n = [t.top.endX - t.top.startX, t.bottom.endX - t.bottom.startX, t.bottom.y - t.top.y + 1],
								s = a(n) / n.length;
							return {
								score: l({
									x: Math.round(r),
									y: Math.round(o)
								}, [1, 1, 3, 1, 1], e),
								x: r,
								y: o,
								size: s
							}
						}
					})).filter((function(e) {
						return !!e
					})).sort((function(e, t) {
						return e.score - t.score
					})).map((function(e, t, r) {
						if(t > 4) return null;
						var o = r.filter((function(e, r) {
							return t !== r
						})).map((function(t) {
							return {
								x: t.x,
								y: t.y,
								score: t.score + Math.pow(t.size - e.size, 2) / e.size,
								size: t.size
							}
						})).sort((function(e, t) {
							return e.score - t.score
						}));
						if(o.length < 2) return null;
						var a = e.score + o[0].score + o[1].score;
						return {
							points: [e].concat(o.slice(0, 2)),
							score: a
						}
					})).filter((function(e) {
						return !!e
					})).sort((function(e, t) {
						return e.score - t.score
					}));
					if(0 === f.length) return null;
					var h = function(e, t, r) {
							var a, n, s, i, l, d, c, u = o(e, t),
								f = o(t, r),
								h = o(e, r);
							return f >= u && f >= h ? (l = (a = [t, e, r])[0], d = a[1], c = a[2]) : h >= f && h >= u ? (l = (n = [e, t, r])[0], d = n[1], c = n[2]) : (l = (s = [e, r, t])[0], d = s[1], c = s[2]), (c.x - d.x) * (l.y - d.y) - (c.y - d.y) * (l.x - d.x) < 0 && (l = (i = [c, l])[0], c = i[1]), {
								bottomLeft: l,
								topLeft: d,
								topRight: c
							}
						}(f[0].points[0], f[0].points[1], f[0].points[2]),
						k = h.topRight,
						B = h.topLeft,
						m = h.bottomLeft,
						w = c(e, n, k, B, m),
						v = [];
					w && v.push({
						alignmentPattern: {
							x: w.alignmentPattern.x,
							y: w.alignmentPattern.y
						},
						bottomLeft: {
							x: m.x,
							y: m.y
						},
						dimension: w.dimension,
						topLeft: {
							x: B.x,
							y: B.y
						},
						topRight: {
							x: k.x,
							y: k.y
						}
					});
					var _ = d(e, k),
						b = d(e, B),
						p = d(e, m),
						g = c(e, n, _, b, p);
					return g && v.push({
						alignmentPattern: {
							x: g.alignmentPattern.x,
							y: g.alignmentPattern.y
						},
						bottomLeft: {
							x: p.x,
							y: p.y
						},
						topLeft: {
							x: b.x,
							y: b.y
						},
						topRight: {
							x: _.x,
							y: _.y
						},
						dimension: g.dimension
					}), 0 === v.length ? null : v
				}
			}]).default
		}, e.exports = o()
	}, , function(e, t) {
		var r, o, a = e.exports = {};

		function n() {
			throw new Error("setTimeout has not been defined")
		}

		function s() {
			throw new Error("clearTimeout has not been defined")
		}

		function i(e) {
			if(r === setTimeout) return setTimeout(e, 0);
			if((r === n || !r) && setTimeout) return r = setTimeout, setTimeout(e, 0);
			try {
				return r(e, 0)
			} catch(t) {
				try {
					return r.call(null, e, 0)
				} catch(t) {
					return r.call(this, e, 0)
				}
			}
		}! function() {
			try {
				r = "function" === typeof setTimeout ? setTimeout : n
			} catch(e) {
				r = n
			}
			try {
				o = "function" === typeof clearTimeout ? clearTimeout : s
			} catch(e) {
				o = s
			}
		}();
		var l, d = [],
			c = !1,
			u = -1;

		function f() {
			c && l && (c = !1, l.length ? d = l.concat(d) : u = -1, d.length && h())
		}

		function h() {
			if(!c) {
				var e = i(f);
				c = !0;
				for(var t = d.length; t;) {
					for(l = d, d = []; ++u < t;) l && l[u].run();
					u = -1, t = d.length
				}
				l = null, c = !1,
					function(e) {
						if(o === clearTimeout) return clearTimeout(e);
						if((o === s || !o) && clearTimeout) return o = clearTimeout, clearTimeout(e);
						try {
							o(e)
						} catch(t) {
							try {
								return o.call(null, e)
							} catch(t) {
								return o.call(this, e)
							}
						}
					}(e)
			}
		}

		function k(e, t) {
			this.fun = e, this.array = t
		}

		function B() {}
		a.nextTick = function(e) {
			var t = new Array(arguments.length - 1);
			if(arguments.length > 1)
				for(var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
			d.push(new k(e, t)), 1 !== d.length || c || i(h)
		}, k.prototype.run = function() {
			this.fun.apply(null, this.array)
		}, a.title = "browser", a.browser = !0, a.env = {}, a.argv = [], a.version = "", a.versions = {}, a.on = B, a.addListener = B, a.once = B, a.off = B, a.removeListener = B, a.removeAllListeners = B, a.emit = B, a.prependListener = B, a.prependOnceListener = B, a.listeners = function(e) {
			return []
		}, a.binding = function(e) {
			throw new Error("process.binding is not supported")
		}, a.cwd = function() {
			return "/"
		}, a.chdir = function(e) {
			throw new Error("process.chdir is not supported")
		}, a.umask = function() {
			return 0
		}
	}, function(e, t, r) {
		"use strict";
		var o = {};
		(0, r(0).assign)(o, r(12), r(15), r(7)), e.exports = o
	}, function(e, t, r) {
		"use strict";
		var o = r(13),
			a = r(0),
			n = r(5),
			s = r(1),
			i = r(6),
			l = Object.prototype.toString;

		function d(e) {
			if(!(this instanceof d)) return new d(e);
			this.options = a.assign({
				level: -1,
				method: 8,
				chunkSize: 16384,
				windowBits: 15,
				memLevel: 8,
				strategy: 0,
				to: ""
			}, e || {});
			var t = this.options;
			t.raw && t.windowBits > 0 ? t.windowBits = -t.windowBits : t.gzip && t.windowBits > 0 && t.windowBits < 16 && (t.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new i, this.strm.avail_out = 0;
			var r = o.deflateInit2(this.strm, t.level, t.method, t.windowBits, t.memLevel, t.strategy);
			if(0 !== r) throw new Error(s[r]);
			if(t.header && o.deflateSetHeader(this.strm, t.header), t.dictionary) {
				var c;
				if(c = "string" === typeof t.dictionary ? n.string2buf(t.dictionary) : "[object ArrayBuffer]" === l.call(t.dictionary) ? new Uint8Array(t.dictionary) : t.dictionary, 0 !== (r = o.deflateSetDictionary(this.strm, c))) throw new Error(s[r]);
				this._dict_set = !0
			}
		}

		function c(e, t) {
			var r = new d(t);
			if(r.push(e, !0), r.err) throw r.msg || s[r.err];
			return r.result
		}
		d.prototype.push = function(e, t) {
			var r, s, i = this.strm,
				d = this.options.chunkSize;
			if(this.ended) return !1;
			s = t === ~~t ? t : !0 === t ? 4 : 0, "string" === typeof e ? i.input = n.string2buf(e) : "[object ArrayBuffer]" === l.call(e) ? i.input = new Uint8Array(e) : i.input = e, i.next_in = 0, i.avail_in = i.input.length;
			do {
				if(0 === i.avail_out && (i.output = new a.Buf8(d), i.next_out = 0, i.avail_out = d), 1 !== (r = o.deflate(i, s)) && 0 !== r) return this.onEnd(r), this.ended = !0, !1;
				0 !== i.avail_out && (0 !== i.avail_in || 4 !== s && 2 !== s) || ("string" === this.options.to ? this.onData(n.buf2binstring(a.shrinkBuf(i.output, i.next_out))) : this.onData(a.shrinkBuf(i.output, i.next_out)))
			} while ((i.avail_in > 0 || 0 === i.avail_out) && 1 !== r);
			return 4 === s ? (r = o.deflateEnd(this.strm), this.onEnd(r), this.ended = !0, 0 === r) : 2 !== s || (this.onEnd(0), i.avail_out = 0, !0)
		}, d.prototype.onData = function(e) {
			this.chunks.push(e)
		}, d.prototype.onEnd = function(e) {
			0 === e && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = a.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg
		}, t.Deflate = d, t.deflate = c, t.deflateRaw = function(e, t) {
			return(t = t || {}).raw = !0, c(e, t)
		}, t.gzip = function(e, t) {
			return(t = t || {}).gzip = !0, c(e, t)
		}
	}, function(e, t, r) {
		"use strict";
		var o, a = r(0),
			n = r(14),
			s = r(3),
			i = r(4),
			l = r(1);

		function d(e, t) {
			return e.msg = l[t], t
		}

		function c(e) {
			return(e << 1) - (e > 4 ? 9 : 0)
		}

		function u(e) {
			for(var t = e.length; --t >= 0;) e[t] = 0
		}

		function f(e) {
			var t = e.state,
				r = t.pending;
			r > e.avail_out && (r = e.avail_out), 0 !== r && (a.arraySet(e.output, t.pending_buf, t.pending_out, r, e.next_out), e.next_out += r, t.pending_out += r, e.total_out += r, e.avail_out -= r, t.pending -= r, 0 === t.pending && (t.pending_out = 0))
		}

		function h(e, t) {
			n._tr_flush_block(e, e.block_start >= 0 ? e.block_start : -1, e.strstart - e.block_start, t), e.block_start = e.strstart, f(e.strm)
		}

		function k(e, t) {
			e.pending_buf[e.pending++] = t
		}

		function B(e, t) {
			e.pending_buf[e.pending++] = t >>> 8 & 255, e.pending_buf[e.pending++] = 255 & t
		}

		function m(e, t, r, o) {
			var n = e.avail_in;
			return n > o && (n = o), 0 === n ? 0 : (e.avail_in -= n, a.arraySet(t, e.input, e.next_in, n, r), 1 === e.state.wrap ? e.adler = s(e.adler, t, n, r) : 2 === e.state.wrap && (e.adler = i(e.adler, t, n, r)), e.next_in += n, e.total_in += n, n)
		}

		function w(e, t) {
			var r, o, a = e.max_chain_length,
				n = e.strstart,
				s = e.prev_length,
				i = e.nice_match,
				l = e.strstart > e.w_size - 262 ? e.strstart - (e.w_size - 262) : 0,
				d = e.window,
				c = e.w_mask,
				u = e.prev,
				f = e.strstart + 258,
				h = d[n + s - 1],
				k = d[n + s];
			e.prev_length >= e.good_match && (a >>= 2), i > e.lookahead && (i = e.lookahead);
			do {
				if(d[(r = t) + s] === k && d[r + s - 1] === h && d[r] === d[n] && d[++r] === d[n + 1]) {
					n += 2, r++;
					do {} while (d[++n] === d[++r] && d[++n] === d[++r] && d[++n] === d[++r] && d[++n] === d[++r] && d[++n] === d[++r] && d[++n] === d[++r] && d[++n] === d[++r] && d[++n] === d[++r] && n < f);
					if(o = 258 - (f - n), n = f - 258, o > s) {
						if(e.match_start = t, s = o, o >= i) break;
						h = d[n + s - 1], k = d[n + s]
					}
				}
			} while ((t = u[t & c]) > l && 0 !== --a);
			return s <= e.lookahead ? s : e.lookahead
		}

		function v(e) {
			var t, r, o, n, s, i = e.w_size;
			do {
				if(n = e.window_size - e.lookahead - e.strstart, e.strstart >= i + (i - 262)) {
					a.arraySet(e.window, e.window, i, i, 0), e.match_start -= i, e.strstart -= i, e.block_start -= i, t = r = e.hash_size;
					do {
						o = e.head[--t], e.head[t] = o >= i ? o - i : 0
					} while (--r);
					t = r = i;
					do {
						o = e.prev[--t], e.prev[t] = o >= i ? o - i : 0
					} while (--r);
					n += i
				}
				if(0 === e.strm.avail_in) break;
				if(r = m(e.strm, e.window, e.strstart + e.lookahead, n), e.lookahead += r, e.lookahead + e.insert >= 3)
					for(s = e.strstart - e.insert, e.ins_h = e.window[s], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[s + 1]) & e.hash_mask; e.insert && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[s + 3 - 1]) & e.hash_mask, e.prev[s & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = s, s++, e.insert--, !(e.lookahead + e.insert < 3)););
			} while (e.lookahead < 262 && 0 !== e.strm.avail_in)
		}

		function _(e, t) {
			for(var r, o;;) {
				if(e.lookahead < 262) {
					if(v(e), e.lookahead < 262 && 0 === t) return 1;
					if(0 === e.lookahead) break
				}
				if(r = 0, e.lookahead >= 3 && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 3 - 1]) & e.hash_mask, r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), 0 !== r && e.strstart - r <= e.w_size - 262 && (e.match_length = w(e, r)), e.match_length >= 3)
					if(o = n._tr_tally(e, e.strstart - e.match_start, e.match_length - 3), e.lookahead -= e.match_length, e.match_length <= e.max_lazy_match && e.lookahead >= 3) {
						e.match_length--;
						do {
							e.strstart++, e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 3 - 1]) & e.hash_mask, r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart
						} while (0 !== --e.match_length);
						e.strstart++
					} else e.strstart += e.match_length, e.match_length = 0, e.ins_h = e.window[e.strstart], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 1]) & e.hash_mask;
				else o = n._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++;
				if(o && (h(e, !1), 0 === e.strm.avail_out)) return 1
			}
			return e.insert = e.strstart < 2 ? e.strstart : 2, 4 === t ? (h(e, !0), 0 === e.strm.avail_out ? 3 : 4) : e.last_lit && (h(e, !1), 0 === e.strm.avail_out) ? 1 : 2
		}

		function b(e, t) {
			for(var r, o, a;;) {
				if(e.lookahead < 262) {
					if(v(e), e.lookahead < 262 && 0 === t) return 1;
					if(0 === e.lookahead) break
				}
				if(r = 0, e.lookahead >= 3 && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 3 - 1]) & e.hash_mask, r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), e.prev_length = e.match_length, e.prev_match = e.match_start, e.match_length = 2, 0 !== r && e.prev_length < e.max_lazy_match && e.strstart - r <= e.w_size - 262 && (e.match_length = w(e, r), e.match_length <= 5 && (1 === e.strategy || 3 === e.match_length && e.strstart - e.match_start > 4096) && (e.match_length = 2)), e.prev_length >= 3 && e.match_length <= e.prev_length) {
					a = e.strstart + e.lookahead - 3, o = n._tr_tally(e, e.strstart - 1 - e.prev_match, e.prev_length - 3), e.lookahead -= e.prev_length - 1, e.prev_length -= 2;
					do {
						++e.strstart <= a && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 3 - 1]) & e.hash_mask, r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart)
					} while (0 !== --e.prev_length);
					if(e.match_available = 0, e.match_length = 2, e.strstart++, o && (h(e, !1), 0 === e.strm.avail_out)) return 1
				} else if(e.match_available) {
					if((o = n._tr_tally(e, 0, e.window[e.strstart - 1])) && h(e, !1), e.strstart++, e.lookahead--, 0 === e.strm.avail_out) return 1
				} else e.match_available = 1, e.strstart++, e.lookahead--
			}
			return e.match_available && (o = n._tr_tally(e, 0, e.window[e.strstart - 1]), e.match_available = 0), e.insert = e.strstart < 2 ? e.strstart : 2, 4 === t ? (h(e, !0), 0 === e.strm.avail_out ? 3 : 4) : e.last_lit && (h(e, !1), 0 === e.strm.avail_out) ? 1 : 2
		}

		function p(e, t, r, o, a) {
			this.good_length = e, this.max_lazy = t, this.nice_length = r, this.max_chain = o, this.func = a
		}

		function g() {
			this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = 8, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new a.Buf16(1146), this.dyn_dtree = new a.Buf16(122), this.bl_tree = new a.Buf16(78), u(this.dyn_ltree), u(this.dyn_dtree), u(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new a.Buf16(16), this.heap = new a.Buf16(573), u(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new a.Buf16(573), u(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0
		}

		function C(e) {
			var t;
			return e && e.state ? (e.total_in = e.total_out = 0, e.data_type = 2, (t = e.state).pending = 0, t.pending_out = 0, t.wrap < 0 && (t.wrap = -t.wrap), t.status = t.wrap ? 42 : 113, e.adler = 2 === t.wrap ? 0 : 1, t.last_flush = 0, n._tr_init(t), 0) : d(e, -2)
		}

		function P(e) {
			var t, r = C(e);
			return 0 === r && ((t = e.state).window_size = 2 * t.w_size, u(t.head), t.max_lazy_match = o[t.level].max_lazy, t.good_match = o[t.level].good_length, t.nice_match = o[t.level].nice_length, t.max_chain_length = o[t.level].max_chain, t.strstart = 0, t.block_start = 0, t.lookahead = 0, t.insert = 0, t.match_length = t.prev_length = 2, t.match_available = 0, t.ins_h = 0), r
		}

		function y(e, t, r, o, n, s) {
			if(!e) return -2;
			var i = 1;
			if(-1 === t && (t = 6), o < 0 ? (i = 0, o = -o) : o > 15 && (i = 2, o -= 16), n < 1 || n > 9 || 8 !== r || o < 8 || o > 15 || t < 0 || t > 9 || s < 0 || s > 4) return d(e, -2);
			8 === o && (o = 9);
			var l = new g;
			return e.state = l, l.strm = e, l.wrap = i, l.gzhead = null, l.w_bits = o, l.w_size = 1 << l.w_bits, l.w_mask = l.w_size - 1, l.hash_bits = n + 7, l.hash_size = 1 << l.hash_bits, l.hash_mask = l.hash_size - 1, l.hash_shift = ~~((l.hash_bits + 3 - 1) / 3), l.window = new a.Buf8(2 * l.w_size), l.head = new a.Buf16(l.hash_size), l.prev = new a.Buf16(l.w_size), l.lit_bufsize = 1 << n + 6, l.pending_buf_size = 4 * l.lit_bufsize, l.pending_buf = new a.Buf8(l.pending_buf_size), l.d_buf = 1 * l.lit_bufsize, l.l_buf = 3 * l.lit_bufsize, l.level = t, l.strategy = s, l.method = r, P(e)
		}
		o = [new p(0, 0, 0, 0, (function(e, t) {
			var r = 65535;
			for(r > e.pending_buf_size - 5 && (r = e.pending_buf_size - 5);;) {
				if(e.lookahead <= 1) {
					if(v(e), 0 === e.lookahead && 0 === t) return 1;
					if(0 === e.lookahead) break
				}
				e.strstart += e.lookahead, e.lookahead = 0;
				var o = e.block_start + r;
				if((0 === e.strstart || e.strstart >= o) && (e.lookahead = e.strstart - o, e.strstart = o, h(e, !1), 0 === e.strm.avail_out)) return 1;
				if(e.strstart - e.block_start >= e.w_size - 262 && (h(e, !1), 0 === e.strm.avail_out)) return 1
			}
			return e.insert = 0, 4 === t ? (h(e, !0), 0 === e.strm.avail_out ? 3 : 4) : (e.strstart > e.block_start && (h(e, !1), e.strm.avail_out), 1)
		})), new p(4, 4, 8, 4, _), new p(4, 5, 16, 8, _), new p(4, 6, 32, 32, _), new p(4, 4, 16, 16, b), new p(8, 16, 32, 32, b), new p(8, 16, 128, 128, b), new p(8, 32, 128, 256, b), new p(32, 128, 258, 1024, b), new p(32, 258, 258, 4096, b)], t.deflateInit = function(e, t) {
			return y(e, t, 8, 15, 8, 0)
		}, t.deflateInit2 = y, t.deflateReset = P, t.deflateResetKeep = C, t.deflateSetHeader = function(e, t) {
			return e && e.state ? 2 !== e.state.wrap ? -2 : (e.state.gzhead = t, 0) : -2
		}, t.deflate = function(e, t) {
			var r, a, s, l;
			if(!e || !e.state || t > 5 || t < 0) return e ? d(e, -2) : -2;
			if(a = e.state, !e.output || !e.input && 0 !== e.avail_in || 666 === a.status && 4 !== t) return d(e, 0 === e.avail_out ? -5 : -2);
			if(a.strm = e, r = a.last_flush, a.last_flush = t, 42 === a.status)
				if(2 === a.wrap) e.adler = 0, k(a, 31), k(a, 139), k(a, 8), a.gzhead ? (k(a, (a.gzhead.text ? 1 : 0) + (a.gzhead.hcrc ? 2 : 0) + (a.gzhead.extra ? 4 : 0) + (a.gzhead.name ? 8 : 0) + (a.gzhead.comment ? 16 : 0)), k(a, 255 & a.gzhead.time), k(a, a.gzhead.time >> 8 & 255), k(a, a.gzhead.time >> 16 & 255), k(a, a.gzhead.time >> 24 & 255), k(a, 9 === a.level ? 2 : a.strategy >= 2 || a.level < 2 ? 4 : 0), k(a, 255 & a.gzhead.os), a.gzhead.extra && a.gzhead.extra.length && (k(a, 255 & a.gzhead.extra.length), k(a, a.gzhead.extra.length >> 8 & 255)), a.gzhead.hcrc && (e.adler = i(e.adler, a.pending_buf, a.pending, 0)), a.gzindex = 0, a.status = 69) : (k(a, 0), k(a, 0), k(a, 0), k(a, 0), k(a, 0), k(a, 9 === a.level ? 2 : a.strategy >= 2 || a.level < 2 ? 4 : 0), k(a, 3), a.status = 113);
				else {
					var m = 8 + (a.w_bits - 8 << 4) << 8;
					m |= (a.strategy >= 2 || a.level < 2 ? 0 : a.level < 6 ? 1 : 6 === a.level ? 2 : 3) << 6, 0 !== a.strstart && (m |= 32), m += 31 - m % 31, a.status = 113, B(a, m), 0 !== a.strstart && (B(a, e.adler >>> 16), B(a, 65535 & e.adler)), e.adler = 1
				}
			if(69 === a.status)
				if(a.gzhead.extra) {
					for(s = a.pending; a.gzindex < (65535 & a.gzhead.extra.length) && (a.pending !== a.pending_buf_size || (a.gzhead.hcrc && a.pending > s && (e.adler = i(e.adler, a.pending_buf, a.pending - s, s)), f(e), s = a.pending, a.pending !== a.pending_buf_size));) k(a, 255 & a.gzhead.extra[a.gzindex]), a.gzindex++;
					a.gzhead.hcrc && a.pending > s && (e.adler = i(e.adler, a.pending_buf, a.pending - s, s)), a.gzindex === a.gzhead.extra.length && (a.gzindex = 0, a.status = 73)
				} else a.status = 73;
			if(73 === a.status)
				if(a.gzhead.name) {
					s = a.pending;
					do {
						if(a.pending === a.pending_buf_size && (a.gzhead.hcrc && a.pending > s && (e.adler = i(e.adler, a.pending_buf, a.pending - s, s)), f(e), s = a.pending, a.pending === a.pending_buf_size)) {
							l = 1;
							break
						}
						l = a.gzindex < a.gzhead.name.length ? 255 & a.gzhead.name.charCodeAt(a.gzindex++) : 0, k(a, l)
					} while (0 !== l);
					a.gzhead.hcrc && a.pending > s && (e.adler = i(e.adler, a.pending_buf, a.pending - s, s)), 0 === l && (a.gzindex = 0, a.status = 91)
				} else a.status = 91;
			if(91 === a.status)
				if(a.gzhead.comment) {
					s = a.pending;
					do {
						if(a.pending === a.pending_buf_size && (a.gzhead.hcrc && a.pending > s && (e.adler = i(e.adler, a.pending_buf, a.pending - s, s)), f(e), s = a.pending, a.pending === a.pending_buf_size)) {
							l = 1;
							break
						}
						l = a.gzindex < a.gzhead.comment.length ? 255 & a.gzhead.comment.charCodeAt(a.gzindex++) : 0, k(a, l)
					} while (0 !== l);
					a.gzhead.hcrc && a.pending > s && (e.adler = i(e.adler, a.pending_buf, a.pending - s, s)), 0 === l && (a.status = 103)
				} else a.status = 103;
			if(103 === a.status && (a.gzhead.hcrc ? (a.pending + 2 > a.pending_buf_size && f(e), a.pending + 2 <= a.pending_buf_size && (k(a, 255 & e.adler), k(a, e.adler >> 8 & 255), e.adler = 0, a.status = 113)) : a.status = 113), 0 !== a.pending) {
				if(f(e), 0 === e.avail_out) return a.last_flush = -1, 0
			} else if(0 === e.avail_in && c(t) <= c(r) && 4 !== t) return d(e, -5);
			if(666 === a.status && 0 !== e.avail_in) return d(e, -5);
			if(0 !== e.avail_in || 0 !== a.lookahead || 0 !== t && 666 !== a.status) {
				var w = 2 === a.strategy ? function(e, t) {
					for(var r;;) {
						if(0 === e.lookahead && (v(e), 0 === e.lookahead)) {
							if(0 === t) return 1;
							break
						}
						if(e.match_length = 0, r = n._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++, r && (h(e, !1), 0 === e.strm.avail_out)) return 1
					}
					return e.insert = 0, 4 === t ? (h(e, !0), 0 === e.strm.avail_out ? 3 : 4) : e.last_lit && (h(e, !1), 0 === e.strm.avail_out) ? 1 : 2
				}(a, t) : 3 === a.strategy ? function(e, t) {
					for(var r, o, a, s, i = e.window;;) {
						if(e.lookahead <= 258) {
							if(v(e), e.lookahead <= 258 && 0 === t) return 1;
							if(0 === e.lookahead) break
						}
						if(e.match_length = 0, e.lookahead >= 3 && e.strstart > 0 && (o = i[a = e.strstart - 1]) === i[++a] && o === i[++a] && o === i[++a]) {
							s = e.strstart + 258;
							do {} while (o === i[++a] && o === i[++a] && o === i[++a] && o === i[++a] && o === i[++a] && o === i[++a] && o === i[++a] && o === i[++a] && a < s);
							e.match_length = 258 - (s - a), e.match_length > e.lookahead && (e.match_length = e.lookahead)
						}
						if(e.match_length >= 3 ? (r = n._tr_tally(e, 1, e.match_length - 3), e.lookahead -= e.match_length, e.strstart += e.match_length, e.match_length = 0) : (r = n._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++), r && (h(e, !1), 0 === e.strm.avail_out)) return 1
					}
					return e.insert = 0, 4 === t ? (h(e, !0), 0 === e.strm.avail_out ? 3 : 4) : e.last_lit && (h(e, !1), 0 === e.strm.avail_out) ? 1 : 2
				}(a, t) : o[a.level].func(a, t);
				if(3 !== w && 4 !== w || (a.status = 666), 1 === w || 3 === w) return 0 === e.avail_out && (a.last_flush = -1), 0;
				if(2 === w && (1 === t ? n._tr_align(a) : 5 !== t && (n._tr_stored_block(a, 0, 0, !1), 3 === t && (u(a.head), 0 === a.lookahead && (a.strstart = 0, a.block_start = 0, a.insert = 0))), f(e), 0 === e.avail_out)) return a.last_flush = -1, 0
			}
			return 4 !== t ? 0 : a.wrap <= 0 ? 1 : (2 === a.wrap ? (k(a, 255 & e.adler), k(a, e.adler >> 8 & 255), k(a, e.adler >> 16 & 255), k(a, e.adler >> 24 & 255), k(a, 255 & e.total_in), k(a, e.total_in >> 8 & 255), k(a, e.total_in >> 16 & 255), k(a, e.total_in >> 24 & 255)) : (B(a, e.adler >>> 16), B(a, 65535 & e.adler)), f(e), a.wrap > 0 && (a.wrap = -a.wrap), 0 !== a.pending ? 0 : 1)
		}, t.deflateEnd = function(e) {
			var t;
			return e && e.state ? 42 !== (t = e.state.status) && 69 !== t && 73 !== t && 91 !== t && 103 !== t && 113 !== t && 666 !== t ? d(e, -2) : (e.state = null, 113 === t ? d(e, -3) : 0) : -2
		}, t.deflateSetDictionary = function(e, t) {
			var r, o, n, i, l, d, c, f, h = t.length;
			if(!e || !e.state) return -2;
			if(2 === (i = (r = e.state).wrap) || 1 === i && 42 !== r.status || r.lookahead) return -2;
			for(1 === i && (e.adler = s(e.adler, t, h, 0)), r.wrap = 0, h >= r.w_size && (0 === i && (u(r.head), r.strstart = 0, r.block_start = 0, r.insert = 0), f = new a.Buf8(r.w_size), a.arraySet(f, t, h - r.w_size, r.w_size, 0), t = f, h = r.w_size), l = e.avail_in, d = e.next_in, c = e.input, e.avail_in = h, e.next_in = 0, e.input = t, v(r); r.lookahead >= 3;) {
				o = r.strstart, n = r.lookahead - 2;
				do {
					r.ins_h = (r.ins_h << r.hash_shift ^ r.window[o + 3 - 1]) & r.hash_mask, r.prev[o & r.w_mask] = r.head[r.ins_h], r.head[r.ins_h] = o, o++
				} while (--n);
				r.strstart = o, r.lookahead = 2, v(r)
			}
			return r.strstart += r.lookahead, r.block_start = r.strstart, r.insert = r.lookahead, r.lookahead = 0, r.match_length = r.prev_length = 2, r.match_available = 0, e.next_in = d, e.input = c, e.avail_in = l, r.wrap = i, 0
		}, t.deflateInfo = "pako deflate (from Nodeca project)"
	}, function(e, t, r) {
		"use strict";
		var o = r(0);

		function a(e) {
			for(var t = e.length; --t >= 0;) e[t] = 0
		}
		var n = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
			s = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
			i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
			l = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
			d = new Array(576);
		a(d);
		var c = new Array(60);
		a(c);
		var u = new Array(512);
		a(u);
		var f = new Array(256);
		a(f);
		var h = new Array(29);
		a(h);
		var k, B, m, w = new Array(30);

		function v(e, t, r, o, a) {
			this.static_tree = e, this.extra_bits = t, this.extra_base = r, this.elems = o, this.max_length = a, this.has_stree = e && e.length
		}

		function _(e, t) {
			this.dyn_tree = e, this.max_code = 0, this.stat_desc = t
		}

		function b(e) {
			return e < 256 ? u[e] : u[256 + (e >>> 7)]
		}

		function p(e, t) {
			e.pending_buf[e.pending++] = 255 & t, e.pending_buf[e.pending++] = t >>> 8 & 255
		}

		function g(e, t, r) {
			e.bi_valid > 16 - r ? (e.bi_buf |= t << e.bi_valid & 65535, p(e, e.bi_buf), e.bi_buf = t >> 16 - e.bi_valid, e.bi_valid += r - 16) : (e.bi_buf |= t << e.bi_valid & 65535, e.bi_valid += r)
		}

		function C(e, t, r) {
			g(e, r[2 * t], r[2 * t + 1])
		}

		function P(e, t) {
			var r = 0;
			do {
				r |= 1 & e, e >>>= 1, r <<= 1
			} while (--t > 0);
			return r >>> 1
		}

		function y(e, t, r) {
			var o, a, n = new Array(16),
				s = 0;
			for(o = 1; o <= 15; o++) n[o] = s = s + r[o - 1] << 1;
			for(a = 0; a <= t; a++) {
				var i = e[2 * a + 1];
				0 !== i && (e[2 * a] = P(n[i] ++, i))
			}
		}

		function x(e) {
			var t;
			for(t = 0; t < 286; t++) e.dyn_ltree[2 * t] = 0;
			for(t = 0; t < 30; t++) e.dyn_dtree[2 * t] = 0;
			for(t = 0; t < 19; t++) e.bl_tree[2 * t] = 0;
			e.dyn_ltree[512] = 1, e.opt_len = e.static_len = 0, e.last_lit = e.matches = 0
		}

		function z(e) {
			e.bi_valid > 8 ? p(e, e.bi_buf) : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf), e.bi_buf = 0, e.bi_valid = 0
		}

		function M(e, t, r, o) {
			var a = 2 * t,
				n = 2 * r;
			return e[a] < e[n] || e[a] === e[n] && o[t] <= o[r]
		}

		function A(e, t, r) {
			for(var o = e.heap[r], a = r << 1; a <= e.heap_len && (a < e.heap_len && M(t, e.heap[a + 1], e.heap[a], e.depth) && a++, !M(t, o, e.heap[a], e.depth));) e.heap[r] = e.heap[a], r = a, a <<= 1;
			e.heap[r] = o
		}

		function L(e, t, r) {
			var o, a, i, l, d = 0;
			if(0 !== e.last_lit)
				do {
					o = e.pending_buf[e.d_buf + 2 * d] << 8 | e.pending_buf[e.d_buf + 2 * d + 1], a = e.pending_buf[e.l_buf + d], d++, 0 === o ? C(e, a, t) : (C(e, (i = f[a]) + 256 + 1, t), 0 !== (l = n[i]) && g(e, a -= h[i], l), C(e, i = b(--o), r), 0 !== (l = s[i]) && g(e, o -= w[i], l))
				} while (d < e.last_lit);
			C(e, 256, t)
		}

		function S(e, t) {
			var r, o, a, n = t.dyn_tree,
				s = t.stat_desc.static_tree,
				i = t.stat_desc.has_stree,
				l = t.stat_desc.elems,
				d = -1;
			for(e.heap_len = 0, e.heap_max = 573, r = 0; r < l; r++) 0 !== n[2 * r] ? (e.heap[++e.heap_len] = d = r, e.depth[r] = 0) : n[2 * r + 1] = 0;
			for(; e.heap_len < 2;) n[2 * (a = e.heap[++e.heap_len] = d < 2 ? ++d : 0)] = 1, e.depth[a] = 0, e.opt_len--, i && (e.static_len -= s[2 * a + 1]);
			for(t.max_code = d, r = e.heap_len >> 1; r >= 1; r--) A(e, n, r);
			a = l;
			do {
				r = e.heap[1], e.heap[1] = e.heap[e.heap_len--], A(e, n, 1), o = e.heap[1], e.heap[--e.heap_max] = r, e.heap[--e.heap_max] = o, n[2 * a] = n[2 * r] + n[2 * o], e.depth[a] = (e.depth[r] >= e.depth[o] ? e.depth[r] : e.depth[o]) + 1, n[2 * r + 1] = n[2 * o + 1] = a, e.heap[1] = a++, A(e, n, 1)
			} while (e.heap_len >= 2);
			e.heap[--e.heap_max] = e.heap[1],
				function(e, t) {
					var r, o, a, n, s, i, l = t.dyn_tree,
						d = t.max_code,
						c = t.stat_desc.static_tree,
						u = t.stat_desc.has_stree,
						f = t.stat_desc.extra_bits,
						h = t.stat_desc.extra_base,
						k = t.stat_desc.max_length,
						B = 0;
					for(n = 0; n <= 15; n++) e.bl_count[n] = 0;
					for(l[2 * e.heap[e.heap_max] + 1] = 0, r = e.heap_max + 1; r < 573; r++)(n = l[2 * l[2 * (o = e.heap[r]) + 1] + 1] + 1) > k && (n = k, B++), l[2 * o + 1] = n, o > d || (e.bl_count[n] ++, s = 0, o >= h && (s = f[o - h]), i = l[2 * o], e.opt_len += i * (n + s), u && (e.static_len += i * (c[2 * o + 1] + s)));
					if(0 !== B) {
						do {
							for(n = k - 1; 0 === e.bl_count[n];) n--;
							e.bl_count[n] --, e.bl_count[n + 1] += 2, e.bl_count[k] --, B -= 2
						} while (B > 0);
						for(n = k; 0 !== n; n--)
							for(o = e.bl_count[n]; 0 !== o;)(a = e.heap[--r]) > d || (l[2 * a + 1] !== n && (e.opt_len += (n - l[2 * a + 1]) * l[2 * a], l[2 * a + 1] = n), o--)
					}
				}(e, t), y(n, d, e.bl_count)
		}

		function I(e, t, r) {
			var o, a, n = -1,
				s = t[1],
				i = 0,
				l = 7,
				d = 4;
			for(0 === s && (l = 138, d = 3), t[2 * (r + 1) + 1] = 65535, o = 0; o <= r; o++) a = s, s = t[2 * (o + 1) + 1], ++i < l && a === s || (i < d ? e.bl_tree[2 * a] += i : 0 !== a ? (a !== n && e.bl_tree[2 * a] ++, e.bl_tree[32] ++) : i <= 10 ? e.bl_tree[34] ++ : e.bl_tree[36] ++, i = 0, n = a, 0 === s ? (l = 138, d = 3) : a === s ? (l = 6, d = 3) : (l = 7, d = 4))
		}

		function N(e, t, r) {
			var o, a, n = -1,
				s = t[1],
				i = 0,
				l = 7,
				d = 4;
			for(0 === s && (l = 138, d = 3), o = 0; o <= r; o++)
				if(a = s, s = t[2 * (o + 1) + 1], !(++i < l && a === s)) {
					if(i < d)
						do {
							C(e, a, e.bl_tree)
						} while (0 !== --i);
					else 0 !== a ? (a !== n && (C(e, a, e.bl_tree), i--), C(e, 16, e.bl_tree), g(e, i - 3, 2)) : i <= 10 ? (C(e, 17, e.bl_tree), g(e, i - 3, 3)) : (C(e, 18, e.bl_tree), g(e, i - 11, 7));
					i = 0, n = a, 0 === s ? (l = 138, d = 3) : a === s ? (l = 6, d = 3) : (l = 7, d = 4)
				}
		}
		a(w);
		var E = !1;

		function U(e, t, r, a) {
			g(e, 0 + (a ? 1 : 0), 3),
				function(e, t, r, a) {
					z(e), a && (p(e, r), p(e, ~r)), o.arraySet(e.pending_buf, e.window, t, r, e.pending), e.pending += r
				}(e, t, r, !0)
		}
		t._tr_init = function(e) {
			E || (! function() {
				var e, t, r, o, a, l = new Array(16);
				for(r = 0, o = 0; o < 28; o++)
					for(h[o] = r, e = 0; e < 1 << n[o]; e++) f[r++] = o;
				for(f[r - 1] = o, a = 0, o = 0; o < 16; o++)
					for(w[o] = a, e = 0; e < 1 << s[o]; e++) u[a++] = o;
				for(a >>= 7; o < 30; o++)
					for(w[o] = a << 7, e = 0; e < 1 << s[o] - 7; e++) u[256 + a++] = o;
				for(t = 0; t <= 15; t++) l[t] = 0;
				for(e = 0; e <= 143;) d[2 * e + 1] = 8, e++, l[8] ++;
				for(; e <= 255;) d[2 * e + 1] = 9, e++, l[9] ++;
				for(; e <= 279;) d[2 * e + 1] = 7, e++, l[7] ++;
				for(; e <= 287;) d[2 * e + 1] = 8, e++, l[8] ++;
				for(y(d, 287, l), e = 0; e < 30; e++) c[2 * e + 1] = 5, c[2 * e] = P(e, 5);
				k = new v(d, n, 257, 286, 15), B = new v(c, s, 0, 30, 15), m = new v(new Array(0), i, 0, 19, 7)
			}(), E = !0), e.l_desc = new _(e.dyn_ltree, k), e.d_desc = new _(e.dyn_dtree, B), e.bl_desc = new _(e.bl_tree, m), e.bi_buf = 0, e.bi_valid = 0, x(e)
		}, t._tr_stored_block = U, t._tr_flush_block = function(e, t, r, o) {
			var a, n, s = 0;
			e.level > 0 ? (2 === e.strm.data_type && (e.strm.data_type = function(e) {
				var t, r = 4093624447;
				for(t = 0; t <= 31; t++, r >>>= 1)
					if(1 & r && 0 !== e.dyn_ltree[2 * t]) return 0;
				if(0 !== e.dyn_ltree[18] || 0 !== e.dyn_ltree[20] || 0 !== e.dyn_ltree[26]) return 1;
				for(t = 32; t < 256; t++)
					if(0 !== e.dyn_ltree[2 * t]) return 1;
				return 0
			}(e)), S(e, e.l_desc), S(e, e.d_desc), s = function(e) {
				var t;
				for(I(e, e.dyn_ltree, e.l_desc.max_code), I(e, e.dyn_dtree, e.d_desc.max_code), S(e, e.bl_desc), t = 18; t >= 3 && 0 === e.bl_tree[2 * l[t] + 1]; t--);
				return e.opt_len += 3 * (t + 1) + 5 + 5 + 4, t
			}(e), a = e.opt_len + 3 + 7 >>> 3, (n = e.static_len + 3 + 7 >>> 3) <= a && (a = n)) : a = n = r + 5, r + 4 <= a && -1 !== t ? U(e, t, r, o) : 4 === e.strategy || n === a ? (g(e, 2 + (o ? 1 : 0), 3), L(e, d, c)) : (g(e, 4 + (o ? 1 : 0), 3), function(e, t, r, o) {
				var a;
				for(g(e, t - 257, 5), g(e, r - 1, 5), g(e, o - 4, 4), a = 0; a < o; a++) g(e, e.bl_tree[2 * l[a] + 1], 3);
				N(e, e.dyn_ltree, t - 1), N(e, e.dyn_dtree, r - 1)
			}(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, s + 1), L(e, e.dyn_ltree, e.dyn_dtree)), x(e), o && z(e)
		}, t._tr_tally = function(e, t, r) {
			return e.pending_buf[e.d_buf + 2 * e.last_lit] = t >>> 8 & 255, e.pending_buf[e.d_buf + 2 * e.last_lit + 1] = 255 & t, e.pending_buf[e.l_buf + e.last_lit] = 255 & r, e.last_lit++, 0 === t ? e.dyn_ltree[2 * r] ++ : (e.matches++, t--, e.dyn_ltree[2 * (f[r] + 256 + 1)] ++, e.dyn_dtree[2 * b(t)] ++), e.last_lit === e.lit_bufsize - 1
		}, t._tr_align = function(e) {
			g(e, 2, 3), C(e, 256, d),
				function(e) {
					16 === e.bi_valid ? (p(e, e.bi_buf), e.bi_buf = 0, e.bi_valid = 0) : e.bi_valid >= 8 && (e.pending_buf[e.pending++] = 255 & e.bi_buf, e.bi_buf >>= 8, e.bi_valid -= 8)
				}(e)
		}
	}, function(e, t, r) {
		"use strict";
		var o = r(16),
			a = r(0),
			n = r(5),
			s = r(7),
			i = r(1),
			l = r(6),
			d = r(19),
			c = Object.prototype.toString;

		function u(e) {
			if(!(this instanceof u)) return new u(e);
			this.options = a.assign({
				chunkSize: 16384,
				windowBits: 0,
				to: ""
			}, e || {});
			var t = this.options;
			t.raw && t.windowBits >= 0 && t.windowBits < 16 && (t.windowBits = -t.windowBits, 0 === t.windowBits && (t.windowBits = -15)), !(t.windowBits >= 0 && t.windowBits < 16) || e && e.windowBits || (t.windowBits += 32), t.windowBits > 15 && t.windowBits < 48 && 0 === (15 & t.windowBits) && (t.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new l, this.strm.avail_out = 0;
			var r = o.inflateInit2(this.strm, t.windowBits);
			if(r !== s.Z_OK) throw new Error(i[r]);
			if(this.header = new d, o.inflateGetHeader(this.strm, this.header), t.dictionary && ("string" === typeof t.dictionary ? t.dictionary = n.string2buf(t.dictionary) : "[object ArrayBuffer]" === c.call(t.dictionary) && (t.dictionary = new Uint8Array(t.dictionary)), t.raw && (r = o.inflateSetDictionary(this.strm, t.dictionary)) !== s.Z_OK)) throw new Error(i[r])
		}

		function f(e, t) {
			var r = new u(t);
			if(r.push(e, !0), r.err) throw r.msg || i[r.err];
			return r.result
		}
		u.prototype.push = function(e, t) {
			var r, i, l, d, u, f = this.strm,
				h = this.options.chunkSize,
				k = this.options.dictionary,
				B = !1;
			if(this.ended) return !1;
			i = t === ~~t ? t : !0 === t ? s.Z_FINISH : s.Z_NO_FLUSH, "string" === typeof e ? f.input = n.binstring2buf(e) : "[object ArrayBuffer]" === c.call(e) ? f.input = new Uint8Array(e) : f.input = e, f.next_in = 0, f.avail_in = f.input.length;
			do {
				if(0 === f.avail_out && (f.output = new a.Buf8(h), f.next_out = 0, f.avail_out = h), (r = o.inflate(f, s.Z_NO_FLUSH)) === s.Z_NEED_DICT && k && (r = o.inflateSetDictionary(this.strm, k)), r === s.Z_BUF_ERROR && !0 === B && (r = s.Z_OK, B = !1), r !== s.Z_STREAM_END && r !== s.Z_OK) return this.onEnd(r), this.ended = !0, !1;
				f.next_out && (0 !== f.avail_out && r !== s.Z_STREAM_END && (0 !== f.avail_in || i !== s.Z_FINISH && i !== s.Z_SYNC_FLUSH) || ("string" === this.options.to ? (l = n.utf8border(f.output, f.next_out), d = f.next_out - l, u = n.buf2string(f.output, l), f.next_out = d, f.avail_out = h - d, d && a.arraySet(f.output, f.output, l, d, 0), this.onData(u)) : this.onData(a.shrinkBuf(f.output, f.next_out)))), 0 === f.avail_in && 0 === f.avail_out && (B = !0)
			} while ((f.avail_in > 0 || 0 === f.avail_out) && r !== s.Z_STREAM_END);
			return r === s.Z_STREAM_END && (i = s.Z_FINISH), i === s.Z_FINISH ? (r = o.inflateEnd(this.strm), this.onEnd(r), this.ended = !0, r === s.Z_OK) : i !== s.Z_SYNC_FLUSH || (this.onEnd(s.Z_OK), f.avail_out = 0, !0)
		}, u.prototype.onData = function(e) {
			this.chunks.push(e)
		}, u.prototype.onEnd = function(e) {
			e === s.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = a.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg
		}, t.Inflate = u, t.inflate = f, t.inflateRaw = function(e, t) {
			return(t = t || {}).raw = !0, f(e, t)
		}, t.ungzip = f
	}, function(e, t, r) {
		"use strict";
		var o = r(0),
			a = r(3),
			n = r(4),
			s = r(17),
			i = r(18);

		function l(e) {
			return(e >>> 24 & 255) + (e >>> 8 & 65280) + ((65280 & e) << 8) + ((255 & e) << 24)
		}

		function d() {
			this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new o.Buf16(320), this.work = new o.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0
		}

		function c(e) {
			var t;
			return e && e.state ? (t = e.state, e.total_in = e.total_out = t.total = 0, e.msg = "", t.wrap && (e.adler = 1 & t.wrap), t.mode = 1, t.last = 0, t.havedict = 0, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new o.Buf32(852), t.distcode = t.distdyn = new o.Buf32(592), t.sane = 1, t.back = -1, 0) : -2
		}

		function u(e) {
			var t;
			return e && e.state ? ((t = e.state).wsize = 0, t.whave = 0, t.wnext = 0, c(e)) : -2
		}

		function f(e, t) {
			var r, o;
			return e && e.state ? (o = e.state, t < 0 ? (r = 0, t = -t) : (r = 1 + (t >> 4), t < 48 && (t &= 15)), t && (t < 8 || t > 15) ? -2 : (null !== o.window && o.wbits !== t && (o.window = null), o.wrap = r, o.wbits = t, u(e))) : -2
		}

		function h(e, t) {
			var r, o;
			return e ? (o = new d, e.state = o, o.window = null, 0 !== (r = f(e, t)) && (e.state = null), r) : -2
		}
		var k, B, m = !0;

		function w(e) {
			if(m) {
				var t;
				for(k = new o.Buf32(512), B = new o.Buf32(32), t = 0; t < 144;) e.lens[t++] = 8;
				for(; t < 256;) e.lens[t++] = 9;
				for(; t < 280;) e.lens[t++] = 7;
				for(; t < 288;) e.lens[t++] = 8;
				for(i(1, e.lens, 0, 288, k, 0, e.work, {
						bits: 9
					}), t = 0; t < 32;) e.lens[t++] = 5;
				i(2, e.lens, 0, 32, B, 0, e.work, {
					bits: 5
				}), m = !1
			}
			e.lencode = k, e.lenbits = 9, e.distcode = B, e.distbits = 5
		}

		function v(e, t, r, a) {
			var n, s = e.state;
			return null === s.window && (s.wsize = 1 << s.wbits, s.wnext = 0, s.whave = 0, s.window = new o.Buf8(s.wsize)), a >= s.wsize ? (o.arraySet(s.window, t, r - s.wsize, s.wsize, 0), s.wnext = 0, s.whave = s.wsize) : ((n = s.wsize - s.wnext) > a && (n = a), o.arraySet(s.window, t, r - a, n, s.wnext), (a -= n) ? (o.arraySet(s.window, t, r - a, a, 0), s.wnext = a, s.whave = s.wsize) : (s.wnext += n, s.wnext === s.wsize && (s.wnext = 0), s.whave < s.wsize && (s.whave += n))), 0
		}
		t.inflateReset = u, t.inflateReset2 = f, t.inflateResetKeep = c, t.inflateInit = function(e) {
			return h(e, 15)
		}, t.inflateInit2 = h, t.inflate = function(e, t) {
			var r, d, c, u, f, h, k, B, m, _, b, p, g, C, P, y, x, z, M, A, L, S, I, N, E = 0,
				U = new o.Buf8(4),
				T = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
			if(!e || !e.state || !e.output || !e.input && 0 !== e.avail_in) return -2;
			12 === (r = e.state).mode && (r.mode = 13), f = e.next_out, c = e.output, k = e.avail_out, u = e.next_in, d = e.input, h = e.avail_in, B = r.hold, m = r.bits, _ = h, b = k, S = 0;
			e: for(;;) switch(r.mode) {
				case 1:
					if(0 === r.wrap) {
						r.mode = 13;
						break
					}
					for(; m < 16;) {
						if(0 === h) break e;
						h--, B += d[u++] << m, m += 8
					}
					if(2 & r.wrap && 35615 === B) {
						r.check = 0, U[0] = 255 & B, U[1] = B >>> 8 & 255, r.check = n(r.check, U, 2, 0), B = 0, m = 0, r.mode = 2;
						break
					}
					if(r.flags = 0, r.head && (r.head.done = !1), !(1 & r.wrap) || (((255 & B) << 8) + (B >> 8)) % 31) {
						e.msg = "incorrect header check", r.mode = 30;
						break
					}
					if(8 !== (15 & B)) {
						e.msg = "unknown compression method", r.mode = 30;
						break
					}
					if(m -= 4, L = 8 + (15 & (B >>>= 4)), 0 === r.wbits) r.wbits = L;
					else if(L > r.wbits) {
						e.msg = "invalid window size", r.mode = 30;
						break
					}
					r.dmax = 1 << L, e.adler = r.check = 1, r.mode = 512 & B ? 10 : 12, B = 0, m = 0;
					break;
				case 2:
					for(; m < 16;) {
						if(0 === h) break e;
						h--, B += d[u++] << m, m += 8
					}
					if(r.flags = B, 8 !== (255 & r.flags)) {
						e.msg = "unknown compression method", r.mode = 30;
						break
					}
					if(57344 & r.flags) {
						e.msg = "unknown header flags set", r.mode = 30;
						break
					}
					r.head && (r.head.text = B >> 8 & 1), 512 & r.flags && (U[0] = 255 & B, U[1] = B >>> 8 & 255, r.check = n(r.check, U, 2, 0)), B = 0, m = 0, r.mode = 3;
				case 3:
					for(; m < 32;) {
						if(0 === h) break e;
						h--, B += d[u++] << m, m += 8
					}
					r.head && (r.head.time = B), 512 & r.flags && (U[0] = 255 & B, U[1] = B >>> 8 & 255, U[2] = B >>> 16 & 255, U[3] = B >>> 24 & 255, r.check = n(r.check, U, 4, 0)), B = 0, m = 0, r.mode = 4;
				case 4:
					for(; m < 16;) {
						if(0 === h) break e;
						h--, B += d[u++] << m, m += 8
					}
					r.head && (r.head.xflags = 255 & B, r.head.os = B >> 8), 512 & r.flags && (U[0] = 255 & B, U[1] = B >>> 8 & 255, r.check = n(r.check, U, 2, 0)), B = 0, m = 0, r.mode = 5;
				case 5:
					if(1024 & r.flags) {
						for(; m < 16;) {
							if(0 === h) break e;
							h--, B += d[u++] << m, m += 8
						}
						r.length = B, r.head && (r.head.extra_len = B), 512 & r.flags && (U[0] = 255 & B, U[1] = B >>> 8 & 255, r.check = n(r.check, U, 2, 0)), B = 0, m = 0
					} else r.head && (r.head.extra = null);
					r.mode = 6;
				case 6:
					if(1024 & r.flags && ((p = r.length) > h && (p = h), p && (r.head && (L = r.head.extra_len - r.length, r.head.extra || (r.head.extra = new Array(r.head.extra_len)), o.arraySet(r.head.extra, d, u, p, L)), 512 & r.flags && (r.check = n(r.check, d, p, u)), h -= p, u += p, r.length -= p), r.length)) break e;
					r.length = 0, r.mode = 7;
				case 7:
					if(2048 & r.flags) {
						if(0 === h) break e;
						p = 0;
						do {
							L = d[u + p++], r.head && L && r.length < 65536 && (r.head.name += String.fromCharCode(L))
						} while (L && p < h);
						if(512 & r.flags && (r.check = n(r.check, d, p, u)), h -= p, u += p, L) break e
					} else r.head && (r.head.name = null);
					r.length = 0, r.mode = 8;
				case 8:
					if(4096 & r.flags) {
						if(0 === h) break e;
						p = 0;
						do {
							L = d[u + p++], r.head && L && r.length < 65536 && (r.head.comment += String.fromCharCode(L))
						} while (L && p < h);
						if(512 & r.flags && (r.check = n(r.check, d, p, u)), h -= p, u += p, L) break e
					} else r.head && (r.head.comment = null);
					r.mode = 9;
				case 9:
					if(512 & r.flags) {
						for(; m < 16;) {
							if(0 === h) break e;
							h--, B += d[u++] << m, m += 8
						}
						if(B !== (65535 & r.check)) {
							e.msg = "header crc mismatch", r.mode = 30;
							break
						}
						B = 0, m = 0
					}
					r.head && (r.head.hcrc = r.flags >> 9 & 1, r.head.done = !0), e.adler = r.check = 0, r.mode = 12;
					break;
				case 10:
					for(; m < 32;) {
						if(0 === h) break e;
						h--, B += d[u++] << m, m += 8
					}
					e.adler = r.check = l(B), B = 0, m = 0, r.mode = 11;
				case 11:
					if(0 === r.havedict) return e.next_out = f, e.avail_out = k, e.next_in = u, e.avail_in = h, r.hold = B, r.bits = m, 2;
					e.adler = r.check = 1, r.mode = 12;
				case 12:
					if(5 === t || 6 === t) break e;
				case 13:
					if(r.last) {
						B >>>= 7 & m, m -= 7 & m, r.mode = 27;
						break
					}
					for(; m < 3;) {
						if(0 === h) break e;
						h--, B += d[u++] << m, m += 8
					}
					switch(r.last = 1 & B, m -= 1, 3 & (B >>>= 1)) {
						case 0:
							r.mode = 14;
							break;
						case 1:
							if(w(r), r.mode = 20, 6 === t) {
								B >>>= 2, m -= 2;
								break e
							}
							break;
						case 2:
							r.mode = 17;
							break;
						case 3:
							e.msg = "invalid block type", r.mode = 30
					}
					B >>>= 2, m -= 2;
					break;
				case 14:
					for(B >>>= 7 & m, m -= 7 & m; m < 32;) {
						if(0 === h) break e;
						h--, B += d[u++] << m, m += 8
					}
					if((65535 & B) !== (B >>> 16 ^ 65535)) {
						e.msg = "invalid stored block lengths", r.mode = 30;
						break
					}
					if(r.length = 65535 & B, B = 0, m = 0, r.mode = 15, 6 === t) break e;
				case 15:
					r.mode = 16;
				case 16:
					if(p = r.length) {
						if(p > h && (p = h), p > k && (p = k), 0 === p) break e;
						o.arraySet(c, d, u, p, f), h -= p, u += p, k -= p, f += p, r.length -= p;
						break
					}
					r.mode = 12;
					break;
				case 17:
					for(; m < 14;) {
						if(0 === h) break e;
						h--, B += d[u++] << m, m += 8
					}
					if(r.nlen = 257 + (31 & B), B >>>= 5, m -= 5, r.ndist = 1 + (31 & B), B >>>= 5, m -= 5, r.ncode = 4 + (15 & B), B >>>= 4, m -= 4, r.nlen > 286 || r.ndist > 30) {
						e.msg = "too many length or distance symbols", r.mode = 30;
						break
					}
					r.have = 0, r.mode = 18;
				case 18:
					for(; r.have < r.ncode;) {
						for(; m < 3;) {
							if(0 === h) break e;
							h--, B += d[u++] << m, m += 8
						}
						r.lens[T[r.have++]] = 7 & B, B >>>= 3, m -= 3
					}
					for(; r.have < 19;) r.lens[T[r.have++]] = 0;
					if(r.lencode = r.lendyn, r.lenbits = 7, I = {
							bits: r.lenbits
						}, S = i(0, r.lens, 0, 19, r.lencode, 0, r.work, I), r.lenbits = I.bits, S) {
						e.msg = "invalid code lengths set", r.mode = 30;
						break
					}
					r.have = 0, r.mode = 19;
				case 19:
					for(; r.have < r.nlen + r.ndist;) {
						for(; y = (E = r.lencode[B & (1 << r.lenbits) - 1]) >>> 16 & 255, x = 65535 & E, !((P = E >>> 24) <= m);) {
							if(0 === h) break e;
							h--, B += d[u++] << m, m += 8
						}
						if(x < 16) B >>>= P, m -= P, r.lens[r.have++] = x;
						else {
							if(16 === x) {
								for(N = P + 2; m < N;) {
									if(0 === h) break e;
									h--, B += d[u++] << m, m += 8
								}
								if(B >>>= P, m -= P, 0 === r.have) {
									e.msg = "invalid bit length repeat", r.mode = 30;
									break
								}
								L = r.lens[r.have - 1], p = 3 + (3 & B), B >>>= 2, m -= 2
							} else if(17 === x) {
								for(N = P + 3; m < N;) {
									if(0 === h) break e;
									h--, B += d[u++] << m, m += 8
								}
								m -= P, L = 0, p = 3 + (7 & (B >>>= P)), B >>>= 3, m -= 3
							} else {
								for(N = P + 7; m < N;) {
									if(0 === h) break e;
									h--, B += d[u++] << m, m += 8
								}
								m -= P, L = 0, p = 11 + (127 & (B >>>= P)), B >>>= 7, m -= 7
							}
							if(r.have + p > r.nlen + r.ndist) {
								e.msg = "invalid bit length repeat", r.mode = 30;
								break
							}
							for(; p--;) r.lens[r.have++] = L
						}
					}
					if(30 === r.mode) break;
					if(0 === r.lens[256]) {
						e.msg = "invalid code -- missing end-of-block", r.mode = 30;
						break
					}
					if(r.lenbits = 9, I = {
							bits: r.lenbits
						}, S = i(1, r.lens, 0, r.nlen, r.lencode, 0, r.work, I), r.lenbits = I.bits, S) {
						e.msg = "invalid literal/lengths set", r.mode = 30;
						break
					}
					if(r.distbits = 6, r.distcode = r.distdyn, I = {
							bits: r.distbits
						}, S = i(2, r.lens, r.nlen, r.ndist, r.distcode, 0, r.work, I), r.distbits = I.bits, S) {
						e.msg = "invalid distances set", r.mode = 30;
						break
					}
					if(r.mode = 20, 6 === t) break e;
				case 20:
					r.mode = 21;
				case 21:
					if(h >= 6 && k >= 258) {
						e.next_out = f, e.avail_out = k, e.next_in = u, e.avail_in = h, r.hold = B, r.bits = m, s(e, b), f = e.next_out, c = e.output, k = e.avail_out, u = e.next_in, d = e.input, h = e.avail_in, B = r.hold, m = r.bits, 12 === r.mode && (r.back = -1);
						break
					}
					for(r.back = 0; y = (E = r.lencode[B & (1 << r.lenbits) - 1]) >>> 16 & 255, x = 65535 & E, !((P = E >>> 24) <= m);) {
						if(0 === h) break e;
						h--, B += d[u++] << m, m += 8
					}
					if(y && 0 === (240 & y)) {
						for(z = P, M = y, A = x; y = (E = r.lencode[A + ((B & (1 << z + M) - 1) >> z)]) >>> 16 & 255, x = 65535 & E, !(z + (P = E >>> 24) <= m);) {
							if(0 === h) break e;
							h--, B += d[u++] << m, m += 8
						}
						B >>>= z, m -= z, r.back += z
					}
					if(B >>>= P, m -= P, r.back += P, r.length = x, 0 === y) {
						r.mode = 26;
						break
					}
					if(32 & y) {
						r.back = -1, r.mode = 12;
						break
					}
					if(64 & y) {
						e.msg = "invalid literal/length code", r.mode = 30;
						break
					}
					r.extra = 15 & y, r.mode = 22;
				case 22:
					if(r.extra) {
						for(N = r.extra; m < N;) {
							if(0 === h) break e;
							h--, B += d[u++] << m, m += 8
						}
						r.length += B & (1 << r.extra) - 1, B >>>= r.extra, m -= r.extra, r.back += r.extra
					}
					r.was = r.length, r.mode = 23;
				case 23:
					for(; y = (E = r.distcode[B & (1 << r.distbits) - 1]) >>> 16 & 255, x = 65535 & E, !((P = E >>> 24) <= m);) {
						if(0 === h) break e;
						h--, B += d[u++] << m, m += 8
					}
					if(0 === (240 & y)) {
						for(z = P, M = y, A = x; y = (E = r.distcode[A + ((B & (1 << z + M) - 1) >> z)]) >>> 16 & 255, x = 65535 & E, !(z + (P = E >>> 24) <= m);) {
							if(0 === h) break e;
							h--, B += d[u++] << m, m += 8
						}
						B >>>= z, m -= z, r.back += z
					}
					if(B >>>= P, m -= P, r.back += P, 64 & y) {
						e.msg = "invalid distance code", r.mode = 30;
						break
					}
					r.offset = x, r.extra = 15 & y, r.mode = 24;
				case 24:
					if(r.extra) {
						for(N = r.extra; m < N;) {
							if(0 === h) break e;
							h--, B += d[u++] << m, m += 8
						}
						r.offset += B & (1 << r.extra) - 1, B >>>= r.extra, m -= r.extra, r.back += r.extra
					}
					if(r.offset > r.dmax) {
						e.msg = "invalid distance too far back", r.mode = 30;
						break
					}
					r.mode = 25;
				case 25:
					if(0 === k) break e;
					if(p = b - k, r.offset > p) {
						if((p = r.offset - p) > r.whave && r.sane) {
							e.msg = "invalid distance too far back", r.mode = 30;
							break
						}
						p > r.wnext ? (p -= r.wnext, g = r.wsize - p) : g = r.wnext - p, p > r.length && (p = r.length), C = r.window
					} else C = c, g = f - r.offset, p = r.length;
					p > k && (p = k), k -= p, r.length -= p;
					do {
						c[f++] = C[g++]
					} while (--p);
					0 === r.length && (r.mode = 21);
					break;
				case 26:
					if(0 === k) break e;
					c[f++] = r.length, k--, r.mode = 21;
					break;
				case 27:
					if(r.wrap) {
						for(; m < 32;) {
							if(0 === h) break e;
							h--, B |= d[u++] << m, m += 8
						}
						if(b -= k, e.total_out += b, r.total += b, b && (e.adler = r.check = r.flags ? n(r.check, c, b, f - b) : a(r.check, c, b, f - b)), b = k, (r.flags ? B : l(B)) !== r.check) {
							e.msg = "incorrect data check", r.mode = 30;
							break
						}
						B = 0, m = 0
					}
					r.mode = 28;
				case 28:
					if(r.wrap && r.flags) {
						for(; m < 32;) {
							if(0 === h) break e;
							h--, B += d[u++] << m, m += 8
						}
						if(B !== (4294967295 & r.total)) {
							e.msg = "incorrect length check", r.mode = 30;
							break
						}
						B = 0, m = 0
					}
					r.mode = 29;
				case 29:
					S = 1;
					break e;
				case 30:
					S = -3;
					break e;
				case 31:
					return -4;
				case 32:
				default:
					return -2
			}
			return e.next_out = f, e.avail_out = k, e.next_in = u, e.avail_in = h, r.hold = B, r.bits = m, (r.wsize || b !== e.avail_out && r.mode < 30 && (r.mode < 27 || 4 !== t)) && v(e, e.output, e.next_out, b - e.avail_out) ? (r.mode = 31, -4) : (_ -= e.avail_in, b -= e.avail_out, e.total_in += _, e.total_out += b, r.total += b, r.wrap && b && (e.adler = r.check = r.flags ? n(r.check, c, b, e.next_out - b) : a(r.check, c, b, e.next_out - b)), e.data_type = r.bits + (r.last ? 64 : 0) + (12 === r.mode ? 128 : 0) + (20 === r.mode || 15 === r.mode ? 256 : 0), (0 === _ && 0 === b || 4 === t) && 0 === S && (S = -5), S)
		}, t.inflateEnd = function(e) {
			if(!e || !e.state) return -2;
			var t = e.state;
			return t.window && (t.window = null), e.state = null, 0
		}, t.inflateGetHeader = function(e, t) {
			var r;
			return e && e.state ? 0 === (2 & (r = e.state).wrap) ? -2 : (r.head = t, t.done = !1, 0) : -2
		}, t.inflateSetDictionary = function(e, t) {
			var r, o = t.length;
			return e && e.state ? 0 !== (r = e.state).wrap && 11 !== r.mode ? -2 : 11 === r.mode && a(1, t, o, 0) !== r.check ? -3 : v(e, t, o, o) ? (r.mode = 31, -4) : (r.havedict = 1, 0) : -2
		}, t.inflateInfo = "pako inflate (from Nodeca project)"
	}, function(e, t, r) {
		"use strict";
		e.exports = function(e, t) {
			var r, o, a, n, s, i, l, d, c, u, f, h, k, B, m, w, v, _, b, p, g, C, P, y, x;
			r = e.state, o = e.next_in, y = e.input, a = o + (e.avail_in - 5), n = e.next_out, x = e.output, s = n - (t - e.avail_out), i = n + (e.avail_out - 257), l = r.dmax, d = r.wsize, c = r.whave, u = r.wnext, f = r.window, h = r.hold, k = r.bits, B = r.lencode, m = r.distcode, w = (1 << r.lenbits) - 1, v = (1 << r.distbits) - 1;
			e: do {
				k < 15 && (h += y[o++] << k, k += 8, h += y[o++] << k, k += 8), _ = B[h & w];
				t: for(;;) {
					if(h >>>= b = _ >>> 24, k -= b, 0 === (b = _ >>> 16 & 255)) x[n++] = 65535 & _;
					else {
						if(!(16 & b)) {
							if(0 === (64 & b)) {
								_ = B[(65535 & _) + (h & (1 << b) - 1)];
								continue t
							}
							if(32 & b) {
								r.mode = 12;
								break e
							}
							e.msg = "invalid literal/length code", r.mode = 30;
							break e
						}
						p = 65535 & _, (b &= 15) && (k < b && (h += y[o++] << k, k += 8), p += h & (1 << b) - 1, h >>>= b, k -= b), k < 15 && (h += y[o++] << k, k += 8, h += y[o++] << k, k += 8), _ = m[h & v];
						r: for(;;) {
							if(h >>>= b = _ >>> 24, k -= b, !(16 & (b = _ >>> 16 & 255))) {
								if(0 === (64 & b)) {
									_ = m[(65535 & _) + (h & (1 << b) - 1)];
									continue r
								}
								e.msg = "invalid distance code", r.mode = 30;
								break e
							}
							if(g = 65535 & _, k < (b &= 15) && (h += y[o++] << k, (k += 8) < b && (h += y[o++] << k, k += 8)), (g += h & (1 << b) - 1) > l) {
								e.msg = "invalid distance too far back", r.mode = 30;
								break e
							}
							if(h >>>= b, k -= b, g > (b = n - s)) {
								if((b = g - b) > c && r.sane) {
									e.msg = "invalid distance too far back", r.mode = 30;
									break e
								}
								if(C = 0, P = f, 0 === u) {
									if(C += d - b, b < p) {
										p -= b;
										do {
											x[n++] = f[C++]
										} while (--b);
										C = n - g, P = x
									}
								} else if(u < b) {
									if(C += d + u - b, (b -= u) < p) {
										p -= b;
										do {
											x[n++] = f[C++]
										} while (--b);
										if(C = 0, u < p) {
											p -= b = u;
											do {
												x[n++] = f[C++]
											} while (--b);
											C = n - g, P = x
										}
									}
								} else if(C += u - b, b < p) {
									p -= b;
									do {
										x[n++] = f[C++]
									} while (--b);
									C = n - g, P = x
								}
								for(; p > 2;) x[n++] = P[C++], x[n++] = P[C++], x[n++] = P[C++], p -= 3;
								p && (x[n++] = P[C++], p > 1 && (x[n++] = P[C++]))
							} else {
								C = n - g;
								do {
									x[n++] = x[C++], x[n++] = x[C++], x[n++] = x[C++], p -= 3
								} while (p > 2);
								p && (x[n++] = x[C++], p > 1 && (x[n++] = x[C++]))
							}
							break
						}
					}
					break
				}
			} while (o < a && n < i);
			o -= p = k >> 3, h &= (1 << (k -= p << 3)) - 1, e.next_in = o, e.next_out = n, e.avail_in = o < a ? a - o + 5 : 5 - (o - a), e.avail_out = n < i ? i - n + 257 : 257 - (n - i), r.hold = h, r.bits = k
		}
	}, function(e, t, r) {
		"use strict";
		var o = r(0),
			a = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
			n = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
			s = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
			i = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
		e.exports = function(e, t, r, l, d, c, u, f) {
			var h, k, B, m, w, v, _, b, p, g = f.bits,
				C = 0,
				P = 0,
				y = 0,
				x = 0,
				z = 0,
				M = 0,
				A = 0,
				L = 0,
				S = 0,
				I = 0,
				N = null,
				E = 0,
				U = new o.Buf16(16),
				T = new o.Buf16(16),
				R = null,
				O = 0;
			for(C = 0; C <= 15; C++) U[C] = 0;
			for(P = 0; P < l; P++) U[t[r + P]] ++;
			for(z = g, x = 15; x >= 1 && 0 === U[x]; x--);
			if(z > x && (z = x), 0 === x) return d[c++] = 20971520, d[c++] = 20971520, f.bits = 1, 0;
			for(y = 1; y < x && 0 === U[y]; y++);
			for(z < y && (z = y), L = 1, C = 1; C <= 15; C++)
				if(L <<= 1, (L -= U[C]) < 0) return -1;
			if(L > 0 && (0 === e || 1 !== x)) return -1;
			for(T[1] = 0, C = 1; C < 15; C++) T[C + 1] = T[C] + U[C];
			for(P = 0; P < l; P++) 0 !== t[r + P] && (u[T[t[r + P]] ++] = P);
			if(0 === e ? (N = R = u, v = 19) : 1 === e ? (N = a, E -= 257, R = n, O -= 257, v = 256) : (N = s, R = i, v = -1), I = 0, P = 0, C = y, w = c, M = z, A = 0, B = -1, m = (S = 1 << z) - 1, 1 === e && S > 852 || 2 === e && S > 592) return 1;
			for(;;) {
				_ = C - A, u[P] < v ? (b = 0, p = u[P]) : u[P] > v ? (b = R[O + u[P]], p = N[E + u[P]]) : (b = 96, p = 0), h = 1 << C - A, y = k = 1 << M;
				do {
					d[w + (I >> A) + (k -= h)] = _ << 24 | b << 16 | p | 0
				} while (0 !== k);
				for(h = 1 << C - 1; I & h;) h >>= 1;
				if(0 !== h ? (I &= h - 1, I += h) : I = 0, P++, 0 === --U[C]) {
					if(C === x) break;
					C = t[r + u[P]]
				}
				if(C > z && (I & m) !== B) {
					for(0 === A && (A = z), w += y, L = 1 << (M = C - A); M + A < x && !((L -= U[M + A]) <= 0);) M++, L <<= 1;
					if(S += 1 << M, 1 === e && S > 852 || 2 === e && S > 592) return 1;
					d[B = I & m] = z << 24 | M << 16 | w - c | 0
				}
			}
			return 0 !== I && (d[w + I] = C - A << 24 | 64 << 16 | 0), f.bits = z, 0
		}
	}, function(e, t, r) {
		"use strict";
		e.exports = function() {
			this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1
		}
	}]
]);