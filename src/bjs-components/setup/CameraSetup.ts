import * as BABYLON from 'babylonjs';




function CameraSetup(scene:any,stage:any){
    // camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, new BABYLON.Vector3(0, 1.4, 0), scene);
    let camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, new BABYLON.Vector3(0, 6.8, 0), scene);
    //
    camera.attachControl(stage, false);
    camera.inertia = 0.9;
    camera.angularSensibilityX = 1000;
    camera.angularSensibilityY = 1000;
    camera.panningSensibility = 4000;
    camera.pinchDeltaPercentage = 0.01;
    camera.wheelDeltaPercentage = 0.01;
    camera.speed = 0.1;
    camera.lowerRadiusLimit = 2;
    camera.upperRadiusLimit = 8;
    camera.minZ = 0.1 // this controls the disappering issue of camera
    // camera.targetScreenOffset.x = 0;
    camera.wheelPrecision = 1; //Mouse wheel speed
    camera.upperBetaLimit=2;

    
    // Positions the camera overwriting alpha, beta, radius
    // In sandbox the alpha, beta, radius (1.57,1.57,1.8) or (PI/2,PI/2,1.8)
    camera.setPosition(new BABYLON.Vector3(0,8,7));
    // camera.setPosition(new BABYLON.Vector3(0,1.6,1.3));
   
    // console.log(camera._position)

  

   
   

};

export default CameraSetup;