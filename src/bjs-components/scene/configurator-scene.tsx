import { Color4, MeshAssetTask, Vector3 } from "@babylonjs/core";
import "@babylonjs/inspector";
import { sceneFragmentDeclaration } from "babylonjs/Shaders/ShadersInclude/sceneFragmentDeclaration";
import axios from "axios";
import React, {
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AssetManagerContext,
  AssetManagerContextProvider,
  Engine,
  Scene,
  Task,
  TaskType,
  useAssetManager,
  useBeforeRender,
  useScene,
} from "react-babylonjs";
import {
  acMatOver,
  acMatUpdate,
  acMeshMatUpdate,
} from "../actions/materials/mat-action";
import { AssetManagerFallback } from "../scene/AssetLoader";
import EnvironmentSetup from "../setup/EnvironmentSetup";

import "../../App.css";
import { MeshLoader } from "./MeshLoader";
import { useSelector } from "react-redux";

export const ConfiguratorScene = () => {
    const meshTaskLoader =useSelector((state :any)=> state.customizeState._meshTaskLoader)
    const BackColor=()=>{
        let scene =useScene()
        scene!.clearColor = new Color4(0, 0, 0, 0);
        return null
    }
  return (
    <React.Fragment>
      {/* <button style={{backgroundColor:"red", height:50, width:100}} onClick={getData}> GET MAT</button> */}
      <Engine antialias adaptToDeviceRatio canvasId="my-canvas">
        <Scene>
          {/* <EnvironmentSetup/> */}
          {/* <DebugLayer/> */}
          < BackColor/>

          <arcRotateCamera
            name="camera1"
            alpha={Math.PI / 2}
            beta={Math.PI / 2.2}
            radius={7}
            target={new Vector3(0, 6.8, 0)}
            minZ={0.1}
            lowerRadiusLimit={2}
            upperRadiusLimit={8}
            inertia={0.9}
            angularSensibilityX={1000}
            angularSensibilityY={1000}
            panningSensibility={4000}
            pinchDeltaPercentage={0.01}
            wheelDeltaPercentage={0.01}
            wheelPrecision={1}
            upperBetaLimit={2}
            speed={0.1}
            noPreventDefault={false}
          />
          <hemisphericLight
            name="light1"
            intensity={0.7}
            direction={Vector3.Up()}
          />
          <AssetManagerContextProvider>
            <Suspense
              fallback={
                <AssetManagerFallback
                  barColor="#666666"
                  textColor="white"
                  totalControls={2}
                  loadState={{
                    loadCount: 0,
                    meshCount: 0,
                    loaded: false,
                  }}
                />
              }
            >
            {Object.keys(meshTaskLoader).map(function (key:string, index:number) {
              if (meshTaskLoader[key][0] !== undefined) {

                return (
                  <MeshLoader jpMeshTaskLoader={meshTaskLoader[key]} key={index}/>
                );
              }

            })}
            </Suspense>
          </AssetManagerContextProvider>
        </Scene>
      </Engine>
    </React.Fragment>
  );
};
