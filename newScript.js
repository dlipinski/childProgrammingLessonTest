//jshint browser: true, esversion: 6, devel:true, jquery:true





$(document).ready( () => {
    let movesToRun = ['GO','<- left', 'right ->',''];
    let moves = [];
    let duration = 800; /* duration for animates */
    let textarea = $('textarea'); /* textarea holding child code */
    textarea.val('');
    let runButton = $('#run');
    let backTBody = $('#backTBody');
    let fields = []; for (let i=0; i<10; i++) { fields[i]=[]; }
    for (let i=0; i<10; i ++) { for(let j=0; j<10; j++) { fields[i][j] = $('#board td').eq(i*10+j); } }
    let startPosition = []; startPosition[0]=fields[9][9].position().top; startPosition[1]=fields[9][9].position().left;
    let fieldHeight = fields[0][0].height()+1; let fieldWidth = fields[0][0].width()+1;
    let car = $('<div />',{'id': 'car'}).css({'top':startPosition[0], 'left':startPosition[1]});car.direction = 0;
    $('body').append(car);

    const executeCode = () => {
        moves.forEach( (move, index) => {
            let currentTd = $(`#td${index}`);
            if($.inArray(move, movesToRun) !== -1){
                setTimeout(function(){
                    currentTd.addClass('highlightedOK');
                }, duration*index-50);
                setTimeout(function(){
                    currentTd.removeClass('highlightedOK');
                }, duration*index+duration+50);
            }else{
                setTimeout(function(){
                    currentTd.addClass('highlightedNOTOK');
                }, duration*index-50);
            }
            switch(move){
                case 'GO':
                    switch(car.direction){
                        case 0:
                            car.animate({ 
                                top: `-=${fieldHeight}px`,
                            }, duration );
                            break;
                        case 1:
                            car.animate({ 
                                left: `+=${fieldWidth}px`,
                            }, duration );
                            break;
                        case 2:
                            car.animate({ 
                                top: `+=${fieldHeight}px`,
                            }, duration );
                            break;
                        case 3:
                            car.animate({ 
                                left: `-=${fieldWidth}px`,
                            }, duration );
                            break;
                    }
                    break;
                case '<- left':
                    switch(car.direction){
                        case 0:
                            car.animate({ 
                                borderTopLeftRadius: 50, borderTopRightRadius: 20, borderBottomRightRadius: 20, borderBottomLeftRadius: 50 
                            }, duration );
                            car.direction = 3;
                            break;
                        case 1:
                            car.animate({ 
                                borderTopLeftRadius: 50, borderTopRightRadius: 50, borderBottomRightRadius: 20, borderBottomLeftRadius: 20 
                            }, duration );
                            car.direction = 0;
                            break;
                        case 2:
                            car.animate({ 
                                borderTopLeftRadius: 20, borderTopRightRadius: 50, borderBottomRightRadius: 50, borderBottomLeftRadius: 20 
                            }, duration );
                            car.direction = 1;
                            break;
                        case 3:
                            car.animate({ 
                                borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomRightRadius: 50, borderBottomLeftRadius: 50 
                            }, duration );
                            car.direction = 2;
                            break;
                    }
                    break;
                case 'right ->':
                    switch(car.direction){
                        case 0:
                            car.animate({ 
                                borderTopLeftRadius: 20, borderTopRightRadius: 50, borderBottomRightRadius: 50, borderBottomLeftRadius: 20 
                            }, duration );
                            car.direction = 1;
                            break;
                        case 1:
                            car.animate({ 
                                borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomRightRadius: 50, borderBottomLeftRadius: 50 
                                
                            }, duration );
                            car.direction = 2;
                            break;
                        case 2:
                            car.animate({ 
                                borderTopLeftRadius: 50, borderTopRightRadius: 20, borderBottomRightRadius: 20, borderBottomLeftRadius: 50 
                            }, duration );
                            car.direction = 3;
                            break;
                        case 3:
                            car.animate({ 
                                borderTopLeftRadius: 50, borderTopRightRadius: 50, borderBottomRightRadius: 20, borderBottomLeftRadius: 20 
                            }, duration );
                            car.direction = 0;
                            break;
                    }
                    break;
                default:
                    break;
            }
        });
        car.animate({
            borderTopLeftRadius: 50, borderTopRightRadius: 50, borderBottomRightRadius: 20, borderBottomLeftRadius:20,
            top: startPosition[0],
            left: startPosition[1]
        }, duration );
    };

    const processCode = () =>{
        let code = textarea.val();
        code = code.replace(/.*left.*/gi, '<- left\n');
        code = code.replace(/.*right.*/gi, 'right ->\n');
        code = code.replace(/.*go.*/gi, 'GO\n');
        code = code.replace(/^\s*$(?:\r\n?|\n)/gm, '');
        textarea.val(code);
    };

    const readCode = () => {
        moves = textarea.val().split('\n');
    };

    runButton.click( () => {
       readCode();
       executeCode();
    });

    textarea.bind('input propertychange', () => {
        processCode();
        let trs = textarea.val().split('\n').length;
        backTBody.html('');
        for(let i=0; i<trs;i++){
            let tr = $('<tr />');
            let td = $('<td />',{'id': `td${i}`}); td.html(`${i+1}.`);
            tr.append(td);
            backTBody.append(tr);
        }
    });

   /* textarea.keypress(function(e) {
        if(e.which === 13) {
            runButton.trigger('click');
        }
    });*/

});