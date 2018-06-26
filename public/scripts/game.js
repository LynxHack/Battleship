document.onreadystatechange = () =>{
    //To Do - once found player, fadeout button and gear
    // $("#playbutton").click(function(){
    //     $("#playbutton").fadeOut(200).fadeIn(200);
    //     $("#playbutton").val('Connecting');
    //     $("#connectinggear").fadeIn(1000);
    //     $('#connectinggear').fadeOut();
    //     $('#playbutton').fadeOut();
    // });

    if(document.readyState === 'complete'){
        //document ready
        const blocks = document.querySelectorAll('.board');
        console.log(blocks);
        for(block of blocks){
            block.addEventListener("click", function(event){
                console.log("You clicked " + this.id);
            });
        }         
    }
};