//=======================================
/*:
* @plugindesc Detect shooting action 
* @author cu
*
* @help Detect shooting action
*
* @param bulletId
* @default 1 
*
* @param enemy
* @default enemy
*
*
*/
//=======================================

	
var shooting = PluginManager.parameters('shooting');
 
var bulletId = Number( shooting['bulletId'] || 1 );
var enemy = String( shooting['enemy'] || 'enemy' );


function checkShot(){
	for (index in $gameMap._events){
		if($dataMap.events[index].note == enemy){
			var id = $gameMap._events[index]._eventId;
			var x = $gameMap._events[index]._x;
            var y = $gameMap._events[index]._y;
			if( x == $gameMap._events[bulletId]._x && y == $gameMap._events[bulletId]._y ){
                $gameMap.event(bulletId).setPosition(16,77);
                $gameSelfSwitches.setValue([$gameMap._mapId,index,'A'], true);
			}
		}
	}
}

function setGameSwitchFalse(mapId){
    for (index in $gameMap._events){
		if($dataMap.events[index].note == enemy){
            var id = $gameMap._events[index]._eventId;
            $gameSelfSwitches.setValue([mapId,index,'A'], false);
		}
	}
}

function checkSwitchOpen(num){
    var sum = 0 ;
    for (index in $gameMap._events){
		if($dataMap.events[index].note == enemy){
            var id = $gameMap._events[index]._eventId;     
            if($gameSelfSwitches.value($gameMap._mapId+','+id+',A')){
                sum ++;
            }
		}
    }
    if(sum == num){
        return true;
    }
    else
        return false;
}


if(checkSwitchOpen(1)){
    $gameSwitches.setValue(148,false);
    $gameSwitches.setValue(149,true);
}