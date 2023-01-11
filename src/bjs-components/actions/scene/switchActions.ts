
export enum assetSwitchState{
  DISABLED_MODE_NEW='new',
  DISABLED_MODE_OLD='old'
}

//Why? 
export const saMeshLoaded=(scene:any)=>{
 let sceneNodes =scene.rootNodes;


 for (let i = 0; i <  sceneNodes.length; i++) {
  if (sceneNodes[i].getClassName()==='Mesh' && sceneNodes[i].name.includes('L') || sceneNodes[i].name.includes('A')) {
    console.log(sceneNodes[i].name)
  }
  

  
}



}


/**
 * Switch Action Scene Setter
 * SA-BJS-V10
 * @param scene
 * @param disableList 
 * @param disablePart 
 * @param currPart 
 * Function:
    * Disable previous part selection
    * Enable current part selection
 */


export const saSceneSetter=(scene:any,disableList:string[],disablePart:any,currPart:string)=>{
  const sceneNodes =scene.rootNodes;

  // Utility : Index Finder by name
  const indexFinder=(partName:string) => {
   const isPartEqual =(part) => part.name ===partName
   let a= sceneNodes.findIndex(isPartEqual)
   console.log("indexFinder: ", a)
   return a
  }


  try{
    // Check the Disable
    if(disablePart.flag){
      console.log("disable Name:",disablePart.name)
      let index =indexFinder(disablePart.name)
      if(index !=-1){
        sceneNodes[indexFinder(disablePart.name)].setEnabled(false)
      }
      
    }
      
    // Check the DisableList to Enable
    if (disableList.length !== 0 && disablePart.mode === assetSwitchState.DISABLED_MODE_OLD){
      console.log("curPart enable:",currPart)
      sceneNodes[indexFinder(currPart)].setEnabled(true)
    }
   
  }
  catch(e){
    alert("error in saSceneSetter");  
  }
}