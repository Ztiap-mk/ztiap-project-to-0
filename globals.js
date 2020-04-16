var pozadie;
var obrazok_sliepky;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 600;
var timer = 120;
var Hrac={
    skore : 0,
    naboje: 10,
}
var state;
var sliepky=[];
var casovac_f;
var animacia_sliepok_casovac;