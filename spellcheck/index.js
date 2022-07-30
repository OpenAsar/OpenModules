const native = require('./cld.node');

const isString = v => typeof v === 'string';
const isBool = v => typeof v === 'boolean';

module.exports = {
  cld: {
    LANGUAGES: native.LANGUAGES,
    DETECTED_LANGUAGES: native.DETECTED_LANGUAGES,
    ENCODINGS: native.ENCODINGS,

    detect: (text, opts, cb) => {
      if (!cb) {
        cb = opts;
        opts = {};
      }

      opts = {
        isHTML: false,
        languageHint: '',
        encodingHint: '',
        tldHint: '',
        httpHint: '',
        ...opts
      };

      if (typeof cb !== 'function') return;
      if ((!isString(text) || text.length < 1) ||
        !isBool(opts.isHTML) ||
        !isString(opts.languageHint) ||
        !isString(opts.encodingHint) ||
        !isString(opts.tldHint) ||
        !isString(opts.httpHint) ||
        (opts.encodingHint && !native.ENCODINGS.includes(opts.encodingHint)) ||
        (opts.languageHint && !Object.keys(native.LANGUAGES).includes(opts.languageHint) && !Object.values(native.LANGUAGES).includes(opts.languageHint))) return cb({ message: 'Invalid options' });

      const res = native.detect(text, !opts.isHTML, opts.languageHint, opts.encodingHint, opts.tldHint, opts.httpHint);
      if (res.languages.length === 0) return cb({ message: 'Failed to identify language' });

      return cb(null, res);
    }
  }
};