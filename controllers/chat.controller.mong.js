const ChatController = {

    chat: (req,res) => {
        const username = req.user.username 
        console.log('username', username);
        res.render('chat', {username} )
    }
    
}
module.exports = ChatController