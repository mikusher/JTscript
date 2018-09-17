class CalcController{

    constructor(){
        this._locale = navigator.language;

        this._displayEL = document.getElementById("display");
        this._dateEL = document.getElementById("date");
        // Second option for time.
        this._timeEL = document.getElementById("time");
        //this._currentDate;
        this.init();
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

    setDisplayDateScreen(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale);
        //this.displayTime = this.displayTime.toLocaleTimeString(this._locale);
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