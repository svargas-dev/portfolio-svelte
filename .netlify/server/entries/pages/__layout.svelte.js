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
  default: () => _layout
});
var import_index_459eabbd = __toModule(require("../../chunks/index-459eabbd.js"));
var latin400 = "";
var latin500 = "";
var latin600 = "";
var latin700 = "";
var index_svelte_svelte_type_style_lang$2 = "";
const css$3 = {
  code: ".menu-button.svelte-1qot5p6.svelte-1qot5p6{position:fixed;z-index:3;top:1.5em;right:1.5em;max-height:3em;display:flex;align-items:center;border:none;font-weight:600;font-family:var(--font-sans);color:var(--color-black);background-color:transparent;transition:all ease-in-out 400ms}.menu-button__text.svelte-1qot5p6.svelte-1qot5p6{transition:all 100ms ease}.menu-icon.svelte-1qot5p6.svelte-1qot5p6{width:3em;height:3em;position:relative}.menu-dot.svelte-1qot5p6.svelte-1qot5p6{width:0.5em;height:0.5em;border-radius:0.25em;background-color:var(--color-green);position:absolute;margin:auto auto;transition:all ease-in 200ms}.menu-dot-1.svelte-1qot5p6.svelte-1qot5p6{top:0;left:0.5em;bottom:0}.menu-dot-2.svelte-1qot5p6.svelte-1qot5p6{top:0.5em;left:0;right:0}.menu-dot-3.svelte-1qot5p6.svelte-1qot5p6{bottom:0.5em;left:0;right:0}.menu-dot-4.svelte-1qot5p6.svelte-1qot5p6{right:0.5em;top:0;bottom:0}.menu-button.svelte-1qot5p6:hover .menu-dot.svelte-1qot5p6,.menu-dot--close.svelte-1qot5p6.svelte-1qot5p6{top:0;right:0;bottom:0;left:0}.menu-dot-1--close.svelte-1qot5p6.svelte-1qot5p6{width:2.5em;transform:rotate(45deg)}.menu-dot-4--close.svelte-1qot5p6.svelte-1qot5p6{width:2.5em;transform:rotate(-45deg)}",
  map: null
};
const MenuButton = (0, import_index_459eabbd.c)(($$result, $$props, $$bindings, slots) => {
  let buttonClass;
  let buttonTextClass;
  let buttonText;
  let menuDot1Class;
  let menuDot2Class;
  let menuDot3Class;
  let menuDot4Class;
  let { isOpen } = $$props;
  let { toggleOpen } = $$props;
  let { handleKeydown } = $$props;
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
    $$bindings.isOpen(isOpen);
  if ($$props.toggleOpen === void 0 && $$bindings.toggleOpen && toggleOpen !== void 0)
    $$bindings.toggleOpen(toggleOpen);
  if ($$props.handleKeydown === void 0 && $$bindings.handleKeydown && handleKeydown !== void 0)
    $$bindings.handleKeydown(handleKeydown);
  $$result.css.add(css$3);
  buttonClass = isOpen ? "menu-button bg-black" : "menu-button";
  buttonTextClass = isOpen ? "menu-button__text sr-only" : "menu-button__text";
  buttonText = isOpen ? "CLOSE" : "MENU";
  menuDot1Class = isOpen ? "menu-dot menu-dot--close menu-dot-1--close" : "menu-dot menu-dot-1";
  menuDot2Class = isOpen ? "menu-dot menu-dot--close" : "menu-dot menu-dot-2";
  menuDot3Class = isOpen ? "menu-dot menu-dot--close" : "menu-dot menu-dot-3";
  menuDot4Class = isOpen ? "menu-dot menu-dot--close menu-dot-4--close" : "menu-dot menu-dot-4";
  return `<button class="${(0, import_index_459eabbd.e)((0, import_index_459eabbd.n)(buttonClass)) + " svelte-1qot5p6"}"><span class="${(0, import_index_459eabbd.e)((0, import_index_459eabbd.n)(buttonTextClass)) + " svelte-1qot5p6"}">${(0, import_index_459eabbd.e)(buttonText)}</span>

  <div class="${"menu-icon svelte-1qot5p6"}"${(0, import_index_459eabbd.a)("aria-hidden", true, 0)}><div class="${(0, import_index_459eabbd.e)((0, import_index_459eabbd.n)(menuDot1Class)) + " svelte-1qot5p6"}"></div>
    <div class="${(0, import_index_459eabbd.e)((0, import_index_459eabbd.n)(menuDot2Class)) + " svelte-1qot5p6"}"></div>
    <div class="${(0, import_index_459eabbd.e)((0, import_index_459eabbd.n)(menuDot3Class)) + " svelte-1qot5p6"}"></div>
    <div class="${(0, import_index_459eabbd.e)((0, import_index_459eabbd.n)(menuDot4Class)) + " svelte-1qot5p6"}"></div></div>
</button>`;
});
var index_svelte_svelte_type_style_lang$1 = "";
const css$2 = {
  code: ".nav-wrapper.svelte-1okb37a{position:fixed;z-index:2;top:0;left:0;width:100%;height:100%}.nav-container.svelte-1okb37a{position:absolute;top:0;right:0;width:clamp(15em, 16.667vw, 500px);height:100%;background-color:var(--color-black)}navbar.svelte-1okb37a{display:flex;flex-direction:column;padding:0 3em;position:relative;top:16.667vh}a.svelte-1okb37a{width:max-content;text-decoration:none;font-size:clamp(1.25em, 0.5em + 2vw, 1.5em);font-family:var(--font-sans);margin:0.5em 0;padding:0.25em;color:var(--color-white)}",
  map: null
};
const Menu = (0, import_index_459eabbd.c)(($$result, $$props, $$bindings, slots) => {
  let isOpen = false;
  function toggleOpen() {
    isOpen = !isOpen;
  }
  function handleKeydown(e) {
    if (e.key === "Escape")
      isOpen = false;
  }
  $$result.css.add(css$2);
  return `${(0, import_index_459eabbd.v)(MenuButton, "MenuButton").$$render($$result, { isOpen, toggleOpen, handleKeydown }, {}, {})}

${isOpen ? `<div class="${"nav-wrapper svelte-1okb37a"}"><div class="${"nav-container svelte-1okb37a"}"><navbar class="${"open svelte-1okb37a"}"><a href="${"#about"}" class="${"svelte-1okb37a"}">About</a>
        <a href="${"#contact"}" class="${"svelte-1okb37a"}">Contact</a></navbar></div></div>` : ``}`;
});
var index_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "footer.svelte-1ut3u76{position:fixed}a.svelte-1ut3u76{margin-inline:1em}@media(max-width: 1024px){footer.svelte-1ut3u76{bottom:1em;right:1em;width:max-content}}@media(max-width: 1024px) and (max-height: 480px){footer.svelte-1ut3u76{display:none}}@media(min-width: 1025px){footer.svelte-1ut3u76{bottom:7em;left:0;right:0;width:max-content;margin-inline:auto}}",
  map: null
};
const Footer = (0, import_index_459eabbd.c)(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<footer class="${"svelte-1ut3u76"}"><a href="${"https://github.com/svargas-dev"}" target="${"_blank"}" rel="${"noopener noreferrer"}" class="${"svelte-1ut3u76"}"><span class="${"sr-only"}">Github</span>
    <svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 24 24"}" width="${"2em"}" height="${"2em"}" aria-hidden="${"true"}"><title>Github</title><path fill="${"none"}" d="${"M0 0h24v24H0z"}"></path><path d="${"M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z"}"></path></svg></a>

  <a href="${"https://gitlab.com/svargas-dev"}" target="${"_blank"}" rel="${"noopener noreferrer"}" class="${"svelte-1ut3u76"}"><span class="${"sr-only"}">Gitlab</span>
    <svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 24 24"}" width="${"2em"}" height="${"2em"}" aria-hidden="${"true"}"><title>Gitlab</title><path fill="${"none"}" d="${"M0 0h24v24H0z"}"></path><path d="${"M5.868 2.75L8 10h8l2.132-7.25a.4.4 0 0 1 .765-.01l3.495 10.924a.5.5 0 0 1-.173.55L12 22 1.78 14.214a.5.5 0 0 1-.172-.55L5.103 2.74a.4.4 0 0 1 .765.009z"}"></path></svg></a>

  <a href="${"https://www.linkedin.com/in/sam-vargas-38588bb5/"}" target="${"_blank"}" rel="${"noopener noreferrer"}" class="${"svelte-1ut3u76"}"><span class="${"sr-only"}">LinkedIn</span>
    <svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 24 24"}" width="${"2em"}" height="${"2em"}" aria-hidden="${"true"}"><title>LinkedIn</title><path fill="${"none"}" d="${"M0 0h24v24H0z"}"></path><path d="${"M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 0 1-1.548-1.549 1.548 1.548 0 1 1 1.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z"}"></path></svg></a>
</footer>`;
});
var normalize = "";
var app = "";
var __layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.svelte-szajmu{width:100%;height:100%;position:relative}.sideline.svelte-szajmu{position:fixed;top:0;left:0;background-color:var(--color-orange)}@media(max-width: 1024px){.sideline.svelte-szajmu{width:100%;height:0.5vw;max-height:0.75rem}}@media(min-width: 1025px){.sideline.svelte-szajmu{width:0.5vw;max-width:0.75rem;height:100%}}",
  map: null
};
const _layout = (0, import_index_459eabbd.c)(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<main class="${"svelte-szajmu"}">${(0, import_index_459eabbd.v)(Menu, "Menu").$$render($$result, {}, {}, {})}
  ${slots.default ? slots.default({}) : ``}
  <div class="${"sideline svelte-szajmu"}"></div>
  ${(0, import_index_459eabbd.v)(Footer, "Footer").$$render($$result, {}, {}, {})}
</main>`;
});
