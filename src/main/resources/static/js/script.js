$(document).ready(function(){
		size = document.getElementById('size').value
		if(size != null && size != ""){
			document.getElementById('size_txt').innerText = "size: "+size+" x "+size
			genBoard(size)
		}
	})

	function genBoard(n){
		var board = document.getElementById('board')
		var x = new Array(n)
		var origin = window.location.origin
		//n = document.getElementById('N').value
		
		board.innerHTML = ""
		document.getElementById('size_txt').innerText = "size: "+n+" x "+n
		for(i=0; i<n; i++){
			x[i] = new Array(n)
			for(j=0; j<n; j++){
				x[i][j] = 0;
			}
		}
		for(i=0;i<n;i++){
			var br = document.createElement("br")
			for(j=0;j<n;j++){
				var a = document.createElement("a")
				
				a.id = x[i][j]+'_'+i+'_'+j
				a.style.fontSize = "100%"
				a.style.position = "relative"
				a.style.width = (100/n)+"%"
				a.style.height = (80/n)+"%"
				a.style.display = "inline-block"
				
				board.appendChild(a)
			}
			board.appendChild(br)
		}

		$('a').addClass('enable')
		
		$.ajax({
	  	      url: origin + "/listajax",
	  	    })
	  	    .done(function( data ) {
	  	    	$.each( data, function(key,val) {
	  	    		x[val.positionx][val.positiony] = val.player
		  	    	if(val.player == 1){
		  	    		$('#0_'+val.positionx+'_'+val.positiony)
		  	    			.html("<img class='Oimg'></img>")
		  	    			.removeClass('enable')
		  	    		
	  	    			document.getElementById('0_'+val.positionx+'_'+val.positiony).id= '1_'+val.positionx+'_'+val.positiony
		  	    		
		  	    	}
	  	    		if(val.player == -1){
	  	    			$('#0_'+val.positionx+'_'+val.positiony)
	  	    				.html("<img class='Ximg'></img>")
	  	    				.removeClass('enable')
	  	    			
	  		  	    	document.getElementById('0_'+val.positionx+'_'+val.positiony).id= '1_'+val.positionx+'_'+val.positiony
	  	    			
	  	    		}	  	    		
	  	    	});
	  	    	winnerCheck(x)
	  	    	console.log(x)
	  	    	for(i=0;i<n;i++){
					for(j=0;j<n;j++){
						if(x[i][j] == 0){
							//console.log(document.getElementById('0_'+i+'_'+j))
							document.getElementById('0_'+i+'_'+j).onclick = function(){
							
								split = this.id.split("_")
								if(split[0] == 0 && $(this).hasClass('enable')){
									this.setAttribute("href","/read/"+n+"/"+split[1]+"/"+split[2])
								}
							}
						}
						
					}
	  	    	}
	  	     });
		
	}
	
	function winnerCheck(arr){
		n = arr.length
		checkdown = 0
		checkup = 0
		checkdraw = 0
		
		for(var i = 0; i<n;i++){
	        var rowSum = 0;
	        var colSum = 0;
	        for(var j = 0; j<n;j++){
	            rowSum += arr[i][j];
	            colSum += arr[j][i];
	            if(arr[i][j] != 0) checkdraw +=1
	        }
	        checkdown += arr[i][i]
	    	checkup += arr[n-i-1][i]
	        
	        if(checkdown === n || checkup === n || rowSum === n || colSum === n){
		        alert("O WIN!");
	        	$("a").removeClass("enable");
	        }
		    if(checkdown === -n || checkup === -n || rowSum === -n || colSum === -n){
		    	alert("X WIN!");
	        	$("a").removeClass("enable");
		    }
	    	if(checkdraw == n*n){
	    		alert("Draw!");
	    		$("a").removeClass("enable");
	    	}
	    }
		
	    
	}
	
	function restart(){
		window.location = window.location.origin+'/clear'//+document.getElementById('size').value
	}
	
	function mainmenu(){
		window.location = window.location.origin
	}
	
	function replay(){
		var board = document.getElementById('board')
		n = document.getElementById('size').value
		turnCount = 0
		var x = new Array(n)
		var origin = window.location.origin
		//n = document.getElementById('N').value
		
		board.innerHTML = ""
		document.getElementById('size_txt').innerText = "size: "+n+" x "+n
		for(i=0; i<n; i++){
			x[i] = new Array(n)
			for(j=0; j<n; j++){
				x[i][j] = 0;
			}
		}
		for(i=0;i<n;i++){
				var br = document.createElement("br")
				for(j=0;j<n;j++){
					var a = document.createElement("a")
					
					a.id = x[i][j]+'_'+i+'_'+j
					a.style.position = "relative"
					a.style.width = (100/n)+"%"
					a.style.height = (80/n)+"%"
					a.style.display = "inline-block"
					
					board.appendChild(a)
				}
				board.appendChild(br)
			}
		
		var interval = setInterval(function(){
			if(turnCount > document.getElementById('turnCount').value){
				clearInterval(interval)
				turnCount = document.getElementById('turnCount').value
				genBoard(document.getElementById('size').value)
			}
			else{
				$.ajax({
			  	      url: origin + "/listajax",
			  	    })
			  	    .done(function( data ) {
			  	    	$.each( data, function(key,val) {
			  	    		if(turnCount == val.turn){
			  	    			x[val.positionx][val.positiony] = val.player
				  	    		if(val.player == 1){
				  	    			document.getElementById('0_'+val.positionx+'_'+val.positiony).innerHTML="<img class='Oimg'></img>"
				  	    		}
			  	    			if(val.player == -1){
			  	    				document.getElementById('0_'+val.positionx+'_'+val.positiony).innerHTML="<img class='Ximg'></img>"
			  	    			}
			  	    		}
			  	    	});
			  	    	
			  	     });
				//console.log(turnCount)
				turnCount+=1;
			}
		}, 1000);
	
	}