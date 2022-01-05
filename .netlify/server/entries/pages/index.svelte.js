var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
__export(exports, {
  default: () => Routes
});
var import_index_459eabbd = __toModule(require("../../chunks/index-459eabbd.js"));
var index_svelte_svelte_type_style_lang = "";
const css = {
  code: ".scroll-to-top.svelte-1lyalbq.svelte-1lyalbq{width:max-content;height:2em;position:fixed;z-index:1;background-color:var(--color-white);border:none;border-bottom:0.25em solid var(--color-gray);transition:all 300ms ease}.scroll-to-top.svelte-1lyalbq.svelte-1lyalbq:focus{filter:invert(1)}.wrapper-content.svelte-1lyalbq.svelte-1lyalbq{position:fixed;width:100%;height:100vh;overflow:auto;mask-image:linear-gradient(transparent 3%, black 15%, black 85%, transparent 97%),\n      linear-gradient(to right, transparent calc(100% - 1rem), black calc(100% - 1rem));-webkit-mask-image:linear-gradient(transparent 3%, black 15%, black 85%, transparent 97%),\n      linear-gradient(to right, transparent calc(100% - 1rem), black calc(100% - 1rem));scroll-snap-type:y mandatory;overscroll-behavior:none}.wrapper-bg.svelte-1lyalbq.svelte-1lyalbq{position:fixed;width:100%;height:100vh}section.svelte-1lyalbq.svelte-1lyalbq{width:100%;height:100vh;display:grid;grid-template-columns:repeat(6, 1fr);grid-template-rows:repeat(6, 1fr);scroll-snap-align:center}.headline.svelte-1lyalbq.svelte-1lyalbq{display:flex;flex-direction:column;justify-content:space-between;transform:rotateZ(-10deg)}.headline.svelte-1lyalbq h1.svelte-1lyalbq,.headline.svelte-1lyalbq h2.svelte-1lyalbq{line-height:1;margin:0;border-radius:0.25em}.headline.svelte-1lyalbq h1.svelte-1lyalbq{width:max-content;border-top:0.25em solid var(--color-green);padding:0.85rem 0}.headline.svelte-1lyalbq h2.svelte-1lyalbq{width:66.666%;border-bottom:0.25em solid var(--color-purple);padding:1rem 0}.contact.svelte-1lyalbq form.svelte-1lyalbq{display:flex;flex-direction:column}.contact.svelte-1lyalbq label.svelte-1lyalbq{margin:0.5em 0}.contact.svelte-1lyalbq form input.svelte-1lyalbq,.contact.svelte-1lyalbq form textarea.svelte-1lyalbq{width:100%;resize:none;margin:0.25em 0}input.svelte-1lyalbq.svelte-1lyalbq:focus,textarea.svelte-1lyalbq.svelte-1lyalbq:focus{outline:2px solid var(--color-orange)}.contact.svelte-1lyalbq form button.svelte-1lyalbq{width:max-content;padding:0.25em 0.5em;border:none;border-radius:0.125em;background-color:var(--color-black);color:var(--color-white);margin-inline:auto;transition:box-shadow 150ms ease-in-out}.contact.svelte-1lyalbq form button.svelte-1lyalbq:focus{outline:2px solid var(--color-orange)}.contact.svelte-1lyalbq form button.svelte-1lyalbq:hover{box-shadow:0 0 0.25em 0.2em var(--color-gray)}.about.svelte-1lyalbq.svelte-1lyalbq,.contact.svelte-1lyalbq.svelte-1lyalbq{position:relative;top:12.5%}@media(max-width: 1024px){.scroll-to-top.svelte-1lyalbq.svelte-1lyalbq{bottom:5em;right:2em}.headline.svelte-1lyalbq.svelte-1lyalbq{grid-column:3 / 6;grid-row:3}.about.svelte-1lyalbq.svelte-1lyalbq,.contact.svelte-1lyalbq.svelte-1lyalbq{grid-column:2 / 6;grid-row:1 / 4;padding:2em 0}}@media(max-width: 1024px) and (max-height: 480px){.scroll-to-top.svelte-1lyalbq.svelte-1lyalbq{display:none}}@media(max-width: 480px){.wrapper-bg.svelte-1lyalbq.svelte-1lyalbq{background:fixed left bottom / auto 55vw no-repeat url('/sam-vargas-480.png')\n        var(--color-white)}}@media(min-width: 481px) and (max-width: 1024px){.wrapper-bg.svelte-1lyalbq.svelte-1lyalbq{background:fixed left bottom / auto 55vw no-repeat url('/sam-vargas-900.png')\n        var(--color-white)}.about.svelte-1lyalbq.svelte-1lyalbq,.contact.svelte-1lyalbq.svelte-1lyalbq{grid-column:2 / 6;padding:3em 0}}@media(min-width: 1025px){.wrapper-bg.svelte-1lyalbq.svelte-1lyalbq{background:fixed left bottom / auto 100vh no-repeat url('/sam-vargas-1200.png')\n        var(--color-white)}.scroll-to-top.svelte-1lyalbq.svelte-1lyalbq{bottom:2em;left:0;right:0;margin-inline:auto}.headline.svelte-1lyalbq.svelte-1lyalbq{grid-column:4 / 6;grid-row:3}.about.svelte-1lyalbq.svelte-1lyalbq,.contact.svelte-1lyalbq.svelte-1lyalbq{grid-column:4 / 6;grid-row:2 / 4}}",
  map: null
};
const Routes = (0, import_index_459eabbd.c)(($$result, $$props, $$bindings, slots) => {
  const prerender = true;
  let wrapperEl;
  if ($$props.prerender === void 0 && $$bindings.prerender && prerender !== void 0)
    $$bindings.prerender(prerender);
  $$result.css.add(css);
  return `${``}

<div class="${"wrapper-bg svelte-1lyalbq"}"><div class="${"wrapper-content svelte-1lyalbq"}" dir="${"ltr"}"${(0, import_index_459eabbd.a)("this", wrapperEl, 0)}><section id="${"home"}" class="${"svelte-1lyalbq"}"><div class="${"headline svelte-1lyalbq"}"><h1 class="${"svelte-1lyalbq"}">Sam Vargas</h1>
        <h2 class="${"svelte-1lyalbq"}">Full-stack Engineer</h2></div></section>

    <section id="${"about"}" class="${"svelte-1lyalbq"}"><div class="${"about svelte-1lyalbq"}"><h2>About</h2>
        <p>A maker and creative problem solver dedicated to creating impactful, accessibile and
          performant solutions. With over 2 years commercial experience in startups, I&#39;ve
          skyrocketed performace, accessibility and SEO.
        </p>
        <p>After nearly a decade working at sea as an officer on board merchant ships, eventually
          specialising in Antarctic oceanographic vessels, I decided it was time for a new
          challenge. From books, video courses and friends I began my learning journey and in 2019
          graduated fron Ironhack Lisbon after an intensive bootcamp focused on today&#39;s tech and
          best practices.
        </p>
        <p class="${"this-site"}">Checkout the <a href="${"https://github.com/svargas-dev"}" target="${"_blank"}" rel="${"noopener noreferrer"}">source</a> for this site.
        </p></div></section>

    <section id="${"contact"}" class="${"svelte-1lyalbq"}"><div class="${"contact svelte-1lyalbq"}"><h2>Contact</h2>
        <form name="${"contact"}" method="${"POST"}" data-netlify="${"true"}" class="${"svelte-1lyalbq"}"><label for="${"form-name"}" class="${"svelte-1lyalbq"}">Name<br>
            <input id="${"form-name"}" type="${"text"}" required class="${"svelte-1lyalbq"}"></label>
          <label for="${"form-email"}" class="${"svelte-1lyalbq"}">Email<br>
            <input id="${"form-email"}" type="${"email"}" required class="${"svelte-1lyalbq"}"></label>
          <label for="${"form-message"}" class="${"svelte-1lyalbq"}">Message<br>
            <textarea id="${"form-message"}" rows="${"7"}" maxlength="${"512"}" required class="${"svelte-1lyalbq"}"></textarea></label>

          <button type="${"submit"}" class="${"svelte-1lyalbq"}">Send</button></form></div></section></div>
</div>`;
});
