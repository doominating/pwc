'use strict';

const
    pluralize = require('pluralize');

class Relationship {

    constructor(type, parsedRelationship) {
        try{
            this.type = type;
            this.parsedRelationship = parsedRelationship;

            this.setNames();
            this.setElement();
            this.setValidation();

            this.removeUnwantedAttributes();
        }catch(e){
            console.log(e.stack);
            throw 'Problem with the relationship "' + type + '". '.red + e.red;
        }
    }

    setNames() {
        this.name = this.parsedRelationship.name;
        this.namePlural = pluralize(this.name);
    }

    getName() {
        return this.name;
    }

    getNamePlural() {
        return this.namePlural;
    }

    setElement() {
        this.element = this.parsedRelationship.element || this.getDefaultElement();
    }

    getElement() {
        return this.element;
    }

    setValidation() {
        let validation = this.parsedRelationship.validation || '';
        if(validation) {
            this.validation = validation.trim().split('|');
            this.validationString = validation;
        }else{
            this.validation = null;
            this.validationString = '';
        }
    }

    getValidation() {
        return this.validation;
    }

    getDefaultElement() {
        let elementsByType = {
            'belongsTo': 'select',
            'belongsToMany': 'master-detail',
            'hasOne': 'simple-add',
            'hasMany': 'simple-detail',
        };

        return elementsByType[this.type];
    }

    removeUnwantedAttributes() {
        delete this.parsedRelationship;
    }

}

module.exports = Relationship;