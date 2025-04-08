const { where } = require("sequelize");
const { User } = require("../model");

exports.getNameById = async (req, res) => {
  try {
    const {id} = req.query;
    const name = await User.findOne({
      where: {id},
      attributes: ["username"],
    });

    return res
      .status(200)
      .json({ message: "Username obtido com sucesso!", name });
  } catch (err) {
    console.error(err)
    return res.status(500).json({message:'Erro ao obter username!'})
  }
};
