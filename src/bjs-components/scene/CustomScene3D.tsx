import React, { Suspense, useEffect, useState } from "react";
import { Color4, Scene } from "@babylonjs/core";
import SceneComponent, { useScene } from "babylonjs-hook"; // if you install 'babylonjs-hook' NPM.
import "@babylonjs/loaders";
import "@babylonjs/loaders/glTF";
import CameraSetup from "../setup/CameraSetup";
import EnvironmentSetup from "../setup/EnvironmentSetup";
import LightSetup from "../setup/LightSetup";
import { PBRMat } from "../setup/PBRmat";
import { AssetManagerContextProvider } from "react-babylonjs";
import { AssetManagerFallback } from "./AssetLoader";
import { MeshLoader } from "./MeshLoader";
import { MyFallback } from "../manager/manager";

let sceneSettings = {
  name: "environment",
  url: "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/SceneSettings/environment.env",
};

let matDefault = {
  panel: {
    mId: "mtl-ch-blk-s1",
    mName: "Cowhide Leather",
    mColor: "Black",
    mType: "panel",
    mMaps: {
      baseColor:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/Materials/Leather/mtl-ch-blk-s1/baseColor.png",
      normal:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/Materials/Leather/mtl-ch-blk-s1/normal.png",
      occlusion:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/Materials/Leather/mtl-ch-blk-s1/occlusionRoughnessMetallic.png",
    },
  },
  panel_sl: {
    mId: "mtl-ch-blk-s1",
    mName: "Cowhide Leather",
    mColor: "Black",
    mType: "panel",
    mMaps: {
      baseColor:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/Materials/Leather/mtl-ch-blk-s1/baseColor.png",
      normal:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/Materials/Leather/mtl-ch-blk-s1/normal.png",
      occlusion:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/Materials/Leather/mtl-ch-blk-s1/occlusionRoughnessMetallic.png",
    },
  },
  panel_sr: {
    mId: "mtl-ch-blk-s1",
    mName: "Cowhide Leather",
    mColor: "Black",
    mType: "panel",
    mMaps: {
      baseColor:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/Materials/Leather/mtl-ch-blk-s1/baseColor.png",
      normal:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/Materials/Leather/mtl-ch-blk-s1/normal.png",
      occlusion:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/Materials/Leather/mtl-ch-blk-s1/occlusionRoughnessMetallic.png",
    },
  },
  panel_trm: {
    mId: "mtl-ch-blk-s1",
    mName: "Cowhide Leather",
    mColor: "Black",
    mType: "panel",
    mMaps: {
      baseColor:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/Materials/Leather/mtl-ch-blk-s1/baseColor.png",
      normal:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/Materials/Leather/mtl-ch-blk-s1/normal.png",
      occlusion:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/Materials/Leather/mtl-ch-blk-s1/occlusionRoughnessMetallic.png",
    },
  },
  panel_pad: {
    mId: "mtl-ch-blk-s1",
    mName: "Cowhide Leather",
    mColor: "Black",
    mType: "panel",
    mMaps: {
      baseColor:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/Materials/Leather/mtl-ch-blk-s1/baseColor.png",
      normal:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/Materials/Leather/mtl-ch-blk-s1/normal.png",
      occlusion:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/Materials/Leather/mtl-ch-blk-s1/occlusionRoughnessMetallic.png",
    },
  },
  panel_logo: {
    mId: "mtl-ch-blk-s1",
    mName: "Cowhide Leather",
    mColor: "Black",
    mType: "panel",
    mMaps: {
      baseColor:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/Materials/Leather/mtl-ch-blk-s1/baseColor.png",
      normal:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/Materials/Leather/mtl-ch-blk-s1/normal.png",
      occlusion:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/Materials/Leather/mtl-ch-blk-s1/occlusionRoughnessMetallic.png",
    },
  },
  panel_zip: {
    mId: "mth-zpf-slv&blk-s1",
    mName: "Zipper Fabric",
    mColor: "Silver-Black",
    mType: "panel_zip",
    mMaps: {
      baseColor:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/Materials/Hardware/ZipperFabric/mth-zpf-slv%26blk-s1/panel-zip_baseColor.png",
      normal:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/Materials/Hardware/ZipperFabric/mth-zpf-slv%26blk-s1/panel-zip_normal.png",
      occlusion:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/Materials/Hardware/ZipperFabric/mth-zpf-slv%26blk-s1/panel-zip_occlusionRoughnessMetallic.png",
    },
  },
  panel_lin: {
    mId: "mtln-lp-blk-s1",
    mName: "Lining Fabric",
    mColor: "Black",
    mType: "panel_lin",
    mMaps: {
      baseColor:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/Materials/Lining/mtln-lp-blk-s1/panel-lin_baseColor.png",
      normal:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/Materials/Lining/mtln-lp-blk-s1/panel-lin_normal.png",
      occlusion:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/Materials/Lining/mtln-lp-blk-s1/panel-lin_occlusionRoughnessMetallic.png",
    },
  },
  stitch: {
    mId: "mts-st-blk-s1",
    mName: "Stitch Black",
    mColor: "Black",
    mType: "stitch",
    mMaps: {
      baseColor:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/Materials/Stitch/mts-st-blk-s1/stitch_baseColor.png",
      normal:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/Materials/Stitch/mts-st-blk-s1/stitch_normal.png",
      occlusion:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/Materials/Stitch/mts-st-blk-s1/stitch_occlusionRoughnessMetallic.png",
    },
  },
  metal_zip: {
    mId: "mth-zpp-slv-s1",
    mName: "Zipper Puller Silver",
    mColor: "Silver",
    mType: "metal_zip",
    mMaps: {
      baseColor:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/Materials/Hardware/ZipperPuller/mth-zpp-slv-s1/metal_baseColor.png",
      normal:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/Materials/Hardware/ZipperPuller/mth-zpp-slv-s1/metal_normal.png",
      occlusion:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/Materials/Hardware/ZipperPuller/mth-zpp-slv-s1/metal_occlusionRoughnessMetallic.png",
    },
  },
  metal_btn: {
    mId: "mth-zpp-slv-s1",
    mName: "Zipper Puller Silver",
    mColor: "Silver",
    mType: "metal_zip",
    mMaps: {
      baseColor:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/Materials/Hardware/ZipperPuller/mth-zpp-slv-s1/metal_baseColor.png",
      normal:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/Materials/Hardware/ZipperPuller/mth-zpp-slv-s1/metal_normal.png",
      occlusion:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/Materials/Hardware/ZipperPuller/mth-zpp-slv-s1/metal_occlusionRoughnessMetallic.png",
    },
  },
};

