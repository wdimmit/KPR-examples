/*
import TRANSITION from 'transitions';

/* Skins and styles */

let hugeLabelStyle = new Style({ color: 'black', font: 'bold 125px', horizontal: 'center', vertical: 'middle' });

/* UI templates */
class MainScreenBehavior extends Behavior {
            case 11:
                container.run( new TRANSITION.Reveal({ direction: "left", easeType: "sineEaseOut", duration: 800 }), container.last, toScreen );
            case 12:
                container.run( new TRANSITION.Reveal({ direction: "right", duration: 800 }), container.last, toScreen );
            case 13:
                container.run( new TRANSITION.Hide({ direction: "up", easeType: "sineEaseOut",duration: 800 }), container.last, toScreen );
            case 14:
                container.run( new TRANSITION.Hide({ direction: "right", easeType: "backEaseIn", duration: 800 }), container.last, toScreen );
            case 15:
                container.run( new TRANSITION.ZoomAndSlide({ direction: "forward", duration: 500 }), container.last, toScreen );
            case 16:
                container.run( new TRANSITION.ZoomAndSlide({ direction: "back", easeType: "bounceEaseOut", duration: 700 }), container.last, toScreen );

let MainScreen = Container.template($ =>({ 
	left: 0, right: 0, top: 0, bottom: 0, active: true, skin: blackSkin, 
	Behavior: MainScreenBehavior, 
	contents: [
			left: 0, right: 0, height: 40, bottom: 0, 
			active: true, skin: whiteSkin, 
			Behavior: class extends Behavior {
				onTouchBegan(container, id, x, y, ticks) {
			}, 
			contents: [
		})
}));
	left: 0, right: 0, top: 0, bottom: 40, skin: blueSkin, 
	contents: [
}));
	left: 0, right: 0, top: 0, bottom: 40, skin: yellowSkin, 
	contents: [
}));
/* Application set-up */
let mainScreen = new MainScreen({});

class AppBehavior extends Behavior {
	onLaunch(application) {
		application.add( mainScreen );
	}
}	
application.behavior = new AppBehavior();	