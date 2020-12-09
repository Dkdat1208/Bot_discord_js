const Discord = require('discord.js');
const axios = require('axios');
var prefix = "%";
const token='Nzg0MDA2Mjg5NTIwODUzMDEz.X8jAwQ.KIFwIMujh5Q2p3nN1G0-g_0Nnew';
const client = new Discord.Client();




client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

    //commande ping
        if( msg.content === 'ping')  {

            const timeTaken = Date.now() - msg.createdTimestamp;
            msg.reply('Pong!\n latence du  message '+  timeTaken + 'ms');

            return 0;

        }
    //commande jokeCount
        
        if(msg.content === prefix+'jokeCount'){
            axios.get("http://api.icndb.com/jokes/count")
            .then(response =>  (response.length ) ? console.log(response) : msg.reply(response.data.value) )
            .catch (error  => console.log(error));

             return 0;

        } 
    //commande jokeCategories
        if(msg.content === prefix+'jokeCategories'){
            axios.get("http://api.icndb.com/categories")
            .then(response =>  (response.length ) ? console.log(response) :  msg.reply(response.data.value.toString()))
            .catch (error  => console.log(error));
                return 0;
        }
        
    //commande joke =>  3 cas 
        if( msg.content.startsWith(prefix+'joke')){

                  messagesplit = msg.content.split(" ");

                if(messagesplit[0].startsWith(prefix + 'joke')) {
                    
                    //cas  joke randome = [id]
                    if(messagesplit[1] && !isNaN(messagesplit[1])){

                        axios.get("http://api.icndb.com/jokes/random/messagesplit")
                        .then(response =>  (response.length ) ?  console.log(response) : msg.reply(response.data.value.joke) )
                        .catch (error  => console.log(error));
                        return 0;
                    }else if(messagesplit[1]){
                    
                        //cas joke =[categorie]
                        axios.get("http://api.icndb.com/jokes/random?limitTo=["+ messagesplit[1] +"]")
                        .then(response =>  (response.length ) ?  console.log(response) : msg.reply(response.data.value.joke))
                        .catch(error  => console.log(error));
                        return 0 ;

                    }else{
                        //joke random
                        axios.get("http://api.icndb.com/jokes/random")
                        .then(response =>  (response.length ) ?  console.log(response) : msg.reply(response.data.value.joke) )
                        .catch (error  => console.log(error));
                        return 0;
                    }
          
                 }
        }
        //commade help liste l'ensemble de commande
        if(msg.content === prefix+'help'){

             msg.reply('\nCommande disponible:\n'+prefix+'jokeCategories,\n'
            +prefix+'joke\n ping,\n '+prefix+'prefix [your prefix],\n' 
            +prefix+'joke [your category],\n'+ prefix+'prefix [your id],\n'
            +prefix+'play [your video link],\n'+prefix+'jokeCount\n');

            return 0;

        }
        //commande prefix => possibilité de changer le prefix
        if(msg.content.startsWith(prefix + 'prefix') ){
            prefix = msg.content.split(" ")[1];
            msg.reply('prefix modifié');
            return 0;

        }

        // lire une video youtube a partir d'une url
        if(msg.content === prefix+'play'){
            let voiceChannel = message.guild.channels
            .filter(function (channel) { return channel.type === 'voice' })
            .first()
            let args = message.content.split(' ')
            voiceChannel
            .join()
            .then(function (connection) {
                let stream = YoutubeStream(args[1])
                stream.on('error', function () {
                message.reply("video non disponible");
                connection.disconnect()
                })
                connection
                .playStream(stream)
                .on('fin', function () {
                    connection.disconnect()  
                })
            })
        }


        
});

client.login(token);