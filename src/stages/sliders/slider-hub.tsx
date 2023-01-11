import React from 'react'
import { useSelector } from 'react-redux'
import { AssetSlider } from './asset-slider'
import { MaterialSlider } from './material-slider'
import { ColorSlider } from './color-slider'


function SliderHub() {

const {is_style,is_material,is_color,is_artwork} =useSelector((state: any) => state.customizeState._stageFlags)
  return (
    <>{is_style && <AssetSlider/>}
    {is_material && <MaterialSlider/>}
    {is_color && <ColorSlider/>}
    </>
  )
}

export default SliderHub