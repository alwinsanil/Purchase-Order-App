﻿import { jsPDF } from "jspdf"
var callAddFont = function () {
this.addFileToVFS('ARIAL-bold.ttf', font);
this.addFont('ARIAL-bold.ttf', 'ARIAL', 'bold');
};
jsPDF.API.events.push(['addFonts', callAddFont])