const {Chat} = require('../model');
const { where, Op } = require('sequelize');

exports.createChat = async(req, res)=>{
    try{
    const {name, password, is_private, created_by} = req.body;
    console.log(req.body)

    const isChatExisting = await Chat.findOne({
        where:{name}
    })

    if(isChatExisting){
        return res.status(409).json({message:'Nome do chat já está sendo utilizado!'})
    }
    const newChat = await Chat.create({name,password,is_private,created_by});

    return res.status(200).json({message:'Chat criado com sucesso!'});

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
exports.getMyChats = async(req,res)=>{
try{
    // Id do usuário logado
    const {id} = req.query;
    console.log(id)
    if(!id){
        return res.status(400).json({message:'Usuário não informado!'})
    }

    const chats = await Chat.findAll({
        where:{
            created_by:id
        }
    })
    if(!chats){
        return res.status(404).json({message:'Nenhum chat encontrado!'})
    }
    return res.status(200).json({message:'Meus chats obtidos com sucesso!', chats})
}catch(err){
    console.error(err)
    return res.status(500).json({message:'Erro ao buscar meus chats!'})
}
}

exports.getChatId = async(req,res)=>{
    try{
      const {name} = req.query;

      const id = await Chat.findOne({
        where:{name},
        attributes:['id']
      })
      if(!id){
        return res.status(404).json({message:'Id não encontrado!'})
      }
      return res.status(200).json(id);
    }catch(err){
     console.error(err)
    }
}

// exports.messages = async (req, res)=>{
    
// }