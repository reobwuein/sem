
var     host            = 'localhost',
        port            = 8889,
        user            = 'root',
        password        = 'root',
        database        = 'sem',
        model           = module.exports,
        Q               = require('Q');

var mysql      = require('mysql');

var connection = mysql.createConnection({
  host                  : host,
  port                  : port,
  user                  : user,
  password              : password,
  database              : database
});
    
connection.connect(function(err) { if (err) console.log(err) });

model.getAllEntities = function (user, res) {

    connection.query(   'SELECT `entity_id`, `nice_name`, `first_name`, `last_name`, `prefix`, `initials`, `birthdate`, `bsn`, `salutation_full`, `salutation_abbreviation`'+
                        ' FROM `client`'+
                        ' WHERE `access_user` = '+user+' ;', null, function (err, result) {

            res.json(result||err);
    });
    //res.send("hoi "+ user);

};

model.getEntity = function (user, clientId, res) {

    function getRights(){
        var defered = Q.defer();
        connection.query('SELECT * FROM  `user_access_entity` WHERE  `access_user` = '+user+' AND  `entity` = '+clientId, defered.makeNodeResolver());
        return defered.promise;
    }

    function getPersonData(){
        var defered = Q.defer();
        connection.query('SELECT `entity_id` as `id`, `nice_name`, `first_name`, `last_name`, `prefix`, `initials`, `birthdate`, `bsn`, `salutation_full`, `salutation_abbreviation` FROM `entity_person` WHERE `entity_id` = '+clientId, defered.makeNodeResolver());
        return defered.promise;
    }

    function getCompanyData(){
        var defered = Q.defer();
        connection.query('SELECT `entity_id`, `entity_type_name`, `company_name`, `kvk`, `btw` FROM `entity_company` WHERE `entity_id` = '+clientId, defered.makeNodeResolver());
        return defered.promise;
    }

    function getAddressData(){
        var defered = Q.defer();
        connection.query('SELECT `address_id` as `id`, `street`, `number`, `number_addition`, `zipp`, `town`, `country`, `extra` FROM `entity_addres` WHERE `entity_id` ='+clientId, defered.makeNodeResolver());
        return defered.promise;
    }

    function getContactData(){
        var defered = Q.defer();
        connection.query("SELECT `contact_id` as `id`, `contact_type_name`, `value` FROM `entity_contact` WHERE `entity` = " + clientId, defered.makeNodeResolver());
        return defered.promise;
    }

    function getRelationData(){
        var defered = Q.defer();
        connection.query('SELECT `relation_id` as `id`, `from_entity` as `from`, `to_entity` as `to`, `name` FROM `entity_to_entity` INNER JOIN `relationship_type` ON entity_to_entity.relationship_type=relationship_type.id WHERE `from_entity` = '+clientId+' OR `to_entity` = '+clientId,defered.makeNodeResolver());
        return defered.promise;
    }

/*
    getRights().then(function(i){console.log("getRights",i[0])}).catch(function (error) {console.log("getRights",error)});
    personData().then(function(i){console.log("personData",i[0])}).catch(function (error) {console.log("personData",error)});
    addressData().then(function(i){console.log("addressData",i[0])}).catch(function (error) {console.log("addressData",error)});
    contactData().then(function(i){console.log("contactData",i[0])}).catch(function (error) {console.log("contactData",error)});
    relationData().then(function(i){console.log("relationData",i[0])}).catch(function (error) {console.log("relationData",error)});
    companyData().then(function(i){console.log("companyData",i[0])}).catch(function (error) {console.log("companyData",error)});
*/
    getRights().then(function(results){
        if(results[0][0]["read"] == 1){
            Q.all([getPersonData(),getCompanyData(),getAddressData(),getContactData(),getRelationData()]).then(function(results){

                var returnData = {}
                if(results[0][0].length)
                returnData.person = results[0][0]||null;
                if(results[1][0].length)
                returnData.company = results[1][0]||null;
                if(results[2][0].length)
                returnData.address = results[2][0]||null;
                if(results[3][0].length)
                returnData.contact = results[3][0]||null;
                if(results[4][0].length)
                returnData.relation = results[4][0]||null;

                res.json(returnData);
            }).catch(function(i){console.log(i)});
        }else{
            res.send( "No user access on entity nr. "+clientId+" for user "+user, 401 );
        }
    })

};



