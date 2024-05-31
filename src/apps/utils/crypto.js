const crypto = require('crypto');

const algoritmo  = "aes-256-ctr";
const secretKey = process.env.SECRET_KEY;
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algoritmo, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text.toString()), cipher.final()]);;
return {
    iv:iv.toString('hex'),
    contend: encrypted.toString('hex'),
}


}

const decrypt = (hash) => {
    const [newIv, text] = hash.split(':');

    const decipher = crypto.createDecipheriv(
        algoritmo,
        secretKey,
        Buffer.from(newIv,'hex')
    );
    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(text,'hex')), decipher.final()
    ]);
    return decrypted.toString();

}

module.exports = {
    encrypt,
    decrypt
}
