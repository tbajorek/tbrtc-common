import translations from 'translations'

const Translation = {
    _instance: null,
    get instance() {
        if (!this._instance) {
            this._instance = {
                _locales: {},
                _currentLocale: null,
                _translations: null,
                setLocale(locale) {
                    if(typeof this._locales[locale] !== 'undefined') {
                        this._traslations = translations(this._locales[locale]);
                        this._currentLocale = locale;
                    } else {
                        console.error("Locale " + locale + "doesn't exist!");
                    }
                },
                getLocale() {
                    return this._currentLocale;
                },
                _(input, params) {console.log(params);
                    return this._traslations(input, params);
                }
            };
        }
        return this._instance;
    }
};

let commonTrans = require.context('../locale', false, /\.json$/);
commonTrans.keys().forEach(file => {
    let key = file.replace(/\.\/([a-zA-Z\_]{5})\.json/g, "$1");
    Translation.instance._locales[key] = commonTrans(file);
});

let localTrans = require.context(ROOT_DIR, false, /\.json$/);
localTrans.keys().forEach(file => {
    let key = file.replace(/\.\/([a-zA-Z\_]{5})\.json/g, "$1");
    Translation.instance._locales[key] = Object.assign({}, Translation.instance._locales[key], localTrans(file));
});

Translation.instance.setLocale('en_EN');//default is English language

export default Translation;
