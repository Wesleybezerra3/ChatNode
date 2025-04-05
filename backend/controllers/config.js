exports.ping = async (req,res)=>{
    return res.status(200).json({message:'Servidor ligado'});
};