const crypto = require("crypto");
const algorithm = process.env.CRYPTO_ALGORITHM;
const secretKey = process.env.CRYPTO_SECRET;

const encrypt = (data) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encryptedData = Buffer.concat([cipher.update(data), cipher.final()]);
  return {
    iv: iv.toString("hex"),
    encryptedData: encryptedData.toString("hex"),
  };
};
console.log(encrypt("hello world"));
const decrypt = (hashAndIv) => {
  const decipher = crypto.createCipheriv(
    algorithm,
    secretKey,
    Buffer.from(hashAndIv.iv, "hex")
  );
  const decryptedData = Buffer.concat([
    decipher.update(Buffer.from(hashAndIv.encryptedData, "hex")),
    decipher.final(),
  ]);
  return decryptedData.toString();
};

module.exports = {
  encrypt,
  decrypt,
};
