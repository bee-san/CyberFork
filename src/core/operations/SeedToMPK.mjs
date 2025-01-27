/**
 * Turns a seed into the initial master private key.
 *
 * @author dgoldenberg [virtualcurrency@mitre.org]
 * @copyright  MITRE 2023
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import { serializeExtendedKeyFunc, getExtendedKeyVersion } from "../lib/Bitcoin.mjs";
import forge from "node-forge";
import Utils from "../Utils.mjs";


/**
 * Changes the version of an extended key. This can help to see if two keys are equal.
 */
class SeedToMPK extends Operation {

    /**
     * Extract Seedphrases Constructor.
     */
    constructor() {
        super();

        this.name = "Seed To Master Key";
        this.module = "Serialize";
        this.description = "Given a 64 byte seed, we change the seed into the extended given master private key, with selected version. To produce the seed from a seedphrase, you can use the Seedphrase To Seed Op.";
        this.infoURL = "https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#Serialization_format";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Version Type",
                "type": "option",
                "value": ["xprv",  "yprv",  "zprv",  "Zprv",  "Yprv",  "Ltpv",  "Mtpv",  "ttpv",  "tprv", "uprv",  "vprv",  "Uprv",  "Vprv"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        if (input.trim().length === 0) {
            return "";
        }
        input = input.trim();
        // We check to see if the input is hex or not.
        // If it is not, we convert it back to hex
        const re = /[0-9A-Fa-f]{2,}/g;
        if (!(input.length === 128 && re.test(input)) && !(input.length === 64)) {
            return "Must pass a hex string of length 128, or a byte string of length 64. Got length: " + input.length;
        }

        const hmac = forge.hmac.create();
        hmac.start("sha512", Utils.convertToByteString("Bitcoin seed", "UTF8"));
        if (input.length === 128) {
            hmac.update(Utils.convertToByteString(input, "hex"));
        } else {
            hmac.update(input);
        }
        const hexValue = hmac.digest().toHex();

        const newVersion = getExtendedKeyVersion(args[0]);

        return serializeExtendedKeyFunc(newVersion, 0, "00000000", 0, hexValue.slice(64,), "00" + hexValue.slice(0, 64));
    }

}

export default SeedToMPK;
