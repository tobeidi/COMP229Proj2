import contactModel from '../models/contacts.js';
import { UserDisplayName } from '../utils/index.js';
import User from '../models/user.js';


// Sorting selector
var mysort={name: 1 };

// Get, Sort and Display the data from database
export function DisplayContactsList(req, res, next){
    contactModel.find(function(err, contactsCollection) {
        if(err){
            console.error(err);
            res.end(err);
        }
        if(!req.user){
            res.redirect('/login');
        }
        res.render('index', {title: 'Contac List', page: 'contacts/list', contacts: contactsCollection, displayName: UserDisplayName(req)});
    }).sort(mysort)
}

// Display Add page
export function DisplayContactsAddPage(req, res, next){
    res.render('index', { title: 'Add Contact', page: 'contacts/edit', contact: {} , displayName: UserDisplayName(req)});
}

// Process Add Page
export function ProcessContactsAddPage(req, res, next){
    
    let newContact = contactModel({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        city: req.body.city,
        age: req.body.age
    });

    contactModel.create(newContact, (err, Contact) => {
        if(err){
            console.error(err);
            res.end(err);
        };

        res.redirect('/contact-list')
    } )
}

// Display Editing Page
export function DisplayContactsEditPage(req, res, next){
    let id = req.params.id;

    contactModel.findById(id, (err, contact) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        res.render('index', { title: 'Edit Contact', page: 'contacts/edit', contact: contact, displayName: UserDisplayName(req) });
    });    
}


// Process Editing Page
export function ProcessContactsEditPage(req, res, next){

    let id = req.params.id;
    
    let newContact = contactModel({
        _id: req.body.id,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        city: req.body.city,
        age: req.body.age
    });

    contactModel.updateOne({_id: id }, newContact, (err, Contact) => {
        if(err){
            console.error(err);
            res.end(err);
        };

        res.redirect('/contact-list')
    } )
}


// Process Deleting 
export function ProcessContactsDelete(req, res, next){
    let id = req.params.id;

    contactModel.remove({_id: id}, (err) => {
        if (err){
            console.error(err);
            res.end(err);
        }

        res.redirect('/contact-list');
    })
}

