const {User} = require('../models/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const multer = require('multer');
const path = require('path');


const updateUser = async (req, res) => {
    try {
      const {nickBlock, descriptionBlock,image,id } = req.body;
      const user = await User.findOne({ where: { id } });
      if (!user) {
        console.log('Входящие данные для входа:', req.body)
        return res.status(401).json({ error: 'Invalid credentials' });
      }

    const updates = {}

    if (nickBlock){
        updates.name = nickBlock
    };

    if (descriptionBlock){
        updates.description = descriptionBlock
    };

    if (image){
        updates.photo = image
    };

    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: 'Нет данных для обновления' });
      }

      await user.update(updates);

      res.status(200).json({ message: 'Профиль обновлён', user });
    } catch (error) {
        console.log(req.body)
      console.log(error);
      res.status(500).json({ error: 'Ошибка обновления профиля' });
    }
  };
  
  module.exports = { updateUser };