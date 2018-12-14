const crypto = require('crypto')
const ec_pem = require('ec-pem')

class Cert {
    constructor() {
        this.curveName = 'secp521r1'
    }

    createCurve() {
        let curve = crypto.createECDH(this.curveName)

        curve.generateKeys()
        curve = ec_pem(curve, this.curveName)

        return {
            private: curve.encodePrivateKey(),
            public: curve.encodePublicKey()
        }
    }
}

module.exports = Cert