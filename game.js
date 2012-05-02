// Copied from the talk
// TODO: support code so it can be tested

var GamePlayer = new Class({

	Extends: GameObject,

	initialize: function () {
		this.x = 0;
		this.y = -1;
		this.yVelocity = 0;
		this.jumping = false;
		this.running = false;
		this.facingLeft = false;
	},

	tick: function (dt, commands) {
		var oldX = this.x;
	
		if (commands.left) {
			this.x -= 8 * dt;
		}
		if (commands.right) {
			this.x += 8 * dt;
		}
	
		if (commands.up && !this.jumping) {
			this.yVelocity = -25;
		}
	
		this.yVelocity += 100 * dt;
		this.y += this.yVelocity * dt;
	
		var hitInfo = this.hitTest();
	
		this.jumping = (hitInfo.bumpedY >= this.y);
		if (hitInfo.bumpedY != this.Y) {
			this.yVelocity = 0;
		}
	
		this.x = hitInfo.bumpedX;
		this.y = hitInfo.bumpedY;
	
		this.running = (this.x != oldX) && !this.jumping;
		this.facingLeft = (this.x < oldX) || (this.x == oldX && ...?)
	
		if (hitInfo.hitObject) {
			this.yVelocity = -24;
			hitInfo.hitObject.stomp();
		}
	
		if (this.y > 45 || this.y < -40) {
			this.initialize();
		}
	}
});

//=====================================================
//
//	GameEnemy
	
var GameEnemy = new Class({
	
	Extends: GameObject,
	
	initialize: function () {
		this.x = 5;
		this.y = 14;
		this.direction = -1;
		this.stompTime = 0;
	},
	
	tick: function (dt, commands) {
		var isStomped = (this.stompTime > 0);
		if (isStomped) { this.stompTime -= dt; }
		
		if (!isStomped) {
			this.x += this.direction * dt * 0.9;
		}	
			
		if (this.x < 4.0) { this.direction =  1; }
		if (this.x > 5.0) { this.direction = -1; }
	},
	
	stomp: function () {
		this.stompTime = 2.0;
	}

});