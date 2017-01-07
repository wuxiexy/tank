	// tank color
	var heroColor=new Array("#DED284","#C75050","#EDDB12");


	// tank 类
	function Tank(x,y,direct,color){
		this.x=x;         		// x轴
		this.y=y;       		// y轴
		this.speed=2;   		// 速度
		this.direct=direct;     // 方向
		this.color=color;       // 颜色

		this.moveUp=function(){
			if(tank.y <= 1){
				tank.y = 1 ;
				return;
			}
			tank.y-=this.speed;
			this.direct=0;              //向上
		}
		this.moveDown=function(){
			if(tank.y >= 369){
				tank.y = 369 ;
				return ;
			}
			tank.y+=this.speed;
			this.direct=1;           		//向下
		}
		this.moveLeft=function(){
			if(tank.x <= 1){
				tank.x = 1 ;
				return ;
			}
			tank.x-=this.speed ;
			this.direct=2 ;           		//向左
		}
		this.moveRight=function(){
			if(tank.x >= 469){
				tank.x = 469 ;
				return ;
			}
			tank.x+=this.speed ;
			this.direct=3 ;           		//向右
		}
	}


	// 子弹类
	function Bullet(x,y,direct,speed){
		this.x=x;
		this.y=y;
		this.speed=speed;     // 速度
		this.direct=direct;   // 方向
		this.timer=null;
		this.isLive=true;     // 用于判定子弹是否出界

		this.run=function(){
			if(this.x<0 || this.x>=500 || this.y<0 || this.y>=400){
				// 子弹要停止
				window.clearInterval(this.timer);
				this.isLive=false;
			}else{
				switch(this.direct){
					case 0:    // 向上
						this.y-=this.speed;
						break;
					case 1:    // 向下
						this.y+=this.speed;
						break;
					case 2:    // 向左
						this.x-=this.speed;
						break;
					case 3:    // 向右
						this.x+=this.speed;
						break;
				}
				document.getElementById("aa").innerText="子弹x="+this.x+"子弹y="+this.y;
			}
		}
	}



	function Hero(x,y,direct,color){
		this.tank=Tank;
		this.tank(x,y,direct,color);

		this.shotEnemy=function(){
			switch(this.direct){
				case 0:   // 向上
					heroBullet=new Bullet(this.x+11,this.y,this.direct,1);
					break;
				case 1:   // 向下
					heroBullet=new Bullet(this.x+11,this.y+30,this.direct,1);
					break;
				case 2:   // 向左
					heroBullet=new Bullet(this.x,this.y+11,this.direct,1);
					break;
				case 3:   // 向右
					heroBullet=new Bullet(this.x+30,this.y+11,this.direct,1);
					break;
			}

			heroBullets.push(heroBullet);

			var timer=window.setInterval("heroBullets["+(heroBullets.length-1)+"].run()",50);

			heroBullets[heroBullets.length-1].timer=timer;
		}
	}


	// EnemyTank 类
	function EnemyTank(x,y,direct,color){
		this.tank=Tank;
		this.tank(x,y,direct,color);
	}


	// 画出子弹
	function drawHeroBullet(){
		// 所有子弹
		for( var i=0; i<heroBullets.length; i++){
			var heroBullet=heroBullets[i];                     // 取出子弹
			if(heroBullet!=null && heroBullet.isLive){         // heroBullet.isLive  -->>  控制子弹不能出界
				cxt.fillStyle="#FCF208";
				cxt.fillRect(heroBullet.x,heroBullet.y,2,2);
			}
		}
	}


	// 此函数用于画出坦克
	function drawTank(tank){
		switch(tank.direct){
			case 0:   //上
			case 1:   //下
				cxt.fillStyle="#DED284";
				cxt.fillRect(tank.x,tank.y,6,30);              // 左轮
				cxt.fillRect(tank.x+18,tank.y,6,30);	       // 右轮
				cxt.fillRect(tank.x+7,tank.y+6,10,18);		   // 车身

				cxt.fillStyle="#C75050";
				cxt.arc(tank.x+12,tank.y+15,4,0,360,false);    // 盖子
				cxt.fill();    								   // 填充

				// 炮筒
				cxt.beginPath();
				cxt.strokeStyle="#EDDB12";
				cxt.lineWidth=3;
				cxt.moveTo(tank.x+12,tank.y+15);    	       // 起点

				// 判断炮筒上下
				if(tank.direct==0){
					cxt.lineTo(tank.x+12,tank.y);    	       // 终点
				}else if(tank.direct==1){
					cxt.lineTo(tank.x+12,tank.y+30);           // 终点
				}
				cxt.closePath();
				cxt.stroke();                                  // 画出
				break;


			case 2:   //左
			case 3:   //右
				cxt.fillStyle="#DED284";
				cxt.fillRect(tank.x,tank.y,30,6);              // 上边轮子
				cxt.fillRect(tank.x,tank.y+18,30,6);	       // 下边轮子
				cxt.fillRect(tank.x+6,tank.y+7,18,10);	       // 中间车身

				cxt.fillStyle="#C75050";
				cxt.arc(tank.x+15,tank.y+12,4,0,360,false);    // 坦克盖子
				cxt.fill();      //填充

				// 炮筒
				cxt.beginPath();                               // 开辟新的路径
				cxt.strokeStyle="#EDDB12";                     // 指定颜色
				cxt.lineWidth=3;                               // 指定炮筒宽度
				cxt.moveTo(tank.x+15,tank.y+12);               // 起点

				// 判断炮筒左右
				if(tank.direct==2){
					cxt.lineTo(tank.x,tank.y+12);              // 方向左  直线终点
				}else if(tank.direct==3){
					cxt.lineTo(tank.x+30,tank.y+12);           // 方向右  直线终点
				}
				cxt.closePath();
				cxt.stroke();
				break;
		}
	}