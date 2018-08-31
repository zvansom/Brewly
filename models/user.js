const bcrypt = require("bcrypt");

'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'That is not a valid email address.  Please try again.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      len: {
        args: [6, 16],
        msg: 'Password must be between 6 and 16 characters.'
      }
    }
  }, {
    hooks: {
      beforeCreate: function (pendingUser) {
        if (pendingUser && pendingUser.password) {
          const hash = bcrypt.hashSync(pendingUser.password, 10);
          pendingUser.password = hash;
        }
      }
    }
  });
  user.associate = function(models) {
    // associations can be defined here
    models.user.hasMany(models.recipe);
  };

  user.prototype.isValidPassword = function (typedPassword) {
    return bcrypt.compareSync(typedPassword, this.password);
  }

  return user;
};