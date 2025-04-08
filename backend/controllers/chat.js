const {Chat} = require('../model');
const { where, Op } = require('sequelize');

exports.createChat = async(req, res)=>{
    try{
    const {name, password,is_private,created_by} = req.body;

    const isChatExisting = await Chat.findOne({
        where:{name}
    })
    if(isChatExisting){
        return res.status(409).json({message:'Nome do chat já está sendo utilizado!'})
    }
    const newChat = await Chat.create({name,password,is_private,created_by});
    return res.status({message:'Chat criado com sucesso!', newChat});

    }catch(err){
      console.error(err)
      return res.status(500).json({message:'Erro na criação do chat!'})
    }
}
exports.getChats = async(req,res)=>{
    try{
        const {name} = req.body;
         
        if(name){
            const chats = await Chat.findAll({
                where:{
                    name:{
                    [Op.like]: `%${name}`
                    }
                }
            })
            return res.status(200).json(chats)
        }

        const chats  = await Chat.findAll();
        
        return res.status(200).json({message:'chats obtidos com sucesso', chats})

    }catch(err){
        console.error(err)
        return res.status(500).json({message:'Erro ao buscar chats!'})
    }
}