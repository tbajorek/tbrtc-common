const roundFloatNumbers = (number, precision) => +(Math.round(number + "e+"+precision)  + "e-" + precision);

export default roundFloatNumbers;