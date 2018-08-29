import roundFloatNumbers from "./roundFloatNumbers";

/**
 * It calculates the given file size in human-readable way, according to amount of precision numbers
 *
 * @param {number} size TransferFile size given in bytes
 * @param {number} precision Amount of precision numbers
 * @returns {string}
 */
const readableFileSize = (size, precision = 2) => {
    const base = 1024;
    const units = ['B', 'kB', 'MB', 'GB', 'TB'];
    const level = Math.floor(Math.log(size) / Math.log(base));
    const convertedSize = roundFloatNumbers((size / Math.pow(base, level)), precision);
    return `${convertedSize} ${units[level]}`;
};

export default readableFileSize;