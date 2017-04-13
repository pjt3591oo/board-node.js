/**
 * Created by bagjeongtae on 2017. 4. 13..
 */

"use strict";

module.exports = function(sequelize, DataTypes) {
    var post = sequelize.define("post", {
        title :   DataTypes.STRING,
        content :   DataTypes.STRING,
        author :   DataTypes.STRING,

    }, {
        classMethods: {
            associate: function(models) {
            }
        }
    })
    ;

    return post;
};