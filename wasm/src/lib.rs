extern crate wasm_bindgen;
extern crate js_sys;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern {
    pub fn emitBareImport(start: i32, end: i32, module: &str);
    pub fn emitImport(start: i32, end: i32, name: &str, asName: &str, module: &str);
    pub fn emitExport(start: i32, end: i32, name: &str, asName: &str);
    pub fn emitExportFrom(start: i32, end: i32, name: &str, asName: &str);
}

#[wasm_bindgen]
pub fn parse(code: &str) {
    emitBareImport(1, 25, "foo");
}
