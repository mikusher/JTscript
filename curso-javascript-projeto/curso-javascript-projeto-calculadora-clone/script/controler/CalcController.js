class CalcController{

    constructor(){
        this._displayCalc = 0;
        this._currentDate;
        this.init();
    };

    init(){

        let displayEL = document.getElementById("display");
        let dateEL = document.getElementById("date");
        let timeEL = document.getElementById("time");

        function startTime() {
            let today = new Date();
            let h = today.getHours();
            let m = today.getMinutes();
            let s = today.getSeconds();
            m = checkTime(m);
            s = checkTime(s);
            timeEL.innerHTML = h + ":" + m + ":" + s;
            let t = setTimeout(startTime, 500);
        }
        function checkTime(i) {
            if (i < 10) {
                i = "0" + i
            }  // add zero in front of numbers < 10
            return i;
        }

        let _data = new Date();
        displayEL.innerHTML = "0";
        dateEL.innerHTML = _data.getDate()+"/"+(_data.getMonth()+1)+"/"+_data.getFullYear();
        startTime();

    };

    get displayCalc(){
        return this._displayCalc;
    }

    set displayCalc(value){
        this._displayCalc = value;
    }

    get actualDate(){
        return this._currentDate;
    }

    set actualDate(date){
        this._currentDate = date;
    }
}