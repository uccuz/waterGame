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
* @param x_col
* @default 0.5
*
*
* @param y_col
* @default 0.5
*/
//=======================================

	
var shooting = PluginManager.parameters('shooting');
 
var bulletId = Number( shooting['bulletId'] || 1 );
var enemy = String( shooting['enemy'] || 'enemy' );
var x_col = Number( shooting['x_col'] || 0.5 );
var y_col = Number( shooting['y_col'] || 0.5 );



function checkShot(){
	for (index in $gameMap._events){
		if($dataMap.events[index].note == enemy){
			
			var id = $gameMap._events[index]._eventId;
			var enemy_x  = $gameMap._events[index]._realX;
			var enemy_y  = $gameMap._events[index]._realY;
			var bullet_x = $gameMap._events[bulletId]._realX;
			var bullet_y = $gameMap._events[bulletId]._realY;
			if(Math.abs(bullet_x-enemy_x)<=x_col){
				if(Math.abs(bullet_y-enemy_y)<=y_col){
					$gameMap.event(bulletId).setPosition(16,77);
					console.log($gameMap._mapId);
					$gameSelfSwitches.setValue([$gameMap._mapId,index,'A'], true);
					$gameParty.gainGold(-50);
				}
			}
		}
	}
}




/*function checkShot(){
	for (index in $gameMap._events){
		if($dataMap.events[index].note == enemy){
			var id = $gameMap._events[index]._eventId;
			var x = $gameMap._events[index]._x;
            var y = $gameMap._events[index]._y;
			if( x == $gameMap._events[bulletId]._x && y == $gameMap._events[bulletId]._y ){
                $gameMap.event(bulletId).setPosition(16,77);
                console.log($gameMap._mapId);
                $gameSelfSwitches.setValue([$gameMap._mapId,index,'A'], true);
                $gameParty.gainGold(-50);
			}
		}
	}
}*/


if($gameVariables.value(16)<3){
	$gameVariables.setValue(16,($gameVariables.value(16)+1));
	console.log($gameVariables.value(16));
}
