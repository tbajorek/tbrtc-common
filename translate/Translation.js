import Replacer from './Replacer';

var isNode = require('detect-node');

const Translation = {
    _instance: null,
    get instance() {
        if (!this._instance) {
            this._instance = {
                _locales: {},
                _currentLocale: null,
                setLocale(locale) {
                    if(typeof this._locales[locale] !== 'undefined') {
                        Replacer.setData(this._locales[locale]);
                        this._currentLocale = locale;
                    } else {
                        console.error("Locale " + locale + " doesn't exist!");
                    }
                },
                getLocale() {
                    return this._currentLocale;
                },
                _(input, params) {
                    return Replacer.replaceFull(input, params);
                }
            };
        }
        return this._instance;
    }
};

if(!isNode) {
    let commonTrans = require.context('../locale', false, /\.json$/);
    commonTrans.keys().forEach(file => {
        let key = file.replace(/\.\/([a-zA-Z\_]{5})\.json/g, "$1");
        Translation.instance._locales[key] = commonTrans(file);
    });

    let localTrans = require.context(__LOCALE_DIR__, false, /\.json$/);
    localTrans.keys().forEach(file => {
        let key = file.replace(/\.\/([a-zA-Z\_]{5})\.json/g, "$1");
        Translation.instance._locales[key] = Object.assign({}, Translation.instance._locales[key], localTrans(file));
    });

    Translation.instance.setLocale('pl_PL');//default is Polish language
}

export default Translation;