model.updateEntity = function (user, clientId, data, res) {

    var queries = [];
/*
    var _id = clientId,
        _nice_name = data["nice_name"],
        _first_name = data["first_name"],
        _last_name = data["last_name"],
        _prefix = data["prefix"],
        _initials = data["initials"],
        _birthdate = data["birthdate"],
        _bsn = data["bsn"],
        _salutationFull = data["salutation_full"],
        _salutationAbbreviation = data["salutation_abbreviation"];

    connection.query(   'UPDATE `person`'+
                        ' SET'+
                            ' `nice_name` = "'+_nice_name+'",'+
                            ' `first_name` = "'+_first_name+'",'+ 
                            ' `last_name` = "'+_last_name+'",'+ 
                            ' `prefix` = "'+_prefix+'",'+ 
                            ' `initials` = "'+_initials+'",'+ 
                            ' `birthdate` = "'+_birthdate+'",'+ 
                            ' `bsn` = "'+_bsn+'"'+ 
                        ' WHERE `entity_id` = '+clientId+
                        ' AND `access_user` = '+user
                        , null, function (err, result) {
        if(!err){
            res.send( "Created", 201 );
        }else{
            res.send( "Bad request", 401 );
        }
    });
*/

    function getRights(){
        var defered = Q.defer();
        connection.query('SELECT * FROM  `user_access_entity` WHERE  `access_user` = '+user+' AND  `entity` = '+clientId, defered.makeNodeResolver());
        return defered.promise;
    }

    function updatePersonData(niceName, firstName, lastName, prefex, initials, birthdate, bsn, salutationAbbreviation){
        var defered = Q.defer();
        connection.query('UPDATE `person` SET `nice_name` = "'+niceName+'", `first_name` = "'+firstName+'", `last_name` = "'+lastName+'", `prefix` = "'+prefex+'", `initials` = "'+initials+'", `birthdate` = "'+birthdate+'", `bsn` = "'+bsn+'", `salutation` = (SELECT `id` FROM `salutation` WHERE `salutation_abbreviation` = "'+salutationAbbreviation+'") WHERE `id` IN (SELECT `person` FROM `entity_to_person` WHERE `entity` = '+clientId+')', defered.makeNodeResolver());
        return defered.promise;
    }

    function updateAddressData(id, street, number, numberAddition, zipp, town, country, extra){
        var defered = Q.defer();
        connection.query('UPDATE `address` SET `street` = "'+street+'", `number` = "'+number+'", `number_addition` = "'+numberAddition+'", `zipp` = "'+zipp+'", `town` = "'+town+'", `country` = "'+country+'", `extra` = "'+extra+'" WHERE `entity_id` ='+id, defered.makeNodeResolver());
        return defered.promise;
    }

    function updateContactData(id, value, type){
        var defered = Q.defer();
        connection.query('UPDATE `entity_contact_value` SET `entity_contact_type` = (SELECT `id` FROM `entity_contact_type` WHERE `contact_type_name` = "'+type+'"), `value` = "'+value+'", `entity` = "'+clientId+'" WHERE `contact_id` = ' + id, defered.makeNodeResolver());
        return defered.promise;
    }

    function updateRelationData(id, from, to, type){
        var defered = Q.defer();
        connection.query('UPDATE `entity_to_entity` SET `from_entity` = "'+from+'", `to_entity` = "'+to+'", `relationship_type` = (SELECT `id` FROM `relationship_type` WHERE `name` = "'+type+'") WHERE `realtion_id` = '+id, defered.makeNodeResolver());
        return defered.promise;
    }

    function updateCompanyData(id, name, kvk, btw){
        var defered = Q.defer();
        connection.query('UPDATE `entity_company` SET `company_name` = "'+name+'", `kvk` = "'+kvk+'", `btw` = "'+btw+'" WHERE `entity_id` = '+id, defered.makeNodeResolver());
        return defered.promise;
    }

    if( 
        data && 
        data.person[0] && 
        data.person[0].nice_name && 
        data.person[0].first_name && 
        data.person[0].last_name && 
        data.person[0].prefix && 
        data.person[0].initials && 
        data.person[0].birthdate && 
        data.person[0].bsn && 
        data.person[0].salutation_abbreviation
    ){ 
        queries.push(updatePersonData(
            data.person[0].nice_name, 
            data.person[0].first_name, 
            data.person[0].last_name, 
            data.person[0].prefix, 
            data.person[0].initials, 
            data.person[0].birthdate, 
            data.person[0].bsn, 
            data.person[0].salutation_abbreviation
        )); 
    }else{

    } 

    getRights().then(function(results){
        if(results[0][0]["write"] == 1){
            Q.all([getPersonData(),getCompanyData(),getAddressData(),getContactData(),getRelationData()]).then(function(results){

                var returnData = {}
                if(results[0][0].length)
                returnData.person = results[0][0]||null;
                if(results[1][0].length)
                returnData.company = results[1][0]||null;
                if(results[2][0].length)
                returnData.address = results[2][0]||null;
                if(results[3][0].length)
                returnData.contact = results[3][0]||null;
                if(results[4][0].length)
                returnData.relation = results[4][0]||null;

                res.json(returnData);
            }).catch(function(i){console.log(i)});
        }else{
            res.send( "No write access on entity nr. "+clientId+" for user "+user, 401 );
        }
    })
};

model.getFormLayout = function(user, formId, res){
    
    connection.query(   "SELECT * FROM `form_field` WHERE `id` = (SELECT `form_field` FROM `form_format_to_form_field` WHERE `form_format` = (SELECT `form_format` FROM `form` WHERE `id` in ( SELECT `form` FROM `user_access_form` WHERE `access_user` = "+user+") AND `id` = "+formId+" ));" 
                        , null, function (err, result) {
                            
        res.json(result||err);
    });

}

model.getForm = function(user, formId, res){
    
    connection.query(   "SELECT * FROM `form` WHERE `id` in ( SELECT `form` FROM `user_access_form` WHERE `access_user` = "+user+") " 
                        , null, function (err, result) {
                            
        res.json(result||err);
    });

}

model.getFormValues = function(user, formId, res){
    
    connection.query(   "SELECT * FROM `form_value` WHERE `form` IN ( SELECT `form` FROM `user_access_form` WHERE `access_user` = "+user+") AND `form` = "+formId+"" 
                        , null, function (err, result) {
                            
        res.json(result||err);
    });

}

model.test = function (user, callback) {

    return "token accepted, your user id = " + user;

};