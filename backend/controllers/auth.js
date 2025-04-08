require('dotenv').config();
const {User} = require("../model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { use } = require('../routes/auth');
const { where } = require('sequelize');

const SECRET_KEY = process.env.JWT_KEY;


const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username}, SECRET_KEY, {
    expiresIn: "1h",
  });
};

exports.register = async (req, res) => {
  try {
    console.log("Recebi uma requisição no endpoint /register:", req.body)
    const saltRounds = 10;
    const { username, password } = req.body;
    const existingUser = await User.findOne({
      where: { username },
    });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Nome de usuário já cadastrado!" });
    }

    const passwordHash = await bcrypt.hash(password, saltRounds);
    await User.create({ username, password: passwordHash });
    return res.status(201).json({ message: "Conta criada com sucesso! 🎉 Seja bem-vindo!" });
  } catch (err) {
    console.error("Erro ao cadastrar usuário:", err);
    return res
      .status(500)
      .json({ message: "Erro ao cadastrar usuário. Tente novamente" });
  }
};

exports.login = async(req,res)=>{
  try{
  const {username,password} = req.body;

  const user = await User.findOne({
    where:{username}
  })
  if(!user){
    return res.status(404).json({message:'Usuário não encontrado! Verifique as informações e tente novamente.'});
  }

  const isPassword = await bcrypt.compare(password, user.password);

  if(!isPassword){
    return res.status(401).json({message:'Senha inválida!'});
  }
  const token = generateToken(user)
  
  return res.status(200).json({message:'Login bem-sucedido! ✅ Encaminhado para o chat...', token})

  }catch(err){
    console.error(err)
   return res.status(500).json({message:'Erro ao realizar login!'})
  }
}

exports.authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acesso negado! Token não fornecido." });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err)
    return res.status(403).json({ message: "Token inválido ou expirado!" });
  }
};

exports.me = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "username"],
    });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao buscar usuário!" });
  }
};
