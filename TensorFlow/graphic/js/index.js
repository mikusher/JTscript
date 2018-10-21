


window.onload = function(){

    // initial variable
    let xs = [];
    let ys = [];
    const zeroPoint = 0;

    // variables
    document.getElementById("input-x").value = 1;
    document.getElementById("sendPositions").addEventListener('click', function(event){
        var x = document.getElementById('input-x').value;
        var y = document.getElementById('input-y').value;
        xs.push(x);
        ys.push(y);

        document.getElementById("input-x").value = parseInt(x)+1;
        // begin chart
        let ctx = document.getElementById("mychart").getContext('2d');
        
        // chart data and settings
        let myChart = new Chart(ctx, {
            type: 'line',
            options: {
                scales:{
                    yAxes: [
                        {
                            ticks: {
                                beginArZero: true
                            }
                        }
                    ]
                }
            },
            data: {
                labels: xs,
                datasets: [{
                    label: 'Original Data',
                    data: ys,
                    borderWidth: 1
                }]
            },
        });
    });
};