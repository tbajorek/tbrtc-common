class Replacer {
    static setData(inputData) {
        Replacer.data = inputData;
    }
    static replaceFull(inputString, data = {}) {
        let outputString;
        if(inputString in Replacer.data) {
            outputString = Replacer.data[inputString];
        } else {
            outputString = inputString;
            console.warn('Translation not found!');
        }
        return Replacer.replaceExpressions(outputString, data);
    }

    static replaceExpressions(inputString, data = {}) {
        let outputString = inputString;
        Object.entries(data).forEach(([name, value]) => {
            outputString = outputString.replace('{'+name+'}', value);
        });
        return outputString;
    }
}

Replacer.data = {};

export default Replacer;