(window.webpackJsonp = window.webpackJsonp || []).push([
	[1], {
		20: function(e, t, n) {
			"use strict";
			n.r(t);
			var o = n(8),
				r = n.n(o),
				a = n(2),
				s = n.n(a);
			var c = (e, t = "", n = 512) => {
					const o = atob(e),
						r = [];
					for(let a = 0; a < o.length; a += n) {
						const e = o.slice(a, a + n),
							t = new Array(e.length);
						for(let n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
						const s = new Uint8Array(t);
						r.push(s)
					}
					return new Blob(r, {
						type: t
					})
				},
				d = e => {
					if(!e) throw new Error("input must be one of File object, image url, image base64");
					let t = null;
					return "[object File]" === Object.prototype.toString.call(e) ? (t = e.slice(), l(t)) : function(e) {
						try {
							return btoa(atob(e)) === e
						} catch(t) {
							return !1
						}
					}(e) ? (t = c(e), l(t)) : new Promise((n, o) => {
						const r = new XMLHttpRequest;
						r.open("GET", e), r.responseType = "blob", r.onload = () => {
							r.status >= 200 && r.status < 300 ? (t = r.response, l(t).then(e => n(e)).catch(e => o(e))) : o(r.statusText)
						}, r.onerror = () => o(r.statusText), r.send()
					})
				};

			function l(e) {
				return new Promise((t, n) => {
					const o = new FileReader;
					o.readAsArrayBuffer(e), o.addEventListener("loadend", e => {
						const o = e.srcElement.result,
							a = s.a.decode(o),
							c = s.a.toRGBA8(a)[0],
							d = r()(new Uint8ClampedArray(c), a.width, a.height);
						d ? t(d) : n(new Error("decode failed"))
					})
				})
			}
			const i = document.getElementById("file");
			i.addEventListener("change", () => {
				const e = i.files[0];
				d(e).then(e => {
					document.getElementById("content3").innerText = e.data
				})
			}, !1), document.getElementById("parse-image-url").addEventListener("click", () => {
				const e = document.getElementById("image-url").value;
				e && d(e).then(e => {
					document.getElementById("content1").innerText = e.data
				})
			}, !1), document.getElementById("parse-image-base64").addEventListener("click", () => {
				const e = document.getElementById("image-base64").value;
				e && d(e).then(e => {
					document.getElementById("content2").innerText = e.data
				})
			}, !1)
		},
		9: function(e, t, n) {
			e.exports = n(20)
		}
	},
	[
		[9, 2, 0]
	]
]);