'use strict';

/**
 * Load external script into html page
 * @param {string} source - external URL to load
 * @param {object} beforeEl - DOM element before which to insert the new <script> tag
 * @param {object} scriptAttrs - object of attributes to add to the new <script> tag
 */
function load_script(source, beforeEl, scriptAttrs = {}) {
  if (!source) return false;
  if (typeof window !== "object" || typeof document !== "object") return false;
  return new Promise((resolve, reject) => {
    let script = document.createElement("script");

    // force certain attributes
    script.async = true;
    script.defer = true;
    for (let key in scriptAttrs) {
      script[key] = scriptAttrs[key];
    }

    // NOTE: needs refactor: maybe .bind(script)
    function onloadHander(_, isAbort) {
      if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
        script.onload = null;
        script.onreadystatechange = null;
        script = undefined;

        if (isAbort) {
          reject();
        } else {
          resolve();
        }
      }
    }

    script.onload = onloadHander;
    script.onreadystatechange = onloadHander;

    script.src = source;
    window.document.body.append(script);
    resolve(true);
  });
}

/**
 * GET request
 * @param {string} url - including protocol, not including query params
 * @param {object} options - override defaults:
 * @param {string|boolean} options.cache - see browser fetch documentation - additionally:
 *    true - use cached data - expires when the server is restarted
 *    false - do not cache - prevent fetch/http/browser/node from caching
 *    ```
 *    {mode:"cors", cache: "no-cache", redirect: "follow", referrer: "no-referrer", headers: {}}
 *    ```
 * @param {string} options.method - will be overridden to "GET"
 * @returns {Promise} - promise will resolve with response data
 */
async function http_get(url = ``, options = {}) {
  options.method = "GET";
  return http_ajax(url, options);
}

/**
 * POST request
 * @param {string} url
 * @param {*} data
 * @returns {Promise}
 */
function http_post(url = ``, data = {}) {
  return http_ajax(url, {method:"POST",body:data});
}

/**
 * PUT request
 * @param {string} url
 * @param {*} data
 * @returns {Promise}
 */
function http_put(url = ``, data = {}) {
  return http_ajax(url, {method:"PUT",body:data});
}

/**
 * DELETE request
 * @param {string} url
 * @param {*} data
 * @returns {Promise}
 */
function http_delete(url = ``, data = {}) {
  return http_ajax(url, {method:"DELETE",body:data});
}



/*
 * EXPORT FOR BROWSER
 */
if (typeof window === "object") {
  const browser = { http_get, http_post, http_put, http_delete, load_script };
  // set up for export
  window.__ = window.__ || {};
  // flatten
  for (let func in browser) {
    window.__[func] = browser[func];
  }
}
async function http_ajax(url = ``, options = {}) {
  if (typeof fetch !== "function") {
    console.log("fetch is not a function :(");
    return;
  }
  /*
   * First try to get it from cache
   */
  // let method = options.method ? options.method.toUpperCase() : "GET";
  // if (method === "GET" || options.cache === true) {
  // }
  /*
   * fetch the url
   */
  if (method !== "GET") {
    if (!options.body) {
      options.body = "";
    } else if (typeof options.body !== "string") {
      options.body = JSON.stringify(options.body); // body data type must match "Content-Type" header
    }
  }
  let params = {
    method: method,
    mode: "cors",
    cache: options.cache === false ? "no-cache" : typeof options.cache === "string" ? options.cache : "default",
    credentials: "same-origin",
    redirect: "follow",
    referrer: "no-referrer",
    headers: {},
    ...options
  };
  let res = await fetch(url, {
    method: params.method, // *GET, POST, PUT, DELETE, etc.
    mode: params.cors, // no-cors, cors, *same-origin
    cache: params.cache, // no-cache, reload, force-cache, only-if-cached
    credentials: params.credentials, // include, *same-origin, omit
    headers: params.headers, // {}, {"Content-Type": "application/json; charset=utf-8"}
    redirect: params.redirect, // manual, *follow, error
    referrer: params.referrer // no-referrer, *client
  });
  let data;
  if (typeof res.json === "function") {
    data = await res.json();
  } else {
    data = res;
  }
  let output = data.data || data;
  /*
   * Save to cache
   */
  // if (params.method === "GET" && output && options.cache === true) {
  // }
  return output;
}

