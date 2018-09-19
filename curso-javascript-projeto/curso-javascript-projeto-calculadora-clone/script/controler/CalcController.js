class CalcController{

    constructor(){
        this._locale = navigator.language;

        this._operations = [];
        this._displayEL = document.getElementById("display");
        this._dateEL = document.getElementById("date");
        // Second option for time.
        this._timeEL = document.getElementById("time");
        //this._currentDate;
        this.init();
        this.initButtonEvents();
    };

    init(){

        this.setDisplayDateScreen();
        setInterval(() =>{
            this.setDisplayDateScreen();
        }, 1000);


        let timeEL = document.getElementById("time");
        // This can also be facilitated and leave as the displayDate the logic is the same,
        // I prefer to have so in case of study, has always multiple solutions to a single challenge.
        function startTime() {
            let today = new Date();
            let h = today.getHours();
            let m = today.getMinutes();
            let s = today.getSeconds();
            m = checkTime(m);
            s = checkTime(s);
            timeEL.innerHTML = h + ":" + m + ":" + s;
            //call
            let t = setTimeout(startTime, 500);
        }
        function checkTime(i) {
            if (i < 10) {
                i = "0" + i
            }  // add zero in front of numbers < 10
            return i;
        }

        startTime();

    };

    //create a new function for all button event
    addEventListenerAll(element, events, func){
        events.split(',').forEach(event => {
            element.addEventListener(event, func, false);
        })
    }

    // button events
    setError(){
        this.displayCalc = "Error";
    }

    isOperator(value){
        return (['+','-','*','%','/'].indexOf(value) > -1);
    }

    setLastValueOperation(value){
        this._operations[this._operations.length - 1] = value;
    }

    getLastOperation(){
        return this._operations[this._operations.length - 1];
    }

    pushOperation(value){
        this._operations.push(value);
        if(this._operations.length > 3){
            this.calc();
        }
    }

    setAc(){
        this.displayCalc = 0;
        this._operations = [];
    }

    setCe(){
        this._operations.pop();
    }

    addOperations(value){

        if(isNaN(this.getLastOperation())){
            //string
            if(this.isOperator(value)){
                // trocar o operador
                this.setLastValueOperation(value);
            }else if(isNaN(value)){

            }else {
                this.pushOperation(value);
                this.setLastNumberDp();
            }
        }else {
            //number
            if(this.isOperator(value)){
                this.pushOperation(value);
            }else {
                //number
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastValueOperation(parseInt(newValue));

                //atualizar display
                this.setLastNumberDp();
            }
        }

    }

    calc() {
        let last = this._operations.pop();
        let result = eval(this._operations.join(""));

        this._operations = [result, last];

        this.setLastNumberDp();
    }

    setLastNumberDp() {
        let lastNumber;
        for (let i = this._operations.length - 1; i >= 0; i--){
            if (!this.isOperator(this._operations[i])){
                lastNumber = this._operations[i];
                break;
            }
        }
        this.displayCalc = lastNumber;
    }

    //button controler - action
    buttonController(value){
        switch (value) {
            case 'ac':
                this.setAc();
                break;
            case 'ce':
                this.setCe();
                break;
            case 'soma':
                this.addOperations('+');
                break;
            case 'subtracao':
                this.addOperations('-');
                break;
            case 'multiplicacao':
                this.addOperations('*');
                break;
            case 'divisao':
                this.addOperations('/');
                break;
            case 'porcento':
                this.addOperations('%');
                break;
            case 'ponto':
                this.addOperations('.');
                break;
            case 'igual':
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperations(parseInt(value));
                break;
            default:
                this.setError();
                break;
        }
    }

    //button control - baseVal -> because svg
    initButtonEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((lstBtn, index) => {
            this.addEventListenerAll(lstBtn, 'click,drag', execEvt => {
                let bClick = lstBtn.className.baseVal.replace("btn-", "");
                this.buttonController(bClick);
            });

            this.addEventListenerAll(lstBtn, 'mouseover,mouseup,mousedown', execEvt => {
                lstBtn.style.cursor = "pointer";
            });
        });
    }



    setDisplayDateScreen(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale);
    }

    get displayDate(){
        return this._dateEL.innerHTML;
    }

    set displayDate(date){
        this._dateEL.innerHTML = date;
    }

    get displayTime(){
        return this._timeEL.innerHTML;
    }

    set displayTime(time){
        this._timeEL.innerHTML = time;
    }

    get displayCalc(){
        return this._displayEL.innerHTML;
    }

    set displayCalc(value){
        this._displayEL.innerHTML = value;
    }

    get currentDate(){
        return new Date();
    }

    set currentDate(date){
        this._currentDate = date;
    }
}