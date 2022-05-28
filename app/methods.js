const crypto = require('crypto');

const authTokens={};

const getHashedPassWord = (Password)=>{
    const sha256 = crypto.createHash('sha256');
    const hash =sha256.update(Password).digest('base64');
    return hash;
}

const generateAuthToken = () => {
    return crypto.pseudoRandomBytes(30).toString('hex');
}

module.exports={
    authTokens,
    getHashedPassWord,
    generateAuthToken
} 