let meshTaskLoader = {
  front: [
    {
      taskType: "Mesh",
      rootUrl:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/JacketParts/Men/cr-parts/front/crm-fr-L1D1/",
      sceneFilename: "crm-fr-L1D1.glb",
      name: "crm-fr-L1D1",
    },
  ],
  back: [
    {
      taskType: "Mesh",
      rootUrl:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/JacketParts/Men/cr-parts/back/crm-bk-L1D1/",
      sceneFilename: "crm-bk-L1D1.glb",
      name: "crm-bk-L1D1",
    },
  ],
  collar: [
    {
      taskType: "Mesh",
      rootUrl:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/JacketParts/Men/cr-parts/collar/crm-clr-L1D1/",
      sceneFilename: "crm-clr-L1D1.glb",
      name: "crm-clr-L1D1",
    },
  ],
  sleeves: [
    {
      taskType: "Mesh",
      rootUrl:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/JacketParts/Men/cr-parts/sleeves/crm-sl-L1D1/",
      sceneFilename: "crm-sl-L1D1.glb",
      name: "crm-sl-L1D1",
    },
  ],
  closureZipper: [
    {
      taskType: "Mesh",
      rootUrl:
        "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/JacketParts/Men/cr-parts/closureZipper/crm-clz-L1D1/",
      sceneFilename: "crm-clz-L1D1.glb",
      name: "crm-clz-L1D1",
    },
  ],
  hem: [],
  waistPockets: [],
};

let loadState = {
  meshCount: 0,
  loadCount: 0,
  loaded: false,
};

export const CustomScene3D: React.FC<any> = () => {
  const onSceneReady = (scene: Scene) => {
    scene.clearColor = new Color4(0, 0, 0, 0);
    const canvas = scene.getEngine().getRenderingCanvas();
    scene.debugLayer.show({ embedMode: true });

    /*  Babylonjs Setups  **/

    const setCamera = () => {
      CameraSetup(scene, canvas);
    };

    const setEnvironment = () => {
      EnvironmentSetup(scene, sceneSettings);
    };

    const setLight = () => {
      LightSetup(scene);
    };

    const pbrMat = () => {
      PBRMat(scene, matDefault);
    };

    setCamera();
    setEnvironment();
    setLight();
    pbrMat();
  };

  return (
    <React.Fragment>
      <SceneComponent
        antialias
        onSceneReady={onSceneReady}
        id="my-canvas"
        renderChildrenWhenReady
      >
        <AssetManagerContextProvider>
          <Suspense
            fallback={
              // <AssetManagerFallback
              //   barColor="#666666"
              //   textColor="white"
              //   totalControls={2}
              //   loadState={loadState}
              // />
              <MyFallback/>
            }
          >
            {/* {Object.keys(meshTaskLoader).map(function (key:string, index) {
              if (meshTaskLoader[key][0] !== undefined) {

                return (
                  <MeshLoader jpMeshTaskLoader={meshTaskLoader[key]} />
                );
              }

            })} */}
            <MeshLoader jpMeshTaskLoader={meshTaskLoader["front"]} />
          </Suspense>
        </AssetManagerContextProvider>
      </SceneComponent>
    </React.Fragment>
  );
};
