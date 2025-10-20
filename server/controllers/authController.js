const {User} = require('../models/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);  // Хэшируем пароль
    console.log('Trying to create user with data:', { email, name, password });
    const user = await User.create({ email, password: hashedPassword, name, role: 'USER' });
    console.log('User created:', user.toJSON());
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, user: { id: user.id, email, name, role:user.role} });
  } catch (error) {
  console.error('❌ Ошибка при регистрации:', error);
    res.status(400).json({ error: 'Registration failed' });

  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log('Входящие данные для входа:', req.body)
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, email, name: user.name } });
  } catch (error) {
    res.status(400).json({ error: 'Login failed' });
  }
};

module.exports = { register, login };