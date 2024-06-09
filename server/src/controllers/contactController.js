const Contact = require('../models/contact.js');

exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id });
        res.json(contacts);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.addContact = async (req, res) => {
    const { name, email, image} = req.body;

    try {
        let contact = new Contact({
          user: req.user.id,
          name,
          email,
          image
        });
    
        contact = await contact.save();
        res.json(contact);
      } catch (err) {
        console.log(err)
        res.status(500).send('Server Error');
      }
};

exports.updateContact = async (req, res) => {
  const { name, email } = req.body;

  try {
      let contact = await Contact.findById(req.params.id);
  
      if (!contact) return res.status(404).json({ msg: 'Contact not found' });

      if (contact.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized' });
      }

      contact.name = name || contact.name;
      contact.email = email || contact.email;
      // contact.image = image || contact.image;
  
      contact = await contact.save();
      res.json(contact);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
};

exports.deleteContact = async (req, res) => {
    try {
      let contact = await Contact.findById(req.params.id);
  
      if (!contact) return res.status(404).json({ msg: 'Contact not found' });
  
      if (contact.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized' });
      }
      
      await Contact.findByIdAndDelete(req.params.id);
  
      res.json({ msg: 'Contact removed' });
    } catch (err) {
      res.status(500).send('Server Error');
    }
};