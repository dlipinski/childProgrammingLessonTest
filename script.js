
// jshint ignore: start

class Field{
    constructor(){
        this.obstacle = false;
        this.collision = false;
        this.edges = [];
    }
    setEdges(edges){
        this.edges = edges.slice();
    }

}
let tdHeight = 55;
let tdWidth = 55;
class Car {
    constructor(){
        this.direction = 0;
        this.positionX = 0;
        this.positionY = 0;
    }
 
    turnRight(){
        this.direction++;
        if(this.direction===4) {this.direction=0;}
        let degrees = 0;
        switch(this.direction){
            case 3: degrees = 90; break; case 2: degrees = 180; break; case 3: degrees = 180; break; case 0: degrees = 0; break; 
        }
        $('#car').animate({  borderSpacing: degrees}, {
            step: function(now,fx) {
              $(this).css('-webkit-transform','rotate('+now+'deg)'); 
              $(this).css('-moz-transform','rotate('+now+'deg)');
              $(this).css('transform','rotate('+now+'deg)');
            },
            duration:'slow'
        },'linear');
    }
    turnLeft(){
        this.direction--;
        if(this.direction===-1) {this.direction=3;}
        let degrees = 0;
        switch(this.direction){
            case 3: degrees = 90; break; case 2: degrees = 180; break; case 1: degrees = 270; break; case 0: degrees = 360; break; 
        }
        $('#car').animate({  borderSpacing: -degrees}, {
            step: function(now,fx) {
              $(this).css('-webkit-transform','rotate('+now+'deg)'); 
              $(this).css('-moz-transform','rotate('+now+'deg)');
              $(this).css('transform','rotate('+now+'deg)');
            },
            duration:'slow'
        },'linear');
    }
    go(){
        switch(this.direction){
            case 0:
                this.positionY -=tdHeight;
                $("#car").animate({ 
                    top: this.positionY,
                  },  'slow' );
                break;
            case 1:
                this.positionX -=tdWidth;
                $("#car").animate({ 
                    left: this.positionX,
                  },  'slow' );
                break;
            case 2:
                this.positionY +=tdHeight;
                $("#car").animate({ 
                    top: this.positionY,
                  },  'slow' );
                break;
            case 3:
                this.positionX -=tdWidth; 
                $("#car").animate({ 
                    left: this.positionX,
                  },  'slow' );
                break;
        }
    }
}
class Game{
    constructor(){
        this.fields = [];
        for(let i=0;i<10;i++){
            this.fields[i] = [];
            for(let j=0;j<10;j++){
                this.fields[i][j]= new Field();
                if(Math.floor((Math.random() * 10)+1)===3){

                    this.fields[i][j].obstacle = true;
                }
            }
        }
        this.car = new Car();
    }

}
game = new Game();

var init = () => {
    let bottomRightTdPosition = $('#board td').eq(99).position();
   
        let positionX = bottomRightTdPosition.top;
        let positionY = bottomRightTdPosition.left;
        
        var element = $('<div />',{'name': 'car', 'class': 'car', 'id': 'car'})
        .css({ 'left': positionY, 'top': positionX, }) 
        $("#board").append(element); 
    game.car.realCar = $('#car');
    game.car.positionX = positionY;
    game.car.positionY = positionX;
    game.fields.forEach((fieldrow,i)=>{
        fieldrow.forEach((field,j)=>{
            let realFields = $('#board td');
            field.positionX = realFields.eq(i*10+j).position().top;
            field.positionY = realFields.eq(i*10+j).position().left;
            if(field.obstacle===true){
                $('#board td').eq(i*10+j).addClass('obstacle');
            }
        });
    });
    game.car.turnLeft();
    game.car.turnLeft();
    game.car.turnLeft();
    game.car.turnLeft();

}

const processCode = (code) =>{
    code = code.replace(/.*left.*/gi, '<- left\n');
    code = code.replace(/.*right.*/gi, 'right ->\n');
    code = code.replace(/.*go.*/gi, 'GO\n');
    code = code.replace(/^\s*$(?:\r\n?|\n)/gm, '');
    return code;
}

const executeCode = (code) => {
    codeLines = code.split('\n');
    codeLines.forEach((line)=>{
        switch(line){
            case 'GO':
                game.car.go();
                break;
            case '<- left':
                game.car.turnLeft();
                break;
            case 'right ->':
                game.car.turnRight();
                break;
            default:
                break;
        }
    });
}
$(document).ready(function(){
    let textarea =  $('textarea');
    let runbutton =   $('#run');
    init();
    textarea.val('');
    textarea.bind('input propertychange', function() {
        $(this).val(processCode($(this).val()));
    });
    runbutton.click( function() {
        executeCode(textarea.val());
    });




});