var requests = /*#__PURE__*/Object.freeze({
  __proto__: null,
  http_get: http_get,
  http_post: http_post,
  http_put: http_put,
  http_delete: http_delete,
  load_script: load_script
});

const is_retina = function () {
  // return boolean:
  return typeof window === 'object'
      ? window.matchMedia(
        '(-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2), (min-resolution: 192dpi)',
      ).matches
      : false
};

/*
 * EXPORT FOR BROWSER
 */
if (typeof window === "object") {
  const browser = { is_retina };
  // set up for export
  window.__ = window.__ || {};
  // flatten
  for (let func in browser) {
    window.__[func] = browser[func];
  }
}

var ui = /*#__PURE__*/Object.freeze({
  __proto__: null,
  is_retina: is_retina
});

/**
 * Convert JavaScript Object to URL querystring
 * ex: "?one=1&two=something"
 * @param {object} params - JS Object of key-value query params
 * @return {string} - starting with "?". Just that if empty object
 */
function querystring_from_object(params = {}) {
  let qs = Object.keys(params)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");
  if (qs) {
    qs = "?" + qs;
  }
  return qs;
}

/**
 * Parse the URL querystring to JavaScript Object
 * ex: "?one=1&two=something" => {one:1,two:'something'}
 * @param {string} str - starting with "?"
 * @return {object}
 */
function object_from_querystring(str = "") {
  // make object
  let obj = {};
  let pairs = str.replace("?", "").split("&");
  for (let pair of pairs) {
    if (!pair) continue;
    let tuple = pair.split("=");
    let key = tuple[0];
    if (!key) continue;
    obj[key] = tuple[1] || "";
  }
  // decode value
  for (let key in obj) {
    obj[key] = decodeURIComponent(obj[key] || "").trim();
  }
  // done
  return obj;
}

/**
 * Change a url (GET) parameter in queryString string
 * @param queryString {string} - ex: "?start=10&fruit=apple"
 * @param key {string} - ex: "fruit"
 * @param value {string} - ex: "species"
 * @return {string} - ex: "?start=10&species=apple"
 */
function querystring_replace_key_value(queryString, key, value) {
  // clean input
  queryString = str_trim_char(queryString, "&");
  queryString = str_trim_char(queryString, "?");
  let obj = JSON.parse(
    '{"' + decodeURI(queryString).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}'
  );
  // replace value
  obj[key] = value;
  // rebuild queryString with replaced value
  let output = "?";
  for (let pair of Object.entries(obj)) {
    output += pair[0] + "=";
    output += pair[1] + "&";
  }
  return str_trim_char(output, "&");
}

/*
 * EXPORT FOR BROWSER
 */
if (typeof window === "object") {
  const browser = { object_from_querystring, querystring_from_object, querystring_replace_key_value };
  // set up for export
  window.__ = window.__ || {};
  // flatten
  for (let func in browser) {
    window.__[func] = browser[func];
  }
}

/*
 * PRIVATE FUNCTIONS BELOW
 */

// /univeral
function str_trim_char(s, c) {
  if (c === "]") c = "\\]";
  if (c === "\\") c = "\\\\";
  return s.replace(new RegExp("^[" + c + "]+|[" + c + "]+$", "g"), "");
}

var urls = /*#__PURE__*/Object.freeze({
  __proto__: null,
  object_from_querystring: object_from_querystring,
  querystring_from_object: querystring_from_object,
  querystring_replace_key_value: querystring_replace_key_value
});

let all = {
  requests,
  ui,
  urls,
};

/**
 * Export as a flat list
 */
let __ = { _map: {} };
for (let type in all) {
  __._map[type] = [];
  for (let func in all[type]) {
    __[func] = all[type][func];
    __._map[type].push(func);
  }
}

/**
 * Export for browser window
 */
if (typeof window === "object") {
  window.__ = __;
}

module.exports = __;
