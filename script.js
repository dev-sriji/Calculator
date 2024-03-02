document.addEventListener('DOMContentLoaded', function() {

const inputBox = document.getElementById('input');
let expression = '';
let result = '';

function actionRecv(id,action){
    if((expression.endsWith('÷') || expression.endsWith('%') || expression.endsWith('*') || expression.endsWith('-') || expression.endsWith('+')) && action == 'op' ){
        expression= expression.slice(0, -1) + id;
    }else{
        expression += id;
    }
}
function clear(){
    expression = 'clearing';
    setTimeout(() => {
        expression = 'clearing.';
        updateDisp(expression,'')
        setTimeout(() => {
            expression = 'clearing..';
            updateDisp(expression,'')
            setTimeout(() => {
                expression = 'clearing...';
                updateDisp(expression,'')
                setTimeout(() => {
                    expression='';
                    updateDisp(expression,'')
                }, 250);                
            }, 200);
        }, 150);
    }, 100);
    
}

function buttonClick(event){
    const action = event.target.dataset.use;
    const id = event.target.dataset.id

    switch(action){
        case 'number':
        case 'op':
        actionRecv(id,action)
        break;
        case 'clear':
        clear()
        break;
    }
    updateDisp(expression,result)
}

inputBox.addEventListener('click',buttonClick)

});

function updateDisp(expression,result){
    document.getElementById('expression').textContent = expression.replace(/\*/g,'x').replace(/\//g,'÷');
    document.getElementById('result').textContent=result;
}