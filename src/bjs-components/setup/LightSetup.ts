import * as BABYLON from 'babylonjs';





function LightSetup(scene:any){
    

    let light2 = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -20, 6), scene);
    light2.diffuse = new BABYLON.Color3(0.5, 0.5, 0.5);
    light2.intensity = 2;
    light2.specular = new BABYLON.Color3(0.5, 0.5, 0.5);

     let light3 = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(-10, 0, 0), scene);
    light3.diffuse = new BABYLON.Color3(0.5, 0.5, 0.5);
    light3.intensity = 0.8;
    light3.specular = new BABYLON.Color3(0.7, 0.7, 0.7);

    let light4 = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(10, 0, 0), scene);
    light4.diffuse = new BABYLON.Color3(0.6, 0.6, 0.6);
    light4.intensity = 0.8;
    light4.specular = new BABYLON.Color3(0.7, 0.7, 0.7);


    let light5 = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, 0, -10), scene);
    light5.diffuse = new BABYLON.Color3(0.6, 0.6, 0.6);
    light5.intensity = 1;
    light5.specular = new BABYLON.Color3(0.7, 0.7, 0.7);

    return light2;

};

export default LightSetup;