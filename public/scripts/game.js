document.onreadystatechange = () =>{
    if(document.readyState === 'complete'){
        //document ready
        
        function makeid() {
            var text = "";
            var possible = "0123456789";
          
            for (var i = 0; i < 10; i++)
              text += possible.charAt(Math.floor(Math.random() * possible.length));
          
            return text;
          }
          
        var state = {
            username : "Guest_" + makeid()
        }

        const socket = io();
        const blocks = document.querySelectorAll('.board');
        console.log(blocks);
        for(block of blocks){
            block.addEventListener("click", function(event){
                socket.emit('playerclicked', {player: state.username, action:this.id});
            });
        }
        
        socket.on('playerclicked', function(data){
            console.log(data.player + ' clicked: ' + data.action);
        })
    }
};