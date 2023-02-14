function setActionJsonPref() {
    return [
        {"_obj":"set","_target":[{"_property":"generalPreferences","_ref":"property"},{"_ref":"application"}],"to":{"_obj":"generalPreferences","placeRasterSmartObject":false}}
    ]
}

function setActionJsonMask() {
    return [
        {"ID":18,"_obj":"placeEvent","freeTransformCenterState":{"_enum":"quadCenterState","_value":"QCSAverage"},"null":{"_kind":"local","_path":"PEGASUS_ACTION_JSON_OPTIONS_ADDITIONAL_IMAGES_0"},"offset":{"_obj":"offset","horizontal":{"_unit":"pixelsUnit","_value":0.0},"vertical":{"_unit":"pixelsUnit","_value":0.0}}},
        {"_obj":"set","_target":[{"_property":"selection","_ref":"channel"}],"to":{"_enum":"ordinal","_value":"allEnum"}},
        {"_obj":"copyEvent"},
        {"_obj":"delete","_target":[{"_enum":"ordinal","_ref":"layer"}],"layerID":[18]},
        {"_obj":"make","at":{"_enum":"channel","_ref":"channel","_value":"mask"},"new":{"_class":"channel"},"using":{"_enum":"userMaskEnabled","_value":"revealSelection"}},
        {"_obj":"select","_target":[{"_enum":"ordinal","_ref":"channel"}],"makeVisible":true},
        {"_obj":"paste","antiAlias":{"_enum":"antiAliasType","_value":"antiAliasNone"},"as":{"_class":"pixel"}}
    ]
}

function setActionJsonCanvasSize(width, height, horizontal, vertical) {
    return [
        {"_obj":"canvasSize","height":{"_unit":"pixelsUnit","_value":height},"horizontal":{"_enum":"horizontalLocation","_value":horizontal},"vertical":{"_enum":"verticalLocation","_value":vertical},"width":{"_unit":"pixelsUnit","_value":width}}
    ]
}

function setSelectLayer() {
    return [
        {"_obj":"select","_target":[{"_enum":"channel","_ref":"channel","_value":"RGB"}],"makeVisible":false}
    ]
}

function setAutoTone() {
    return [
        {"_obj":"levels","auto":true}
    ]
}

function setAutoContrast() {
    return [
        {"_obj":"levels","autoContrast":true}
    ]
}

function setAutoColor() {
    return [
        {"_obj":"levels","autoBlackWhite":true,"autoNeutrals":true}
    ]
}

module.exports = {
    setActionJsonPref,
    setActionJsonMask,
    setActionJsonCanvasSize,
    setSelectLayer,
    setAutoTone,
    setAutoContrast,
    setAutoColor
}