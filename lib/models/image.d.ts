export interface Config {
    fit: Boolean;
    crop: Boolean;
    zoom: Number;
    rotate: Number;
    apply: Boolean;
}
export interface ControlBox {
    allText: string;
    metaTitle: string;
    config: Config;
}
export interface ImageModel {
    editMode: Boolean;
    fileName: string;
    controlBox: ControlBox;
    uploadedImage: string;
    croppedImage: string;
}
