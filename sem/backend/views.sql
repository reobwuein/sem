CREATE VIEW `entity_person` AS

SELECT 
`entity_id`, `entity_type_name`, `nice_name`, `first_name`, `last_name`, `prefix`, `initials`, `birthdate`, `bsn`, 
`salutation_full`, `salutation_abbreviation`, `access_user`

FROM `entity`

INNER JOIN entity_type
ON entity.entity_type=entity_type.id

INNER JOIN entity_to_person 
ON entity.entity_id=entity_to_person.entity

INNER JOIN person 
ON entity_to_person.person=person.id

INNER JOIN salutation 
ON person.salutation=salutation.id

INNER JOIN user_access_entity 
ON entity.entity_id=user_access_entity.entity;




CREATE VIEW `entity_address` AS

SELECT 
`entity_id`, `street`, `number`, `number_addition`, `zipp`, `town`, `country`, `extra` 

FROM `entity`

INNER JOIN entity_to_address 
ON entity.entity_id=entity_to_address.entity

INNER JOIN address 
ON entity_to_address.address=address.id;




CREATE VIEW `entity_contact` AS

SELECT 
`entity`, `contact_type_name`, `value`

FROM `entity_contact_value`

INNER JOIN entity_contact_type
ON entity_contact_value.entity=entity_contact_type.id;




CREATE VIEW `entity_company` AS

SELECT 
`entity_id`, `entity_type_name`, `nice_name`, `first_name`, `last_name`, `prefix`, `initials`, `birthdate`, `bsn`, 
`salutation_full`, `salutation_abbreviation`, `access_user`

FROM `entity`

INNER JOIN entity_type
ON entity.entity_type=entity_type.id

INNER JOIN entity_to_person 
ON entity.entity_id=entity_to_company.entity

INNER JOIN person 
ON entity_to_company.company=company.id




CREATE VIEW `user_access_form` AS 

SELECT 
`access_user`,`form`,`entity` 

FROM `entity_to_form` 

INNER JOIN `user_access_entity`
ON entity_to_form.entity=user_access_entity.entity;



CREATE VIEW `form_value` AS 

SELECT `form_large` as `form`, `form_field_large` as `form_field`, `value_large` as `value`
FROM `form_value_large` 

LEFT JOIN `form_value_small`
ON form_value_large.id = form_value_small.id

UNION

SELECT `form_small` as `form`, `form_field_small` as `form_field`, `value_small` as `value`
FROM `form_value_large` 
RIGHT JOIN `form_value_small`
ON form_value_large.id = form_value_small.id

UNION

SELECT `form_tiny` as `form`, `form_field_tiny` as `form_field`, CAST(`value_tiny` AS CHAR(50))
FROM `form_value_large` 
RIGHT JOIN `form_value_tiny`
ON form_value_large.id = form_value_tiny.id;


