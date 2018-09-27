const bcrypt = require('bcryptjs');

module.exports = {
    decryptPassword : function(password){
        let salt = bcrypt.genSaltSync(8);
        let hash = bcrypt.hashSync(password, salt);
        return hash
    },
    becryptPassword : function(dbPassword, loginPassword){
        return bcrypt.compareSync(loginPassword, dbPassword)
    }
}