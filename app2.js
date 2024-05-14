window.onload = function ()
{

    let distance = 1000000;
    const canvas = document.querySelector('.canvas');
    const ctx = canvas.getContext("2d");

    function random(min, max)
    {
        return min + Math.random() * (max + 1 - min);
    }

    window.addEventListener('resize', function ()
    {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        //Re-add the stars
        stars();
    });
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    joebutton.addEventListener("mouseenter", function (e)
    {
        joebutton.innerText = "JOE.MT <"
        joebutton.style.fontSize = "2.5em"
    });
    joebutton.addEventListener("mouseleave", function (e)
    {
        joebutton.innerText = "JOE.MT"
        joebutton.style.fontSize = "2em"
    });
    joebutton.addEventListener("mousedown", function (e)
    {
        joebutton.innerText = "JOE.MT<"
        joebutton.style.fontSize = "2.5em"
    });
    joebutton.addEventListener("mouseup", function (e)
    {
        joebutton.innerText = "JOE.MT <"
        joebutton.style.fontSize = "2.5em"
    });

    let pause_regular_audio = false
    // Set the date we're counting down to

    var countDownDate = new Date("May 14, 2024 09:45:00").getTime();
    if (location.hash.includes("1"))
    {
        countDownDate = Date.now() + 90000
    }
    let oldseconds = 0;
    let oldminutes = 0;
    // Update the count down every 1 second
    let countInterval = 0;


    //let universalspeed = 1.01
    let universalspeed = 1.001
    let speedvariation = 0.001
    let starspeeds = [universalspeed, universalspeed + speedvariation]
    let starArray = []
    addStars(500)

    function randomRange(min, max)
    {
        return Math.random() * (max - min) + min;
    }
    function addStars(amount)
    {
        for (let i = 0; i < amount; i++)
        {
            let xPos = random(2, canvas.width - 2) - canvas.width / 2;
            let yPos = random(2, canvas.height - 2) - canvas.height / 2;
            let speed = randomRange(starspeeds[0], starspeeds[1]);
            starArray.push([xPos, yPos, 0, speed])
        }
    }
    audioplayingalarm = false
    function stars()
    {
        if (distance > 46000)
        {

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath()
        }
        if (distance < 47000)
        {
            app_bar.style.top = "-45px"
            chat_view_mode = true;
        }

        const canvasSize = canvas.width * canvas.height;
        let xOffset = 0;
        let yOffset = 0;

        if (distance < 10000)
        {
            ctx.fillStyle = 'black';
        }
        else if (distance < 29000)
        {
            ctx.fillStyle = 'red';
        }
        else
        {
            ctx.fillStyle = 'white';
        }
        for (let i = 0; i < starArray.length; i++)
        {
            if (distance < 29000)
            {
                starArray[i][0] = starArray[i][0] * 1.01
                starArray[i][1] = starArray[i][1] * 1.01
            }
            else
            {
                starArray[i][0] = starArray[i][0] * starArray[i][3]
                starArray[i][1] = starArray[i][1] * starArray[i][3]
            }

            starArray[i][2] += 1
            xPos = starArray[i][0] + canvas.width / 2
            yPos = starArray[i][1] + canvas.height / 2

            if (!(xPos > -10 && xPos < canvas.width + 10 && yPos > -10 && yPos < canvas.height + 10))
            {
                starArray[i][0] = random(2, canvas.width - 2) - canvas.width / 2;
                starArray[i][1] = random(2, canvas.height - 2) - canvas.height / 2;
                starArray[i][2] = 0
                starArray[i][3] = randomRange(starspeeds[0], starspeeds[1]);
            }
            let alpha = random(0.7, 1);
            //let size = random(1, 2);
            size = Math.min(1, starArray[i][2] / 100)
            if (distance < 10000)
            {
                size = 3
            }
            else if (distance < 2000)
            {
                size = 15
            }
            else if (distance < 1000)
            {
                size = 150
            }
            //alpha = 1


            ctx.globalAlpha = alpha;
            //ctx.fill(xPos, yPos, size, size);

            ctx.beginPath()
            ctx.arc(xPos + xOffset, yPos - yOffset, size, 0, 2 * Math.PI, false);
            ctx.fill();
        }
    }

    let secondscount = 0;

    let twentybeep = document.getElementById('twentybeep')
    let tenbeep = document.getElementById('tenbeep')
    let ninetybeep = document.getElementById('ninetybeep')


    var x = setInterval(function ()
    {
        countInterval++
        // Get today's date and time
        //console.log(moment())
        var now = moment()//new Date().getTime();
        // Find the distance between now and the count down date
        distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
        );
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        var mseconds = Math.floor((distance % (1000 * 60)) / 1);

        demo.innerText = ""
        if (days > 0)
        {
            demo.innerText += ("00" + days).slice(-2) + ":"
        }
        if (hours > 0)
        {
            demo.innerText += ("00" + hours).slice(-2) + ":"
        }
        if (minutes > 0)
        {
            demo.innerText += ("00" + minutes).slice(-2) + ":"
        }
        demo.innerText += ("00" + seconds).slice(-2);
        document.getElementById("demoms").innerHTML = " . " + ("00" + mseconds).slice(-3);

        if (distance < 0)
        {
            setTimeout(() =>
            {
                canvas.style.display = 'none'
                demo.style.display = 'none'
                demoms.style.display = 'none'
                audioplayingalarm = true
                let audio = new Audio('empty.mp3');
                audio.volume = 0.2
                audio.play();
                let audioending = new Audio('endingtheme.mp3');
                audioending.volume = 1
                audioending.play();

                setTimeout(function ()
                {
                    let audio = new Audio('short-alarm-clock.mp3');
                    audio.volume = 0.2
                    audio.play();
                    spline.style.display = 'block'
                    setInterval(function ()
                    {
                        let audio = new Audio('short-alarm-clock.mp3');
                        audio.volume = 0.2
                        audio.play();
                    }, 3900)
                }, 2000)
            }, 6000);

            clearInterval(x);
            document.getElementById("demo").innerHTML =
                "00";
            document.getElementById("demoms").innerHTML =
                " . 000";
        }
        else if (distance < 1000)
        {
            ninetybeep.pause()
        }
        else if (distance < 10000)
        {
            if (tenbeep.paused)
            {
                console.log("playing 10beep")
                tenbeep.play();
            }
        }
        else if (distance < 22000 && distance > 20000)
        {
            if (twentybeep.paused)
            {
                console.log("playing 20beep")
                twentybeep.play();
            }
        }
        else if (distance < 87000)
        {
            if (!pause_regular_audio)
            {
                pause_regular_audio = true;
                console.log("playing 90beep")
                ninetybeep.play();
            }
        }


        if (oldseconds != seconds)
        {
            secondscount += 1
            oldseconds = seconds;
            if (!pause_regular_audio)
            {
                let defualtbeep = new Audio(
                    "defaultbeep.mp3"
                );
                console.log("playing beep")
                defualtbeep.play();
            }
        }

        if (oldminutes != minutes)
        {
            oldminutes = minutes;
            if (!pause_regular_audio)
            {
                var headlinebeep = new Audio(
                    "bbc-headline.mp3"
                );
                headlinebeep.play();
            }
        }
        stars()
    }, 1);
};