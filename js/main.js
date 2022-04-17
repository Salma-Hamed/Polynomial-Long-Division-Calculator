var n = [];
var d = [];
var arrangedNum = [];
var arrangedDen = [];
document.getElementById('answer').style.display = "none";
document.getElementById('l').style.display = "none";
document.getElementById('clr').style.display = "none";
function calculate(){
    var num = document.getElementById('num').value;
    var den = document.getElementById('den').value;
    if(num.length == 0 || den.length == 0)
    {
        return;
    }

    //---------------------------- Numerator -----------------------------
    if(!num.includes('+') && !num.includes('-'))
    {
        n.push(num.slice(0));
    }
    else if(num.includes('+') || num.includes('-'))
    {
        var p;
        var sign = '';
        var signStack = '';
        while(num.includes('+') || num.includes('-'))
        {
            for(var j = 0; j < num.length; j++)
            {
                
                if(num[j] == '+')
                {
                    p = j;
                    sign = '+';
                    break;
                }
                else if(num[j] == '-')
                {
                    p = j;
                    sign = '-';
                    break;
                }
            }
            if(sign == '+')
            {
                if(signStack == '-')
                {
                    n.push('-' + num.slice(0, p));
                }
                else{
                    n.push(num.slice(0, p));
                }
                num = num.slice(p + 1);
            }
            else if(sign == '-')
            {
                if(signStack == '-')
                {
                    n.push("-" + num.slice(0, p));
                }
                else{
                    n.push(num.slice(0, p));
                }
                num = num.slice(p + 1);
            }
            signStack = sign;
        }
        if(n[0] == '')
        {
            n= n.slice(1);
        }
        if(num.length != 0)
        {
            if(signStack == '-')
            {
                n.push(signStack + num);
            }
            else{
                n.push(num);
            }
        }
    }


    //--------------------------- Rearranging the numerator terms ----------------------

    for(var i = 0; i < n.length; i++)
    {
        if(n[i].toLowerCase().includes('x') && n[i].includes('^'))
        {
            arrangedNum.push(n[i]); // terms containing x and having order bigger than 1
        }
    }
    var max = 0;
    var pow = 0;
    var maxIndex = 0;
    var arrNum = [];
    var len = arrangedNum.length;
    while(arrNum.length != len)
    {
        max = 0;
        for(var i = 0; i < arrangedNum.length; i++)
        {
            for(var j = 0; j < arrangedNum[i].length; j++)
            {
                if(arrangedNum[i][j] == '^')
                {
                    pow = arrangedNum[i].slice(j + 1);
                }
            }
            if(max <= pow)
            {
                max = pow;
                maxIndex = i;
            }
        }
        arrNum.push(arrangedNum[maxIndex]);
        arrangedNum.splice(maxIndex,1);
    }

    for(var i = 0; i < n.length; i++)
    {
        if(n[i].toLowerCase().includes('x') && !n[i].includes('^'))
        {
            arrNum.push(n[i]);
            break;
        }
    }
    for(var i = 0; i < n.length; i++)
    {
        if(!n[i].toLowerCase().includes('x'))
        {
            arrNum.push(n[i]);
            break;
        }
    }


//------------------------------ Denominator ----------------------------------
    if(!den.includes('+') && !den.includes('-'))
    {
        d.push(den.slice(0));
    }
    else if(den.includes('+') || den.includes('-'))
    {
        var q;
        var sign2 = '';
        var snStack = '';
        while(den.includes('+') || den.includes('-'))
        {
            for(var j = 0; j < den.length; j++)
            {
                
                if(den[j] == '+')
                {
                    q = j;
                    sign2 = '+';
                    break;
                }
                else if(den[j] == '-')
                {
                    q = j;
                    sign2 = '-';
                    break;
                }
            }
            if(sign2 == '+')
            {
                if(snStack == '-')
                {
                    d.push('-' + den.slice(0, q));
                }
                else{
                    d.push(den.slice(0, q));
                }
                den = den.slice(q + 1);
            }
            else if(sign2 == '-')
            {
                if(snStack == '-')
                {
                    d.push("-" + den.slice(0, q));
                }
                else{
                    d.push(den.slice(0, q));
                }
                den = den.slice(q + 1);
            }
            snStack = sign2;
        }
        if(d[0] == '')
        {
            d = d.slice(1);
        }
        if(den.length != 0)
        {
            if(snStack == '-')
            {
                d.push(snStack + den);
            }
            else{
                d.push(den);
            }
        }
    }
    
    //--------------------------- Rearranging the denominator terms ----------------------
    for(var i = 0; i < d.length; i++)
    {
        if(d[i].toLowerCase().includes('x') && d[i].includes('^'))
        {
            arrangedDen.push(d[i]); // terms containing x and having order bigger than 1
        }
    }

    var maxD = 0;
    var powD = 0;
    var maxIndexD = 0;
    var arrDen = [];
    var lenD = arrangedDen.length;

    while(arrDen.length != lenD)
    {
        maxD = 0;
        for(var i = 0; i < arrangedDen.length; i++)
        {
            for(var j = 0; j < arrangedDen[i].length; j++)
            {
                if(arrangedDen[i][j] == '^')
                {
                    powD = arrangedDen[i].slice(j + 1);
                }
            }
            if(maxD <= powD)
            {
                maxD = powD;
                maxIndexD = i;
            }
        }
        arrDen.push(arrangedDen[maxIndexD]);
        arrangedDen.splice(maxIndexD, 1);
    }
    
    for(var i = 0; i < d.length; i++)
    {
        if(d[i].toLowerCase().includes('x') && !d[i].includes('^'))
        {
            arrDen.push(d[i]);
            break;
        }
    }
    for(var i = 0; i < d.length; i++)
    {
        if(!d[i].toLowerCase().includes('x'))
        {
            arrDen.push(d[i]);
            break;
        }
    }




    //-------------------------- Division ----------------------
    var numCoeffMatrix = [];
    var numCoeff;
    var numPow;
    for(var i = 0; i < arrNum.length; i++)
    {
        for(var l = 0; l < arrNum[i].length; l++)
        {
            if(arrNum[i][l].toLowerCase() == 'x')
            {
                numCoeff = arrNum[i].slice(0, l);
                if(numCoeff == '')
                {
                    numCoeff = 1;
                }
                else if(numCoeff == '-')
                {
                    numCoeff = -1;
                }
                else{
                    numCoeff = parseInt(arrNum[i].slice(0, l));
                }
            }
            else if(arrNum[i][l] == '^')
            {
                numPow = parseInt(arrNum[i].slice(l + 1));
            }
        }
        if(!arrNum[i].toLowerCase().includes('x'))
        {
            numCoeff = parseInt(arrNum[i]);
            numPow = 0;
        }
        else if(arrNum[i].toLowerCase().includes('x') && !arrNum[i].includes('^'))
        {
            numPow = 1;
        }
        numCoeffMatrix.push({numCoeff, numPow});
    }



    var denCoeffMatrix = [];
    var denCoeff;
    var denPow;
    for(var i = 0; i < arrDen.length; i++)
    {
        for(var l = 0; l < arrDen[i].length; l++)
        {
            if(arrDen[i][l].toLowerCase() == 'x')
            {
                denCoeff = arrDen[i].slice(0, l);
                if(denCoeff == '')
                {
                    denCoeff = 1;
                }
                else if(denCoeff == '-')
                {
                    denCoeff = -1;
                }
                else{
                    denCoeff = parseInt(arrDen[i].slice(0, l));
                }
            }
            else if(arrDen[i][l] == '^')
            {
                denPow = parseInt(arrDen[i].slice(l + 1));
            }
        }
        if(!arrDen[i].toLowerCase().includes('x'))
        {
            denCoeff = parseInt(arrDen[i]);
            denPow = 0;
        }
        else if(arrDen[i].toLowerCase().includes('x') && !arrDen[i].includes('^'))
        {
            denPow = 1;
        }
        denCoeffMatrix.push({denCoeff, denPow});
    }


    var quotientMatrix = [];
    var minMatrix = [];
    var minCoeff;
    var minPow;
    var cnt = 0;
    var coeff;
    var qPow;
    var firstPart = [];
    var secondPart = [];
    while(numCoeffMatrix.length != 0 && numCoeffMatrix[0].numPow >= denCoeffMatrix[0].denPow)
    {
        coeff = numCoeffMatrix[0].numCoeff/denCoeffMatrix[0].denCoeff;
        qPow = numCoeffMatrix[0].numPow - denCoeffMatrix[0].denPow;
        quotientMatrix[cnt] = {coeff, qPow};
        for(var i = 0; i < denCoeffMatrix.length; i++)
        {
            minCoeff = quotientMatrix[cnt].coeff * denCoeffMatrix[i].denCoeff;
            minPow = quotientMatrix[cnt].qPow + denCoeffMatrix[i].denPow;
            minMatrix[i] = {minCoeff, minPow};
        }
        
        while(minMatrix.length != 0)
        {
            var j = 0;
            while(j < numCoeffMatrix.length)
            {
                if(numCoeffMatrix[j].numPow == minMatrix[0].minPow)
                {
                    numCoeffMatrix[j].numCoeff -= minMatrix[0].minCoeff;
                    minMatrix.splice(0, 1);
                    j++;
                }
            else if(minMatrix[0].minPow > numCoeffMatrix[j].numPow)
            {
                var t1 = {};
                firstPart = numCoeffMatrix.slice(0, j + 1);
                secondPart = numCoeffMatrix.slice(j + 1);
                numCoeffMatrix = firstPart;
                minMatrix[0].minCoeff *= -1;
                t1.numCoeff = minMatrix[0].minCoeff;
                t1.numPow = minMatrix[0].minPow;
                numCoeffMatrix.push(t1);
                for(var sp = 0; sp < secondPart.length; sp++)
                {
                    numCoeffMatrix.push(secondPart[sp]);
                }
                minMatrix.splice(0, 1);
            }
            else if(minMatrix[0].minPow < numCoeffMatrix[j].numPow)
            {
                console.log('<');
                j++;
            }
                if(minMatrix.length == 0)
                {
                    break;
                }
            }
            
            if(minMatrix.length != 0)
            {
                for(var i = 0; i < minMatrix.length; i++)
                {
                    var t = {};
                    minMatrix[i].minCoeff *= -1;
                    t.numCoeff = minMatrix[i].minCoeff;
                    t.numPow = minMatrix[i].minPow;
                    numCoeffMatrix.push(t);
                }
                minMatrix = [];
            }
            for(var i = 0; i < numCoeffMatrix.length; i++)
            {
                if(numCoeffMatrix[i].numCoeff == 0)
                {
                    numCoeffMatrix.splice(i, 1);
                }
            }

            // Sorting the numcoeffmatrix
            var temp;
            for(var fst = 1; fst < numCoeffMatrix.length; fst++)
            {
                for(var snd = 0; snd < numCoeffMatrix.length - 1; snd++)
                {            
                    if( numCoeffMatrix[snd].numPow < numCoeffMatrix[snd + 1].numPow)
                    {
                        temp = numCoeffMatrix[snd];
                        numCoeffMatrix[snd] = numCoeffMatrix[snd + 1];
                        numCoeffMatrix[snd + 1] = temp;
                    }
                }
            }
        }
        cnt++;
    }
    for(var i = 0; i < quotientMatrix.length; i++)
    {
        if(quotientMatrix[i].coeff == 0 && quotientMatrix[i].qPow == 0)
        {
            quotientMatrix.splice(i, 1);
        }
    }


    document.getElementById('divide').style.display = "none";
    document.getElementById('answer').style.display = "block";
    document.getElementById('r').style.display = "none";
    var Q = "= ";
    var rNum = "";
    var rDen = "";
    // Quotient
    for(var i = 0; i < quotientMatrix.length; i++)
    {
        if(quotientMatrix[i].coeff > 0 && i != 0)
        {
            Q += '+';
        }
        if(quotientMatrix[i].coeff == -1)
        {
            Q += '-';
        }
        if(Math.abs(quotientMatrix[i].coeff) != 1 || (Math.abs(quotientMatrix[i].coeff) == 1 && quotientMatrix[i].qPow == 0))
        {
            Q += `${quotientMatrix[i].coeff}`;
        }
        if(quotientMatrix[i].qPow > 1)
        {
            Q += `x^${quotientMatrix[i].qPow}`;
        }
        else if(quotientMatrix[i].qPow == 1)
        {
            Q += `x`;
        }
        document.getElementById('qnt').innerHTML = Q;
    }
    // Remainder
    if(numCoeffMatrix.length != 0)
    {
        for(var i = 0; i < numCoeffMatrix.length; i++)
        {
            if(numCoeffMatrix[i].numCoeff > 0 && i != 0)
            {
                rNum += '+';
            }
            if(numCoeffMatrix[i].numCoeff == -1)
            {
                rNum += '-';
            }
            if(Math.abs(numCoeffMatrix[i].numCoeff) != 1 || (Math.abs(numCoeffMatrix[i].numCoeff) == 1 && numCoeffMatrix[i].numPow == 0))
            {
                rNum += `${numCoeffMatrix[i].numCoeff}`;
            }
            if(numCoeffMatrix[i].numPow > 1)
            {
                rNum += `x^${numCoeffMatrix[i].numPow}`;
            }
            else if(numCoeffMatrix[i].numPow == 1)
            {
                rNum += `x`;
            }
        }
        for(var i = 0; i < denCoeffMatrix.length; i++)
        {
            if(denCoeffMatrix[i].denCoeff > 0 && i != 0)
            {
                rDen += '+';
            }
            if(denCoeffMatrix[i].denCoeff == -1)
            {
                rDen += '-';
            }
            if(Math.abs(denCoeffMatrix[i].denCoeff) != 1 || (Math.abs(denCoeffMatrix[i].denCoeff) == 1 && denCoeffMatrix[i].denPow == 0))
            {
                rDen += `${denCoeffMatrix[i].denCoeff}`;
            }
            if(denCoeffMatrix[i].denPow > 1)
            {
                rDen += `x^${denCoeffMatrix[i].denPow}`;
            }
            else if(denCoeffMatrix[i].denPow == 1)
            {
                rDen += `x`;
            }
        }
        Q += " +";
        document.getElementById('qnt').innerHTML = Q;
        document.getElementById('rnum').value = rNum;
        document.getElementById('rden').value = rDen;
        document.getElementById('r').style.display = "block";
        document.getElementById('l').style.display = "block";
    }
    document.getElementById('clr').style.display = "block";
    document.getElementById('frac').style = "margin:0px;";
}

function clr(){
    location.reload()
}