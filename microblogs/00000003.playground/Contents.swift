import Foundation

print("running playground")

let pointsPerInchInPrint = 72.0  // units is inches
let _14PtFont = 14.0 // unit is pts
let heightOf14PointFontInPrint = _14PtFont / pointsPerInchInPrint


let diagDimensionOfMonitorInInches = 27.0

let monitorWidthInPixels = 1920.0
let monitorHeightInPixels = 1280.0

func findDiag(w:Double, h:Double)-> Double {
    //a^2 + b^2 = c^2
    //c = sqrt (a^2 + b^2)
    return sqrt((w*w) + (h*h))
}

let monitorDiagInPixelsFHD = findDiag(w:monitorWidthInPixels, h:monitorHeightInPixels)
let pixelsPerInchFHD = monitorDiagInPixelsFHD / diagDimensionOfMonitorInInches


let monitorWidthInPixelsUHD = 1920.0 * 2.0
let monitorHeightInPixelsUHD = 1280.0 * 2.0
let monitorDiagInPixelsUHD = findDiag(w:monitorWidthInPixelsUHD, h: monitorHeightInPixelsUHD)
let pixelsPerInchUHD = monitorDiagInPixelsUHD / diagDimensionOfMonitorInInches

let comfortablePixelsPerInchReadingTomSwiftAsAKid = pointsPerInchInPrint
let heightOfFontWhenReadingTomSwiftAsAKid = heightOf14PointFontInPrint

let scaleFactorIdentity = comfortablePixelsPerInchReadingTomSwiftAsAKid / comfortablePixelsPerInchReadingTomSwiftAsAKid
let scaleFactorFHD = comfortablePixelsPerInchReadingTomSwiftAsAKid / pixelsPerInchFHD
let scaleFactorUHD = comfortablePixelsPerInchReadingTomSwiftAsAKid / pixelsPerInchUHD
let scaleFactorCheck = pixelsPerInchFHD / pixelsPerInchUHD //ok

let heightOf14PtFontAtFHD = scaleFactorFHD * heightOf14PointFontInPrint
let difference = heightOf14PtFontAtFHD - heightOfFontWhenReadingTomSwiftAsAKid

let comfortablePixelsPerInchAtAge46 = 60.0
let scaleFactor46 = comfortablePixelsPerInchReadingTomSwiftAsAKid / comfortablePixelsPerInchAtAge46
let comfortableHeightOf14PtFontAtAge46 = scaleFactor46 * heightOf14PointFontInPrint
let differenceBetween1988And2024 = comfortableHeightOf14PtFontAtAge46 - heightOf14PtFontAtFHD
print(
"""
My eyes in 1988 were \(scaleFactor46) times
better than my eyes in 2024
""")

/*
 Prompt:
 If I was comfortable reading the Tom Swift books published in a 14pt print font
 at age 11 in 1988, and I need to run my monitor at 60ppi now to be comfortable reading a
 14 pt font, how much better were my eyes in 1988?  Please generalize based on
 the pt size and don't worry specifically about
 which typeface the books were printed in.
 
 Result:
 Garbage (thankfully.)
 */
